/*
  Warnings:

  - You are about to alter the column `updatedAt` on the `box` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `box` MODIFY `updatedAt` DATETIME NOT NULL;
