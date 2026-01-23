export function render(el) {
  el.innerHTML = `<p>H111ello! Current time: ${new Date().toLocaleTimeString()}</p>`;
}
