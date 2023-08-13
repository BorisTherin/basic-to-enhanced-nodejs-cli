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

### References

 * https://blog.logrocket.com/building-typescript-cli-node-js-commander/#getting-started-configuring-typescript
 * https://www.npmjs.com/package/commander
 * https://www.npmjs.com/package//figlet?activeTab=readme