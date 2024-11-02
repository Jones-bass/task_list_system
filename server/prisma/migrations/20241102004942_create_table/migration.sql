-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "deadline" DATETIME NOT NULL,
    "order" INTEGER NOT NULL
);
