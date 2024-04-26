/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request) {
    /**
     * A map of the URLs to redirect to
     * @param {Object} countryMap
     */
    const countryMap = {
      US: "https://hello-worker.lore-reznik.workers.dev/us",
    };

    // Use the cf object to obtain the country of the request
    // more on the cf object: https://developers.cloudflare.com/workers/runtime-apis/request#incomingrequestcfproperties
    const country = request.cf.country;

    if (country != null && country in countryMap) {
      const url = countryMap[country];
      // Remove this logging statement from your final output.
      console.log(`Based on ${country}-based request, your user would go to ${url}.` )
      return Response.redirect(url);
    } else {
      return fetch("https://juiceshop.lorenacf.com", request);
    }
  },
};
