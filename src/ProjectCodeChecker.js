/* eslint-disable jsdoc/require-jsdoc */
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
    const projectLinesNumber = this.#getLinesTotalNumber(dirFilesPaths)
    return projectLinesNumber
  }

  async #getLinesTotalNumber (dirFilesPaths) {
    let projectLinesNumber = 0
    for (let i = 0; i < dirFilesPaths.length; i++) {
      const fileCode = await projectReader.convertFileIntoString(dirFilesPaths[i])
      const numberOfFileLines = await super.countFileLines(fileCode)
      projectLinesNumber += numberOfFileLines
    }
    return projectLinesNumber
  }

  /**
   * How many times an control statement is used.
   *
   * @param {Array} dirFilesPaths .
   * @returns {number} .
   */
  async countProjectForLoops (dirFilesPaths) {
    errorMessage.handleProjectError(dirFilesPaths)
    const projectForLoopsNumber = this.#getForLoopsTotalNumber(dirFilesPaths, 'for')
    return projectForLoopsNumber
  }

  async #getForLoopsTotalNumber (dirFilesPaths) {
    let projectForLoopsNumber = 0
    for (let i = 0; i < dirFilesPaths.length; i++) {
      const fileAsText = await projectReader.convertFileIntoString(dirFilesPaths[i])
      projectForLoopsNumber += super.countFileForLoops(fileAsText)
    }
    return projectForLoopsNumber
  }

  async countProjectIfStatements (dirFilesPaths) {
    errorMessage.handleProjectError(dirFilesPaths)
    const projectForLoopsNumber = this.#getIfStatementsTotalNumber(dirFilesPaths, 'if')
    return projectForLoopsNumber
  }

  async #getIfStatementsTotalNumber (dirFilesPaths) {
    let projectIfStatementsNumber = 0
    for (let i = 0; i < dirFilesPaths.length; i++) {
      const fileAsText = await projectReader.convertFileIntoString(dirFilesPaths[i])
      projectIfStatementsNumber += super.countFileIfStatements(fileAsText)
    }
    return projectIfStatementsNumber
  }

  async countProjectWhileAndDoWhileLoops (dirFilesPaths) {
    errorMessage.handleProjectError(dirFilesPaths)
    const projectForLoopsNumber = this.#getWileAndDoTotalNumber(dirFilesPaths, 'if')
    return projectForLoopsNumber
  }

  async #getWileAndDoTotalNumber (dirFilesPaths) {
    let projectWileAndDoNumber = 0
    for (let i = 0; i < dirFilesPaths.length; i++) {
      const fileAsText = await projectReader.convertFileIntoString(dirFilesPaths[i])
      projectWileAndDoNumber += super.countFileWhileAndDoWhileLoops(fileAsText)
    }
    return projectWileAndDoNumber
  }

  async countProjectCharacters (dirFilesPaths) {
    errorMessage.handleProjectError(dirFilesPaths)
    const charAndWhiteSpacesNumber = this.#getCharTotalNumber(dirFilesPaths)
    return charAndWhiteSpacesNumber
  }

  async #getCharTotalNumber (dirFilesPaths) {
    let projectCharactersNumber = 0
    for (let i = 0; i < dirFilesPaths.length; i++) {
      const fileAsText = await projectReader.convertFileIntoString(dirFilesPaths[i])
      projectCharactersNumber += super.countFileCodeCharAndWhiteSpaces(fileAsText)
    }
    return projectCharactersNumber
  }
}
