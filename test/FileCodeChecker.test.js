/**
 * Tests for the FileCodeChecker module.
 *
 * @author Shirin Meirkhan <sm223qi@student.lnu.se>
 * @version 1.0.0
 */

import { FileCodeChecker } from '../src/FileCodeChecker.js'
import { ProjectFilesReader } from '../src/ProjectFilesReader'

const dirFile = new ProjectFilesReader()
const checkFileCode = new FileCodeChecker()

const fileAsText = await dirFile.convertFileIntoString('src/FileCodeChecker.js')

/**
 * Tests the argument (exceptions and side effects).
 *
 * @param {Function} func - The function to test.
 */
const testFileClassArgument = (func) => {
  describe('exceptions', () => {
    it('Passing anything but a string should throw TypeError with the custom message \'You should pass the file path string\'', () =>
      testArgumentFilePath(func))
  })
}

/**
 * Tests if the specified function handles an argument
 * that is not an array correctly.
 *
 * @param {Function} func - The function to test.
 */
const testArgumentFilePath = (func) => {
  expect(() => {
    func(1)
    func()
    func([])
    func({})
    func(undefined)
  }).toThrow(new TypeError('You should pass the file path string'))
}

// ------------------------------------------------------------------------------
//  countLines
// ------------------------------------------------------------------------------
describe('countFileLines', () => {
  describe('argument', () => testFileClassArgument(checkFileCode.countFileLines))

  describe('return value', () => {
    it('passing \'src/FileCodeChecker.js\' should return 141', async () => {
      expect(await checkFileCode.countFileLines(fileAsText)).toBe(141)
    })
  })
})

// ------------------------------------------------------------------------------
//  Count characters
// ------------------------------------------------------------------------------
describe('countFileCharacters', () => {
  describe('argument', () => testFileClassArgument(checkFileCode.countFileCharacters))

  describe('return value', () => {
    it('passing \'src/FileCodeChecker.js\' should return 4007', async () => {
      expect(await checkFileCode.countFileCharacters(fileAsText)).toBe(4007)
    })
  })
})

// ------------------------------------------------------------------------------
//  Count operations
// ------------------------------------------------------------------------------
describe('countFileOperations', () => {
  describe('return value', () => {
    it('passing \'src/FileCodeChecker.js\' should return 5', async () => {
      expect(await checkFileCode.countFileOperations(fileAsText, 'for')).toBe(5)
    })
  })
})
