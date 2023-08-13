## make your CLI for your project and publish it to npm git GitHub Actions

 * finalize your project deployement
 * have a CLI providing self-installation for every final user
 * have a CLI providing help to configure your project for every final user
 * make it interactive thrue question & final user responses
 * bring enhanced design for the console

### requirements
 * NodeJS & npm (https://nodejs.org/fr/download/package-manager)
 * npmjs.com account &| github account ( https://www.npmjs.com/ https://github.com/ )

### spine-up your CLI project

```bash
mkdir <YOURDIR>
cd <YOURDIR>

npm init -y
npm install commander figlet
npm install @types/node typescript --save-dev
```
 * add your own code, example from: https://blog.logrocket.com/building-typescript-cli-node-js-commander/#getting-started-configuring-typescript
 * src/index.ts
 ```ts
 #! /usr/bin/env node

const { Command } = require("commander")
// import fs and path modules
const fs = require("fs")
const path = require("path")
const figlet = require("figlet")

//add the following line
const program = new Command()

console.log(figlet.textSync("Yellow Manager"))

program
  .version("1.0.0")
  .description("An example CLI for managing a directory")
  .option("-l, --ls  [value]", "List directory contents")
  .option("-m, --mkdir <value>", "Create a directory")
  .option("-t, --touch <value>", "Create a file")
  .parse(process.argv)

const options = program.opts()

//define the following function
export async function listDirContents(filepath: string) {
  try {
    const files = await fs.promises.readdir(filepath)
    const detailedFilesPromises = files.map(async (file: string) => {
      let fileDetails = await fs.promises.lstat(path.resolve(filepath, file))
      const { size, birthtime } = fileDetails
      return { filename: file, "size(KB)": size, created_at: birthtime }
    })
    const detailedFiles = await Promise.all(detailedFilesPromises);
    console.table(detailedFiles);
  } catch (error) {
      console.error("Error occurred while reading the directory!", error)
  }
}

function createDir(filepath: string) {
  if (!fs.existsSync(filepath)) {
    fs.mkdirSync(filepath);
    console.log("The directory has been created successfully");
  }
}

function createFile(filepath: string) {
  fs.openSync(filepath, "w");
  console.log("An empty file has been created");
}

if (options.ls) {
  const filepath = typeof options.ls === "string" ? options.ls : __dirname;
  listDirContents(filepath);
}

if (options.mkdir) {
  createDir(path.resolve(__dirname, options.mkdir));
}

if (options.touch) {
  createFile(path.resolve(__dirname, options.touch));
}

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

 ```


### Making the CLI globally accessible
```bash
sudo npm install -g
```

### install jest for & run tests before publishing
 * ref: https://jestjs.io/docs/getting-started#using-typescript
```bash
npm install --save-dev jest
npm install --save-dev @types/jest
npm install --save-dev babel-jest @babel/core @babel/preset-env
npm install --save-dev @babel/preset-typescript
npm i ts-node
```

### Publish with npm
 * configure your package.json, make sur to have thoses fields completed
```json
{
  "name": "<your_project>",
  "version": "1.0.0",
  "description": "<your_project description>",
  ...
  "keywords": [
    "cli",
    "yellow",
    "npmtool"
  ],
  "author": "author name",
  "license": "whatever",
  "repository": "https://github.com/<your_account>/<your_project>",
  "homepage": "https://github.com/<your_account>/<your_project>#readme",
}
```
 * then
```bash
npm publish
```

### Publish to NPM with GitHuB Action

 * create a new GitHub repo
 * push your project
```bash
git init
git add -A && git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:<YOUR_ACCOUNT>/basic-to-enhanced-nodejs-cli.git
git push -u origin main
```
 * config a GitHub Actions secret
 * login https://www.npmjs.com/ & generate a new Classic publish Token
 * paste that token into Your settings/secrets/actions page
 
 (have a look to (https://blog.logrocket.com/building-typescript-cli-node-js-commander/#getting-started-configuring-typescript) for detailed informations)

```bash
mkdir -p .github/workflows
cd .github/workflows
```
 * create a publish.yml file with
 ```yml
 name: "publish package to npm"

on: push

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v2
      - name: node
        uses: actions/setup-node@v2
        with:
          node-version: 16
          registry-url: https://registry.npmjs.org
      - name: publish
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_AUTH_TOKEN}}
 ```

```bash
git init
git add .
git commit -am "set up github actions"
git push -u origin main
```

 * Now get back to go to https://github.com/<YOUR_ACCOUNT>/basic-to-enhanced-nodejs-cli/actions

 

### References

 * https://blog.logrocket.com/building-typescript-cli-node-js-commander/#getting-started-configuring-typescript
 * https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages
 * https://www.npmjs.com/package/commander
 * https://www.npmjs.com/package//figlet?activeTab=readme
 * https://jestjs.io/docs/getting-started#using-typescript

