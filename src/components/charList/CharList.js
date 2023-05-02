import { Component } from 'react';
import PropTypes from 'prop-types';

import MarverServises from '../../servises/MarverServises';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {

    marvel = new MarverServises();

    state = {
        chars: [],
        loading: true,
        loadingMore: false,
        error: false,
        offset: 300,
        charEnded: false,
    }

    //
    onLoading = () => {
        this.setState(state => {
            return {...state, loading: true}
        })
    }

    onLoadingMore = () => {
        this.setState(state => ({...state, loadingMore: true}))
    }

    onError = () => {
        this.setState(state => {
            return {...state, error: true, loading: false}
        })
    }

    onLoaded = (res) => {
        // console.log(res)
        let ended = false;
        if (res.length < 9) {
            ended = true;
        }
        this.setState(state => ({...state, chars: [...state.chars, ...res], loading: false, offset: state.offset + 9, loadingMore: false, charEnded: ended}))
    }
    
    updateCharacters = (offset) => {
        this.onLoadingMore();

        this.marvel.getAllCharacters(offset)
            .then(res => this.onLoaded(res))
            .catch(this.onError)
        // console.log(this.state.chars)
    }

    componentDidMount() {
        this.updateCharacters(this.state.offset);
    }

    // componentDidUpdate(prevProps, prevState) {
    //     console.log(prevProps, prevState)
    //     if (this.props.id !== prevProps.id) {
    //         this.onUpdateChar();
    //     }
    // }

    render() {
        const {chars, loading, loadingMore, error, offset, charEnded} = this.state
        const spinner = loading ? <Spinner></Spinner>: null;
        const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
        const content = !(loading || error) ? <View chars={chars} onSelectedChar={this.props.onSelectedChar}></View>: null;
        const loadingMoreItem = loadingMore? <Spinner></Spinner> : null;

        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                {content}
                {loadingMoreItem}
                <button className="button button__main button__long" 
                    disabled={loadingMore}
                    onClick={() => this.updateCharacters(offset)}
                    style={{'display': charEnded ? 'none': 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

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