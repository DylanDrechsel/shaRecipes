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
    }
}