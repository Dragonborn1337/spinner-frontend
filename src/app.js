const items = ["🎁", "⭐", "💎", "⭐", "🎁", "💎", "⭐", "🎁"];
const reel = document.getElementById("reel");
const spinBtn = document.getElementById("spinBtn");
const starsEl = document.getElementById("stars");

let stars = 100;
let spinning = false;

// создаем длинную ленту
function generateReel() {
    reel.innerHTML = "";

    for (let i = 0; i < 15; i++) {
        items.forEach(symbol => {
            const div = document.createElement("div");
            div.className = "item";
            div.textContent = symbol;
            reel.appendChild(div);
        });
    }
}

generateReel();

spinBtn.addEventListener("click", () => {
    if (spinning) return;
    if (stars < 10) {
        alert("Недостаточно ⭐");
        return;
    }

    spinning = true;
    stars -= 10;
    starsEl.textContent = stars;

    const totalItems = reel.children.length;
    const randomIndex = Math.floor(Math.random() * totalItems);

    const offset = randomIndex * 100;

    reel.style.transition = "transform 3s cubic-bezier(.17,.67,.83,.67)";
    reel.style.transform = `translateX(-${offset}px)`;

    setTimeout(() => {
        const winSymbol = reel.children[randomIndex].textContent;

        if (winSymbol === "⭐") {
            stars += 20;
            alert("Вы выиграли 20 ⭐");
        } else if (winSymbol === "💎") {
            alert("Редкий приз 💎");
        } else {
            alert("Попробуй еще!");
        }

        starsEl.textContent = stars;

        reel.style.transition = "none";
        reel.style.transform = `translateX(0px)`;

        spinning = false;
    }, 3100);
});
