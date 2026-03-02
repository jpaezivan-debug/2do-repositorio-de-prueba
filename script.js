// ===== CONTADOR DE PUNTOS DEL TRUCO CON LÍMITE DE 30 Y BOTONES DESHABILITADOS =====
let puntosNosotros = 0;
let puntosEllos = 0;
let puntajeMaximo = 30;  // Fijo en 30 puntos
let juegoTerminado = false;

// Función para habilitar/deshabilitar todos los botones de puntos
function setBotonesEstado(habilitado) {
    const botones = document.querySelectorAll('.btn-punto');
    botones.forEach(boton => {
        boton.disabled = !habilitado;
    });
    
    // También deshabilitar el selector de puntaje si querés
    const selector = document.getElementById('puntaje-maximo');
    if (selector) selector.disabled = !habilitado;
}

// Función para sumar puntos
function sumarPuntos(equipo, puntos) {
    // Si el juego ya terminó, no permitir más puntos
    if (juegoTerminado) {
        alert('¡La partida ya terminó! Hacé clic en "Reiniciar partida" para jugar de nuevo.');
        return;
    }
    
    // Calcular puntos de "Falta" si corresponde
    if (puntos === 'resto') {
        if (equipo === 'nosotros') {
            puntos = Math.abs(puntosNosotros - puntosEllos) + 1;
        } else {
            puntos = Math.abs(puntosEllos - puntosNosotros) + 1;
        }
    }
    
    // Sumar los puntos (permitimos pasarnos del límite para mostrar el ganador)
    if (equipo === 'nosotros') {
        puntosNosotros += puntos;
        document.getElementById('puntos-nosotros').textContent = puntosNosotros;
    } else {
        puntosEllos += puntos;
        document.getElementById('puntos-ellos').textContent = puntosEllos;
    }
    
    // Verificar si hay ganador
    verificarGanador();
}

// Función para reiniciar la partida
function reiniciarPartida() {
    puntosNosotros = 0;
    puntosEllos = 0;
    juegoTerminado = false;
    
    document.getElementById('puntos-nosotros').textContent = '0';
    document.getElementById('puntos-ellos').textContent = '0';
    
    const mensaje = document.getElementById('mensaje-victoria');
    mensaje.style.display = 'none';
    
    // Reactivar todos los botones
    setBotonesEstado(true);
    
    console.log('Partida reiniciada');
}

// Función para cambiar el puntaje máximo (aunque ahora está fijo en 30)
function cambiarPuntajeMaximo() {
    // Como decidimos fijarlo en 30, esta función podría eliminarse
    // Pero la mantenemos por si querés cambiarlo después
    puntajeMaximo = parseInt(document.getElementById('puntaje-maximo').value);
    
    // Si ya hay un ganador con el nuevo puntaje, actualizar mensaje
    if (!juegoTerminado) {
        verificarGanador();
    }
}

// Función para verificar si hay un ganador
function verificarGanador() {
    const mensaje = document.getElementById('mensaje-victoria');
    
    if (puntosNosotros >= puntajeMaximo) {
        mensaje.textContent = '🏆 ¡GANAMOS! 🏆';
        mensaje.style.display = 'block';
        mensaje.style.backgroundColor = '#4CAF50';
        juegoTerminado = true;
        setBotonesEstado(false);  // Deshabilitar todos los botones
    } else if (puntosEllos >= puntajeMaximo) {
        mensaje.textContent = '😢 GANARON ELLOS 😢';
        mensaje.style.display = 'block';
        mensaje.style.backgroundColor = '#b22222';
        juegoTerminado = true;
        setBotonesEstado(false);  // Deshabilitar todos los botones
    } else {
        mensaje.style.display = 'none';
        juegoTerminado = false;
    }
}

// Función para restar puntos (útil si alguien se equivoca)
function restarPuntos(equipo, puntos) {
    if (juegoTerminado) {
        alert('La partida terminó. Reiniciá para modificar los puntos.');
        return;
    }
    
    if (equipo === 'nosotros') {
        puntosNosotros = Math.max(0, puntosNosotros - puntos);
        document.getElementById('puntos-nosotros').textContent = puntosNosotros;
    } else {
        puntosEllos = Math.max(0, puntosEllos - puntos);
        document.getElementById('puntos-ellos').textContent = puntosEllos;
    }
    verificarGanador();
}

// Inicializar el estado de los botones cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Asegurarnos que todos los botones están habilitados al inicio
    setBotonesEstado(true);
    console.log('🎴 Contador de Truco Argentino listo - Límite: 30 puntos');
});
