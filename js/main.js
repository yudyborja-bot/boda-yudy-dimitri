// ==========================================================================
// LÓGICA PRINCIPAL DE LA PÁGINA
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. SISTEMA DE IDIOMAS ---
    
    const btnEs = document.getElementById('btn-es');
    const btnFr = document.getElementById('btn-fr');
    let currentLang = 'es'; // Idioma por defecto

    function changeLanguage(lang) {
        currentLang = lang;
        
        // Actualizar botones visualmente
        if (lang === 'es') {
            btnEs.classList.add('active');
            btnFr.classList.remove('active');
        } else {
            btnFr.classList.add('active');
            btnEs.classList.remove('active');
        }

        // Buscar todos los elementos que tienen el atributo data-i18n
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });

        // Cambiar también los placeholders (textos fantasma de los inputs)
        const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });
    }

    // Escuchar clics en los botones de idioma
    btnEs.addEventListener('click', () => changeLanguage('es'));
    btnFr.addEventListener('click', () => changeLanguage('fr'));

    // Inicializar idioma por defecto al cargar
    changeLanguage(currentLang);

    // --- 2. CUENTA ATRÁS ---
    
    // Fecha de la boda: Año, Mes (0-11, así que 11 es diciembre), Día, Hora, Minutos
    // 24 Dic 2026, 11:30
    const weddingDate = new Date(2026, 11, 24, 11, 30, 0).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            // Si la fecha ya pasó
            document.getElementById("countdown").innerHTML = "<div class='time-box'><span class='number'>¡Llegó el día!</span></div>";
            return;
        }

        // Cálculos matemáticos de tiempo
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Actualizar el HTML añadiendo un cero delante si es menor a 10
        document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
    }

    // Actualizar cada segundo
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Llamada inicial


    // --- 3. FORMULARIO RSVP (CONEXIÓN Y GESTIÓN DE RESPUESTAS) ---
    
    const rsvpForm = document.getElementById('rsvp-form');
    const formMessage = document.getElementById('form-message');
    const submitBtn = rsvpForm.querySelector('.btn-submit');

    rsvpForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Ocultar mensajes previos
        formMessage.className = 'form-message hidden';
        
        // Recoger y formatear datos según los requisitos exactos
        const nameInput = document.getElementById('name');
        const attendanceInput = document.getElementById('attendance');
        const guestsInput = document.getElementById('guests');
        const commentInput = document.getElementById('comment');

        const isAttending = attendanceInput.value === 'yes';
        let numGuests = 0;
        if (isAttending) {
            const parsed = parseInt(guestsInput.value, 10);
            numGuests = (!isNaN(parsed) && parsed > 0) ? parsed : 1;
        }

        const payload = {
            nombre: nameInput.value.trim(),
            asistencia: isAttending ? "si" : "no",
            personas: numGuests,
            comentario: commentInput.value.trim(),
            idioma: currentLang.toLowerCase()
        };

        // Estado de carga visual en el botón
        const originalBtnText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = translations[currentLang].form_loading || "Enviando...";

        try {
            if (!weddingConfig || !weddingConfig.rsvpEndpoint || weddingConfig.rsvpEndpoint.trim() === '') {
                throw new Error("Endpoint no configurado en weddingConfig");
            }

            // Enviar petición POST con JSON como text/plain para compatibilidad CORS con Google Apps Script
            const response = await fetch(weddingConfig.rsvpEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Solo mostrar éxito si la respuesta devuelve explícitamente { "success": true }
            if (data && data.success === true) {
                const successMsg = isAttending
                    ? translations[currentLang].form_success_yes
                    : translations[currentLang].form_success_no;
                formMessage.innerText = successMsg;
                formMessage.className = 'form-message success';
                rsvpForm.reset();
            } else {
                throw new Error("El endpoint no confirmó el guardado ({ success: true })");
            }
        } catch (error) {
            console.error("Error en la conexión con el RSVP:", error);
            formMessage.innerText = translations[currentLang].form_error_msg;
            formMessage.className = 'form-message error';
        } finally {
            // Restaurar botón para permitir volver a intentarlo si hubo error
            submitBtn.disabled = false;
            submitBtn.innerText = translations[currentLang].form_submit || originalBtnText;
        }
    });
// --- 4. MÚSICA DE LA BODA ---

    const music = document.getElementById('wedding-music');
    const musicToggle = document.getElementById('music-toggle');

    musicToggle.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            musicToggle.innerText = '🔊';
            musicToggle.setAttribute('aria-label', 'Pausar música');
        } else {
            music.pause();
            musicToggle.innerText = '🎵';
            musicToggle.setAttribute('aria-label', 'Activar música');
        }
    });
});
