const electron = require('electron');
const path = require('path');
const url = require('url');
//const UI = require('./public/js/setTime');
//let ui = new UI();

const { app, BrowserWindow, screen, Menu, ipcMain } = electron;

let mainWin;

app.on("ready", () => {
    const {width, height} = screen.getPrimaryDisplay().workAreaSize
    mainWin = new BrowserWindow({
        width,
        height,
        backgroundColor: '#000',
        frame: true,
        webPreferences: {
            nodeIntegration: true
        },
        icon: __dirname + './public/images/icons/icon.png'
    })

    mainWin.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }))
    
    //Build menu from template
    const menu = Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {
                    label: 'Home',
                    accelerator: process.platform == 'darwin' ? 'command+A' : 'ctrl+A',
                    click() {
                        //Now load main.html into window
                        mainWin.loadURL(url.format({
                            pathname: path.join(__dirname, 'views/index.html'),
                            protocol: 'file:',
                            slashes: true
                        }));
                    }
                },
                {
                    label: 'Alarms',
                    accelerator: process.platform == 'darwin' ? 'command+A' : 'ctrl+A',
                    click() {
                        //Now load main.html into window
                        mainWin.loadURL(url.format({
                            pathname: path.join(__dirname, 'views/alarms.html'),
                            protocol: 'file:',
                            slashes: true
                        }));
                    }
                },
                {
                    label: 'Timer',
                    accelerator: process.platform == 'darwin' ? 'command+T' : 'ctrl+T',
                    click() {
                        //Now load main.html into window
                        mainWin.loadURL(url.format({
                            pathname: path.join(__dirname, 'views/timer.html'),
                            protocol: 'file:',
                            slashes: true
                        }));
                    }
                },
                {
                    label: 'Stop Watch',
                    accelerator: process.platform == 'darwin' ? 'command+S' : 'ctrl+S',
                    click() {
                        //Now load main.html into window
                        mainWin.loadURL(url.format({
                            pathname: path.join(__dirname, 'views/stopWatch.html'),
                            protocol: 'file:',
                            slashes: true
                        }));
                    }
                },
                { type: 'separator' },
                {
                    label: "Refresh",
                    accelerator: "CmdOrCtrl+R",
                    click() {
                        mainWin.reload();
                    }
                },
            {
               label: "DevTools",
               accelerator: "CmdOrCtrl+D",
               click() {
                  mainWin.webContents.toggleDevTools();
               }
            },
                {
                    label: 'Exit',
                    accelerator: process.platform == 'darwin' ? 'command+Q' : 'ctrl+Q',
                    click() {
                        app.isQuiting = true;
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Help',
            accelerator: process.platform == 'darwin' ? 'command+H' : 'ctrl+H',
            click() {
                //Now load main.html into window
                mainWin.loadURL(url.format({
                    pathname: path.join(__dirname, 'views/help.html'),
                    protocol: 'file:',
                    slashes: true
                }));
            }
        },
    ])
    //Insert menu
    Menu.setApplicationMenu(menu);

    //mainWin.webPreferences.openDevTools();

    mainWin.on('closed', () => {
        mainWin = null;
        app.quit();
    })
})

ipcMain.on('asynchronous-message', (event, args) => {
    //console.log("args");
    event.sender.send('asynchronous-reply', 'Hello');
});

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
})