import db from '../../utils/generatePrisma.js'
import checkAuth from '../../utils/check-auth.js'

export default {
    Mutation: {
        createMessage: async (_, { chatroomId, content }, context) => {
            const user = await checkAuth(context)

            try {
                return await db.messages.create({
                    data: {
                        content: content,
                        author: {
                            connect: {
                                id: user.id
                            }
                        },
                        chatroom: {
                            connect: {
                                id: chatroomId
                            }
                        }
                    }
                })
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}