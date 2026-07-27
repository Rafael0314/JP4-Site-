document.addEventListener('DOMContentLoaded', () => {
    // ESTADOS GERAIS
    let isCouponApplied = false;
    let selectedSize = "M";
    let currentIndex = 0;

    // ELEMENTOS DO DOM
    const couponModal = document.getElementById('coupon-modal');
    const couponInput = document.getElementById('coupon-input');
    const couponBtn = document.querySelector('.btn-use-coupon');
    const couponCloseBtn = document.querySelector('.coupon-close');
    const couponMessage = document.getElementById('coupon-message');

    const cardPrice = document.getElementById('card-price');
    const modalPrice = document.getElementById('modal-price');
    const cardTagDiscount = document.getElementById('card-tag-discount');

    const linkWaModal = document.getElementById('wa-link');
    const linkWaMain = document.getElementById('btn-comprar-main');

    const productModal = document.getElementById("product-modal");
    const mainModalImg = document.getElementById("main-modal-img");
    const closeProductModalBtn = document.querySelector('.close-modal');

    // -------------------------------------------------------------
    // 1. LÓGICA DO WHATSAPP
    // -------------------------------------------------------------
    function updateWhatsAppLinks() {
        let textMsg = `Olá! Tenho interesse na Oversize Xeque Mate no tamanho ${selectedSize}`;
        
        if (isCouponApplied) {
            textMsg += `. estou usando o cupom JP4ARANHA`;
        }

        const encodedText = encodeURIComponent(textMsg);
        const fullUrl = `https://wa.me/5511991658593?text=${encodedText}`;

        if (linkWaModal) linkWaModal.href = fullUrl;
        if (linkWaMain) linkWaMain.href = fullUrl;
    }

    updateWhatsAppLinks();

    // -------------------------------------------------------------
    // 2. LÓGICA DO POPUP E VALIDAÇÃO DO CUPOM
    // -------------------------------------------------------------
    setTimeout(() => {
        if (couponModal) couponModal.classList.add('active');
    }, 500);

    function closeCouponModal() {
        if (couponModal) couponModal.classList.remove('active');
    }

    if (couponCloseBtn) {
        couponCloseBtn.addEventListener('click', closeCouponModal);
    }

    function applyCoupon() {
        if (!couponInput || !couponMessage) return;

        const val = couponInput.value.trim();

        if (val === 'JP4ARANHA') {
            isCouponApplied = true;

            if (cardPrice) cardPrice.innerText = 'R$ 110,39';
            if (modalPrice) modalPrice.innerText = 'R$ 110,39';
            if (cardTagDiscount) cardTagDiscount.innerText = '-31%';

            couponMessage.style.color = '#28a745';
            couponMessage.innerText = 'Cupom JP4ARANHA aplicado com sucesso!';

            updateWhatsAppLinks();

            setTimeout(closeCouponModal, 1200);
        } else {
            couponMessage.style.color = '#ff2a2a';
            couponMessage.innerText = 'Cupom inválido! Digite exatamente em maiúsculas: JP4ARANHA';
        }
    }

    if (couponBtn) {
        couponBtn.addEventListener('click', (e) => {
            e.preventDefault();
            applyCoupon();
        });
    }

    if (couponInput) {
        couponInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                applyCoupon();
            }
        });
    }

    // -------------------------------------------------------------
    // 3. CARROSSEL DE IMAGENS
    // -------------------------------------------------------------
    const slider = document.getElementById('slider');
    const prevBtn = document.querySelector('.arrow.left');
    const nextBtn = document.querySelector('.arrow.right');

    function moveSlide(direction) {
        if (!slider) return;
        const totalImages = slider.children.length;
        currentIndex += direction;

        if (currentIndex >= totalImages) currentIndex = 0;
        if (currentIndex < 0) currentIndex = totalImages - 1;

        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    if (prevBtn) prevBtn.addEventListener('click', () => moveSlide(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => moveSlide(1));

    // -------------------------------------------------------------
    // 4. MODAL DO PRODUTO & THUMBNAILS
    // -------------------------------------------------------------
    document.querySelectorAll('.card-produto img').forEach(img => {
        img.addEventListener('click', function() {
            if (productModal && mainModalImg) {
                productModal.style.display = "block";
                mainModalImg.src = this.src;
            }
        });
    });

    if (closeProductModalBtn) {
        closeProductModalBtn.addEventListener('click', () => {
            if (productModal) productModal.style.display = "none";
        });
    }

    // Troca de miniaturas no modal
    document.querySelectorAll('.thumbnail-grid .thumb').forEach(thumb => {
        thumb.addEventListener('click', function() {
            if (mainModalImg) mainModalImg.src = this.src;
            document.querySelectorAll('.thumbnail-grid .thumb').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Seleção de tamanho do produto
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedSize = this.innerText;
            updateWhatsAppLinks();
        });
    });

    // -------------------------------------------------------------
    // 5. COMPORTAMENTO DA NAVBAR NO SCROLL
    // -------------------------------------------------------------
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.classList.add('nav-hidden');
            } else {
                navbar.classList.remove('nav-hidden');
            }
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
});
