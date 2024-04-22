import ConverSation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async(req,res)=>{
    try {
        const {message} = req.body;
        const {id: reciverId} = req.params;
        const senderId = req.user._id

        let conversation = await ConverSation.findOne({
            participants: {$all: [reciverId, senderId]}
        })

        if(!conversation){
            conversation = await ConverSation.create({
                participants: [reciverId, senderId]
            })
        }

        const newMessage = new Message({
            senderId: senderId,
            recieverId: reciverId,
            message: message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
            
        }
        // await conversation.save()

        // This will run in parallel
        await Promise.all([conversation.save(), newMessage.save()])
        

        res.status(201).json(newMessage)



        
    } catch (error) {
        console.log("Error in sendMessage Controller: ", error.message);
        res.status(500).json({message: "Something went wrong"})
    }
}


export const getMessages = async(req, res)=>{
    try {

        const {id: userToChatId} = req.params
        const senderId = req.user._id
        const conversation = await ConverSation.findOne({
            participants: {$all: [senderId, userToChatId]}
        }).populate("messages"); //NOT REFERNCE BUT THE MESSAGE ITSELF


        if(!conversation){
            return res.status(400).json({message: "No conversation found"})
        }

        const messages = conversation.messages;
        res.status(200).json(messages)


        
    } catch (error) {
        console.log("Error in getMessage Controller: ", error.message);
        res.status(500).json({message: "Something went wrong"})
    }
}