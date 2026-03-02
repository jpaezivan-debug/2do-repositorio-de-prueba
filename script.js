// ===== CONTADOR DE PUNTOS DEL TRUCO =====
let puntosNosotros = 0;
let puntosEllos = 0;
let puntajeMaximo = 30;

// Función para sumar puntos
function sumarPuntos(equipo, puntos) {
    if (puntos === 'resto') {
        // Falta envido: lo que le falta al equipo perdedor + 1
        if (equipo === 'nosotros') {
            puntos = Math.abs(puntosNosotros - puntosEllos) + 1;
        } else {
            puntos = Math.abs(puntosEllos - puntosNosotros) + 1;
        }
    }
    
    if (equipo === 'nosotros') {
        puntosNosotros += puntos;
        document.getElementById('puntos-nosotros').textContent = puntosNosotros;
    } else {
        puntosEllos += puntos;
        document.getElementById('puntos-ellos').textContent = puntosEllos;
    }
    
    verificarGanador();
}

// Función para reiniciar la partida
function reiniciarPartida() {
    puntosNosotros = 0;
    puntosEllos = 0;
    document.getElementById('puntos-nosotros').textContent = '0';
    document.getElementById('puntos-ellos').textContent = '0';
    document.getElementById('mensaje-victoria').style.display = 'none';
}

// Función para cambiar el puntaje máximo
function cambiarPuntajeMaximo() {
    puntajeMaximo = parseInt(document.getElementById('puntaje-maximo').value);
    verificarGanador();
}

// Función para verificar si hay un ganador
function verificarGanador() {
    const mensaje = document.getElementById('mensaje-victoria');
    
    if (puntosNosotros >= puntajeMaximo) {
        mensaje.textContent = '🏆 ¡GANAMOS! 🏆';
        mensaje.style.display = 'block';
        mensaje.style.backgroundColor = '#4CAF50';
    } else if (puntosEllos >= puntajeMaximo) {
        mensaje.textContent = '😢 GANARON ELLOS 😢';
        mensaje.style.display = 'block';
        mensaje.style.backgroundColor = '#b22222';
    } else {
        mensaje.style.display = 'none';
    }
}

// Función para restar puntos (por si se equivocan)
function restarPuntos(equipo, puntos) {
    if (equipo === 'nosotros') {
        puntosNosotros = Math.max(0, puntosNosotros - puntos);
        document.getElementById('puntos-nosotros').textContent = puntosNosotros;
    } else {
        puntosEllos = Math.max(0, puntosEllos - puntos);
        document.getElementById('puntos-ellos').textContent = puntosEllos;
    }
    verificarGanador();
}

// Mensaje de bienvenida en la consola (opcional)
console.log('🎴 Contador de Truco Argentino listo para usar!');
