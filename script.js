/* ==========================================================================
   EXCLUSIVE CHEVROLET WEDDING CAR RENTAL - INTERACTIVE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. Navbar Scroll State & Active Links Highlight
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky class
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        // Active link highlighting
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id') || '';
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // 3. Gallery Category Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 4. Gallery Lightbox Modal
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.gallery-img');
            const caption = item.querySelector('.gallery-caption')?.textContent || '';
            
            if (lightbox && lightboxImg && img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt || 'Chevrolet Hochzeitsoldtimer';
                if (lightboxCaption) lightboxCaption.textContent = caption;
                lightbox.classList.add('active');
            }
        });
    });

    lightboxClose?.addEventListener('click', () => {
        lightbox?.classList.remove('active');
    });

    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // 5. Booking Form Submission Simulation
    const bookingForm = document.getElementById('bookingForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Form data retrieval
            const name = document.getElementById('name')?.value;
            const date = document.getElementById('weddingDate')?.value;

            // Show interactive success modal
            if (successModal) {
                const modalText = successModal.querySelector('.modal-text');
                if (modalText && name && date) {
                    modalText.innerHTML = `Vielen Dank, <strong>${name}</strong>! Ihre Terminverfügbarkeit für den <strong>${date}</strong> wird umgehend geprüft. Wir melden uns innerhalb von 24 Stunden persönlich bei Ihnen.`;
                }
                successModal.classList.add('active');
            }

            bookingForm.reset();
        });
    }

    closeModalBtn?.addEventListener('click', () => {
        successModal?.classList.remove('active');
    });

    successModal?.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('active');
        }
    });
});
