import { writeFileSync } from 'fs';
import { networkInterfaces } from 'os';

const ipv4 = Object.values(networkInterfaces())
    .flat()
    .find(iface => iface.family === 'IPv4' && !iface.internal)?.address;

const envContent = `VITE_SERVER_IP=${ipv4 ? `http://${ipv4}:5000` : 'http://localhost:5000'}\n`;

writeFileSync('./src/.env.local', envContent);
console.log('Stworzono lokalny env z adresem serwera:', envContent.trim());
console.log(":D");
