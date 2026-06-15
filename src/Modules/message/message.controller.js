import { messageModel } from "../../../DB/Models/message.model.js";
import { userModel } from "../../../DB/Models/user.model.js";

export const sendMessage = async (req, res) => {
    const { content, sendTo } = req.body;
    const userCheck = await userModel.findById(sendTo)
    if (!userCheck) {
        return res.status(404).json({ message: "user not found !" })
    }
    const newMessage = new messageModel({ content, sendTo })
    await newMessage.save()
    return res.status(201).json({ message: "Message sent successfully", newMessage })
}

export const getMessage = async (req, res) => {
    const { _id } = req.authUser;
    const messages = await messageModel.find({ sendTo: _id })
    if (messages.length == 0) {
        return res.status(404).json({ message: "No messages found !" })
    }
    return res.status(200).json({ message: "Messages retrieved successfully", messages })
}

export const deleteMessage = async (req, res) => {
    const {_id}= req.authUser
    const { msgId } = req.params; // user id and message id

    const message = await messageModel.findOneAndDelete({ _id: msgId, sendTo: _id });
    if (!message) {
        return res.status(404).json({ message: "you are not the owner of this message !" })
    }
    return res.status(200).json({ message: "Message deleted successfully", message })
}
