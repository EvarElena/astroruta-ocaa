// Respuestas correctas del examen intermedio
const correctAnswers = {
    q1: 'b', // El ángulo horizontal medido desde el norte hacia el este
    q2: 'b', // Osa Mayor
    q3: 'b', // La conservación del momento lineal
    q4: 'b', // 90 grados
    q5: 'b', // Osa Mayor
    q6: 'b', // La fuerza que expulsa los gases del motor
    q7: 'b', // Hacia el norte
    q8: 'b', // Casiopea
    q9: 'b', // La posición del centro de gravedad
    q10: 'a' // 0 grados
};

// Explicaciones de las respuestas
const explanations = {
    q1: "El azimut es el ángulo horizontal medido desde el norte hacia el este en sentido horario. Se mide en grados, donde 0° es el norte, 90° es el este, 180° es el sur y 270° es el oeste.",
    q2: "La Osa Mayor es una de las constelaciones más fáciles de identificar en el hemisferio norte. Su forma característica de 'carro' o 'cucharón' la hace muy reconocible y se utiliza como referencia para encontrar otras constelaciones.",
    q3: "La conservación del momento lineal (tercera ley de Newton) explica el movimiento de los cohetes. El cohete expulsa gases hacia atrás, lo que genera una fuerza de reacción que impulsa el cohete hacia adelante.",
    q4: "La altura máxima que puede alcanzar un objeto celeste desde el horizonte es 90 grados, que corresponde al cenit (punto directamente sobre la cabeza del observador).",
    q5: "La Osa Mayor se utiliza como referencia para encontrar la Estrella Polar. Extendiendo la línea formada por las dos estrellas del 'carro' (Dubhe y Merak) hacia el norte, se llega a la Estrella Polar.",
    q6: "El empuje es la fuerza que expulsa los gases del motor del cohete hacia atrás. Según la tercera ley de Newton, esta acción genera una reacción igual y opuesta que impulsa el cohete hacia adelante.",
    q7: "La Estrella Polar (Polaris) apunta hacia el norte geográfico desde el hemisferio norte. Es una referencia fundamental para la navegación y orientación celeste.",
    q8: "Casiopea tiene una forma característica de 'W' y es visible todo el año en el hemisferio norte. Es una constelación circumpolar que nunca se pone bajo el horizonte.",
    q9: "La posición del centro de gravedad es el factor aerodinámico más importante para la estabilidad de un cohete. Debe estar por encima del centro de presión para que el cohete sea estable en vuelo.",
    q10: "Cuando un objeto celeste está exactamente al norte, su azimut es 0 grados. El azimut se mide desde el norte (0°) hacia el este en sentido horario."
};

// Variables globales
let userAnswers = {};
let examCompleted = false;

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeExam();
});

function initializeExam() {
    // Agregar event listeners para las opciones
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const questionId = this.name;
            const selectedValue = this.value;
            
            // Guardar respuesta del usuario
            userAnswers[questionId] = selectedValue;
            
            // Mostrar retroalimentación inmediata
            showImmediateFeedback(questionId, selectedValue);
        });
    });

    // Event listener para el botón de enviar
    document.getElementById('submitExam').addEventListener('click', function(e) {
        e.preventDefault();
        submitExam();
    });

    // Event listener para el botón de reiniciar
    document.getElementById('resetExam').addEventListener('click', function() {
        resetExam();
    });

    // Event listener para repetir examen
    document.getElementById('retakeExam').addEventListener('click', function() {
        retakeExam();
    });
}

function showImmediateFeedback(questionId, selectedValue) {
    const feedbackDiv = document.getElementById(`feedback${questionId.slice(1)}`);
    const isCorrect = selectedValue === correctAnswers[questionId];
    
    // Limpiar feedback anterior
    feedbackDiv.innerHTML = '';
    
    // Crear elemento de feedback
    const feedbackElement = document.createElement('div');
    feedbackElement.className = `feedback-message ${isCorrect ? 'correct' : 'incorrect'}`;
    
    const icon = isCorrect ? 'fas fa-check-circle' : 'fas fa-times-circle';
    const message = isCorrect ? '¡Correcto!' : 'Incorrecto';
    
    feedbackElement.innerHTML = `
        <i class="${icon}"></i>
        <span class="feedback-text">${message}</span>
        <div class="explanation">${explanations[questionId]}</div>
    `;
    
    feedbackDiv.appendChild(feedbackElement);
    
    // Agregar clase para animación
    setTimeout(() => {
        feedbackElement.classList.add('show');
    }, 10);
}

function submitExam() {
    // Verificar que todas las preguntas estén respondidas
    const totalQuestions = Object.keys(correctAnswers).length;
    const answeredQuestions = Object.keys(userAnswers).length;
    
    if (answeredQuestions < totalQuestions) {
        showNotification(`Faltan ${totalQuestions - answeredQuestions} pregunta(s) por responder.`, 'warning');
        return;
    }
    
    // Calcular puntuación
    const score = calculateScore();
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // Mostrar resultados
    showResults(score, percentage);
    
    // Marcar examen como completado
    examCompleted = true;
}

function calculateScore() {
    let score = 0;
    Object.keys(correctAnswers).forEach(questionId => {
        if (userAnswers[questionId] === correctAnswers[questionId]) {
            score++;
        }
    });
    return score;
}

function showResults(score, percentage) {
    // Ocultar formulario
    document.getElementById('examForm').style.display = 'none';
    
    // Mostrar sección de resultados
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.style.display = 'block';
    
    // Actualizar puntuación
    document.getElementById('scoreNumber').textContent = score;
    document.getElementById('scorePercentage').textContent = `${percentage}%`;
    
    // Generar desglose de respuestas
    generateAnswersReview();
    
    // Scroll suave a los resultados
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function generateAnswersReview() {
    const answersReview = document.getElementById('answersReview');
    answersReview.innerHTML = '';
    
    Object.keys(correctAnswers).forEach(questionId => {
        const questionNumber = questionId.slice(1);
        const userAnswer = userAnswers[questionId];
        const correctAnswer = correctAnswers[questionId];
        const isCorrect = userAnswer === correctAnswer;
        
        const reviewItem = document.createElement('div');
        reviewItem.className = `review-item ${isCorrect ? 'correct' : 'incorrect'}`;
        
        const icon = isCorrect ? 'fas fa-check' : 'fas fa-times';
        const status = isCorrect ? 'Correcta' : 'Incorrecta';
        
        reviewItem.innerHTML = `
            <div class="review-header">
                <i class="${icon}"></i>
                <span class="review-question">Pregunta ${questionNumber}</span>
                <span class="review-status">${status}</span>
            </div>
            <div class="review-details">
                <p><strong>Tu respuesta:</strong> ${getOptionText(questionId, userAnswer)}</p>
                ${!isCorrect ? `<p><strong>Respuesta correcta:</strong> ${getOptionText(questionId, correctAnswer)}</p>` : ''}
                <p class="review-explanation">${explanations[questionId]}</p>
            </div>
        `;
        
        answersReview.appendChild(reviewItem);
    });
}

function getOptionText(questionId, option) {
    const questionCard = document.getElementById(`question${questionId.slice(1)}`);
    const optionElement = questionCard.querySelector(`input[value="${option}"]`);
    if (optionElement) {
        return optionElement.nextElementSibling.textContent;
    }
    return '';
}

function resetExam() {
    if (confirm('¿Estás seguro de que quieres reiniciar el examen? Se perderán todas tus respuestas.')) {
        // Limpiar respuestas
        userAnswers = {};
        
        // Desmarcar todas las opciones
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });
        
        // Limpiar feedback
        document.querySelectorAll('.feedback').forEach(feedback => {
            feedback.innerHTML = '';
        });
        
        // Mostrar formulario y ocultar resultados
        document.getElementById('examForm').style.display = 'block';
        document.getElementById('resultsSection').style.display = 'none';
        
        // Scroll al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        examCompleted = false;
    }
}

function retakeExam() {
    resetExam();
}

// Función de notificación (reutilizada del script principal)
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Agregar al body
    document.body.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Prevenir envío del formulario con Enter
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.type === 'radio') {
        e.preventDefault();
    }
});
