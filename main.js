const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron')
const fs = require('fs')
const mainPresence = require('discord-rich-presence')('742118542090174586');

function mainRP () {
  mainPresence.updatePresence({
    state: 'Choosing a Presence',
    details: 'Entering things',
    startTimestamp: Date.now(),
    largeImageKey: 'vcustom_rp',
    instance: true,
  });
}


function createMainWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 480,
    height: 530,
    resizable: false,
    backgroundColor: '#2C2F33',
    maximizable: false,
    fullscreenable: false,
    fullscreen: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('home.html')

}

app.whenReady().then(createMainWindow).then(mainRP())

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.on('endDRP', (event, arg) => {
  app.quit();
});

ipcMain.on('startDRP', (event, details, state, largeImage, smallImage, timeStamp, clientID) => {
  if (!clientID) {
    app.quit();
  }

  var client = require('discord-rich-presence')(clientID);
  mainPresence.disconnect();

  if (timeStamp === true ) {
    client.updatePresence({
      state: state,
      details: details,
      startTimestamp: Date.now(),
      largeImageKey: largeImage,
      smallImageKey: smallImage,
      instance: true,
    });

  } else {
    client.updatePresence({
      state: state,
      details: details,
      largeImageKey: largeImage,
      smallImageKey: smallImage,
      instance: true,
    });
  }
});

