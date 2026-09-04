// ==========================================================================
// CONFIGURACIÓN Y DICCIONARIO DE IDIOMAS
// Aquí puedes modificar los textos y la configuración del RSVP fácilmente.
// ==========================================================================

const weddingConfig = {
    // Endpoint de Google Apps Script conectado a Google Sheets
    rsvpEndpoint: "https://script.google.com/macros/s/AKfycbwc_LuMPaYSyOf798PnYaLNOtwdrOt-xbKOuj1bzI-FcNjTCg8Eh2oDtcCJKO6CWt3GXA/exec"
};

const translations = {
    // TEXTOS EN ESPAÑOL
    es: {
        date_hero: "24 de diciembre de 2026",
        
        countdown_title: "Faltan",
        days: "Días",
        hours: "Horas",
        minutes: "Minutos",
        seconds: "Segundos",
        
        ceremony_title: "Ceremonia Civil",
        open_maps: "Ver en Google Maps",
        
        gallery_title: "Algunos momentos juntos",
        
        hero_quote: "Algunas historias no necesitan explicación, solo celebración.",

        intro_title: "Dos mundos, una misma promesa",
intro_greeting: "Querida familia, queridos amigos,",
intro_paragraph_1: "Hay momentos en la vida que cobran su verdadero significado cuando los compartimos con las personas que más queremos.",
intro_paragraph_2: "Cruzar continentes y unir nuestras raíces es el inicio de nuestra mayor aventura juntos.",
intro_paragraph_3: "Esperamos de todo corazón contar con su compañía y bendición en este día tan íntimo y especial.",

        rsvp_title: "Confirmar Asistencia",
        rsvp_text: "Nos encantaría compartir este momento tan especial con ustedes. Por favor, confírmanos tu asistencia aquí abajo antes del 1 de noviembre.",
        form_name: "Nombre y apellidos",
        form_attendance: "¿Asistirás a la ceremonia?",
        form_select_option: "Selecciona una opción",
        form_yes: "Sí, asistiré",
        form_no: "No podré asistir",
        form_guests: "Número de personas que asistirán",
        form_comment: "Comentario (opcional)",
        form_comment_placeholder: "Escribe tu comentario aquí...",
        form_submit: "Enviar confirmación",
        form_loading: "Enviando confirmación...",
        form_success_yes: "¡Gracias por confirmar! Nos hace mucha ilusión compartir este momento con ustedes. ☺️",
        form_success_no: "¡Gracias por avisarnos! Agradecemos mucho que nos hayas respondido y esperamos poder compartir muchos momentos más adelante. ☺️",
        form_error_msg: "Hubo un problema al enviar la confirmación. Por favor, inténtalo de nuevo."
    },
    
    // TEXTOS EN FRANCÉS
    fr: {
        date_hero: "24 décembre 2026",
        
        countdown_title: "Il reste",
        days: "Jours",
        hours: "Heures",
        minutes: "Minutes",
        seconds: "Secondes",
        
        ceremony_title: "Cérémonie Civile",
        open_maps: "Ouvrir dans Google Maps",
        
        gallery_title: "Quelques moments ensemble",
        
        hero_quote: "Certaines histoires n’ont pas besoin d’explication, seulement d’être célébrées.",

        intro_title: "Deux mondes, une même promesse",
intro_greeting: "Chère famille, chers amis,",
intro_paragraph_1: "Il est des moments précieux qui ne prennent tout leur sens que lorsqu’ils sont partagés avec ceux que nous chérissons.",
intro_paragraph_2: "Entrelacer nos deux cultures et nos histoires est le début de notre plus beau voyage.",
intro_paragraph_3: "Nous espérons de tout cœur célébrer ce jour si intime et cher à nos yeux à vos côtés.",

        rsvp_title: "Confirmation de présence",
        rsvp_text: "Nous serions très heureux de partager ce moment si spécial avec vous. Merci de nous confirmer votre présence juste ici avant le 1er novembre.",
        form_name: "Nom et prénom",
        form_attendance: "Serez-vous présent(e) à la cérémonie ?",
        form_select_option: "Choisissez une option",
        form_yes: "Oui, je serai présent(e)",
        form_no: "Non, je ne pourrai pas être présent(e)",
        form_guests: "Nombre de personnes présentes",
        form_comment: "Commentaire (facultatif)",
        form_comment_placeholder: "Votre message ici...",
        form_submit: "Envoyer",
        form_loading: "Envoi en cours...",
        form_success_yes: "Merci pour votre confirmation ! Nous sommes très heureux de partager ce moment avec vous. ☺️",
        form_success_no: "Merci de nous avoir prévenus ! Nous vous remercions pour votre réponse et espérons partager de beaux moments avec vous plus tard. ☺️",
        form_error_msg: "Une erreur est survenue lors de l'envoi. Veuillez réessayer."
    }
};
