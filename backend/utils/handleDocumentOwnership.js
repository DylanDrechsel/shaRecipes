import favoriteRecipes from '../graphql/reslovers/favoriteRecipes.js';
import followedUsers from '../graphql/reslovers/followedUsers.js';
import db from './generatePrisma.js';

const handleRecipeOwnership = async (userId, recipeId) => {
    const recipe = await db.recipes.findUnique({
        where: {
            id: recipeId
         },
        include: {
            author: true
        }
    })

    if (recipe.author.id === userId) {
        return true
    }
    
    throw new Error('Not recipe owner')
}

const handleProfileOwnership = async (userId, profileId) => {
    const user = await db.user.findUnique({
        where: {
            id: userId
        },
        include: {
            profile: true
        }
    })

    if (profileId === user.profile.id && userId === user.id) {
        return true
    }
    throw new Error('Not profile owner')
}

const handleCommentOwnership = async (userId, commentId) => {
    const comment = await db.comments.findUnique({
        where: {
            id: commentId
        },
        include: {
            author: true
        }
    })

    if (userId === comment.author.id) {
        return true
    }
    throw new Error('Not comment Owner')
}

const handleLikeOwnership = async (userId, likeId) => {
    const like = await db.likes.findUnique({
        where: {
            id: likeId
        },
        include: {
            author: true
        }
    })

    if (like.author.id === userId) {
        return true
    }
    throw new Error('Not like owner')
}

const handleToLikeOrUnLike = async (likeId) => {
    const like = await db.likes.findUnique({
        where: {
            id: likeId
        },
        include: {
            author: true,
            recipe: true
        }
    })
    let totalLikeValue = like.recipe.totalLikeValue
    const recipeId = like.recipe.id

    
    if (like.like === true) {
        const likeBool = false
        totalLikeValue -= 1
        return { likeBool, totalLikeValue, recipeId }
    } else if (like.like === false) {
        const likeBool = true
        totalLikeValue += 1
        return { likeBool, totalLikeValue, recipeId }
    }
    throw new Error('like is neither true or false')
}

const handleChatroomOwnership = async (userId, chatroomId) => {
    const chatroom = await db.chatrooms.findUnique({
        where: {
            id: chatroomId
        },
        include: {
            author: true
        }
    })

    if (userId === chatroom.author.id) {
        return true
    }
    throw new Error('Not chatroom owner')
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

const handleMessageOwnership = async (userId, messageId) => {
    const message = await db.messages.findUnique({
        where: {
            id: messageId
        }
    })

    if (userId === message.authorId) {
        return true
    }
    throw new Error('Not message owner')
}

const handleFavoriteRecipeOwnership = async (userId, favoriteRecipeId) => {
    const favoriteRecipe = await db.favoriteRecipes.findUnique({
        where: {
            id: favoriteRecipeId
        }
    })

    if (userId === favoriteRecipe.authorId) {
        return true
    }
    throw new Error('Not account owner')
}

const handleFollowedUserOwnership = async (userId, followedUsersId) => {
    const followedUser = await db.followedUsers.findUnique({
        where: {
            id: followedUsersId
        }
    })

    if (userId === followedUser.authorId) {
        return true
    }
    throw new Error('Not account owner')
}

// console.log(handleFollowedUserOwnership(1, 1))


export {
    handleRecipeOwnership, 
    handleProfileOwnership, 
    handleCommentOwnership,
    handleLikeOwnership,
    handleToLikeOrUnLike, 
    handleChatroomOwnership,
    handleIfGuestIsInChatroom,
    handleMessageOwnership,
    handleFavoriteRecipeOwnership,
    handleFollowedUserOwnership
}