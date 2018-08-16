import React from 'react'

const styles = {
	display: 'inline-block',
}

export default class BoxDragPreview extends React.PureComponent {

	constructor(props) {
		super(props)
	}

	render() {
		const { title } = this.props

		return (
			<div style={styles}>
                {title}
			</div>
		)
	}
}