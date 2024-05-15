/*
  Warnings:

  - Added the required column `code` to the `timetable` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_timetable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" INTEGER NOT NULL,
    "numberLesson" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "weekDay" INTEGER NOT NULL,
    "classroom" TEXT NOT NULL,
    "discipline" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "edited" BOOLEAN NOT NULL DEFAULT false,
    "booked" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_timetable" ("booked", "classroom", "date", "discipline", "edited", "group", "id", "numberLesson", "teacher", "weekDay") SELECT "booked", "classroom", "date", "discipline", "edited", "group", "id", "numberLesson", "teacher", "weekDay" FROM "timetable";
DROP TABLE "timetable";
ALTER TABLE "new_timetable" RENAME TO "timetable";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
