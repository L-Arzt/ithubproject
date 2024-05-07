/*
  Warnings:

  - You are about to drop the column `lesson` on the `timetable` table. All the data in the column will be lost.
  - You are about to drop the column `timeEnd` on the `timetable` table. All the data in the column will be lost.
  - You are about to drop the column `timeStart` on the `timetable` table. All the data in the column will be lost.
  - You are about to drop the column `weekday` on the `timetable` table. All the data in the column will be lost.
  - You are about to alter the column `classroom` on the `timetable` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `booked` to the `timetable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discipline` to the `timetable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `edited` to the `timetable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberLesson` to the `timetable` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_timetable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numberLesson" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    "classroom" INTEGER NOT NULL,
    "discipline" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "edited" BOOLEAN NOT NULL,
    "booked" BOOLEAN NOT NULL
);
INSERT INTO "new_timetable" ("classroom", "data", "group", "id", "teacher") SELECT "classroom", "data", "group", "id", "teacher" FROM "timetable";
DROP TABLE "timetable";
ALTER TABLE "new_timetable" RENAME TO "timetable";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
