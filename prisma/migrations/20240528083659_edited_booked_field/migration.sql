/*
  Warnings:

  - You are about to drop the column `edited` on the `timetable` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `timetable` DROP COLUMN `edited`,
    MODIFY `booked` BOOLEAN NOT NULL DEFAULT false;
