import { InputProps } from "../types";

export const SearchInput =({ onInput }: InputProps) => {
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Search Task ");
  input.oninput = (e) => {
    if (e.target instanceof HTMLInputElement) {
      const value = e.target.value;
      onInput(value.toLowerCase());
    }
  };
  return input;
}
