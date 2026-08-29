// ==========================================================================
// LÓGICA PRINCIPAL DE LA PÁGINA
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {

    // ======================================================================
    // 1. SISTEMA DE IDIOMAS
    // ======================================================================

    const btnEs = document.getElementById("btn-es");
    const btnFr = document.getElementById("btn-fr");

    let currentLang = "es";

    function changeLanguage(lang) {

        if (!translations[lang]) {
            return;
        }

        currentLang = lang;

        // Actualizar botones
        btnEs.classList.toggle("active", lang === "es");
        btnFr.classList.toggle("active", lang === "fr");

        // Traducir textos
        const elements = document.querySelectorAll("[data-i18n]");

        elements.forEach((element) => {
            const key = element.getAttribute("data-i18n");

            if (translations[lang][key] !== undefined) {
                element.textContent = translations[lang][key];
            }
        });

        // Traducir placeholders
        const placeholders = document.querySelectorAll(
            "[data-i18n-placeholder]"
        );

        placeholders.forEach((element) => {
            const key = element.getAttribute("data-i18n-placeholder");

            if (translations[lang][key] !== undefined) {
                element.placeholder = translations[lang][key];
            }
        });

        // Actualizar idioma del documento
        document.documentElement.lang = lang;
    }

    // Botones de idioma
    btnEs.addEventListener("click", (event) => {
        event.stopPropagation();
        changeLanguage("es");
    });

    btnFr.addEventListener("click", (event) => {
        event.stopPropagation();
        changeLanguage("fr");
    });

    // Idioma inicial
    changeLanguage("es");


    // ======================================================================
    // 2. CUENTA ATRÁS
    // ======================================================================

    const weddingDate = new Date(
        2026,
        11,
        24,
        11,
        30,
        0
    ).getTime();

    function updateCountdown() {

        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {

            document.getElementById("countdown").innerHTML =
                "<div class='time-box'>" +
                "<span class='number'>¡Llegó el día!</span>" +
                "</div>";

            return;
        }

        const days = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const seconds = Math.floor(
            (distance % (1000 * 60)) /
            1000
        );

        document.getElementById("days").textContent =
            days < 10 ? "0" + days : days;

        document.getElementById("hours").textContent =
            hours < 10 ? "0" + hours : hours;

        document.getElementById("minutes").textContent =
            minutes < 10 ? "0" + minutes : minutes;

        document.getElementById("seconds").textContent =
            seconds < 10 ? "0" + seconds : seconds;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);


    // ======================================================================
    // 3. FORMULARIO RSVP
    // ======================================================================

    const rsvpForm = document.getElementById("rsvp-form");
    const formMessage = document.getElementById("form-message");
    const submitBtn = rsvpForm.querySelector(".btn-submit");

    rsvpForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        formMessage.className = "form-message hidden";

        const nameInput = document.getElementById("name");
        const attendanceInput = document.getElementById("attendance");
        const guestsInput = document.getElementById("guests");
        const commentInput = document.getElementById("comment");

        const isAttending = attendanceInput.value === "yes";

        let numGuests = 0;

        if (isAttending) {

            const parsed = parseInt(
                guestsInput.value,
                10
            );

            numGuests =
                !isNaN(parsed) && parsed > 0
                    ? parsed
                    : 1;
        }

        const payload = {

            nombre: nameInput.value.trim(),

            asistencia: isAttending
                ? "si"
                : "no",

            personas: numGuests,

            comentario: commentInput.value.trim(),

            idioma: currentLang
        };

        const originalBtnText = submitBtn.innerText;

        submitBtn.disabled = true;

        submitBtn.innerText =
            translations[currentLang].form_loading ||
            "Enviando...";

        try {

            if (
                !weddingConfig ||
                !weddingConfig.rsvpEndpoint ||
                weddingConfig.rsvpEndpoint.trim() === ""
            ) {
                throw new Error(
                    "Endpoint no configurado"
                );
            }

            const response = await fetch(
                weddingConfig.rsvpEndpoint,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body: JSON.stringify(payload)
                }
            );

            if (!response.ok) {
                throw new Error(
                    `HTTP error! status: ${response.status}`
                );
            }

            const data = await response.json();

            if (data && data.success === true) {

                const successMsg =
                    isAttending
                        ? translations[currentLang]
                            .form_success_yes
                        : translations[currentLang]
                            .form_success_no;

                formMessage.innerText =
                    successMsg;

                formMessage.className =
                    "form-message success";

                rsvpForm.reset();

            } else {

                throw new Error(
                    "El endpoint no confirmó el guardado"
                );
            }

        } catch (error) {

            console.error(
                "Error en RSVP:",
                error
            );

            formMessage.innerText =
                translations[currentLang]
                    .form_error_msg;

            formMessage.className =
                "form-message error";

        } finally {

            submitBtn.disabled = false;

            submitBtn.innerText =
                translations[currentLang]
                    .form_submit ||
                originalBtnText;
        }
    });


    // ======================================================================
    // 4. MÚSICA DE LA BODA
    // ======================================================================

    const music =
        document.getElementById("wedding-music");

    const musicToggle =
        document.getElementById("music-toggle");


    // ----------------------------------------------------------------------
    // Actualizar visualmente el botón
    // ----------------------------------------------------------------------

    function updateMusicButton() {

        if (music.paused) {

            musicToggle.textContent = "🎵";

            musicToggle.setAttribute(
                "aria-label",
                "Activar música"
            );

        } else {

            musicToggle.textContent = "🔊";

            musicToggle.setAttribute(
                "aria-label",
                "Pausar música"
            );
        }
    }


    // ----------------------------------------------------------------------
    // Reproducir música
    // ----------------------------------------------------------------------

    function playMusic() {

        const promise = music.play();

        if (promise !== undefined) {

            promise
                .then(() => {
                    updateMusicButton();
                })
                .catch((error) => {

                    console.log(
                        "Autoplay bloqueado por el navegador:",
                        error
                    );

                    updateMusicButton();
                });

        } else {

            updateMusicButton();
        }
    }


    // ----------------------------------------------------------------------
    // Intentar autoplay al abrir
    // ----------------------------------------------------------------------

    playMusic();


    // ----------------------------------------------------------------------
    // Primer toque/clic en la página
    // ----------------------------------------------------------------------

    function firstInteraction() {

        if (music.paused) {
            playMusic();
        }

        document.removeEventListener(
            "pointerdown",
            firstInteraction
        );
    }

    document.addEventListener(
        "pointerdown",
        firstInteraction
    );


    // ----------------------------------------------------------------------
    // Botón de música
    // ----------------------------------------------------------------------

    musicToggle.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            if (music.paused) {

                playMusic();

            } else {

                music.pause();

                updateMusicButton();
            }
        }
    );


    // ----------------------------------------------------------------------
    // Si el navegador cambia el estado del audio
    // ----------------------------------------------------------------------

    music.addEventListener(
        "play",
        updateMusicButton
    );

    music.addEventListener(
        "pause",
        updateMusicButton
    );

    music.addEventListener(
        "ended",
        updateMusicButton
    );

    updateMusicButton();

});
