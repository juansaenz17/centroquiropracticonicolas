document.addEventListener("DOMContentLoaded", () => {
    const currentUrl = window.location.pathname;

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        if (currentUrl.includes(link.getAttribute("href"))) {
            link.classList.add("active");
        }
    });
});

// Obtén el botón
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Muestra el botón cuando el usuario ha hecho scroll hacia abajo
window.onscroll = function () {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopBtn.classList.add("show");
    } else {
        scrollToTopBtn.classList.remove("show");
    }
};

// Cuando el usuario hace clic en el botón, sube a la parte superior
scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Añade desplazamiento suave
    });
});

const hamburgerBtn = document.querySelector('.hamburger-btn');
const nav = document.querySelector('.nav');
const navOverlay = document.createElement('div'); // Crear la capa de fondo

// Agregar clase y anexar al body
navOverlay.classList.add('nav-overlay');
document.body.appendChild(navOverlay);

// Agregar evento de clic al botón hamburguesa
hamburgerBtn.addEventListener('click', () => {
    // Alternar clases para el menú y el fondo
    nav.classList.toggle('active');
    hamburgerBtn.classList.toggle('active');
    navOverlay.classList.toggle('active');

    // Cambiar el atributo aria-label y title dinámicamente
    const isOpen = hamburgerBtn.classList.contains('active');
    hamburgerBtn.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    hamburgerBtn.setAttribute('title', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

// Opción para cerrar el menú al hacer clic en la capa de fondo
navOverlay.addEventListener('click', () => {
    nav.classList.remove('active');
    hamburgerBtn.classList.remove('active');
    navOverlay.classList.remove('active');

    // Restaurar los atributos aria-label y title
    hamburgerBtn.setAttribute('aria-label', 'Abrir menú');
    hamburgerBtn.setAttribute('title', 'Abrir menú');
});


// Funcionalidad de acordeón para Consultas Frecuentes
document.querySelectorAll('.pregunta-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        const pregunta = btn.parentElement; // El contenedor principal de la pregunta
        const respuesta = btn.nextElementSibling;

        // Verificar si la pregunta ya está activa
        const esActiva = pregunta.classList.contains('pregunta-activa');

        // Cerrar todas las preguntas y resetear los íconos
        document.querySelectorAll('.pregunta').forEach((p) => {
            p.classList.remove('pregunta-activa');
            p.querySelector('.respuesta').style.display = 'none';
            const icono = p.querySelector('.icono');
            icono.textContent = '+'; // Restablecer el ícono a "+"
        });

        // Si no estaba activa, activarla
        if (!esActiva) {
            pregunta.classList.add('pregunta-activa');
            respuesta.style.display = 'block';
            const icono = btn.querySelector('.icono');
            icono.textContent = '−'; // Cambiar el ícono a "−"
        }
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('searchInput');
    const preguntasContainer = document.getElementById('preguntasContainer');
    const preguntas = Array.from(preguntasContainer.getElementsByClassName('pregunta'));
    const noResultsMessage = document.getElementById('noResultsMessage'); // Mensaje de "No se encontraron resultados"
    const countElement = document.getElementById('count'); // Elemento del contador

    // Inicializar el contador al cargar la página
    const totalPreguntas = preguntas.length;
    countElement.textContent = totalPreguntas;

    // Asegurarse de ocultar el mensaje "No se encontraron resultados" inicialmente
    noResultsMessage.style.display = totalPreguntas > 0 ? 'none' : 'block';

    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase().trim(); // Limpiar y poner en minúsculas el texto de búsqueda
        let visibleCount = 0; // Contador de resultados visibles

        preguntas.forEach(pregunta => {
            const preguntaText = pregunta.querySelector('button').innerText.toLowerCase();
            const respuestaText = pregunta.querySelector('.respuesta').innerText.toLowerCase();

            // Verificamos si alguna palabra de la pregunta o la respuesta coincide con la búsqueda
            if (preguntaText.includes(query) || respuestaText.includes(query)) {
                pregunta.style.display = 'block'; // Mostrar pregunta si hay coincidencia
                visibleCount++; // Incrementar el contador
            } else {
                pregunta.style.display = 'none'; // Ocultar pregunta si no hay coincidencia
            }
        });

        // Actualizar el contador en el DOM
        countElement.textContent = visibleCount;

        // Mostrar u ocultar el mensaje de "No se encontraron resultados"
        if (visibleCount > 0) {
            noResultsMessage.style.display = 'none'; // Ocultar el mensaje si se encontraron resultados
        } else {
            noResultsMessage.style.display = 'block'; // Mostrar el mensaje si no se encontraron resultados
        }
    });
});
