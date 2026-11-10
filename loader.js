(function () {
    const BASE_URL = 'https://pro-resultat.github.io/ATG';
    const currentPath = window.location.pathname;

    // 1. Глобальні файли (підвантажуються на ВСІХ сторінках магазину)
    const globalResources = {
        css: [
            // 'css/global.css'
        ],
        js: [
            // 'js/global.js'
        ]
    };

    // 2. Файли під конкретні сторінки (додавайте нові за потреби)
    const pageRoutes = [
        {
            // Сторінка співробітництва (https://atg.in.ua/spivrobitnytsto/)
            match: (url) => url.includes('/spivrobitnytsto'),
            css: [
                'css/cooperation.css' // назва та шлях можуть бути довільними
            ],
            js: [
                'js/cooperation.js'   // назва та шлях можуть бути довільними
            ]
        }
        // У майбутньому сюди просто додаєте новий блок { match: ..., css: [...], js: [...] }
    ];

    // Допоміжні функції для динамічного вставляння тегів
    function injectCSS(filePath) {
        if (!filePath) return;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${BASE_URL}/${filePath.replace(/^\//, '')}`;
        document.head.appendChild(link);
    }

    function injectJS(filePath) {
        if (!filePath) return;
        const script = document.createElement('script');
        script.src = `${BASE_URL}/${filePath.replace(/^\//, '')}`;
        script.defer = true;
        document.head.appendChild(script);
    }

    // Підключаємо глобальні ресурси
    globalResources.css?.forEach(injectCSS);
    globalResources.js?.forEach(injectJS);

    // Підключаємо ресурси для поточної сторінки
    pageRoutes.forEach(route => {
        if (route.match(currentPath)) {
            route.css?.forEach(injectCSS);
            route.js?.forEach(injectJS);
        }
    });
})();