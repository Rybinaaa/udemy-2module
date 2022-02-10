import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import React, {Component} from "react";
import MarvelService from "../../services/MarvelService";
import CharItem from './CharItem';
import Spinner from '../spinner/Spinner';


class CharList extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        // name: null,
        // description: null,
        // thumbnail: null,
        // homepage: null,
        // wiki: null,
        characters: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 70,
        charEnded: false,

    }

    marvelService = new MarvelService()

    onCharLoaded = (newCharacters) => {
        let ended = false
        if(newCharacters.length < 9) {
            ended = true
        }

        this.setState(({offset, characters}) => ({
            
                characters: [...characters, ...newCharacters],
                loading: false,
                error: false,
                newItemLoading: false,
                offset: offset + 9,
                charEnded: ended, 
            
        }))
    }

    // createCharacters = () => {
    //     this.marvelService
    //         // .getAllCharacters()
    //         // .then(res => console.log(res))
    //         .getAllCharacters()
    //         .then(this.onCharLoaded)
    //         .catch(this.onError)
    // }

    createCharlist = (characters) => {
        const elements = characters.map((item) => {
        
            return(
                <CharItem thumbnail={item.thumbnail} name={item.name} key={item.id} className={item.imgStyle}
                onClick={() => {
                    this.props.onCharSelected(item.id);
                    // this.props.focusOnItem(i);}}
                    // ref={this.setRef}
                }}
                />
            )

        })
        return elements
    }    


    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        })
    }




    componentDidMount() { // компонент только был создан 
        this.onRequest()
    }

    onRequest = (offset) => {
        this.marvelService
        .getAllCharacters(offset)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    focusOnItem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }


    render() {
        const {charEnded, characters, loading, newItemLoading, offset} = this.state
        console.log(characters, 'render')
        return (

            <div className="char__list">
                <ul className="char__grid">

                    {!loading? this.createCharlist(characters) : <Spinner />}
                    

                </ul>
                <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={(e) => {this.onRequest(offset)}} >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}




export default CharList;