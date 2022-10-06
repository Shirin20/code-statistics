/* eslint-disable jsdoc/require-jsdoc */

import { ProjectCodeChecker } from './src/ProjectCodeChecker.js'
import { FileCodeChecker } from './src/FileCodeChecker.js'
import { ProjectFilesReader } from './src/ProjectFilesReader.js'
import readline from 'readline'

const checkMyProjectCode = new ProjectCodeChecker()
const checkMyFileCode = new FileCodeChecker()

const myFile = new ProjectFilesReader()

const fileCode = await myFile.convertFileIntoString('src/FileCodeChecker.js')

// console.log('File Lines = ', checkMyFileCode.countFileLines(fileCode))

// console.log('File Char And WhiteSpaces: ', await checkMyFileCode.countFileCodeCharAndWhiteSpaces(fileCode))

// console.log('If statements: ', await checkMyFileCode.countFileIfStatements(fileCode))

// console.log('WhileAnd DoWhileLoops: ', await checkMyFileCode.countFileWhileAndDoWhileLoops(fileCode))

// console.log('for loops', await checkMyFileCode.countFileForLoops(fileCode))

// // ///////////////////////////////////////////////////////////////
// //                  Project Statistics                          //
// // //////////////////////////////////////////////////////////////

// const projectFiles = await myFile.getDirectoryFilesPaths('src')

// console.log('Project Lines = ', await checkMyProjectCode.countProjectLines(projectFiles))
// console.log('Char And WhiteSpaces: = ', await checkMyProjectCode.countProjectCharacters(projectFiles))

// console.log('Project forLoops = ', await checkMyProjectCode.countProjectForLoops(projectFiles))
// console.log('If statements: ', await checkMyProjectCode.countProjectIfStatements(projectFiles))
// console.log('While do while Loops: ', await checkMyProjectCode.countProjectWhileAndDoWhileLoops(projectFiles))
// // console.log('welcome to code statistics')

function fileOrProject () {
  console.log('Choose one of the following')
  console.log('Type in \'file\' to get statistics on a file ')
  console.log('Type in \'project\' to get statistics on a project')
}

const userConsole = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

userConsole.question(fileOrProject(), async function (userInput) {
  userInput = userInput.trim()
  if (userInput === 'file') {
    userConsole.question('Type in the file path: ', async function (userFile) {
      const fileAsText = await myFile.convertFileIntoString(userFile)

      console.log('FileCharacters = ', checkMyFileCode.countFileCodeCharAndWhiteSpaces(fileAsText))
      console.log('FileLines = ', checkMyFileCode.countFileLines(fileAsText))
      console.log('for loops = ', checkMyFileCode.countFileForLoops(fileAsText))
      console.log('while and do while loops = ', checkMyFileCode.countFileWhileAndDoWhileLoops(fileAsText))
      console.log('if statements = ', checkMyFileCode.countFileIfStatements(fileAsText))
      userConsole.close()
    })
  } else if (userInput === 'project') {
    userConsole.question('Type in the folder name ', async function (userProject) {
      const dirFilesArray = await myFile.getDirectoryFilesPaths(userProject)
      console.log('Calculating statistics for the following files.....')
      console.log(dirFilesArray)
      console.log('project total lines = ', await checkMyProjectCode.countProjectLines(dirFilesArray))
      console.log('project total characters = ', await checkMyProjectCode.countProjectCharacters(dirFilesArray))
      console.log('project for loops = ', await checkMyProjectCode.countProjectForLoops(dirFilesArray))
      console.log('project while and do while loops = ', await checkMyProjectCode.countProjectWhileAndDoWhileLoops(dirFilesArray))
      console.log('project if statements = ', await checkMyProjectCode.countProjectIfStatements(dirFilesArray))
      userConsole.close()
    })
  } else {
    console.log('')
    console.log('Wrong choice restart the program')
    userConsole.close()
  }
})

userConsole.on('close', function () {
  console.log('\n exit !!!')
  process.exit(0)
})
