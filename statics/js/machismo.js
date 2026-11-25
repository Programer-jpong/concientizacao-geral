/* NAVEGAÇÃO ENTRE MODALIDADES */

const modalidades = document.querySelector(".modalidades-machismo");
const leitura = document.getElementById("leituraAprofundada");
const visual = document.getElementById("leituraVisualMachismo");

function pararAudio() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

function mostrar(secao) {
  pararAudio();

  [modalidades, leitura, visual].forEach((s) => {
    s.hidden = s !== secao;
  });

  secao.setAttribute("tabindex", "-1");
  secao.scrollIntoView({ behavior: "instant", block: "start" });
  secao.focus({ preventScroll: true });
}

document
  .getElementById("abrirLeituraMachismo")
  .addEventListener("click", () => mostrar(leitura));

document
  .getElementById("abrirVisualMachismo")
  .addEventListener("click", () => mostrar(visual));

document.querySelectorAll(".voltar-modalidades").forEach((botao) => {
  botao.addEventListener("click", (evento) => {
    evento.preventDefault();
    mostrar(modalidades);
  });
});

document
  .getElementById("visualVoltarModalidades")
  .addEventListener("click", () => mostrar(modalidades));

/* HISTÓRIAS EM QUADRINHOS */

const historias = [
  {
    titulo: "Ciência não tem gênero",
    imagem: "historia-01.png",
    mensagem: "Respeito e igualdade também fazem a ciência evoluir!",
    texto: `Na escola, a turma prepara um projeto de ciências sobre energias renováveis.

Júlia propõe construir um gerador solar.

Um colega afirma que projetos assim são mais para os meninos.

Rafael questiona esse comentário. Lucas lembra que competência não depende de gênero.

Com o apoio dos amigos, Júlia participa da construção do gerador.

Na apresentação, o grupo demonstra que conhecimento, dedicação, respeito e trabalho em equipe permitem que todos contribuam com a ciência.

A ciência é para todas e todos!`,
  },

  {
    titulo: "Uma casa, responsabilidades de todos",
    imagem: "historia-02.png",
    mensagem: "Cuidar da casa é responsabilidade de todos!",
    texto: `Mariana chega da escola e encontra sua mãe cansada, realizando todas as tarefas domésticas.

Ela questiona por que somente a mãe precisa cuidar da casa.

Lucas comenta que sempre foi assim.

Rafael explica que tarefas domésticas não têm gênero.

A família conversa e decide compartilhar as responsabilidades.

Lucas lava a louça, Mariana organiza a casa e Rafael cuida do lixo. A mãe consegue descansar.

Quando todos colaboram, a convivência melhora e existe mais respeito.`,
  },

  {
    titulo: "Competência não tem gênero",
    imagem: "historia-03.png",
    mensagem: "Mais igualdade significa mais oportunidades para todos!",
    texto: `A escola organiza uma feira de tecnologia.

Júlia deseja participar da parte técnica, pois gosta de eletrônica e programação.

Um colega questiona sua capacidade e sugere que ela cuide da divulgação.

Júlia explica que estudou e possui experiência.

Rafael e Lucas defendem que o conhecimento e a dedicação são mais importantes que o gênero.

Júlia assume o desenvolvimento do sistema com o apoio da equipe.

O projeto funciona e recebe elogios.

Todas as pessoas merecem oportunidades para desenvolver seu potencial.`,
  },

  {
    titulo: "Amor não é controle",
    imagem: "historia-04.png",
    mensagem: "Um relacionamento saudável respeita quem você é!",
    texto: `Durante o intervalo, Júlia recebe mensagens do namorado questionando suas amizades.

Mariana e Lucas percebem que esse comportamento não é saudável.

Eles explicam que controlar roupas, amizades e decisões não é uma demonstração de cuidado.

Rafael lembra que o ciúme excessivo pode estar associado à violência psicológica.

Com o apoio dos amigos, Júlia reconhece que merece respeito, confiança e liberdade.

Ela estabelece seus limites.

Um relacionamento saudável não controla nem isola.

Se você sentir medo ou estiver em perigo, procure uma pessoa de confiança ou um serviço de apoio. Não é necessário enfrentar a situação sozinho.`,
  },

  {
    titulo: "Pequenas atitudes, grandes mudanças",
    imagem: "historia-05.png",
    mensagem: "Combater o machismo também é uma atitude diária!",
    texto: `Durante o intervalo, os amigos percebem comentários preconceituosos na escola.

Uma menina é desvalorizada porque algumas pessoas acreditam que futebol é coisa de menino.

Lucas inicialmente considera isso uma brincadeira.

Júlia explica que comentários assim reforçam estereótipos e podem excluir pessoas.

Rafael e Mariana sugerem questionar essas atitudes e apoiar quem sofre preconceito.

O grupo cria uma campanha escolar sobre respeito e igualdade.

Outros estudantes começam a repensar seus comportamentos.

A mudança começa com pequenas atitudes: refletir, respeitar, apoiar e incluir.`,
  },
];

/* ELEMENTOS DA LEITURA VISUAL */

let historiaAtual = 0;

const menu = document.getElementById("visualMenu");
const cenario = document.getElementById("visualCenario");
const titulo = document.getElementById("visualHistoriaTitulo");
const progresso = document.getElementById("visualProgresso");
const fala = document.getElementById("visualFala");
const legenda = document.getElementById("visualLegenda");

const anterior = document.getElementById("visualAnterior");
const proximo = document.getElementById("visualProximo");
const ouvir = document.getElementById("visualOuvir");
const parar = document.getElementById("visualParar");

cenario.removeAttribute("role");

menu.replaceChildren();

historias.forEach((historia, indice) => {
  const botao = document.createElement("button");

  botao.type = "button";
  botao.className = "visual-aba";
  botao.textContent = `História ${indice + 1}`;
  botao.setAttribute("aria-label", historia.titulo);

  botao.addEventListener("click", () => {
    historiaAtual = indice;
    desenhar();
  });

  menu.appendChild(botao);
});

/* EXIBIR HISTÓRIA */

function desenhar() {
  pararAudio();

  const historia = historias[historiaAtual];
  const caminho = "../statics/img/machismo/" + historia.imagem;

  progresso.textContent = `História ${historiaAtual + 1} de ${historias.length}`;

  titulo.textContent = historia.titulo;

  const imagem = document.createElement("img");

  imagem.src = caminho;
  imagem.alt = `História em quadrinhos: ${historia.titulo}. Versão em texto disponível abaixo.`;

  const ampliar = document.createElement("button");

  ampliar.type = "button";
  ampliar.className = "visual-ampliar";
  ampliar.textContent = "🔍 Ler quadrinho por quadrinho";

  ampliar.addEventListener("click", () => {
    abrirQuadrinhos(caminho, historia.titulo);
  });

  cenario.replaceChildren(imagem, ampliar);
  fala.textContent = historia.mensagem;

  const detalhes = document.createElement("details");
  detalhes.className = "visual-transcricao";

  const resumo = document.createElement("summary");
  resumo.textContent = "Ler a história em texto";

  const texto = document.createElement("div");
  texto.textContent = historia.texto;

  detalhes.append(resumo, texto);
  legenda.replaceChildren(detalhes);

  anterior.disabled = historiaAtual === 0;
  anterior.textContent = "← História anterior";

  proximo.textContent =
    historiaAtual === historias.length - 1
      ? "↻ Recomeçar"
      : "Próxima história →";

  Array.from(menu.children).forEach((botao, indice) => {
    botao.setAttribute(
      "aria-current",
      indice === historiaAtual ? "true" : "false",
    );
  });
}

/* NAVEGAÇÃO */

anterior.addEventListener("click", () => {
  if (historiaAtual > 0) {
    historiaAtual--;
    desenhar();
  }
});

proximo.addEventListener("click", () => {
  historiaAtual = (historiaAtual + 1) % historias.length;
  desenhar();
});

/* NARRAÇÃO */

ouvir.textContent = "🔊 Ouvir história";

ouvir.addEventListener("click", () => {
  if (!("speechSynthesis" in window)) {
    alert("Seu navegador não oferece leitura em voz alta.");
    return;
  }

  pararAudio();

  const historia = historias[historiaAtual];

  const mensagem = new SpeechSynthesisUtterance(
    historia.titulo + ". " + historia.texto + ". " + historia.mensagem,
  );

  mensagem.lang = "pt-BR";
  mensagem.rate = 0.9;

  window.speechSynthesis.speak(mensagem);
});

parar.addEventListener("click", pararAudio);

document.addEventListener("visibilitychange", () => {
  if (document.hidden) pararAudio();
});

desenhar();
/* AMPLIAÇÃO INDIVIDUAL DOS QUADRINHOS */

function abrirQuadrinhos(caminho, tituloHistoria) {
  pararAudio();

  let quadroAtual = 0;

  const recortes = {
    "historia-01.png": [
      [5, 92, 515, 528],
      [523, 92, 1014, 528],
      [1020, 92, 1533, 528],
      [5, 535, 515, 1016],
      [523, 535, 1045, 1016],
      [1052, 535, 1533, 1016],
    ],

    "historia-02.png": [
      [4, 91, 524, 516],
      [533, 91, 1019, 516],
      [1027, 91, 1533, 516],
      [4, 527, 515, 1018],
      [524, 527, 1018, 1018],
      [1027, 527, 1533, 1018],
    ],

    "historia-03.png": [
      [4, 92, 515, 522],
      [523, 92, 1011, 522],
      [1020, 92, 1533, 522],
      [4, 532, 515, 1018],
      [523, 532, 1011, 1018],
      [1020, 532, 1533, 1018],
    ],

    "historia-04.png": [
      [3, 94, 513, 548],
      [520, 94, 1022, 548],
      [1030, 94, 1534, 548],
      [3, 556, 513, 1018],
      [520, 556, 1004, 1018],
      [1012, 556, 1534, 1018],
    ],

    "historia-05.png": [
      [3, 92, 523, 530],
      [530, 92, 1027, 530],
      [1035, 92, 1534, 530],
      [3, 538, 523, 1018],
      [530, 538, 1027, 1018],
      [1035, 538, 1534, 1018],
    ],
  };

  const arquivo = caminho.split("/").pop();
  const quadros = recortes[arquivo];

  const janela = document.createElement("dialog");

  janela.className = "hq-janela";

  janela.setAttribute("aria-label", tituloHistoria);

  janela.innerHTML = `
        <div class="hq-cabecalho">
            <h2></h2>

            <button type="button" class="hq-fechar"
                aria-label="Fechar quadrinhos">
                ✕
            </button>
        </div>

        <p class="hq-progresso" aria-live="polite"></p>

        <div class="hq-cena"></div>

        <div class="hq-controles">

            <button type="button" class="hq-anterior">
                ← Anterior
            </button>

            <button type="button" class="hq-proximo">
                Próximo →
            </button>

        </div>
    `;

  document.body.appendChild(janela);

  janela.querySelector("h2").textContent = tituloHistoria;

  const cena = janela.querySelector(".hq-cena");
  const progresso = janela.querySelector(".hq-progresso");
  const anterior = janela.querySelector(".hq-anterior");
  const proximo = janela.querySelector(".hq-proximo");
  const fechar = janela.querySelector(".hq-fechar");

  const canvas = document.createElement("canvas");
  const contexto = canvas.getContext("2d");

  cena.replaceChildren(canvas);

  const imagemHQ = new Image();

  imagemHQ.onload = () => atualizarQuadro();
  imagemHQ.src = caminho;

  function atualizarQuadro() {
    if (imagemHQ.complete && imagemHQ.naturalWidth) {
      const [x1, y1, x2, y2] = quadros[quadroAtual];

      const largura = x2 - x1;
      const altura = y2 - y1;

      const escalaX = imagemHQ.naturalWidth / 1536;
      const escalaY = imagemHQ.naturalHeight / 1024;

      canvas.width = largura;
      canvas.height = altura;

      contexto.drawImage(
        imagemHQ,
        x1 * escalaX,
        y1 * escalaY,
        largura * escalaX,
        altura * escalaY,
        0,
        0,
        largura,
        altura,
      );
    }
    progresso.textContent = `Quadrinho ${quadroAtual + 1} de 6`;

    anterior.disabled = quadroAtual === 0;

    proximo.textContent = quadroAtual === 5 ? "Concluir ✓" : "Próximo →";
  }

  anterior.addEventListener("click", () => {
    if (quadroAtual > 0) {
      quadroAtual--;
      atualizarQuadro();
    }
  });

  proximo.addEventListener("click", () => {
    if (quadroAtual < 5) {
      quadroAtual++;
      atualizarQuadro();
    } else {
      janela.close();
    }
  });

  fechar.addEventListener("click", () => {
    janela.close();
  });

  janela.addEventListener("close", () => {
    janela.remove();
  });

  atualizarQuadro();

  janela.showModal();
}
