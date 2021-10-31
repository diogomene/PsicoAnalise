const {loadData, saveData} = require('../data')
const {ipcRenderer} = require('electron')
const {encryptCredentials, compareCredentials} = require('../bcrypter')
const requestRegistration= async (credentials)=>{
    ipcRenderer.send("registration-request", credentials)
    ipcRenderer.on("dialog-register-response", (event, args)=>{
        console.log(args)
        if(args.response==0) register(credentials) 
    })
}
const register = async (credentials)=>{
    const hashedCredentials = await encryptCredentials(credentials)
    const data = await loadData()
    data.login = hashedCredentials;
    await saveData(data)
    ipcRenderer.send("login-success-submission", credentials)
}
const getSavedCredentials = async ()=>{
    const data = await loadData()
    return data.login
}
const checkRegistration = async ()=>{
    const data = await loadData()
    const username = data.login.username
    const password = data.login.password
    if(username==null && password==null)
        return false
    else
        return true
}
const tryLogin = async (credentials)=>{
    const hashedCredentials = await getSavedCredentials()
    console.log(await compareCredentials(credentials, hashedCredentials))
    if(await compareCredentials(credentials, hashedCredentials)){
        ipcRenderer.send("login-success-submission", credentials)
    }
    else{
        alert("Credenciais incorretas!")
        ipcRenderer.send("login-fail-submission", credentials)
    }
}

module.exports = {tryLogin, checkRegistration, register, requestRegistration}