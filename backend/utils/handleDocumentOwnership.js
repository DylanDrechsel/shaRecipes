import db from './generatePrisma.js';

const handleDocumentOwnership = async (userId, recipeId) => {
    const document = await db.recipes.findUnique({
        where: {
            id: recipeId
         },
        include: {
            author: true
        }
    })

    if (document.author.id === userId) {
        return true
    }
    return false
}

const handleProfileOwnership = async (userId, profileId) => {
    const document = await db.user.findUnique({
        where: {
            id: userId
        },
        include: {
            profile: true
        }
    })

    if (profileId === document.profile.id && userId === document.id) {
        return true
    }
    return false
}

const handleCommentOwnership = async (userId, commentId) => {
    const document = await db.comment.findUnique({
        where: {
            id: commentId
        },
        include: {
            author: true
        }
    })

    if (userId === document.author.id) {
        return true
    }
    return false
}

const handleChatroomOwnership = async (userId, chatroomId) => {
    const document = await db.chatrooms.findUnique({
        where: {
            id: chatroomId
        },
        include: {
            author: true
        }
    })

    if (userId === document.author.id) {
        return true
    }
    return false
}

const handleIfGuestIsInChatroom = async (userId, chatroomId) => {
    const user = await db.user.findUnique({
        where: {
            id: userId
        }
    })

    const chatroom = await db.chatrooms.findUnique({
        where: {
            id: chatroomId
        }
    })

    if (userId !== chatroom.authorId) {
        guests.forEach(name => {
            if (user.username === name) {
                return true
            } else {
                throw new Error('Not a guest of the chatroom')
            }
        })
    } else {
        return true
    }
}

export {
    handleDocumentOwnership, 
    handleProfileOwnership, 
    handleCommentOwnership, 
    handleChatroomOwnership,
    handleIfGuestIsInChatroom
}