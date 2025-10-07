importScripts("https://cdn.jsdelivr.net/npm/comlink@4.4.2/dist/umd/comlink.min.js", "https://cdn.jsdelivr.net/npm/axios@1.7.7/dist/axios.min.js");

/**
 * Fetches data from a given URL.
 * 
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<string>} A promise that resolves with the fetched data.
 */
const fetchData = async (url) => {
  try {
    const response = await axios.get(url, { responseType: "text", maxRedirects: 0, validateStatus: (status) => status < 400, headers:{
      'Cache-Control': 'immutable, max-age=31536000',
    } });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 302) {
      // Handle 302 redirect here if needed
      console.warn(`Received 302 redirect for ${url}`);
    }
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

Comlink.expose({ fetchData });