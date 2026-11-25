"use strict";
const $ = (id) => document.getElementById(id);
const secoes = [$("modalidades"), $("leituraCompleta"), $("leituraVisual")];
function parar() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}
function mostrar(id) {
  parar();
  secoes.forEach((s) => (s.hidden = s.id !== id));
  const el = $(id);
  el.setAttribute("tabindex", "-1");
  el.scrollIntoView({ block: "start", behavior: "instant" });
  el.focus({ preventScroll: true });
}
$("abrirCompleta").addEventListener("click", () => mostrar("leituraCompleta"));
$("abrirVisual").addEventListener("click", () => {
  indice = 0;
  desenhar();
  mostrar("leituraVisual");
});
document
  .querySelectorAll("[data-voltar]")
  .forEach((b) => b.addEventListener("click", () => mostrar("modalidades")));
let tamanho = 100;
$("aumentarFonte").addEventListener("click", () => {
  tamanho = Math.min(150, tamanho + 10);
  document.documentElement.style.fontSize = tamanho + "%";
});
$("diminuirFonte").addEventListener("click", () => {
  tamanho = Math.max(80, tamanho - 10);
  document.documentElement.style.fontSize = tamanho + "%";
});
$("contraste").addEventListener("click", () => {
  const ativo = document.body.classList.toggle("alto-contraste");
  $("contraste").setAttribute("aria-pressed", String(ativo));
});
function falar(texto) {
  parar();
  if (!("speechSynthesis" in window)) {
    alert("Seu navegador não oferece leitura em voz alta.");
    return;
  }
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = "pt-BR";
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
}
$("ouvirPagina").addEventListener("click", () => {
  const visivel = secoes.find((s) => !s.hidden);
  falar(visivel.innerText);
});
$("pararAudio").addEventListener("click", parar);

/* ===================================
   HISTÓRIAS EM QUADRINHOS — SLAM
=================================== */

const historias = [
  {
    titulo: "Descobrindo o Slam",
    imagem: "historia-01.png",
    mensagem: "A poesia pode estar em todos os lugares!",
    quadros: [
      [2, 115, 503, 544],
      [516, 115, 1021, 544],
      [1033, 115, 1535, 544],
      [2, 554, 503, 1014],
      [516, 554, 1021, 1014],
      [1033, 554, 1535, 1014],
    ],
    textos: [
      "Depois da aula, Ana passa por uma praça e percebe uma roda de pessoas. Ela fica curiosa.",
      "Um amigo explica que o Slam é uma batalha de poesia falada, na qual as pessoas apresentam poemas autorais.",
      "Uma poeta apresenta versos sobre sua comunidade, suas lutas e seus sonhos.",
      "Ana percebe que, no Slam, a poesia ganha voz, corpo e realidade.",
      "Ana pergunta se também pode escrever sobre suas experiências. Seu amigo explica que o Slam é um espaço para diferentes vozes.",
      "Ana começa a escrever e descobre que sua voz também importa.",
    ],
  },

  {
    titulo: "Minha primeira batalha de poesia",
    imagem: "historia-02.png",
    mensagem: "O Slam é um espaço de escuta, troca e expressão!",
    quadros: [
      [6, 112, 508, 545],
      [520, 112, 1015, 545],
      [1027, 112, 1534, 545],
      [6, 555, 504, 1014],
      [517, 555, 1020, 1014],
      [1031, 555, 1534, 1014],
    ],
    textos: [
      "Inspirada pelo Slam da praça, Ana decide participar de uma batalha de poesia na escola. Está animada, mas nervosa.",
      "Ela ensaia um poema sobre seu bairro, sua família, as dificuldades e as belezas do lugar onde vive.",
      "Chega o dia da batalha. Ana sobe ao palco para apresentar seu poema.",
      "Ana declama versos sobre a força das pessoas e os sonhos de sua comunidade.",
      "Os amigos elogiam sua apresentação. Ana fica feliz por ter sido ouvida.",
      "Ela percebe que o Slam é muito mais do que uma competição.",
    ],
  },

  {
    titulo: "Uma voz contra o preconceito",
    imagem: "historia-03.png",
    mensagem: "A poesia também pode combater injustiças!",
    quadros: [
      [1, 113, 503, 584],
      [516, 113, 1018, 584],
      [1031, 113, 1535, 584],
      [1, 596, 503, 1014],
      [516, 596, 1018, 1014],
      [1031, 596, 1535, 1014],
    ],
    textos: [
      "Na escola, Lucas sofre comentários preconceituosos sobre sua cor, seu cabelo e seu jeito de ser.",
      "Um amigo o convida para participar de um Slam no bairro.",
      "Lucas compartilha suas experiências com o preconceito por meio da poesia, valorizando sua identidade e sua história.",
      "A plateia se emociona e responde com aplausos.",
      "Lucas sente que foi ouvido, respeitado e acolhido.",
      "Ele percebe que falar sobre o preconceito também pode contribuir para transformar a realidade.",
    ],
  },

  {
    titulo: "A história do Slam",
    imagem: "historia-04.png",
    mensagem: "A poesia atravessa fronteiras e aproxima pessoas!",
    quadros: [
      [4, 115, 509, 545],
      [523, 115, 1022, 545],
      [1035, 115, 1535, 545],
      [3, 555, 509, 1014],
      [522, 555, 1022, 1014],
      [1035, 555, 1535, 1014],
    ],
    textos: [
      "Lucas pergunta a Ana de onde surgiu o Slam.",
      "O movimento surgiu em Chicago, nos Estados Unidos, na década de 1980, com o poeta Marc Kelly Smith.",
      "A ideia se espalhou pelo mundo, aproximando a poesia de diferentes públicos.",
      "No Brasil, o Slam chegou nos anos 2000 e ganhou espaço nas periferias, escolas e espaços culturais.",
      "Os amigos conversam sobre como o movimento continua se reinventando.",
      "Ana reflete sobre a importância da poesia, da resistência e da participação popular.",
    ],
  },

  {
    titulo: "Sua voz também importa",
    imagem: "historia-05.png",
    mensagem: "O Slam é para todas as vozes!",
    quadros: [
      [0, 111, 496, 543],
      [508, 111, 1021, 543],
      [1033, 111, 1536, 543],
      [0, 553, 512, 1014],
      [525, 553, 1021, 1014],
      [1034, 553, 1536, 1014],
    ],
    textos: [
      "Depois de assistir a várias batalhas, Ana percebe que também pode participar.",
      "Com o apoio dos amigos, ela escreve sobre suas lutas, sonhos e sua comunidade.",
      "No dia da apresentação, Ana transforma suas palavras em voz.",
      "A plateia responde com aplausos e respeito.",
      "Ana conversa com seu amigo sobre a importância de ser ouvida e de inspirar outras pessoas.",
      "Ela incentiva todos a escrever e compartilhar suas experiências. Não é necessário ser poeta profissional.",
    ],
  },
];

let indice = 0;

const pastaHQ = "../statics/img/slam/";

/* MENU DAS HISTÓRIAS */

const menuHQ = document.createElement("div");
menuHQ.className = "slam-hq-menu";

$("visualContador").before(menuHQ);

historias.forEach((historia, i) => {
  const botao = document.createElement("button");

  botao.type = "button";
  botao.textContent = `História ${i + 1}`;
  botao.setAttribute("aria-label", historia.titulo);

  botao.addEventListener("click", () => {
    parar();
    indice = i;
    desenhar();
  });

  menuHQ.appendChild(botao);
});

/* EXIBIR HISTÓRIA COMPLETA */

function desenhar() {
  const historia = historias[indice];

  $("visualCenaTitulo").textContent = historia.titulo;

  const arte = $("visualArte");

  const imagem = document.createElement("img");

  imagem.src = pastaHQ + historia.imagem;
  imagem.alt = `História em quadrinhos: ${historia.titulo}.`;

  const ampliar = document.createElement("button");

  ampliar.type = "button";
  ampliar.className = "slam-ampliar";
  ampliar.textContent = "🔍 Ler quadrinho por quadrinho";

  ampliar.addEventListener("click", () => {
    abrirQuadrinhos(historia);
  });

  arte.replaceChildren(imagem, ampliar);

  $("visualCenaTexto").textContent = historia.mensagem;

  const detalhes = document.createElement("details");
  detalhes.className = "slam-transcricao";

  const resumo = document.createElement("summary");
  resumo.textContent = "Ler história em texto";

  detalhes.appendChild(resumo);

  historia.textos.forEach((texto, i) => {
    const p = document.createElement("p");

    p.textContent = `Quadrinho ${i + 1}: ${texto}`;

    detalhes.appendChild(p);
  });

  $("visualCenaTexto").appendChild(detalhes);

  $("visualContador").textContent =
    `História ${indice + 1} de ${historias.length}`;

  $("visualBarra").style.width = ((indice + 1) / historias.length) * 100 + "%";

  $("visualAnterior").disabled = indice === 0;

  $("visualAnterior").textContent = "← História anterior";

  $("visualProximo").textContent =
    indice === historias.length - 1 ? "Recomeçar ↺" : "Próxima história →";

  $("ouvirCena").textContent = "🔊 Ouvir história";

  Array.from(menuHQ.children).forEach((botao, i) => {
    botao.setAttribute("aria-current", String(i === indice));
  });
}

/* NAVEGAÇÃO ENTRE HISTÓRIAS */

$("visualAnterior").addEventListener("click", () => {
  if (indice > 0) {
    parar();
    indice--;
    desenhar();
  }
});

$("visualProximo").addEventListener("click", () => {
  parar();

  indice = (indice + 1) % historias.length;

  desenhar();
});

$("ouvirCena").addEventListener("click", () => {
  const historia = historias[indice];

  falar(
    historia.titulo +
      ". " +
      historia.textos.join(" ") +
      " " +
      historia.mensagem,
  );
});

$("pararCena").addEventListener("click", parar);

/* ===================================
   LEITOR INDIVIDUAL DE QUADRINHOS
=================================== */

function abrirQuadrinhos(historia) {
  parar();

  let quadroAtual = 0;

  const botaoOrigem = document.activeElement;

  const janela = document.createElement("dialog");

  janela.className = "slam-hq-janela";

  janela.setAttribute("aria-label", historia.titulo);

  janela.innerHTML = `
        <div class="slam-hq-cabecalho">
            <h2></h2>

            <button type="button" class="slam-hq-fechar"
                aria-label="Fechar quadrinhos">✕</button>
        </div>

        <p class="slam-hq-progresso" aria-live="polite"></p>

        <div class="slam-hq-cena">
            <canvas role="img"></canvas>
        </div>

        <div class="slam-hq-controles">

            <button type="button" class="slam-hq-anterior">
                ← Anterior
            </button>

            <button type="button" class="slam-hq-ouvir">
                🔊 Ouvir
            </button>

            <button type="button" class="slam-hq-proximo">
                Próximo →
            </button>

        </div>
    `;

  document.body.appendChild(janela);

  janela.querySelector("h2").textContent = historia.titulo;

  const canvas = janela.querySelector("canvas");

  const contexto = canvas.getContext("2d");

  const progresso = janela.querySelector(".slam-hq-progresso");

  const anterior = janela.querySelector(".slam-hq-anterior");

  const proximo = janela.querySelector(".slam-hq-proximo");

  const imagem = new Image();

  function atualizarQuadro() {
    parar();

    progresso.textContent = `Quadrinho ${quadroAtual + 1} de ${historia.quadros.length}`;

    anterior.disabled = quadroAtual === 0;

    proximo.textContent =
      quadroAtual === historia.quadros.length - 1 ? "Concluir ✓" : "Próximo →";

    canvas.setAttribute("aria-label", historia.textos[quadroAtual]);

    if (!imagem.complete || !imagem.naturalWidth) return;

    const [x1, y1, x2, y2] = historia.quadros[quadroAtual];

    const largura = x2 - x1;
    const altura = y2 - y1;

    const escalaX = imagem.naturalWidth / 1536;
    const escalaY = imagem.naturalHeight / 1024;

    canvas.width = largura;
    canvas.height = altura;

    contexto.drawImage(
      imagem,
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

  imagem.onload = atualizarQuadro;

  imagem.onerror = () => {
    progresso.textContent = "Não foi possível carregar a imagem.";
  };

  imagem.src = pastaHQ + historia.imagem;

  anterior.addEventListener("click", () => {
    if (quadroAtual > 0) {
      quadroAtual--;
      atualizarQuadro();
    }
  });

  proximo.addEventListener("click", () => {
    if (quadroAtual < historia.quadros.length - 1) {
      quadroAtual++;
      atualizarQuadro();
    } else {
      janela.close();
    }
  });

  janela.querySelector(".slam-hq-ouvir").addEventListener("click", () => {
    falar(historia.textos[quadroAtual]);
  });

  janela
    .querySelector(".slam-hq-fechar")
    .addEventListener("click", () => janela.close());

  janela.addEventListener("close", () => {
    parar();
    janela.remove();
    botaoOrigem?.focus();
  });

  atualizarQuadro();

  janela.showModal();
}

window.addEventListener("pagehide", parar);

document.addEventListener("visibilitychange", () => {
  if (document.hidden) parar();
});

desenhar();
/* AMPLIAÇÃO DAS HQs NA LEITURA COMPLETA */

document.querySelectorAll(".slam-ilustracao").forEach((figura) => {
  const imagem = figura.querySelector("img");

  if (!imagem) return;

  const arquivo = imagem.getAttribute("src").split("/").pop();

  const historia = historias.find((h) => h.imagem === arquivo);

  if (!historia) return;

  const botao = document.createElement("button");

  botao.type = "button";
  botao.className = "slam-ampliar-leitura";
  botao.textContent = "🔍 Ler quadrinho por quadrinho";

  botao.addEventListener("click", () => {
    abrirQuadrinhos(historia);
  });

  imagem.after(botao);
});
