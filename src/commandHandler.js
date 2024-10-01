import { currentDirectory } from './index.js';
import { showCurrentDir } from './modules/common.js';
import * as commands from './modules/commands.js';

const checkCommand = async (command) => {
    const commandArray = command.split(/\s+/);
    switch (commandArray[0]) {
        case 'ls':
            await commands.ls(commandArray[1]);
            break;

        case 'up':
            await commands.up();
            break;

        case 'cd':
            await commands.cd(commandArray[1]);
            break;

        case 'stat':
            await commands.stat(commandArray[1]);
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