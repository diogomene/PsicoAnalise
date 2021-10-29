const {contextBridge} = require('electron')
const {renderData} = require('./loadAndRenderData');
const {salvarDivida, toggleDivida, requisitExcluirDivida}= require('./dividas/dividaOperations')
const {salvarPaciente, requisitDeletarPaciente} = require('./pacientes/pacienteOperations')
window.addEventListener('DOMContentLoaded', () => {
    renderData()
})

contextBridge.exposeInMainWorld('dividaOperations',
{
    salvarDivida: salvarDivida,
    toggleDivida: toggleDivida,
    requisitExcluirDivida: requisitExcluirDivida
})

contextBridge.exposeInMainWorld('pacienteOperations',
    {
        salvarPaciente:salvarPaciente,
        requisitDeletarPaciente: requisitDeletarPaciente
    }
)