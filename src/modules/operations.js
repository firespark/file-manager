import { createReadStream, createWriteStream, existsSync } from 'node:fs';
import { join } from 'node:path';
import { writeFile, rename, unlink } from 'node:fs/promises';

import { currentDirectory } from '../index.js';
import { isValidDir, isValidFile } from './common.js';


const cat = async (file) => {
    const fileRead = join(currentDirectory, file);
    if (isValidFile(fileRead)) {
        const stream = await createReadStream(fileRead);

        stream.on('data', (chunk) => {
            process.stdout.write(`${chunk}\n`);
        });

        stream.on('error', (err) => {
            console.error(`Error reading file: ${err.message}`);
        });
    }
};

const add = async (fileName) => {
    try {
        const fileAdd = join(currentDirectory, fileName);

        if (existsSync(fileAdd)) {
            console.error('File already exists');
            return;
        } 

        await writeFile(fileAdd, '');
    }
    catch (error) {
        console.error('Could not create a file');
    }

};

const rn = async (oldName, newName) => {
    try {
        const oldFile = join(currentDirectory, oldName);
        const newFile = join(currentDirectory, newName);

        if (!existsSync(oldFile)) {
            console.error(`File ${oldName} does not exist`);
            return;
        } 
        if (existsSync(newFile)) {
            console.error(`File ${newName} already exists`);
            return;
        }

        await rename(oldFile, newFile);
    }
    catch (error) {
        //console.log(error);
        console.error('Could not rename a file');
    }

};

const cp = async (file, newDir) => {
    try {
        if (isValidDir(newDir)) {

            const fileOrigin = join(currentDirectory, file);
            const fileCopy = join(newDir, file);

            if (!existsSync(fileOrigin)) {
                console.error(`File ${file} does not exist`);
                return;
            }
            if (existsSync(fileCopy)) {
                console.error(`File ${fileCopy} already exists`);
                return;
            }

            const readStream = createReadStream(fileOrigin);
            const writeStream = createWriteStream(fileCopy);

            await readStream.pipe(writeStream);
        }
        else {
            console.log(`Directory ${newDir} does not exist`);
            return;
        }
    }
    catch (error) {
        //console.log(error);
        console.error('Could not copy a file');
    }

};

const mv = async (file, newDir) => {
    try {
        if (isValidDir(newDir)) {

            const fileOrigin = join(currentDirectory, file);
            const fileCopy = join(newDir, file);

            if (!existsSync(fileOrigin)) {
                console.error(`File ${file} does not exist`);
                return;
            }
            if (existsSync(fileCopy)) {
                console.error(`File ${fileCopy} already exists`);
                return;
            }

            const readStream = createReadStream(fileOrigin);
            const writeStream = createWriteStream(fileCopy);

            readStream.on('end', function() {
                unlink(fileOrigin);
            });

            await readStream.pipe(writeStream);

        }
        else {
            console.log(`Directory ${newDir} does not exist`);
            return;
        }
    }
    catch (error) {
        //console.log(error);
        console.error('Could not copy a file');
    }

};

export {
    cat,
    add,
    rn,
    cp,
    mv
}
