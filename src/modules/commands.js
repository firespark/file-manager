import { readdir } from 'node:fs/promises';
import { statSync, lstatSync } from 'node:fs';
import { colors } from './common.js';
import { join, extname } from 'node:path';
import { currentDirectory } from '../index.js';


function formatFileSize(bytes) {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const sizeInUnit = bytes / Math.pow(1024, i); 
    return `${sizeInUnit.toFixed(2)} ${sizes[i]}`;
}

function printFilesAsTable(files) {

    const headers = ['Name', 'Size', 'Type'];

    const maxNameLength = Math.max(...files.map(f => f.name.length), headers[0].length);
    const maxSizeLength = Math.max(...files.map(f => f.size.length), headers[1].length);

    console.log(headers[0].padEnd(maxNameLength + 2) + headers[1].padStart(maxSizeLength + 2) + '  ' + headers[2]);

    console.log('-'.repeat(maxNameLength + 2 + maxSizeLength + 2 + 12));

    files.forEach(file => {
        let fileColor = file.isDirectory ? colors.lightWhite : colors.white;
        switch (file.ext) {
            case 'exe':
                file.type = 'Executable'
                fileColor = colors.lightGreen;
                break;
            case 'zip':
            case 'rar':
            case '.gz':
            case '7z':
                file.type = 'Archive'
                fileColor = colors.lightMagenta;
                break;
            case 'txt':
            case 'ini':
            case 'json':
                file.type = 'Text'
                fileColor = colors.lightCyan;
                break;
            default:
                break;
        }
        fileColor = file.type == 'Protected' ? colors.dim : fileColor;

        console.log(
            fileColor +
            file.name.padEnd(maxNameLength + 2) +
            (file.isDirectory ? ''.padEnd(maxSizeLength + 2) : file.size.padStart(maxSizeLength + 2)) + '  ' +
            file.type
            + colors.reset
        );
    });
}

function getSortedFilesAndDirectories(files, dir) {

    const sortedFiles = files.map(item => {
        const fullPath = join(dir, item);
        let stats;

        try {
            stats = lstatSync(fullPath); 
        }
        catch {
            return {
                name: item,
                ext: extname(item).slice(1),
                fullPath: fullPath,
                size: formatFileSize(0),
                type: 'Protected',
                isDirectory: false,
            };
        }
        
        return {
            name: item,
            ext: extname(item).slice(1),
            fullPath: fullPath,
            size: formatFileSize(stats.size),
            type: stats.isDirectory() ? 'Directory' : 'File',
            isDirectory: stats.isDirectory(),
        };
    });

    sortedFiles.sort((a, b) => {
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
        return a.name.localeCompare(b.name); 
    });

    return sortedFiles;
}



const ls = async (dir = currentDirectory) => {
    let files = await readdir(dir);
    files = getSortedFilesAndDirectories(files, dir);
    printFilesAsTable(files);
};

const stat = async (file) => {
    if (!file) {
        console.error(`${colors.red}Specify filename to proceed${colors.reset}`)
        return;
    }
    try {
        const stats = statSync(join(currentDirectory, file));
        console.log(stats)
    }
    catch {
        console.error(`${colors.red}File is protected${colors.reset}`);
        return;
    };
};
  
export { ls, stat };
