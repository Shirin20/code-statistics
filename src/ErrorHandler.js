import path from 'path'

/**
 *
 */
export class ErrorHandler {
  /**
   * Returns and throw exceptions if the input is not an array of project files paths .
   *
   * @param {Array} projectFilesPaths .
   */
  handleProjectError (projectFilesPaths) {
    this.#throwErrorIfNotArray(projectFilesPaths)
    this.#throwErrorIfUndefined(projectFilesPaths)
    this.#throwErrorWhenThereOtherThanFiles(projectFilesPaths) // throw error
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  #throwErrorIfNotArray (projectFilesPaths) {
    if (!Array.isArray(projectFilesPaths)) {
      throw TypeError('You should pass an array of the files paths')
    }
  }
  // eslint-disable-next-line lines-between-class-members, jsdoc/require-jsdoc
  #throwErrorIfUndefined (projectFilesPaths) {
    if (projectFilesPaths === undefined) {
      throw TypeError('You should pass the files paths array')
    }
  }

  // eslint-disable-next-line jsdoc/require-description, jsdoc/require-jsdoc
  #throwErrorWhenThereOtherThanFiles (projectFilesPaths) {
    for (let i = 0; i < projectFilesPaths.length; i++) {
      if (path.extname(projectFilesPaths[i]) === '') {
        throw TypeError('The array should only contain file paths')
      }
    }
  }

  /**
   * Returns and throw exceptions if the input is not a file path string .
   *
   * @param {string} filePath .
   */
  handleFileError (filePath) {
    const ERROR_MESSAGE_NOT_A_STRING = 'You should pass the file path string'
    if (filePath === undefined) {
      throw TypeError(ERROR_MESSAGE_NOT_A_STRING)
    } else if (Array.isArray(filePath)) {
      throw TypeError(ERROR_MESSAGE_NOT_A_STRING)
    } else if (typeof filePath === 'object') {
      throw TypeError(ERROR_MESSAGE_NOT_A_STRING)
    }
  }

  /**
   * Returns and throw exceptions if the input does not meet the set requirements .
   *
   * @param {string} statementsAndLoops - An array.
   */
  handleStatementsAndLoopsParameterError (statementsAndLoops) {
    if (statementsAndLoops === undefined) {
      throw TypeError('You should pass a string')
    } else if (Array.isArray(statementsAndLoops)) {
      throw TypeError('The passed argument should be a string not an array')
    } else if (typeof statementsAndLoops === 'object') {
      throw TypeError('The passed argument should be a string not an object')
    }
  }
}
