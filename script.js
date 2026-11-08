// ===== 1. Pegando os elementos da página =====
// document.querySelector procura um elemento; o # significa "pelo id"
const botaoRock = document.querySelector("#adicionar-rock");
const botaoJazz = document.querySelector("#adicionar-jazz");
const botaoCd = document.querySelector("#adicionar-cd");
const botaoCassete = document.querySelector("#adicionar-cassete"); // botão do 4º produto
const botaoLimpar = document.querySelector("#limpar");

// Textos do resumo que serão atualizados
const quantidadeNaTela = document.querySelector("#quantidade");
const subtotalNaTela = document.querySelector("#subtotal");
const descontoNaTela = document.querySelector("#desconto");
const totalNaTela = document.querySelector("#total");
const mensagemNaTela = document.querySelector("#mensagem");

// ===== 2. Variáveis e regras do desconto =====
// let: valores que mudam a cada clique
let quantidade = 0;
let subtotalCentavos = 0; // o dinheiro fica em centavos (inteiros): 8000 = R$ 80,00

// const: valores fixos da regra do desconto
const limiteDescontoCentavos = 10000; // R$ 100,00 em centavos
const percentualDesconto = 10; // 10%

// Formata números como moeda brasileira (R$ 1.234,56)
const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

// ===== 3. Funções =====
// Calcula o desconto e escreve os valores na página.
// O desconto é sempre calculado a partir do subtotal original,
// por isso ele nunca é aplicado duas vezes.
function atualizarResumo() {
  let descontoCentavos = 0;

  // >= significa "maior ou igual": em R$ 100,00 exatos o desconto já vale
  if (subtotalCentavos >= limiteDescontoCentavos) {
    // Math.round arredonda para o centavo mais próximo
    descontoCentavos = Math.round(subtotalCentavos * percentualDesconto / 100);
  }

  const totalFinalCentavos = subtotalCentavos - descontoCentavos;

  // Divide por 100 só na hora de mostrar (centavos -> reais)
  quantidadeNaTela.textContent = quantidade;
  subtotalNaTela.textContent = moeda.format(subtotalCentavos / 100);
  descontoNaTela.textContent = moeda.format(descontoCentavos / 100);
  totalNaTela.textContent = moeda.format(totalFinalCentavos / 100);
}

// Serve para todos os produtos: só muda o nome e o preço (parâmetros)
function adicionarProduto(nome, precoCentavos) {
  quantidade = quantidade + 1;
  subtotalCentavos = subtotalCentavos + precoCentavos;
  atualizarResumo();
  mensagemNaTela.textContent = nome + " adicionado à seleção!";
}

// ===== 4. Eventos de clique =====
// Cada botão chama adicionarProduto com o nome e o preço (argumentos)
botaoRock.addEventListener("click", function () {
  adicionarProduto("Vinil de Rock Clássico", 12990); // R$ 129,90
});

botaoJazz.addEventListener("click", function () {
  adicionarProduto("Vinil de Jazz", 8000); // R$ 80,00
});

botaoCd.addEventListener("click", function () {
  adicionarProduto("CD Pop Anos 80", 3990); // R$ 39,90
});

botaoCassete.addEventListener("click", function () {
  adicionarProduto("Fita Cassete Lo-fi", 2000); // R$ 20,00
});

// Botão Limpar: tem dois caminhos (if/else)
botaoLimpar.addEventListener("click", function () {
  if (quantidade === 0) {
    // Caminho 1: não há nada para limpar
    mensagemNaTela.textContent = "Sua seleção já está vazia.";
  } else {
    // Caminho 2: zera tudo e mostra os zeros na página
    quantidade = 0;
    subtotalCentavos = 0;
    atualizarResumo();
    mensagemNaTela.textContent = "Seleção limpa. Escolha novos discos.";
  }
});

// Mostra o resumo zerado assim que a página abre
atualizarResumo();