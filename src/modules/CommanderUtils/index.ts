import fs from 'fs';

export const getHasCli = (prefix: string, alias = undefined) => {
    const prefixIndex = process.argv.findIndex(
      (arg) => arg === prefix || (alias && arg === alias)
    );
    return prefixIndex > 0;
};
  
export const getCliData = (prefix: string, alias = undefined) => {
    let data = undefined;
    const prefixIndex = process.argv.findIndex(
      (arg) => arg === prefix || (alias && arg === alias)
    );
    if (prefixIndex > 0) {
      const cliData = process.argv[prefixIndex + 1] ?? undefined;
      if (cliData) {
        data = cliData.includes("-") ? undefined : cliData;
      }
    }
    return data;
};

export function copyDir(from: string, to: string) {
    //makeDir(to)
    fs.cp(from, to, {recursive:true}, () => {});
}

/**
 * 
 * @param path le chemin du répertorie à créer
 * @throws une erreur lorsque le répertorie existe déjà, ou, si un problème est suvenu lors de la création du r^pertoire, propage l'exception levée par {@fs.mkdirSync}
 */
export function makeDir(path: string): void {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    } else {
        throw new Error("le repertoire existe deja")
        //yellowCli.help()
    }
} 