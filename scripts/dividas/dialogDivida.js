const {dialog} = require('electron')
const dialogDivida = async (event, args)=>{
    const userResponse = await dialog.showMessageBox(null,{
        title:"Deletar dívida",
        message:"Você tem certeza que deseja deletar esta divida?",
        type:"question",
        buttons:["Sim", "Não"],
        defaultId:1,
        detail:"A ação não poderá ser desfeita posteriormente."
        
    })
    event.reply("dialog-divida-response", userResponse)
}

module.exports = dialogDivida