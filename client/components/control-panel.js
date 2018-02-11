import React from 'react'
import { inject, observer } from 'mobx-react'
import ReactBootstrapSlider from 'react-bootstrap-slider'

@inject('player', 'audio')
@observer
class ControlPanel extends React.Component {
    renderOnOffControl = () => {
        const { isRunning, startPlayer, stopPlayer } = this.props.player;
        return isRunning ? (
            <button onClick={stopPlayer}>
                Stop
            </button>
        ) : (
            <button onClick={startPlayer}>
                Start
            </button>
        )
    }

    renderFileInputControl = () => {
        const isUploadInput = false
        if( !isUploadInput ) {
            return null
        }

        return (
            <div className="form-group">
                <label>Audio Source</label>

                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="inputFile" />
                    <label className="custom-file-label" for="inputFile">Choose file</label>
                </div>
            </div>
        )
    }

    handleVolumeChange = (e) => {
        const { changeVolume } = this.props.audio
        changeVolume(e.target.value)
    }

    handleFFTSizeChange = (e) => {
        const { changeFFTSize } = this.props.audio
        changeFFTSize(Math.pow(2, e.target.value))
    }

    render() {
        const { isRunning, startPlayer, stopPlayer } = this.props.player
        const { volume, fftSize } = this.props.audio

        return (
            <section>
                    {this.renderOnOffControl()}

                    <button onClick={() => { this.props.audio.connectMic() }}>Connect Mic</button>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="volume">Volume</label>
                        <div className="col-sm-10">
                            <ReactBootstrapSlider
                                name="volume"
                                value={volume}
                                min={0}
                                max={100}
                                step={1}
                                slideStop={this.handleVolumeChange} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="fftSize">FFT Size</label>
                        <div className="col-sm-10">
                            <ReactBootstrapSlider
                                name="fftSize"
                                value={Math.log2(fftSize)}
                                min={5}
                                max={15}
                                step={1}
                                formatter={value => Math.pow(2, value)}
                                slideStop={this.handleFFTSizeChange} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Audio Type</label>

                        <div className="col-sm-10">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="inputMp3" id="inputMp3" value="inputMp3" />
                                <label className="form-check-label" htmlFor="inputMp3">
                                    MP3
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="inputMic" id="inputMic" value="inputMic" />
                                <label className="form-check-label" htmlFor="inputMic">
                                    Mic
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="inputUpload" id="inputUpload" value="inputUpload" />
                                <label className="form-check-label" htmlFor="inputUpload">
                                    Upload
                                </label>
                            </div>
                        </div>
                    </div>

                    {this.renderFileInputControl()}
            </section>
        )
    }
}

export default ControlPanel