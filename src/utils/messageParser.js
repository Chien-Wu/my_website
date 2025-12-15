/**
 * Parse API response into structured message content
 * @param {Object} response - API response from n8n
 * @returns {Array} - Array of content blocks
 */
export function parseMessageContent(response) {
  // If response already has content array, return it
  if (response.content && Array.isArray(response.content)) {
    return response.content
  }

  // Fallback: if response is just a string, wrap it in text block
  if (typeof response === 'string') {
    return [{ type: 'text', data: response }]
  }

  // Fallback: if response has a 'message' or 'text' field
  if (response.message || response.text) {
    return [{ type: 'text', data: response.message || response.text }]
  }

  // Default: empty text
  return [{ type: 'text', data: '' }]
}

/**
 * Generate unique message ID
 * @returns {string} - Unique ID
 */
export function generateMessageId() {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
