import { lstatSync, existsSync } from 'node:fs';

const showCurrentDir = (dir) => {
    console.log(`\nYou are currently in ${dir}\n`);
};

const isValidDir = (dir) => {

    try {

        if (existsSync(dir)) {
            const stats = lstatSync(dir);

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

const isValidFile = (file) => {

    try {

        if (existsSync(file)) {
            const stats = lstatSync(file);

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
    isValidFile
};