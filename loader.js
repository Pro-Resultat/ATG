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
            // Спрацює і на /spivrobitnytsto, і на /spivrobitnytsto/
            match: (url) => url.toLowerCase().includes('spivrobitnytsto'),
            css: [
                'css/cooperation.css'
            ],
            js: [
                'js/cooperation.js'
            ]
        }
    ];

    // Допоміжні функції для динамічного вставляння тегів
    function injectCSS(filePath) {
        if (!filePath) return;
        // Перевірка, щоб не дублювати підключення
        const fullUrl = `${BASE_URL}/${filePath.replace(/^\//, '')}?v=${Date.now()}`;
        
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = fullUrl;
        
        document.head.appendChild(link);
        console.log('ATG Loader: Loaded CSS ->', fullUrl);
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