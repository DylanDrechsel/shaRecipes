import db from '../../utils/generatePrisma.js'
import checkAuth from '../../utils/check-auth.js'
import { handleLikeOwnership, handleToLikeOrUnLike } from '../../utils/handleDocumentOwnership.js'

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

        updateLike: async (_, { likeId }, context) => {
            const user = await checkAuth(context)
            const verified = await handleLikeOwnership(user.id, likeId)
            const likeInformation = await handleToLikeOrUnLike(likeId)

            try {
                if (verified === true) {
                    await db.recipes.update({
                        where: {
                            id: likeInformation.recipeId
                        },
                        data: {
                            totalLikeValue: likeInformation.totalLikeValue
                        }
                    })

                    return await db.likes.update({
                        where: {
                            id: likeId
                        },
                        data: {
                            like: likeInformation.likeBool
                        }
                    })
                }
            } catch (error) {
                throw new Error(error)
            }
        } 
    }
}