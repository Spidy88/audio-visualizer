import React from 'react'
import { inject, observer } from 'mobx-react'

@inject('audio')
@observer
class AudioVisual extends React.Component {
    render() {
        const dataPoints = this.props.audio.dataPoints

        const circles = dataPoints.map((dataPoint, index) => (
            <circle key={index} cx={dataPoint.x} cy={dataPoint.y} r={this.props.size} />
        ))

        return (
            <svg
                stroke="#000"
                strokeWidth="2"
                fill="#FFF"
                width="500"
                height="500">

                {circles}

            </svg>
        )
    }
}

export default AudioVisual