function showMoreInfo() {
    const moreInfo = document.getElementById('moreInfo');
    const btn = document.querySelector('.btn-info');
    
    if (moreInfo.style.display === 'none') {
        moreInfo.style.display = 'block';
        btn.textContent = 'Mostrar menos';
    } else {
        moreInfo.style.display = 'none';
        btn.textContent = 'Más información';
    }
}

// Animación al cargar
document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.card');
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.5s';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
});
