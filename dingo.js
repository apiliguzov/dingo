javascript: (function () {
    var appStyles = document.createElement("link");
    appStyles.rel = "stylesheet";
    appStyles.type = "text/css";
    appStyles.href = "https://apiliguzov.github.io/dingo/psa-styles.css";
    document.body.appendChild(appStyles);
    document.body.appendChild(document.createElement('script')).src = 'https://apiliguzov.github.io/dingo/main.js';
})();
