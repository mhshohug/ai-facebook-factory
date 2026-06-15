class QueueService {

    constructor() {
        this.jobs = [];
    }

    add(job) {
        this.jobs.push(job);
        return this.jobs.length;
    }

    next() {
        return this.jobs.shift();
    }

    list() {
        return this.jobs;
    }

    size() {
        return this.jobs.length;
    }

    clear() {
        this.jobs = [];
    }

}

module.exports = new QueueService();
