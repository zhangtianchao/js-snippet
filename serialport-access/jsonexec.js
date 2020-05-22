#!/usr/bin/env node

const SerialPort = require('serialport');
const InterByteTimeout = require('./lib/parser-inter-byte-timeout');

const getopt = require('./getopt');

const options = getopt([
    ['h', 'help', ''],
    ['j', 'json=ARG', 'set json file to exec'],
]);

let json = null;

if (options.j) {
    const fs = require('fs');
    json = JSON.parse(fs.readFileSync(options.j, { encoding: 'utf-8' }));
}else{
    console.log('please set json file to exec');
}


const port = new SerialPort(json.port)
const parser = port.pipe(new InterByteTimeout({ interval: 30 }))
parser.on('data', console.log)
port.write('hello')