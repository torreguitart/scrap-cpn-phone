// Scraping function as model (get data from website)

const cheerio = require("cheerio");
const Site = require("../tools/118k"); // tools for the specific website 118000.fr.

exports.searchPhone = async (cpn, address) => {
  async function scrape() {
    try {
      // html = await Site.getHtmlFromFile(); // Uncomment for testing scrape from text file
      html = await Site.getHtmlFromSite(cpn, address); // Comment for testing scrape
      const $ = cheerio.load(html);
      let cpnFound = [];
      // get all href phone number, format and push in array
      $(".phone > .atel").each((_, e) => {
        let row = $(e).attr("href");
        if (row) {
          cpnFound.push("+33 " + row.replace(/ /g, "").slice(5));
        }
      });
      console.log("cpn found: ", cpnFound);
      return cpnFound;
    } catch (err) {
      console.log(err);
    }
  }
  // Fire scrape function
  const dataClean = await scrape().then(data => {
    return data;
  });

  return dataClean;
};
