
import db from '../../utils/generatePrisma.js';
import checkAuth from '../../utils/check-auth.js';
import { handleCommentOwnership } from '../../utils/handleDocumentOwnership.js';

export default {
    Query: {

    },

    Mutation: {
        createComment: async (_, { recipeId, content }, context) => {
            const user = await checkAuth(context)

            try {
                return await db.comment.create({
                    data: {
                        content: content,
                        author: {
                            connect: {
                                id: user.id
                            }
                        },
                        recipe: {
                            connect: {
                                id: recipeId
                            }
                        }
                    },
                })
            } catch (error) {
                throw new Error(error)
            }
        },

        updateComment: async (_, { commentId, content }, context) => {
            const user = await checkAuth(context)
            const verfied = await handleCommentOwnership(user.id, commentId)

            try {
                if (verfied === true) {
                    return await db.comment.update({
                        where: {
                            id: commentId
                        },
                        data: {
                            content: content
                        }
                    })
                } else {
                    throw new Error('Not Comment Owner')
                }
            } catch (error) {
                throw new Error(error)
            }
        },

        deleteComment: async (_, { commentId }, context) => {
            const user = await checkAuth(context)
            const verfied = await handleCommentOwnership(user.id, commentId)

            try {
                if (verfied === true) {
                    return await db.comment.delete({
                        where: {
                            id: commentId
                        }
                    })
                } else {
                    throw new Error('Not Comment Owner')
                }
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}