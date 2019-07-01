/* global describe, it */
'use strict'

const expect = require('chai').expect
const hasRequiredSubstringsAtIndexes = require('../index')

describe('#hasRequiredSubstringsAtIndexes()', () => {
  describe('value check', () => {
    it('should return true when requiredSubstrings is an empty object', () => {
      const str = ''
      const requiredSubstrings = {}
      const result = hasRequiredSubstringsAtIndexes(str, requiredSubstrings)
      const expected = true
      expect(result).to.equal(expected)
    })

    it('should return false when str is empty, but requiredSubstrings is not empty', () => {
      const str = ''
      const requiredSubstrings = { 0: 'a' }
      const result = hasRequiredSubstringsAtIndexes(str, requiredSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })
  })

  describe('single character substrings', () => {
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

    it('should return false when some of many substrings are not found', () => {
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

  describe('multi character substrings', () => {
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

    it('should return false when some of many substrings are not found', () => {
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

  describe('allowSubstringBleeding flag', () => {
    describe('classic argument style', () => {
      it('should not allow bleeding when set to false', () => {
        const str = 'abcde'
        const requiredSubstrings = { 0: 'abc', 2: 'cde', 4: 'efg' }
        const allowSubstringBleeding = false
        const result = hasRequiredSubstringsAtIndexes(str, requiredSubstrings, allowSubstringBleeding)
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should allow bleeding when set to true', () => {
        const str = 'abcde'
        const requiredSubstrings = { 0: 'abc', 2: 'cde', 4: 'efg' }
        const allowSubstringBleeding = true
        const result = hasRequiredSubstringsAtIndexes(str, requiredSubstrings, allowSubstringBleeding)
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('options style', () => {
      it('should not allow bleeding when set to false', () => {
        const str = 'abcde'
        const requiredSubstrings = { 0: 'abc', 2: 'cde', 4: 'efg' }
        const allowSubstringBleeding = false
        const result = hasRequiredSubstringsAtIndexes(str, requiredSubstrings, {
          allowSubstringBleeding: allowSubstringBleeding
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should allow bleeding when set to true', () => {
        const str = 'abcde'
        const requiredSubstrings = { 0: 'abc', 2: 'cde', 4: 'efg' }
        const allowSubstringBleeding = true
        const result = hasRequiredSubstringsAtIndexes(str, requiredSubstrings, {
          allowSubstringBleeding: allowSubstringBleeding
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })
  })
})
