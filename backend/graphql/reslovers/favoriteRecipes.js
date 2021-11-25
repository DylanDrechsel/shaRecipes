import db from '../../utils/generatePrisma.js'
import checkAuth from '../../utils/check-auth.js'

export default {
    Mutation: {
        createFavoriteRecipe: async (_, { recipeId }, context) => {
            const user = checkAuth(context)

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
                console.log(error)
                throw new Error(error)
            }
        }
    }
}