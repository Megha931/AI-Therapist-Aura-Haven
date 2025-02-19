import User from "../models/User.js";
import { configureGemini } from "../config/gemini-config.js";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
        }
        // Prepend a system message to set the AI's tone
        const systemMessage = "You are a caring and supportive friend. Respond with warmth, empathy, and encouragement, as if comforting someone close to you. Keep it natural, conversational, and heartfelt.";
        // Convert chat history into a string for Gemini
        const chats = user.chats.map(({ role, content }) => `${role}: ${content}`);
        // Modify user input to enhance emotional understanding
        const enhancedMessage = `Your friend is feeling down and says: "${message}". How would you respond in a comforting and uplifting way?`;
        // Add to conversation history
        user.chats.push({ content: message, role: "user" });
        // Initialize Gemini API with temperature setting
        const genAI = configureGemini();
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            generationConfig: { temperature: 0.8 }, // Correct way to set temperature
        });
        // Generate response
        const result = await model.generateContent([systemMessage, enhancedMessage].join("\n"));
        const responseText = result.response.text();
        // Store response
        user.chats.push({ content: responseText, role: "assistant" });
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map