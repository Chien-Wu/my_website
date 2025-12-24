/**
 * Remove backend tool call traces from streaming content
 * @param {string} content - Raw content from backend
 * @returns {string} - Sanitized content
 */
export function sanitizeStreamContent(content) {
  if (!content || typeof content !== 'string') return '';

  let cleaned = content;

  // Remove tool call patterns
  const patterns = [
    // "Calling Call 'Tool Name' with input: {...}"
    /Calling Call ['"]([^'"]+)['"] with input:\s*\{[^}]*\}/gi,

    // "Calling Tool_Name with input: {...}" (without "Call" keyword)
    /Calling\s+[\w_]+\s+with input:\s*\{[^}]*\}/gi,

    // "Calling tool_name(...)"
    /Calling\s+[\w_]+\s*\([^)]*\)/gi,

    // "Tool 'name' started/completed/failed"
    /Tool\s+['"]([^'"]+)['"]\s+(started|completed|failed)/gi,

    // "Function call: {...}"
    /Function\s+call:\s*\{[^}]*\}/gi,

    // "[TOOL] ..." or "[DEBUG] ..." or "[TRACE] ..."
    /\[(TOOL|DEBUG|TRACE)\][^\n]*/gi,
  ];

  patterns.forEach(pattern => {
    cleaned = cleaned.replace(pattern, ' '); // Replace with space instead of empty string
  });

  // Normalize multiple spaces to single space
  cleaned = cleaned.replace(/\s+/g, ' ');

  return cleaned.trim();
}
