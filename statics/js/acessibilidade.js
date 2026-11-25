/* ACESSIBILIDADE COMPARTILHADA */

(() => {
  let tamanho = 16;

  const diminuir = document.getElementById("diminuirFonte");
  const aumentar = document.getElementById("aumentarFonte");
  const contraste = document.getElementById("contraste");
  const ouvir = document.getElementById("ouvirPagina");
  const parar = document.getElementById("pararLeitura");

  function atualizarFonte() {
    document.documentElement.style.fontSize = tamanho + "px";

    diminuir.disabled = tamanho <= 12;
    aumentar.disabled = tamanho >= 32;
  }

  diminuir.addEventListener("click", () => {
    tamanho = Math.max(12, tamanho - 2);
    atualizarFonte();
  });

  aumentar.addEventListener("click", () => {
    tamanho = Math.min(32, tamanho + 2);
    atualizarFonte();
  });

  contraste.addEventListener("click", () => {
    const ativo = document.body.classList.toggle("alto-contraste");

    contraste.setAttribute("aria-pressed", ativo);
  });

  ouvir.addEventListener("click", () => {
    if (!("speechSynthesis" in window)) {
      alert("Seu navegador não oferece leitura em voz alta.");
      return;
    }

    window.speechSynthesis.cancel();

    const conteudo = document.querySelector("main");

    const mensagem = new SpeechSynthesisUtterance(conteudo.innerText);

    mensagem.lang = "pt-BR";
    mensagem.rate = 0.9;

    window.speechSynthesis.speak(mensagem);
  });

  parar.addEventListener("click", () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  });

  atualizarFonte();
})();
