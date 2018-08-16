import React from 'react'
import { DragLayer } from 'react-dnd'
import Box from './Box'
import snapToGrid from './snapToGrid'

const layerStyles = {
	position: 'fixed',
	pointerEvents: 'none',
	zIndex: 100,
	left: 0,
	top: 0,
	width: '100%',
	height: '100%',
}

function getItemStyles(props) {
	const { initialOffset, currentOffset } = props
	if (!initialOffset || !currentOffset) {
		return {
			display: 'none',
		}
    }

	let { x, y } = currentOffset

	if (props.snapToGrid) {
		x -= initialOffset.x
		y -= initialOffset.y
		;[x, y] = snapToGrid(x, y)
		x += initialOffset.x
		y += initialOffset.y
	}

	const transform = `translate(${initialOffset.x}px, ${y}px)`
	return {
		transform,
        WebkitTransform: transform,
        width: props.item.width,
        height: props.item.height,
        opacity: '0.7',
	}
}

const CustomDragLayer = props => {
	const { item, itemType, isDragging } = props

	function renderItem() {
		switch (itemType) {
			case 'item':
				return <Box title={item.title} selected/> 
			default:
				return null
		}
	}

	if (!isDragging) {
		return null
	}
	return (
		<div style={layerStyles}>
			<div style={getItemStyles(props)}>{renderItem()}</div>
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