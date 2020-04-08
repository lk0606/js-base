

function f() {
    const u = navigator.userAgent;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    if (/Android/gi.test(navigator.userAgent)) {
        window.addEventListener('resize', function () {
            if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
                window.setTimeout(function () {
                    document.activeElement.scrollIntoViewIfNeeded();
                }, 0);
            }
        })
    }
}

function fixIos12() {
    try {
        const userAgentStr = navigator.userAgent.toLowerCase()
        let iosVersion = userAgentStr.match(/cpu iphone os (.*?) like mac os/)
        if (iosVersion && iosVersion[1] && iosVersion[1].split('_')) {
            iosVersion = iosVersion[1].split('_')[0]
        }
        let appVersion = appBridge.isApp() && /weiyi\/(\d+(\.\d+)?(\.\d+)?)?\s/ig.exec(userAgentStr); //版本升级提示
        if (appVersion) {
            appVersion = appVersion[1].split('.')
        }
        const wHeight = (window.innerHeight + 35) + 'px'
        if (iosVersion && iosVersion >= 12 && ((appBridge.isIos() && appVersion && appVersion[0] === 4 && appVersion[1] === 6 && appVersion[2] === 0) || appBridge.isWechat())) {
            document.body.addEventListener('blur', function (e) {
                if (["TEXTAREA", "INPUT", "SELECT"].indexOf(e.target.tagName) !== -1) {
                    setTimeout(function () {
                        document.documentElement.style.height = document.documentElement.style.height === wHeight ? (window.innerHeight + 34) + 'px' : wHeight
                    }, 100);
                }
            }, true)
        }
    } catch (e) {

    }
}
