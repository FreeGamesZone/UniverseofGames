const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
const snowBtn = document.getElementById("snowBtn");
let snowing = true;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let flakes = Array.from({length: 120}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    s: Math.random() * 1 + 0.5
}));

function draw() {
    if (!snowing) { ctx.clearRect(0,0,canvas.width,canvas.height); return; }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "white";
    flakes.forEach(f => {
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI*2); ctx.fill();
        f.y += f.s; if(f.y > canvas.height) f.y = -5;
    });
    requestAnimationFrame(draw);
}
draw();

snowBtn.onclick = () => {
    snowing = !snowing;
    snowBtn.innerHTML = snowing ? `<i class="fa-solid fa-snowflake"></i> <span>Snow: ON</span>` : `<i class="fa-solid fa-snowflake"></i> <span>Snow: OFF</span>`;
    if(snowing) draw();
};

function openGame(url) {
    document.getElementById("gameFrame").src = url;
    document.getElementById("gameModal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

document.getElementById("closeModal").onclick = () => {
    document.getElementById("gameFrame").src = "";
    document.getElementById("gameModal").classList.add("hidden");
    document.body.style.overflow = "auto";
};

document.getElementById("searchInput").onkeyup = (e) => {
    let val = e.target.value.toLowerCase();
    document.querySelectorAll(".card").forEach(c => {
        c.style.display = c.querySelector("h3")?.innerText.toLowerCase().includes(val) ? "block" : "none";
    });
};