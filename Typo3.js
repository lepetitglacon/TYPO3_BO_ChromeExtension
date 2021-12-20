// ==UserScript==
// @name     Typo3 Context Warning
// @version  2
// @grant    none
// ==/UserScript==

/*jshint esversion: 6 */
(function() {
    "use strict";

    /****************************************************
     *                   CONFIGURATION
     ***************************************************/
    const SETTINGS = {
        DEVELOPMENT: {
            color: '#5c8a3c',
            regex: /cimeos\.dev/
        },
        STAGING: {
            color: 'rgba(246,208,40,0.8)',
            regex: /stage\.cimeos\.com/
        },
        PRODUCTION: {
            color: '#bc3f3f',
            regex: /.*/
        }
    };

    /****************************************************
     *                   Main script
     ***************************************************/
    const DEVELOPMENT_CONTEXT = SETTINGS.DEVELOPMENT;
    const STAGING_CONTEXT     = SETTINGS.STAGING;
    const PRODUCTION_CONTEXT  = SETTINGS.PRODUCTION;

    const location = window.location;
    const hostname = location.hostname;
    const pathname = location.pathname;

    var isTypo3 = function(pathname) {
        return pathname.match('/typo3/index.php') !== null;
    };

    var getContext = function(hostname) {
        switch (true) {
            case DEVELOPMENT_CONTEXT.regex.test(hostname):
                return DEVELOPMENT_CONTEXT;
            case STAGING_CONTEXT.regex.test(hostname):
                return STAGING_CONTEXT;
            case PRODUCTION_CONTEXT.regex.test(hostname):
                return PRODUCTION_CONTEXT;
            default:
                return null;
        }
    };

    var main = function() {
        if (isTypo3(pathname)) {
            const context = getContext(hostname);

            if (context !== null) {
                let styleHeader = document.head.appendChild(
                    document.createElement("style")
                );
                styleHeader.innerHTML = `
                   .topbar-header-site \{background: ${context.color};\}
                   .topbar-header-site::after \{background: ${context.color};\}`;
            }
        }
    };

    main();
})();