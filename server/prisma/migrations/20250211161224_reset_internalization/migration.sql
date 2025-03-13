/*
  Warnings:

  - You are about to drop the `Language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LanguageEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `LanguageEntry` DROP FOREIGN KEY `LanguageEntry_languageId_fkey`;

-- DropTable
DROP TABLE `Language`;

-- DropTable
DROP TABLE `LanguageEntry`;

-- CreateTable
CREATE TABLE `Internalization` (
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
ALTER TABLE `Internalization` ADD CONSTRAINT `Internalization_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Internalization`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
