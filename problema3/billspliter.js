let pessoas = [];
let refeicoes = [];

function addPessoa() {
  let inputPessoa = document.getElementById("inputPessoa");
  let inputRefeicao = document.getElementById("inputRefeicao");
  let inputValor = document.getElementById("inputValor");

  let nomePessoa = inputPessoa.value.trim();
  let nomeRefeicao = inputRefeicao.value.trim();
  let valorRefeicao = parseFloat(inputValor.value);

  if (nomePessoa !== "" && nomeRefeicao !== "" && !isNaN(valorRefeicao) && valorRefeicao > 0) {
    let refeicaoExistente = refeicoes.find(refeicao => refeicao.nome === nomeRefeicao);

    if (refeicaoExistente) {
      refeicaoExistente.valor += valorRefeicao;

      if (!refeicaoExistente.pessoas.includes(nomePessoa)) {
        refeicaoExistente.pessoas.push(nomePessoa);
      }
    } else {
      let refeicao = {
        nome: nomeRefeicao,
        valor: valorRefeicao,
        pessoas: [nomePessoa]
      };
      refeicoes.push(refeicao);
    }

    let pessoaExistente = pessoas.find(p => p.nome === nomePessoa);

    if (!pessoaExistente) {
      let pessoa = {
        nome: nomePessoa,
        valor: valorRefeicao 
      };
      pessoas.push(pessoa);
    } else {
      pessoaExistente.valor += valorRefeicao / refeicaoExistente.pessoas.length;
    }

    inputPessoa.value = "";
    inputRefeicao.value = "";
    inputValor.value = "";

    exibirNomesPessoas();
    exibirRefeicoesConsumidas();
  }
}

function exibirNomesPessoas() {
  let nomesHTML = "<h3>Nomes Adicionados:</h3><ul>";
  pessoas.forEach(pessoa => {
    nomesHTML += `<li>${pessoa.nome} - Valor a ser pago: R$ ${pessoa.valor.toFixed(2)}</li>`;
  });
  nomesHTML += "</ul>";

  document.getElementById("nomes").innerHTML = nomesHTML;
}

function exibirRefeicoesConsumidas() {
  let refeicoesHTML = "<h3>Refeições Consumidas:</h3><ul>";
  refeicoes.forEach(refeicao => {
    let valorPorPessoa = refeicao.valor / refeicao.pessoas.length;
    let nomesPessoas = refeicao.pessoas.join(", ");
    refeicoesHTML += `<li>${refeicao.nome} - Valor: R$ ${valorPorPessoa.toFixed(2)} - Pessoas: ${nomesPessoas}</li>`;
  });
  refeicoesHTML += "</ul>";

  document.getElementById("refeicoes").innerHTML = refeicoesHTML;
}
