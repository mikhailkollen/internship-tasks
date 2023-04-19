export function SearchInput({ onInput }) {
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Search Task ");
  input.oninput = (e) => {
    const value = e.target.value;
    onInput(value.toLowerCase());
  };
  return input;
}
