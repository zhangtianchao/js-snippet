#!/usr/bin/env node

const SerialPort = require('serialport')
const InterByteTimeout = require('./lib/parser-inter-byte-timeout')
const port = new SerialPort('/dev/ttyUSB0')
const parser = port.pipe(new InterByteTimeout({interval: 30}))
parser.on('data', console.log)
port.write('hello')

const getopt = require('./getopt');

const options = getopt([
    ['h', 'help', ''],
    ['l', 'list', 'list himalia4 hotplug devices by native or RS232 interface'],
    ['', 'scan=ARG', 'scan himalia4 hotplug device from ip range, ex: 192.168.0.1~192.168.0.254'],
]);

if (options.verbose) {
    const verbose = parseInt(options.verbose);
    (global as any).verbose = verbose;
}

