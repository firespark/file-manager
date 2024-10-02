import os from 'node:os';
import { showCurrentDir } from './modules/common.js';
import { checkCommand } from './handlers/commandHandler.js';
import { colors } from './modules/common.js';
import './handlers/exitHandler.js';

const homeDirectory = os.homedir();

//let username = 'Sweetie';
let username = os.userInfo().username;
let currentDirectory = homeDirectory;

const args = process.argv.slice(2);

function changeCurrentDirectory(dir) {
    currentDirectory = dir;
}

for (let i = 0; i < args.length; i += 1) {
    const propArr = args[i].replaceAll('-', '').split('=');
    if (propArr.length == 2 && propArr[0] == 'username') {
        username = propArr[1];
        break;
    }
}

console.log(`${colors.yellow}Welcome to the File Manager, ${username}!${colors.reset}`);
showCurrentDir(homeDirectory);

process.stdin.on('data', (input) => {
    checkCommand(input.toString().trim());
});

export { 
    currentDirectory, 
    username,
    changeCurrentDirectory 
};