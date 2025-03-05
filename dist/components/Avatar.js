import React from 'react';
const RandomPicture = (props) => {
    const url = 'https://picsum.photos/200';
    return React.createElement("img", { src: url });
};
export default RandomPicture;
