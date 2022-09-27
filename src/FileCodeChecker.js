import { ErrorHandler } from './ErrorHandler.js'
const errorMessage = new ErrorHandler()
/**
 * Produce code statistics for one file
 */
export class FileCodeChecker {
  /**
   * Counts how many times a character occurs in a fileAsText.
   *
   * @param {string} fileAsText .
   * @param {string} character .
   * @returns {number} .
   */
  #countFileCharacterOccurrences (fileAsText, character) {
    let charOccurrence = 0
    for (let i = 0; i <= fileAsText.length; i++) {
      if (fileAsText[i] === character) {
        charOccurrence++
      }
    }
    return charOccurrence
  }

  /**
   * In this function -1 means that the specified character doesn't exist .
   *
   * @param {string} fileAsText .
   * @returns {boolean} .
   */
  #thereAreCodBlockComments (fileAsText) {
    return fileAsText.indexOf('/*') !== -1
  }

  /**
   * Deletes the block commented code from the fileAsText.
   *
   * @param {string} fileAsText .
   * @returns {string} fileText
   */
  #deleteCodBlockComments (fileAsText) {
    while (this.#thereAreCodBlockComments(fileAsText)) {
      const beginningOfTheComment = fileAsText.indexOf('/*')
      const endOfTheComment = fileAsText.indexOf('*/')
      const commentedCodeBlock = fileAsText.slice(beginningOfTheComment, endOfTheComment + 2)
      fileAsText = fileAsText.replace(commentedCodeBlock, '')
    }
    const noBlockCommentsText = fileAsText
    return noBlockCommentsText
  }

  /**
   * Returns the text as an array of lines.
   *
   * @param {string} fileAsText .
   * @returns {Array} of lines
   */
  #getFileTextLines (fileAsText) {
    return fileAsText.split('\n')
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

  /**
   * Deletes the code lines comments.
   *
   * @param {string} fileAsText to be checked.
   * @returns {Array} Returns the code lines with empty comments
   */
  #deleteCodeComments (fileAsText) {
    const fileTextLines = this.#getFileTextLines(fileAsText)
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
   * Counts how many lines are in a file.
   *
   * @param {string} fileAsText .
   * @returns {number} number of lines in the file.
   */
  countFileLines (fileAsText) {
    errorMessage.fileErrorMessage(fileAsText)
    let lines = 0
    if (fileAsText[0] !== undefined) {
      lines = 1 + this.#countFileCharacterOccurrences(fileAsText, '\n')
    }
    return lines
  }

  /**
   * Counts how many times an operation occurs in a text.
   *
   * @param {string} fileAsText .
   * @param {string} operation .
   * @returns {number} .
   */
  countFileOperations (fileAsText, operation) {
    errorMessage.fileErrorMessage(fileAsText)
    const textWithNoCodeBlockComments = this.#deleteCodBlockComments(fileAsText)
    const codeLinesArrays = this.#deleteCodeComments(textWithNoCodeBlockComments)
    let operationOccurrence = 0
    for (let i = 0; i < codeLinesArrays.length; i++) {
      if (codeLinesArrays[i].includes(operation)) {
        operationOccurrence++
      }
    }
    return operationOccurrence
  }

  /**
   * Returns the number of all white spaces and characters in a file.
   *
   * @param {string} fileAsText .
   * @returns {number} .
   */
  countFileCharacters (fileAsText) {
    errorMessage.fileErrorMessage(fileAsText)
    return fileAsText.length
  }
}
