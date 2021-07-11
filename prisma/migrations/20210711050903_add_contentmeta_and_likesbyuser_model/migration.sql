-- CreateTable
CREATE TABLE "ContentMeta" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "likes" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikesByUser" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likes" INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContentMeta.slug_unique" ON "ContentMeta"("slug");
