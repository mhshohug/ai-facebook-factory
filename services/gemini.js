const { GoogleGenerativeAI } = require("@google/generative-ai");

class GeminiService {

    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });
    }

    async generateScript(topic) {

        try {

            const prompt = `
তুমি একজন পেশাদার বাংলা ভিডিও স্ক্রিপ্ট রাইটার।

বিষয়: ${topic}

একটি ১-২ মিনিটের ভিডিওর জন্য আকর্ষণীয় বাংলা স্ক্রিপ্ট লিখো।
শুধু স্ক্রিপ্ট দাও, অন্য কিছু নয়।
`;

            const result = await this.model.generateContent(prompt);

            const text = result.response.text();

            return {
                success: true,
                text
            };

        } catch (err) {

            return {
                success: false,
                error: err.message
            };

        }

    }

}

module.exports = new GeminiService();
