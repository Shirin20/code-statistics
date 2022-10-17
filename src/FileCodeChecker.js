/* eslint-disable jsdoc/match-description */
/* eslint-disable jsdoc/require-description */
/* eslint-disable jsdoc/require-jsdoc */
import { ErrorHandler } from './ErrorHandler.js'
import { FileCommentsEraser } from './FileCommentsEraser.js'

const errorMessage = new ErrorHandler()
const commentEraser = new FileCommentsEraser()
/**
 * Produce code statistics for one file
 */
export class FileCodeChecker {
  /**
   * .
   *
   * @param {string} fileCode .
   * @returns {number} .
   */
  countFileCodeCharAndWhiteSpaces (fileCode) {
    errorMessage.handleFileError(fileCode)
    return fileCode.length
  }

  countFileLines (fileCode) {
    errorMessage.handleFileError(fileCode)
    return this.#getLinesNumber(fileCode)
  }

  #getLinesNumber (fileCode) {
    if (fileCode.length > 0 && this.countFileCharOccurrences(fileCode, '\n') === 0) {
      return 1
    } else {
      return 1 + this.countFileCharOccurrences(fileCode, '\n')
    }
  }

  /**
   * .
   *
   * @param {string} fileCode .
   * @param {string} character .
   * @returns {number} .
   */
  countFileCharOccurrences (fileCode, character) {
    let charOccurrence = 0
    for (let i = 0; i <= fileCode.length; i++) {
      if (fileCode[i] === character) {
        charOccurrence++
      }
    }
    return charOccurrence
  }

  /**
   * .
   *
   * @param {string} fileCode .
   * @returns {number} .
   */
  countFileIfStatements (fileCode) {
    return this.#countFileControlStatements(fileCode, 'if')
  }

  /**
   * .
   *
   * @param {string} fileCode .
   * @returns {number} .
   */
  countFileForLoops (fileCode) {
    return this.#countFileControlStatements(fileCode, 'for')
  }

  /**
   * .
   *
   * @param {string} fileCode .
   * @returns {number} .
   */
  countFileWhileAndDoWhileLoops (fileCode) {
    return this.#countFileControlStatements(fileCode, 'while')
  }

  /**
   * .
   *
   * @param {string} fileCode .
   * @param {string} controlStatement .
   * @returns {number} .
   */
  #countFileControlStatements (fileCode, controlStatement) {
    errorMessage.handleFileError(fileCode)

    const codeWithNoBlockComments = commentEraser.deleteCodeBlockComments(fileCode)

    const codeWithNoLinesComments = commentEraser.deleteCodeLinesComments(codeWithNoBlockComments)

    const numberOfOccurrences = this.#countCodeControlStatements(codeWithNoLinesComments, controlStatement)

    return numberOfOccurrences
  }

  /**
   * .
   *
   * @param {Array} codeWithNoStringsOrComments .
   * @param {string} controlStatement  .
   * @returns {number} .
   */
  #countCodeControlStatements (codeWithNoStringsOrComments, controlStatement) {
    let controlStatementOccurrences = 0
    for (let i = 0; i < codeWithNoStringsOrComments.length; i++) {
      if (this.#isControlStatementFound(codeWithNoStringsOrComments[i], controlStatement)) {
        controlStatementOccurrences++
      }
    }
    return controlStatementOccurrences
  }

  /**
   * .
   *
   * @param {string}  code .
   * @param {string}  controlStatement .
   * @returns {boolean}  .
   */
  #isControlStatementFound (code, controlStatement) {
    if (code.includes(controlStatement)) {
      return true
    }
  }
}
