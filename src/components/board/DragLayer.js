import * as React from 'react'
import { DragLayer } from 'react-dnd'
import Card from './Card'
import { CARD } from '../constants/constants'


const layerStyles = {
	position: 'fixed',
	pointerEvents: 'none',
	zIndex: 100,
	left: 0,
	top: 0,
	width: '100%',
	height: '100%',
}

function getItemStyles(props, item) {
	const { initialOffset, currentOffset } = props
	if (!initialOffset || !currentOffset) {
		return {
			display: 'none',
		}
	}
	console.log(currentOffset)
	const transform = `translate(${currentOffset.x - initialOffset.x}px, ${currentOffset.y - initialOffset.y}px)`
	return {
		height: '100%',
		width: '100%',
		transform,
	}
}

const CustomDragLayer = (props) => {
	const { item, itemType, isDragging } = props
	function renderItem() {
		switch (itemType) {
			case CARD:
				return <Card card={item.card} />
			default:
				return null
		}
	}

	if (!isDragging) {
		return null
	}
	return (
		<div style={layerStyles}>
			<div style={getItemStyles(props, item)}>{renderItem()}</div>
		</div>
	)
}

export default DragLayer(monitor => ({
	item: monitor.getItem(),
	itemType: monitor.getItemType(),
	initialOffset: monitor.getInitialSourceClientOffset(),
	currentOffset: monitor.getSourceClientOffset(),
	isDragging: monitor.isDragging(),
}))(CustomDragLayer)
