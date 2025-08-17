import requests

TOKEN = "8150989176:AAGqsBN09IEBhGOoj-3Au_F3_OMkFU-TEPY"
url = f"https://api.telegram.org/bot{TOKEN}/getMe"

try:
    response = requests.get(url, timeout=10)
    response.raise_for_status()
    print("Ответ от Telegram API:", response.json())
except requests.exceptions.Timeout:
    print("Ошибка: Таймаут при подключении к Telegram API.")
except requests.exceptions.RequestException as e:
    print(f"Ошибка подключения: {e}")
