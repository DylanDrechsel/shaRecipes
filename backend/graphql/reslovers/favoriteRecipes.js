import db from '../../utils/generatePrisma.js'
import checkAuth from '../../utils/check-auth.js'

export default {
    /* STOP USER FROM FAVORITING THE SAME RECIPE TWICE */
    Mutation: {
        createFavoriteRecipe: async (_, { recipeId }, context) => {
            const user = await checkAuth(context)

            try {
                return await db.favoriteRecipes.create({
                    data: {
                        recipes: {
                            connect: {
                                id: recipeId
                            }
                        },
                        author: {
                            connect: {
                                id: user.id
                            }
                        },
                        recipeId: recipeId,
                    }
                })
            } catch (error) {
                throw new Error(error)
            }
        },

        deleteFavoriteRecipe: async (_, { favoriteRecipeId }, context) => {
            const user = checkAuth(context)

            try {
                return await db.favoriteRecipes.delete({
                    where: {
                        id: favoriteRecipeId
                    }
                })
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}