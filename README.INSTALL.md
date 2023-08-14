## INSTALLER le TEMPLATE astro-matrix-template

Un utilisateur veut profiter des performances de notre template, avec son integration Matrix-background.
 * il devra utiliser une commande simple
   * ```npx create-astro-matrix```
 * celle-ci vas installer notre package CLI pour assister le deploiement & la configuration de ce template
 * le script doit demarrer & afficher l'usage de npx create-astro-matrix & liberer le prompt
 * notre utilisateur pourra alors demarrer & renseigner les requis pour l'installation & la configuration de son template

### quids pour installer astro-matrix-template ?
* --install (--dir *SOME_DIR*)
  * lance le script d'installation, & demandera chaque info obligatoire si elle n'est pas fournit
* --type [org|com|school]
  * defini votre organisation
* --config
  * lance le script des configurations
* --config-seo [] (https://github.com/jonasmerlin/astro-seo#readme)
  * lance le script de configuration concernant uniquement le SEO
* --config-headers
  * lance le script de configuration concernant uniquement les HEADERS
    * from /src/pages/index.astro
      * image: "social.jpg"
      * description: "bla bla"
      * ???
* --config-matrix
  * lance le script de configuration concernant uniquement les paramatres du canvas Matrix
    * from /src/components/matrix.conf.ts
      * MINIMAL_SPEED
      * MAX_ADD_SPEED
      * MATRIX_CANVAS_TRAIL_INDICE
      * REDROP_AFTER_INVISIBLE_RATIO 
      * FONT
      * FONT_SIZE
      * FONT_COLOR
* --support

## ressources
* unicode chars (https://www.compart.com/fr/unicode/category/So)
  * borders
    * &#9474; &#9472; &#9692; &#9693; &#9694; &#9695; 
    * &#9473; &#9475; &#9484; &#9485; &#9486; &#9487; &#9488; &#9489; &#9490; &#9491; &#9492; &#9493; &#9494; &#9495; &#9496; &#9497; &#9498; &#9499; 
  * loader
    * &#9601; => &#9608;
  * sprites
    * &#9711; &#9940; &#9989; &#127793; &#128295; &#128640; &#128701; &#128736; &#129466;

## todos
done: 
  https://www.npmjs.com/package/inquirer
  https://www.npmjs.com/package/gradient-string

todo : 
  rename to create-astro-matrix => 24H
  add ASTRO-SEO https://github.com/jonasmerlin/astro-seo#readme




