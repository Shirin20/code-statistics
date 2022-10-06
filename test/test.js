/* eslint-disable jsdoc/match-description */
import { ErrorHandler } from './ErrorHandler.js'
const errorMessage = new ErrorHandler()


  // eslint-disable-next-line jsdoc/require-jsdoc
  #getLinesNumber (fileCode) {
    if (fileCode.length > 0 && this.#countFileCharOccurrences(fileCode, '\n') === 0) {
      return 1
    } else {
      return 1 + this.#countFileCharOccurrences(fileCode, '\n')
    }
  }

  
 
  countFileIfStatements (fileCode) {
    return this.#countFileOperations(fileCode, 'if')
  }

  
  countFileForLoops (fileCode) {
    return this.#countFileOperations(fileCode, 'for')
  }

  countFileWhileAndDoWhileLoops (fileCode) {
    return this.#countFileOperations(fileCode, 'for')
  }

 

  #deleteCodeBlockComments (fileCode) {
    while (this.#isCharFound(fileCode, '/*')) {
      const beginningOfTheComment = this.#indexOfChar(fileCode, '/*')
      const endOfTheComment = this.#indexOfChar(fileCode, '*/')
      const commentedCodeBlock = this.#sliceCodeCommentBlock(fileCode, beginningOfTheComment, endOfTheComment)

      fileCode = this.#replaceCodeBlock(fileCode, commentedCodeBlock)
    }
    const noBlockCommentsText = fileCode
    return noBlockCommentsText
  }

  
  #isCharFound (fileCode, char) {
    return fileCode.indexOf(char) !== -1
  }

  #indexOfChar (fileCode, char) {
    return fileCode.indexOf(char)
  }

 
  #sliceCodeCommentBlock (fileCode, beginningOfTheBlock, endOfTheBlock) {
    return fileCode.slice(beginningOfTheBlock, endOfTheBlock + 2)
  }

  
  #replaceCodeBlock (fileCode, commentedCodeBlock) {
    return fileCode.replace(commentedCodeBlock, '')
  }

 
  #deleteCodeTextStrings (fileCode) {
    let endOfTheString = 0
    while (this.#isCharFound(fileCode, '\'') && endOfTheString !== -1) {
      const beginningOfTheString = this.#indexOfChar(fileCode, '\'')
      endOfTheString = this.#indexOfSecondChar(fileCode, beginningOfTheString, '\'')

      const codeStringBlock = this.#sliceCodeStringBlock(fileCode, beginningOfTheString, endOfTheString)
      fileCode = this.#replaceCodeBlock(fileCode, codeStringBlock)
    }
    const codeWithNoTextStrings = fileCode
    return codeWithNoTextStrings
  }

  
  #indexOfSecondChar (fileCode, firstCharOccurrence, char) {
    return fileCode.indexOf(char, (firstCharOccurrence + 1))
  }

  
  #sliceCodeStringBlock (fileCode, beginningOfTheBlock, endOfTheBlock) {
    return fileCode.slice(beginningOfTheBlock, endOfTheBlock + 1)
  }

  
  #countCodeOperation (codeWithNoStringsOrComments, operation) {
    let operationOccurrence = 0
    for (let i = 0; i < codeWithNoStringsOrComments.length; i++) {
      if (this.#isOperationIsFound(codeWithNoStringsOrComments[i], operation)) {
        operationOccurrence++
      }
    }
    return operationOccurrence
  }

 

  #getCodeLines (fileCode) {
    return fileCode.split('\n')
  }

 
  #getLinesWords (fileTextLines) {
    const LineWords = []
    for (let i = 0; i < fileTextLines.length; i++) {
      LineWords.push(fileTextLines[i].split(' '))
    }
    return LineWords
  }

  

 

  #isLineCommentFound (line, word) {
    if (this.#countFileCharOccurrences(line[word], '/') > 1) {
      return true
    }
    return false
  }

