const { app, BrowserWindow } = require('electron');
const ejse = require('ejs-electron');

ejse.data({
    pageName: 'My Custom Excel',
    rows: 150,
    cols: 100
});
app.whenReady().then(function(){

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

win.loadFile('index.ejs').then(function(){
    win.webContents.openDevTools();
    win.removeMenu();
    win.maximize();
    win.show();
})
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// app.whenReady().then(createWindow);