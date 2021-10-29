const {dialog} = require('electron')
const path = require('path')
const {BrowserWindow} = require('electron')
const { checkRegistration } = require('./scripts/login/loginOperations')
const iconPath = path.join(__dirname, 'assets', "icon.png")
const createLoginWindow = async (ipcMain)=>{
    let tentativas = 0;
    let ml;
    ml = new BrowserWindow({
        width:400,
        height:262.5,
        center:true,
        resizable:false,
        icon:iconPath,
        autoHideMenuBar: true,
        webPreferences:{
            preload: path.join(__dirname, "scripts", "preloadLogin")
        }
    })
    if(await checkRegistration())
        ml.loadURL(`file://${__dirname}/html/login.html`)
    else
        ml.loadURL(`file://${__dirname}/html/register.html`)
    return new Promise((resolve,reject)=>{
        ipcMain.on('login-success-submission', (event, credentials)=>{
            ml.close()
            resolve(true)
        })
        ipcMain.on('login-fail-submission', async (event)=>{
            tentativas++
            if(tentativas>2){
                await dialog.showMessageBox(null,{
                    title:"Login máximo excedido",
                    message:"Você ultrapassou o limite de tentativas de login!",
                    detail:"Por favor, inicie a aplicação novamente.",
                    type:"error",
                    icon:iconPath,
                    buttons:["Okay"],
                })
                resolve(false)
            }
        })
    })
}

module.exports= createLoginWindow