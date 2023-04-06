import store from '../redux/store';
import path from 'path';
import fs from 'fs';

export const log = (message) => {
    console.log(message);
    const logDir = path.join(store.getState().connect.outputDirectory, 'logs');
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
    const logFile = path.join(logDir, `${new Date().toISOString().slice(0, 10)}_log.txt`);

    if (!fs.existsSync(logFile)) {
        fs.writeFileSync(logFile, `${new Date().toISOString()} - ${message}\r\n`);
    } else {
        fs.appendFileSync(logFile, `${new Date().toISOString()} - ${message}\r\n`);
    }
};

