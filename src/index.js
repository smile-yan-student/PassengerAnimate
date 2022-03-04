const Aos = {
    heightData: [],
};

let getDomNode = function (element) {
    let source = Array.from(element);
    source.forEach((item) => {
        if (
            item.nodeType == 1 &&
            item.nodeName != "SCRIPT" &&
            item.nodeName != "NOSCRIPT"
        ) {
            let attrsKeys = Object.keys(item.dataset);
            if (attrsKeys.length && attrsKeys.includes("passenger")) {
                Aos.heightData.push(item);
            }
            if (item.children) {
                getDomNode(item.children);
            }
        }
    });
};

let animateControl = function () {
    Aos.heightData.forEach((item) => {
        let data = item.getBoundingClientRect();
        if (data.y > window.innerHeight) {
            item.classList.remove("animate");
        } else {
            item.classList.add("animate");
        }
    });
};

Aos.init = function () {
    let bodyElement = document.body.children;
    getDomNode(bodyElement);
    animateControl();
};

document.body.onscroll = function () {
    animateControl();
};

export default Aos;
