// Инициализация TonConnect
const tonConnect = new TonConnect({
  manifestUrl: 'https://nft-marketplace-83n3esnua-ivans-projects-dd31026c.vercel.app/tonconnect-manifest.json'
});

const connectBtn = document.getElementById("connect-btn");
const sellerPill = document.getElementById("seller-pill");

// Модальное окно
const walletModal = document.getElementById("wallet-modal");
const tonkeeperBtn = document.getElementById("tonkeeper-btn");
const tonhubBtn = document.getElementById("tonhub-btn");
const cancelBtn = document.getElementById("cancel-btn");

// Показать модальное окно при нажатии на кнопку подключения
connectBtn.addEventListener("click", () => {
  walletModal.style.display = "flex";
});

// Отмена
cancelBtn.addEventListener("click", () => {
  walletModal.style.display = "none";
});

// Подключение Tonkeeper
tonkeeperBtn.addEventListener("click", async () => {
  try {
    const wallet = await tonConnect.connect({ appUrl: "tonkeeper://" });
    sellerPill.textContent = `Продавец: ${wallet.account.address}`;
    connectBtn.textContent = "TON кошелёк подключен ✅";
    walletModal.style.display = "none";
    console.log("Подключённый кошелёк:", wallet.account.address);
  } catch (e) {
    console.error("Ошибка подключения Tonkeeper:", e);
    alert("Не удалось подключить Tonkeeper.");
  }
});

// Подключение Tonhub
tonhubBtn.addEventListener("click", async () => {
  try {
    const wallet = await tonConnect.connect({ appUrl: "tonhub://" });
    sellerPill.textContent = `Продавец: ${wallet.account.address}`;
    connectBtn.textContent = "TON кошелёк подключен ✅";
    walletModal.style.display = "none";
    console.log("Подключённый кошелёк:", wallet.account.address);
  } catch (e) {
    console.error("Ошибка подключения Tonhub:", e);
    alert("Не удалось подключить Tonhub.");
  }
});

// Добавление NFT
const addBtn = document.getElementById("add-btn");
const nftList = document.getElementById("nft-list");

addBtn.addEventListener("click", () => {
  const name = document.getElementById("nft-name").value;
  const image = document.getElementById("nft-image").value;
  const price = document.getElementById("nft-price").value;
  const giftTo = document.getElementById("gift-to").value;

  if (!name || !image || !price) {
    alert("Заполните все обязательные поля!");
    return;
  }

  const card = document.createElement("div");
  card.className = "card nft-card";
  card.innerHTML = `
    <img src="${image}" alt="${name}">
    <h3>${name}</h3>
    <p>Цена: ${price} TON</p>
    ${giftTo ? `<p>Для: ${giftTo}</p>` : ""}
    <div class="nft-actions">
      <button class="btn" onclick="alert('Покупка пока не реализована')">Купить</button>
    </div>
  `;

  nftList.appendChild(card);

  // Очистка полей
  document.getElementById("nft-name").value = "";
  document.getElementById("nft-image").value = "";
  document.getElementById("nft-price").value = "";
  document.getElementById("gift-to").value = "";
});
