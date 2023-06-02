-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Farm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT '',
    "image" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "slots" INTEGER NOT NULL,
    "averageAPY" REAL NOT NULL,
    "pricePerSlot" REAL NOT NULL
);
INSERT INTO "new_Farm" ("averageAPY", "id", "image", "location", "pricePerSlot", "slots") SELECT "averageAPY", "id", "image", "location", "pricePerSlot", "slots" FROM "Farm";
DROP TABLE "Farm";
ALTER TABLE "new_Farm" RENAME TO "Farm";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
