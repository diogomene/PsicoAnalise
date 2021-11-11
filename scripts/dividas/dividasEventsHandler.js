window.addEventListener('DOMContentLoaded', () => {
    //Carrega as informações do formulário de dívidas
    const loadDividaInfo = () => {
        const valor = document.getElementById("valor").value
        let data = document.getElementById("data").value
        const nativeData = data.split('-')
        data = `${nativeData[1]}/${nativeData[0]}`
        return { valor: Number(valor), data: data, pago: false }
    }
    const goBackBtn = document.getElementById('goback')
    //Listener de botão para voltar página
    if (goBackBtn)
        goBackBtn.addEventListener('click', () => { history.back() })

    const formularioCadastroDivida = document.getElementById('cadastro-divida');
    //Listener de submissão de formulário de dívida
    if (formularioCadastroDivida)
        formularioCadastroDivida.addEventListener('submit', e => {
            e.preventDefault()
            window.dividaOperations.salvarDivida(loadDividaInfo())
            window.location.reload()
        })


    const toggleDividas = document.querySelectorAll('.pardon-cont')
    if (toggleDividas.length > 0) {
        toggleDividas.forEach(toggleDivida => {
            const idConta = toggleDivida.getAttribute('conta-id')
            toggleDivida.addEventListener('click', e => {
                window.dividaOperations.toggleDivida(idConta)
                window.location.reload()
            })
            toggleDivida.addEventListener('contextmenu', e => { 
                window.dividaOperations.requisitExcluirDivida(idConta); 
                })
        })
    }
})