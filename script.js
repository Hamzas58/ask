document.addEventListener("DOMContentLoaded", () => {
  const audioEl = document.getElementById("bg-music");

  // Müzik Başlatma
  const playMusic = () => {
    audioEl.volume = 0.5;
    audioEl.play().catch(() => {
      document.addEventListener("click", () => audioEl.play(), { once: true });
    });
  };
  playMusic();

  startSiteAnimation();

  // DÜZELTME: Tıklama Kalbi (CSS animasyonunu tetikler)
  document.addEventListener("click", (e) => {
    const clickHeart = document.createElement("div");
    clickHeart.classList.add("click-heart");
    clickHeart.innerHTML = "💖";
    clickHeart.style.left = `${e.clientX}px`;
    clickHeart.style.top = `${e.clientY}px`;
    document.body.appendChild(clickHeart);
    setTimeout(() => clickHeart.remove(), 1000);
  });

  // --- ANİMASYON VE GİRİŞ KISMI ---
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

    // Arka plan kalpleri
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

    // GEÇİŞLER
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

    // Timeline Scroll
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

  // ==========================================
  // --- GÖREV SİSTEMİ MANTIĞI ---
  // ==========================================

  const missionsList = document.getElementById("missions-list");

  // Geri Dönme Fonksiyonunu Global Yap
  window.showMissionsList = () => {
    document
      .querySelectorAll(".inline-task-area")
      .forEach((el) => (el.style.display = "none"));
    missionsList.style.display = "flex";
  };

  function unlockMission(id) {
    const el = document.getElementById(id);
    el.classList.remove("locked");
    el.classList.add("unlocked");
    el.querySelector(".status").textContent = "Oyna";
  }

  function completeMission(id) {
    const el = document.getElementById(id);
    el.classList.remove("unlocked");
    el.classList.add("completed");
    el.querySelector(".status").textContent = "✅";
  }

  // --- GÖREV 1: HAFIZA OYUNU ---
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

  // --- GÖREV 2: KALP POMPALAMA ---
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

  // --- GÖREV 3: MINECRAFT CRAFTING ---
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

  // --- GÖREV 4: PUZZLE ---
  // --- GÖREV 4: PUZZLE ---
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

    // BİLGİSAYARDAKİ FOTOĞRAFIN ADI BURADA YAZMALI:
    // Fotoğrafı index.html'in yanına at ve adını 'puzzle.jpg' yap.
    const imgUrl = "puzzle.jpg";

    let pieces = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    // Karıştır
    pieces = pieces.sort(() => Math.random() - 0.5);

    let selectedPiece = null;

    pieces.forEach((pos, index) => {
      const div = document.createElement("div");
      div.classList.add("puzzle-piece");
      div.style.backgroundImage = `url('${imgUrl}')`;

      // 3x3 Grid Hesaplaması
      const row = Math.floor(pos / 3);
      const col = pos % 3;

      // Arka planı kaydırarak parçayı göster
      div.style.backgroundPosition = `-${col * 100}px -${row * 100}px`; // (300px / 3 = 100px)

      div.dataset.currentPos = index;
      div.dataset.correctPos = pos;

      div.onclick = function () {
        if (!selectedPiece) {
          selectedPiece = this;
          this.classList.add("selected");
        } else {
          // Takas Mantığı
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

  // --- GÖREV 5: ŞİFRE ---
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

  // --- GÖREV 6: LABİRENT (FİNAL) ---
  // --- GÖREV 6: LABİRENT (ANAHTAR TOPLAMALI) ---
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
    const mazeMsg = document.createElement("div"); // Bilgi mesajı için
    mazeMsg.id = "maze-info-msg";
    mazeMsg.style.marginBottom = "10px";
    mazeMsg.style.color = "#ff4f8b";
    mazeMsg.style.fontWeight = "bold";
    mazeContainer.parentNode.insertBefore(mazeMsg, mazeContainer);

    mazeContainer.innerHTML = "";
    giftReveal.style.display = "none";
    controls.style.display = "flex";

    // 0: Yol, 1: Duvar, 2: Başlangıç, 3: Hedef, 4: Anahtar
    // 10x10 Harita Tasarımı (Çözülebilir ve 3 anahtarlı)
    const map = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 0, 0, 1, 4, 0, 0, 0, 1], // Sol üst başlangıç
      [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
      [1, 4, 0, 0, 0, 0, 0, 0, 0, 1], // Bir anahtar burada
      [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 4, 1], // Bir anahtar burada
      [1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 0, 3, 1], // Hedef sağ alt
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    let playerPos = { x: 1, y: 1 };
    let keysCollected = 0;
    const totalKeys = 3;

    function drawMaze() {
      mazeContainer.innerHTML = "";
      mazeMsg.textContent = `Toplanan Anahtar: ${keysCollected} / ${totalKeys}`;

      for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
          const cell = document.createElement("div");
          cell.classList.add("maze-cell");

          if (map[y][x] === 1) cell.classList.add("maze-wall");

          // Oyuncu
          if (x === playerPos.x && y === playerPos.y) {
            cell.innerHTML = "❤️";
            cell.classList.add("maze-player");
          }
          // Anahtar
          else if (map[y][x] === 4) {
            cell.innerHTML = "🗝️";
            cell.classList.add("maze-key");
          }
          // Hedef
          else if (map[y][x] === 3) {
            cell.classList.add("maze-goal");
            cell.innerHTML = "💌";
            if (keysCollected === totalKeys) {
              cell.classList.add("unlocked"); // Kilit açıldı efekti
            }
          }

          mazeContainer.appendChild(cell);
        }
      }
    }

    function move(dx, dy) {
      const newX = playerPos.x + dx;
      const newY = playerPos.y + dy;
      const targetCell = map[newY][newX];

      // Duvar değilse hareket et
      if (targetCell !== 1) {
        // Anahtar Toplama
        if (targetCell === 4) {
          map[newY][newX] = 0; // Anahtarı yoldan kaldır
          keysCollected++;
          // Ufak bir efekt veya ses eklenebilir
        }

        // Hedefe Ulaşma
        if (targetCell === 3) {
          if (keysCollected === totalKeys) {
            // KAZANDIN
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
            // Anahtarlar eksikse gitme
            mazeMsg.innerHTML = "Önce tüm anahtarları toplamalısın! 🗝️";
            mazeMsg.style.animation = "shake 0.3s";
            setTimeout(() => (mazeMsg.style.animation = ""), 300);
            return; // Hareket etme
          }
        }

        // Normal hareket
        playerPos.x = newX;
        playerPos.y = newY;
        drawMaze();
      }
    }

    drawMaze();

    // Buton Kontrolleri
    document.getElementById("m-up").onclick = () => move(0, -1);
    document.getElementById("m-down").onclick = () => move(0, 1);
    document.getElementById("m-left").onclick = () => move(-1, 0);
    document.getElementById("m-right").onclick = () => move(1, 0);

    // Klavye Kontrolleri (PC için)
    document.onkeydown = function (e) {
      if (
        document.getElementById("inline-maze-area").style.display === "block"
      ) {
        if (e.key === "ArrowUp") move(0, -1);
        if (e.key === "ArrowDown") move(0, 1);
        if (e.key === "ArrowLeft") move(-1, 0);
        if (e.key === "ArrowRight") move(1, 0);
      }
    };
  }

  // ==========================================
  // --- FİNAL: GERÇEK KAZI KAZAN OYUNU (CANVAS) ---
  // ==========================================

  const rewardBtn = document.getElementById("claim-reward-btn");
  const overlay = document.getElementById("fullscreen-scratch-overlay");

  // Geri Dönüş Kontrolü (Listeyi göster fonksiyonu)
  window.showMissionsList = () => {
    document
      .querySelectorAll(".inline-task-area")
      .forEach((el) => (el.style.display = "none"));
    missionsList.style.display = "flex";

    // EĞER SON GÖREV BİTTİYSE ÖDÜL BUTONUNU GÖSTER
    const lastMission = document.getElementById("mission-6");
    if (lastMission && lastMission.classList.contains("completed")) {
      rewardBtn.style.display = "block";
      setTimeout(() => {
        rewardBtn.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 500);
    }
  };

  // Ödül Butonuna Tıklama -> Tam Ekranı Aç
  rewardBtn.addEventListener("click", () => {
    // Ana siteyi gizle (isteğe bağlı, performans için iyi)
    document.getElementById("main-site-container").style.display = "none";
    // Overlay'i aç
    overlay.style.display = "flex";
    startRealScratchGame();
  });

  function startRealScratchGame() {
    const grid = document.getElementById("scratch-grid-real");
    const msg = document.getElementById("final-result-message");
    const finishBtn = document.getElementById("finish-game-btn");
    grid.innerHTML = "";
    msg.innerHTML = "";
    finishBtn.style.display = "none";

    // --- ÖDÜLLER ---
    const grandPrize = { icon: "💍", name: "Akşam Yemeği!" };
    const others = [
      { icon: "🧸", name: "Ayıcık" },
      { icon: "🍫", name: "Çikolata" },
      { icon: "🌹", name: "Gül Buketi" },
    ];

    // Listeyi Oluştur (3 tane büyük, 2'şer tane küçük = 9)
    let cardsData = [];
    cardsData.push(grandPrize, grandPrize, grandPrize);
    cardsData.push(others[0], others[0]);
    cardsData.push(others[1], others[1]);
    cardsData.push(others[2], others[2]);
    cardsData = cardsData.sort(() => Math.random() - 0.5);

    let revealedCounts = {};
    let isGameOver = false;
    let totalRevealedCards = 0;

    // 9 Kartı Oluştur
    cardsData.forEach((item, index) => {
      const cardWrapper = document.createElement("div");
      cardWrapper.classList.add("real-scratch-card");

      // 1. Alt Katman (Sembol)
      const content = document.createElement("div");
      content.classList.add("card-content");
      content.innerHTML = item.icon;

      // 2. Üst Katman (Canvas - Kazınacak alan)
      const canvas = document.createElement("canvas");
      canvas.classList.add("scratch-canvas");
      // Canvas boyutunu netlik için ayarla
      canvas.width = 200;
      canvas.height = 200;

      cardWrapper.appendChild(content);
      cardWrapper.appendChild(canvas);
      grid.appendChild(cardWrapper);

      // --- CANVAS ÇİZİM MANTIĞI ---
      const ctx = canvas.getContext("2d");
      let isDrawing = false;
      let isRevealed = false;

      // Canvas'ı Gümüş Renge Boya ve Soru İşareti Koy
      function initCanvas() {
        ctx.fillStyle = "#C0C0C0"; // Gümüş rengi
        // Gradyan efekt (daha gerçekçi)
        const grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grd.addColorStop(0, "#e0e0e0");
        grd.addColorStop(1, "#a0a0a0");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Soru işareti
        ctx.font = "bold 80px Poppins";
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.textAlign = "center";
        ctx.fillText("?", canvas.width / 2, canvas.height / 2 + 30);

        // Kazıma ayarı: Çizilen yerleri şeffaf yap (Silgi modu)
        ctx.globalCompositeOperation = "destination-out";
      }
      initCanvas();

      // Çizim Fonksiyonu
      function scratch(e) {
        if (!isDrawing || isRevealed || isGameOver) return;

        // Mouse veya Dokunmatik koordinatlarını al
        const rect = canvas.getBoundingClientRect();
        let x, y;
        if (e.type.includes("touch")) {
          x = e.touches[0].clientX - rect.left;
          y = e.touches[0].clientY - rect.top;
        } else {
          x = e.clientX - rect.left;
          y = e.clientY - rect.top;
        }

        // Koordinatları canvas boyutuna oranla (CSS'te 100px, Canvas'ta 200px)
        x = x * (canvas.width / rect.width);
        y = y * (canvas.height / rect.height);

        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2); // 25px yarıçaplı daire sil
        ctx.fill();

        checkRevealPercentage();
      }

      // Ne kadar kazındığını kontrol et
      function checkRevealPercentage() {
        // Çok işlem gücü yememesi için sadece çizim bittiğinde (mouseup) kontrol etsek daha iyi ama
        // gerçekçi olması için hareket anında kontrol ediyoruz.
        // Basit bir optimizasyon: Her 10 çizimde bir kontrol et.
        if (Math.random() > 0.1) return;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparentPixels = 0;

        // Pikselleri say (Her 4 değer 1 piksel: R,G,B,Alpha)
        for (let i = 3; i < pixels.length; i += 4) {
          if (pixels[i] === 0) transparentPixels++; // Alpha 0 ise şeffaftır
        }

        const percentage = (transparentPixels / (pixels.length / 4)) * 100;

        // %40'tan fazlası kazındıysa tamamını aç
        if (percentage > 40) {
          revealCard();
        }
      }

      function revealCard() {
        if (isRevealed) return;
        isRevealed = true;
        canvas.classList.add("revealed"); // CSS ile tamamen yok et
        totalRevealedCards++;

        // Sayaç Mantığı
        if (!revealedCounts[item.icon]) revealedCounts[item.icon] = 0;
        revealedCounts[item.icon]++;

        if (revealedCounts[item.icon] === 3) {
          isGameOver = true;
          msg.innerHTML = `<span class="success-msg" style="font-size:1.5rem">🎉 TEBRİKLER! <br> 3 Tane ${item.icon} Buldun! <br> Ödülün: ${item.name} 🎉</span>`;
          launchConfetti();
          finishBtn.style.display = "inline-block";
          // Kalan tüm kartları aç (isteğe bağlı)
          document
            .querySelectorAll(".scratch-canvas")
            .forEach((c) => c.classList.add("revealed"));
        }
      }

      // Event Listener'lar (Hem fare hem dokunmatik için)
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
      }); // Çizim bitince son kez kontrol et
      canvas.addEventListener("touchend", () => {
        isDrawing = false;
        checkRevealPercentage();
      });
      canvas.addEventListener("mouseleave", () => (isDrawing = false));
    });

    // Sürprize Git Butonu (Şimdilik sadece sayfayı yeniler veya bir mesaj verir)
    finishBtn.addEventListener("click", () => {
      alert(
        "Buraya final sayfasına yönlendirme veya başka bir sürpriz eklenecek! ❤️",
      );
      // Örneğin: window.location.href = "final.html";
    });
  }

  // (Konfeti fonksiyonu aynı kalabilir, silmediysen duruyor)
  // ==========================================
  // --- KESİN ÇALIŞAN HİLE KODU ---
  // ==========================================
  /*
  setTimeout(() => {
    console.log("🛠️ Hile Aktif Ediliyor...");

    // 1. Giriş ekranlarını yok et
    const greeting = document.getElementById("greeting-section");
    const timeline = document.getElementById("timeline-section");
    if (greeting) greeting.style.display = "none";
    if (timeline) timeline.style.display = "none";

    // 2. Görevler ekranını aç
    const missionsSec = document.getElementById("missions-section");
    if (missionsSec) {
      missionsSec.style.display = "flex";
      missionsSec.style.opacity = "1";
    }
    document.body.style.overflowY = "auto"; // Kaydırmayı aç

    // 3. Tüm görevleri 'completed' (yeşil tik) yap
    for (let i = 1; i <= 6; i++) {
      const m = document.getElementById("mission-" + i);
      if (m) {
        m.classList.remove("locked", "unlocked");
        m.classList.add("completed");
        const statusDiv = m.querySelector(".status");
        if (statusDiv) statusDiv.textContent = "✅";
      }
    }

    // 4. Ödül butonunu ZORLA göster
    const rewardBtn = document.getElementById("claim-reward-btn");
    if (rewardBtn) {
      // Önce display none'ı kaldır
      rewardBtn.style.display = "block";
      rewardBtn.style.visibility = "visible";
      rewardBtn.style.opacity = "1";

      // Sayfayı en alta kaydır ki butonu gör
      setTimeout(() => {
        rewardBtn.scrollIntoView({ behavior: "smooth", block: "center" });
        console.log("Buton açıldı!");
      }, 100);
    } else {
      console.error("HATA: 'claim-reward-btn' id'li buton HTML'de bulunamadı!");
      alert("HATA: HTML dosyasına butonu eklememişsin!");
    }
  }, 1000); // Sayfa açıldıktan 1 saniye sonra çalışır */
});
