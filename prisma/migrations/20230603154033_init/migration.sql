-- CreateTable
CREATE TABLE "Farm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "slots" INTEGER NOT NULL,
    "averageAPY" REAL NOT NULL,
    "pricePerSlot" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Investment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "farmName" TEXT NOT NULL,
    "yieldEarned" REAL NOT NULL,
    "dateInvested" DATETIME NOT NULL,
    "investedAmount" REAL NOT NULL,
    "APY" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "slots" INTEGER NOT NULL,
    "walletId" TEXT,
    CONSTRAINT "Investment_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_id_key" ON "Wallet"("id");
