
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
        }
    }
}