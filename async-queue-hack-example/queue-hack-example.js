const async = require('async');

//Code for processing the task
var processQueue = function (message, callback) {
    setTimeout(function () {
        console.log(`Task ${message} completed`);
        if (message % 3 !== 0) {
            callback();
        }
    }, 500);
}

//Queue initialization. This queue process 3 tasks at a time
var queue = async.queue(processQueue, 3);

//After all tasks completion queue process this function
queue.drain = function () {
    console.log('Yuppie all tasks completed');
}

/**
 * To Figure out which tasks exactly troubling us.
 * Basically what this code is doing is we know usually each task take around 500ms on average.
 * So Every minute we are checking currently hat tasks is running.
 * We will compare in the last minute who are those and now who if we compare both we will get to know the culprits.
 */
var lastTimeInQueue = new Set();
setInterval(function () {
    let currentQueue = new Set();
    queue.workersList().forEach(workerTask => {
        currentQueue.add(workerTask.data);
        if (lastTimeInQueue.has(workerTask.data)) {
            console.error("Something wrong with this task: " + workerTask.data);
        }
    });
    lastTimeInQueue = currentQueue;
}, 1000);

//To add tasks to queue we are using this function.
var processTasks = function () {
    for (let index = 1; index <= 10; index++) {
        queue.push(index);
    }
}

processTasks();