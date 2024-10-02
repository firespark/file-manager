import { currentDirectory } from '../index.js';
import { showCurrentDir, checkArgs } from '../modules/common.js';
import * as navigation from '../modules/navigation.js';
import * as operations from '../modules/operations.js';
import { osHandler } from '../modules/os.js';
import { hash } from '../modules/hash.js';
import { compress, decompress } from '../modules/compress.js';

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
            if (checkArgs(commandArray, 1)) {
                await navigation.cd(commandArray[1]);
            }

            break;

        /* case 'stat':
            if (checkArgs(commandArray, 1)) {
                await navigation.stat(commandArray[1]);
            }
            break; */


        case 'cat':
            if (checkArgs(commandArray, 1)) {
                await operations.cat(commandArray[1]);
            }
            break;

        case 'add':
            if (checkArgs(commandArray, 1)) {
                await operations.add(commandArray[1]);
            }
            break;

        case 'rn':
            if (checkArgs(commandArray, 2)) {
                await operations.rn(commandArray[1], commandArray[2]);
            }
            break;

        case 'cp':
            if (checkArgs(commandArray, 2)) {
                await operations.cp(commandArray[1], commandArray[2]);
            }
            break;

        case 'mv':
            if (checkArgs(commandArray, 2)) {
                await operations.mv(commandArray[1], commandArray[2]);
            }
            break;

        case 'rm':
            if (checkArgs(commandArray, 1)) {
                await operations.rm(commandArray[1]);
            }
            break;


        case 'os':
            if (checkArgs(commandArray, 1)) {
                await osHandler(commandArray[1]);
            }
            break;


        case 'hash':
            if (checkArgs(commandArray, 1)) {
                await hash(commandArray[1]);
            }
            break;

        case 'compress':
            if (checkArgs(commandArray, 2)) {
                await compress(commandArray[1], commandArray[2]);
            }
            break;

        case 'decompress':
            if (checkArgs(commandArray, 2)) {
                await decompress(commandArray[1], commandArray[2]);
            }
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