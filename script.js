document.addEventListener("DOMContentLoaded", () => {
  const audioEl = document.getElementById("bg-music");

  // --- 1. GİRİŞ EKRANI VE ŞİFRE KONTROLÜ ---
  const loginOverlay = document.getElementById("login-overlay");
  const loginBtn = document.getElementById("login-btn");
  const passInput = document.getElementById("site-password");
  const loginMsg = document.getElementById("login-msg");

  if (loginBtn) {
    loginBtn.addEventListener("click", checkPassword);
  }

  if (passInput) {
    passInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") checkPassword();
    });
  }

  function checkPassword() {
    const password = passInput.value.trim();

    if (password === "225226") {
      loginMsg.style.color = "#4CAF50";
      loginMsg.textContent = "Giriş Başarılı! ❤️";
      loginOverlay.style.opacity = "0";
      setTimeout(() => {
        loginOverlay.style.display = "none";
        startEverything();
      }, 500);
    } else {
      loginMsg.style.color = "#f44336";
      loginMsg.textContent = "Yanlış Şifre :(";
      passInput.style.animation = "shake 0.3s";
      setTimeout(() => (passInput.style.animation = ""), 300);
      passInput.value = "";
    }
  }

  const startEverything = () => {
    audioEl.volume = 0.5;
    audioEl.play().catch(() => {
      console.log("Otomatik müzik engellendi.");
    });
    startSiteAnimation();
  };

  document.addEventListener("click", (e) => {
    const clickHeart = document.createElement("div");
    clickHeart.classList.add("click-heart");
    clickHeart.innerHTML = "💖";
    clickHeart.style.left = `${e.clientX}px`;
    clickHeart.style.top = `${e.clientY}px`;
    document.body.appendChild(clickHeart);
    setTimeout(() => clickHeart.remove(), 1000);
  });

  function startSiteAnimation() {
    const wordsList = [
      { text: "askim", font: "'Dancing Script', cursive" },
      { text: "herseyim", font: "'Caveat', cursive" },
      { text: "bebisim", font: "'Playball', cursive" },
      { text: "canim", font: "'Parisienne', cursive" },
      { text: "sevgilim", font: "'Great Vibes', cursive" },
    ];

    const changingTextEl = document.getElementById("changing-text");
    const subTextEl = document.getElementById("sub-text");
    const startBtnEl = document.getElementById("start-btn");
    const heartsContainer = document.getElementById(
      "floating-hearts-container",
    );

    for (let i = 0; i < 15; i++) {
      const heart = document.createElement("div");
      heart.classList.add("bg-heart");
      heart.innerHTML = "❤";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = Math.random() * 2 + 1 + "rem";
      heart.style.setProperty(
        "--float-duration",
        Math.random() * 10 + 15 + "s",
      );
      heart.style.setProperty("--sway-duration", Math.random() * 4 + 3 + "s");
      heart.style.animationDelay = `-${Math.random() * 20}s`;
      heartsContainer.appendChild(heart);
    }

    let currentIndex = 0;
    let intervalId;
    const targetWord = "sevgilim";

    function updateWord() {
      const currentItem = wordsList[currentIndex];
      changingTextEl.textContent = currentItem.text;
      changingTextEl.style.fontFamily = currentItem.font;

      if (currentItem.text === targetWord) {
        clearInterval(intervalId);
        finishAnimation();
      } else {
        currentIndex = (currentIndex + 1) % wordsList.length;
      }
    }

    setTimeout(() => {
      intervalId = setInterval(updateWord, 300);
    }, 500);

    function finishAnimation() {
      setTimeout(() => {
        changingTextEl.classList.add("glow-effect");
        subTextEl.classList.add("visible-up");
        setTimeout(() => {
          startBtnEl.classList.add("visible-up");
        }, 1000);
      }, 200);
    }

    const greetingSection = document.getElementById("greeting-section");
    const timelineSection = document.getElementById("timeline-section");
    const missionsSection = document.getElementById("missions-section");

    startBtnEl.addEventListener("click", () => {
      greetingSection.style.opacity = "0";
      setTimeout(() => {
        greetingSection.style.display = "none";
        timelineSection.style.display = "block";
        document.body.style.overflowY = "auto";
        setTimeout(() => {
          timelineSection.style.opacity = "1";
        }, 100);
      }, 800);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (entry.target.id === "timeline-footer-text") {
              setTimeout(() => {
                document.getElementById("continue-timeline-btn").style.display =
                  "inline-block";
                setTimeout(
                  () =>
                    (document.getElementById(
                      "continue-timeline-btn",
                    ).style.opacity = "1"),
                  100,
                );
              }, 500);
            }
          }
        });
      },
      { threshold: 0.2 },
    );

    document
      .querySelectorAll(".timeline-item")
      .forEach((item) => observer.observe(item));
    observer.observe(document.getElementById("timeline-footer-text"));

    document
      .getElementById("continue-timeline-btn")
      .addEventListener("click", () => {
        timelineSection.style.opacity = "0";
        setTimeout(() => {
          timelineSection.style.display = "none";
          missionsSection.style.display = "flex";
          window.scrollTo({ top: 0, behavior: "smooth" });
          setTimeout(() => {
            missionsSection.style.opacity = "1";
          }, 100);
        }, 800);
      });
  }

  // --- GÖREVLER ---
  const missionsList = document.getElementById("missions-list");

  window.showMissionsList = () => {
    document
      .querySelectorAll(".inline-task-area")
      .forEach((el) => (el.style.display = "none"));
    missionsList.style.display = "flex";

    const lastMission = document.getElementById("mission-6");
    if (lastMission && lastMission.classList.contains("completed")) {
      const rewardBtn = document.getElementById("claim-reward-btn");
      if (rewardBtn) {
        rewardBtn.style.display = "block";
        setTimeout(() => {
          rewardBtn.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 500);
      }
    }
  };

  function unlockMission(id) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove("locked");
      el.classList.add("unlocked");
      el.querySelector(".status").textContent = "Oyna";
    }
  }

  function completeMission(id) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove("unlocked");
      el.classList.add("completed");
      el.querySelector(".status").textContent = "✅";
    }
  }

  // OYUN 1: HAFIZA
  document.getElementById("mission-1").addEventListener("click", function () {
    if (this.classList.contains("locked")) return;
    missionsList.style.display = "none";
    document.getElementById("inline-game-area").style.display = "block";
    startMemoryGame();
  });

  function startMemoryGame() {
    const gameBoard = document.getElementById("memory-game-board");
    const gameMsg = document.getElementById("game-message");
    gameBoard.innerHTML = "";
    gameMsg.innerHTML = "";

    const icons = ["❤️", "❤️", "✉️", "✉️", "🎬", "🎬", "♟️", "♟️"];
    icons.sort(() => 0.5 - Math.random());

    let chosenCards = [];
    let chosenCardsIds = [];
    let cardsWon = [];

    icons.forEach((icon, i) => {
      const card = document.createElement("div");
      card.setAttribute("data-id", i);
      card.classList.add("card");
      card.addEventListener("click", flipCard);
      card.innerHTML = icon;
      gameBoard.appendChild(card);
    });

    function flipCard() {
      let cardId = this.getAttribute("data-id");
      if (
        !chosenCardsIds.includes(cardId) &&
        !this.classList.contains("matched")
      ) {
        chosenCards.push(icons[cardId]);
        chosenCardsIds.push(cardId);
        this.classList.add("flipped");
        if (chosenCards.length === 2) {
          setTimeout(checkForMatch, 500);
        }
      }
    }

    function checkForMatch() {
      const cards = document.querySelectorAll(".card");
      const [id1, id2] = chosenCardsIds;
      if (chosenCards[0] === chosenCards[1]) {
        cards[id1].classList.add("matched");
        cards[id2].classList.add("matched");
        cardsWon.push(chosenCards);
      } else {
        cards[id1].classList.remove("flipped");
        cards[id2].classList.remove("flipped");
      }
      chosenCards = [];
      chosenCardsIds = [];

      if (cardsWon.length === icons.length / 2) {
        gameMsg.innerHTML = '<span class="success-msg">basitti 🎉</span>';
        completeMission("mission-1");
        unlockMission("mission-2");
      }
    }
  }

  // OYUN 2: KALP
  document.getElementById("mission-2").addEventListener("click", function () {
    if (this.classList.contains("locked")) return;
    missionsList.style.display = "none";
    document.getElementById("inline-heart-area").style.display = "block";
    startHeartGame();
  });

  function startHeartGame() {
    let heartLevel = 0;
    const bar = document.getElementById("heart-fill-bar");
    const txt = document.getElementById("heart-percent-text");
    const msg = document.getElementById("heart-game-msg");
    let gameActive = true;

    const drainInterval = setInterval(() => {
      if (!gameActive) {
        clearInterval(drainInterval);
        return;
      }
      if (heartLevel > 0) {
        heartLevel -= 2;
        updateBar();
      }
    }, 100);

    document.getElementById("pump-heart-btn").onclick = (e) => {
      if (!gameActive) return;
      heartLevel += 8;
      spawnFloatingText(e.clientX, e.clientY);

      if (heartLevel >= 100) {
        heartLevel = 100;
        gameActive = false;
        msg.innerHTML =
          '<span class="success-msg">aşkımız hep dolu zaten</span>';
        completeMission("mission-2");
        unlockMission("mission-3");
      }
      updateBar();
    };

    function updateBar() {
      if (heartLevel < 0) heartLevel = 0;
      bar.style.width = heartLevel + "%";
      txt.textContent = Math.floor(heartLevel) + "%";
    }

    function spawnFloatingText(x, y) {
      const words = [
        "askim",
        "canim",
        "bitanem",
        "sevgilim",
        "hayatım",
        "herseyim",
        "bebisim",
        "kalbim",
        "❤️",
      ];
      const el = document.createElement("div");
      el.classList.add("floating-text");
      el.innerText = words[Math.floor(Math.random() * words.length)];
      const randomX = Math.random() * (window.innerWidth - 50);
      el.style.left = randomX + "px";
      el.style.top = y - 50 + "px";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1000);
    }
  }

  // OYUN 3: CRAFT
  document.getElementById("mission-3").addEventListener("click", function () {
    if (this.classList.contains("locked")) return;
    missionsList.style.display = "none";
    document.getElementById("inline-craft-area").style.display = "block";
    startCraftGame();
  });

  function startCraftGame() {
    const slots = document.querySelectorAll(".craft-slot");
    const resultSlot = document.getElementById("craft-result");
    const resetBtn = document.getElementById("reset-craft-btn");
    const msg = document.getElementById("craft-msg");
    let currentSlot = 0;

    slots.forEach((s) => (s.innerHTML = ""));
    resultSlot.innerHTML = "";
    currentSlot = 0;
    msg.innerHTML = "";

    document.querySelectorAll(".inv-item").forEach((item) => {
      item.onclick = function () {
        if (currentSlot < 9) {
          slots[currentSlot].innerHTML = this.innerHTML;
          slots[currentSlot].dataset.type = this.dataset.type;
          currentSlot++;
          checkRecipe();
        }
      };
    });

    resetBtn.onclick = () => {
      slots.forEach((s) => {
        s.innerHTML = "";
        delete s.dataset.type;
      });
      resultSlot.innerHTML = "";
      currentSlot = 0;
    };

    function checkRecipe() {
      const filled = Array.from(slots).filter((s) => s.innerHTML !== "");
      const hasHeart = Array.from(slots).some(
        (s) => s.dataset.type === "heart",
      );
      const hasFlower = Array.from(slots).some(
        (s) => s.dataset.type === "flower",
      );

      if (hasHeart && hasFlower && filled.length >= 2) {
        resultSlot.innerHTML = "💑";
        msg.innerHTML = '<span class="success-msg">bizi inşa ettin 💑</span>';
        completeMission("mission-3");
        unlockMission("mission-4");
      }
    }
  }

  // OYUN 4: PUZZLE
  document.getElementById("mission-4").addEventListener("click", function () {
    if (this.classList.contains("locked")) return;
    missionsList.style.display = "none";
    document.getElementById("inline-puzzle-area").style.display = "block";
    startPuzzleGame();
  });

  function startPuzzleGame() {
    const board = document.getElementById("puzzle-board");
    const msg = document.getElementById("puzzle-msg");
    board.innerHTML = "";
    msg.innerHTML = "";

    const imgUrl = "puzzle.jpg";

    let pieces = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    pieces = pieces.sort(() => Math.random() - 0.5);

    let selectedPiece = null;

    pieces.forEach((pos, index) => {
      const div = document.createElement("div");
      div.classList.add("puzzle-piece");
      div.style.backgroundImage = `url('${imgUrl}')`;
      const row = Math.floor(pos / 3);
      const col = pos % 3;
      div.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
      div.dataset.currentPos = index;
      div.dataset.correctPos = pos;

      div.onclick = function () {
        if (!selectedPiece) {
          selectedPiece = this;
          this.classList.add("selected");
        } else {
          const tempBg = this.style.backgroundPosition;
          const tempCorrect = this.dataset.correctPos;
          this.style.backgroundPosition =
            selectedPiece.style.backgroundPosition;
          this.dataset.correctPos = selectedPiece.dataset.correctPos;
          selectedPiece.style.backgroundPosition = tempBg;
          selectedPiece.dataset.correctPos = tempCorrect;
          selectedPiece.classList.remove("selected");
          selectedPiece = null;
          checkPuzzle();
        }
      };
      board.appendChild(div);
    });

    function checkPuzzle() {
      const allPieces = document.querySelectorAll(".puzzle-piece");
      let isCorrect = true;
      allPieces.forEach((p, i) => {
        if (parseInt(p.dataset.correctPos) !== i) isCorrect = false;
      });

      if (isCorrect) {
        msg.innerHTML = '<span class="success-msg">e cokseliz 🎉</span>';
        completeMission("mission-4");
        unlockMission("mission-5");
      }
    }
  }

  // OYUN 5: ŞİFRE
  document.getElementById("mission-5").addEventListener("click", function () {
    if (this.classList.contains("locked")) return;
    missionsList.style.display = "none";
    document.getElementById("inline-password-area").style.display = "block";
  });

  document
    .getElementById("check-password-btn")
    .addEventListener("click", () => {
      const inputVal = document
        .getElementById("password-input")
        .value.toUpperCase()
        .trim();
      const feedback = document.getElementById("password-feedback");

      if (inputVal === "ASKIM") {
        feedback.innerHTML =
          '<span class="success-msg">Doğru Bildin! Son Adım Kaldı! ❤️</span>';
        completeMission("mission-5");
        unlockMission("mission-6");
        setTimeout(() => window.showMissionsList(), 1500);
      } else {
        feedback.innerHTML =
          '<span class="error-msg">Yanlış Şifre :( Tekrar Dene.</span>';
      }
    });

  // OYUN 6: LABİRENT
  document.getElementById("mission-6").addEventListener("click", function () {
    if (this.classList.contains("locked")) return;
    missionsList.style.display = "none";
    document.getElementById("inline-maze-area").style.display = "block";
    startMazeGame();
  });

  function startMazeGame() {
    const mazeContainer = document.getElementById("maze-container");
    const giftReveal = document.getElementById("gift-reveal");
    const controls = document.querySelector(".maze-controls");
    let mazeMsg = document.getElementById("maze-info-msg");

    if (!mazeMsg) {
      mazeMsg = document.createElement("div");
      mazeMsg.id = "maze-info-msg";
      mazeMsg.style.marginBottom = "10px";
      mazeMsg.style.color = "#ff4f8b";
      mazeMsg.style.fontWeight = "bold";
      mazeContainer.parentNode.insertBefore(mazeMsg, mazeContainer);
    }

    mazeContainer.innerHTML = "";
    giftReveal.style.display = "none";
    controls.style.display = "flex";

    // 15x15 Zor Harita
    const map = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 0, 0, 1, 0, 0, 0, 0, 0, 1, 4, 0, 0, 1],
      [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 4, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 4, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 3, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    let enemies = [
      { x: 5, y: 5, axis: "x", range: 6, dir: 1, currentStep: 0 },
      { x: 2, y: 9, axis: "x", range: 10, dir: 1, currentStep: 0 },
      { x: 13, y: 1, axis: "y", range: 4, dir: 1, currentStep: 0 },
    ];

    let playerPos = { x: 1, y: 1 };
    let keysCollected = 0;
    const totalKeys = 3;
    let gameInterval;

    function drawMaze() {
      mazeContainer.innerHTML = "";
      mazeMsg.textContent = `Anahtarlar: ${keysCollected} / ${totalKeys}`;

      for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
          const cell = document.createElement("div");
          cell.classList.add("maze-cell");
          if (map[y][x] === 1) cell.classList.add("maze-wall");

          if (x === playerPos.x && y === playerPos.y) {
            cell.innerHTML = "❤️";
            cell.classList.add("maze-player");
          } else if (map[y][x] === 4) {
            cell.innerHTML = "🗝️";
            cell.classList.add("maze-key");
          } else if (map[y][x] === 3) {
            cell.classList.add("maze-goal");
            cell.innerHTML = "💌";
            if (keysCollected === totalKeys) cell.classList.add("unlocked");
          }

          let isEnemy = enemies.some((e) => e.x === x && e.y === y);
          if (isEnemy && !(x === playerPos.x && y === playerPos.y)) {
            cell.innerHTML = "💔";
            cell.classList.add("maze-enemy");
          }

          mazeContainer.appendChild(cell);
        }
      }
    }

    function updateEnemies() {
      enemies.forEach((e) => {
        if (e.axis === "x") e.x += e.dir;
        else e.y += e.dir;
        e.currentStep++;
        if (e.currentStep >= e.range) {
          e.dir *= -1;
          e.currentStep = 0;
        }
        if (e.x === playerPos.x && e.y === playerPos.y) playerHit();
      });
      drawMaze();
    }

    function playerHit() {
      playerPos = { x: 1, y: 1 };
      mazeMsg.innerHTML = "💔 YAKALANDIN! BAŞA DÖN! 💔";
      mazeMsg.style.color = "red";
      setTimeout(() => {
        mazeMsg.style.color = "#ff4f8b";
      }, 1000);
      drawMaze();
    }

    function move(dx, dy) {
      const newX = playerPos.x + dx;
      const newY = playerPos.y + dy;
      if (newX < 0 || newY < 0 || newX >= 15 || newY >= 15) return;

      const targetCell = map[newY][newX];

      if (targetCell !== 1) {
        if (enemies.some((e) => e.x === newX && e.y === newY)) {
          playerHit();
          return;
        }

        if (targetCell === 4) {
          map[newY][newX] = 0;
          keysCollected++;
        }
        if (targetCell === 3) {
          if (keysCollected === totalKeys) {
            clearInterval(gameInterval);
            playerPos.x = newX;
            playerPos.y = newY;
            drawMaze();
            setTimeout(() => {
              giftReveal.style.display = "block";
              controls.style.display = "none";
              mazeMsg.textContent = "Kilit Açıldı! ❤️";
              completeMission("mission-6");
            }, 300);
            return;
          } else {
            mazeMsg.innerHTML = "Önce tüm anahtarları topla! 🗝️";
            return;
          }
        }
        playerPos.x = newX;
        playerPos.y = newY;
        drawMaze();
      }
    }

    drawMaze();
    clearInterval(gameInterval);
    gameInterval = setInterval(updateEnemies, 400);

    const obs = new MutationObserver(() => {
      if (
        document.getElementById("inline-maze-area").style.display === "none"
      ) {
        clearInterval(gameInterval);
      }
    });
    obs.observe(document.getElementById("inline-maze-area"), {
      attributes: true,
      attributeFilter: ["style"],
    });

    document.getElementById("m-up").onclick = () => move(0, -1);
    document.getElementById("m-down").onclick = () => move(0, 1);
    document.getElementById("m-left").onclick = () => move(-1, 0);
    document.getElementById("m-right").onclick = () => move(1, 0);

    document.onkeydown = function (e) {
      if (
        document.getElementById("inline-maze-area").style.display === "block"
      ) {
        if (e.key === "ArrowUp") move(0, -1);
        if (e.key === "ArrowDown") move(0, 1);
        if (e.key === "ArrowLeft") move(-1, 0);
        if (e.key === "ArrowRight") move(1, 0);
        e.preventDefault();
      }
    };
  }

  // --- FİNAL KISMI ---
  const rewardBtn = document.getElementById("claim-reward-btn");
  const overlay = document.getElementById("fullscreen-scratch-overlay");

  if (rewardBtn) {
    rewardBtn.addEventListener("click", () => {
      document.getElementById("main-site-container").style.display = "none";
      overlay.style.display = "flex";
      startRealScratchGame();
    });
  }

  function startRealScratchGame() {
    const grid = document.getElementById("scratch-grid-real");
    const msg = document.getElementById("final-result-message");
    const finishBtn = document.getElementById("finish-game-btn");
    grid.innerHTML = "";
    msg.innerHTML = "";
    finishBtn.style.display = "none";

    const grandPrize = { icon: "💍", name: "Akşam Yemeği!" };
    const others = [
      { icon: "🧸", name: "Ayıcık" },
      { icon: "🍫", name: "Çikolata" },
      { icon: "🌹", name: "Gül Buketi" },
    ];

    let cardsData = [];
    cardsData.push(grandPrize, grandPrize, grandPrize);
    cardsData.push(others[0], others[0]);
    cardsData.push(others[1], others[1]);
    cardsData.push(others[2], others[2]);
    cardsData = cardsData.sort(() => Math.random() - 0.5);

    let revealedCounts = {};
    let isGameOver = false;

    cardsData.forEach((item, index) => {
      const cardWrapper = document.createElement("div");
      cardWrapper.classList.add("real-scratch-card");

      const content = document.createElement("div");
      content.classList.add("card-content");
      content.innerHTML = item.icon;

      const canvas = document.createElement("canvas");
      canvas.classList.add("scratch-canvas");
      canvas.width = 200;
      canvas.height = 200;

      cardWrapper.appendChild(content);
      cardWrapper.appendChild(canvas);
      grid.appendChild(cardWrapper);

      const ctx = canvas.getContext("2d");
      let isDrawing = false;
      let isRevealed = false;

      function initCanvas() {
        ctx.fillStyle = "#C0C0C0";
        const grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grd.addColorStop(0, "#e0e0e0");
        grd.addColorStop(1, "#a0a0a0");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = "bold 80px Poppins";
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.textAlign = "center";
        ctx.fillText("?", canvas.width / 2, canvas.height / 2 + 30);
        ctx.globalCompositeOperation = "destination-out";
      }
      initCanvas();

      function scratch(e) {
        if (!isDrawing || isRevealed || isGameOver) return;
        const rect = canvas.getBoundingClientRect();
        let x, y;
        if (e.type.includes("touch")) {
          x = e.touches[0].clientX - rect.left;
          y = e.touches[0].clientY - rect.top;
        } else {
          x = e.clientX - rect.left;
          y = e.clientY - rect.top;
        }
        x = x * (canvas.width / rect.width);
        y = y * (canvas.height / rect.height);
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fill();
        checkRevealPercentage();
      }

      function checkRevealPercentage() {
        if (Math.random() > 0.1) return;
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparentPixels = 0;
        for (let i = 3; i < pixels.length; i += 4) {
          if (pixels[i] === 0) transparentPixels++;
        }
        const percentage = (transparentPixels / (pixels.length / 4)) * 100;
        if (percentage > 40) {
          revealCard();
        }
      }

      function revealCard() {
        if (isRevealed) return;
        isRevealed = true;
        canvas.classList.add("revealed");

        if (!revealedCounts[item.icon]) revealedCounts[item.icon] = 0;
        revealedCounts[item.icon]++;

        if (revealedCounts[item.icon] === 3) {
          isGameOver = true;
          msg.innerHTML = `<span class="success-msg" style="font-size:1.5rem">🎉 TEBRİKLER! <br> 3 Tane ${item.icon} Buldun! <br> Ödülün: ${item.name} 🎉</span>`;
          launchConfetti();

          // EKSİK OLAN KISIM EKLENDİ: BUTON ARTIK GÖRÜNÜYOR
          finishBtn.style.display = "inline-block";

          document
            .querySelectorAll(".scratch-canvas")
            .forEach((c) => c.classList.add("revealed"));
        }
      }

      canvas.addEventListener("mousedown", (e) => {
        isDrawing = true;
        scratch(e);
      });
      canvas.addEventListener("touchstart", (e) => {
        isDrawing = true;
        scratch(e);
        e.preventDefault();
      });
      canvas.addEventListener("mousemove", scratch);
      canvas.addEventListener("touchmove", (e) => {
        scratch(e);
        e.preventDefault();
      });
      canvas.addEventListener("mouseup", () => {
        isDrawing = false;
        checkRevealPercentage();
      });
      canvas.addEventListener("touchend", () => {
        isDrawing = false;
        checkRevealPercentage();
      });
      canvas.addEventListener("mouseleave", () => (isDrawing = false));
    });

    finishBtn.addEventListener("click", () => {
      document.getElementById("fullscreen-scratch-overlay").style.display =
        "none";
      startFinalCinema();
    });
  }

  // --- DÜZELTME: FİNAL SİNEMA SAHNESİ (KAYDIRMA AYARLI) ---
  function startFinalCinema() {
    const overlay = document.getElementById("final-cinema-overlay");
    const textEl = document.getElementById("final-text");
    const credits = document.getElementById("crawling-credits");

    overlay.style.display = "flex";
    // Başlangıçta kaydırmayı kesinlikle kilitle
    overlay.style.overflowY = "hidden";
    overlay.scrollTop = 0;

    const audio = document.getElementById("bg-music");
    if (audio) audio.volume = 0.8;

    // 1. Sahne
    setTimeout(() => {
      textEl.innerText = "Seni Çok Seviyorum...";
      textEl.style.opacity = "1";
    }, 1000);

    setTimeout(() => {
      textEl.style.opacity = "0";
    }, 4000);

    // 2. Sahne
    setTimeout(() => {
      textEl.innerHTML = "Görüşmek üzere<br>Aşkım, Bebeğim, Hayatım...";
      textEl.style.opacity = "1";
    }, 5500);

    setTimeout(() => {
      textEl.style.opacity = "0";
    }, 8500);

    // 3. Sahne: Jenerik Başlıyor
    setTimeout(() => {
      document.getElementById("final-message-container").style.display = "none";
      credits.style.display = "block";

      // ARTIK KAYDIRMAYA İZİN VER
      overlay.style.overflowY = "auto";

      // Otomatik Kaydırma Başlat
      let scrollInterval = setInterval(() => {
        overlay.scrollTop += 1;

        // Eğer sona geldiyse durdur
        if (overlay.scrollTop + overlay.clientHeight >= overlay.scrollHeight) {
          clearInterval(scrollInterval);
        }
      }, 30);

      // Kullanıcı ekrana dokunursa otomatiği durdur
      const stopAutoScroll = () => {
        clearInterval(scrollInterval);
        overlay.removeEventListener("wheel", stopAutoScroll);
        overlay.removeEventListener("touchstart", stopAutoScroll);
        overlay.removeEventListener("mousedown", stopAutoScroll);
      };

      overlay.addEventListener("wheel", stopAutoScroll);
      overlay.addEventListener("touchstart", stopAutoScroll);
      overlay.addEventListener("mousedown", stopAutoScroll);
    }, 10000); // 10 saniye sonra başlar
  }

  function launchConfetti() {
    const colors = [
      "#f44336",
      "#e91e63",
      "#9c27b0",
      "#673ab7",
      "#3f51b5",
      "#2196f3",
      "#03a9f4",
      "#00bcd4",
      "#009688",
      "#4CAF50",
      "#8BC34A",
      "#CDDC39",
      "#FFEB3B",
      "#FFC107",
      "#FF9800",
      "#FF5722",
      "#795548",
    ];
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.style.position = "fixed";
      confetti.style.width = "10px";
      confetti.style.height = "10px";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.top = "-10px";
      confetti.style.zIndex = "100000";
      confetti.style.transition = "top 3s ease-out, transform 3s ease-out";
      document.body.appendChild(confetti);
      setTimeout(() => {
        confetti.style.top = "110vh";
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      }, 100);
      setTimeout(() => confetti.remove(), 3000);
    }
  }

  // --- KESİN ÇALIŞAN HİLE KODU (TEST ETMEK İSTERSEN AÇABİLİRSİN) ---

  setTimeout(() => {
    console.log("🛠️ Hile Aktif Ediliyor...");
    const greeting = document.getElementById("greeting-section");
    const timeline = document.getElementById("timeline-section");
    const loginOverlay = document.getElementById("login-overlay");
    if (greeting) greeting.style.display = "none";
    if (timeline) timeline.style.display = "none";
    if (loginOverlay) loginOverlay.style.display = "none";
    const missionsSec = document.getElementById("missions-section");
    if (missionsSec) {
      missionsSec.style.display = "flex";
      missionsSec.style.opacity = "1";
    }
    document.body.style.overflowY = "auto";
    for (let i = 1; i <= 6; i++) {
      const m = document.getElementById("mission-" + i);
      if (m) {
        m.classList.remove("locked", "unlocked");
        m.classList.add("completed");
        const statusDiv = m.querySelector(".status");
        if (statusDiv) statusDiv.textContent = "✅";
      }
    }
    const rewardBtn = document.getElementById("claim-reward-btn");
    if (rewardBtn) {
      rewardBtn.style.display = "block";
      rewardBtn.style.visibility = "visible";
      rewardBtn.style.opacity = "1";
      setTimeout(() => {
        rewardBtn.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, 1000);
});
