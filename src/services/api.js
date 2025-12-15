/**
 * API service for n8n backend communication
 */

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || ''

/**
 * Send message to n8n chatbot with streaming support
 * @param {string} message - User message
 * @param {string} sessionId - Session ID for conversation tracking
 * @param {Function} onChunk - Callback for each streaming chunk (text)
 * @returns {Promise<void>}
 */
export async function sendMessage(message, sessionId, onChunk) {
  if (!N8N_WEBHOOK_URL) {
    // Mock response for development
    return mockStreamingResponse(message, onChunk)
  }

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        sessionId,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Read streaming response
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()

      if (done) break

      // Decode chunk and add to buffer
      buffer += decoder.decode(value, { stream: true })

      // Split by newlines to get individual JSON objects
      const lines = buffer.split('\n')

      // Keep last incomplete line in buffer
      buffer = lines.pop() || ''

      // Process each complete line
      for (const line of lines) {
        if (!line.trim()) continue

        try {
          const data = JSON.parse(line)

          // Only process 'item' type chunks with content
          if (data.type === 'item' && data.content) {
            onChunk(data.content)
          }
        } catch (e) {
          console.warn('Failed to parse streaming chunk:', line)
        }
      }
    }
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

/**
 * Mock streaming response for development/testing
 * @param {string} message - User message
 * @param {Function} onChunk - Callback for each chunk
 * @returns {Promise<void>}
 */
async function mockStreamingResponse(message, onChunk) {
  const text = `You said: "${message}". This is a mock streaming response. Configure VITE_N8N_WEBHOOK_URL to connect to your n8n backend.`
  const words = text.split(' ')

  for (const word of words) {
    await new Promise((resolve) => setTimeout(resolve, 100))
    onChunk(word + ' ')
  }
}
