import db from '../../utils/generatePrisma.js'
import checkAuth from '../../utils/check-auth.js'
import { UserInputError } from 'apollo-server-core'

export default {
    Mutation: {
        createLike: async (_, { recipeId }, context) => {
            const user = await checkAuth(context)

            try {
                const recipe = await db.recipes.findUnique({
                    where: {
                        id: recipeId
                    },
                    include: {
                        likes: true
                    }
                })

                await db.recipes.update({
                    where: {
                        id: recipeId
                    },
                    data: {
                        totalLikeValue: recipe.totalLikeValue + 1
                    }
                })

                return await db.likes.create({
                    data: {
                        like: true,
                        recipe: {
                            connect: {
                                id: recipeId
                            }
                        },
                        author: {
                           connect: {
                               id: user.id
                           } 
                        }
                    }
                })
            } catch (error) {
                throw new Error(error)
            }
        },

        updateLike: async (_, { recipeId, likeId }, context) => {
            const user = await checkAuth(context)
        } 
    }
}