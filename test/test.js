/* global describe, it */
'use strict'

const expect = require('chai').expect
const hasRequiredSubstringsAtIndexes = require('../index')

describe('#hasRequiredSubstringsAtIndexes()', () => {
  describe('without required substrings', () => {
    it('should return true when requiredSubstrings is an empty object', () => {
      const str = ''
      const requiredSubstrings = {}
      const result = hasRequiredSubstringsAtIndexes(str, requiredSubstrings)
      const expected = true
      expect(result).to.equal(expected)
    })
  })

  describe('single character substrings inside string length', () => {
    it('should return false when one of one substring is not found', () => {
      const str = 'abcde'
      const requiredSubstrings = { 2: 'a' }
      const result = hasRequiredSubstringsAtIndexes(str, requiredSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })

    it('should return true when one of one substring is found', () => {
      const str = 'abcde'
      const requiredSubstrings = { 2: 'c' }
      const result = hasRequiredSubstringsAtIndexes(str, requiredSubstrings)
      const expected = true
      expect(result).to.equal(expected)
    })

    it('should return false when none of many substrings are found', () => {
      const str = 'abcde'
      const requiredSubstrings = { 0: 'e', 2: 'a', 4: 'a' }
      const result = hasRequiredSubstringsAtIndexes(str, requiredSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })

    it('should return false when some of many substrings are found', () => {
      const str = 'abcde'
      const requiredSubstrings = { 0: 'e', 2: 'c', 4: 'a' }
      const result = hasRequiredSubstringsAtIndexes(str, requiredSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })

    it('should return true when all of many substrings are found', () => {
      const str = 'abcde'
      const requiredSubstrings = { 0: 'a', 2: 'c', 4: 'e' }
      const result = hasRequiredSubstringsAtIndexes(str, requiredSubstrings)
      const expected = true
      expect(result).to.equal(expected)
    })
  })

  describe('multi character substrings inside string length', () => {
    it('should return false when one of one substring is not found', () => {
      const str = 'abcde'
      const requiredSubstrings = { 2: 'abc' }
      const result = hasRequiredSubstringsAtIndexes(str, requiredSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })

    it('should return true when one of one substring is found', () => {
      const str = 'abcde'
      const requiredSubstrings = { 2: 'cde' }
      const result = hasRequiredSubstringsAtIndexes(str, requiredSubstrings)
      const expected = true
      expect(result).to.equal(expected)
    })

    it('should return false when none of many substrings are found', () => {
      const str = 'abcde'
      const requiredSubstrings = { 0: 'edc', 2: 'bcd', 4: 'abc' }
      const result = hasRequiredSubstringsAtIndexes(str, requiredSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })

    it('should return false when some of many substrings are found', () => {
      const str = 'abcde'
      const requiredSubstrings = { 0: 'edc', 2: 'cde', 4: 'abc' }
      const result = hasRequiredSubstringsAtIndexes(str, requiredSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })

    it('should return true when all of many substrings are found', () => {
      const str = 'abcde'
      const requiredSubstrings = { 0: 'abc', 2: 'cde', 4: 'e' }
      const result = hasRequiredSubstringsAtIndexes(str, requiredSubstrings)
      const expected = true
      expect(result).to.equal(expected)
    })
  })

  describe('ignoreSubstringsOutsideString option', () => {
    it('should default to false', () => {
      const str = 'abcde'
      const requiredSubstrings = { 5: 'fig' }
      const result = hasRequiredSubstringsAtIndexes(str, requiredSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })

    it('should not ignore substrings outside string when set to false', () => {
      const str = 'abcde'
      const requiredSubstrings = { 5: 'fig' }
      const ignoreSubstringsOutsideString = false
      const result = hasRequiredSubstringsAtIndexes(str, requiredSubstrings, {
        ignoreSubstringsOutsideString: ignoreSubstringsOutsideString
      })
      const expected = false
      expect(result).to.equal(expected)
    })

    it('should ignore substrings outside string when set to true', () => {
      const str = 'abcde'
      const requiredSubstrings = { 5: 'fig' }
      const ignoreSubstringsOutsideString = true
      const result = hasRequiredSubstringsAtIndexes(str, requiredSubstrings, {
        ignoreSubstringsOutsideString: ignoreSubstringsOutsideString
      })
      const expected = true
      expect(result).to.equal(expected)
    })
  })

  describe('allowLastSubstringToBleed option', () => {
    it('should default to false', () => {
      const str = 'a big ma'
      const requiredSubstrings = { 6: 'machine' }
      const result = hasRequiredSubstringsAtIndexes(str, requiredSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })

    it('should not allow last substring to bleed when set to false', () => {
      const str = 'a big ma'
      const requiredSubstrings = { 6: 'machine' }
      const allowLastSubstringToBleed = false
      const result = hasRequiredSubstringsAtIndexes(str, requiredSubstrings, {
        allowLastSubstringToBleed: allowLastSubstringToBleed
      })
      const expected = false
      expect(result).to.equal(expected)
    })

    it('should allow last substring to bleed when set to true', () => {
      const str = 'a big ma'
      const requiredSubstrings = { 6: 'machine' }
      const allowLastSubstringToBleed = true
      const result = hasRequiredSubstringsAtIndexes(str, requiredSubstrings, {
        allowLastSubstringToBleed: allowLastSubstringToBleed
      })
      const expected = true
      expect(result).to.equal(expected)
    })
  })
})
