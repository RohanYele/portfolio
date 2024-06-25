document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadContent(page);
        });
    });

    function loadContent(page) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', page + '.html', true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(xhr.responseText, 'text/html');
                const newContent = doc.querySelector('#content').innerHTML;
                document.querySelector('#content').innerHTML = newContent;
                history.pushState(null, '', page + '.html');
            }
        };
        xhr.send();
    }

    window.addEventListener('popstate', function() {
        const path = window.location.pathname.split('/').pop();
        const page = path.split('.').shift();
        if (page) {
            loadContent(page);
        }
    });

    const path = window.location.pathname.split('/').pop();
    const page = path.split('.').shift() || 'index';
    loadContent(page);
});
