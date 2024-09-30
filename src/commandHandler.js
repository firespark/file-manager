import { currentDirectory } from './index.js';
import { showCurrentDir } from './modules/common.js';
import * as commands from './modules/commands.js'; 

const checkCommand = async (command) => {
    switch (command) {
        case 'ls':
            await commands.ls(currentDirectory);
            break;

        case 'exit':
            process.exit(0);
            break;

        default:
            console.log(`Unknown command ${command}`);
            break;
    }
    showCurrentDir(currentDirectory);
};

export {
    checkCommand
}