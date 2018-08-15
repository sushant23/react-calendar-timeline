/* eslint-disable no-console */
/* eslint-disable no-console */
import React, { Component } from 'react'
import moment from 'moment'

import Timeline, { HTML5Backend, DragDropContext } from 'react-calendar-timeline'
// import 'react-calendar-timeline/lib/Timeline.css'
// import './App.css'

// import containerResizeDetector from 'react-calendar-timeline/lib/resize-detector/container'

import generateFakeData from '../generate-fake-data'

var keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end'
}

const SecondCalendar = (props) =><div><Timeline
      {...props}
      sidebarWidth={150}
      sidebarContent={<div>Above The Left</div>}
      canMove
      canResize="right"
      canSelect
      itemsSorted
      itemTouchSendsClick={false}
      stackItems
      itemHeightRatio={0.75}
    /></div>

export class App extends Component {
  constructor(props) {
    super(props)

    const { groups: groups1, items: items1 } = generateFakeData(5, 400)
    const { groups: groups2, items: items2 } = generateFakeData(5, 400)

    const visibleTimeStart = moment()
      .startOf('day')
      .valueOf()
    const visibleTimeEnd = moment()
      .startOf('day')
      .add(1, 'day')
      .valueOf()

    this.state = {
      groups1,
      items1,
      groups2,
      items2,
      visibleTimeStart,
      visibleTimeEnd
    }
  }

  handleTimeChangeFirst = (visibleTimeStart, visibleTimeEnd) => {
    this.setState({ visibleTimeStart, visibleTimeEnd })
  }

  handleTimeChangeSecond = (visibleTimeStart, visibleTimeEnd) => {
    this.setState({ visibleTimeStart, visibleTimeEnd })
  }

  handleItemMove = (item, group, time) => {

    const filteredItem = this.state.items1.filter(im => im.id !== item.id);
    const newItems = [...filteredItem, {...item, start: time, end: time + item.start - item.end, group: group.id}];
    this.setState({items1: newItems});

  }

  renderFirst() {
    const { groups1, items1, visibleTimeStart, visibleTimeEnd } = this.state

    return (
      <Timeline
        groups={groups1}
        items={items1}
        keys={keys}
        sidebarWidth={150}
        sidebarContent={<div>Above The Left</div>}
        canMove
        canResize="right"
        canSelect
        itemsSorted
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        visibleTimeStart={visibleTimeStart}
        visibleTimeEnd={visibleTimeEnd}
        onTimeChange={this.handleTimeChangeFirst}
        onItemMove={this.handleItemMove}
        onCanvasClick={() => {}}
      />
    )
  }
 
  renderSecond() {
    const { groups2, items2, visibleTimeStart, visibleTimeEnd } = this.state
    return (
      <SecondCalendar
        groups={groups2}
        items={items2}
        visibleTimeStart={visibleTimeStart}
        visibleTimeEnd={visibleTimeEnd}
        keys={keys}
        onTimeChange={this.handleTimeChangeSecond} />
    )
  }

  render() {
    return (
      <div>
        {this.renderFirst()}
        {this.renderSecond()}
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App);