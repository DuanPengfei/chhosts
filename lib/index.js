/*
 * @Author: fei
 * @Date: 2019-08-27 10:00:41
 */

const fs = require('fs');
const os = require('os');
const path = require('path');

const inquirer = require('inquirer');

const HOSTS_FILE_PATH = path.resolve(os.homedir(), 'chhosts');

async function main() {
  try {
    fs.accessSync(HOSTS_FILE_PATH, fs.constants.F_OK);
  } catch (err) {
    console.error('hosts file path not exist, please create the path: "~/chhosts", and make sure there is a "default" file');
  }

  const hostsFiles = fs.readdirSync(HOSTS_FILE_PATH);
  const defaultIndex = hostsFiles.indexOf('default');
  if (defaultIndex !== -1) {
    hostsFiles.splice(defaultIndex, 1);
    hostsFiles.unshift('default');
  }

  const questions = [{
    type: 'checkbox',
    name: 'selectedHostsFiles',
    message: 'please select hosts file',
    choices: hostsFiles.map(function (file) {
      if (file === 'default') {
        return {
          value: file,
          checked: true,
        };
      } else {
        return {
          value: file,
        }
      }
    })
  }];
  const answers = await inquirer.prompt(questions);
  const hostsFileContents = answers.selectedHostsFiles.map(function (file) {
    return fs.readFileSync(path.resolve(HOSTS_FILE_PATH, file), 'utf8');
  });

  const hostsFileContent = hostsFileContents.join('\n');

  try {
    fs.accessSync('/etc/hosts', fs.constants.W_OK);
    fs.writeFileSync('/etc/hosts', hostsFileContent, 'utf8');
  } catch (err) {
    console.error('access denied, please use sudo run command');
  }
}

module.exports = main;
