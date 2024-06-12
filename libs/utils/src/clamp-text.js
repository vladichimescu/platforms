const clampText = (text = "", maxChars = 100) =>
  text.length > maxChars ? `${text.slice(0, maxChars).trim()}...` : text

export default clampText
