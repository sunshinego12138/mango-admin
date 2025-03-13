/*
  Warnings:

  - You are about to drop the `Internalization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Internalization` DROP FOREIGN KEY `Internalization_parentId_fkey`;

-- DropTable
DROP TABLE `Internalization`;

-- CreateTable
CREATE TABLE `Locales` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `parentId` VARCHAR(191) NULL,
    `zhCN` VARCHAR(191) NULL,
    `enUS` VARCHAR(191) NULL,
    `jaJP` VARCHAR(191) NULL,
    `zhTW` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Locales` ADD CONSTRAINT `Locales_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Locales`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
