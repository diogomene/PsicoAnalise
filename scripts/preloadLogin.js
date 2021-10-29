const {contextBridge} = require('electron')
const {tryLogin, register, requestRegistration} = require('./login/loginOperations')

contextBridge.exposeInMainWorld('loginOperations',
    {tryLogin:tryLogin,
    register:register,
    requestRegistration: requestRegistration}
)