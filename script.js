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

  // --- GÜNCELLENMİŞ ŞİFRE VE HİLE KONTROLÜ ---
  function checkPassword() {
    const password = passInput.value.trim();

    // Müziği Başlat
    audioEl.volume = 0.5;
    audioEl.play().catch(() => console.log("Otomatik müzik engellendi."));

    // HİLE KODLARI (1, 2, 3, 4, 5)
    if (password === "9" || password === "11") {
      successLogin();
      startSiteAnimation(); // Normal Başlangıç
    } else if (password === "22") {
      successLogin();
      directJump("timeline"); // Bizim Hikayemiz
    } else if (password === "33") {
      successLogin();
      directJump("missions"); // Görevler (Açık Halde)
    } else if (password === "44") {
      successLogin();
      directJump("scratch"); // Kazı Kazan
    } else if (password === "55") {
      successLogin();
      directJump("retro"); // İstatistikler
    } else {
      // Yanlış Şifre
      loginMsg.style.color = "#f44336";
      loginMsg.textContent = "Yanlış Şifre :(";
      passInput.style.animation = "shake 0.3s";
      setTimeout(() => (passInput.style.animation = ""), 300);
      passInput.value = "";
    }
  }

  function successLogin() {
    loginMsg.style.color = "#4CAF50";
    loginMsg.textContent = "Giriş Başarılı! ❤️";
    loginOverlay.style.opacity = "0";
    setTimeout(() => {
      loginOverlay.style.display = "none";
    }, 500);
  }

  // HİLE İÇİN YARDIMCI FONKSİYON (Bunu checkPassword'un altına ekle)
  // HİLE İÇİN YARDIMCI FONKSİYON (GÜNCELLENDİ)
  function directJump(section) {
    // Önce her şeyi gizle
    document.getElementById("greeting-section").style.display = "none";
    document.getElementById("timeline-section").style.display = "none";
    document.getElementById("missions-section").style.display = "none";
    document.getElementById("fullscreen-scratch-overlay").style.display =
      "none";
    document.getElementById("final-retro-overlay").style.display = "none";

    const mainContainer = document.getElementById("main-site-container");
    mainContainer.style.display = "block";

    if (section === "timeline") {
      const tl = document.getElementById("timeline-section");
      tl.style.display = "block";
      setTimeout(() => (tl.style.opacity = "1"), 100);

      // --- DÜZELTME BURADA ---
      // Direkt geçişte animasyon bekleme, hepsini görünür yap:
      setTimeout(() => {
        document.querySelectorAll(".timeline-item").forEach((item) => {
          item.classList.add("visible");
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        });
        // Footer kısmını da aç
        const footerText = document.getElementById("timeline-footer-text");
        if (footerText) footerText.classList.add("visible");

        const contBtn = document.getElementById("continue-timeline-btn");
        if (contBtn) {
          contBtn.style.display = "inline-block";
          contBtn.style.opacity = "1";

          // Butonun çalışması için event listener'ı burada da tanımla
          contBtn.onclick = () => {
            tl.style.opacity = "0";
            setTimeout(() => {
              tl.style.display = "none";
              document.getElementById("missions-section").style.display =
                "flex";
              window.scrollTo({ top: 0, behavior: "smooth" });
              setTimeout(() => {
                document.getElementById("missions-section").style.opacity = "1";
              }, 100);
            }, 800);
          };
        }
      }, 200);
    } else if (section === "missions") {
      const ms = document.getElementById("missions-section");
      ms.style.display = "flex";
      setTimeout(() => (ms.style.opacity = "1"), 100);

      document.querySelectorAll(".mission-card").forEach((card) => {
        card.classList.remove("locked");
        card.classList.add("completed");
        const status = card.querySelector(".status");
        if (status) status.innerText = "✅";
      });
      document.getElementById("claim-reward-btn").style.display = "block";
    } else if (section === "scratch") {
      mainContainer.style.display = "none";
      document.getElementById("fullscreen-scratch-overlay").style.display =
        "flex";
      startRealScratchGame();
    } else if (section === "retro") {
      mainContainer.style.display = "none";
      startFinalCinema();
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
      { text: "zehram", font: "'Caveat', cursive" },
      { text: "askim", font: "'Dancing Script', cursive" },
      { text: "bitanem", font: "'Parisienne', cursive" },
      { text: "hayatım", font: "'Playball', cursive" },
      { text: "herseyim", font: "'Caveat', cursive" },
      { text: "bebisim", font: "'Playball', cursive" },
      { text: "canim", font: "'Parisienne', cursive" },
      { text: "tatli patatesim", font: "'Playball', cursive" },
      { text: "kremalı böreğim", font: "'Dancing Script', cursive" },

      { text: "tatlim", font: "'Playball', cursive" },
      { text: "büyüleyicim", font: "'Caveat', cursive" },
      { text: "güzelim", font: "'Dancing Script', cursive" },
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
        "zehram",
        "güzelim",
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

    const imgUrl = "mine10.jpg";

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
  // --- GÖREV 5: EMOJİ SIRALAMA OYUNU ---
  document.getElementById("mission-5").addEventListener("click", function () {
    if (this.classList.contains("locked")) return;
    missionsList.style.display = "none";
    document.getElementById("inline-sorting-area").style.display = "block";
    startSortingGame();
  });

  function startSortingGame() {
    const sourceContainer = document.getElementById("emoji-source-container");
    const msg = document.getElementById("sorting-msg");
    const boxes = document.querySelectorAll(".sort-box");

    sourceContainer.innerHTML = "";
    boxes.forEach((b) => (b.querySelector(".box-content").innerHTML = ""));
    msg.innerHTML = "";

    // OYUN VERİLERİ
    // user: Ben, partner: Sen, both: İkimiz
    const items = [
      { icon: "♟️", type: "user" }, // Satranç
      { icon: "⚽", type: "user" }, // Futbol
      { icon: "👨", type: "user" }, // Erkek
      { icon: "🏆", type: "user" }, // Winner
      { icon: "👸", type: "partner" }, // Prenses
      { icon: "💄", type: "partner" }, // Makyaj
      { icon: "🎨", type: "partner" }, // Resim
      { icon: "😢", type: "partner" }, // Ağlama
      { icon: "🎮", type: "both" }, // Oyun
      { icon: "⛏️", type: "both" }, // Minecraft
      { icon: "❤️", type: "both" }, // Kalp
    ];

    // Karıştır
    items.sort(() => Math.random() - 0.5);

    let completedCount = 0;

    items.forEach((item) => {
      const el = document.createElement("div");
      el.classList.add("draggable-item");
      el.textContent = item.icon;
      el.dataset.type = item.type;
      el.draggable = true; // PC için

      // --- MOBİL DOKUNMATİK DESTEĞİ ---
      el.addEventListener("touchstart", handleTouchStart, { passive: false });
      el.addEventListener("touchmove", handleTouchMove, { passive: false });
      el.addEventListener("touchend", handleTouchEnd);

      // --- PC MOUSE DESTEĞİ ---
      el.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("type", item.type);
        e.dataTransfer.setData("icon", item.icon);
        setTimeout(() => (el.style.opacity = "0.5"), 0); // Sürüklenirken şeffaflaş
      });
      el.addEventListener("dragend", () => (el.style.opacity = "1"));

      sourceContainer.appendChild(el);
    });

    // --- PC İÇİN DROP MANTIĞI ---
    boxes.forEach((box) => {
      box.addEventListener("dragover", (e) => e.preventDefault()); // Bırakmaya izin ver

      box.addEventListener("drop", (e) => {
        e.preventDefault();
        const draggedType = e.dataTransfer.getData("type");
        const draggedIcon = e.dataTransfer.getData("icon");
        const targetType = box.dataset.target;

        checkDrop(draggedType, targetType, draggedIcon, box, null);
      });
    });

    // --- MOBİL İÇİN TOUCH FONKSİYONLARI ---
    let draggedElement = null;
    let initialX, initialY;

    function handleTouchStart(e) {
      draggedElement = e.target;
      const touch = e.touches[0];
      initialX = touch.clientX - draggedElement.offsetLeft;
      initialY = touch.clientY - draggedElement.offsetTop;
      draggedElement.style.position = "absolute";
      draggedElement.style.zIndex = 1000;
    }

    function handleTouchMove(e) {
      if (!draggedElement) return;
      e.preventDefault(); // Sayfa kaymasını engelle
      const touch = e.touches[0];
      // Parmağın altına taşı
      draggedElement.style.left = touch.clientX - 20 + "px";
      draggedElement.style.top = touch.clientY - 20 + "px";
    }

    function handleTouchEnd(e) {
      if (!draggedElement) return;

      // Bırakılan yerdeki elementi bul
      const touch = e.changedTouches[0];
      draggedElement.style.display = "none"; // Geçici gizle ki alttaki kutuyu görelim
      let dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
      draggedElement.style.display = "block"; // Geri aç

      // En yakın "sort-box" ebeveynini bul
      const box = dropTarget ? dropTarget.closest(".sort-box") : null;

      if (box) {
        checkDrop(
          draggedElement.dataset.type,
          box.dataset.target,
          draggedElement.textContent,
          box,
          draggedElement,
        );
      } else {
        // Boşa bırakıldıysa yerine dön
        resetElement(draggedElement);
      }
      draggedElement = null;
    }

    function resetElement(el) {
      el.style.position = "static";
      el.style.zIndex = "";
      el.style.left = "";
      el.style.top = "";
    }

    // --- ORTAK KONTROL MEKANİZMASI ---
    function checkDrop(itemType, boxType, icon, box, originalElement) {
      if (itemType === boxType) {
        // DOĞRU
        const newEl = document.createElement("div");
        newEl.classList.add("draggable-item", "correct-drop");
        newEl.textContent = icon;
        newEl.style.cursor = "default";
        box.querySelector(".box-content").appendChild(newEl);

        // Orijinal elementi sil (PC'de zaten siliniyor gibi davranır, Mobilde silmemiz lazım)
        if (originalElement) originalElement.remove();
        else {
          // PC için: Kaynaktan sil (Basitçe DOM'u tarayıp eşleşeni silebiliriz)
          const allSources = document.querySelectorAll(
            "#emoji-source-container .draggable-item",
          );
          for (let el of allSources) {
            if (el.textContent === icon && el.style.opacity !== "1") {
              // Sürüklenen öğe
              el.remove();
              break;
            }
          }
        }

        completedCount++;
        if (completedCount === items.length) {
          msg.innerHTML =
            '<span class="success-msg">Harikasın! Bizi çok iyi tanıyorsun! 🎉</span>';
          completeMission("mission-5");
          unlockMission("mission-6");
        }
      } else {
        // YANLIŞ
        msg.innerHTML =
          '<span class="error-msg">Yanlış Kutu! Tekrar dene. 😅</span>';
        box.classList.add("wrong-drop");
        setTimeout(() => box.classList.remove("wrong-drop"), 400);

        if (originalElement) resetElement(originalElement);
      }
    }
  }

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
            // KAZANDIN
            clearInterval(gameInterval);
            playerPos.x = newX;
            playerPos.y = newY;
            drawMaze();

            // Eski gift-reveal yerine MEKTUBU AÇIYORUZ
            setTimeout(() => {
              document.getElementById("letter-overlay").style.display = "flex";
              // Konfeti de yağsın :)
              launchConfetti();
            }, 500);
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

  // --- FİNAL KISMI (KAZI KAZAN ve RETRO) ---
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

    // SENİN BELİRLEDİĞİN SABİT SIRALAMA

    const fixedGrid = [
      { icon: "🧸", name: "Peluş Ayı" }, // 1.1
      { icon: "📷", name: "Mini Kamera" }, // 1.2
      { icon: "👷‍♀️", name: "Lego" }, // 1.3
      { icon: "👷‍♀️", name: "Lego" }, // 2.1
      { icon: "💍", name: "Kolye" }, // 2.2
      { icon: "📷", name: "Mini Kamera" }, // 2.3
      { icon: "💍", name: "Kolye" }, // 3.1
      { icon: "🧸", name: "Peluş Ayı" }, // 3.2
      { icon: "📷", name: "Mini Kamera" }, // 3.3 (KAZANAN)
    ];

    let revealedCounts = {};
    let isGameOver = false;

    fixedGrid.forEach((item) => {
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
        if (isRevealed || isGameOver) return;

        const rect = canvas.getBoundingClientRect();
        let x, y;

        if (e.type.includes("touch")) {
          x = e.touches[0].clientX - rect.left;
          y = e.touches[0].clientY - rect.top;
        } else {
          x = e.clientX - rect.left;
          y = e.clientY - rect.top;
        }

        // Koordinatları canvas boyutuna oranla
        x = x * (canvas.width / rect.width);
        y = y * (canvas.height / rect.height);

        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fill();
        checkRevealPercentage();
      }

      function checkRevealPercentage() {
        if (Math.random() > 0.1) return; // Performans ayarı

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

          // BUTONU GÖSTER
          finishBtn.style.display = "inline-block";

          // Kalanları otomatik aç
          document
            .querySelectorAll(".scratch-canvas")
            .forEach((c) => c.classList.add("revealed"));
        }
      }

      // --- DÜZELTİLMİŞ EVENT LISTENERLAR (TAKILMA YAPMAZ) ---
      canvas.addEventListener("mousedown", (e) => {
        isDrawing = true;
        scratch(e);
      });
      canvas.addEventListener("touchstart", (e) => {
        isDrawing = true;
        scratch(e);
        e.preventDefault();
      });

      canvas.addEventListener("mousemove", (e) => {
        // Sol tık basılıysa (buttons === 1) çizmeye devam et, kutuya girince algılar
        if (e.buttons === 1) {
          isDrawing = true;
          scratch(e);
        }
      });

      canvas.addEventListener("touchmove", (e) => {
        isDrawing = true;
        scratch(e);
        e.preventDefault();
      });

      // Tıklamayı bırakınca çizimi durdur (Global)
      document.addEventListener("mouseup", () => {
        isDrawing = false;
      });
      canvas.addEventListener("touchend", () => {
        isDrawing = false;
        checkRevealPercentage();
      });
    });

    // Butona basınca RETRO EKRANI aç
    // (Önceki listener'ları temizlemek için klonlama hilesi veya basitçe yeniden tanımlama)
    // En temiz yöntem: Butonun eski listener'ını silip yenisini eklemek yerine, butonu HTML'de gizleyip burada gösteriyoruz.
    finishBtn.onclick = () => {
      document.getElementById("fullscreen-scratch-overlay").style.display =
        "none";
      startFinalCinema();
    };
  }

  // --- RETRO PENCERE MODU ---
  // --- RETRO PENCERE MODU (YAVAŞLATILDI) ---
  function startFinalCinema() {
    const overlay = document.getElementById("final-retro-overlay");
    const progressBar = document.getElementById("retro-progress-fill");
    const percentText = document.getElementById("progress-percent-text");
    const endScreen = document.getElementById("the-end-screen");
    const windowBox = document.querySelector(".retro-window");

    // Pencereyi Göster
    overlay.style.display = "flex";

    // Müzik sesini ayarla
    const oldMusic = document.getElementById("bg-music");
    if (oldMusic) oldMusic.pause();

    // 2. Final müziğini başlat
    const finalMusic = document.getElementById("music-final");
    if (finalMusic) {
      finalMusic.volume = 1.0;

      // --- BURASI MÜZİĞİN BAŞLANGIÇ SANİYESİ ---
      // Örnek: 1:20'den başlatmak için (60 + 20) = 80 yaz.
      // Baştan başlaması için 0 yaz.
      finalMusic.currentTime = 83;
      // ------------------------------------------

      finalMusic.play().catch((e) => console.log("Müzik hatası:", e));
    }
    // Yükleme Çubuğu Mantığı
    let progress = 0;

    // Süreyi 30 saniyeye yaymak için: 30000ms / 100 birim = 300ms
    const duration = 400; // Her %1 artış 300ms sürecek (Daha yavaş)

    const loadingInterval = setInterval(() => {
      progress++;
      progressBar.style.width = `${progress}%`;
      percentText.innerText = `${progress}%`;

      if (progress >= 100) {
        clearInterval(loadingInterval);
        setTimeout(() => {
          windowBox.style.display = "none";
          endScreen.style.display = "flex"; // SON ekranı aç

          // --- YENİ EKLENEN KISIM: BUTONU GÖSTER ---
          setTimeout(() => {
            document.getElementById("show-menu-btn").style.opacity = "1";
          }, 2000); // SON yazısından 2 saniye sonra buton belirsin
          // ------------------------------------------
        }, 2000);
      }
    }, duration);
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
  // --- MEKTUP KAPATMA VE ÖDÜLÜ GÖSTERME ---
  const closeLetterBtn = document.getElementById("close-letter-btn");
  if (closeLetterBtn) {
    closeLetterBtn.addEventListener("click", () => {
      // Mektubu kapat
      document.getElementById("letter-overlay").style.display = "none";

      // Görevi tamamla ve listeye dön
      completeMission("mission-6");
      window.showMissionsList();
    });
  }

  // --- HİLE KODU (TEST İÇİN AÇABİLİRSİN) ---
  /*
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
  }, 1000); */
});
