const axios = require("axios");

class FacebookService {

    constructor() {
        this.pageId = process.env.FACEBOOK_PAGE_ID;
        this.accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
        this.baseURL = "https://graph.facebook.com/v23.0";
    }

    // Check Connection
    async health() {
        try {

            if (!this.pageId || !this.accessToken) {
                return {
                    success: false,
                    message: "Facebook credentials not configured."
                };
            }

            const response = await axios.get(
                `${this.baseURL}/${this.pageId}`,
                {
                    params: {
                        access_token: this.accessToken
                    }
                }
            );

            return {
                success: true,
                page: response.data
            };

        } catch (err) {

            return {
                success: false,
                error: err.response?.data || err.message
            };

        }
    }

    // Text Post
    async postText(message) {

        try {

            const response = await axios.post(
                `${this.baseURL}/${this.pageId}/feed`,
                null,
                {
                    params: {
                        message,
                        access_token: this.accessToken
                    }
                }
            );

            return {
                success: true,
                postId: response.data.id
            };

        } catch (err) {

            return {
                success: false,
                error: err.response?.data || err.message
            };

        }

    }

}

module.exports = new FacebookService();
