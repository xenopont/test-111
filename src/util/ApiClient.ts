/**
 * Returns API response as a text
 *
 * @param url URL to make a GET HTTP request
 */
const getText = (url: string): Promise<string> => {
    return fetch(url, {
        credentials: 'omit',
        mode: 'cors',
        redirect: 'follow',
    }).then(async (response) => {
        if (!response.ok) {
            return '';
        }

        return await response.text();
    }).catch(() => {
        return '';
    });
}

const ApiClient = {
    getText,
};

export default ApiClient;
