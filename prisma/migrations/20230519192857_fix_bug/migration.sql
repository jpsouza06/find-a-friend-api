/*
  Warnings:

  - Made the column `about` on table `pets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `org_id` on table `pets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pet_id` on table `photos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pet_id` on table `requirements` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_org_id_fkey";

-- DropForeignKey
ALTER TABLE "photos" DROP CONSTRAINT "photos_pet_id_fkey";

-- DropForeignKey
ALTER TABLE "requirements" DROP CONSTRAINT "requirements_pet_id_fkey";

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "about" SET NOT NULL,
ALTER COLUMN "org_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "photos" ALTER COLUMN "pet_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "requirements" ALTER COLUMN "pet_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requirements" ADD CONSTRAINT "requirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
