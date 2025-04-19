interface Config {
  openaiApiKey: string
  apiUrl: string
}

const config: Config = {
  openaiApiKey: import.meta.env.VITE_OPENAI_API_KEY,
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000'
}

// Validate required environment variables
if (!config.openaiApiKey) {
  console.error('Missing required environment variable: VITE_OPENAI_API_KEY')
}

export default config 