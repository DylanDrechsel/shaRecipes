import db from '../../utils/generatePrisma.js';
import checkAuth from '../../utils/check-auth.js';
import { handleCommentOwnership } from '../../utils/handleDocumentOwnership.js';

export default {
    Mutation: {
        createComment: async (_, { recipeId, content }, context) => {
            const user = await checkAuth(context)

            try {
                return await db.comments.create({
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
                    return await db.comments.update({
                        where: {
                            id: commentId
                        },
                        data: {
                            content: content
                        }
                    })
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
                    return await db.comments.delete({
                        where: {
                            id: commentId
                        }
                    })
                }
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}