const {ipcRenderer} = require('electron')
const {loadData, getId, saveData} = require('./loadAndRenderData')

const salvarDivida = async (info)=>{
    const data = await loadData();
    const id = getId()
    data.pacientes[id].contas.push(info)
    data.pacientes[id].devendo+=info.valor
    data.pacientes[id].devendo= Number(data.pacientes[id].devendo.toFixed(2))
    await saveData(data)
    window.location.reload()
}
const toggleDivida = async (idConta)=>{
    const data = await loadData();
    const id = getId()
    data.pacientes[id].contas[idConta].pago=!data.pacientes[id].contas[idConta].pago
    if(data.pacientes[id].contas[idConta].pago){
        data.pacientes[id].devendo-=data.pacientes[id].contas[idConta].valor
    }else{
        data.pacientes[id].devendo+=data.pacientes[id].contas[idConta].valor
    }
    data.pacientes[id].devendo= Number(data.pacientes[id].devendo.toFixed(2))
    await saveData(data)
    window.location.reload()
}
const excluirDivida = async (idConta)=>{
    ipcRenderer.send("delete-conta-request", null)
    ipcRenderer.on("dialog-divida-response", (event, args)=>{
        console.log(args)
        if(args.response==0) deletarDivida(idConta) 
    })
}
const deletarDivida=async(idConta)=>{
    const data = await loadData();
    const id = getId()
    data.pacientes[id].devendo-=data.pacientes[id].contas[idConta].valor
    data.pacientes[id].contas.splice(idConta,1)
    await saveData(data)
    window.location.reload()
}
module.exports = {salvarDivida, toggleDivida, excluirDivida, deletarDivida}
