import React from 'react';
import UICard from './UICard';


const Misc = () => (
    <div>
        <UICard />
        <UICard rank="5" suit="spade" selected />
        <UICard rank="K" suit="heart" />
        <UICard rank="K" suit="diamond" disabled />
        <UICard rank="A" suit="diamond" selected />
        <UICard rank="A" suit="heart" selected />
        <UICard rank="A" suit="club" selected />
        <UICard rank="A" suit="club" />
    </div>
);

export default Misc;
