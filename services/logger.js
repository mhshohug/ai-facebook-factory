const fs = require("fs");
const path = require("path");

class Logger {

    constructor() {
        this.logDir = path.join(__dirname, "../logs");

        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    write(level, message) {

        const now = new Date().toISOString();

        const log = `[${now}] [${level}] ${message}\n`;

        console.log(log);

        fs.appendFileSync(
            path.join(this.logDir, "app.log"),
            log
        );
    }

    info(message) {
        this.write("INFO", message);
    }

    warn(message) {
        this.write("WARN", message);
    }

    error(message) {
        this.write("ERROR", message);
    }

}

module.exports = new Logger();
