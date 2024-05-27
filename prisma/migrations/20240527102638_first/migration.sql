-- CreateTable
CREATE TABLE `timetable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` INTEGER NOT NULL,
    `numberLesson` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `weekDay` INTEGER NOT NULL,
    `classroom` VARCHAR(191) NOT NULL,
    `discipline` VARCHAR(191) NOT NULL,
    `group` VARCHAR(191) NOT NULL,
    `teacher` VARCHAR(191) NOT NULL,
    `edited` BOOLEAN NOT NULL DEFAULT false,
    `booked` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `timetable_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
