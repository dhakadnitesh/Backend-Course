const fs = require("fs");
const path = require("path");

const operation = process.argv[2];
const file = process.argv[3];
const content = process.argv[4];

function readFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file '${filePath}': ${err.message}`);
      return;
    }
    console.log(data);
  });
}

function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting file '${filePath}': ${err.message}`);
      return;
    }
    console.log(`File '${filePath}' deleted`);
  });
}

function createFile(filePath) {
  fs.writeFile(filePath, '', (err) => {
    if (err) {
      console.error(`Error creating file '${filePath}': ${err.message}`);
      return;
    }
    console.log(`File '${filePath}' created`);
  });
}

function appendToFile(filePath, content) {
  fs.appendFile(filePath, `${content}\n`, (err) => {
    if (err) {
      console.error(`Error appending to file '${filePath}': ${err.message}`);
      return;
    }
    console.log(`Content appended to the file '${filePath}'`);
  });
}

function renameFile(oldPath, newPath) {
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error(`Error renaming file '${oldPath}' to '${newPath}': ${err.message}`);
      return;
    }
    console.log(`File '${oldPath}' renamed to '${newPath}'`);
  });
}

function listDirectory(dirPath) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error(`Error listing directory '${dirPath}': ${err.message}`);
      return;
    }
    files.forEach(file => {
      console.log(file);
    });
  });
}

switch (operation) {
  case 'read':
    if (!file) {
      console.log('Please specify a file to read');
    } else {
      readFile(file);
    }
    break;
  case 'delete':
    if (!file) {
      console.log('Please specify a file to delete');
    } else {
      deleteFile(file);
    }
    break;
  case 'create':
    if (!file) {
      console.log('Please specify a file to create');
    } else {
      createFile(file);
    }
    break;
  case 'append':
    if (!file || !content) {
      console.log('Please specify a file and content to append');
    } else {
      appendToFile(file, content);
    }
    break;
  case 'rename':
    const newFileName = content;
    if (!file || !newFileName) {
      console.log('Please specify the file to rename and the new file name');
    } else {
      renameFile(file, newFileName);
    }
    break;
  case 'list':
    const dirPath = file || '.';
    listDirectory(dirPath);
    break;
  default:
    console.log(`Invalid operation '${operation}'`);
}
