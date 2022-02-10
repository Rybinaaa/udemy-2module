

class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=c53d799d9fffd5510de127a41f118dba'
    _baseOffset = 210


    getResource = async (url) => {
        let res = await fetch(url)

        if(!res.ok) {
            throw new Error(`statue: ${res.status}`)
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`)
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (res) => {
        let result = {
            id: res.id, 
            name: res.name,
            description: res.description,
            thumbnail: res.thumbnail.path + '.'+ res.thumbnail.extension,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            imgStyle : 'randomchar__img',
            comics: res.comics.items
        }

        if (result.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
            result.imgStyle = 'randomchar__img notFound'
        }
        for (let key in result){
            if (!result[key]) result[key] = 'no information'
        }

        return result
    }


}

export default MarvelService;