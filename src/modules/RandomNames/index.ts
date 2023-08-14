/**
 * https://www.npmjs.com/package/unique-names-generator
 */
export const machin: string = "allo";


import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';

const customConfig: Config = {
  // dictionaries: [adjectives, colors], // big-donkey
  dictionaries: [adjectives, colors, animals],
  // separator: '-',
  separator: '_',
  length: 3,
};



function getRandomName(): string {
    let nameToReturn: string = uniqueNamesGenerator(customConfig); // big-donkey
    return nameToReturn;
}
  
export default getRandomName;