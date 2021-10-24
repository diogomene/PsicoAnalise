const path = require('path')
const fs = require("fs")
let data, pacientes;
async function loadData() {
    const jsonData = await fs.readFileSync(path.join(__dirname, "../", "assets", "data", "pacientes.json"))
    const data = await JSON.parse(jsonData)
    return data
}
function loadPacientes(listaPacientes) {
    pacientes.forEach((paciente, index) => {
        listaPacientes.innerHTML +=
            `
            <div class="paciente">
            <div class="estado-pagamento"></div>
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
}
function loadDetails() {
    const listaContas = document.getElementById("lista-contas")
    const urlParams = new URLSearchParams(window.location.search);
    const idPaciente = urlParams.get('id');
    pacientes[idPaciente].contas.forEach(
        (conta,index)=>{
            listaContas.innerHTML +=
                `
                <div class="paciente">
                    <div class="valor-cont">
                        <p class="devendo">R$${conta.valor}</p>
                        <p class="data-conta">${conta.data}</p>
                    </div>
                    <div class="pardon-cont">
                        <svg id="pardon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
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
        loadPacientes(listaPacientes)
    } else {
        loadDetails()
    }
}

module.exports = renderData