// 1. EFEITO DE ENTRADA DOS CARDS (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card-produto').forEach((card) => observer.observe(card));


// 2. ESCONDER/MOSTRAR NAVBAR AO SCROLL
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Se a posição atual for maior que a anterior, você está descendo
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.classList.add('nav-hidden'); // Esconde
    } else {
        navbar.classList.remove('nav-hidden'); // Mostra
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Atualiza a última posição
}, false);


// 3. CARROSSEL DE DESTAQUES
let currentIndex = 0;
window.moveSlide = function(direction) {
    const slider = document.getElementById('slider');
    if (!slider) return;
    
    const totalImages = slider.children.length;
    currentIndex += direction;

    if (currentIndex >= totalImages) currentIndex = 0;
    if (currentIndex < 0) currentIndex = totalImages - 1;

    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}


// 4. MUDANÇA DE ESTILO DA NAVBAR AO SCROLL
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// 5. MODAL DE PRODUTO
const modal = document.getElementById("product-modal");
const modalImg = document.getElementById("main-modal-img");

// Abrir modal ao clicar na imagem do card
document.querySelectorAll('.card-produto img').forEach(img => {
    img.onclick = function() {
        if (modal && modalImg) {
            modal.style.display = "block";
            modalImg.src = this.src;
        }
    }
});

// Fechar modal
const closeBtn = document.querySelector('.close-modal');
if (closeBtn) {
    closeBtn.onclick = () => {
        if (modal) modal.style.display = "none";
    }
}

// Lógica da Lupa (Seguir o Mouse)
const container = document.querySelector('.zoom-container');
if (container && modalImg) {
    container.addEventListener('mousemove', (e) => {
        modalImg.style.transformOrigin = `${e.offsetX}px ${e.offsetY}px`;
    });
}

// Trocar foto pelas miniaturas
window.changeModalImg = function(src) {
    if (modalImg) modalImg.src = src;
    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }
}


// 6. SELEÇÃO DE TAMANHO E ATUALIZAÇÃO DO LINK DO WHATSAPP
document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove ativo de todos os botões e coloca no clicado
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const tamanho = this.innerText;
        const linkWa = document.getElementById('wa-link');
        
        if (linkWa) {
            // Atualiza dinamicamente o link enviando o produto correto e o tamanho selecionado pelo cliente
            linkWa.href = `https://wa.me/5511991658593?text=Olá!%20Tenho%20interesse%20na%20Oversize%20Xeque%20Mate%20no%20tamanho%20${tamanho}`;
        }
    });
});
