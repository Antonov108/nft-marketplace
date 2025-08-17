// Инициализация TonConnect
const tonConnect = new TonConnect({ manifestUrl: 'https://YOUR-DEPLOYED-SITE.vercel.app/tonconnect-manifest.json' });

const connectBtn = document.getElementById("connect-btn");
const sellerPill = document.getElementById("seller-pill");

// Кнопка подключения TON кошелька
connectBtn.addEventListener("click", async () => {
  try {
    const wallet = await tonConnect.connect();
    connectBtn.textContent = "TON кошелёк подключен ✅";
    sellerPill.textContent = `Продавец: ${wallet.account.address}`;
    console.log("Подключённый кошелёк:", wallet.account.address);
  } catch (e) {
    console.error("Ошибка подключения кошелька:", e);
    alert("Не удалось подключить кошелёк. Попробуйте снова.");
  }
});

// Простая логика добавления NFT в список
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
    <button class="btn" onclick="alert('Покупка пока не реализована')">Купить</button>
  `;

  nftList.appendChild(card);

  // Очистка полей
  document.getElementById("nft-name").value = "";
  document.getElementById("nft-image").value = "";
  document.getElementById("nft-price").value = "";
  document.getElementById("gift-to").value = "";
});
