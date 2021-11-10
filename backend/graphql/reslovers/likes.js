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

        updateLike: async (_, { likeId }, context) => {
            const user = await checkAuth(context)

            const like = await db.likes.findUnique({
                where: {
                    id: likeId
                },
                include: {
                    author: true,
                    recipe: true
                }
            })

            try {
                if (like.author.id === user.id) {
                    if (like.like === true) {
                        await db.recipes.update({
                            where: {
                                id: like.recipe.id
                            },
                            data: {
                                totalLikeValue: like.recipe.totalLikeValue - 1
                            }
                        })

                        return await db.likes.update({
                            where: {
                                id: likeId
                            },
                            data: {
                                like: false
                            }
                        })
                    } else if (like.like === false) {
                        await db.recipes.update({
                            where: {
                                id: like.recipe.id
                            },
                            data: {
                                totalLikeValue: like.recipe.totalLikeValue + 1
                            }
                        })

                        return await db.likes.update({
                            where: {
                                id: likeId
                            },
                            data: {
                                like: true
                            }
                        })
                    }
                } else {
                    throw new Error('author.id on like does not equal user.id')
                }
            } catch (error) {
                throw new Error(error)
            }
        } 
    }
}