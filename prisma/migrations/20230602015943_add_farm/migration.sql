-- CreateTable
CREATE TABLE "Farm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "slots" INTEGER NOT NULL,
    "averageAPY" REAL NOT NULL,
    "pricePerSlot" REAL NOT NULL
);
