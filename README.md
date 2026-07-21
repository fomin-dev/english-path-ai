# 🎓 English Path AI

**A free, open-source Telegram tutor that takes you from A2 to C1 in about a year** — with an adaptive placement test, a personal roadmap, spaced-repetition vocabulary, grammar/reading/listening/writing practice, an AI tutor, full gamification, and dedicated **IELTS Academic** and **Digital SAT** prep tracks.

[![CI](https://github.com/fomin-dev/english-path-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/fomin-dev/english-path-ai/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js >= 20](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](package.json)
[![TypeScript strict](https://img.shields.io/badge/TypeScript-strict-3178c6)](tsconfig.json)

Built by one learner going from A2 to C1 while preparing for university admissions abroad — but designed from day one to work for anyone, in 🇬🇧 English, 🇷🇺 Russian, or 🇺🇦 Ukrainian.

> Runs entirely on free tiers: Telegram Bot API, Google Gemini (free tier), a free container/web-service host (Koyeb or Render), Neon/Render free Postgres, UptimeRobot free monitoring. **$0/month to run.**

---

## 📌 Highlights

A snapshot of what's under the hood, for anyone skimming rather than reading top to bottom:

- **Strict TypeScript throughout**, zero `any` outside two documented, lint-exempted boundary points — `tsc --noEmit` and `eslint --max-warnings=0` both pass clean
- **80+ automated tests** (unit + integration, Vitest) covering every piece of framework-agnostic domain logic — SM-2 scheduling, XP curves, streaks, achievements, the adaptive placement-test engine, roadmap generation, pace tracking, exam scoring — plus content-integrity checks that fail CI if a quiz question ever ships with a broken answer key
- **CI on every push and PR** (GitHub Actions): lint → typecheck → test → build, against a real Postgres service container
- **~7,300 lines of hand-written learning content**, versioned as TypeScript and reviewed like code: 24 reading texts, 20 listening exercises, 24 grammar topics, 180 vocabulary entries, a 96-question adaptive placement test, and full IELTS/SAT mock-exam banks — all spread across CEFR levels A1–C2
- **Three fully-synced interface languages** (English, Russian, Ukrainian) — 274 translation keys each, with a test-covered fallback chain so a missing key never reaches a user as `undefined`
- **Provider-agnostic architecture** at every integration point that tends to churn: swap the AI backend (Gemini/OpenAI/Anthropic/none), the database host, or the deployment target without touching business logic

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
- **Spaced repetition vocabulary trainer** (SM-2 algorithm) with example sentences, synonyms/antonyms, IPA pronunciation, favorites, free TTS playback, and one-tap **Anki export** of the learner's deck
- **Grammar trainer**: every topic (A1→C2) has an explanation in the learner's own language, English examples, and a practice quiz
- **Reading** library with comprehension questions and new-word extraction, scaled by CEFR level
- **Listening** exercises with free TTS-generated audio + comprehension questions
- **Writing Checker**: send any text, get AI-corrected version, categorized error explanations, a more natural rewrite, and an estimated CEFR level
- **AI Tutor** chat for grammar questions, vocabulary explanations, and study advice

### Gamification
- XP economy with a quadratic level curve and rank titles (Newcomer → Virtuoso)
- Duolingo-style daily **streaks**, timezone-aware, with an "about to break" warning
- **Achievements** (streaks, words learned, XP, level, writing submissions, grammar mastery, exam attempts…)
- **Opt-in leaderboard**: top 10 learners by XP, plus your own rank — off by default, on only if you choose to be shown
- **Statistics** dashboard: days learning, streak, words learned/mastered, tasks completed, level/XP, and a goal-completion forecast (ahead / on track / behind)

### Exam prep
- **IELTS Academic**: Reading, Listening, Writing (Task 1 + Task 2), Speaking (Part 1/2/3 cue cards), full mock mode, estimated band score
- **Digital SAT**: Reading & Writing passages, Standard English Conventions (grammar) questions, Words-in-Context vocabulary questions, estimated 200–800 scaled score

### Admin
- Global stats (total/active users, average streak, total XP)
- Broadcast messages to all users
- User lookup and moderation (ban/unban)

---

## 🏗 Architecture

| Concern | Choice | Why |
|---|---|---|
| Language | **TypeScript**, strict mode, ES2022/NodeNext | Type safety across a large, long-lived domain model (SRS state, roadmap phases, AI JSON responses) |
| Bot framework | **[grammY](https://grammy.dev)** | Modern, modular, first-class TypeScript support. Multi-step flows (onboarding, goal-setting, exercise sessions) are plain session-backed callback handlers rather than the `conversations` plugin — the placement test's randomized question order and per-step DB writes don't play well with that plugin's replay-on-resume model |
| Database | **PostgreSQL** via **Prisma** | Strong relational integrity for per-user progress/SRS state, native migrations, trivial free managed hosting (Neon/Render/Supabase) with backups |
| Content | **Versioned TypeScript, not the database** | Vocabulary, grammar topics, reading/listening texts, IELTS/SAT banks and achievements all live under `src/content/**` and ship with the app. Only *per-user* state (SRS progress, attempts, submissions) is in Postgres, referencing content by a stable string key. Content changes are then just a normal, reviewable PR — no migration, no seed step, no drift between "what's in the DB" and "what's in git" |
| AI | Provider-agnostic `AIProvider` interface; default implementation targets **Google Gemini's free tier** | Keeps the AI tutor / writing checker / adaptive content generation swappable — drop in an OpenAI or Anthropic implementation behind the same interface without touching a single handler |
| Text-to-speech | Free, keyless Google Translate TTS endpoint | No paid TTS API required for the Listening module; every exercise has a text fallback if synthesis fails |
| i18n | Hand-rolled dot-path JSON catalogs (`en.json` / `ru.json` / `uk.json`) with `{{placeholder}}` interpolation | Zero extra runtime dependency, trivial to diff in PRs, English-fallback built in |
| Session/conversation state | Postgres-backed `StorageAdapter` (`BotSession` table) | Free container hosts have ephemeral filesystems and redeploy/restart the process often — session state must survive that |
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
│   │   ├── handlers/          # command/callback handlers, one folder per feature (onboarding, lessons, vocabulary, grammar, reading, listening, writing, tutor, ielts, sat, stats, settings, admin…)
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
    └── integration/              # HTTP server surface, growing over time
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
git clone https://github.com/fomin-dev/english-path-ai.git
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
| `npm run typecheck` | `tsc --noEmit` |
| `npm run prisma:migrate` | Create/apply a dev migration |
| `npm run prisma:deploy` | Apply migrations in production (no prompts) |
| `npm run prisma:studio` | Open Prisma's DB browser GUI |
| `npm run bot:webhook:set` | Register the production webhook with Telegram |
| `npm run bot:webhook:delete` | Remove the webhook (fall back to polling) |

---

## 🌍 Deployment (free tier)

The app is a single Docker image (`Dockerfile`) + a Postgres database, so it runs unmodified on any container host. Two combinations are documented below — pick one. Both need the same environment variables (see [below](#-environment-variables)).

### Option A: Koyeb (web service) + Neon (database) — recommended for uptime

Render's free web-service plan shares a limited monthly instance-hour/build pool across your whole account, which is easy to exhaust once you have more than one free project on it. Koyeb's free "Nano" service is a dedicated always-on instance with no shared hour pool, and Neon's free Postgres has no 30/90-day expiry (it scales to zero and wakes on connection instead of being deleted) — a more durable free combo for a bot meant to run indefinitely.

1. **Database — [Neon](https://neon.tech)**: sign up (GitHub OAuth works, no card needed) → New Project → copy the connection string it gives you into `DATABASE_URL`.
2. **Web service — [Koyeb](https://www.koyeb.com)**: sign up (GitHub OAuth, no card) → **Create Web Service** → **GitHub** → select this repo → Koyeb auto-detects the `Dockerfile` → set the **Health check path** to `/health` and the **port** to `3000`.
3. Add the environment variables in Koyeb's service settings:
   - `NODE_ENV=production`, `DATABASE_URL` (from Neon), `TELEGRAM_BOT_TOKEN`, `ADMIN_TELEGRAM_IDS`, `GEMINI_API_KEY`, `BOT_WEBHOOK_SECRET` (any random string, e.g. `openssl rand -hex 32`)
   - `BOT_WEBHOOK_URL` — Koyeb gives you a public URL like `https://<app>-<org>.koyeb.app` once the first deploy finishes; add it as an env var and redeploy (or set it after the first deploy and just redeploy once more)
4. Once deployed, apply migrations once (Koyeb's build step only runs `npm run build`; run migrations from your machine against the Neon connection string, or add `npx prisma migrate deploy` to a Koyeb deploy hook):
   ```bash
   DATABASE_URL=<your Neon connection string> npx prisma migrate deploy
   ```
5. Register the webhook:
   ```bash
   BOT_WEBHOOK_URL=https://<app>-<org>.koyeb.app \
   BOT_WEBHOOK_SECRET=<the value you set> \
   TELEGRAM_BOT_TOKEN=<your token> \
   npx tsx scripts/set-webhook.ts
   ```
6. **Monitor it** with [UptimeRobot](https://uptimerobot.com) (free): HTTP(s) monitor on `https://<your-app>.koyeb.app/health`, checked every 5 minutes, so you get alerted if it ever goes down. (Koyeb's free instance doesn't sleep, so this is for alerting rather than keep-alive.)

### Option B: Render (all-in-one, via `render.yaml`)

Simpler if you haven't used up Render's free-tier allowance yet: **Dashboard → New → Blueprint**, point it at this repo. Render reads `render.yaml` and provisions a free web service *and* a free Postgres database together, with most environment variables pre-wired — you only need to fill in the ones marked `sync: false` (`TELEGRAM_BOT_TOKEN`, `ADMIN_TELEGRAM_IDS`, `BOT_WEBHOOK_URL`, `GEMINI_API_KEY`). Then run `scripts/set-webhook.ts` and add an UptimeRobot monitor exactly as in steps 5–6 above, pointed at your `onrender.com` URL.

> **Your Render login and your deploy source are separate settings.** You can sign in to Render with an email/password account and independently connect a GitHub account purely for deploys ([render.com/docs/github](https://render.com/docs/github)) — Render doesn't require the two to match, and the GitHub connection can be scoped to just this repository. Auto-deploy on every push only works with a connected Git provider; deploying straight from a public repo URL is also possible, but falls back to manual/API-triggered deploys since there's no account to send push webhooks to.

### Free-tier caveats
- Render's free web service shares a monthly instance-hour/build-minute pool across your account and spins down after 15 minutes of no traffic; Render's free Postgres is deleted after 30 days of inactivity. Koyeb + Neon (Option A) avoids both.
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
| `OPENAI_API_KEY` / `OPENAI_MODEL` | – | Used only when `AI_PROVIDER=openai` |
| `ANTHROPIC_API_KEY` / `ANTHROPIC_MODEL` | – | Used only when `AI_PROVIDER=anthropic` |
| `DEFAULT_TIMEZONE` | – | Fallback timezone for new users |
| `LOG_LEVEL` | – | `trace`\|`debug`\|`info`\|`warn`\|`error` |

---

## 🧪 Testing

```bash
npm test
```

Unit tests cover the framework-agnostic core: the SM-2 scheduler, streak logic, XP/level curve, achievement unlocking, the adaptive placement-test engine, the roadmap generator and pace evaluator, the daily lesson generator, IELTS/SAT score estimation, and the goal-completion forecast — plus integrity checks over every content bank (reading, listening, IELTS, SAT) that catch malformed quiz data (wrong option count, out-of-range answer key, duplicate titles) before it ships. Integration tests cover the HTTP server surface exercised in production (health check, webhook mount point).

CI (`.github/workflows/ci.yml`) runs the full pipeline — lint, typecheck, test, build — against a real Postgres service container on every push and pull request.

---

## 🗺 Roadmap / ideas for contributors

- [ ] Real ASR-based Speaking auto-scoring (currently: cue cards + self-assessment, since free speech-to-text is out of scope for v1)
- [ ] Web dashboard (progress charts, vocabulary export/import, cross-device view)
- [x] Global leaderboard, opt-in (top 10 by XP + your rank)
- [ ] Friend leaderboards (opt-in leaderboard scoped to a friend group)
- [x] Anki-compatible vocabulary export
- [ ] More content: this ships with a curated starter bank (grammar topics, vocab, reading/listening texts, IELTS/SAT sets) — it's intentionally easy to extend since it's just versioned TypeScript under `src/content/**`
- [ ] Additional interface languages
- [x] Pluggable OpenAI/Anthropic `AIProvider` implementations alongside Gemini

Contributions welcome — please open an issue to discuss significant changes first.

---

## 📄 License

MIT — see [`LICENSE`](LICENSE).
