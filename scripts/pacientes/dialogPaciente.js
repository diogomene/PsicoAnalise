const {dialog} = require('electron')
const dialogPaciente = async (event, args)=>{
    const userResponse = await dialog.showMessageBox(null,{
        title:"Deletar paciente",
        message:"Você tem certeza que deseja deletar este paciente?",
        type:"question",
        buttons:["Sim", "Não"],
        defaultId:1,
        detail:"A ação não poderá ser desfeita posteriormente.",
        cancelId:1,
        defaultId:1
        
    })
    event.reply("dialog-paciente-response", userResponse)
}

module.exports = dialogPaciente