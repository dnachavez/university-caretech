/*
  Warnings:

  - You are about to drop the column `documentPath` on the `ClearanceRequest` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClearanceRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "otherReason" TEXT,
    "purpose" TEXT NOT NULL,
    "dateNeeded" DATETIME NOT NULL,
    "additionalInfo" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "documentUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ClearanceRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ClearanceRequest_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ClearanceRequest" ("additionalInfo", "createdAt", "dateNeeded", "departmentId", "id", "otherReason", "purpose", "reason", "status", "updatedAt", "userId") SELECT "additionalInfo", "createdAt", "dateNeeded", "departmentId", "id", "otherReason", "purpose", "reason", "status", "updatedAt", "userId" FROM "ClearanceRequest";
DROP TABLE "ClearanceRequest";
ALTER TABLE "new_ClearanceRequest" RENAME TO "ClearanceRequest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
