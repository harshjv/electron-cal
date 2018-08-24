const cryptoHash = require('crypto-hashing')
const path = require('path')
const {app, protocol, BrowserWindow} = require('electron')
let mainWindow

const chains = [ 'ethereum', 'bitcoin' ]
const chainsWithHttps = [ ...chains, ...chains.map(chain => `${chain}+s`) ]

protocol.registerStandardSchemes(chainsWithHttps)

function registerChains () {
  chainsWithHttps.forEach(chain => {
    protocol.registerHttpProtocol(chain, (request, callback) => {
      const { url } = request

      mainWindow.loadURL('file://' + path.join(__dirname, 'chain.html') + '?uri=' + url)
    })
  })
}

app.on('ready', () => {
  registerChains()
})

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'))
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
