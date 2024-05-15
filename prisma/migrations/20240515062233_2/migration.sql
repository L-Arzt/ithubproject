/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `timetable` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "timetable_code_key" ON "timetable"("code");
