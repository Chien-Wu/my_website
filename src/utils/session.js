import { v4 as uuidv4 } from 'uuid'

const SESSION_KEY = 'terminal_session_id'

/**
 * Get or create a persistent session ID
 * Shared across all contexts (Chat, Music, etc.)
 */
export function getSessionId() {
  let sessionId = localStorage.getItem(SESSION_KEY)

  if (!sessionId) {
    sessionId = uuidv4()
    localStorage.setItem(SESSION_KEY, sessionId)
  }

  return sessionId
}

/**
 * Generate a new session ID and persist it
 */
export function regenerateSessionId() {
  const sessionId = uuidv4()
  localStorage.setItem(SESSION_KEY, sessionId)
  return sessionId
}

/**
 * Clear the session ID
 */
export function clearSessionId() {
  localStorage.removeItem(SESSION_KEY)
}
