import os from 'node:os';

const osHandler = async (parameter) => {
    switch (parameter.replaceAll('-', '').toLowerCase()) {
        case 'eol':
            console.log(`Default system End-Of-Line is: ${JSON.stringify(os.EOL)}`);
            break;
        
        case 'cpus':
            const cpus = os.cpus();
            console.log(`Total number of CPUs: ${cpus.length}`);
            cpus.forEach((cpu, index) => {
                console.log(`CPU ${index + 1}: Model - ${cpu.model.trim()}, Clock Rate - ${(cpu.speed / 1000).toFixed(2)} GHz`);
            });
            break;
        
        case 'homedir':
            console.log(`System home directory is: ${os.homedir()}`);
            break;
    
        case 'username':
            console.log(`Current system user name is: ${os.userInfo().username}`);
            break;
    
        case 'architecture':
            console.log(`CPU architecture is: ${os.arch()}`);
            break;
    
        default:
            break;
    }
}

export {
    osHandler
}
