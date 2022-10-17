/* eslint-disable jsdoc/match-description */
/* eslint-disable jsdoc/require-description */
/* eslint-disable jsdoc/require-jsdoc */

export class FileCommentsEraser {
  /**
   * .
   *
   * @param {string} fileCode .
   * @returns {string} fileText
   */
  deleteCodeBlockComments (fileCode) {
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
   * .
   *
   * @param {string} fileCode to be checked.
   * @returns {Array} Returns the code lines with empty comments
   */
  deleteCodeLinesComments (fileCode) {
    const lines = this.#getCodeLines(fileCode)

    const arrayOfLinesAndWords = this.#getLinesWords(lines)

    this.#deleteCommentsFromAllLines(arrayOfLinesAndWords)

    const arrayOfLinesWithNoComments = arrayOfLinesAndWords
    return arrayOfLinesWithNoComments
  }

  /**
   * .
   *
   * @param {string} fileCode .
   * @returns {Array} of lines
   */
  #getCodeLines (fileCode) {
    return fileCode.split('\n')
  }

  /**
   * .
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
    if (this.#countCharOccurrences(line[word], '/') > 1) {
      return true
    }
    return false
  }

  /**
   * .
   *
   * @param {string} code .
   * @param {string} character .
   * @returns {number} .
   */
  #countCharOccurrences (code, character) {
    let charOccurrence = 0
    for (let i = 0; i <= code.length; i++) {
      if (code[i] === character) {
        charOccurrence++
      }
    }
    return charOccurrence
  }

  #deleteWordsAfterLineCommentSign (line) {
    line.splice(1, line.length)
  }
}
