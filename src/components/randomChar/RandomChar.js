import {Component} from 'react';

import MarverServises from '../../servises/MarverServises';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import mjolnir from '../../resources/img/mjolnir.png';
import './randomChar.scss';

class RandomChar extends Component {
    constructor() {
        super();
        this.marvel = new MarverServises();
        this.state = {
            char: {
                id: null,
                name: null,
                description: null,
                thumbnail: null,
                homepage: null,
                wiki: null,
            },
            loading: true,
            error: false,

        }
    }

    
    onCharLoaded = (res) => {
        this.setState({
            char: res,
            loading: false,
        })
    }

    onError = () => {
        this.setState(state => ({...state, loading: false, error: true }))
        // console.log(err);
    }

    onCharLoading = () => {
        this.setState(state => ({...state, loading: true}));
    }
    
    updateChar = () => {
        this.onCharLoading();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        // const id = 1;
        this.marvel.getCharacter(id)
            .then(res => this.onCharLoaded(res))
            .catch(this.onError);    
    }

    componentDidMount() {
        this.updateChar();
    }

    render () {
       const error = this.state.error? <ErrorMessage></ErrorMessage>: null;
       const loading = this.state.loading? <Spinner></Spinner>: null;
       const content = !(error || loading)? <View char={this.state.char}></View>: null;

       
        return (
            <div className="randomchar">
                {error}
                {loading}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateChar}>
                        <div className="inner">try it</div>    
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        ) 
    }

}
// обновление по кнопке; если нет картинки, то object-fit: cover -> contain; char лист реализовать, не забыть про Id

function View({char}) {
    let {name, description, thumbnail, homepage, wiki} = char;
    if (description.length > 150) {
        description = `${description.slice(0, 150)}...`;   
    } 
    if (description === '') {
        description = `Unfortunately, ${name} doesn't have a description`;
    }
    let classImg = 'randomchar__img';
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        classImg = 'randomchar__img_contain';
    }

    // let classImg = (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg')? 'randomchar__img': 'randomchar__img_contain';

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={classImg}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;

