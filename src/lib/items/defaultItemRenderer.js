import React from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd';

const Item = ({item, itemContext, getItemProps, getResizeProps, connectDragSource, isDragging}) => {
  const { left: leftResizeProps, right: rightResizeProps } = getResizeProps()
  const itemProps = getItemProps(item.itemProps);
  const style = {...itemProps.style, opacity: isDragging ? 0 : 1}
  const finalProps = {...itemProps, style}; 
  const renderableItem = <div {...finalProps}>
    {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ''}

    <div
      className="rct-item-content"
      style={{ maxHeight: `${itemContext.dimensions.height}` }}
    >
      {itemContext.title}
    </div>

    {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''}
  </div>;
  return itemContext.selected ? connectDragSource(renderableItem) : renderableItem
}

const itemSource = {
  beginDrag(props) {
    console.log("begin drag");
    return props.item;
  },
  endDrag(props, monitor, component) {
    console.log("end drag");
    if (!monitor.didDrop()) {
      return;
    }
    console.log("dropped on target");
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}
const DraggableItem = DragSource((props) => `item_${props.item.id}`, itemSource, collect)(Item) ;

export const defaultItemRenderer = (props) => <DraggableItem {...props} /> 


// TODO: update this to actual prop types. Too much to change before release
// future me, forgive me.
Item.propTypes = {
  item: PropTypes.any,
  itemContext: PropTypes.any,
  getItemProps: PropTypes.any,
  getResizeProps: PropTypes.any
}
