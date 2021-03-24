const getText = async (url: string): Promise<string> => {
    const response = await fetch(url, {
        credentials: 'omit',
        mode: 'cors',
        redirect: 'follow',
    });
    if (!response.ok) {
        return '';
    }

    return await response.text();
}

const ApiClient = {
    getText,
};

export default ApiClient;
