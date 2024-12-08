/*
  Warnings:

  - You are about to drop the column `isCorrect` on the `QuestionAnswer` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_QuestionAnswer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionId" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,
    CONSTRAINT "QuestionAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "QuestionAnswer_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_QuestionAnswer" ("answerId", "id", "questionId") SELECT "answerId", "id", "questionId" FROM "QuestionAnswer";
DROP TABLE "QuestionAnswer";
ALTER TABLE "new_QuestionAnswer" RENAME TO "QuestionAnswer";
CREATE UNIQUE INDEX "QuestionAnswer_questionId_answerId_key" ON "QuestionAnswer"("questionId", "answerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
