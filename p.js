class Process {
    constructor(name, arrivalTime, burstTime, priority) {
        this.name = name;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.priority = priority;
        this.waitingTime = 0;
        this.turnAroundTime = 0;
        this.responseTime = 0;
    }
}

function calculateTimes(processes) {
    let currentTime = 0;
    let totalWaitingTime = 0;
    let totalTurnAroundTime = 0;
    let totalResponseTime = 0;
    const timeline = [];

    let cloneProcesses = [...processes];
    let currentProcesses = [];
    let countdown = processes.length;

    while (countdown > 0) {
        for (let i = 0; i < cloneProcesses.length; i++) {
            const process = cloneProcesses[i];
            if (process.arrivalTime <= currentTime) {
                currentProcesses.push(process);
                cloneProcesses.splice(i, 1);
                i--;
            }
        }

        if (currentProcesses.length === 0) {currentTime = cloneProcesses[0].arrivalTime; continue;}
        currentProcesses.sort((a, b) => a.priority - b.priority);
        const process = currentProcesses[0];
        currentProcesses.splice(0, 1);
        countdown--;

        const endTime = currentTime + process.burstTime;
        process.waitingTime = currentTime - process.arrivalTime;
        totalWaitingTime += process.waitingTime;
        process.turnAroundTime = endTime - process.arrivalTime;
        totalTurnAroundTime += process.turnAroundTime;
        process.responseTime = currentTime - process.arrivalTime;
        totalResponseTime += process.responseTime;

        timeline.push({ process: process, startTime: currentTime, endTime: endTime });
        currentTime = endTime;
    }

    return { timeline, totalWaitingTime, totalTurnAroundTime, totalResponseTime };
}

function printProcesses(processes) {
    console.log("Process\tWaiting Time\tTurnaround Time");
    for (let i = 0; i < processes.length; i++) {
        console.log(`${processes[i].name}\t\t${processes[i].waitingTime}\t\t${processes[i].turnAroundTime}`);
    }
}

let processes = [
    new Process("P1", 0, 5, 2),
    new Process("P2", 1, 3, 1),
    new Process("P3", 2, 8, 3),
    new Process("P4", 3, 6, 4)
];

let results = calculateTimes(processes);
printProcesses(processes);
console.log("Total Waiting Time: ", results.totalWaitingTime);
console.log("Total Turnaround Time: ", results.totalTurnAroundTime);
console.log("Total Response Time: ", results.totalResponseTime);
