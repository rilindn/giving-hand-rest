"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const HttpException_1 = tslib_1.__importDefault(require("@utils/HttpException"));
const chat_model_1 = tslib_1.__importDefault(require("@models/chat.model"));
const getMyChats = ({ id, search }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const chats = yield chat_model_1.default.find({
            $or: [
                { firstUserId: new mongoose_1.default.Types.ObjectId(id) },
                { secondUserId: new mongoose_1.default.Types.ObjectId(id) },
            ],
        });
        const chatsResolved = yield Promise.all(chats.map((chat) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const otherUserKeyField = chat.firstUserId.toString() === id ? 'secondUserId' : 'firstUserId';
            const chatResolved = yield chat_model_1.default.aggregate([
                {
                    $match: { _id: new mongoose_1.default.Types.ObjectId(chat._id) },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: otherUserKeyField,
                        foreignField: '_id',
                        as: 'otherUser',
                    },
                },
                {
                    $unwind: '$otherUser',
                },
                {
                    $project: {
                        'otherUser.password': 0,
                    },
                },
                {
                    $match: Object.assign({}, (search && {
                        $or: [
                            {
                                'otherUser.firstName': {
                                    $regex: search,
                                    $options: 'i',
                                },
                            },
                            {
                                'otherUser.lastName': {
                                    $regex: search,
                                    $options: 'i',
                                },
                            },
                        ],
                    })),
                },
            ]);
            return chatResolved[0];
        })));
        if (!chatsResolved.length)
            throw new HttpException_1.default('No chats found!');
        return lodash_1.default.chain(chatsResolved).flatMapDeep().filter(Boolean).value();
    }
    catch (error) {
        throw new HttpException_1.default(error);
    }
});
const getChatById = (id, otherUserKeyField) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield chat_model_1.default.aggregate([
            {
                $match: { _id: new mongoose_1.default.Types.ObjectId(id) },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: otherUserKeyField,
                    foreignField: '_id',
                    as: 'otherUser',
                },
            },
            {
                $unwind: '$otherUser',
            },
            {
                $project: {
                    'otherUser.password': 0,
                },
            },
        ]);
        if (!chat)
            throw new HttpException_1.default('No chat found!');
        return chat[0];
    }
    catch (error) {
        throw new HttpException_1.default(error);
    }
});
const createChat = ({ firstUserId, secondUserId }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const firstUser = new mongoose_1.default.Types.ObjectId(firstUserId);
    const secondUser = new mongoose_1.default.Types.ObjectId(secondUserId);
    try {
        const existingChat = yield chat_model_1.default.findOne({
            firstUserId: { $in: [firstUser, secondUser] },
            secondUserId: { $in: [secondUser, firstUser] },
        });
        if (existingChat)
            return existingChat;
        const chat = new chat_model_1.default({ firstUserId: firstUser, secondUserId: secondUser });
        yield chat.save();
        return chat;
    }
    catch (error) {
        throw new HttpException_1.default(error);
    }
});
const newMessage = (id, payload) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield chat_model_1.default.findById(id);
        if (!chat)
            throw new HttpException_1.default('Chat not found!', 404);
        chat.messages.push(payload);
        yield chat.save();
        return chat;
    }
    catch (error) {
        throw new HttpException_1.default(error);
    }
});
function readAllMessages(chatId, receiverId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const chat = yield chat_model_1.default.findById(chatId);
            chat.messages = chat.messages.map((message) => {
                if (message.receiverId.toString() !== receiverId)
                    return message;
                return Object.assign(Object.assign({}, message), { seen: true });
            });
            yield chat.save();
            return chat;
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
const deleteMessage = (chatId, messageId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield chat_model_1.default.findById(chatId);
        if (!chat)
            throw new HttpException_1.default('Chat not found!', 404);
        chat.messages = chat.messages.filter((message) => (message === null || message === void 0 ? void 0 : message._id.toString()) !== messageId);
        yield chat.save();
        return chat;
    }
    catch (error) {
        throw new HttpException_1.default(error);
    }
});
// const deleteChat = async (req: Request, res: Response) => {
//   const { id } = req.params
//   try {
//     const deletedChat = await Chat.findByIdAndDelete(id)
//     if (!deletedChat) return res.status(404).send('Chat not found!')
//     res.status(200).send(deletedChat)
//   } catch (error) {
//     return res.status(500).send(error)
//   }
// }
exports.default = {
    getMyChats,
    getChatById,
    createChat,
    newMessage,
    readAllMessages,
    deleteMessage,
};
//# sourceMappingURL=chat.service.js.map