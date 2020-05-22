#!/usr/bin/env node

process.env.DEBUG = '*'
const SerialPort = require('../packages/serialport')

// outputs the path to an arduino or nothing
async function findArduino() {
  if (process.argv[2]) {
    return process.argv[2]
  }
  const ports = await SerialPort.list()
  for (const port of ports) {
    if (/arduino/i.test(port.manufacturer)) {
      return port.path
    }
  }
  throw new Error('No arduinos found')
}

findArduino().then(
  portName => {
    const port = new SerialPort(portName)
    port.on('open', () => {
      console.log('opened', portName)
      // port.write(Buffer.alloc(1024 * 20, 0));
      port.on('data', data => console.log('data', data.toString())) // put the port into flowing mode
      // setTimeout(() => {
      //   console.log('closing');
      //   port.close((err) => {
      //     console.log('closed?', err);
      //   });
      // }, 5000);
    })
  },
  () => {
    console.log('no arduino')
  }
)

process.on('unhandledRejection', r => console.log(r, r.stack))
