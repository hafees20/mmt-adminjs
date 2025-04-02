import React from 'react'
import { ShowPropertyProps } from 'adminjs'

const RandomPicture: React.FC<ShowPropertyProps> = (props) => {

	const url = 'https://picsum.photos/200'

	return <img src={url} />
}

export default RandomPicture
