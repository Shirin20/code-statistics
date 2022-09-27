# code-statistics
Node.js code-statistics library<br/>
Release 1.0.0

* Pure JavaScript
* Show code statistics for your project files written in javascript, java, c++, c.


## Example

* use it to check a file code
```javascript
import { ProjectFilesReader } from './Code-statistics/ProjectFilesReader.js'
import { CheckFileCode } from './Code-statistics/CheckFileCode.js'

const MyFileReader = new ProjectFilesReader()
const checkMyFileCode = new CheckFileCode()

const fileAsText = await MyFileReader.convertFileIntoString('test-folder/test-file1.js')

console.log('FileCharacters = ', checkMyFileCode.countFileCharacters(fileAsText))
console.log('FileLines = ', checkMyFileCode.countFileLines(fileAsText))
console.log('File (for statements) = ', checkMyFileCode.countFileOperations(fileAsText, 'for'))
```
* Use it to check a project code
```javascript
import { CheckProjectCode } from './CheckProjectCode.js'
import { ProjectFilesReader } from './ProjectFilesReader.js'

const MyProjectFiles = new ProjectFilesReader()
const checkMyProjectCode = new CheckProjectCode()


const dirFilesArray = await MyProjectFiles.getDirectoryFilesPaths('folder-example')
console.log('project lines = ', await checkMyProjectCode.countProjectLines(dirFilesArray))
console.log('project characters = ', await checkMyProjectCode.countProjectCharacters(dirFilesArray))
console.log('project Operations = ', await checkMyProjectCode.countProjectOperations(dirFilesArray, 'for'))
```

## Features

+ Reports line counts for one file or a project.
+ Reports characters and whitespace counts for one file or a project.
+ Reports total uses of an operation in one file or a project, Excluding the out commented code.



## Installing

```shell
npm i code-statistics
```
### License  
[MIT](https://libraries.io/licenses/MIT)

### Release  
1.0.0



