const path = require('path')
const {app, BrowserWindow, ipcMain} = require('electron')
const dialogDivida = require('./scripts/dividas/dialogDivida')
const dialogPaciente = require('./scripts/pacientes/dialogPaciente')
const dialogRegister = require('./scripts/login/dialogRegister')
const iconPath = path.join(__dirname, 'assets', "icon.png")
let mw;
const createLoginWindow = require('./createLoginWindow')
const handleSquirrelEvent = require('./scripts/handleSquirrelEvent')
if (handleSquirrelEvent(app)) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}
const createWindow = ()=>{

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
    mw.loadURL(`file://${__dirname}/html/index.html`)
}
app.whenReady().then(()=>{
    createLoginWindow(ipcMain).then(res=>{
        if(res){
            createWindow()
        }else{
            app.quit()
        }
    })

    app.on('activate', ()=>{
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

ipcMain.on("delete-conta-request", dialogDivida)
ipcMain.on("delete-paciente-request", dialogPaciente)
ipcMain.on("registration-request", dialogRegister)