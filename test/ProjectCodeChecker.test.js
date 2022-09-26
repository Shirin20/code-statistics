/**
 * Tests for the ProjectReader module.
 *
 * @author Shirin Meirkhan <sm223qi@student.lnu.se>
 * @version 1.0.0
 */

import { ProjectCodeChecker } from '../src/ProjectCodeChecker.js'
import { ProjectFilesReader } from '../src/ProjectFilesReader'

const dirExtractor = new ProjectFilesReader()
const projectCode = new ProjectCodeChecker()

const dirFiles = await dirExtractor.getDirectoryFilesPaths('src')
// ------------------------------------------------------------------------------
//  countProjectLines
// ------------------------------------------------------------------------------
describe('countProjectLines', () => {
  test('passing dirFiles folder should return 325', async () => {
    expect(await projectCode.countProjectLines(dirFiles)).toEqual(325)
  })
})

describe('countProjectOperations', () => {
  test('passing (dirFiles, \'for\') folder should return 10', async () => {
    expect(await projectCode.countProjectOperations(dirFiles, 'for')).toEqual(10)
  })
})

describe('countProjectCharacters', () => {
  test('passing (dirFiles, \'for\') folder should return 9687', async () => {
    expect(await projectCode.countProjectCharacters(dirFiles)).toEqual(9687)
  })
})
