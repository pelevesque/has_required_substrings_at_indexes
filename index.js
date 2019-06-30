'use strict'

const isObject = require('isobject')

module.exports = (str, requiredSubstrings, allowSubstringBleeding = false) => {
  if (
    isObject(allowSubstringBleeding) &&
    typeof allowSubstringBleeding.allowSubstringBleeding !== 'undefined'
  ) {
    allowSubstringBleeding = allowSubstringBleeding.allowSubstringBleeding
  }
  requiredSubstrings = Object.entries(requiredSubstrings)
  if (requiredSubstrings.length === 0) return true
  if (requiredSubstrings.length > 0 && str === '') return false
  let hasRequiredSubstrings = true
  for (let i = 0, len = requiredSubstrings.length; i < len; i++) {
    const index = requiredSubstrings[i][0]
    let substring = requiredSubstrings[i][1]
    if (allowSubstringBleeding) {
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
  return hasRequiredSubstrings
}
