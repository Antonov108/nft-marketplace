const COMMISSION_ADDRESS = "EQxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const COMMISSION_PERCENT = 0.02;
const MANIFEST_URL = "https://YOUR_DOMAIN/tonconnect-manifest.json";

const tg = window.Telegram && window.Telegram.WebApp;
if(tg) tg.ready();

const connector = new TonConnectSDK.TonConnect({ manifestUrl: MANIFEST_URL });
let currentWallet = null;

const connectBtn = document.getElementById('connect-btn');
const sellerPill = document.getElementById('seller-pill');

connectBtn.addEventListener('click', async () => {
  try {
    await connector.connectWallet();
  } catch(e){
    console.error(e);
  }
});

connector.onStatusChange(wallet => {
  if(wallet && wallet.account){
    currentWallet = wallet.account.address;
    connectBtn.textContent = `✅ ${currentWallet.slice(0,6)}…${currentWallet.slice(-4)}`;
    sellerPill.textContent = `Продавец: ${currentWallet.slice(0,6)}…${currentWallet.slice(-4)}`;
  } else {
    currentWallet = null;
    connectBtn.textContent = '🔗 Подключить TON кошелёк';
    sellerPill.textContent = 'Продавец: не подключен';
  }
});

let nftItems = [];
const nftList = document.getElementById('nft-list');

function renderNFTs(){
  nftList.innerHTML = '';
  if(nftItems.length === 0){
    const empty = document.createElement('div');
    empty.className = 'card';
    empty.textContent = 'Здесь пока пусто.';
    nftList.appendChild(empty);
    return;
  }
  nftItems.forEach((nft, index) => {
    const card = document.createElement('div');
    card.className = 'card nft-card';
    card.innerHTML = `
      <img src="${nft.image}" alt="${nft.name}">
      <h3>${nft.name}</h3>
      <div>${nft.price} TON</div>
      <div class="nft-actions"><button class="btn" onclick="buyNFT(${index})">Купить</button></div>
    `;
    nftList.appendChild(card);
  });
}

document.getElementById('add-btn').addEventListener('click', () => {
  const name = document.getElementById('nft-name').value.trim();
  const image = document.getElementById('nft-image').value.trim();
  const price = document.getElementById('nft-price').value.trim();
  if(!currentWallet){ alert('Подключите TON кошелёк.'); return; }
  if(!name || !image || !price){ alert('Заполните все поля.'); return; }
  nftItems.push({ name, image, price, seller: currentWallet });
  document.getElementById('nft-name').value = '';
  document.getElementById('nft-image').value = '';
  document.getElementById('nft-price').value = '';
  renderNFTs();
});

async function buyNFT(index){
  const nft = nftItems[index];
  if(!currentWallet){ alert('Подключите кошелёк для оплаты.'); return; }
  const amountNano = Math.round(parseFloat(nft.price) * 1e9);
  const commissionNano = Math.floor(amountNano * COMMISSION_PERCENT);
  const sellerNano = amountNano - commissionNano;
  const messages = [
    { address: nft.seller, amount: sellerNano.toString() },
    { address: COMMISSION_ADDRESS, amount: commissionNano.toString() }
  ];
  try {
    await connector.sendTransaction({ messages, validUntil: Math.floor(Date.now()/1000) + 300 });
    alert('Оплата отправлена.');
  } catch(e){
    console.error(e);
    alert('Ошибка при оплате.');
  }
}

window.buyNFT = buyNFT;
renderNFTs();
