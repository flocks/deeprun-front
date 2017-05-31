import React from 'react';

const Twitter = () => {
    const text = 'Check your chances on @Deeprun_Poker before you call';
    const url = 'https://twitter.com/intent/tweet?text=' + text;
    return (
        <div>
            <a className="twitter-share-button"
              href={url}
            >
                share
            </a>
            <span>Talk about deeprun to your friends!</span>
        </div>
    );
};

export default Twitter;
