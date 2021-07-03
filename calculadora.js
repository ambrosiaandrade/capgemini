/*
Author: Ambrósia Andrade
Description: Desafio de programação da Capgemini
Year: 2021
*/

// Interação com o(a) usuário(a) pelo cmd
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Olá, por favor digite o número da opção desejada: ");
console.log("(1) 1ª parte do desafio\n(2) 2ª parte do desafio");

readline.question("Opção: ", (option) => {
  switch (option) {
    case "1":
      parteUm();
      break;
    case "2":
      parteDois();
      break;
    default:
      console.log("[ERRO] Opção inválida");
      break;
  }
});

// Funções parteUm() e parteDois() são chamadas pelo switch
function parteUm() {
  console.log("\n1ªParte do desafio!\n");
  readline.question("Quanto será investido? ", (value) => {
    let visualizacao = visualizations(value);
    console.log(
      `Quantidade máxima de pessoas que visualizarão: ${visualizacao}`
    );
    readline.close();
  });
}

// Inicializando o objeto anuncio
let anuncio = {
  nomeAnuncio: "",
  nomeCliente: "",
  dataInicio: "",
  dataTermino: "",
  investimento: "",
  relatorio: "",
};
let relatorio = {};
let isShared = false;

function parteDois() {
  console.log("\n2ªParte do desafio!\n");

  // Cadastro do anúncio
  readline.question("Nome do anúncio: ", (nomeAnuncio) => {
    anuncio.nomeAnuncio = nomeAnuncio;
    readline.question("Nome do cliente: ", (cliente) => {
      anuncio.nomeCliente = cliente;
      readline.question("Data de início (mm/dd/yyyy): ", (dataInicio) => {
        anuncio.dataInicio = dataInicio;
        readline.question("Data de término (mm/dd/yyyy): ", (dataTermino) => {
          anuncio.dataTermino = dataTermino;
          readline.question("Investimento por dia: ", (investimento) => {
            anuncio.investimento = investimento;
            // Chamando função para calcular a quantidade de dias
            calculateDias(
              anuncio.dataInicio,
              anuncio.dataTermino,
              anuncio.investimento
            );
          });
        });
      });
    });
  });
}

function visualizations(value) {
  let visualizacoes = value * 30;
  let centena = parseInt(visualizacoes / 100);
  let cliques = centena * 12;
  let compartilhamentos = 0;

  share(cliques);

  function share(cliques) {
    let aux = parseInt(cliques / 20);
    compartilhamentos = aux * 3;

    if (compartilhamentos > 1 && isShared == false) {
      isShared = true;
      let novasVisualizacoes = compartilhamentos * 40;
      visualizacoes += novasVisualizacoes;
    }
  }

  return visualizacoes;
}

function calculateDias(dataInicial, dataTerminal, investimento) {
  let firstDate = new Date(dataInicial);
  let lastDate = new Date(dataTerminal);
  let calculateTime = lastDate.getTime() - firstDate.getTime();
  dias = calculateTime / (1000 * 60 * 60 * 24) + 1;
  // Valor total investido é o investimento por dia * dias
  let valorInvestido = dias * investimento;

  // Chamando função para calcular o restante e atribuir ao relatório
  handleRelatorio(valorInvestido);
}

function handleRelatorio(valorInvestido) {
  let visualizacoes = valorInvestido * 30;
  let centena = parseInt(visualizacoes / 100);
  let cliques = centena * 12;
  let compartilhamentos = 0;

  compartilhar(cliques);

  function compartilhar(cliques) {
    let aux = parseInt(cliques / 20);
    compartilhamentos = aux * 3;

    if (compartilhamentos > 1 && isShared == false) {
      isShared = true;
      let novasVisualizacoes = compartilhamentos * 40;
      visualizacoes += novasVisualizacoes;
    }
  }

  relatorio = {
    valorTotalInvestido: valorInvestido,
    qtdMaxVisualizacoes: visualizacoes,
    qtdMaxCliques: cliques,
    qtdMaxCompartilhamentos: compartilhamentos,
  };

  // Colocando relatório dentro do objeto anuncio
  anuncio.relatorio = relatorio;

  // Retornando o resultado
  console.log(
    `\nRelatório!\n\n
  Valor Total investido: ${anuncio.relatorio.valorTotalInvestido}
  Quantidade de visualizações: ${anuncio.relatorio.qtdMaxVisualizacoes}
  Quantidade de cliques: ${anuncio.relatorio.qtdMaxCliques}
  Quantidade de compartilhamentos: ${anuncio.relatorio.qtdMaxCompartilhamentos}`
  );

  readline.close();
}
