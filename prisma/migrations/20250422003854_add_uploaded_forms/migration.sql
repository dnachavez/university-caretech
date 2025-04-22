-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UploadedForm" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "formType" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UploadedForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UploadedForm" ("createdAt", "filePath", "formType", "id", "notes", "updatedAt", "userId") SELECT "createdAt", "filePath", "formType", "id", "notes", "updatedAt", "userId" FROM "UploadedForm";
DROP TABLE "UploadedForm";
ALTER TABLE "new_UploadedForm" RENAME TO "UploadedForm";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
