const { Csf } = require("bfme-csf-str");

/**
 * @param {string} input 
 * @param {{
 * json: string | boolean, 
 * str: string | boolean
 * sortType: "up" | "down" | undefined
 * }} options 
 */
async function processCsf(input, options) {

  if (typeof input === "string" && !input.endsWith(".csf")) {
    throw new Error("File format must be .csf");
  }

  if (!(options.json || options.str)) {
    throw new Error("Use flag --str or --json to convert from .csf to .json or .str")
  }

  if (options.json && typeof options.json === "string" && !options.json.endsWith(".json")) {
    throw new Error("File format must be .json")
  }

  if (options.str && typeof options.str === "string" && !options.str.endsWith(".str")) {
    throw new Error("File format must be .str")
  }

  /**
   * @constant
   * @type {{
   * inputFilePath: string,
   * sortType: string, 
   * outputFilePath: {
   *  jsonFilePath?: string,
   *  strFilePath?: string
   * }, 
   * to: {
   *  json?: boolean, 
   *  str?: boolean
   * }}}
   */
  const opts = {
    inputFilePath: input,
    sort: options.sort,
    outputFilePath: {},
    to: {}
  };

  if (options.json && typeof options.json === "string") {
    opts.outputFilePath["jsonFilePath"] = options.json;
    // opts.to["json"] = true;
  }

  if (options.str && typeof options.str === "string") {
    opts.outputFilePath["strFilePath"] = options.str;
    // opts.to["str"] = true;
  }

  if (options.json && typeof options.json === "boolean") {
    opts.to["json"] = true;
  }

  if (options.str && typeof options.str === "boolean") {
    opts.to["str"] = true;
  }

  await convertCsf(opts);
}

/**
 * 
 * @param {string} strFilePath 
 * @param {string | undefined} csfFilePath 
 */
async function processStr(strFilePath, csfFilePath) {
  const csfBuffer = await Csf.readfromStr(strFilePath);
  if (!csfFilePath) {
    csfFilePath = strFilePath.replace(".str", ".csf");
  }
  await Csf.writeFile(csfFilePath, csfBuffer);
  console.log(`File Successfully converted ${csfFilePath}`);

}

/**
 * 
 * @param {string} jsonFilePath 
 * @param {string | undefined} csfFilePath 
 */
async function processJson(jsonFilePath, csfFilePath) {
  const csfBuffer = await Csf.readfromJson(jsonFilePath);
  if (!jsonFilePath) {
    csfFilePath = jsonFilePath.replace(".str", ".csf");
  }
  await Csf.writeFile(csfFilePath, csfBuffer);
  console.log(`File Successfully converted ${csfFilePath}`);
}

/***
 * @param {Object} param0 
 * @param {string} param0.inputFilePath 
 * @param {{
 * jsonFilePath?: string,
 * strFilePath?: string
 * }} param0.outputFilePath 
 * @param {"up" | "down" | undefined} param0.sort
 * @param {{ 
 * json?: boolean, 
 * str?: boolean 
 * }} param0.to 
 *  */
async function convertCsf(
  {
    inputFilePath,
    outputFilePath,
    sort,
    to
  }
) {

  let csfString = await Csf.readFile(inputFilePath);

  if (sort) {
    csfString = Csf.sortByLabel(csfString, sort);
  }

  if (outputFilePath?.jsonFilePath) {
    await Csf.saveAsJson(outputFilePath.jsonFilePath, csfString);
    console.log(`File successfully converted ${outputFilePath.jsonFilePath}`);
  }

  if (outputFilePath?.strFilePath) {
    await Csf.saveAsStr(outputFilePath.strFilePath, csfString);
    console.log(`File successfully converted ${outputFilePath.strFilePath}`);
  }

  if (to.json) {
    const jsonFilePath = inputFilePath.replace(".csf", ".json")
    await Csf.saveAsJson(jsonFilePath, csfString);
    console.log(`File successfully converted ${jsonFilePath}`);
  }

  if (to.str) {
    const strFilePath = inputFilePath.replace(".csf", ".str")
    await Csf.saveAsStr(strFilePath, csfString);
    console.log(`File successfully converted ${strFilePath}`);
  }
}

module.exports = {
  processCsf,
  processStr,
  processJson
}