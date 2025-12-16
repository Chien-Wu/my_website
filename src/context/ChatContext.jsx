import { createContext, useContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { sendMessage } from '../services/api'
import { parseMessageContent, generateMessageId } from '../utils/messageParser'

const ChatContext = createContext(null)

const STORAGE_KEY = 'terminal_chat_history'
const SESSION_KEY = 'terminal_session_id'

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([])
  const [sessionId, setSessionId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Initialize session and load history
  useEffect(() => {
    // Get or create session ID
    let sid = localStorage.getItem(SESSION_KEY)
    if (!sid) {
      sid = uuidv4()
      localStorage.setItem(SESSION_KEY, sid)
    }
    setSessionId(sid)

    // Load chat history
    const savedHistory = localStorage.getItem(STORAGE_KEY)
    if (savedHistory) {
      try {
        setMessages(JSON.parse(savedHistory))
      } catch (e) {
        console.error('Failed to load chat history:', e)
      }
    }
  }, [])

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    }
  }, [messages])

  /**
   * Send a message to the chatbot with streaming support
   */
  const send = async (messageText) => {
    if (!messageText.trim()) return

    const userMessage = {
      id: generateMessageId(),
      role: 'user',
      content: [{ type: 'text', data: messageText }],
      timestamp: new Date().toISOString(),
    }

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setError(null)

    // Create assistant message placeholder
    const assistantMessageId = generateMessageId()
    const assistantMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: [{ type: 'text', data: '' }],
      timestamp: new Date().toISOString(),
    }

    // Add empty assistant message
    setMessages((prev) => [...prev, assistantMessage])

    try {
      // Buffer for slow typewriter effect
      let buffer = []
      let isTyping = false

      const typeNextChunk = () => {
        if (buffer.length === 0) {
          isTyping = false
          return
        }

        const chunk = buffer.shift()
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? {
                  ...msg,
                  content: [
                    {
                      type: 'text',
                      data: msg.content[0].data + chunk,
                    },
                  ],
                }
              : msg
          )
        )

        setTimeout(typeNextChunk, 50) // 50ms delay per chunk
      }

      // Call API with streaming callback
      await sendMessage(messageText, sessionId, (chunk) => {
        buffer.push(chunk)
        if (!isTyping) {
          isTyping = true
          typeNextChunk()
        }
      })
    } catch (err) {
      setError(err.message)

      // Add error message to chat
      const errorMessage = {
        id: generateMessageId(),
        role: 'error',
        content: [
          {
            type: 'text',
            data: `ERROR: ${err.message}. Please try again.`,
          },
        ],
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Clear chat history
   */
  const clear = () => {
    setMessages([])
    localStorage.removeItem(STORAGE_KEY)

    // Generate new session ID
    const newSessionId = uuidv4()
    setSessionId(newSessionId)
    localStorage.setItem(SESSION_KEY, newSessionId)
  }

  const value = {
    messages,
    sessionId,
    isLoading,
    error,
    send,
    clear,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

/**
 * Hook to use chat context
 */
export function useChat() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within ChatProvider')
  }
  return context
}
