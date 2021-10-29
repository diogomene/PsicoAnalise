function loadDiasSecao(){
    const checkboxDias = document.getElementsByClassName("weekday")
    const selectsDias =[...checkboxDias]
    let diasSecao = ""
    let quantidadeDiasSelecionados =0
    console.log(selectsDias[1])
    selectsDias.forEach(seletorDiaDaSemana => {
        if(seletorDiaDaSemana.checked){
            diasSecao+=seletorDiaDaSemana.value+" "
            quantidadeDiasSelecionados++
        }       
    });
    if(quantidadeDiasSelecionados==7){
        return "Todos os dias"
    }
    return {diasSecao:diasSecao.trim(),quantidadeDiasSelecionados}
    
}
function loadPacienteInfo(){
    const nome = document.getElementById("nome").value.trim()
    const valorSecao = Number(document.getElementById("valor").value)
    const diasSecao = loadDiasSecao()
    return new Paciente(nome, diasSecao.quantidadeDiasSelecionados, diasSecao.diasSecao, valorSecao)
    
}
window.addEventListener('DOMContentLoaded', () => {
    const formularioCadastroPaciente = document.getElementById('cadastro-paciente')
    if(formularioCadastroPaciente)
        formularioCadastroPaciente.addEventListener('submit', e=>{
            e.preventDefault()
            const info = loadPacienteInfo();
            window.pacienteOperations.salvarPaciente(info)
            window.location.reload()
        })
    const divsPaciente = document.querySelectorAll('.nome-paciente')
    if(divsPaciente>0)
        console.log("asdasd")
        divsPaciente.forEach(
            divPaciente=> divPaciente.addEventListener('contextmenu', ()=>{
                const idPaciente = divPaciente.getAttribute('paciente-id')
                console.log("adasd")
                window.pacienteOperations.requisitDeletarPaciente(idPaciente)
            })
        )
})