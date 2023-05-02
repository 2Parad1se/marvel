import React, { Component } from "react";


import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';


class App extends Component {

    state = {
        selectedChar: null,
    }

    onSelectedChar = (id) => {
        // console.log(id)
        this.setState({selectedChar: id})
        // console.log(this.state.selectedChar)
    }
    

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    {/* <Test>
                        <div>123</div>
                        <div>321</div>
                    </Test> */}
                    <RandomChar/>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onSelectedChar={this.onSelectedChar} ></CharList>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo selectedChar={this.state.selectedChar} />
                        </ErrorBoundary>
    
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

function Test(props) {
    return (
        <div className="mb-3 p-3 border border-primary">
            {React.Children.map(props.children, child => {
                return React.cloneElement(child, {className: 'shadow p-3 m-3 border rounded'})
            })}
        </div>
    )
}

function TestLeftRight() {

}

export default App;