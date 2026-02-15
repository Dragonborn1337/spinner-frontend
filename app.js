const reel = document.getElementById("reel");
const spinBtn = document.getElementById("spinBtn");

spinBtn.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * 8);
    const offset = randomIndex * 80;

    reel.style.transform = `translateX(-${offset}px)`;
});
