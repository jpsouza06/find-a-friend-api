/*
  Warnings:

  - You are about to drop the `requirements` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "requirements" DROP CONSTRAINT "requirements_pet_id_fkey";

-- DropTable
DROP TABLE "requirements";

-- CreateTable
CREATE TABLE "requirementsPet" (
    "id" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "requirementsPet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "requirementsPet" ADD CONSTRAINT "requirementsPet_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
