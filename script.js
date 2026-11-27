const alunos = [];

const formulario = document.querySelector("#formulario");
const nome = document.querySelector("#nome");
const idade = document.querySelector("#idade");
const turma = document.querySelector("#turma");
const nota1 = document.querySelector("#nota1");
const nota2 = document.querySelector("#nota2");
const mensagem = document.querySelector("#mensagem");
const listaAlunos = document.querySelector("#listaAlunos");

const totalAlunos = document.querySelector("#totalAlunos");
const totalAprovados = document.querySelector("#totalAprovados");
const totalReprovados = document.querySelector("#totalReprovados");

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const nomeAluno = nome.value.trim();
  const idadeAluno = Number(idade.value);
  const turmaAluno = turma.value.trim();
  const primeiraNota = Number(nota1.value);
  const segundaNota = Number(nota2.value);

  if (nomeAluno === "") {
    mensagem.textContent = "Digite o nome do aluno!";
    nome.focus();
    return;
  }

  if (idade.value === "" || isNaN(idadeAluno) || idadeAluno <= 0) {
    mensagem.textContent = "Digite uma idade válida!";
    idade.focus();
    return;
  }

  if (turmaAluno === "") {
    mensagem.textContent = "Digite a turma!";
    turma.focus();
    return;
  }

  if (nota1.value === "" || primeiraNota < 0 || primeiraNota > 10) {
    mensagem.textContent = "Digite uma nota válida para a nota 1!";
    nota1.focus();
    return;
  }

  if (nota2.value === "" || segundaNota < 0 || segundaNota > 10) {
    mensagem.textContent = "Digite uma nota válida para a nota 2!";
    nota2.focus();
    return;
  }

  for (let i = 0; i < alunos.length; i++) {
    if (alunos[i].nome === nomeAluno && alunos[i].turma === turmaAluno) {
      mensagem.textContent = "Esse aluno já está cadastrado nessa turma!";
      nome.focus();
      return;
    }
  }

  const media = (primeiraNota + segundaNota) / 2;

  let situacao = "";

  if (media >= 7) {
    situacao = "Aprovado";
  } else {
    situacao = "Reprovado";
  }

  const aluno = {
    nome: nomeAluno,
    idade: idadeAluno,
    turma: turmaAluno,
    nota1: primeiraNota,
    nota2: segundaNota,
    media: media,
    situacao: situacao,
  };

  alunos.push(aluno);

  mensagem.textContent = "";

  formulario.reset();

  exibirAlunos();
  atualizarResumo();
});

function exibirAlunos() {
  listaAlunos.innerHTML = "";

  if (alunos.length === 0) {
    listaAlunos.textContent = "Nenhum estudante cadastrado ainda.";
    return;
  }

  for (let i = 0; i < alunos.length; i++) {
    const aluno = alunos[i];

    const div = document.createElement("div");

    div.classList.add("aluno");

    if (aluno.situacao === "Aprovado") {
      div.classList.add("aprovado");
    } else {
      div.classList.add("reprovado");
    }

    div.innerHTML =
      "<p>Nome: " +
      aluno.nome +
      "</p>" +
      "<p>Idade: " +
      aluno.idade +
      "</p>" +
      "<p>Turma: " +
      aluno.turma +
      "</p>" +
      "<p>Nota 1: " +
      aluno.nota1 +
      "</p>" +
      "<p>Nota 2: " +
      aluno.nota2 +
      "</p>" +
      "<p>Média: " +
      aluno.media.toFixed(1) +
      "</p>" +
      "<p>Situação: " +
      aluno.situacao +
      "</p>";

    const botaoRemover = document.createElement("button");

    botaoRemover.textContent = "Remover aluno";
    botaoRemover.type = "button";

    botaoRemover.addEventListener("click", function () {
      const novosAlunos = [];

      for (let j = 0; j < alunos.length; j++) {
        if (j !== i) {
          novosAlunos.push(alunos[j]);
        }
      }

      alunos.length = 0;

      for (let j = 0; j < novosAlunos.length; j++) {
        alunos.push(novosAlunos[j]);
      }

      exibirAlunos();
      atualizarResumo();
    });

    div.appendChild(botaoRemover);

    listaAlunos.appendChild(div);
  }
}

function atualizarResumo() {
  let aprovados = 0;
  let reprovados = 0;

  for (let i = 0; i < alunos.length; i++) {
    if (alunos[i].situacao === "Aprovado") {
      aprovados++;
    } else {
      reprovados++;
    }
  }

  totalAlunos.textContent = alunos.length;
  totalAprovados.textContent = aprovados;
  totalReprovados.textContent = reprovados;
}

formulario.addEventListener("reset", function () {
  mensagem.textContent = "";
});

exibirAlunos();
atualizarResumo();
