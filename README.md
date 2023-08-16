# What is this ?

Ce package vous permet de générer automatiquement un projet &#128640;Astro.

inspiré de l'excellent & performant template: https://github.com/mhyfritz/astro-landing-page.
Le projet Astro généré comprend:
* **typescript** <sub><sup>&#9989;</sup></sub>
* **preact** <sub><sup>&#9989;</sup></sub>
* **tailwindcss** <sub><sup>&#9989;</sup></sub>
* un composant preact inédit, ```/src/comonents/  YellowMatrix.tsx``` <sub><sup>&#9989;</sup></sub>
  * ce composant est hydraté grace au concept   d'ilôt Astro.
  * il consiste en un CANVAS animé à la facon   Matrix
  * inspiré de l'excellent: https://gist.github.com/MatheusCammargho/119fda289d5fd76d419a31a82369a8fd

## How to use <sub><sup>&#128295;</sup></sub>

```bash
npx create-astro-matrix
```

### Options  <sub><sup>&#128736;</sup></sub>

* `--dir path/to/your/folder`: nom du répertoire ou sera généré le projet, si l'option n'est pas fournit, une chaine de charactère aléatoire sera la valeur par défault.

* `--seo "cuisine, poulet, repas, chaussures, bijoux, or, diamant"`: renseigner les mots-clés pour votre référencement naturel SEO, separé par une virgule, entre guillemets.

* `--company "your company name"`: le nom de l'entreprise ou de l'association pour laquelle vous développez le site web.

* `--help`: Affiche l'aide des options. 

### Examples

```bash
npx create-astro-matrix --dir myNewWebSiite
```

```bash
npx create-astro-matrix --seo "cuisine, poulet, repas, chaussures, bijoux, or, diamant"
```

```bash
npx create-astro-matrix --company "my company"
```
