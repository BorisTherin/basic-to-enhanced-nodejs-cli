# What is this ?

Ce package vous permet de générer automatiquement un projet Astro.
Le projet Astro généré comprend:
* inspiré de l'excellent & performant template: https://github.com/mhyfritz/astro-landing-page
* typescript
* preact
* tailwindcss
* un composant preact inédit, ```/src/comonents/YellowMatrix.tsx```:
  * ce composant est hydraté grace au concept d'ilôt Astro.
  * il consiste en un CANVAS animé à la facon Matrix
  * inspiré de l'excellent: https://gist.github.com/MatheusCammargho/119fda289d5fd76d419a31a82369a8fd

## How to use

```bash
npx create-astro-matrix
```

### Options

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