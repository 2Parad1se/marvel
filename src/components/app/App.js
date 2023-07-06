import React, { useState } from "react";


import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

// import OwnHookTest from "../ownHookTest/ownHookTest";

import decoration from '../../resources/img/vision.png';


function App() {

    const [selectedChar, setSelectedChar] = useState(null);

    const onSelectedChar = (id) => {
        // console.log(id)
        setSelectedChar(id)
    }
    
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                {/* <div className="char__content">
                    <ErrorBoundary>
                        <CharList onSelectedChar={onSelectedChar} ></CharList>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo selectedChar={selectedChar} />
                    </ErrorBoundary>

                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/> */}
            </main>
            {/* <OwnHookTest></OwnHookTest> */}
        </div>
    )

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


export default App;