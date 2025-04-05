const fetch = require("node-fetch");

exports.handler = async function (event, context) {
    const token = process.env.GITHUB_TOKEN;
    const url = "https://api.github.com/repos/amitkr7893/blogs/contents/blogs.json";

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/vnd.github.v3.raw",
            },
        });

        if (!response.ok) {
            return {
                statusCode: response.status,
                headers: {
                    "Access-Control-Allow-Origin": "*", // add this
                },
                body: JSON.stringify({ error: "Failed to fetch from GitHub" }),
            };
        }

        const data = await response.json();

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // add this
            },
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // add this
            },
            body: JSON.stringify({ error: "Server error", details: error.message }),
        };
    }
};
