const cron = require("node-cron");
const logger = require("./logger");

class Scheduler {

    start() {

        logger.info("Scheduler Started");

        // প্রতিদিন সকাল ৯:০০ টায় চলবে
        cron.schedule("0 9 * * *", async () => {

            logger.info("Running Daily AI Automation...");

            // পরে এখানে AI Script + Video + Facebook Post হবে

        });

    }

}

module.exports = new Scheduler();
