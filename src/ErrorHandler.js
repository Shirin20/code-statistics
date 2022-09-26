import path from 'path'

/**
 *
 */
export class ErrorHandler {
  /**
   * Returns and throw exceptions if the input does not meet the set requirements .
   *
   * @param {Array} dirFilesPaths - An array.
   */
  projectErrorMessage (dirFilesPaths) {
    if (dirFilesPaths === undefined) {
      throw TypeError('You should pass the files array')
    } else if (!Array.isArray(dirFilesPaths)) {
      throw TypeError('You should pass the files array')
    }
    for (let i = 0; i < dirFilesPaths.length; i++) {
      if (path.extname(dirFilesPaths[i]) === '') {
        throw TypeError('You should pass the files array')
      }
    }
  }

  /**
   * Returns and throw exceptions if the input does not meet the set requirements .
   *
   * @param {string} fileAsText - An array.
   */
  fileErrorMessage (fileAsText) {
    const ERROR_MESSAGE_NOT_A_STRING = 'You should pass the file path string'
    if (fileAsText === undefined) {
      throw TypeError(ERROR_MESSAGE_NOT_A_STRING)
    } else if (Array.isArray(fileAsText)) {
      throw TypeError(ERROR_MESSAGE_NOT_A_STRING)
    } else if (typeof fileAsText === 'object') {
      throw TypeError(ERROR_MESSAGE_NOT_A_STRING)
    }
  }

  /**
   * Returns and throw exceptions if the input does not meet the set requirements .
   *
   * @param {string} operation - An array.
   */
  operationParameterErrorMessage (operation) {
    if (operation === undefined) {
      throw TypeError('You should pass a string')
    } else if (Array.isArray(operation)) {
      throw TypeError('The passed argument should be a string not an array')
    } else if (typeof operation === 'object') {
      throw TypeError('The passed argument should be a string not an object')
    }
  }
}
