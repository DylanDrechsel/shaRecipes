import db from '../../utils/generatePrisma.js'
import checkAuth from '../../utils/check-auth.js'
import { handleProfileOwnership } from '../../utils/handleDocumentOwnership.js'

export default {
    Query: {
        getUsersProfile: async (_, {}, context) => {
            const user = await checkAuth(context)

            try {
                return await db.profile.findUnique({
                    where: {
                        authorId: user.id
                    }
                })
            } catch (error) {
                throw new Error(error)
            }
        }
    },

    Mutation: {
        createProfile: async (_, { profileInput: { created, bio, imageUrl, imageKey }}, context) => {
            const user = checkAuth(context)

            try {
                return await db.profile.create({
                    data: {
                        created: created,
                        bio: bio,
                        imageUrl: imageUrl,
                        imageKey: imageKey,
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
        }
    }
}