/**
 * Free, keyless text-to-speech via Google Translate's public (unofficial)
 * `translate_tts` endpoint — the same mechanism used by many open-source
 * TTS tools. No account or API key required, which matches the project's
 * "free-tier only" constraint for the Listening module.
 *
 * This is best-effort: the endpoint is undocumented, rate-limited, and can
 * change without notice. Callers should always fall back to sending the
 * exercise script as plain text if synthesis fails — see the listening
 * handler.
 */

const MAX_CHUNK_LENGTH = 190;
const ENDPOINT = 'https://translate.google.com/translate_tts';

export type TtsLang = 'en' | 'ru' | 'uk';

function splitIntoChunks(text: string, maxLen: number): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  const chunks: string[] = [];
  let current = '';

  for (const sentence of sentences) {
    const candidate = current ? `${current} ${sentence}` : sentence;
    if (candidate.length > maxLen && current) {
      chunks.push(current);
      current = sentence;
    } else {
      current = candidate;
    }
  }
  if (current) chunks.push(current);

  // A single very long "sentence" with no punctuation still needs hard-splitting.
  return chunks.flatMap((chunk) =>
    chunk.length <= maxLen
      ? [chunk]
      : (chunk.match(new RegExp(`.{1,${maxLen}}(\\s|$)`, 'g')) ?? [chunk]).map((s) => s.trim()),
  );
}

async function fetchChunk(chunk: string, idx: number, total: number, lang: TtsLang): Promise<Buffer> {
  const url =
    `${ENDPOINT}?ie=UTF-8&client=tw-ob&tl=${lang}` +
    `&q=${encodeURIComponent(chunk)}&idx=${idx}&total=${total}&textlen=${chunk.length}`;

  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
    },
  });
  if (!res.ok) throw new Error(`Google TTS request failed with status ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

/** Synthesizes `text` to a single concatenated MP3 buffer, ready to send as a Telegram voice/audio note. */
export async function synthesizeSpeech(text: string, lang: TtsLang = 'en'): Promise<Buffer> {
  const chunks = splitIntoChunks(text.trim(), MAX_CHUNK_LENGTH);
  const buffers = await Promise.all(chunks.map((chunk, idx) => fetchChunk(chunk, idx, chunks.length, lang)));
  return Buffer.concat(buffers);
}
