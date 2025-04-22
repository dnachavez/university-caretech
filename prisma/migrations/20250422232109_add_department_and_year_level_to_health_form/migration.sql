-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserHealthForm" (
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
    "departmentId" TEXT,
    "yearLevel" TEXT,
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
    CONSTRAINT "UserHealthForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserHealthForm_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_UserHealthForm" ("addressLine1", "addressLine2", "allergies", "asthmatic", "badminton", "ballgames", "basketball", "birthPlace", "birthdate", "bloodType", "calisthenics", "chronicIllness", "city", "communicableDisease", "dancing", "dateSigned", "emergencyContact", "emergencyNumber", "firstName", "football", "gender", "guardianContact", "guardianName", "hiking", "hospitalization", "id", "immunized", "jogging", "lastName", "medicationPermission", "medications", "middleInitial", "notFitActivities", "pastIllnesses", "postalCode", "relationship", "signaturePath", "state", "swimming", "userId", "wallclimbing") SELECT "addressLine1", "addressLine2", "allergies", "asthmatic", "badminton", "ballgames", "basketball", "birthPlace", "birthdate", "bloodType", "calisthenics", "chronicIllness", "city", "communicableDisease", "dancing", "dateSigned", "emergencyContact", "emergencyNumber", "firstName", "football", "gender", "guardianContact", "guardianName", "hiking", "hospitalization", "id", "immunized", "jogging", "lastName", "medicationPermission", "medications", "middleInitial", "notFitActivities", "pastIllnesses", "postalCode", "relationship", "signaturePath", "state", "swimming", "userId", "wallclimbing" FROM "UserHealthForm";
DROP TABLE "UserHealthForm";
ALTER TABLE "new_UserHealthForm" RENAME TO "UserHealthForm";
CREATE UNIQUE INDEX "UserHealthForm_userId_key" ON "UserHealthForm"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
