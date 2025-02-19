import { GoogleGenerativeAI } from "@google/generative-ai";
export const configureGemini = () => {
    return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
};
export default configureGemini;
//# sourceMappingURL=gemini-config.js.map