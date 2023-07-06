import {useState, useEffect} from 'react';

import useMarverServises from '../../servises/MarverServises';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import mjolnir from '../../resources/img/mjolnir.png';
import './randomChar.scss';

function RandomChar() {

    const marvel =  useMarverServises();

    const [char, setChar] = useState({
        id: null,
        name: null,
        description: null,
        thumbnail: null,
        homepage: null,
        wiki: null,
    })
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const onCharLoaded = (res) => {
        setChar(res);
        setLoading(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onCharLoading = () => {
        setLoading(true);
    }
    
    const updateChar = () => {
        onCharLoading();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        marvel.getCharacter(id)
            .then(res => onCharLoaded(res))
            .catch(onError);    
    }

    useEffect(() => {
        updateChar();
    }, [])

    const errorContent = error? <ErrorMessage/> : null;
    const loadingContent = loading? <Spinner/> : null;
    const viewContent = !(error || loading)? <View char={char}/> : null;
       
    return (
        <div className="randomchar">
            {errorContent}
            {loadingContent}
            {viewContent}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>    
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

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

