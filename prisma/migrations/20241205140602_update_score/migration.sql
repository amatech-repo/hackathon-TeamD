/*
  Warnings:

  - You are about to drop the column `score` on the `UserQuizAttempt` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "UserQuizSetAttempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "quizSetId" TEXT NOT NULL,
    "lastCorrectQuizzesCount" INTEGER NOT NULL DEFAULT 0,
    "lastQuizzesScore" INTEGER NOT NULL DEFAULT 0,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserQuizSetAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserQuizSetAttempt_quizSetId_fkey" FOREIGN KEY ("quizSetId") REFERENCES "QuizSet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserQuizAttempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "lastSelectedAnswerOptionId" TEXT,
    "userQuizSetAttemptId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserQuizAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserQuizAttempt_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserQuizAttempt_lastSelectedAnswerOptionId_fkey" FOREIGN KEY ("lastSelectedAnswerOptionId") REFERENCES "AnswerOption" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "UserQuizAttempt_userQuizSetAttemptId_fkey" FOREIGN KEY ("userQuizSetAttemptId") REFERENCES "UserQuizSetAttempt" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_UserQuizAttempt" ("createdAt", "id", "isCompleted", "lastSelectedAnswerOptionId", "quizId", "updatedAt", "userId") SELECT "createdAt", "id", "isCompleted", "lastSelectedAnswerOptionId", "quizId", "updatedAt", "userId" FROM "UserQuizAttempt";
DROP TABLE "UserQuizAttempt";
ALTER TABLE "new_UserQuizAttempt" RENAME TO "UserQuizAttempt";
CREATE INDEX "UserQuizAttempt_isCompleted_userQuizSetAttemptId_idx" ON "UserQuizAttempt"("isCompleted", "userQuizSetAttemptId");
CREATE UNIQUE INDEX "UserQuizAttempt_userId_quizId_key" ON "UserQuizAttempt"("userId", "quizId");
CREATE TABLE "new_UserScore" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "totalCorrect" INTEGER NOT NULL DEFAULT 0,
    "totalQuizzes" INTEGER NOT NULL DEFAULT 0,
    "totalScore" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserScore" ("createdAt", "id", "totalQuizzes", "totalScore", "updatedAt", "userId") SELECT "createdAt", "id", "totalQuizzes", "totalScore", "updatedAt", "userId" FROM "UserScore";
DROP TABLE "UserScore";
ALTER TABLE "new_UserScore" RENAME TO "UserScore";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "UserQuizSetAttempt_isCompleted_userId_quizSetId_idx" ON "UserQuizSetAttempt"("isCompleted", "userId", "quizSetId");

-- CreateIndex
CREATE UNIQUE INDEX "UserQuizSetAttempt_userId_quizSetId_key" ON "UserQuizSetAttempt"("userId", "quizSetId");
