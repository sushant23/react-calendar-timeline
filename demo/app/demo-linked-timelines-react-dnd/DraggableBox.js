import React from 'react'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import Box from './Box'

const boxSource = {
	beginDrag(props) {
        const { title, itemContext: { dimensions: { top, left, height, width} } } = props
		return { title, top, left, height, width}
	},
}

class DraggableBox extends React.PureComponent{
	componentDidMount() {
		const { connectDragPreview } = this.props
		if (connectDragPreview) {
			// Use empty image as a drag preview so browsers don't draw it
			// and we can draw whatever we want on the custom drag layer instead.
			connectDragPreview(getEmptyImage(), {
				// IE fallback: specify that we'd rather screenshot the node
				// when it already knows it's being dragged so we can hide it with CSS.
				captureDraggingState: true,
			})
		}
	}

	render() {
        const { title, connectDragSource, isDragging, itemContext} = this.props

		return (
			connectDragSource &&
			connectDragSource(
				<div style={{height:itemContext.dimensions.height, opacity: isDragging ? 0 : 1}}>
                    <Box title={title} selected={itemContext.selected} />
                </div>,
			)
		)
	}
}

export default DragSource('item', boxSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	connectDragPreview: connect.dragPreview(),
	isDragging: monitor.isDragging(),
}))(DraggableBox)