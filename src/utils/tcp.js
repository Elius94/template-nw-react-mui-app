const net = require('net');

/* global BigInt */
function checkIfValidIP(str) {
    // Regular expression to check if string is a IP address
    const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
    return regexExp.test(str);
}

let Nb_message = 0;

const DEFAULT_PORT = 80;
const DEFAULT_HOST = 'localhost';

class TcpConnect {
    constructor(host = DEFAULT_HOST, port = DEFAULT_PORT) {
        this.host = checkIfValidIP(host) ? host : DEFAULT_HOST;
        this.port = Number(port) || DEFAULT_PORT;
        if (this.instance) {
            return this.instance
        } else {
            process.send({ event: 'init' });
            this.client = null;
            this.connected = false;
            this.commandType = null;
            this.instance = this;
        }
    }

    async connect() {
        this.client = net.createConnection(this.port, this.host, () => {
            this.connected = true;
            console.log("Connected to " + this.host + ":" + this.port);
            process.send({ event: 'connected' });
        });
        this.client.setKeepAlive(true, 1000);

        this.client.on('data', (data) => {
            this.manageData(data);
            //process.send({ event: 'data', data });
        });

        this.client.on('error', (err) => {
            console.log("Error: " + err);
            process.send({ event: 'error', err });
        });

        this.client.on('close', () => {
            this.connected = false;
            console.log("Disconnected");
            process.send({ event: 'closed' });
        });

        this.client.on('end', () => {
            this.connected = false;
            console.log("Disconnected");
            process.send({ event: 'end' });
        });

        this.client.on('timeout', () => {
            console.log("Timeout");
            process.send({ event: 'timeout' });
        });
    }

    disconnect() {
        if (!this.connected) {
            return;
        }
        this.client.end();
        this.connected = false;
        delete this
    }

    changeSettings(host, port) {
        console.log("Changing settings: " + host + ":" + port);
        if (this.connected) {
            this.disconnect();
            this.host = host;
            this.port = port;
            this.connect();
        } else {
            this.host = host;
            this.port = port;
        }
    }

    isConnected() {
        return this.connected;
    }

    manageData(data) {
        console.log("Received data");
        console.log(data.toString('hex'));
        // first bytes are always the header, it is used to determinate the type of message
        
    }

    sendAction(action, options = {}) {
        console.log("Sending action: " + action + " with options: " + JSON.stringify(options));
        if (!this.connected) {
            console.log("Not connected");
            return;
        }

        const res = this.client.write(options.data);
        console.log("Sending payload: " + options.data.toString('hex') + " Response: " + res);
    }
}


// If this file is run as the main module
if (require.main === module) {
    const ip = process.argv[2];
    const port = process.argv[3];

    // Create the TCP client and connect to the server
    const client = new TcpConnect(ip, port);
    client.changeSettings(ip, port);
    //client.connect();

    // Send a message to the server
    //client.write('Hello, server!');
    process.on('message', (message) => {
        switch (message.event) {
            case 'connect':
                client.connect();
                break;
            case 'disconnect':
                client.disconnect();
                break;
            case 'changeSettings':
                client.changeSettings(message.data.ip, message.data.port);
                break;
            case 'sendAction':
                client.sendAction(message.action, message.options);
                break;
            default:
                console.log("Unknown event: " + message.event);
        }
    });
}

console.log = function (d) {
    process.send({ event: 'log', data: d });
};
