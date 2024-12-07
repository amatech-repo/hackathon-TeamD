-- DropIndex
DROP INDEX "UserQuizAttempt_userId_quizId_isCompleted_idx";

-- DropIndex
DROP INDEX "UserQuizSetAttempt_isCompleted_userId_quizSetId_idx";

-- CreateIndex
CREATE INDEX "UserQuizAttempt_userId_idx" ON "UserQuizAttempt"("userId");

-- CreateIndex
CREATE INDEX "UserQuizAttempt_quizId_idx" ON "UserQuizAttempt"("quizId");

-- CreateIndex
CREATE INDEX "UserQuizAttempt_userId_isCompleted_idx" ON "UserQuizAttempt"("userId", "isCompleted");

-- CreateIndex
CREATE INDEX "UserQuizAttempt_quizId_isCompleted_idx" ON "UserQuizAttempt"("quizId", "isCompleted");

-- CreateIndex
CREATE INDEX "UserQuizSetAttempt_userId_idx" ON "UserQuizSetAttempt"("userId");

-- CreateIndex
CREATE INDEX "UserQuizSetAttempt_quizSetId_idx" ON "UserQuizSetAttempt"("quizSetId");

-- CreateIndex
CREATE INDEX "UserQuizSetAttempt_isCompleted_quizSetId_idx" ON "UserQuizSetAttempt"("isCompleted", "quizSetId");

-- CreateIndex
CREATE INDEX "UserQuizSetAttempt_userId_isCompleted_idx" ON "UserQuizSetAttempt"("userId", "isCompleted");
