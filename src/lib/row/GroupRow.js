import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd';
import PreventClickOnDrag from '../interaction/PreventClickOnDrag'

class GroupRow extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    onContextMenu: PropTypes.func.isRequired,
    isEvenRow: PropTypes.bool.isRequired,
    style: PropTypes.object.isRequired,
    clickTolerance: PropTypes.number.isRequired,
    group: PropTypes.object.isRequired,
    horizontalLineClassNamesForGroup: PropTypes.func,
    connectDropTarget: PropTypes.func,
  }

  render() {
    const {
      onContextMenu,
      onDoubleClick,
      isEvenRow,
      style,
      onClick,
      clickTolerance,
      horizontalLineClassNamesForGroup,
      group,
      connectDropTarget,
    } = this.props

    let classNamesForGroup = [];
    if (horizontalLineClassNamesForGroup) {
      classNamesForGroup = horizontalLineClassNamesForGroup(group);
    }

    return (
      <PreventClickOnDrag clickTolerance={clickTolerance} onClick={onClick}>
        {connectDropTarget(<div
          onContextMenu={onContextMenu}
          onDoubleClick={onDoubleClick}
          className={(isEvenRow ? 'rct-hl-even ' : 'rct-hl-odd ') + (classNamesForGroup ? classNamesForGroup.join(' ') : '')}
          style={style}
        />)}
      </PreventClickOnDrag>
    )
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  hovered: monitor.isOver(),
  item: monitor.getItem(),
})

const spec = {
  drop(props, monitor){
    return {
      group: props.group,
      clientOffset: monitor.getClientOffset(),
    };
  }
}

export default DropTarget('item', spec, collect)(GroupRow)
