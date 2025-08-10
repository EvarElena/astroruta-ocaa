// Respuestas correctas del examen
const correctAnswers = {
    q1: 'c', // La distancia promedio entre la Tierra y el Sol
    q2: 'c', // 3600
    q3: 'b', // Júpiter
    q4: 'b', // La distancia que recorre la luz en un año
    q5: 'b', // 60
    q6: 'b', // Mercurio
    q7: 'b', // Cuerpos rocosos que orbitan principalmente entre Marte y Júpiter
    q8: 'b', // 1 UA
    q9: 'b', // Ganímedes (Júpiter)
    q10: 'b' // 60
};

// Explicaciones de las respuestas
const explanations = {
    q1: "La unidad astronómica (UA) se define como la distancia promedio entre la Tierra y el Sol, aproximadamente 150 millones de kilómetros. Es la unidad más utilizada para medir distancias dentro del Sistema Solar.",
    q2: "Un grado se divide en 60 minutos de arco, y cada minuto de arco se divide en 60 segundos de arco. Por lo tanto: 1° = 60' = 3600\".",
    q3: "Júpiter es el planeta más grande del Sistema Solar, con un diámetro de aproximadamente 143,000 km, más de 11 veces el diámetro de la Tierra.",
    q4: "Un año luz es la distancia que recorre la luz en un año, aproximadamente 9.46 billones de kilómetros. Es una unidad de distancia, no de tiempo.",
    q5: "Un grado se divide en 60 minutos de arco: 1° = 60'.",
    q6: "Mercurio es el planeta más cercano al Sol, orbitando a una distancia promedio de 0.39 UA.",
    q7: "Los asteroides son cuerpos rocosos que orbitan principalmente en el cinturón de asteroides entre Marte y Júpiter. No son satélites de planetas ni cometas.",
    q8: "Por definición, la distancia de la Tierra al Sol es exactamente 1 UA, ya que esta unidad se basa en esta distancia.",
    q9: "Ganímedes, satélite de Júpiter, es el satélite natural más grande del Sistema Solar, con un diámetro de 5,268 km.",
    q10: "Un minuto de arco se divide en 60 segundos de arco: 1' = 60\"."
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
