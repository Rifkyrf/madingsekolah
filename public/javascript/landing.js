document.addEventListener("DOMContentLoaded", function () {
    // Ambil elemen navbar, body, dan collapse
    const navbar = document.querySelector('.navbar');
    const navbarCollapse = document.getElementById('navbarNav');
    const body = document.body;

    // Dropdown submenu functionality
    document.querySelectorAll('.dropdown-submenu a.dropdown-toggle').forEach(function (element) {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const submenu = this.nextElementSibling;
            if (submenu) {
                submenu.classList.toggle('show');
            }
        });
    });

    // Close all submenus when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown-submenu')) {
            document.querySelectorAll('.dropdown-submenu .dropdown-menu').forEach(function (menu) {
                menu.classList.remove('show');
            });
        }
    });

    // Animasi awal (seperti sebelumnya)
    const heroElements = document.querySelectorAll('.hero-title, .hero-description, .hero-stats');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 + index * 200);
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(-20px)';
        btn.style.transition = 'all 0.5s ease';
        setTimeout(() => {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, 100 + index * 150);
    });

    const cards = document.querySelectorAll('.work-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, 100 + index * 120);
    });

    // Animasi footer
    const footer = document.querySelector('.footer');
    if (footer) {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                footer.classList.add('visible');
            }
        }, { threshold: 0.1 });
        observer.observe(footer);
    }

    // --- SOLUSI UNTUK HAMBURGER MENU ---
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            // Cek apakah menu sedang terbuka atau tertutup
            if (navbarCollapse.classList.contains('show')) {
                // Jika sedang ditutup, kembalikan padding body ke normal
                setTimeout(() => {
                     body.style.paddingTop = `${getComputedStyle(navbar).height}`;
                }, 300); // Delay sebentar agar transisi collapse selesai
            } else {
                // Jika akan dibuka, sesuaikan padding body dengan tinggi navbar + tinggi menu
                const navbarHeight = navbar.offsetHeight;
                const menuHeight = navbarCollapse.scrollHeight; // Ambil tinggi konten menu
                body.style.paddingTop = `${navbarHeight + menuHeight}px`;
            }
        });
    }

    // Juga atur ulang padding jika ukuran layar berubah (misalnya rotasi hp)
    window.addEventListener('resize', function() {
        if (navbarCollapse && !navbarCollapse.classList.contains('show')) {
             // Jika menu tertutup saat resize, pastikan padding hanya tinggi navbar
             body.style.paddingTop = `${getComputedStyle(navbar).height}`;
        } else if (navbarCollapse) {
             // Jika menu terbuka saat resize, sesuaikan padding
             const navbarHeight = navbar.offsetHeight;
             const menuHeight = navbarCollapse.scrollHeight;
             body.style.paddingTop = `${navbarHeight + menuHeight}px`;
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.getElementById('mainNavbar');

    // Fungsi untuk mengubah warna navbar saat scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Cek posisi scroll saat halaman direfresh
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }
});



document.addEventListener('DOMContentLoaded', function () {
    const eventModal = document.getElementById('eventDetailModal');
    if (eventModal) {
        eventModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget; // Tombol yang diklik

            // Ambil data dari atribut tombol
            const title = button.getAttribute('data-title');
            const description = button.getAttribute('data-description');
            const date = button.getAttribute('data-date');
            const creator = button.getAttribute('data-creator');
            const image = button.getAttribute('data-image');
            const status = button.getAttribute('data-status');
            const badgeClass = button.getAttribute('data-badge');

            // Isi modal dengan data tersebut
            eventModal.querySelector('#modal-event-title').innerText = title;
            eventModal.querySelector('#modal-event-description').innerText = description;
            eventModal.querySelector('#modal-event-date').innerText = date;
            eventModal.querySelector('#modal-event-creator').innerText = creator;
            eventModal.querySelector('#modal-event-image').src = image;

            // Set badge
            const badge = eventModal.querySelector('#modal-event-badge');
            badge.innerText = status;
            badge.className = 'badge mb-3 px-3 py-2 shadow-sm ' + badgeClass;
        });
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const workModal = document.getElementById('workModal');
    const modalBody = document.getElementById('modalWorkBody');

    if (workModal) {
        workModal.addEventListener('show.bs.modal', function (event) {
            // 1. Ambil tombol yang diklik
            const button = event.relatedTarget;
            // 2. Ambil ID karya
            const workId = button.getAttribute('data-work-id');

            // 3. Tampilkan loading spinner
            modalBody.innerHTML = `
                <div class="text-center py-5">
                    <div class="spinner-border text-primary" role="status"></div>
                </div>`;

            // 4. Ambil konten dari Route Laravel yang tadi kita buat
            fetch(`/works/${workId}/modal`)
                .then(response => {
                    if (!response.ok) throw new Error('Gagal mengambil data');
                    return response.text();
                })
                .then(html => {
                    // 5. Masukkan HTML (file _modal_content.blade.php) ke dalam modal
                    modalBody.innerHTML = html;
                })
                .catch(error => {
                    modalBody.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
                });
        });
    }
});