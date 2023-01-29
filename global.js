var title = '';
var fromName = '';
var toName = '';


function removeStyles() {
    var styles = document.getElementsByTagName("link");
    for(var i = 0; i < styles.length; i++) {
        styles[i].parentNode.removeChild(styles[i]);
    };
}

function addStyle(name) {
    addStyleOverPath(name + "/style.css");
}

function addStyleOverPath(path) {
    var styleElement = document.createElement("link");
    styleElement.href = "/" + path;
    styleElement.rel = "stylesheet";
    document.head.appendChild(styleElement);
}

function removeScripts() {
    var scripts = document.getElementsByTagName("script");
    for(var i = 0; i < scripts.length; i++) {
        if(scripts[i].src !== "global.js") {
            scripts[i].parentNode.removeChild(scripts[i]);
        }
    }
}

function addScript(name) {
    addScriptOverPath(name + "/script.js");
}

function addScriptOverPath(path) {
    var scriptElement = document.createElement("script");
    scriptElement.src = "/" + path;
    scriptElement.type = "text/javascript";
    document.head.appendChild(scriptElement);
}