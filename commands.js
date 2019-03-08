const fs = require("fs");

function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {
    const userInputArray = userInput.split(" ");
    const command = userInputArray[0];

    switch (command) {
        default:
            commandLibrary.default(userInput);
            break;
        case "echo":
            commandLibrary.echo(userInputArray.slice(1).join(" "));
            break;
        case "cat":
            commandLibrary.cat(userInputArray.slice(1));
            break;
        case "head":
            commandLibrary.head(userInputArray.slice(1));
            break;
        case "tail": 
            commandLibrary.tail(userInputArray.slice(1));
            break;
    }
};

const commandLibrary = {
    "default": function(userInput) {
        result = `Command "${userInput}" not recognized.`;
        done(result);
    },
    "echo": function(userInput) {
        done(userInput);
    },
    "cat": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            done(data);
        });
    },
    "head": function(fullPath) {
        let n = 5;
        let fileName = fullPath[0];
        if(fullPath.length > 1) {
            n = fullPath[0];
            fileName = fullPath[1];
        }
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            dataArr = data.toString().split("\n");
            let result = dataArr.slice(0, n).join("\n");
            done(result);
        });

    },
    "tail": function(fullPath) {
        let n = 5;
        let fileName = fullPath[0];
        if(fullPath.length > 1) {
            n = fullPath[0];
            fileName = fullPath[1];
        }
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            let dataArr = data.toString().split("\n");
            let arrLength = dataArr.length;
            if(n >= arrLength) n = arrLength;
            let result = dataArr.slice(arrLength - n, arrLength).join("\n");
            done(result);
        });
    }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;