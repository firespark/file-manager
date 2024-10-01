import { currentDirectory } from './index.js';
import { showCurrentDir } from './modules/common.js';
import * as navigation from './modules/navigation.js';
import * as operations from './modules/operations.js';

const checkCommand = async (command) => {
    const commandArray = command.split(/\s+/);
    switch (commandArray[0]) {
        case 'ls':
            await navigation.ls(commandArray[1]);
            break;

        case 'up':
            await navigation.up();
            break;

        case 'cd':
            await navigation.cd(commandArray[1]);
            break;


        case 'cat':
            await operations.cat(commandArray[1]);
            break;

        case 'add':
            await operations.add(commandArray[1]);
            break;

        case 'rn':
            await operations.rn(commandArray[1], commandArray[2]);
            break;

        case 'cp':
            await operations.cp(commandArray[1], commandArray[2]);
            break;

        case 'mv':
            await operations.mv(commandArray[1], commandArray[2]);
            break;


        case 'stat':
            await navigation.stat(commandArray[1]);
            break;

        case 'exit':
            process.exit(0);
            break;

        case 'error':
            DeliberateError;
            break;

        default:
            console.log(`Unknown command '${commandArray[0]}'`);
            break;
    }

    showCurrentDir(currentDirectory);
};

export {
    checkCommand
}