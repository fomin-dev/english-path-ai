-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('EN', 'RU', 'UK');

-- CreateEnum
CREATE TYPE "CefrLevel" AS ENUM ('A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2');

-- CreateEnum
CREATE TYPE "SkillFocus" AS ENUM ('SPEAKING', 'LISTENING', 'READING', 'WRITING', 'GRAMMAR', 'VOCABULARY', 'PRONUNCIATION', 'IELTS', 'SAT', 'ACADEMIC', 'EVERYDAY', 'BUSINESS', 'OTHER');

-- CreateEnum
CREATE TYPE "CardStatus" AS ENUM ('NEW', 'LEARNING', 'REVIEW', 'MASTERED');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('GRAMMAR', 'VOCABULARY', 'READING', 'LISTENING', 'WRITING', 'TRANSLATION', 'SENTENCE_BUILDING', 'SPEAKING', 'SHADOWING', 'FLASHCARDS', 'MINI_TEST', 'REVIEW');

-- CreateEnum
CREATE TYPE "IeltsSection" AS ENUM ('LISTENING', 'READING', 'WRITING', 'SPEAKING', 'FULL_MOCK');

-- CreateEnum
CREATE TYPE "SatSection" AS ENUM ('READING', 'WRITING', 'VOCABULARY', 'GRAMMAR', 'FULL_MOCK');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "telegramId" BIGINT NOT NULL,
    "username" TEXT,
    "firstName" TEXT,
    "interfaceLocale" "Locale" NOT NULL DEFAULT 'RU',
    "timezone" TEXT NOT NULL DEFAULT 'Europe/Kyiv',
    "currentLevel" "CefrLevel",
    "targetLevel" "CefrLevel",
    "targetDate" TIMESTAMP(3),
    "dailyGoalMinutes" INTEGER NOT NULL DEFAULT 15,
    "dailyWordGoal" INTEGER NOT NULL DEFAULT 10,
    "dailyXpGoal" INTEGER NOT NULL DEFAULT 50,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "rankLevel" INTEGER NOT NULL DEFAULT 1,
    "streakCount" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "lastActiveDate" TIMESTAMP(3),
    "notificationsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "morningReminderTime" TEXT,
    "eveningReminderTime" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    "onboardingStep" TEXT,
    "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlacementTestResult" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "level" "CefrLevel" NOT NULL,
    "scoreGrammar" DOUBLE PRECISION NOT NULL,
    "scoreVocabulary" DOUBLE PRECISION NOT NULL,
    "scoreReading" DOUBLE PRECISION NOT NULL,
    "scoreUsage" DOUBLE PRECISION NOT NULL,
    "vocabEstimate" INTEGER NOT NULL,
    "strongAreas" TEXT[],
    "weakAreas" TEXT[],
    "rawAnswers" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlacementTestResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearningGoal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "targetLevel" "CefrLevel" NOT NULL,
    "targetDate" TIMESTAMP(3) NOT NULL,
    "focusSkills" "SkillFocus"[],
    "weeklyMinutes" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LearningGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roadmap" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "phases" JSONB NOT NULL,
    "currentPhaseIndex" INTEGER NOT NULL DEFAULT 0,
    "version" INTEGER NOT NULL DEFAULT 1,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastAdaptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Roadmap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserVocabCard" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "wordKey" TEXT NOT NULL,
    "easeFactor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "intervalDays" INTEGER NOT NULL DEFAULT 0,
    "repetitions" INTEGER NOT NULL DEFAULT 0,
    "lapses" INTEGER NOT NULL DEFAULT 0,
    "dueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastReviewedAt" TIMESTAMP(3),
    "status" "CardStatus" NOT NULL DEFAULT 'NEW',
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserVocabCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrammarAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "topicSlug" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "correctAnswers" INTEGER NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GrammarAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "textId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "correctAnswers" INTEGER NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReadingAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListeningAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "correctAnswers" INTEGER NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ListeningAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WritingSubmission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "prompt" TEXT,
    "originalText" TEXT NOT NULL,
    "correctedText" TEXT,
    "feedback" JSONB,
    "estimatedLevel" "CefrLevel",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WritingSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonPlan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "tasks" JSONB NOT NULL,
    "completedCount" INTEGER NOT NULL DEFAULT 0,
    "totalCount" INTEGER NOT NULL,
    "xpEarned" INTEGER NOT NULL DEFAULT 0,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LessonPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "XpTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "XpTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAchievement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "achievementSlug" TEXT NOT NULL,
    "unlockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreakLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "tasksCompleted" INTEGER NOT NULL DEFAULT 0,
    "goalMet" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "StreakLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IeltsAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "section" "IeltsSection" NOT NULL,
    "bandScore" DOUBLE PRECISION NOT NULL,
    "details" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IeltsAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SatAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "section" "SatSection" NOT NULL,
    "score" INTEGER NOT NULL,
    "details" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SatAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BotSession" (
    "key" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BotSession_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramId_key" ON "User"("telegramId");

-- CreateIndex
CREATE INDEX "User_lastActiveDate_idx" ON "User"("lastActiveDate");

-- CreateIndex
CREATE INDEX "PlacementTestResult_userId_idx" ON "PlacementTestResult"("userId");

-- CreateIndex
CREATE INDEX "LearningGoal_userId_isActive_idx" ON "LearningGoal"("userId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Roadmap_userId_key" ON "Roadmap"("userId");

-- CreateIndex
CREATE INDEX "UserVocabCard_userId_dueDate_idx" ON "UserVocabCard"("userId", "dueDate");

-- CreateIndex
CREATE UNIQUE INDEX "UserVocabCard_userId_wordKey_key" ON "UserVocabCard"("userId", "wordKey");

-- CreateIndex
CREATE INDEX "GrammarAttempt_userId_idx" ON "GrammarAttempt"("userId");

-- CreateIndex
CREATE INDEX "ReadingAttempt_userId_idx" ON "ReadingAttempt"("userId");

-- CreateIndex
CREATE INDEX "ListeningAttempt_userId_idx" ON "ListeningAttempt"("userId");

-- CreateIndex
CREATE INDEX "WritingSubmission_userId_idx" ON "WritingSubmission"("userId");

-- CreateIndex
CREATE INDEX "LessonPlan_userId_date_idx" ON "LessonPlan"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "LessonPlan_userId_date_key" ON "LessonPlan"("userId", "date");

-- CreateIndex
CREATE INDEX "XpTransaction_userId_idx" ON "XpTransaction"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAchievement_userId_achievementSlug_key" ON "UserAchievement"("userId", "achievementSlug");

-- CreateIndex
CREATE INDEX "StreakLog_userId_date_idx" ON "StreakLog"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "StreakLog_userId_date_key" ON "StreakLog"("userId", "date");

-- CreateIndex
CREATE INDEX "IeltsAttempt_userId_idx" ON "IeltsAttempt"("userId");

-- CreateIndex
CREATE INDEX "SatAttempt_userId_idx" ON "SatAttempt"("userId");

-- AddForeignKey
ALTER TABLE "PlacementTestResult" ADD CONSTRAINT "PlacementTestResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningGoal" ADD CONSTRAINT "LearningGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roadmap" ADD CONSTRAINT "Roadmap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVocabCard" ADD CONSTRAINT "UserVocabCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrammarAttempt" ADD CONSTRAINT "GrammarAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingAttempt" ADD CONSTRAINT "ReadingAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListeningAttempt" ADD CONSTRAINT "ListeningAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WritingSubmission" ADD CONSTRAINT "WritingSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonPlan" ADD CONSTRAINT "LessonPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "XpTransaction" ADD CONSTRAINT "XpTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StreakLog" ADD CONSTRAINT "StreakLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IeltsAttempt" ADD CONSTRAINT "IeltsAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SatAttempt" ADD CONSTRAINT "SatAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
