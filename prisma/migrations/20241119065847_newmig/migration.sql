-- CreateTable
CREATE TABLE "Survey" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Option" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "option" TEXT NOT NULL,
    "surveyId" TEXT NOT NULL,
    CONSTRAINT "Option_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "surveyId" TEXT NOT NULL,
    "optionId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Survey_question_key" ON "Survey"("question");
