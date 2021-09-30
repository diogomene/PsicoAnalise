const path = require('path')
const {app, BrowserWindow, Tray, Menu} = require('electron')

let mw

app.on('ready', ()=>{
    const tray = new Tray(path.join(__dirname, 'assets', "icon.png"))
    const ctxMenu = Menu.buildFromTemplate([{label:"PsicoAnalise", type:'radio', checked:true}])
    tray.setContextMenu(ctxMenu)
    mw = new BrowserWindow({})
    mw.loadURL(`file://${__dirname}/index.html`)
})