const path = require('path')
const fs = require("fs")
const today = new Date()
let data, pacientes;
const jsonPath = path.join(__dirname, "../", "assets", "data", "pacientes.json")

async function loadData() {
    const jsonData = await fs.readFileSync(jsonPath)
    const data = await JSON.parse(jsonData)
    return data
}
async function saveData(data){
    data = JSON.stringify(data)
    await fs.writeFileSync(jsonPath, data)
}
function renderPacientes(listaPacientes) {
    const labelTotalReceber = document.getElementById("quantidade-total")
    const labelAtrasadoAreceber = document.getElementById("quantidade-atrasada")
    let totalAreceber = 0
    let atrasadoAreceber = 0
    pacientes.forEach((paciente, index) => {
        let devendo=false
        paciente.contas.forEach(conta=>{
            if(!conta.pago){
                totalAreceber+=conta.valor;
                devendo=true;
                const data = conta.data.split('/')
                if(data[1]<today.getFullYear() || data[0]<today.getMonth() && data[1]<=today.getFullYear()){
                    atrasadoAreceber+=conta.valor;
                }
            }
        })
        listaPacientes.innerHTML +=
            `
            <div class="paciente">
            <div class="estado-pagamento ${devendo?"nao-pago":"pago"}"></div>
            <div class="info">
                <a href="./pacientes.html?id=${index}"><p class="nome-paciente">${paciente.nome}</p></a>
                <p class="dias-atendimento">seg, sex, sáb</p>
            </div>
            <div class="money">
                <p class="quantidade-devendo">R$${paciente.devendo}</p>
            </div>
            </div>
        `
    });
    labelTotalReceber.innerHTML=`R$${totalAreceber}`
    labelAtrasadoAreceber.innerHTML=`R$${atrasadoAreceber}`
}
function getId(){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}
function renderDetalhesPaciente() {
    const listaContas = document.getElementById("lista-contas")
    const idPaciente = getId()
    const checkSVG = `<svg id="pardon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>`
    const xSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg>`
    pacientes[idPaciente].contas.forEach(
        (conta,index)=>{
            listaContas.innerHTML +=
                `
                <div class="paciente ${conta.pago?"pago":"nao-pago"}">
                    <div class="valor-cont">
                        <p class="devendo">R$${conta.valor}</p>
                        <p class="data-conta">${conta.data}</p>
                    </div>
                    <div class="pardon-cont" conta-id="${index}">
                        ${conta.pago?xSVG:checkSVG}
                    </div>
                </div>
            `
        }
    )
}
async function renderData() {
    data = await loadData()
    pacientes = data.pacientes
    const listaPacientes = document.getElementById('lista-pacientes')
    if (listaPacientes) {
        renderPacientes(listaPacientes)
    } else {
        renderDetalhesPaciente()
    }
}

module.exports.renderData = renderData
module.exports.loadData = loadData
module.exports.getId = getId
module.exports.saveData = saveData