import db from '../../utils/generatePrisma.js';
import checkAuth from '../../utils/check-auth.js';

export default {
    Mutation: {
        createChatroom: async (_, {}, context) => {
            const user = await checkAuth(context)
        }
    }
}