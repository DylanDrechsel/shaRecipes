import db from '../../utils/generatePrisma.js'
import checkAuth from '../../utils/check-auth.js'
import { handleProfileOwnership } from '../../utils/handleDocumentOwnership.js'

export default {
    Mutation: {
        createProfile: async (_, { profileInput: { bio, imageUrl, imageKey }}, context) => {
            const user = await checkAuth(context)

            try {
                return await db.profile.create({
                    data: {
                        created: true,
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
        },

        updateProfile: async (_, { profileId, profileInput: { created, bio, imageUrl, imageKey }}, context) => {
            const user = await checkAuth(context)
            const verified = await handleProfileOwnership(user.id, profileId)

            try {
                if (verified === true) {
                    return await db.profile.update({
                        where: {
                            authorId: user.id
                        },
                        data: {
                        created: created,
                        bio: bio,
                        imageUrl: imageUrl,
                        imageKey: imageKey,
                        }
                    })
                } else {
                    throw new Error('Not profile owner')
                }
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}