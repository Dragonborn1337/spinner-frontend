// ==============================
// DOM
// ==============================

const reel = document.getElementById("reel");
const spinBtn = document.getElementById("spinBtn");
const starsEl = document.getElementById("stars");

const items = [
    { symbol: "🎁", type: "none", amount: 0 },
    { symbol: "⭐", type: "stars", amount: 5 },
    { symbol: "💎", type: "ton", amount: 0.1 },
];

let stars = 0;
let isSpinning = false;

const itemWidth = 100;


// ==============================
// DEV / TELEGRAM MODE
// ==============================

function getTelegramId() {
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        return 1034032774; 
    } else {
        console.log("🔥 DEV MODE ACTIVE");
        return 1034032774; // ← Поставь свой telegram_id из БД
    }
}


// ==============================
// BUILD REEL
// ==============================

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


// ==============================
// BALANCE
// ==============================

function updateBalance() {
    starsEl.textContent = stars;
}


// ==============================
// ANIMATION
// ==============================

function animateReel(index, reward) {

    const visibleWidth = document.querySelector(".spinner-container").offsetWidth;
    const centerOffset = visibleWidth / 2 - itemWidth / 2;

    const fullCycles = items.length * 10;
    const targetIndex = fullCycles + index;
    const finalOffset = targetIndex * itemWidth - centerOffset;

    reel.style.transition = "transform 3s cubic-bezier(0.1, 0.9, 0.2, 1)";
    reel.style.transform = `translateX(-${finalOffset}px)`;

    setTimeout(() => {

        reel.style.transition = "none";

        const normalizedIndex = index + items.length * 2;
        const normalizedOffset = normalizedIndex * itemWidth - centerOffset;

        reel.style.transform = `translateX(-${normalizedOffset}px)`;

        if (reward.amount > 0) {
            alert(`Вы выиграли ${reward.amount} ${reward.type === 'stars' ? '⭐' : 'TON'}`);
        }

        isSpinning = false;
        spinBtn.disabled = false;

    }, 3000);
}


// ==============================
// SPIN
// ==============================

spinBtn.addEventListener("click", async () => {

    if (isSpinning) return;

    isSpinning = true;
    spinBtn.disabled = true;

    try {

        const telegram_id = getTelegramId();

        const response = await fetch("https://spinner-backend-f1b0.onrender.com/api/spin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ telegram_id })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error);
            isSpinning = false;
            spinBtn.disabled = false;
            return;
        }

        stars = data.stars_balance;
        updateBalance();

        let index = items.findIndex(item =>
            item.type === data.reward.type &&
            item.amount === data.reward.amount
        );

        if (index === -1) index = 0;

        animateReel(index, data.reward);

    } catch (error) {
        alert("Ошибка сервера");
        console.error(error);
        isSpinning = false;
        spinBtn.disabled = false;
    }
});


// ==============================
// NAVIGATION (если есть вкладки)
// ==============================

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