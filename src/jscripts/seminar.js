if (location.pathname.startsWith('/information/seminar/')) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/lity@2.4.1/dist/lity.min.js';
    script.async = true;
    document.body.appendChild(script);
}