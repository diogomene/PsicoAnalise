const {dialog} = require('electron')
const dialogPaciente = async (event, args)=>{
    const userResponse = await dialog.showMessageBox(null,{
        title:"Paciente",
        message:"O que você deseja fazer?",
        type:"question",
        buttons:["Deletar paciente", "Editar paciente", "Cancelar"],
        defaultId:2,
        detail:"Escolha a operação desejada.",
        cancelId:2,
        defaultId:2
    })
    if(userResponse.response==0){
        dialogDeletarPaciente(event,args)
    }else{
        event.reply("dialog-paciente-response", userResponse)
    }
}
const dialogDeletarPaciente = async (event, args)=>{
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
    if(userResponse.response==0){
        event.reply("dialog-paciente-response", userResponse)
        return
    }
}

module.exports = dialogPaciente