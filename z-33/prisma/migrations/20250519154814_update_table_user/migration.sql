/*
  Warnings:

  - You are about to alter the column `updatedAt` on the `box` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `box` MODIFY `updatedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `name` VARCHAR(100) NOT NULL;
