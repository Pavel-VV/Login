
function templateMsgError(msg) {
    return `
        <div class="invalid-feedback">${msg}</div>
    `;
};

/**
 * 
 * @param {HTMLElement} el 
 * retern
 */
export function showInputError(el) {
    const parent = el.parentElement;
    const err = parent.querySelector('.invalid-feedback');
    if (err) return;
    const msg = el.dataset.invalidMessage || 'Invalid input';
    const msgErr = templateMsgError(msg);
    el.classList.add('is-invalid');
    parent.insertAdjacentHTML('beforeend', msgErr);
};

/**
 * 
 * @param {HTMLElement} el 
 */
export function removeInputError(el) {
    const parent = el.parentElement;
    const err = parent.querySelector('.invalid-feedback');
    if (!err) return;
    el.classList.remove('is-invalid');
    parent.removeChild(err);
}