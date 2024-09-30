import { readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const ls = async (dir) => {
    
    const files = await readdir(dir)
    files.forEach(file => {
        console.log(file);
    });
};
  
export { ls };