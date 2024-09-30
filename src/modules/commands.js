import { readdir } from 'node:fs/promises';
import { statSync, lstatSync } from 'node:fs';
import { join } from 'node:path';


function printFilesAsTable(files) {

    const headers = ['Name', 'Size (bytes)', 'Type'];

    const maxNameLength = Math.max(...files.map(f => f.name.length), headers[0].length);
    const maxSizeLength = headers[1].length;

    console.log(headers[0].padEnd(maxNameLength + 2) + headers[1].padEnd(maxSizeLength + 2) + headers[2]);

    console.log('-'.repeat(maxNameLength + maxSizeLength + 5));

    files.forEach(file => {
        console.log(
            file.name.padEnd(maxNameLength + 2) +
            (file.isDirectory ? ''.padEnd(maxSizeLength + 2) : file.size.toString().padEnd(maxSizeLength + 2)) +
            (file.isDirectory ? 'Directory' : 'File')
        );
    });
}

function getSortedFilesAndDirectories(files, dir) {

    const sortedFiles = files.map(item => {
        const fullPath = join(dir, item);
        const stats = lstatSync(fullPath);

        return {
            name: item,
            fullPath: fullPath,
            size: stats.size,
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



const ls = async (dir) => {
    
    let files = await readdir(dir);
    files = getSortedFilesAndDirectories(files, dir);
    printFilesAsTable(files);
};
  
export { ls };
