-- CreateTable
CREATE TABLE "ContentMeta" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContentMeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contentMetaId" INTEGER,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "View" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contentMetaId" INTEGER,

    CONSTRAINT "View_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContentMeta_slug_key" ON "ContentMeta"("slug");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_contentMetaId_fkey" FOREIGN KEY ("contentMetaId") REFERENCES "ContentMeta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_contentMetaId_fkey" FOREIGN KEY ("contentMetaId") REFERENCES "ContentMeta"("id") ON DELETE SET NULL ON UPDATE CASCADE;
