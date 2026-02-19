document.addEventListener("DOMContentLoaded", function () {


  /* ===============================
     FILTRO (CATÁLOGO)
  ================================= */

  const botoes = document.querySelectorAll(".filtro-btn");
  const produtos = document.querySelectorAll(".produto-col");

  if (botoes.length > 0) {
    botoes.forEach(botao => {
      botao.addEventListener("click", function () {

        botoes.forEach(btn => btn.classList.remove("ativo"));
        this.classList.add("ativo");

        const filtro = this.dataset.filtro;

        produtos.forEach(produto => {
          const categorias = produto.dataset.categoria || "";

          if (filtro === "todas" || categorias.includes(filtro)) {
            produto.style.display = "block";
          } else {
            produto.style.display = "none";
          }
        });

      });
    });
  }


  /* ===============================
     MODAL WHATSAPP
  ================================= */

  const modal = document.getElementById("modal-whatsapp");
  const btnContinuar = document.getElementById("continuar");
  const fecharModal = document.querySelector(".fechar-modal");

  let produtoSelecionado = "";
  let precoSelecionado = "";
  let linkProduto = "";


  /* ===============================
     BOTÕES DOS CARDS (INDEX + CATÁLOGO)
  ================================= */

  const botoesCard = document.querySelectorAll(".card .btn-comprar");

  if (botoesCard.length > 0 && modal) {
    botoesCard.forEach(botao => {
      botao.addEventListener("click", function (e) {
        e.preventDefault();

        const card = this.closest(".card");

        produtoSelecionado = card.querySelector(".card-title")?.innerText || "";
        precoSelecionado = card.querySelector(".preco")?.innerText || "";
        linkProduto = window.location.href;

        modal.style.display = "flex";
      });
    });
  }


  /* ===============================
     BOTÃO DA PÁGINA INDIVIDUAL
  ================================= */

  const botaoIndividual = document.querySelector(".info-produto .btn-comprar");

  if (botaoIndividual && modal) {
    botaoIndividual.addEventListener("click", function (e) {
      e.preventDefault();

      produtoSelecionado = document.querySelector(".info-produto h1")?.innerText || "";
      precoSelecionado = document.querySelector(".info-produto .preco")?.innerText || "";
      linkProduto = window.location.href;

      modal.style.display = "flex";
    });
  }


  /* ===============================
     CONTINUAR PARA WHATSAPP
  ================================= */

  if (btnContinuar) {
    btnContinuar.addEventListener("click", function () {

      const numero = "5565993073682"; // coloque com DDI 55

      const mensagem =
`Olá!
Tenho interesse no produto *${produtoSelecionado}* (${precoSelecionado}).

Link do produto:
${linkProduto}

Poderia me enviar mais informações para finalizar a compra?`;

      const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

      window.location.href = url;
    });
  }


  /* ===============================
     FECHAR MODAL
  ================================= */

  if (fecharModal && modal) {
    fecharModal.addEventListener("click", function () {
      modal.style.display = "none";
    });
  }

  window.addEventListener("click", function (e) {
    if (modal && e.target === modal) {
      modal.style.display = "none";
    }
  });


  /* ===============================
     GALERIA DE IMAGENS (PÁGINA PRODUTO)
  ================================= */

  const miniaturas = document.querySelectorAll(".miniatura");
  const imagemPrincipalContainer = document.querySelector(".imagem-principal");

  if (miniaturas.length > 0 && imagemPrincipalContainer) {

    miniaturas.forEach(item => {

      item.addEventListener("click", function () {

        document.querySelectorAll(".miniatura")
          .forEach(m => m.classList.remove("ativa"));

        this.classList.add("ativa");

        imagemPrincipalContainer.innerHTML = "";

        const tipo = this.dataset.tipo;

        if (tipo === "video") {

          const video = document.createElement("video");
          video.src = this.src;
          video.controls = true;
          video.autoplay = true;
          video.muted = true;
          video.playsInline = true;
          video.style.width = "100%";
          video.style.borderRadius = "12px";

          imagemPrincipalContainer.appendChild(video);

        } else {

          const img = document.createElement("img");
          img.src = this.src;
          img.style.width = "100%";
          img.style.borderRadius = "12px";

          imagemPrincipalContainer.appendChild(img);
        }

      });

    });

  }

});

