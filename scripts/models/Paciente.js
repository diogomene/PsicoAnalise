class Paciente{
    constructor(nome, secoes, diasSecoes, valor){
        this.nome = nome;
        this.secoes = secoes;
        this.diasSecoes = diasSecoes;
        this.valor = valor;
        this.devendo = 0;
        this.contas = [] 
    }
}