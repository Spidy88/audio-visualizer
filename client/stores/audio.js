import { action, computed, observable } from 'mobx'

class AudioStore {
    context = new AudioContext()
    inputNode = null
    micInputNode = null
    mp3InputNode = null
    volumeNode = this.context.createGain()
    analyserNode = this.context.createAnalyser()

    @observable
    freqByteData = null

    constructor() {
        this.analyserNode.fftSize = this.fftSize;
        this.volumeNode.connect(this.analyserNode)
        this.volumeNode.gain.value = this.volume / 100
        this.freqByteData = new Uint8Array(this.analyserNode.frequencyBinCount);
        this.freqByteData.fill(0);
    }

    @action
    connectInput = (inputNode) => {
        this.inputNode = inputNode
        this.inputNode.connect(this.volumeNode)
    }

    @action
    disconnectInput = () => {
        if( this.inputNode ) {
            this.inputNode.disconnect()
        }
    }

    @action
    updateAudioData = () => {
        let freqByteData = new Uint8Array(this.analyserNode.frequencyBinCount);
        this.analyserNode.getByteFrequencyData(freqByteData)
        this.freqByteData = freqByteData
    }

    @observable
    fftSize = Math.pow(2, 8)

    @observable
    volume = 50

    @observable
    hasMicPermission = false

    @observable
    error = ''

    @computed get dataPoints() {
        const MAX_FREQ_RANGE = 255
        const MAX_AMP_RANGE = 50
        const steps = this.freqByteData.length
        // Move center and radius to visualizer
        const center = [150, 150]
        const radius = 50
        const circles = []
        for( let i = 0; i < steps; ++i ) {
            const amp = (this.freqByteData[i] / MAX_FREQ_RANGE) * MAX_AMP_RANGE

            const x = (center[0] + (radius + amp) * Math.cos(2 * Math.PI * i / steps))
            const y = (center[1] + (radius + amp) * Math.sin(2 * Math.PI * i / steps))

            circles.push({ x: x, y: y })
        }

        return circles
    }

    @action
    changeVolume = (value) => {
        this.volume = value
        this.volumeNode.gain.value = this.volume / 100
    }

    @action
    changeFFTSize = (value) => {
        this.fftSize = value
        this.analyserNode.fftSize = this.fftSize

        if( this.freqByteData.length != this.analyserNode.frequencyBinCount ) {
            this.freqByteData = new Uint8Array(this.analyserNode.frequencyBinCount)
            this.freqByteData.fill(0)
        }
    }

    @action
    connectMic = () => {
        this.disconnectInput()

        if( this.hasMicPermission ) {
            console.log('Already has mic permissions')
            return
        }

        if( !navigator.getUserMedia ) {
            navigator.getUserMedia = navigator.webkitGetUserMedia;
        }

        this.error = ''

        navigator.getUserMedia(
            { audio: true },
            (stream) => {
                console.log('Successfully got user media: ', stream)
                this.hasMicPermission = true
                this.micInputNode = this.context.createMediaStreamSource(stream)

                this.connectInput(this.micInputNode)
            },
            (reason) => {
                console.log('Failed to get user media: ', reason)
                this.error = reason
            }
        );
    }
}

export default AudioStore