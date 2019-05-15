const store = new Map();

function getUserIdFromSocket(socket) {
    for (const [id, sock] of store) {
        if (socket === sock) {
            return id;
        }
    }

    return null;
}

function getSocketFromUserId(userId) {
    for (const [id, sock] of store) {
        if ((typeof userId === 'object' && userId.equals(id)) || userId === id) {
            return sock;
        }
    }

    return null;
}
module.exports = {
    getUserIdFromSocket,
    getSocketFromUserId,
};