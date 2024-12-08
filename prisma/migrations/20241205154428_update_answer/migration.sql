/*
  Warnings:

  - You are about to drop the column `correct` on the `Answer` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UserQuizAttempt_isCompleted_userQuizSetAttemptId_idx";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Answer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Answer" ("createdAt", "id", "type", "updatedAt") SELECT "createdAt", "id", "type", "updatedAt" FROM "Answer";
DROP TABLE "Answer";
ALTER TABLE "new_Answer" RENAME TO "Answer";
CREATE INDEX "Answer_type_idx" ON "Answer"("type");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "AnswerOption_answerId_idx" ON "AnswerOption"("answerId");

-- CreateIndex
CREATE INDEX "AnswerOption_answerId_isCorrect_idx" ON "AnswerOption"("answerId", "isCorrect");

-- CreateIndex
CREATE INDEX "Quiz_creatorId_idx" ON "Quiz"("creatorId");

-- CreateIndex
CREATE INDEX "Quiz_level_isPublic_idx" ON "Quiz"("level", "isPublic");

-- CreateIndex
CREATE INDEX "Quiz_creatorId_level_isPublic_idx" ON "Quiz"("creatorId", "level", "isPublic");

-- CreateIndex
CREATE INDEX "QuizModification_quizId_idx" ON "QuizModification"("quizId");

-- CreateIndex
CREATE INDEX "QuizModification_quizId_status_idx" ON "QuizModification"("quizId", "status");

-- CreateIndex
CREATE INDEX "QuizSet_creatorId_idx" ON "QuizSet"("creatorId");

-- CreateIndex
CREATE INDEX "QuizSet_creatorId_level_isPublic_idx" ON "QuizSet"("creatorId", "level", "isPublic");

-- CreateIndex
CREATE INDEX "QuizSetTag_quizSetId_tagId_idx" ON "QuizSetTag"("quizSetId", "tagId");

-- CreateIndex
CREATE INDEX "UserQuizAttempt_userId_quizId_isCompleted_idx" ON "UserQuizAttempt"("userId", "quizId", "isCompleted");

-- CreateIndex
CREATE INDEX "UserQuizAttempt_userQuizSetAttemptId_isCompleted_idx" ON "UserQuizAttempt"("userQuizSetAttemptId", "isCompleted");
