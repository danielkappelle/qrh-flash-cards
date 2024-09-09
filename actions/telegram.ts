const sendTelegram = async (msg: string) => {
  const telegramSecret = process.env.TELEGRAM_SECRET;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!telegramSecret || !chatId) return;

  if (process.env.NODE_ENV !== 'production') {
    msg = '[DEV] ' + msg;
  }

  const body = { chat_id: chatId, text: msg };

  try {
    await fetch(`https://api.telegram.org/bot${telegramSecret}/sendMessage`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (e) {
    console.error(e);
  }
};

export const requestAccessTokenTelegram = async (email: string) => {
  await sendTelegram(`Access token requested for ${email}`);
};

export const adminLoginTelegram = async () => {
  await sendTelegram('Successful admin login');
};
