// /netlify/functions/visitorCount.js
const fetch = require("node-fetch");

exports.handler = async function (event, context) {
    const url = "https://api.countapi.xyz/hit/amitkr7893.netlify.app/visits";

    try {
        const response = await fetch(url);
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Server Error", message: error.message }),
        };
    }
};
