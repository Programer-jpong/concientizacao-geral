
// Identificando os elementos do HTML

const inicio = document.getElementById("inicio");

const leituraCompleta = document.getElementById("leituraCompleta");

const leituraVisual = document.getElementById("leituraVisual");

// Identificando os botões

const btnCompleto = document.getElementById("btnCompleto");

const btnVisual = document.getElementById("btnVisual");

const btnVoltarCompleto = document.getElementById("btnVoltarCompleto");

const btnVoltarVisual = document.getElementById("btnVoltarVisual");

// Função para mostrar a leitura completa

function mostrarLeituraCompleta() {

    inicio.hidden = true;
    leituraVisual.hidden = true;
    leituraCompleta.hidden = false;

    navegarPara(leituraCompleta);

}

// Função para mostrar a leitura visual

function mostrarLeituraVisual() {

    inicio.hidden = true;
    leituraCompleta.hidden = true;
    leituraVisual.hidden = false;

    navegarPara(leituraVisual);

}

// Função para voltar ao início

function voltarInicio() {

    leituraCompleta.hidden = true;
    leituraVisual.hidden = true;
    inicio.hidden = false;

    window.speechSynthesis.cancel();

    navegarPara(inicio);

}


// Eventos dos botões

btnCompleto.addEventListener("click", mostrarLeituraCompleta);

btnVisual.addEventListener("click", mostrarLeituraVisual);

btnVoltarCompleto.addEventListener("click", voltarInicio);

btnVoltarVisual.addEventListener("click", voltarInicio);

// Identificando os botões de tamanho da fonte

const diminuirFonte = document.getElementById("diminuirFonte");

const aumentarFonte = document.getElementById("aumentarFonte");

// CONTROLE GLOBAL DO TAMANHO DAS LETRAS

let tamanhoFonte = 100;

function aplicarTamanhoFonte() {
    document.documentElement.style.fontSize = tamanhoFonte + "%";
    document.documentElement.style.setProperty(
        "--tamanho-texto",
        (18 * tamanhoFonte / 100) + "px"
    );
}

function aumentarTexto() {
    if (tamanhoFonte < 140) {
        tamanhoFonte += 10;
        aplicarTamanhoFonte();
    }
}

function diminuirTexto() {
    if (tamanhoFonte > 80) {
        tamanhoFonte -= 10;
        aplicarTamanhoFonte();
    }
}

// Eventos dos botões

aumentarFonte.addEventListener("click", aumentarTexto);

diminuirFonte.addEventListener("click", diminuirTexto);
// Identificando o botão de contraste

const botaoContraste = document.getElementById("contraste");

// Função para ativar ou desativar o contraste

function alternarContraste() {

    document.body.classList.toggle("alto-contraste");

}

// Evento do botão

botaoContraste.addEventListener("click", alternarContraste);

// Identificando os botões de áudio

const botaoOuvir = document.getElementById("ouvir");
const botaoParar = document.getElementById("pararAudio");

// Função para ler o conteúdo da tela

function ouvirPagina() {

    // Interrompe uma leitura anterior
    window.speechSynthesis.cancel();

    // Identifica qual conteúdo está visível
    let conteudo;

    if (!inicio.hidden) {
        conteudo = inicio;
    } else if (!leituraCompleta.hidden) {
        conteudo = leituraCompleta;
    } else {
        conteudo = leituraVisual;
    }

    // Captura o texto da tela
    const texto = conteudo.innerText;

    // Prepara a leitura
    const leitura = new SpeechSynthesisUtterance(texto);

    // Define o idioma português do Brasil
    leitura.lang = "pt-BR";

    // Define a velocidade da fala
    leitura.rate = 1;

    // Inicia a leitura
    window.speechSynthesis.speak(leitura);
}

// Função para interromper a leitura

function pararLeitura() {

    window.speechSynthesis.cancel();

}

// Eventos dos botões

botaoOuvir.addEventListener("click", ouvirPagina);

botaoParar.addEventListener("click", pararLeitura);
const btnIrVisual = document.getElementById("btnIrVisual");

const btnIrCompleto = document.getElementById("btnIrCompleto");
// Trocar para leitura visual

function irParaVisual() {

    leituraCompleta.hidden = true;
    leituraVisual.hidden = false;

    window.speechSynthesis.cancel();

    navegarPara(leituraVisual);

}

// Trocar para leitura completa

function irParaCompleto() {

    leituraVisual.hidden = true;
    leituraCompleta.hidden = false;

    window.speechSynthesis.cancel();

    navegarPara(leituraCompleta);

}

// Eventos dos novos botões

btnIrVisual.addEventListener("click", irParaVisual);

btnIrCompleto.addEventListener("click", irParaCompleto);


// TESTE DE CONHECIMENTOS

// Identificando o botão e o espaço do resultado
const verificarQuiz = document.getElementById("verificarQuiz");
const resultadoQuiz = document.getElementById("resultadoQuiz");

// Função para corrigir as respostas
function corrigirQuiz() {

    // Respostas corretas
    const respostasCorretas = {
        pergunta1: "b",
        pergunta2: "c",
        pergunta3: "b",
        pergunta4: "a"
    };

    let pontuacao = 0;
    let respondidas = 0;

    // Conferindo cada pergunta
    for (let pergunta in respostasCorretas) {

        const respostaSelecionada =
            document.querySelector(
                `input[name="${pergunta}"]:checked`
            );

        if (respostaSelecionada) {
            respondidas++;

            if (respostaSelecionada.value === respostasCorretas[pergunta]) {
                pontuacao++;
            }
        }
    }

    // Verificando se todas foram respondidas
    if (respondidas < 4) {
        resultadoQuiz.textContent =
            "Responda às quatro perguntas antes de conferir!";
        return;
    }

    // Apresentando a pontuação
    resultadoQuiz.textContent =
        `Você acertou ${pontuacao} de 4 perguntas! `;

    if (pontuacao === 4) {
        resultadoQuiz.textContent +=
            "Excelente! Você domina o assunto!";
    } else if (pontuacao >= 2) {
        resultadoQuiz.textContent +=
            "Muito bem! Continue aprendendo!";
    } else {
        resultadoQuiz.textContent +=
            "Continue estudando! Você pode melhorar!";
    }
}

// Evento do botão
verificarQuiz.addEventListener("click", corrigirQuiz);

// =========================================
// NAVEGAÇÃO DO ÍNDICE DE LEITURA
// =========================================

const linksIndice = document.querySelectorAll(
    '.indice-leitura a[href^="#"]'
);

linksIndice.forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const destino = link.getAttribute("href");

        const assunto = document.querySelector(destino);

        if (assunto) {

            assunto.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            // Atualiza o endereço com o assunto selecionado
            history.replaceState(null, "", destino);

        }

    });

});


/* =========================================
   NAVEGAÇÃO ACESSÍVEL
========================================= */

function navegarPara(secao) {

    window.speechSynthesis.cancel();

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

    secao.setAttribute("tabindex", "-1");
    secao.focus({ preventScroll: true });
}


/* =========================================
   PROGRESSO DAS HISTÓRIAS
========================================= */

const historias = Array.from(
    document.querySelectorAll("#leituraVisual .historia")
);

const historiaAtual = document.getElementById("historiaAtual");
const porcentagemHistorias = document.getElementById("porcentagemHistorias");
const progressoPreenchimento = document.getElementById("progressoPreenchimento");
const barraProgresso = document.getElementById("barraProgresso");

function atualizarProgresso(numero) {

    const total = historias.length;

    if (total === 0) return;

    numero = Math.max(1, Math.min(numero, total));

    const porcentagem = Math.round(numero / total * 100);

    historiaAtual.textContent =
        `História ${numero} de ${total}`;

    porcentagemHistorias.textContent =
        `${porcentagem}%`;

    progressoPreenchimento.style.width =
        `${porcentagem}%`;

    barraProgresso.setAttribute(
        "aria-valuenow",
        porcentagem
    );
}


/* =========================================
   DETECTAR HISTÓRIA VISÍVEL
========================================= */


   
function verificarHistoriaVisivel() {

    if (leituraVisual.hidden || historias.length === 0) {
        return;
    }

    // Linha imaginária a 35% da altura da tela
    const linhaReferencia = window.innerHeight * 0.35;

    let historiaMaisProxima = 0;
    let menorDistancia = Infinity;

    historias.forEach(function(historia, indice) {

        const posicao = historia.getBoundingClientRect();

        // Verifica se a história está passando pela região visível
        if (posicao.bottom > 0 && posicao.top < window.innerHeight) {

            const distancia = Math.abs(
                posicao.top - linhaReferencia
            );

            if (distancia < menorDistancia) {
                menorDistancia = distancia;
                historiaMaisProxima = indice;
            }
        }

    });

    atualizarProgresso(historiaMaisProxima + 1);
}
window.addEventListener("scroll", verificarHistoriaVisivel, {
    passive: true
});

window.addEventListener("resize", verificarHistoriaVisivel);


/* =========================================
   NAVEGAÇÃO ENTRE AS HISTÓRIAS
========================================= */

const linksHistorias = document.querySelectorAll(
    '.menu-historias a, .botao-proxima-historia'
);

linksHistorias.forEach(function(link) {

    link.addEventListener("click", function(event) {

        const destino = link.getAttribute("href");

        if (!destino || !destino.startsWith("#")) {
            return;
        }

        const historiaDestino = document.querySelector(destino);

        if (!historiaDestino) return;

        event.preventDefault();

        inicio.hidden = true;
        leituraCompleta.hidden = true;
        leituraVisual.hidden = false;

        window.speechSynthesis.cancel();

        const indice = historias.indexOf(historiaDestino);

        if (indice !== -1) {
            atualizarProgresso(indice + 1);
        }

        historiaDestino.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        history.replaceState(null, "", destino);
    });
});


/* =========================================
   INICIALIZAÇÃO
========================================= */

atualizarProgresso(1);
// LOGOTIPO: VOLTAR À PÁGINA INICIAL

const logoInicio = document.getElementById("logoInicio");

logoInicio.addEventListener("click", function(event) {
    event.preventDefault();
    voltarInicio();
    history.replaceState(null, "", window.location.pathname);
});

/* =========================================
   PAISAGENS ANIMADAS DA PÁGINA INICIAL
========================================= */

const paisagens = document.querySelectorAll("#inicio .paisagem");
const botaoPaisagens = document.getElementById("alternarPaisagens");

const prefereMenosMovimento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

let paisagemAtual = 0;
let paisagensPausadas = prefereMenosMovimento.matches;

function mostrarProximaPaisagem() {

    if (paisagensPausadas || inicio.hidden) return;

    paisagens[paisagemAtual].classList.remove("ativa");

    paisagemAtual = (paisagemAtual + 1) % paisagens.length;

    paisagens[paisagemAtual].classList.add("ativa");
}

const intervaloPaisagens = window.setInterval(
    mostrarProximaPaisagem,
    7000
);

function atualizarBotaoPaisagens() {
    botaoPaisagens.textContent = paisagensPausadas
        ? "▶ Reproduzir paisagens"
        : "⏸ Pausar paisagens";

    botaoPaisagens.setAttribute(
        "aria-pressed",
        String(paisagensPausadas)
    );
}

botaoPaisagens.addEventListener("click", function() {
    paisagensPausadas = !paisagensPausadas;
    atualizarBotaoPaisagens();
});

atualizarBotaoPaisagens();

/* =========================================
   LEITOR INTERATIVO DE QUADRINHOS
========================================= */

const leitor = document.getElementById("leitorQuadrinhos");
const canvas = document.getElementById("canvasQuadrinho");
const contexto = canvas.getContext("2d");

const tituloLeitor = document.getElementById("tituloLeitor");
const contador = document.getElementById("contadorQuadrinhos");

const anterior = document.getElementById("cenaAnterior");
const proxima = document.getElementById("proximaCena");
const fechar = document.getElementById("fecharLeitor");

let imagemAtual = null;
let cenaAtual = 0;
let botaoOrigem = null;



/* RECORTES DAS CINCO HISTÓRIAS
   Coordenadas baseadas em imagens de 1536 x 1024.
   Cada item representa: x, y, largura, altura.
*/

const recortesHistorias = {

    "historia-01": [
        [8, 105, 722, 254],
        [740, 101, 788, 258],
        [8, 370, 722, 262],
        [740, 370, 788, 262],
        [8, 642, 722, 242],
        [740, 642, 788, 242]
    ],

    "historia-02": [
        [7, 104, 753, 277],
        [775, 104, 754, 277],
        [7, 397, 753, 235],
        [775, 397, 754, 235],
        [7, 645, 753, 247],
        [775, 645, 754, 247]
    ],

    "historia-03": [
        [6, 96, 754, 264],
        [775, 96, 755, 264],
        [6, 376, 754, 232],
        [775, 376, 755, 232],
        [6, 623, 754, 259],
        [775, 623, 755, 259]
    ],

    "historia-04": [
        [5, 94, 724, 256],
        [741, 94, 790, 256],
        [5, 365, 724, 242],
        [765, 365, 766, 242],
        [5, 621, 747, 258],
        [765, 621, 766, 258]
    ],

    "historia-05": [
        [5, 94, 740, 286],
        [756, 94, 775, 286],
        [5, 395, 750, 236],
        [767, 395, 764, 236],
        [5, 645, 740, 243],
        [756, 645, 775, 243]
    ]
};

const totalCenas = 6;




function desenharCena() {

    if (!imagemAtual ||
        !imagemAtual.complete ||
        !imagemAtual.naturalWidth) {
        return;
    }

    // Identificar qual história foi aberta
    const endereco = imagemAtual.currentSrc || imagemAtual.src;

    const resultado = endereco.match(/historia-0[1-5]/);

    if (!resultado) {
        console.error("História não identificada:", endereco);
        return;
    }

    const identificador = resultado[0];

    // Selecionar os recortes da história correta
    const cenas = recortesHistorias[identificador];

    if (!cenas || !cenas[cenaAtual]) {
        return;
    }

    const [x, y, largura, altura] = cenas[cenaAtual];

    // Adaptar ao tamanho real da imagem
    const escalaX = imagemAtual.naturalWidth / 1536;
    const escalaY = imagemAtual.naturalHeight / 1024;

    const origemX = x * escalaX;
    const origemY = y * escalaY;
    const larguraReal = largura * escalaX;
    const alturaReal = altura * escalaY;

    canvas.width = Math.round(larguraReal);
    canvas.height = Math.round(alturaReal);

    contexto.clearRect(
        0, 0, canvas.width, canvas.height
    );

    contexto.drawImage(
        imagemAtual,
        origemX,
        origemY,
        larguraReal,
        alturaReal,
        0,
        0,
        canvas.width,
        canvas.height
    );

    contador.textContent =
        `Cena ${cenaAtual + 1} de ${totalCenas}`;

    anterior.disabled = cenaAtual === 0;
    proxima.disabled = cenaAtual === totalCenas - 1;

    canvas.setAttribute(
        "aria-label",
        `Cena ${cenaAtual + 1} de ${totalCenas} da história`
    );
}


function abrirLeitor(imagem, botao) {
    imagemAtual = imagem;
    botaoOrigem = botao;
    cenaAtual = 0;

    const historia = imagem.closest(".historia");
    const titulo = historia?.querySelector(".historia-titulo h2");

    tituloLeitor.textContent =
        titulo?.textContent.trim() || "Leitura interativa";

    leitor.hidden = false;
    document.body.classList.add("leitor-aberto");

    desenharCena();
    fechar.focus();
}

function fecharLeitor() {
    leitor.hidden = true;
    document.body.classList.remove("leitor-aberto");
    imagemAtual = null;
    botaoOrigem?.focus();
}

document.querySelectorAll(
    ".historia-ilustrada img"
).forEach(imagem => {

    const botao = document.createElement("button");

    botao.type = "button";
    botao.className = "abrir-quadrinhos";
    botao.textContent = "📖 Ler quadrinho por quadrinho";

    imagem.closest(".historia-ilustrada")
          .appendChild(botao);

    botao.addEventListener("click", () => {
        if (imagem.complete && imagem.naturalWidth) {
            abrirLeitor(imagem, botao);
        } else {
            imagem.addEventListener("load", () => {
                abrirLeitor(imagem, botao);
            }, { once: true });
        }
    });
});

anterior.addEventListener("click", () => {
    if (cenaAtual > 0) {
        cenaAtual--;
        desenharCena();
    }
});

proxima.addEventListener("click", () => {
    if (cenaAtual < totalCenas - 1) {
        cenaAtual++;
        desenharCena();
    }
});

fechar.addEventListener("click", fecharLeitor);

leitor.addEventListener("click", evento => {
    if (evento.target === leitor) {
        fecharLeitor();
    }
});

document.addEventListener("keydown", evento => {
    if (leitor.hidden) return;

    if (evento.key === "Escape") {
        fecharLeitor();
    }

    if (evento.key === "ArrowRight" &&
        cenaAtual < totalCenas - 1) {
        cenaAtual++;
        desenharCena();
    }

    if (evento.key === "ArrowLeft" &&
        cenaAtual > 0) {
        cenaAtual--;
        desenharCena();
    }

    // Manter o foco dentro do leitor.
    if (evento.key === "Tab") {
        const botoes = [
            fechar,
            anterior,
            proxima
        ].filter(botao => !botao.disabled);

        const primeiro = botoes[0];
        const ultimo = botoes[botoes.length - 1];

        if (evento.shiftKey &&
            document.activeElement === primeiro) {
            evento.preventDefault();
            ultimo.focus();
        } else if (!evento.shiftKey &&
                   document.activeElement === ultimo) {
            evento.preventDefault();
            primeiro.focus();
        }
    }
});
