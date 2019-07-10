'use strict'

module.exports = (str, requiredSubstrings, {
  allowLastSubstringToBleed = false,
  ignoreIndexesOutsideString = false
} = {}) => {
  requiredSubstrings = Object.entries(requiredSubstrings)
  if (requiredSubstrings.length === 0) return true
  let hasRequiredSubstrings = true
  for (let i = 0, len = requiredSubstrings.length; i < len; i++) {
    const index = requiredSubstrings[i][0]
    if (!(ignoreIndexesOutsideString && index > str.length - 1)) {
      let substring = requiredSubstrings[i][1]
      if (allowLastSubstringToBleed) {
        const substringMaxLength = str.length - index
        if (substring.length > substringMaxLength) {
          substring = substring.substr(0, substringMaxLength)
        }
      }
      const target = str.substr(index, substring.length)
      if (substring.localeCompare(target) !== 0) {
        hasRequiredSubstrings = false
        break
      }
    }
  }
  return hasRequiredSubstrings
}
