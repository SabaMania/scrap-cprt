const puppeteer = require("puppeteer");

async function startBrowser() {
  let browser;
  try {
    // console.log("Opening the browser......");
    browser = await puppeteer.launch({
      headless: "new", // "new" 
      dumpio: true,
      args: [
        "--disable-setuid-sandbox",
        "--disable-infobars",
        "--no-sandbox",
        "--disable-blink-features=AutomationControlled",
      ],
      ignoreDefaultArgs: ["--enable-automation"],
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      ignoreHTTPSErrors: true,
    });
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
  }
  return browser;
}

module.exports = {
  startBrowser,
};
