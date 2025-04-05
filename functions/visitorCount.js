const fetch = require("node-fetch");

exports.handler = async function (event, context) {
    const url = "https://api.countapi.xyz/hit/amitkr7893.netlify.app/visits";

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8 seconds

    try {
        const response = await fetch(url, {
            signal: controller.signal,
        });
        clearTimeout(timeout);

        if (!response.ok) {
            return {
                statusCode: response.status,
                headers: {
                    "Access-Control-Allow-Origin": "https://amitkr7893.netlify.app",
                },
                body: JSON.stringify({ error: "Failed to fetch from CountAPI" }),
            };
        }

        const data = await response.json();
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "https://amitkr7893.netlify.app",
            },
            body: JSON.stringify(data),
        };
    } catch (error) {
        clearTimeout(timeout);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "https://amitkr7893.netlify.app",
            },
            body: JSON.stringify({ error: "Server Error", message: error.message }),
        };
    }
};
