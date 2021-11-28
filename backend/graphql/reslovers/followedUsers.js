import db from '../../utils/generatePrisma.js';
import checkAuth from '../../utils/check-auth.js';

export default {
    Mutation: {
        createFollowedUser: async (_, { followedUserId, followedUsername }, context) => {
            const user = await checkAuth(context)

            try {
                return await db.followedUsers.create({
                    data: {
                        followedUsername: followedUsername,
                        followedUserId: followedUserId,
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

        deleteFollowedUser: async (_, { followedUserId }, context) => {
            const user = await checkAuth(context)

            try {
                return await db.followedUsers.delete({
                    where: {
                        id: followedUserId
                    }
                })
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}