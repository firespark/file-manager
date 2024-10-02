import { lstat, access } from 'node:fs/promises';
import { isAbsolute } from 'node:path';

const pathExists = async (path) => {
    try {
        await access(path);
        return true;
    } 
    catch (error) {
        return false;
    }
};

const showCurrentDir = (dir) => {
    console.log(`\nYou are currently in ${dir}\n`);
};

const isValidDir = async (dir) => {

    try {

        if (await pathExists(dir) && isAbsolute(dir)) {
            
            const stats = await lstat(dir);
            
            return stats.isDirectory();
        }
        return false;

    }
    catch (error) {
        if (error.code === 'ENOENT') {
            console.error('Directory does not exist');
        }
        else {
            console.error(error);
        }

        return false;
    }
};

const isValidFile = async (file) => {

    try {

        if (await pathExists(file)) {
            const stats = await lstat(file);

            return stats.isFile();
        }
        return false;
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            console.error('File does not exist');
        }
        else {
            console.error(error);
        }

        return false;
    }
};

const checkArgs = (args, argsMinNum) => {
    for (let i = 1; i <= argsMinNum; i++) {

        if (!args[i]) {
            console.error(`This function requires ${argsMinNum} arguments`);
            return false;
        }
    }
    return true;
}

const colors = {
    reset: '\x1b[0m',
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: '\x1b[8m',

    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    default: '\x1b[39m',

    gray: '\x1b[90m',
    lightRed: '\x1b[91m',
    lightGreen: '\x1b[92m',
    lightYellow: '\x1b[93m',
    lightBlue: '\x1b[94m',
    lightMagenta: '\x1b[95m',
    lightCyan: '\x1b[96m',
    lightWhite: '\x1b[97m',
    lightGray: '\x1b[90;1m',
};

export {
    showCurrentDir,
    colors,
    isValidDir,
    isValidFile,
    checkArgs,
    pathExists
};