## make your CLI for your project and publish it to npm git GitHub Actions

 * finalize your project deployement
 * have a CLI providing self-installation for every final user
 * have a CLI providing help to configure your project for every final user
 * make it interactive thrue question & final user responses
 * bring enhanced design for the console


### spine-up the project

```bash
mkdir <YOURDIR>
cd <YOURDIR>

npm init -y
npm install commander figlet
npm install @types/node typescript --save-dev

```

### Making the CLI globally accessible
```bash
sudo npm install -g
```

### Publish to NPM

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
 * create a publish.yml with
 ```
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
 * https://www.npmjs.com/package/commander
 * https://www.npmjs.com/package//figlet?activeTab=readme

