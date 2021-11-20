import db from '../../utils/generatePrisma.js';
import checkAuth from '../../utils/check-auth.js';

export default {
    Mutation: {
        createChatroom: async (_, {guests}, context) => {
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
                console.log(error)
                throw new Error(error)
            }
        }
    }
}