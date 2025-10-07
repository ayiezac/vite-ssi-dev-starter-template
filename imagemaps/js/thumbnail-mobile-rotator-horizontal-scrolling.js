document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('ladies-rotator-mobile');
    let isDragging = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    container.addEventListener('mouseup', () => {
        isDragging = false;
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // Adjust the scrolling speed
        container.scrollLeft = scrollLeft - walk;
        
    });

    // For touch devices
    container.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('touchend', () => {
        isDragging = false;
    });

    container.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // Adjust the scrolling speed
        container.scrollLeft = scrollLeft - walk;
    });
});