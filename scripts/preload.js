const {contextBridge} = require('electron')
const {renderData} = require('./loadAndRenderData');
const {salvarDivida, toggleDivida, excluirDivida}= require('./dividas/dividaOperations')

window.addEventListener('DOMContentLoaded', () => {
    renderData()
})

contextBridge.exposeInMainWorld('dividaOperations',
{
    salvarDivida: salvarDivida,
    toggleDivida: toggleDivida,
    excluirDivida: excluirDivida
})