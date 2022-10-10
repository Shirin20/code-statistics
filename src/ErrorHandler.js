import path from 'path'

/**
 *
 */
export class ErrorHandler {
  /**
   * Returns and throw exceptions if the input is not an array of project files paths .
   *
   * @param {Array} projectFilesPathsArray .
   */
  handleProjectError (projectFilesPathsArray) {
    this.#throwErrorIfNotArray(projectFilesPathsArray)
    this.#throwErrorIfUndefined(projectFilesPathsArray)
    this.#throwErrorWhenThereOtherThanFiles(projectFilesPathsArray) // throw error
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  #throwErrorIfNotArray (projectFilesPathsArray) {
    if (!Array.isArray(projectFilesPathsArray)) {
      throw TypeError('You should pass an array of the files paths')
    }
  }
  // eslint-disable-next-line lines-between-class-members, jsdoc/require-jsdoc
  #throwErrorIfUndefined (projectFilesPathsArray) {
    if (projectFilesPathsArray === undefined) {
      throw TypeError('You should pass the files paths array')
    }
  }

  // eslint-disable-next-line jsdoc/require-description, jsdoc/require-jsdoc
  #throwErrorWhenThereOtherThanFiles (projectFilesPathsArray) {
    for (let i = 0; i < projectFilesPathsArray.length; i++) {
      if (path.extname(projectFilesPathsArray[i]) === '') {
        throw TypeError('The array should only contain file paths')
      }
    }
  }

  /**
   * Returns and throw exceptions if the input is not a file path string .
   *
   * @param {string} fileCode .
   */
  handleFileError (fileCode) {
    if (fileCode === undefined) {
      throw TypeError('you should pass your file content!')
    } else if (Array.isArray(fileCode)) {
      throw TypeError('you should pass your file content as a string not an array!')
    } else if (typeof fileCode === 'object') {
      throw TypeError('you should pass your file content as a string not an object!')
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
