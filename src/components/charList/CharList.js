import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MarverServises from '../../servises/MarverServises';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

function CharList(props) {

    const marvel = new MarverServises();

    const [chars, setChars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(300);
    const [charEnded, setCharEnded] = useState(false);

    //
    // const onLoading = () => {
    //     setLoading(true);
    // }

    const onLoadingMore = () => {
        setLoadingMore(true);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onLoaded = (res) => {
        // console.log(res)

        if (res.length < 9) {
            setCharEnded(true);
        }
        setChars(chars => [...chars, ...res]);
        setLoading(false);
        setOffset(offset => offset + 9);
        setLoadingMore(false);
    }
    
    const updateCharacters = (offset) => {
        // onLoading();
        onLoadingMore();

        marvel.getAllCharacters(offset)
            .then(res => onLoaded(res))
            .catch(onError)
    }

    useEffect(() => {
        updateCharacters(offset);
    }, []);

    // componentDidUpdate(prevProps, prevState) {
    //     console.log(prevProps, prevState)
    //     if (this.props.id !== prevProps.id) {
    //         this.onUpdateChar();
    //     }
    // }

    const spinner = loading ? <Spinner></Spinner>: null;
    const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
    const content = !(loading || error) ? <View chars={chars} onSelectedChar={props.onSelectedChar}></View>: null;
    const loadingMoreItem = loadingMore? <Spinner></Spinner> : null;

    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            {content}
            {loadingMoreItem}
            <button className="button button__main button__long" 
                disabled={loadingMore}
                onClick={() => updateCharacters(offset)}
                style={{'display': charEnded ? 'none': 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

function View({chars, onSelectedChar}) {
    // console.log(chars)
    let classImg;

    const characters = chars.map(item => {
        if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            classImg = 'char__item_contain';
        } else {
            classImg = 'char__item_cover';
        }
        return (
            <li key={item.id} className="char__item" onClick={() => onSelectedChar(item.id)} >
                <img src={item.thumbnail} alt={item.name} className={classImg}/>
                <div className="char__name">{item.name}</div>
            </li>
        )

    })
    return (
        <ul className="char__grid">
            {characters}
        </ul>
    )
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired,
}
export default CharList;