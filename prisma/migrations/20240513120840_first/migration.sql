/*
  Warnings:

  - You are about to drop the column `data` on the `timetable` table. All the data in the column will be lost.
  - Added the required column `date` to the `timetable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekDay` to the `timetable` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_timetable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numberLesson" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "weekDay" INTEGER NOT NULL,
    "classroom" INTEGER NOT NULL,
    "discipline" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "edited" BOOLEAN NOT NULL,
    "booked" BOOLEAN NOT NULL
);
INSERT INTO "new_timetable" ("booked", "classroom", "discipline", "edited", "group", "id", "numberLesson", "teacher") SELECT "booked", "classroom", "discipline", "edited", "group", "id", "numberLesson", "teacher" FROM "timetable";
DROP TABLE "timetable";
ALTER TABLE "new_timetable" RENAME TO "timetable";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
