
export const config = {
  n8n: {
    webhookUrl: import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://your-n8n-instance.com/webhook',
  },
  adsense: {
    clientId: import.meta.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXXX',
  }
};
