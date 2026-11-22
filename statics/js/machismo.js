
/* =========================================
   MACHISMO — NAVEGAÇÃO
========================================= */

const botaoAbrirLeitura = document.getElementById(
    "abrirLeituraMachismo"
);

const secaoLeitura = document.getElementById(
    "leituraAprofundada"
);

const secaoModalidades = document.querySelector(
    ".modalidades-machismo"
);

const botaoVoltarLeitura = document.querySelector(
    ".voltar-modalidades"
);

// Abrir a leitura completa
botaoAbrirLeitura.addEventListener("click", function() {

    secaoModalidades.hidden = true;
    secaoLeitura.hidden = false;

    secaoLeitura.setAttribute("tabindex", "-1");
    secaoLeitura.focus({ preventScroll: true });

    secaoLeitura.scrollIntoView({
        behavior: "instant",
        block: "start"
    });

});

// Voltar às modalidades
botaoVoltarLeitura.addEventListener("click", function(evento) {

    evento.preventDefault();

    secaoLeitura.hidden = true;
    secaoModalidades.hidden = false;

    secaoModalidades.setAttribute("tabindex", "-1");
    secaoModalidades.focus({ preventScroll: true });

    secaoModalidades.scrollIntoView({
        behavior: "instant",
        block: "start"
    });

});
