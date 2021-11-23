import db from '../../utils/generatePrisma.js';
import checkAuth from '../../utils/check-auth.js';
import { handleChatroomOwnership } from '../../utils/handleDocumentOwnership.js';

export default {
    Mutation: {
        createChatroom: async (_, { guests }, context) => {
            const user = await checkAuth(context)

            try {
                return await db.chatrooms.create({
                    data: {
                        guests: [ ...guests ],
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

        updateChatroom: async(_, { chatroomId, guests }, context) => {
            const user = await checkAuth(context)
            const verified = await handleChatroomOwnership(user.id, chatroomId)

            try {
                if (verified === true) {
                    return await db.chatrooms.update({
                        where: {
                            id: chatroomId
                        },
                        data: {
                            guests: [ ...guests ]
                        }
                    })
                } else {
                    throw new Error('Not chatroom owner')
                }
            } catch (error) {
                throw new Error(error)
            }
        },

        deleteChatroom: async (_, { chatroomId }, context) => {
            const user = await checkAuth(context)
            const verified = await handleChatroomOwnership(user.id, chatroomId)

            try {
                if (verified === true) {
                    return await db.chatrooms.delete({
                        where: {
                            id: chatroomId
                        }
                    })
                } else {
                    throw new Error('Not chatroom owner')
                }
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}