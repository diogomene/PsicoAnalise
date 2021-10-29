const {dialog} = require('electron')
const dialogRegister = async (event, args)=>{
    const userResponse = await dialog.showMessageBox(null,{
        title:"Confirmação de registro",
        message:"Você tem certeza das credentiais inseridas?",
        type:"warning",
        buttons:["Sim", "Não"],
        defaultId:1,
        detail:"Após o primeiro registro, suas credentiais só poderão ser modificadas pelo desenvolvedor do sistema."
        
    })
    event.reply("dialog-register-response", userResponse)
}

module.exports = dialogRegister