-- CreateTable
CREATE TABLE "timetable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "weekday" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "timeStart" DATETIME NOT NULL,
    "timeEnd" DATETIME NOT NULL,
    "lesson" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "classroom" TEXT NOT NULL,
    "group" TEXT NOT NULL
);
