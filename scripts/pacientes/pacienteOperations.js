const {ipcRenderer} = require('electron')
const {loadData, saveData} = require('../data')

const salvarPaciente= async (info, id)=>{
    const data = await loadData();
    if(id){
        data.pacientes[id].nome=info.nome
        data.pacientes[id].secoes=info.secoes
        data.pacientes[id].diasSecoes=info.diasSecoes
    }else{
        data.pacientes.push(info)
    }
    await saveData(data)
    return
}
const deletarPaciente = async (idPaciente)=>{
    const data = await loadData()
    data.pacientes.splice(idPaciente,1)
    await saveData(data)
    window.location.reload() 
}
const requisitDeletarPaciente = async (idPaciente)=>{
    ipcRenderer.send("delete-paciente-request", null)
    ipcRenderer.on("dialog-paciente-response", (event, args)=>{
        if(args.response==0) deletarPaciente(idPaciente)
        else
            if(args.response==1){
                window.location.href=`./editPaciente.html?id=${idPaciente}`
            }
    })
}

module.exports = {salvarPaciente, requisitDeletarPaciente }