(function () {
    document.addEventListener("DOMContentLoaded", function () {
        console.log("[Shopify EngageWise] Plugin chargé");

        // Vérifier ou créer un session_user_id
        if (!localStorage.getItem("session_user_id")) {
            localStorage.setItem("session_user_id", "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9));
        }
        const sessionUserId = localStorage.getItem("session_user_id");

        // Générer un nouvel ID de session à chaque visite
        if (!sessionStorage.getItem("session_id")) {
            sessionStorage.setItem("session_id", "sess_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9));
        }
        const sessionId = sessionStorage.getItem("session_id");

        console.log("[Shopify EngageWise] session_user_id:", sessionUserId);
        console.log("[Shopify EngageWise] session_id:", sessionId);

        // Injection automatique du carrousel uniquement si des produits ont été consultés
        function injectCarousel() {
            const viewedProducts = JSON.parse(sessionStorage.getItem("viewed_products")) || [];
            if (viewedProducts.length === 0) {
                console.log("[Shopify EngageWise] Aucun produit récemment consulté, carrousel non affiché.");
                return;
            }

            const carouselContainer = document.createElement("div");
            carouselContainer.classList.add("recent-products-carousel");
            carouselContainer.innerHTML = `
        <h2>Produits récemment consultés</h2>
        <div class="carousel-wrapper">
          ${viewedProducts
                .map(
                    (product) => `
              <div class="carousel-item">
                <a href="/products/${product.handle}">
                  <img src="${product.featured_image}" alt="${product.title}">
                  <p>${product.title}</p>
                  <span>${(product.price / 100).toFixed(2)} €</span>
                </a>
              </div>
            `
                )
                .join("")}
        </div>
        <button class="carousel-prev">◀</button>
        <button class="carousel-next">▶</button>
      `;

            document.body.appendChild(carouselContainer);
        }

        injectCarousel();
    });
})();
