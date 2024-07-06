gsap.registerPlugin(ScrollTrigger);

// Animación de aparición para cada sección
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    gsap.fromTo(section, 
        { opacity: 0, y: 50 }, 
        { 
            opacity: 1, 
            y: 0,
            scrollTrigger: {
                trigger: section,
                start: "top center+=100",
                end: "bottom center",
                scrub: true,
                markers: false
            }
        });
});

// Función para duplicar el contenido de una fila para el efecto de desplazamiento infinito
function duplicateRowContent(row) {
    const content = row.innerHTML;
    row.innerHTML += content;
}

// Duplicar el contenido de las filas
const tagRows = document.querySelectorAll('.tag-row');
tagRows.forEach(row => {
    duplicateRowContent(row);
});

// Ajuste de velocidad y dirección para cada fila
tagRows.forEach((row, index) => {
    const rowWidth = row.scrollWidth / 2; // Nueva longitud de fila duplicada
    let duration;

    // Ajustar la duración dependiendo de la fila
    if (index === 1) {
        duration = 100; // Reducir velocidad para la fila del medio
    } else {
        duration = 20 + index * 10; // Duración escalonada para cada fila
    }

    const direction = index % 2 === 0 ? -1 : 1;

    // Determinar la dirección de desplazamiento
    const initialX = direction > 0 ? -rowWidth : 0;
    const endX = direction > 0 ? 0 : -rowWidth;

    // Animación de desplazamiento infinito
    gsap.fromTo(row, {
        x: initialX,
    }, {
        x: endX,
        ease: 'none',
        duration: duration,
        repeat: -1,
        modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % rowWidth)
        }
    });
});

// Control de pausa y reanudación global de la línea de tiempo de GSAP
ScrollTrigger.create({
    trigger: '#skills',
    start: 'top bottom',
    end: 'bottom top',
    onEnter: () => gsap.globalTimeline.resume(),
    onLeave: () => gsap.globalTimeline.pause(),
    onEnterBack: () => gsap.globalTimeline.resume(),
    onLeaveBack: () => gsap.globalTimeline.pause()
});

// Contenido dinámico traducido
const content = {
    'es': {
      'intro-title': 'Hola, soy Arnau Argullós',
      'intro-description': 'Desliza hacia abajo para saber más',
      'about-title': 'Sobre Mí',
      'about-text': 'Apasionado por el desarrollo de aplicaciones con sólidas habilidades en Kotlin, Java y Python. Actualmente estoy ampliando mi competencia en Swift para el desarrollo de iOS.\n\nTambién tengo un gran interés en el diseño de interfaces de usuario, combinando funcionalidad con atractivo estético. Busco mi primera oportunidad profesional en el campo de aplicaciones híbridas y móviles, donde pueda aplicar mis habilidades técnicas y mi pasión por el diseño para ofrecer soluciones intuitivas y eficientes.',
      'skills-title': 'Habilidades',
      'projects-title': 'Proyectos',
      'contact-title': 'Contacto',
      'contact-info': 'Información de contacto...',
      'download-cv': 'Descargar CV'
    },
    'en': {
      'intro-title': 'Hello, I am Arnau Argullós',
      'intro-description': 'Scroll down to learn more',
      'about-title': 'About Me',
      'about-text': 'Passionate about app development with strong skills in Kotlin, Java, and Python. Currently expanding my proficiency in Swift for iOS development.\n\nI also have a keen interest in design, combining functionality with aesthetic appeal. Seeking my first professional opportunity to specialize in hybrid and mobile applications, aiming to deliver intuitive and efficient solutions.',
      'skills-title': 'Skills',
      'projects-title': 'Projects',
      'contact-title': 'Contact',
      'contact-info': 'Contact information...',
      'download-cv': 'Download CV'
    },
    'cat': {
      'intro-title': 'Hola, sóc Arnau Argullós',
      'intro-description': 'Desplaça cap avall per saber-ne més',
      'about-title': 'Sobre Mi',
      'about-text': 'Apassionat pel desenvolupament d\'aplicacions amb habilitats sòlides en Kotlin, Java i Python. Actualment ampliant la meva competència en Swift per al desenvolupament d\'iOS.\n\nTambé tinc un gran interès en el disseny d\'interfícies d\'usuari, combinant funcionalitat amb atractiu estètic. Cerco la meva primera oportunitat professional per especialitzar-me en aplicacions híbrides i mòbils, amb l\'objectiu d\'oferir solucions intuïtives i eficients.',
      'skills-title': 'Habilitats',
      'projects-title': 'Projectes',
      'contact-title': 'Contacte',
      'contact-info': 'Informació de contacte...',
      'download-cv': 'Baixa CV'
    }
  };
  
  
  // Función para cambiar el idioma y actualizar el contenido dinámico
  function changeLanguage(lang) {
    // Actualizar títulos y textos según el idioma seleccionado
    Object.keys(content[lang]).forEach(key => {
      const element = document.getElementById(key);
      if (element && key !== 'about-text' && key !== 'download-cv') { // Excluir 'about-text' y 'download-cv' de la animación
        eraseAndWrite(element, content[lang][key]);
      } else if (element && key === 'about-text') { // Para 'about-text', simplemente actualizar el contenido sin animación
        element.textContent = content[lang][key];
      } else if (element && key === 'download-cv') { // Actualizar texto del botón de descargar CV
        element.textContent = content[lang][key];
      }
    });
  }
  
  // Función para simular efecto de máquina de escribir y borrado
  function eraseAndWrite(element, newText) {
    if (element.id === 'about-text' || element.id === 'download-cv') {
      // Si es el elemento 'about-text' o 'download-cv', simplemente actualizar el contenido sin animación
      element.textContent = newText;
    } else {
      // Animación de escribir y borrar para otros elementos
      const speed = 100; // Velocidad de escritura en milisegundos
      const eraseSpeed = 50; // Velocidad de borrado en milisegundos
      let currentText = element.textContent.trim();
  
      let i = currentText.length - 1; // Inicia desde el final del texto actual
  
      const eraseInterval = setInterval(() => {
        const eraseText = currentText.substring(0, i);
  
        element.textContent = eraseText;
        i--;
  
        if (i < 0) {
          clearInterval(eraseInterval);
  
          let j = 0;
          const typeInterval = setInterval(() => {
            const typeText = newText.substring(0, j);
            element.textContent = typeText;
            j++;
  
            if (j > newText.length) {
              clearInterval(typeInterval);
            }
          }, speed);
        }
      }, eraseSpeed);
    }
  }
  
  // Comienza la animación de máquina de escribir al cargar la página
  document.addEventListener('DOMContentLoaded', () => {
    changeLanguage('es'); // Inicia en español por defecto
  });
  
  // Event listener para cambiar el idioma al hacer clic en los botones
  document.querySelectorAll('.language-selector button').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      changeLanguage(lang);
    });
  });
  
  // Event listener para descargar el CV
  const downloadCvBtn = document.getElementById('download-cv');
  downloadCvBtn.addEventListener('click', () => {
    const lang = document.querySelector('.language-selector .active').dataset.lang;
    // Simular descarga del CV correspondiente al idioma
    if (lang === 'es') {
      // Descargar CV en español
      window.location.href = 'docs/CAST.pdf'; // Reemplaza con la ruta de tu CV en español
    } else if (lang === 'en') {
      // Descargar CV en inglés
      window.location.href = 'path-to-english-cv.pdf'; // Reemplaza con la ruta de tu CV en inglés
    } else if (lang === 'cat') {
      // Descargar CV en catalán
      window.location.href = 'path-to-catalan-cv.pdf'; // Reemplaza con la ruta de tu CV en catalán
    }
  });
  