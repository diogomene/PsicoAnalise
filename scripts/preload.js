const {contextBridge} = require('electron')
const {renderData} = require('./loadAndRenderData');
const {salvarDivida, toggleDivida, excluirDivida}= require('./dividaOperations')

window.addEventListener('DOMContentLoaded', () => {
    renderData()
})

contextBridge.exposeInMainWorld('teste',
{
    salvarDivida: salvarDivida,
    toggleDivida: toggleDivida,
    excluirDivida: excluirDivida
})