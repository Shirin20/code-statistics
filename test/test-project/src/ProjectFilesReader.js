import fs from 'node:fs'
import path from 'path'

/**
 * Gets directories and files content and convert them into a string.
 */
export class ProjectFilesReader {
/**
 * Converts the file code content into a string.
 *
 * @param {string}filePath .
 * @returns {string} the file content as a string.
 */
  async convertFileIntoString (filePath) {
    try {
      return await fs.readFileSync(filePath, 'utf8')
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Gets the root files and folders.
   *
   * @param {string}dirRootPath path of the directory from where the contents have to be read.
   * @returns {Array} of file and folder names that the directory contains.
   */
  async #getRootFoldersAndFiles (dirRootPath) {
    try {
      const dirContent = await fs.readdirSync(dirRootPath)
      const dirFilesAndFolders = []
      dirContent.forEach(file => {
        dirFilesAndFolders.push(`${dirRootPath}/${file}`)
      })
      return dirFilesAndFolders
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Returns all the files paths that the project contains.
   *
   * @param {string}dirRootPath .
   * @returns {Array} returns an array of relative paths of all the files in the project.
   */
  async getDirectoryFilesPaths (dirRootPath) {
    try {
      const dirContentArray = await this.#getRootFoldersAndFiles(dirRootPath)
      const allDirFiles = []
      for (let i = 0; i < dirContentArray.length; i++) {
        if (path.extname(dirContentArray[i]) === '') {
          console.log(path.extname(dirContentArray[i]))
          allDirFiles.push(await this.getDirectoryFilesPaths(dirContentArray[i]))
        } else {
          allDirFiles.push(dirContentArray[i])
        }
      }
      return allDirFiles.flat()
    } catch (error) {
      console.log(error)
    }
  }
}
