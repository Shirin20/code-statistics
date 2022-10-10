/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable jsdoc/match-description */
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
    if (fileCode.length > 0 && this.#countFileCharOccurrences(fileCode, '\n') === 0) {
      return 1
    } else {
      return 1 + this.#countFileCharOccurrences(fileCode, '\n')
    }
  }

  /**
   * .
   *
   * @param {string} fileCode .
   * @param {string} character .
   * @returns {number} .
   */
  #countFileCharOccurrences (fileCode, character) {
    let charOccurrence = 0
    for (let i = 0; i <= fileCode.length; i++) {
      if (fileCode[i] === character) {
        charOccurrence++
      }
    }
    return charOccurrence
  }

  /**
   * Counts how many times a Control statement occurs in a text.
   *
   * @param {string} fileCode .
   * @returns {number} .
   */
  countFileIfStatements (fileCode) {
    return this.#countFileControlStatements(fileCode, 'if')
  }

  /**
   * Counts how many times a Control statement occurs in a text.
   *
   * @param {string} fileCode .
   * @returns {number} .
   */
  countFileForLoops (fileCode) {
    return this.#countFileControlStatements(fileCode, 'for')
  }

  /**
   * Counts how many times an controlStatement occurs in a text.
   *
   * @param {string} fileCode .
   * @returns {number} .
   */
  countFileWhileAndDoWhileLoops (fileCode) {
    return this.#countFileControlStatements(fileCode, 'while')
  }

  /**
   * Counts how many times a control statement occurs in a file.
   *
   * @param {string} fileCode .
   * @param {string} controlStatement .
   * @returns {number} .
   */
  #countFileControlStatements (fileCode, controlStatement) {
    errorMessage.handleFileError(fileCode)

    const codeWithNoBlockComments = this.#deleteCodeBlockComments(fileCode)

    const codeWithNoLinesComments = this.#deleteCodeLinesComments(codeWithNoBlockComments)

    const numberOfOccurrences = this.#countCodeControlStatements(codeWithNoLinesComments, controlStatement)

    return numberOfOccurrences
  }

  /**
   * Deletes the block commented code from the fileCode.
   *
   * @param {string} fileCode .
   * @returns {string} fileText
   */
  #deleteCodeBlockComments (fileCode) {
    while (this.#isCharFound(fileCode, '/*')) {
      const beginningOfTheComment = this.#indexOfChar(fileCode, '/*')
      const endOfTheComment = this.#indexOfChar(fileCode, '*/')
      const commentedCodeBlock = this.#sliceCodeCommentBlock(fileCode, beginningOfTheComment, endOfTheComment)

      fileCode = this.#replaceItWithEmptyString(fileCode, commentedCodeBlock)
    }
    const noBlockCommentsText = fileCode
    return noBlockCommentsText
  }

  /**
   * In this function -1 means that the specified character doesn't exist .
   *
   * @param {string} fileCode .
   * @param {string} char .
   * @returns {boolean} .
   */
  #isCharFound (fileCode, char) {
    return fileCode.indexOf(char) !== -1
  }

  /**
   * .
   *
   * @param {string} fileCode .
   * @param {string} char .
   * @returns {boolean} .
   */
  #indexOfChar (fileCode, char) {
    return fileCode.indexOf(char)
  }

  /**
   * .
   *
   * @param {string} fileCode .
   * @param {string} beginningOfTheBlock .
   * @param {string} endOfTheBlock .
   * @returns {boolean} .
   */
  #sliceCodeCommentBlock (fileCode, beginningOfTheBlock, endOfTheBlock) {
    return fileCode.slice(beginningOfTheBlock, endOfTheBlock + 2)
  }

  /**
   * .
   *
   * @param {string} fileCode .
   * @param {string} commentedCodeBlock .
   * @returns {string} .
   */
  #replaceItWithEmptyString (fileCode, commentedCodeBlock) {
    return fileCode.replace(commentedCodeBlock, '')
  }

  /**
   * Deletes the code lines comments.
   *
   * @param {string} fileCode to be checked.
   * @returns {Array} Returns the code lines with empty comments
   */
  #deleteCodeLinesComments (fileCode) {
    const lines = this.#getCodeLines(fileCode)
    const arrayOfLinesAndWords = this.#getLinesWords(lines)
    this.#deleteCommentsFromAllLines(arrayOfLinesAndWords)
    return arrayOfLinesAndWords
  }

  /**
   * Returns the text as an array of lines.
   *
   * @param {string} fileCode .
   * @returns {Array} of lines
   */
  #getCodeLines (fileCode) {
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

  #deleteCommentsFromAllLines (arrayOfLinesAndWords) {
    for (let line = 0; line < arrayOfLinesAndWords.length; line++) {
      this.#deleteCommentInEachLine(arrayOfLinesAndWords[line])
    }
  }

  #deleteCommentInEachLine (line, word) {
    for (let word = 0; word < line.length; word++) {
      if (this.#isLineCommentFound(line, word)) {
        this.#deleteWordsAfterLineCommentSign(line)
      }
    }
  }

  #isLineCommentFound (line, word) {
    if (this.#countFileCharOccurrences(line[word], '/') > 1) {
      return true
    }
    return false
  }

  #deleteWordsAfterLineCommentSign (line) {
    line.splice(1, line.length)
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
   * A.
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
