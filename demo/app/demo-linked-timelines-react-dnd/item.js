import React from 'react';
import { DragSource } from 'react-dnd';
import './Item.scss';

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

const Item = ({
  item,
  timelineContext,
  itemContext,
  getItemProps,
  getResizeProps,
  connectDragSource,
  isDragging,
  selected,
}) => {
  const { left: leftResizeProps, right: rightResizeProps } = getResizeProps()
  const background =  itemContext.selected ? 'red' : 'blue'; 
  const opacity = isDragging ? 0 : 1;
  const itemProps = getItemProps({
        style: {
          opacity,
          background,
          border: 'none',
        },
      });
  return (
    connectDragSource(<div
      {...itemProps}
      
    >
      {itemContext.useResizeHandle ? (
        <div {...leftResizeProps} />
      ) : null}

      <div
        style={{
          height: itemContext.dimensions.height,
          overflow: 'hidden',
          paddingLeft:3,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        {itemContext.title}
      </div>


      {itemContext.useResizeHandle ? (
        <div {...rightResizeProps} />
      ) : null}
    </div>)
  )
}

export default DragSource('item1', itemSource, collect)(Item);
