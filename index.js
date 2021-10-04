const path = require('path')
const {app, BrowserWindow, Tray, Menu} = require('electron')

let mw

app.on('ready', ()=>{
    const iconPath = path.join(__dirname, 'assets', "icon.png")
    const tray = new Tray(iconPath)
    const ctxMenu = Menu.buildFromTemplate([{label:"PsicoAnalise", type:'radio', checked:true}])
    tray.setContextMenu(ctxMenu)
    mw = new BrowserWindow({width:800, height:525, center:true, resizable:false, icon:iconPath, autoHideMenuBar: true})
    mw.loadURL(`file://${__dirname}/index.html`)
})