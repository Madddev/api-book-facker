const {messageService} = require('../services/message.service');
const {getSocketFromUserId} = require('../socket/user');
const {MESSAGE_POSTED} = require('../socket/events');


exports.getAll = async (req, res, next) =>{
    try {
        const messages = await messageService.getMessages(req.user._id, req.params.recipient);
        res.status(200).json(messages);
    } catch (e) {
        next(e);
    }
};

exports.create =  async  (req, res, next) => {
    try {
        const message = await messageService.create(
            req.user._id,
            req.params.recipient,
            req.body.content
        );

        const socket = getSocketFromUserId(req.params.recipient);

        if (socket) {
            socket.emit(MESSAGE_POSTED, message);
        }

        res.status(201).json(message);
    } catch (e) {
        next(e);
    }
};
