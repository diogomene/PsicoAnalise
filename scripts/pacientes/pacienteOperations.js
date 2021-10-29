const {ipcRenderer} = require('electron')
const {loadData, saveData} = require('../data')

const salvarPaciente= async (info)=>{
    const data = await loadData();
    data.pacientes.push(info)
    await saveData(data)
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
        console.log(args)
        if(args.response==0) deletarPaciente(idPaciente) 
    })
}

module.exports = {salvarPaciente, requisitDeletarPaciente }