export function Button({ text, onClick }) {
  const button = document.createElement("button");
  if (text) {
    button.innerHTML = text;
  } else {
    button.innerHTML = "";
  }

  button.onclick = onClick;
  return button;
}
