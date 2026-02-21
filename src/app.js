const reel = document.getElementById("reel");
const spinBtn = document.getElementById("spinBtn");
const starsEl = document.getElementById("stars");

const items = [
    { symbol: "🎁", reward: 0 },
    { symbol: "⭐", reward: 5 },
    { symbol: "💎", reward: 20 },
];

let stars = 100;
let isSpinning = false;

const itemWidth = 100;

function buildReel() {
    reel.innerHTML = "";

    for (let i = 0; i < 30; i++) {
        items.forEach(item => {
            const div = document.createElement("div");
            div.className = "item";
            div.textContent = item.symbol;
            reel.appendChild(div);
        });
    }
}

buildReel();

function updateBalance() {
    starsEl.textContent = stars;
}

spinBtn.addEventListener("click", () => {
    if (isSpinning) return;
    if (stars < 10) {
        alert("Недостаточно ⭐");
        return;
    }

    stars -= 10;
    updateBalance();

    isSpinning = true;
    spinBtn.disabled = true;

    const randomIndex = Math.floor(Math.random() * items.length);

    const visibleWidth = document.querySelector(".spinner-container").offsetWidth;
    const centerOffset = visibleWidth / 2 - itemWidth / 2;

    const fullCycles = items.length * 10;
    const targetIndex = fullCycles + randomIndex;

    const finalOffset = targetIndex * itemWidth - centerOffset;

    reel.style.transition = "transform 3s cubic-bezier(0.1, 0.9, 0.2, 1)";
    reel.style.transform = `translateX(-${finalOffset}px)`;

    setTimeout(() => {

        // сброс позиции
        reel.style.transition = "none";

        const normalizedIndex = randomIndex + items.length * 2;
        const normalizedOffset = normalizedIndex * itemWidth - centerOffset;

        reel.style.transform = `translateX(-${normalizedOffset}px)`;

        // НАЧИСЛЕНИЕ ВЫИГРЫША
        const reward = items[randomIndex].reward;

        if (reward > 0) {
            stars += reward;
            updateBalance();
            alert(`Вы выиграли ${reward} ⭐`);
        }

        isSpinning = false;
        spinBtn.disabled = false;

    }, 3000);
});

/* NAVIGATION */

const navButtons = document.querySelectorAll('.nav button');
const screens = document.querySelectorAll('.screen');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.getAttribute('data-screen');

        screens.forEach(screen => {
            screen.classList.remove('active');
        });

        document.getElementById(target).classList.add('active');
    });
});