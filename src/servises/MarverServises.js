import useHttp from "../hooks/http.hook";

const useMarverServises = () => {
    const {loading, error, request} = useHttp();

    const _apiKeyMail = '4a8d354b99c388c5cd48ec54d30f9a9a';
    const _apiKeyGmail = '569fd29919a81ca0fa00f9c728ff9ff3';
    


    const getAllCharacters = async (offset) => {
        const response = request(`https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=${offset}&apikey=${_apiKeyMail}`);
        // console.log(response.data.results)
        const chars = await response.data.results.map(item => transformChar(item));
        // console.log(chars)
        return chars;
    }
    //1010870
    const getCharacter = async (id) => {
        const response = await request(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=${_apiKeyMail}`);
        console.log(response);
        return transformChar(response.data.results[0]);
        // return response;
        // this._transformChar(response)
    }

    const transformChar = (res) => {
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

    return {loading, error, getAllCharacters, getCharacter}
}

export default useMarverServises;
