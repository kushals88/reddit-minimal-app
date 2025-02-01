import axios from "axios";

const URI = "https://www.reddit.com/";

const getListings = async (subreddit = "popular", limit = 25) => {
    try {
        const response = await axios.get(`${URI}r/${subreddit}.json`, {
            params: {
                limit: limit,
                depth: 1
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetchings listings: ', error);
        throw new Error("Failed to fetch listings. Please try again after a few moments.");
    }
};

const getComments = async (subreddit, listingId, limit = 20) => {
    try {
        const response = await axios.get(`${URI}r/${subreddit}/comments/${listingId}.json`, {
            params: {
                limit: limit
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetchings listing comments: ', error);
        return null;
    }
};

const getSubreddits = async (type = "popular", limit = 15) => {
    try {
        const response = await axios.get(`${URI}subreddits/${type}.json`, {
            params: {
                limit: limit
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetchings subreddits: ', error);
        return null;
    }
}

export { getListings, getComments, getSubreddits };