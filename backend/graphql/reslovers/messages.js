import db from '../../utils/generatePrisma.js'
import checkAuth from '../../utils/check-auth.js'

export default {
    Query: {
        getMessagesForChatroom: async (_, { chatroomId }, context) => {
            const user = await checkAuth(context)

            try {
                return await db.messages.findUnique({
                    where: {
                        id: chatroomId
                    },
                    include: {
                        author: true,
                        chatroom: true
                    }
                })
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}