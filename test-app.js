/* eslint-disable jsdoc/require-jsdoc */

import { ProjectCodeChecker } from './src/ProjectCodeChecker.js'
import { FileCodeChecker } from './src/FileCodeChecker.js'
import { ProjectFilesReader } from './src/ProjectFilesReader.js'
import readline from 'readline'

const myProject = new ProjectCodeChecker()
const myFile = new FileCodeChecker('src/FileCodeChecker.js')

const reader = new ProjectFilesReader()

function showMenu () {
  console.log(`
  ***************** Welcome to code statistics **********
  Type in: menu, help - to show this menu
  Type in: file <file path> -  To get code statistics for one file
  Type in: project <project dir path> To get code statistics for one project
  Type in: exit, quit - to exit the program
  `)
}

async function printFileCodeStatistics (userFile) {
  const fileAsText = await reader.convertFileIntoString(userFile)

  console.log('FileCharacters = ', myFile.countFileCodeCharAndWhiteSpaces(fileAsText))
  console.log('FileLines = ', myFile.countFileLines(fileAsText))
  console.log('for loops = ', myFile.countFileForLoops(fileAsText))
  console.log('while and do while loops = ', myFile.countFileWhileAndDoWhileLoops(fileAsText))
  console.log('if statements = ', myFile.countFileIfStatements(fileAsText))
}

async function printProjectCodeStatistics (userProjectRootPath) {
  const projectFilesPathsArray = await reader.getDirectoryFilesPaths(userProjectRootPath)

  console.log('Project Lines = ', await myProject.countProjectLines(projectFilesPathsArray))
  console.log('Project char And WhiteSpaces = ', await myProject.countProjectCharacters(projectFilesPathsArray))

  console.log('Project for loops = ', await myProject.countProjectForLoops(projectFilesPathsArray))
  console.log('Project if statements = ', await myProject.countProjectIfStatements(projectFilesPathsArray))
  console.log('Project while, do while loops = ', await myProject.countProjectWhileAndDoWhileLoops(projectFilesPathsArray))
}

function exitProgram (code) {
  code = code || 0

  console.info('\nExiting with exit status: ' + code)
  process.exit(code)
}
(async function () {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  showMenu()

  rl.setPrompt('Your choice: ')
  rl.prompt()

  rl.on('close', exitProgram)
  rl.on('line', async (input) => {
    input = input.trim()
    const lineArray = input.split(' ')

    switch (lineArray[0]) {
      case 'exit':
      case 'quit':
        exitProgram()
        break
      case 'menu':
      case 'help':
        showMenu()
        break
      case 'file':
        await printFileCodeStatistics(lineArray[1])
        showMenu()
        break
      case 'project':
        await printProjectCodeStatistics(lineArray[1])
        showMenu()
        break
      default:
        showMenu()
        break
    }
    rl.prompt()
  })
})()
