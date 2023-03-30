const audio = document.querySelector("audio");
const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  if (btn.textContent === "Turn on the sound") {
    audio.muted = false;
    btn.textContent = "Click to mute";
  } else {
    btn.textContent = "Turn on the sound";
    audio.muted = true;
  }
});
