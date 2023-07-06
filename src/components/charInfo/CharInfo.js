import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MarverServises from '../../servises/MarverServises';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

function CharInfo(props) {
    const marvel = new MarverServises();

    const defaultProps = {
        name: 'Archie Evans'
    }

    // state = {
    //     char: null,
    //     loading: false,
    //     error: false,
    // }

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const onLoading = () => {
        // this.setState(state => {
        //     return {...state, loading: true}
        // })
        setLoading(true);
    }

    const onError = () => {
        // this.setState(state => {
        //     return {...state, loading: false, error: true}
        // })
        setLoading(false);
        setError(true);
    }

    const onLoaded = (res) => {
        // this.setState({
        //         char: res,
        //         loading: false,
        //         error: false,
        //     }
        // )
        // console.log(this.state.char);
        setChar(res);
        setLoading(false);
        setError(false);
    }

    const updateChar = (id) => {
        onLoading();
        marvel.getCharacter(id)
            .then(res => onLoaded(res))
            .catch(onError);
    }
    
    // componentDidMount() {
    //     if (this.props.selectedChar === null) {
    //         return
    //     } else {
    //         this.updateChar(this.props.selectedChar)
    //     }    
    // }
    useEffect(() => {
        if (props.selectedChar === null) {
            return
        } else {
            updateChar(props.selectedChar)
        }
    }, [props])

    // componentDidUpdate(prevProps) {
    //     if (prevProps !== this.props) {
    //         this.updateChar(this.props.selectedChar)
    //     }
    // }
    // useEffect(() => {
    //     updateChar()
    // })
    

    const load = loading ? <Spinner/> : null;
    const err = error ? <ErrorMessage/> : null;
    const skeleton = !(loading || error || char) ? <Skeleton/> : null;
    const content = !(loading || error || !char)? <View char={char}/> : null;
    console.log(props.name)
    return (            
        <div className="char__info">
            {load}
            {err}
            {skeleton}
            {content}   
        </div>
    )

}

function View({char}) {
    let imgStyle = {'objectFit' : 'cover'}
    if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'}
    }
    const comics = char.comics.map(item => {
        let id = item.resourceURI.slice(item.resourceURI.lastIndexOf('/') + 1);
        return (
            <li key={id} className="char__comics-item">
                {item.name}
            </li>
        )
    })
    return (
        <>
            <div className="char__basics">
                <img src={char.thumbnail} alt={char.name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{char.name}</div>
                    <div className="char__btns">
                        <a href={char.homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={char.wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {char.description ? `${char.description}`: `Unfortunately, this ${char.name} doesn't have descripton`}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    selectedChar: PropTypes.string,
    name: PropTypes.string.isRequired,
}

// CharInfo.defaultProps = {
//     name: 'Archie'
// }

export default CharInfo;