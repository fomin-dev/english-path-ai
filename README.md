# 🎓 English Path AI

**A free, open-source Telegram tutor that takes you from A2 to C1 in about a year** — with an adaptive placement test, a personal roadmap, spaced-repetition vocabulary, grammar/reading/listening/writing practice, an AI tutor, full gamification, and dedicated **IELTS Academic** and **Digital SAT** prep tracks.

Built for one learner going from A2 → C1 while preparing for university admissions in the US — but designed from day one to work for anyone, in 🇬🇧 English, 🇷🇺 Russian, or 🇺🇦 Ukrainian.

> Runs entirely on free tiers: Telegram Bot API, Google Gemini (free tier), Render free web service, Render/Neon/Supabase free Postgres, UptimeRobot free monitoring. **$0/month to run.**

---

## ✨ Features

### Onboarding & personalization
- Warm multi-language welcome (🇺🇦 / 🇷🇺 / 🇺🇸), switchable anytime in Settings
- "Do you know your level?" → pick A1–C2 directly, **or** take a 16-question **adaptive placement test** (staircase difficulty across Grammar / Vocabulary / Reading / Usage) that estimates CEFR level, vocabulary size, and strong/weak areas
- Goal setting: target level, timeframe (3 / 6 / 12 months or custom), focus skills (Speaking, Listening, Reading, Writing, Grammar, Vocabulary, Pronunciation, IELTS, SAT, Academic/Everyday/Business English)
- Auto-generated **personal roadmap**, split into CEFR-transition phases with concrete milestones, weighted so harder transitions (B2→C1, C1→C2) get proportionally more time
- The roadmap **adapts**: pace is tracked against elapsed time vs. completed work, and the daily lesson generator ramps difficulty up or adds review sessions accordingly

### Daily learning loop
- A fresh **daily lesson** each day — a mix of Grammar, Vocabulary, Reading, Listening, Writing, Translation, Sentence Building, Speaking, Shadowing, Flashcards and Mini Tests, sized to the learner's daily time budget and weighted toward their chosen focus skills
- **Spaced repetition vocabulary trainer** (SM-2 algorithm) with example sentences, synonyms/antonyms, IPA pronunciation, favorites, and free TTS playback
- **Grammar trainer**: every topic (A1→C2) has an explanation in the learner's own language, English examples, and a practice quiz
- **Reading** library with comprehension questions and new-word extraction, scaled by CEFR level
- **Listening** exercises with free TTS-generated audio + comprehension questions
- **Writing Checker**: send any text, get AI-corrected version, categorized error explanations, a more natural rewrite, and an estimated CEFR level
- **AI Tutor** chat for grammar questions, vocabulary explanations, and study advice

### Gamification
- XP economy with a quadratic level curve and rank titles (Newcomer → Virtuoso)
- Duolingo-style daily **streaks**, timezone-aware, with an "about to break" warning
- **Achievements** (streaks, words learned, XP, level, writing submissions, grammar mastery, exam attempts…)
- **Statistics** dashboard: days learning, streak, words learned/mastered, tasks completed, level/XP, and a goal-completion forecast (ahead / on track / behind)

### Exam prep
- **IELTS Academic**: Reading, Listening, Writing (Task 1 + Task 2), Speaking (Part 1/2/3 cue cards), full mock mode, estimated band score
- **Digital SAT**: Reading & Writing passages, Standard English Conventions (grammar) questions, Words-in-Context vocabulary questions, estimated 200–800 scaled score

### Admin
- Global stats (total/active users, average streak, total XP)
- Broadcast messages to all users
- User lookup

---

## 🏗 Architecture

| Concern | Choice | Why |
|---|---|---|
| Language | **TypeScript**, strict mode, ES2022/NodeNext | Type safety across a large, long-lived domain model (SRS state, roadmap phases, AI JSON responses) |
| Bot framework | **[grammY](https://grammy.dev)** + `@grammyjs/conversations` | Modern, modular, first-class TypeScript support; the conversations plugin models multi-step flows (onboarding, goal-setting) as linear `async function`s instead of hand-rolled state machines |
| Database | **PostgreSQL** via **Prisma** | Strong relational integrity for per-user progress/SRS state, native migrations, trivial free managed hosting (Render/Neon/Supabase) with backups |
| Content | **Versioned TypeScript, not the database** | Vocabulary, grammar topics, reading/listening texts, IELTS/SAT banks and achievements all live under `src/content/**` and ship with the app. Only *per-user* state (SRS progress, attempts, submissions) is in Postgres, referencing content by a stable string key. Content changes are then just a normal, reviewable PR — no migration, no seed step, no drift between "what's in the DB" and "what's in git" |
| AI | Provider-agnostic `AIProvider` interface; default implementation targets **Google Gemini's free tier** | Keeps the AI tutor / writing checker / adaptive content generation swappable — drop in an OpenAI or Anthropic implementation behind the same interface without touching a single handler |
| Text-to-speech | Free, keyless Google Translate TTS endpoint | No paid TTS API required for the Listening module; every exercise has a text fallback if synthesis fails |
| i18n | Hand-rolled dot-path JSON catalogs (`en.json` / `ru.json` / `uk.json`) with `{{placeholder}}` interpolation | Zero extra runtime dependency, trivial to diff in PRs, English-fallback built in |
| Session/conversation state | Postgres-backed `StorageAdapter` (`BotSession` table) | Render's filesystem is ephemeral and we run a single web-service instance — session state must survive restarts/redeploys |
| HTTP layer | **Hono** | Tiny, fast, first-class grammY webhook adapter; serves `/health` for UptimeRobot and `/webhook/:secret` for Telegram |
| Background jobs | `node-cron` | Per-timezone reminder delivery and hourly streak-lapse maintenance, in-process (no separate worker needed at this scale) |
| Testing | **Vitest** | Fast, native ESM/TS support, `vitest run` in CI |

### Project structure

```
english-path-ai/
├── prisma/
│   └── schema.prisma          # Postgres schema — user & progress data only
├── scripts/
│   ├── copy-assets.mjs        # copies i18n JSON into dist/ at build time
│   ├── set-webhook.ts         # registers the Telegram webhook in prod
│   └── delete-webhook.ts      # tears it down (e.g. to go back to polling)
├── src/
│   ├── ai/                    # AIProvider interface + Gemini implementation
│   ├── bot/
│   │   ├── conversations/     # multi-step flows (onboarding, goal-setting…)
│   │   ├── handlers/          # command/callback handlers, one folder per feature
│   │   ├── keyboards/         # inline keyboard builders
│   │   ├── middlewares/       # session/user/i18n middleware
│   │   ├── index.ts           # bot composition (middleware + handler wiring)
│   │   └── types.ts           # BotContext, SessionData
│   ├── config/                 # env validation (zod) + logger
│   ├── content/                 # versioned static content (vocab, grammar, reading, listening, IELTS, SAT, achievements)
│   ├── core/                    # framework-agnostic domain logic (SRS, roadmap, gamification, placement test, lesson generator, exam scoring, TTS)
│   ├── db/
│   │   ├── client.ts            # Prisma client singleton
│   │   └── repositories/        # data-access layer
│   ├── i18n/                    # locale catalogs + t()/detectLocale()
│   ├── jobs/                    # cron jobs (reminders, streak maintenance)
│   ├── server/                  # Hono app (health check + webhook receiver)
│   └── index.ts                 # process entrypoint
└── tests/
    ├── unit/                    # core domain logic (pure functions)
    └── integration/
```

---

## 🚀 Getting started

### Prerequisites
- Node.js ≥ 20
- A PostgreSQL database (local via Docker, or a free cloud instance)
- A Telegram bot token from [@BotFather](https://t.me/BotFather) (`/newbot`)
- A free Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey) (optional — the bot runs fine without AI features configured; the Writing Checker and AI Tutor just show a "not configured yet" message until you add one)

### Local setup

```bash
git clone https://github.com/<your-username>/english-path-ai.git
cd english-path-ai
npm install

cp .env.example .env
# fill in TELEGRAM_BOT_TOKEN, DATABASE_URL, GEMINI_API_KEY, etc.

# spin up a local Postgres if you don't have one:
docker compose up -d

npm run prisma:migrate
npm run dev
```

The bot runs in **long-polling mode** locally (no `BOT_WEBHOOK_URL` set) — just message it on Telegram once `npm run dev` is running.

### Useful scripts

| Command | What it does |
|---|---|
| `npm run dev` | Run the bot locally with hot-reload (tsx watch) |
| `npm run build` | Type-check, compile to `dist/`, copy i18n assets |
| `npm start` | Run the compiled bot (production) |
| `npm test` | Run the Vitest suite |
| `npm run lint` / `npm run format` | ESLint / Prettier |
| `npm run prisma:migrate` | Create/apply a dev migration |
| `npm run prisma:deploy` | Apply migrations in production (no prompts) |
| `npm run prisma:studio` | Open Prisma's DB browser GUI |
| `npm run bot:webhook:set` | Register the production webhook with Telegram |
| `npm run bot:webhook:delete` | Remove the webhook (fall back to polling) |

---

## 🌍 Deployment (Render — free tier)

1. **Push this repo to GitHub** (see below).
2. In the [Render Dashboard](https://dashboard.render.com/): **New → Blueprint**, point it at your fork/repo. Render reads `render.yaml` and provisions:
   - A **free Postgres** database
   - A **free web service** running `npm ci && npm run build && npx prisma migrate deploy` at build time, `npm start` at runtime, with `GET /health` as the health check
3. Render generates a public URL like `https://english-path-ai.onrender.com`. Open the service's **Environment** tab and fill in the variables marked "sync: false" in `render.yaml`:
   - `TELEGRAM_BOT_TOKEN` — from @BotFather
   - `ADMIN_TELEGRAM_IDS` — your numeric Telegram ID (message [@userinfobot](https://t.me/userinfobot) to get it), comma-separated if more than one
   - `BOT_WEBHOOK_URL` — the Render URL from step 3, e.g. `https://english-path-ai.onrender.com`
   - `GEMINI_API_KEY` — from Google AI Studio
4. After the first successful deploy, register the webhook once from your machine (or a Render Shell):
   ```bash
   BOT_WEBHOOK_URL=https://english-path-ai.onrender.com \
   BOT_WEBHOOK_SECRET=<the value Render generated> \
   TELEGRAM_BOT_TOKEN=<your token> \
   npx tsx scripts/set-webhook.ts
   ```
5. **Keep the free instance awake & monitored** with [UptimeRobot](https://uptimerobot.com) (free): add an HTTP(s) monitor pointed at `https://<your-service>.onrender.com/health`, checking every 5 minutes. This also means you'll get an alert by email/Telegram if the bot ever goes down.

### Free-tier caveats
- Render's free web service spins down after 15 minutes of no HTTP traffic; the UptimeRobot monitor above keeps it warm. A cold start still costs the *first* webhook delivery a few seconds of latency — Telegram retries automatically.
- Render's free Postgres is deleted after 90 days of inactivity on the free plan — take periodic backups (`pg_dump`) if you go quiet for a while, or upgrade the DB plan.
- Gemini's free tier has per-minute/per-day rate limits. The bot degrades gracefully (returns a friendly "try again shortly" message) rather than crashing if you hit them.

---

## 🔐 Environment variables

See [`.env.example`](.env.example) for the full annotated list. Summary:

| Variable | Required | Purpose |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | ✅ | Bot API token from @BotFather |
| `ADMIN_TELEGRAM_IDS` | – | Comma-separated Telegram user IDs with admin-panel access |
| `DATABASE_URL` | ✅ | Postgres connection string |
| `BOT_WEBHOOK_URL` / `BOT_WEBHOOK_SECRET` | – (prod only) | Leave unset for local long-polling |
| `AI_PROVIDER` | – | `gemini` (default) \| `openai` \| `anthropic` \| `none` |
| `GEMINI_API_KEY` / `GEMINI_MODEL` | – | Free-tier Gemini credentials/model |
| `DEFAULT_TIMEZONE` | – | Fallback timezone for new users |
| `LOG_LEVEL` | – | `trace`\|`debug`\|`info`\|`warn`\|`error` |

---

## 🧪 Testing

```bash
npm test
```

Unit tests cover the framework-agnostic core: the SM-2 scheduler, streak logic, XP/level curve, achievement unlocking, the adaptive placement-test engine, the roadmap generator and pace evaluator, the daily lesson generator, and IELTS/SAT score estimation.

---

## 🗺 Roadmap / ideas for contributors

- [ ] Real ASR-based Speaking auto-scoring (currently: cue cards + self-assessment, since free speech-to-text is out of scope for v1)
- [ ] Web dashboard (progress charts, vocabulary export/import, cross-device view)
- [ ] Leaderboards / friend leaderboards, opt-in
- [ ] Anki-compatible vocabulary export
- [ ] More content: this ships with a curated starter bank (grammar topics, vocab, reading/listening texts, IELTS/SAT sets) — it's intentionally easy to extend since it's just versioned TypeScript under `src/content/**`
- [ ] Additional interface languages
- [ ] Pluggable OpenAI/Anthropic `AIProvider` implementations alongside Gemini

Contributions welcome — please open an issue to discuss significant changes first.

---

## 📄 License

MIT — see [`LICENSE`](LICENSE).
