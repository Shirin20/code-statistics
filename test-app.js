
import { ProjectCodeChecker } from './src/ProjectCodeChecker.js'
import { FileCodeChecker } from './src/FileCodeChecker.js'
import { ProjectFilesReader } from './src/ProjectFilesReader.js'
import readline from 'readline'

const checkMyProjectCode = new ProjectCodeChecker()
const checkMyFileCode = new FileCodeChecker()

const MyProjectFiles = new ProjectFilesReader()

console.log('welcome to code statistics')
console.log('Choose one of the following')
console.log('Type in \'file\' to get statistics on a file ')
console.log('Type in \'project\' to get statistics on a project')

const userConsole = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

userConsole.question('', async function (userInput) {
  userInput = userInput.trim()
  if (userInput === 'file') {
    userConsole.question('Type in the file path: ', async function (userFile) {
      const fileAsText = await MyProjectFiles.convertFileIntoString(userFile)
      console.log(fileAsText)

      console.log('FileCharacters = ', checkMyFileCode.countFileCharacters(fileAsText))
      console.log('FileLines = ', checkMyFileCode.countFileLines(fileAsText))
      console.log(' for loops = ', checkMyFileCode.countFileOperations(fileAsText, 'for'))
      console.log('while and do while loops = ', checkMyFileCode.countFileOperations(fileAsText, 'while'))
      console.log('if statements = ', checkMyFileCode.countFileOperations(fileAsText, 'if'))
      console.log('white spaces = ', checkMyFileCode.countFileOperations(fileAsText, ''))
      userConsole.close()
    })
  } else if (userInput === 'project') {
    userConsole.question('Type in the folder name ', async function (userProject) {
      const dirFilesArray = await MyProjectFiles.getDirectoryFilesPaths(userProject)
      console.log('Calculating statistics for the following files.....')
      console.log(dirFilesArray)
      console.log('project total lines = ', await checkMyProjectCode.countProjectLines(dirFilesArray))
      console.log('project total characters = ', await checkMyProjectCode.countProjectCharacters(dirFilesArray))
      console.log('project for loops = ', await checkMyProjectCode.countProjectOperations(dirFilesArray, 'for'))
      console.log('project while and do while loops = ', await checkMyProjectCode.countProjectOperations(dirFilesArray, 'while'))
      console.log('project if statements = ', await checkMyProjectCode.countProjectOperations(dirFilesArray, 'if'))
      console.log('project classes = ', await checkMyProjectCode.countProjectOperations(dirFilesArray, 'class'))
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
