const apiKey = '5408392934524859aa613473648be097';
const main = document.querySelector('main');



//au load de la page -> démare sw
window.addEventListener('load', async e => {
    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('sw.js');
            console.log('SW registered');
        } catch (error) {
            console.log('marchpo');

        }
    }
})