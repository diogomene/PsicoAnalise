const path = require('path')
const {app, BrowserWindow, ipcMain} = require('electron')
const dialogDivida = require('./scripts/dialogDivida')
let mw;
const createWindow = ()=>{
    const iconPath = path.join(__dirname, 'assets', "icon.png")
    mw = new BrowserWindow({
        width:800,
        height:525,
        center:true,
        resizable:false,
        icon:iconPath,
        autoHideMenuBar: true,
        webPreferences:{
            preload: path.join(__dirname, "scripts", "preload")
        }
    })
    mw.loadURL(`file://${__dirname}/index.html`)
}
app.whenReady().then(()=>{

    createWindow();

    app.on('activate', ()=>{
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    // const tray = new Tray(iconPath)
    // const ctxMenu = Menu.buildFromTemplate([{label:"PsicoAnalise", type:'radio', checked:true}])
    // tray.setContextMenu(ctxMenu)
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

ipcMain.on("delete-conta-request", dialogDivida)