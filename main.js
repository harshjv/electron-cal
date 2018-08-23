const cryptoHash = require('crypto-hashing')
const path = require('path')
const {app, protocol, BrowserWindow} = require('electron')
let mainWindow

const list = [ 'hash160', 'hash256', 'sha256', 'rmd160' ]

protocol.registerStandardSchemes(list)

function regAlgo () {
  list.forEach(algo => {
    protocol.registerStringProtocol(algo, (request, callback) => {
      const { url } = request
      const req = url.substring(url.indexOf('://') + 3)
      var buffer = new Buffer(req)
      const data = cryptoHash(algo, buffer).toString('hex')
      callback({data})
    }, (error) => {
      if (error) console.error('Failed to register protocol')
    })
  })
}

app.on('ready', () => {
  regAlgo()
})

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadFile('index.html')
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})