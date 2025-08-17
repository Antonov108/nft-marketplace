from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

# Команда /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Кнопка с ссылкой на сайт
    keyboard = [
        [InlineKeyboardButton(
            "Перейти на сайт",
            url="https://nft-marketplace-83n3esnua-ivans-projects-dd31026c.vercel.app"
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(
        "Нажми на кнопку, чтобы открыть сайт:",
        reply_markup=reply_markup
    )

# Основная функция запуска бота
if __name__ == "__main__":
    app = ApplicationBuilder().token("8150989176:AAGqsBN09IEBhGOoj-3Au_F3_OMkFU-TEPY").build()

    # Регистрируем обработчик команды /start
    app.add_handler(CommandHandler("start", start))

    print("✅ Бот запущен. Ожидает сообщений...")
    app.run_polling()
