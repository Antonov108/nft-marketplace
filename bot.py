from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    ApplicationBuilder,
    ContextTypes,
    CommandHandler,
    MessageHandler,
    filters,
)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        InlineKeyboardButton("🔗 Перейти в приложение", url="https://nft-marketplace-83n3esnua-ivans-projects-dd31026c.vercel.app")


    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    await update.message.reply_text(
        "Привет! Я — твой Telegram-бот.\nНажми кнопку ниже, чтобы открыть приложение:",
        reply_markup=reply_markup
    )

async def echo(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_text = update.message.text
    await update.message.reply_text(f"Ты написал: {user_text}")

def main():
    TOKEN = "8150989176:AAGqsBN09IEBhGOoj-3Au_F3_OMkFU-TEPY"

    app = ApplicationBuilder().token(TOKEN).build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))

    print("✅ Бот запущен. Ожидает сообщения...")
    app.run_polling()

if __name__ == "__main__":
    main()
