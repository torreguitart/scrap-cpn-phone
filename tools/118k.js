/** Tools for https://www.118000.fr website **/
const axios = require("axios");
const fs = require("fs/promises");
const path = require("path");
const { CompanyError } = require("../error/customError");

module.exports = {
  // Return response from a file (testing with no ban)
  getHtmlFromFile: async () => {
    return (html = await fs.readFile(path.resolve(__dirname, "../118.html"), {
      encoding: "utf8"
    }));
  },

  // return http page from site www.118000.fr
  // url: https://www.118000.fr/search?pro=1&label=95880+Enghien+Les+Bains&who=La+cabane+de+leon
  getHtmlFromSite: async (cpn, addr) => {
    // protect string cpn/addr
    const cpnPlus = cpn.replace(/ /g, "+");
    let addrPlus = "";
    // if addr => adding constraint
    if (addr) {
      addrPlus = "&label=" + addr.replace(/ /g, "+");
    }
    try {
      const url = `https://www.118000.fr/search?pro=1&who=${cpnPlus}${addrPlus}`;
      // Fetch HTML
      const html = await axios.get(url);
      return html.data;
    } catch (error) {
      throw new CompanyError(`Nothing found for ${cpn} !`, 0);
    }
  }
};
