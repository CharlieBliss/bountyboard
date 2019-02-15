import React from 'react'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { DragSource } from 'react-dnd'
import { CARD } from '../constants/constants'
import styles from './styles.scss'


const cardSource = {
	beginDrag: props => ({
		card: props.card,
	}),
}

const cardStyle = card => ({
	position: 'absolute',
	left: 0,
	top: 0,
	transform: `translate(${card.x_position}px, ${card.y_position}px)`,
})


const collect = (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	connectDragPreview: connect.dragPreview(),
	isDragging: monitor.isDragging(),
})

const Card = ({ isDragging, connectDragSource, card, connectDragPreview }) => {
	if (connectDragPreview) {
		// Use empty image as a drag preview so browsers don't draw it
		// and we can draw whatever we want on the custom drag layer instead.
		connectDragPreview(getEmptyImage())
	}
	return connectDragSource(
		<img
			alt={card.name}
			src={card.image}
			className={isDragging ? styles.hidden : styles.card}
			style={cardStyle(card)}
		/>,
	)
}

export default DragSource(CARD, cardSource, collect)(Card)
