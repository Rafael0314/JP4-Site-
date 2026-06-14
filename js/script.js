const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card-produto').forEach((card) => observer.observe(card));





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




    let currentIndex = 0;
    function moveSlide(direction) {
        const slider = document.getElementById('slider');
        const totalImages = slider.children.length;
        currentIndex += direction;

        if (currentIndex >= totalImages) currentIndex = 0;
        if (currentIndex < 0) currentIndex = totalImages - 1;

        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }





    window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});



const modal = document.getElementById("product-modal");
const modalImg = document.getElementById("main-modal-img");
const zoomTarget = id="zoom-target";

// Função para abrir o modal (chame no clique da imagem do card)
document.querySelectorAll('.card-produto img').forEach(img => {
    img.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
    }
});

// Fechar modal
document.querySelector('.close-modal').onclick = () => modal.style.display = "none";

// Lógica da Lupa (Seguir o Mouse)
const container = document.querySelector('.zoom-container');
const img = document.getElementById('main-modal-img');

container.addEventListener('mousemove', (e) => {
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;

    img.style.transformOrigin = `${e.offsetX}px ${e.offsetY}px`;
});

// Trocar foto pelas miniaturas
function changeModalImg(src) {
    modalImg.src = src;
    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
}



// Lógica para selecionar o tamanho (mudar cor do botão)
document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Opcional: Atualizar o link do WhatsApp com o tamanho escolhido
        const tamanho = this.innerText;
      
        linkWa.href = `https://wa.me/sadfasdfasdfasd?text=Olá!%20Tenho%20interesse%20na%20Oversize%20Xeque%20Mate%20no%20tamanho%20${tamanho}`;
        // No seu script.js, onde configuramos o botão do WhatsApp:
        const linkWa = document.getElementById('wa-link');
        linkWa.href = `https://wa.me/5511991658593?text=QUERO_XEQUE_MATE`;
    });
});


