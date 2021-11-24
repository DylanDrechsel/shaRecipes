import db from '../../utils/generatePrisma.js'
import checkAuth from '../../utils/check-auth.js'
import { handleIfGuestIsInChatroom } from '../../utils/handleDocumentOwnership.js'

export default {
    Mutation: {
        createMessage: async (_, { chatroomId, content }, context) => {
            const user = await checkAuth(context)
            const verified = await handleIfGuestIsInChatroom(user.id, chatroomId)

            try {
                if (verified === true) {
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
                }
            } catch (error) {
                throw new Error(error)
            }
        },

        /* deleteMessage: async (_, { messageId }, context) => {
            const user = await checkAuth(context)
        } */
    }
}