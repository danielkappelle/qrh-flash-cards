const sendTelegram = async (msg: string) => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  const telegramSecret = process.env.TELEGRAM_SECRET;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!telegramSecret || !chatId) return;

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

export const requestAccessTokenTelegram = async (
  email: string,
  token: string
) => {
  await sendTelegram(`Access token requested for ${email}: ${token}`);
};

export const adminLoginTelegram = async () => {
  await sendTelegram('Successful admin login');
};
