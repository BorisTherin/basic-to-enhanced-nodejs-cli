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
  