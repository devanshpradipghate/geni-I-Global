const state = {
  vip: true,
  coins: 5200,
  level: 34,
  ownedFrames: new Set(["neon-pulse", "galaxy-orbit", "ice-crystal"]),
  activeFrame: "neon-pulse",
  activeBanner: "neon-pulse-banner"
};

const frames = [
  ["Neon Pulse", "neon-pulse", 800],
  ["Galaxy Orbit", "galaxy-orbit", 1100],
  ["Fire Blaze", "fire-blaze", 900],
  ["Ice Crystal", "ice-crystal", 850],
  ["Dragon Flame", "dragon-flame", 1500],
  ["Diamond Sparkle", "diamond-sparkle", 1400],
  ["Cyberpunk Glitch", "cyberpunk-glitch", 1200],
  ["Plasma Ring", "plasma-ring", 1000],
  ["Solar Flare", "solar-flare", 1000],
  ["Lunar Halo", "lunar-halo", 950],
  ["Quantum Wave", "quantum-wave", 1300],
  ["Toxic Neon", "toxic-neon", 880],
  ["Royal Prism", "royal-prism", 1450],
  ["Mecha Core", "mecha-core", 1250],
  ["Aurora Bloom", "aurora-bloom", 1350]
];

const banners = [
  ["Neon Pulse", "linear-gradient(120deg,#ff2ec5,#3cf4ff,#7d4dff)"],
  ["Galaxy Wave", "linear-gradient(120deg,#24135b,#5b53ff,#5de4ff)"],
  ["Electric Crown", "linear-gradient(120deg,#ffd500,#ff7a00,#ffea7d)"],
  ["Fire / Ice", "linear-gradient(120deg,#ff4b2b,#ffb347,#9cecff,#4facfe)"],
  ["Prestige Gradient", "linear-gradient(120deg,#ff8ad8,#c5a3ff,#88f3ff)"],
];

const tasks = [
  ["Daily login streak", 200],
  ["Complete social quests", 350],
  ["Participate in seasonal joy event", 500],
  ["Win multiplayer games", 450],
  ["Invite successful referrals", 300]
];

const leaderboard = [
  ["🇧🇷 Brazil", 9240],
  ["🇯🇵 Japan", 9012],
  ["🇺🇸 USA", 8870],
  ["🇮🇳 India", 8595],
  ["🇹🇷 Türkiye", 8204]
];

const frameGrid = document.getElementById("frameGrid");
const bannerGrid = document.getElementById("bannerGrid");
const coinCount = document.getElementById("coinCount");
const avatarFrame = document.getElementById("avatarFrame");
const profileBanner = document.getElementById("profileBanner");
const rewardTasks = document.getElementById("rewardTasks");
const vipBadge = document.getElementById("vipBadge");
const videoCallBtn = document.getElementById("videoCallBtn");
const vipRoomNote = document.getElementById("vipRoomNote");

function renderFrames() {
  frameGrid.innerHTML = "";
  frames.forEach(([name, className, price]) => {
    const owned = state.vip || state.ownedFrames.has(className);
    const card = document.createElement("div");
    card.className = "frame-item";
    card.innerHTML = `
      <strong>${name}</strong>
      <div class="avatar-frame ${className}" style="width:56px;height:56px;margin:.4rem 0;"></div>
      <div>${state.vip ? "VIP Free" : `${price} coins`}</div>
      <button class="btn action">${owned ? "Equip" : "Buy"}</button>
    `;
    card.querySelector(".action").onclick = () => {
      if (!owned) {
        if (state.coins >= price) {
          state.coins -= price;
          state.ownedFrames.add(className);
        } else {
          return alert("Not enough coins.");
        }
      }
      state.activeFrame = className;
      updateProfile();
      renderFrames();
    };
    frameGrid.appendChild(card);
  });
}

function renderBanners() {
  bannerGrid.innerHTML = "";
  banners.forEach(([name, gradient], idx) => {
    const card = document.createElement("div");
    card.className = "banner-item";
    const isLocked = !state.vip;
    card.innerHTML = `<strong>${name}</strong><div class="banner" style="margin-top:.4rem;background:${gradient}">Animated</div>
    <button class="btn">${isLocked ? "VIP Only" : "Equip"}</button>`;
    card.querySelector("button").onclick = () => {
      if (isLocked) return alert("VIP required for animated banners.");
      state.activeBanner = idx;
      profileBanner.style.background = gradient;
      profileBanner.textContent = `${name} Banner`;
    };
    bannerGrid.appendChild(card);
  });
}

function renderTasks() {
  rewardTasks.innerHTML = "";
  tasks.forEach(([task, reward]) => {
    const li = document.createElement("li");
    li.innerHTML = `${task} · +${reward} coins <button class="btn">Claim</button>`;
    li.querySelector("button").onclick = () => {
      state.coins += reward;
      updateProfile();
    };
    rewardTasks.appendChild(li);
  });
}

function renderLeaderboard() {
  const board = document.getElementById("leaderboard");
  board.innerHTML = "";
  leaderboard.forEach(([country, points]) => {
    const li = document.createElement("li");
    li.innerHTML = `${country} <span class="country-badge">${points}</span>`;
    board.appendChild(li);
  });
}

function updateProfile() {
  coinCount.textContent = state.coins;
  avatarFrame.className = `avatar-frame ${state.activeFrame}`;
  vipBadge.style.display = state.vip ? "inline-block" : "none";
  videoCallBtn.disabled = !state.vip;
  vipRoomNote.textContent = state.vip
    ? "VIP roleplay rooms unlocked: Superhero Ops + Anime Fantasy Realm"
    : "VIP required for roleplay rooms.";
}

document.getElementById("themeToggle").onclick = () => {
  const dark = document.body.classList.toggle("theme-dark");
  document.body.classList.toggle("theme-light", !dark);
  document.getElementById("themeToggle").textContent = dark ? "Neon Light" : "Neon Dark";
};

document.getElementById("simulateDay").onclick = () => {
  state.coins += 200;
  updateProfile();
};

document.getElementById("tapEffect").onclick = () => {
  const card = document.getElementById("profileCard");
  card.animate([{ transform: "scale(1)" }, { transform: "scale(1.03)" }, { transform: "scale(1)" }], {
    duration: 300,
    easing: "ease-out"
  });
  state.level += 1;
  document.getElementById("userLevel").textContent = state.level;
  document.getElementById("moodTag").textContent = `Mood: Joy Surge +${state.level % 5} ⭐`;
};

document.getElementById("toggleVip").onclick = () => {
  state.vip = !state.vip;
  updateProfile();
  renderFrames();
  renderBanners();
};

document.getElementById("sendBtn").onclick = () => {
  const chatInput = document.getElementById("chatInput");
  if (!chatInput.value.trim()) return;
  const messages = document.getElementById("messages");
  const div = document.createElement("div");
  div.textContent = `You: ${chatInput.value}`;
  messages.appendChild(div);
  chatInput.value = "";
  messages.scrollTop = messages.scrollHeight;
};

renderFrames();
renderBanners();
renderTasks();
renderLeaderboard();
updateProfile();
