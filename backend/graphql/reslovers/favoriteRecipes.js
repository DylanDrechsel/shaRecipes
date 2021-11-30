import db from '../../utils/generatePrisma.js'
import checkAuth from '../../utils/check-auth.js'

export default {
    /* STOP USER FROM FAVORITING THE SAME RECIPE TWICE */
    Mutation: {
        createFavoriteRecipe: async (_, { recipeId }, context) => {
            const user = await checkAuth(context)

            const userInformation = await db.user.findUnique({
                where: {
                    id: user.id
                },
                include: {
                    favoriteRecipes: true
                }
            })

            const checking = (favoriteRecipes) => {
                favoriteRecipes.forEach(recipe => {
                    if (recipeId === recipe.recipeId) {
                        throw new Error('Already saved this recipe')
                    }
                })
            }

            await checking(userInformation.favoriteRecipes)

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