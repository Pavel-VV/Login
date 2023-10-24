function infoContainer() {
    return document.querySelector('.notify-container');
};

function getNotifyIndex() {
    return (document.querySelectorAll('.notify-container .alert-info')).length;
}

function createNotifyMsg(msg, className, index) {
    return `
        <div class='alert ${className}' data-index="${index}">${msg}</div>
    `
};

function createContainerTemplate() {
    return `
        <div class='notify-container' style='position: fixed; top: 10px; right: 10px; z-index: 99;'></div>
    `;
};

function createInfoContainer() {
    const template = createContainerTemplate();
    document.body.insertAdjacentHTML('afterbegin', template);
};

/**
 * function notify.
 * @param {object} setings
 * @param {string} setings.msg
 * @param {string} setings.className
 * @param {number} setings.timeout
 */
export function notify({msg = 'info message', className = 'alert-info', timeout = 2000} = {}) {
    const index = getNotifyIndex();
    if(!infoContainer()) {
        createInfoContainer();
    };

    const container = infoContainer();
    const infoNotify = createNotifyMsg(msg, className, index);
    container.insertAdjacentHTML('beforeend', infoNotify);
    setTimeout(() => closeNotifyMsg(className, index), timeout);
};

function closeNotifyMsg(className, index) {
    let element;

    if(index === undefined) {
        element = document.querySelector(`.notify-container .${className}`);
    } else {
        element = document.querySelector(`.notify-container .${className}[data-index="${index}"]`);
    };
    
    if(!element){
        console.warn('not element info');
        return;
    };

    const container = infoContainer();
    container.removeChild(element);
};