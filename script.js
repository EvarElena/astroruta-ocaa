// Navegación móvil
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navegación suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar efecto de aparición a elementos
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.resource-card, .practice-card, .profile-card, .section-header');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Efecto parallax para elementos espaciales
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.planet, .star');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Animación de escritura para el título
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar animación de escritura al título cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    const titleElement = document.querySelector('.hero-title .gradient-text');
    if (titleElement) {
        const originalText = titleElement.textContent;
        setTimeout(() => {
            typeWriter(titleElement, originalText, 150);
        }, 500);
    }
});

// Efecto de hover para las tarjetas de recursos
document.querySelectorAll('.resource-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Efecto de hover para las tarjetas de práctica
document.querySelectorAll('.practice-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Contador animado para estadísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Aplicar contadores animados cuando las estadísticas sean visibles
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statElement = entry.target;
            const targetValue = parseInt(statElement.textContent);
            animateCounter(statElement, targetValue);
            statsObserver.unobserve(statElement);
        }
    });
}, { threshold: 0.5 });

// Observar elementos de estadísticas
document.querySelectorAll('.practice-stats span:first-child').forEach(stat => {
    statsObserver.observe(stat);
});

// Efecto de partículas espaciales
function createStar() {
    const star = document.createElement('div');
    star.className = 'floating-star';
    star.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: white;
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        left: ${Math.random() * 100}vw;
        top: -10px;
        animation: float-down 8s linear infinite;
    `;
    
    document.body.appendChild(star);
    
    setTimeout(() => {
        star.remove();
    }, 8000);
}

// Crear estrellas flotantes periódicamente
setInterval(createStar, 3000);

// Agregar estilos CSS para las estrellas flotantes
const style = document.createElement('style');
style.textContent = `
    @keyframes float-down {
        0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Efecto de carga de página
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--space-blue);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        border-left: 4px solid var(--space-yellow);
        box-shadow: var(--shadow-medium);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Agregar funcionalidad a los botones de práctica
document.querySelectorAll('.btn-practice').forEach(button => {
    button.addEventListener('click', (e) => {
        // Permitir navegación al examen inicial e intermedio
        if (button.getAttribute('href') === 'examen-inicial.html' || 
            button.getAttribute('href') === 'examen-intermedio.html') {
            return; // No prevenir la navegación
        }
        
        e.preventDefault();
        showNotification('¡Práctica en desarrollo! Pronto estará disponible.', 'info');
    });
});

// Agregar funcionalidad a los enlaces de recursos (excepto Sistema Solar y Guía de Observación)
document.querySelectorAll('.resource-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Permitir navegación al Sistema Solar, Guía de Observación, Cohetes Caseros y Conocimientos Básicos
        if (link.getAttribute('href') === 'sistema-solar.html' || 
            link.getAttribute('href') === 'guia-observacion.html' ||
            link.getAttribute('href') === 'cohetes-caseros.html' ||
            link.getAttribute('href') === 'conocimientos-basicos.html') {
            return; // No prevenir la navegación
        }
        
        e.preventDefault();
        showNotification('Recurso en desarrollo. ¡Pronto estará disponible!', 'info');
    });
});

// Efecto de scroll suave para el header
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScrollTop && currentScroll > 100) {
        // Scroll hacia abajo
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scroll hacia arriba
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = currentScroll;
});

// Agregar transición al header
document.querySelector('.header').style.transition = 'transform 0.3s ease';

    // Funcionalidad para mostrar/ocultar recursos del temario
    document.addEventListener('DOMContentLoaded', () => {
        const showResourcesBtn = document.getElementById('showResources');
        const resourcesGrid = document.getElementById('resourcesGrid');
        
        if (showResourcesBtn && resourcesGrid) {
            showResourcesBtn.addEventListener('click', () => {
                const isVisible = resourcesGrid.style.display !== 'none';
                
                if (isVisible) {
                    // Ocultar recursos
                    resourcesGrid.classList.remove('show');
                    setTimeout(() => {
                        resourcesGrid.style.display = 'none';
                    }, 600);
                    showResourcesBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Ver Recursos del Temario';
                    showResourcesBtn.classList.remove('active');
                } else {
                    // Mostrar recursos
                    resourcesGrid.style.display = 'grid';
                    setTimeout(() => {
                        resourcesGrid.classList.add('show');
                    }, 50);
                    showResourcesBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Ocultar Recursos';
                    showResourcesBtn.classList.add('active');
                }
            });
        }
        
        // Funcionalidad para mostrar/ocultar exámenes de práctica
        const showExamsBtn = document.getElementById('showExams');
        const examsGrid = document.getElementById('examsGrid');
        
        if (showExamsBtn && examsGrid) {
            showExamsBtn.addEventListener('click', () => {
                const isVisible = examsGrid.style.display !== 'none';
                
                if (isVisible) {
                    // Ocultar exámenes
                    examsGrid.classList.remove('show');
                    setTimeout(() => {
                        examsGrid.style.display = 'none';
                    }, 600);
                    showExamsBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Ver Exámenes de Práctica';
                    showExamsBtn.classList.remove('active');
                } else {
                    // Mostrar exámenes
                    examsGrid.style.display = 'grid';
                    setTimeout(() => {
                        examsGrid.classList.add('show');
                    }, 50);
                    showExamsBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Ocultar Exámenes de Práctica';
                    showExamsBtn.classList.add('active');
                }
            });
        }
    
    // Funcionalidad para la página del Sistema Solar
    const saveFindingsBtn = document.getElementById('saveFindings');
    const downloadTemplateBtn = document.getElementById('downloadTemplate');
    const clearFormBtn = document.getElementById('clearForm');
    
    if (saveFindingsBtn) {
        saveFindingsBtn.addEventListener('click', () => {
            const findings = {
                interestingObject: document.getElementById('interesting-object')?.value || '',
                curiousFact: document.getElementById('curious-fact')?.value || '',
                planetFavorite: document.getElementById('planet-favorite')?.value || '',
                questions: document.getElementById('questions')?.value || ''
            };
            
            // Guardar en localStorage
            localStorage.setItem('solarSystemFindings', JSON.stringify(findings));
            
            // Mostrar notificación
            showNotification('¡Registro guardado exitosamente!', 'success');
        });
    }
    
    if (downloadTemplateBtn) {
        downloadTemplateBtn.addEventListener('click', () => {
            const template = `
Registro de Hallazgos - Sistema Solar
Fecha: ${new Date().toLocaleDateString()}

1. Objeto más interesante que encontré:
_________________________________

2. Dato curioso que aprendí:
_________________________________

3. Mi planeta favorito es:
_________________________________

4. Preguntas que me surgieron:
_________________________________

Consejos para la exploración:
• Observa con atención los detalles de cada planeta
• Compara tamaños, colores y características
• Presta atención a las lunas y anillos
• Investiga sobre las misiones espaciales
• Anota cualquier dato que te sorprenda
            `;
            
            const blob = new Blob([template], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'registro-sistema-solar.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            showNotification('Plantilla descargada exitosamente', 'info');
        });
    }
    
    if (clearFormBtn) {
        clearFormBtn.addEventListener('click', () => {
            const inputs = document.querySelectorAll('#interesting-object, #curious-fact, #planet-favorite, #questions');
            inputs.forEach(input => {
                input.value = '';
            });
            
            showNotification('Formulario limpiado', 'info');
        });
    }
    
    // Cargar datos guardados al cargar la página
    const savedFindings = localStorage.getItem('solarSystemFindings');
    if (savedFindings) {
        const findings = JSON.parse(savedFindings);
        if (document.getElementById('interesting-object')) {
            document.getElementById('interesting-object').value = findings.interestingObject || '';
            document.getElementById('curious-fact').value = findings.curiousFact || '';
            document.getElementById('planet-favorite').value = findings.planetFavorite || '';
            document.getElementById('questions').value = findings.questions || '';
        }
    }
    
    // Funcionalidad para la página de Guía de Observación
    const previewGuideBtn = document.getElementById('previewGuide');
    
    if (previewGuideBtn) {
        previewGuideBtn.addEventListener('click', () => {
            // Abrir el PDF en una nueva pestaña para vista previa y descarga
            window.open('Guia/GuiaObservacion.pdf', '_blank');
            showNotification('PDF abierto en nueva pestaña. Puedes descargarlo desde el navegador.', 'success');
        });
    }
    
    // Funcionalidad para el Juego de Memoria
    const previewMemoryBtn = document.getElementById('previewMemory');
    
    if (previewMemoryBtn) {
        previewMemoryBtn.addEventListener('click', () => {
            // Abrir el PDF del juego de memoria en una nueva pestaña para vista previa y descarga
            window.open('Guia/JuegoMemoria.pdf', '_blank');
            showNotification('Juego de memoria abierto en nueva pestaña. Puedes descargarlo desde el navegador.', 'success');
        });
    }
    
    // Funcionalidad para la página de Cohetes Caseros
    const infographicImage = document.querySelector('.infographic-image');
    
    if (infographicImage) {
        infographicImage.addEventListener('click', () => {
            showNotification('Infografía en desarrollo. Pronto estará disponible para visualización completa.', 'info');
        });
    }
});
