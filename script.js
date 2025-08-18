const tonConnect = new TonConnect({
  manifestUrl: 'https://nft-marketplace-83n3esnua-ivans-projects-dd31026c.vercel.app/tonconnect-manifest.json'
});

const connectBtn = document.getElementById("connect-btn");
const sellerPill = document.getElementById("seller-pill");
const addBtn = document.getElementById("add-btn");
const nftList = document.getElementById("nft-list");

const walletModal = document.getElementById("wallet-modal");
const tonkeeperBtn = document.getElementById("tonkeeper-btn");
const tonhubBtn = document.getElementById("tonhub-btn");
const closeModalBtn = document.getElementById("close-modal");

let currentWallet = null;

// Обновление UI
function updateUI(wallet) {
  if (wallet) {
    currentWallet = wallet;
    connectBtn.textContent = "TON кошелёк подключен ✅";
    sellerPill.textContent = `Продавец: ${wallet.account.address}`;
  } else {
    currentWallet = null;
    connectBtn.textContent = "Подключить TON кошелек";
    sellerPill.textContent = "";
  }
}

// Открытие модального окна
connectBtn.addEventListener("click", () => {
  walletModal.style.display = "flex";
});

// Закрытие модального окна
closeModalBtn.addEventListener("click", () => {
  walletModal.style.display = "none";
});

// Подключение выбранного кошелька
async function connectWithProvider(provider) {
  try {
    const wallet = await tonConnect.connect({
      universalLink: provider === 'tonkeeper' ? 'https://tonkeeper.com/universal-link' : undefined,
      bridgeUrl: provider === 'tonhub' ? 'https://tonhub.com/bridge' : undefined
    });
    updateUI(wallet);
    walletModal.style.display = "none";
    console.log("Подключённый кошелёк:", wallet.account.address);
  } catch (e) {
    console.error("Ошибка подключения кошелька:", e);
    alert("Не удалось подключить кошелёк. Попробуйте снова.");
  }
}

tonkeeperBtn.addEventListener("click", () => connectWithProvider('tonkeeper'));
tonhubBtn.addEventListener("click", () => connectWithProvider('tonhub'));

// Автообновление статуса при изменении кошелька
tonConnect.onStatusChange((wallet) => updateUI(wallet));

// Проверка уже подключенного кошелька при загрузке страницы
(async () => {
  const wallet = await tonConnect.getWallet();
  if (wallet) updateUI(wallet);
})();

// Добавление NFT
addBtn.addEventListener("click", () => {
  if (!currentWallet) {
    alert("Сначала подключите TON-кошелек!");
    return;
  }

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
    <button class="btn" onclick="alert('Покупка пока не реализована')">Купить</button>
  `;

  nftList.appendChild(card);

  // Очистка полей
  document.getElementById("nft-name").value = "";
  document.getElementById("nft-image").value = "";
  document.getElementById("nft-price").value = "";
  document.getElementById("gift-to").value = "";
});
