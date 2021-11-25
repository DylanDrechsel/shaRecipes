-- CreateTable
CREATE TABLE "favoriteRecipes" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favoriteRecipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RecipesTofavoriteRecipes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RecipesTofavoriteRecipes_AB_unique" ON "_RecipesTofavoriteRecipes"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipesTofavoriteRecipes_B_index" ON "_RecipesTofavoriteRecipes"("B");

-- AddForeignKey
ALTER TABLE "favoriteRecipes" ADD CONSTRAINT "favoriteRecipes_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoriteRecipes" ADD CONSTRAINT "favoriteRecipes_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipesTofavoriteRecipes" ADD FOREIGN KEY ("A") REFERENCES "Recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipesTofavoriteRecipes" ADD FOREIGN KEY ("B") REFERENCES "favoriteRecipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
