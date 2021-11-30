import db from '../../utils/generatePrisma.js'
import checkAuth from '../../utils/check-auth.js'
import { handleFavoriteRecipeOwnership } from '../../utils/handleDocumentOwnership.js'

export default {
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
            const verified = await handleFavoriteRecipeOwnership(user.id, favoriteRecipeId)

            try {
                if (verified === true) {
                    return await db.favoriteRecipes.delete({
                        where: {
                            id: favoriteRecipeId
                        }
                    })
                }
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}