import { createReadStream, createWriteStream } from 'node:fs';
import { join, isAbsolute, basename } from 'node:path';
import { writeFile, rename, unlink } from 'node:fs/promises';

import { currentDirectory } from '../index.js';
import { isValidDir, isValidFile, pathExists } from './common.js';

const cat = async (file) => {
    const fileRead = isAbsolute(file) ? file : join(currentDirectory, file);
    
    if (await isValidFile(fileRead)) {
        const stream = createReadStream(fileRead);

        for await (const chunk of stream) {
            process.stdout.write(`${chunk}\n`);
        }

    } else {
        console.error("Invalid file");
    }
};

const add = async (fileName) => {
    try {
        const fileAdd = isAbsolute(fileName) ? fileName : join(currentDirectory, fileName);

        if (await pathExists(fileAdd)) {
            console.error('File already exists');
            return;
        } 

        await writeFile(fileAdd, '');
        console.log(`File ${fileName} has been successfully created`);
    }
    catch (error) {
        console.error('Could not create a file');
    }

};

const rn = async (oldName, newName) => {
    try {
        const oldFile = isAbsolute(oldName) ? oldName : join(currentDirectory, oldName);
        const newFile = isAbsolute(newName) ? newName : join(currentDirectory, newName);

        if (!(await pathExists(oldFile))) {
            console.error(`File ${oldName} does not exist`);
            return;
        } 
        if (await pathExists(newFile)) {
            console.error(`File ${newName} already exists`);
            return;
        }

        await rename(oldFile, newFile);
        console.log(`File ${oldFile} has been successfully renamed into ${newFile}`);
    }
    catch (error) {
        console.log(error);
        console.error('Could not rename a file');
    }

};

const cp = async (file, newDir) => {
    try {
        if (await isValidDir(newDir)) {

            const fileOrigin = isAbsolute(file) ? file : join(currentDirectory, file);
            const fileName = basename(fileOrigin);
            const fileCopy = join(newDir, fileName);

            if (!(await pathExists(fileOrigin))) {
                console.error(`File ${file} does not exist`);
                return;
            }
            if (await pathExists(fileCopy)) {
                console.error(`File ${fileCopy} already exists`);
                return;
            }

            const readStream = createReadStream(fileOrigin);
            const writeStream = createWriteStream(fileCopy);

            await readStream.pipe(writeStream);

            console.log(`File ${file} has been successfully copied into ${newDir}`);
        }
        else {
            console.error(`Directory ${newDir} does not exist`);
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
        if (await isValidDir(newDir)) {
            const fileOrigin = isAbsolute(file) ? file : join(currentDirectory, file);
            const fileName = basename(fileOrigin);

            const fileCopy = join(newDir, fileName);

            if (!(await pathExists(fileOrigin))) {
                console.error(`File ${file} does not exist`);
                return;
            }
            if (await pathExists(fileCopy)) {
                console.error(`File ${fileCopy} already exists`);
                return;
            }

            const readStream = createReadStream(fileOrigin);
            const writeStream = createWriteStream(fileCopy);

            readStream.on('end', function () {
                try {
                    unlink(fileOrigin);
                }
                catch {
                    console.error(`Could not delete the file`);
                }
                
            });

            await readStream.pipe(writeStream);

            console.log(`File ${file} has been successfully moved into ${newDir}`);

        }
        else {
            console.error(`Directory ${newDir} does not exist`);
            return;
        }
    }
    catch (error) {
        //console.log(error);
        console.error('Could not move the file');
    }

};

const rm = async (file) => {
    try {

        const fileDel = isAbsolute(file) ? file : join(currentDirectory, file);

        if (!(await pathExists(fileDel))) {
            console.error(`File ${file} does not exist`);
            return;
        }

        await unlink(fileDel);
        console.log(`File ${file} has been successfully deleted`);

    }
    catch (error) {
        //console.log(error);
        console.error('Could not delete a file');
    }

};

export {
    cat,
    add,
    rn,
    cp,
    mv,
    rm
}
