window.addEventListener('DOMContentLoaded', () => {
    //Carrega as informações do formulário de dívidas
    const loadDividaInfo = () => {
        const valor = document.getElementById("valor").value
        let data = document.getElementById("data").value
        const nativeData = data.split('-')
        data = `${nativeData[1]}/${nativeData[0]}`
        return { valor: Number(valor), data: data, pago: false }
    }
    const gobackBtn = document.getElementById('goback')
    //Listener de botão para voltar página
    if (gobackBtn)
        gobackBtn.addEventListener('click', () => { history.back() })

    const cadastroDivida = document.getElementById('cadastro-divida');
    //Listener de submissão de formulário de dívida
    if (cadastroDivida)
        cadastroDivida.addEventListener('submit', e => {
            e.preventDefault()
            window.teste.salvarDivida(loadDividaInfo())
        })


    const pardons = document.querySelectorAll('.pardon-cont')
    console.log(pardons)
    if (pardons.length > 0) {
        pardons.forEach(element => {
            const idConta = element.getAttribute('conta-id')
            element.addEventListener('click', e => {
                console.log("Epa!")
                window.teste.toggleDivida(idConta)
            })
            element.addEventListener('contextmenu', e => window.teste.excluirDivida(idConta))
        })
    }
})