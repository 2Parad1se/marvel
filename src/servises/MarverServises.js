class MarverServises {
    constructor() {

        this.apiKeyMail = '4a8d354b99c388c5cd48ec54d30f9a9a';
        this.apiKeyGmail = '569fd29919a81ca0fa00f9c728ff9ff3';
    }
    getResourse = async (url) => {
        const res = await fetch(url);

        return await res.json();
    }
    // 569fd29919a81ca0fa00f9c728ff9ff3

    getAllCharacters = async (offset) => {
        const response = await this.getResourse(`https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=${offset}&apikey=${this.apiKeyMail}`);
        // console.log(response.data.results)
        const chars = await response.data.results.map(item => this._transformChar(item));
        // console.log(chars)
        return chars;
    }
    //1010870
    getCharacter = async (id) => {
        const response = await this.getResourse(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=${this.apiKeyMail}`);
        console.log(response);
        return this._transformChar(response.data.results[0]);
        // return response;
        // this._transformChar(response)
    }

    _transformChar(res) {
        // console.log(res)
        return {
            id: res.id,
            name: res.name,
            description: res.description,
            thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            comics: res.comics.items,
        }
    }
}

export default MarverServises;
