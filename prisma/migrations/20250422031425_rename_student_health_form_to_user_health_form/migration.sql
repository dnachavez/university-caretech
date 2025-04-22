/*
  Warnings:

  - You are about to drop the `StudentHealthForm` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "StudentHealthForm";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserHealthForm" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleInitial" TEXT,
    "birthdate" DATETIME NOT NULL,
    "gender" TEXT NOT NULL,
    "birthPlace" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "guardianName" TEXT,
    "guardianContact" TEXT,
    "emergencyContact" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "emergencyNumber" TEXT NOT NULL,
    "bloodType" TEXT,
    "signaturePath" TEXT NOT NULL,
    "dateSigned" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pastIllnesses" TEXT,
    "hospitalization" TEXT,
    "medications" TEXT,
    "allergies" BOOLEAN NOT NULL DEFAULT false,
    "immunized" BOOLEAN NOT NULL DEFAULT false,
    "communicableDisease" BOOLEAN NOT NULL DEFAULT false,
    "asthmatic" BOOLEAN NOT NULL DEFAULT false,
    "chronicIllness" BOOLEAN NOT NULL DEFAULT false,
    "hiking" BOOLEAN NOT NULL DEFAULT false,
    "dancing" BOOLEAN NOT NULL DEFAULT false,
    "swimming" BOOLEAN NOT NULL DEFAULT false,
    "basketball" BOOLEAN NOT NULL DEFAULT false,
    "ballgames" BOOLEAN NOT NULL DEFAULT false,
    "jogging" BOOLEAN NOT NULL DEFAULT false,
    "football" BOOLEAN NOT NULL DEFAULT false,
    "badminton" BOOLEAN NOT NULL DEFAULT false,
    "calisthenics" BOOLEAN NOT NULL DEFAULT false,
    "wallclimbing" BOOLEAN NOT NULL DEFAULT false,
    "notFitActivities" TEXT,
    "medicationPermission" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "UserHealthForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserHealthForm_userId_key" ON "UserHealthForm"("userId");
