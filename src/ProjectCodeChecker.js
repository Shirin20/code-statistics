import { FileCodeChecker } from './FileCodeChecker.js'
import { ProjectFilesReader } from './ProjectFilesReader.js'
import { ErrorHandler } from './ErrorHandler.js'

const projectReader = new ProjectFilesReader()
const errorMessage = new ErrorHandler()

/**
 * Produce code statistics for a project.
 */
export class ProjectCodeChecker extends FileCodeChecker {
  /**
   * Counts how many lines are in a project.
   *
   * @param {Array} dirFilesPaths .
   * @returns {number} number of total code and code comments lines in the project.
   */
  async countProjectLines (dirFilesPaths) {
    errorMessage.handleProjectError(dirFilesPaths)
    let projectLinesNumber = 0
    for (let i = 0; i < dirFilesPaths.length; i++) {
      const fileAsText = await projectReader.convertFileIntoString(dirFilesPaths[i])
      const numberOfFileLines = await super.countFileLines(fileAsText)
      projectLinesNumber += numberOfFileLines
    }
    return projectLinesNumber
  }

  /**
   * How many times an operation is used.
   *
   * @param {Array} dirFilesPaths .
   * @param {string} operation .
   * @returns {number} .
   */
  async countProjectOperations (dirFilesPaths, operation) {
    errorMessage.handleStatementsAndLoopsParameterError(operation)
    errorMessage.handleProjectError(dirFilesPaths)
    let projectOperationNumber = 0
    for (let i = 0; i < dirFilesPaths.length; i++) {
      const fileAsText = await projectReader.convertFileIntoString(dirFilesPaths[i])
      projectOperationNumber += super.countFileOperations(fileAsText, operation)
    }
    return projectOperationNumber
  }

  /**
   * Returns the number of all white spaces and characters in a project.
   *
   * @param {string} dirFilesPaths .
   * @returns {number} .
   */
  async countProjectCharacters (dirFilesPaths) {
    errorMessage.handleProjectError(dirFilesPaths)
    let projectCharactersNumber = 0
    for (let i = 0; i < dirFilesPaths.length; i++) {
      const fileAsText = await projectReader.convertFileIntoString(dirFilesPaths[i])
      projectCharactersNumber += this.countFileCharacters(fileAsText)
    }
    return projectCharactersNumber
  }
}
