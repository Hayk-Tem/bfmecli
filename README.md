# bfmecli
CLI for game series The Battle For Middle-earth, The Battle For Middle-Earth 2 and The Battle For Middle-earth II: The Rise Of the Witch-king.

# Installation

```bash
 npm install bfmecli --global
```

### Convert language files

* Convert from csf to str.
* command csf  <csfFilePath> file path is required.
* --str [strFilePath] file path is optional, if not specified file saved as csf file name.
* Optional flag can be used for sorting strings --sort "up" [A-Z] or "down" [Z-A]

```bash
bfme csf <csfFilePath> --str [strFilePath] --sort "up"
```

* Convert from csf to json.
* command csf  <csfFilePath> file path is required.
* --json [jsonFilePath] file path is optional, if not specified file saved as csf file name.

```bash
bfme csf <csfFilePath> --json [jsonFilePath] --sort "down"
```

* Can be combine to create both str and json

```bash
bfme csf <csfFilePath> --str [strFilePath] --json [jsonFilePath] --sort "up"
```


* Convert from str to csf
* [csfFilePath] is optional, if not specified csf file name is the same as str file name.

```bash
bfme str <strFilePath> [csfFilePath]
```

* Convert from json to csf
* [jsonFilePath] is optional, if not specified csf file name is the same as json file name.

```bash
bfme str <strFilePath> [jsonFilePath]
```