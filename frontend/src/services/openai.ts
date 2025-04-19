import config from '@/config'

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface ChatResponse {
  response: string
  preferences?: Record<string, any>
  isComplete?: boolean
}

export const chatWithAI = async (messages: ChatMessage[]): Promise<ChatResponse> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that helps users identify their values and preferences for job searching. Focus on ethical considerations and workplace preferences.'
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    })

    if (!response.ok) {
      throw new Error('Failed to get AI response')
    }

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    // Parse the response to extract preferences if they exist
    let preferences = {}
    let isComplete = false

    try {
      const parsedResponse = JSON.parse(aiResponse)
      if (parsedResponse.preferences) {
        preferences = parsedResponse.preferences
      }
      if (parsedResponse.isComplete) {
        isComplete = parsedResponse.isComplete
      }
    } catch (e) {
      // If parsing fails, just use the raw response
    }

    return {
      response: aiResponse,
      preferences,
      isComplete
    }
  } catch (error) {
    console.error('Error in chatWithAI:', error)
    throw error
  }
} 