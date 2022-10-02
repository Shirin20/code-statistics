import { ErrorHandler } from './ErrorHandler.js'
const errorMessage = new ErrorHandler()
/**
 * Produce code statistics for one file
 */
export class FileCodeChecker {
  /**
   * Returns the number of all white spaces and characters in a file.
   *
   * @param {string} fileCode .
   * @returns {number} .
   */
  countFileCodeCharAndWhiteSpaces (fileCode) {
    errorMessage.handleFileError(fileCode)
    return fileCode.length
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  countFileLines (fileCode) {
    errorMessage.handleFileError(fileCode)
    return this.#getLinesNumber(fileCode)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  #getLinesNumber (fileCode) {
    if (fileCode.length > 0 && this.#countFileCharacterOccurrences(fileCode, '\n') === 0) {
      return 1
    } else {
      return 1 + this.#countFileCharacterOccurrences(fileCode, '\n')
    }
  }

  /**
   * Counts how many times a character occurs in a fileCode.
   *
   * @param {string} fileCode .
   * @param {string} character .
   * @returns {number} .
   */
  #countFileCharacterOccurrences (fileCode, character) {
    let charOccurrence = 0
    for (let i = 0; i <= fileCode.length; i++) {
      if (fileCode[i] === character) {
        charOccurrence++
      }
    }
    return charOccurrence
  }

  /**
   * Counts how many times an operation occurs in a text.
   *
   * @param {string} fileCode .
   * @returns {number} .
   */
  countFileIfStatements (fileCode) {
    return this.#countFileOperations(fileCode, 'if')
  }

  /**
   * Counts how many times an operation occurs in a text.
   *
   * @param {string} fileCode .
   * @param {string} operation .
   * @returns {number} .
   */
  #countFileOperations (fileCode, operation) {
    errorMessage.handleFileError(fileCode)
    const codeWithNoBlockComments = this.#deleteCodeBlockComments(fileCode)
    const codeWithNoTextStyring = this.#deleteTextStringBlock(codeWithNoBlockComments)
    const codeWithNoLinesComments = this.#deleteCodeComments(codeWithNoTextStyring)
    let operationOccurrence = 0
    for (let i = 0; i < codeWithNoLinesComments.length; i++) {
      if (codeWithNoLinesComments[i].includes(operation)) {
        operationOccurrence++
      }
    }
    return operationOccurrence
  }

  /**
   * Deletes the block commented code from the fileCode.
   *
   * @param {string} fileCode .
   * @returns {string} fileText
   */
  #deleteTextStringBlock (fileCode) {
    while (this.#thereAreCodBlockComments(fileCode)) {
      const beginningOfTheComment = fileCode.indexOf('\'')
      const endOfTheComment = fileCode.indexOf('\'')
      const commentedCodeBlock = fileCode.slice(beginningOfTheComment, endOfTheComment)
      fileCode = fileCode.replace(commentedCodeBlock, '')
    }
    const TextWithNoTextStrings = fileCode
    return TextWithNoTextStrings
  }

  /**
   * Deletes the block commented code from the fileCode.
   *
   * @param {string} fileCode .
   * @returns {string} fileText
   */
  #deleteCodeBlockComments (fileCode) {
    while (this.#thereAreCodBlockComments(fileCode)) {
      const beginningOfTheComment = fileCode.indexOf('/*')
      const endOfTheComment = fileCode.indexOf('*/')
      const commentedCodeBlock = fileCode.slice(beginningOfTheComment, endOfTheComment + 2)
      fileCode = fileCode.replace(commentedCodeBlock, '')
    }
    const noBlockCommentsText = fileCode
    return noBlockCommentsText
  }

  /**
   * In this function -1 means that the specified character doesn't exist .
   *
   * @param {string} fileCode .
   * @returns {boolean} .
   */
  #thereAreCodBlockComments (fileCode) {
    return fileCode.indexOf('/*') !== -1
  }

  /**
   * Deletes the code lines comments.
   *
   * @param {string} fileCode to be checked.
   * @returns {Array} Returns the code lines with empty comments
   */
  #deleteCodeComments (fileCode) {
    const fileTextLines = this.#getFileTextLines(fileCode)
    const fileLinesWithNoComments = this.#getLinesWords(fileTextLines)
    // Delete the words int he line array that contains '//'
    for (let i = 0; i < fileLinesWithNoComments.length; i++) {
      for (let j = 0; j < fileLinesWithNoComments[i].length; j++) {
        if (this.#countFileCharacterOccurrences(fileLinesWithNoComments[i][j], '/') > 1) {
          fileLinesWithNoComments[i].splice(1, fileLinesWithNoComments[i].length)
        }
      }
    }
    return fileLinesWithNoComments
  }

  /**
   * Returns the text as an array of lines.
   *
   * @param {string} fileCode .
   * @returns {Array} of lines
   */
  #getFileTextLines (fileCode) {
    return fileCode.split('\n')
  }

  /**
   * Returns the line as an array of words .
   *
   * @param {string} fileTextLines .
   * @returns {Array} of words
   */
  #getLinesWords (fileTextLines) {
    const LineWords = []
    for (let i = 0; i < fileTextLines.length; i++) {
      LineWords.push(fileTextLines[i].split(' '))
    }
    return LineWords
  }
}
