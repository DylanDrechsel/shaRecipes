import db from '../../utils/generatePrisma.js';
import checkAuth from '../../utils/check-auth.js';

export default {
    Query: {
        getChatrooms : async (_, {}, context) => {
            const user = await checkAuth(context)
            console.log(db)

            try {
                return await db.chatrooms.findMany({
                    include: {
                        author: true
                    }
                })
            } catch (error) {
                console.log('ERROR HIT', error)
                throw new Error(error)
            }
        }
    },

    Mutation: {
        createChatroom: async (_, {guests}, context) => {
            const user = await checkAuth(context)

            console.log(guests)

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
                console.log(error)
                throw new Error(error)
            }
        }
    }
}