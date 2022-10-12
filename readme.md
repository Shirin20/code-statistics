# code-statistics

Node.js code-statistics library  
Release 1.0.1

## Features

+ Reports line counts for one file or a project.
+ Reports characters and whitespace counts for one file or a project.
+ Reports total uses;
  + If statement.
  + For, while, do while loops.

+ Pure JavaScript
+ Show code statistics for your project files written in javascript, java.

## Example

+ Use it to check a file code

```javascript
import { ProjectFilesReader } from 'Code-statistics/ProjectFilesReader.js'
import { CheckFileCode } from 'Code-statistics/CheckFileCode.js'

const reader = new ProjectFilesReader()
const myFile = new CheckFileCode()

const fileAsText = await reader.convertFileIntoString('test/test-file.js')

console.log('File Lines = ', myFile.countFileLines(fileCode))

console.log('File Char And WhiteSpaces = ', await myFile.countFileCodeCharAndWhiteSpaces(fileCode))

console.log('If statements = ', await myFile.countFileIfStatements(fileCode))

console.log('WhileAnd DoWhileLoops = ', await myFile.countFileWhileAndDoWhileLoops(fileCode))

console.log('For loops = ', await myFile.countFileForLoops(fileCode))
```

The output :

![file output](test/img/file-statistics-output.png "File output")  

+ Use it to check a project

```javascript
import { CheckProjectCode } from './CheckProjectCode.js'
import { ProjectFilesReader } from './ProjectFilesReader.js'

const reader = new ProjectFilesReader()
const myProject = new CheckProjectCode()


const projectFilesPathsArray = await MyProjectFiles.getDirectoryFilesPaths('tets/test-project/src')
console.log('Project Lines = ', await myProject.countProjectLines(projectFilesPathsArray))

console.log('Project char And WhiteSpaces = ', await myProject.countProjectCharacters(projectFilesPathsArray))

console.log('Project for loops = ', await myProject.countProjectForLoops(projectFilesPathsArray))

console.log('Project If statements = ', await myProject.countProjectIfStatements(projectFilesPathsArray))

console.log('Project While, do while loops = ', await myProject.countProjectWhileAndDoWhileLoops(projectFilesPathsArray))
```

The output :

![project output](test/img/project-statistics-output.png "Project output")

## installing

```shell
npm i code-statistics
```

### License  

[MIT](https://libraries.io/licenses/MIT)

### Release  

1.0.1
