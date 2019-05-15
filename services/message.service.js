const Message = require('../models/message');

function getMessages(senderId, recipientId) {
    return Message
        .find({
            $or: [
                {author: senderId, recipient: recipientId},
                {author: recipientId, recipient: senderId},
            ]
        })
        .sort('createdAt')
        .populate('author')
        .select('-recipient');
}

async function create(senderId, recipientId, content) {
    const message = await new Message({
        author: senderId,
        recipient: recipientId,
        content
    }).save();

    return message.populate('author').execPopulate();
}

module.exports.messageService = {
    create,
    getMessages
};