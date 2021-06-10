import React from 'react';
import LoadingGif from '../images/gif/loading-arrow.gif';

function Loading() {
    return (
        <div className="loading">
            <h4>data loading...</h4>
            <img src={LoadingGif} alt=""/>
        </div>
    )
}

export default Loading
