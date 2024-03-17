##### Scaffolded with:

```bash
npx @lalit-rana/dynamic-middle-ellipsis 
```

##### To upgrade visit:
[![NPM](https://img.shields.io/npm/v/@lalit-rana/dynamic-middle-ellipsis)](https://www.npmjs.com/package/@lalit-rana/dynamic-middle-ellipsis)
[![GitHub Repo stars](https://img.shields.io/github/stars/LalitSinghRana/dynamic-middle-ellipsis)](https://github.com/LalitSinghRana/dynamic-middle-ellipsis.git)

---

# Instructions:

**_For precise truncation_**, you need to generate character width mapping for all the font-family in your website. 
    
  1. Open your website in browser.
      - Dev/staging/prod; any version works.
  2. Copy everything from `.\truncate-text-utils\generate-font-width-mapping` and paste it in the console.
      - This'll generate character widths mapping for all font-families in your project.
  3. Copy the return object from the console and paste it in `.\truncate-text-utils\font-family-map` at `fontFamilyMap`.
      - You can replace the existing object entirely.
  4. All done.


PS: Remember to repeat above process whenever you add a new font-family to your website.