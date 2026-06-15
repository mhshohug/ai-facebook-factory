const fs = require("fs");
const path = require("path");

class SubtitleService {

    async generate(text) {

        try {

            const outputDir = path.join(__dirname, "../output");

            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            const file = path.join(outputDir, "subtitle.srt");

            const sentences = text
                .split(/[.!?।]/)
                .map(s => s.trim())
                .filter(Boolean);

            let srt = "";
            let start = 0;

            for (let i = 0; i < sentences.length; i++) {

                const end = start + 4;

                srt += `${i + 1}\n`;
                srt += `${this.time(start)} --> ${this.time(end)}\n`;
                srt += `${sentences[i]}\n\n`;

                start = end;
            }

            fs.writeFileSync(file, srt, "utf8");

            return {
                success: true,
                file
            };

        } catch (err) {

            return {
                success: false,
                error: err.message
            };

        }

    }

    time(sec) {

        const h = String(Math.floor(sec / 3600)).padStart(2, "0");
        const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
        const s = String(sec % 60).padStart(2, "0");

        return `${h}:${m}:${s},000`;

    }

}

module.exports = new SubtitleService();
