function loadDiasSecao(){
    const checkboxDias = document.getElementsByClassName("weekday")
    const selectsDias =[...checkboxDias]
    let diasSecao = ""
    let quantidadeDiasSelecionados =0
    selectsDias.forEach(seletorDiaDaSemana => {
        if(seletorDiaDaSemana.checked){
            diasSecao+=seletorDiaDaSemana.value+" "
            quantidadeDiasSelecionados++
        }       
    });
    if(quantidadeDiasSelecionados==0){
        throw new RangeError("Nenhum dia selecionado")
    }
    if(quantidadeDiasSelecionados==7){
        return {diasSecao:"Todos os dias",quantidadeDiasSelecionados}
    }
    return {diasSecao:diasSecao.trim(),quantidadeDiasSelecionados}
    
}
function loadPacienteInfo(){
    const nome = document.getElementById("nome").value.trim()
    const valorSecao = Number(document.getElementById("valor").value)
    const diasSecao = loadDiasSecao()
    return new Paciente(nome, diasSecao.quantidadeDiasSelecionados, diasSecao.diasSecao, valorSecao)
}
function savePacienteInfo(id){
    try{
        const info = loadPacienteInfo();
        window.pacienteOperations.salvarPaciente(info, id)
        if(id){
            window.history.back()
            return
        }
        window.location.reload()
    }catch(e){
        alert(e.message)
    }
}
window.addEventListener('DOMContentLoaded', () => {
    const formularioCadastroPaciente = document.getElementById('cadastro-paciente')
    if(formularioCadastroPaciente){
        formularioCadastroPaciente.addEventListener('submit', e=>{
            e.preventDefault()
            savePacienteInfo()
        })
    }
    const divsPaciente = document.querySelectorAll('.nome-paciente')
    if(divsPaciente.length>0){
        divsPaciente.forEach(
            divPaciente=> divPaciente.addEventListener('contextmenu', ()=>{
                const idPaciente = divPaciente.getAttribute('paciente-id')
                window.pacienteOperations.requisitDeletarPaciente(idPaciente)
            })
        )
    }
    const formularioEditarPaciente = document.getElementById('editar-paciente')
    if(formularioEditarPaciente){
        formularioEditarPaciente.addEventListener('submit', (e)=>{
            e.preventDefault()
            const idPaciente = window.pacienteOperations.getId()
            console.log(idPaciente)
            savePacienteInfo(idPaciente)
        })
    }
    
})