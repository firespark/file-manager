import os from 'node:os';
import { showCurrentDir } from './modules/common.js';
import { checkCommand } from './commandHandler.js';

let username = 'Sweetie';
const homeDirectory = os.homedir();
let currentDirectory = homeDirectory;

const args = process.argv.slice(2);

for (let i = 0; i < args.length; i += 1) {
    const propArr = args[i].replace('--', '').split('=');
    if (propArr.length == 2 && propArr[0] == 'username') {
        username = propArr[1];
        break;
    }
}

console.log(`Welcome to the File Manager, ${username}!`);
showCurrentDir(homeDirectory);

process.stdin.on('data', (input) => {
    checkCommand(input.toString().trim());
    showCurrentDir(currentDirectory);
});

process.on('SIGINT', function() {

    process.exit(0);
});

process.on('exit', function() {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
});