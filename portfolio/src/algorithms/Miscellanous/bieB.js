class PrintJob {
    constructor(user, file, pages) {
        this.user = user;
        this.file = file;
        this.pages = pages;
        this.next = null;
    }
}

class PrintQueue {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    // Add a print job
    addJob(user, file, pages) {
        const job = new PrintJob(user, file, pages);

        if (this.tail === null) {
            this.head = job;
            this.tail = job;
        } else {
            this.tail.next = job;
            this.tail = job;
        }
    }

    // Print and remove the first job
    printNext() {
        if (this.head === null) {
            console.log("No print jobs.");
            return;
        }

        const job = this.head;

        console.log(`Printing: ${job.file}`);
        console.log(`User: ${job.user}`);
        console.log(`Pages: ${job.pages}`);

        this.head = this.head.next;

        if (this.head === null) {
            this.tail = null;
        }
    }

    // Show all waiting jobs
    showJobs() {
        let result = [];
        let curr = this.head;

        while (curr !== null) {
            result.push({
                user: curr.user,
                file: curr.file,
                pages: curr.pages
            });

            curr = curr.next;
        }

        return result;
    }

    isEmpty() {
        return this.head === null;
    }
}


// Main
function main() {
    const queue = new PrintQueue();

    queue.addJob("Alice", "Report.pdf", 15);
    queue.addJob("Bob", "Resume.pdf", 3);
    queue.addJob("Charlie", "Assignment.pdf", 8);
    queue.addJob("David", "Invoice.pdf", 5);

    console.log("Waiting jobs:");
    console.log(queue.showJobs());

    console.log("\n--- Printer ---");

    queue.printNext();
    queue.printNext();

    console.log("\nRemaining jobs:");
    console.log(queue.showJobs());
}

main();