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
  test('passing dirFiles folder should total lines number', async () => {
    expect(await projectCode.countProjectLines(dirFiles)).toEqual(548)
  })
})

describe('countProjectForLoops', () => {
  test('passing (dirFiles) folder should return for loops number for all project files', async () => {
    expect(await projectCode.countProjectForLoops(dirFiles)).toEqual(13)
  })
})

describe('countProjectCharacters', () => {
  test('passing (dirFiles) folder should total characters number for all project files ', async () => {
    expect(await projectCode.countProjectCharacters(dirFiles)).toEqual(14944)
  })
})
