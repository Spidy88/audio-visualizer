import React from 'react'
import { Provider } from 'mobx-react'
import Header from './components/header'
import AudioVisual from './components/audio-visual'
import ControlPanel from './components/control-panel'
import AudioStore from './stores/audio'
import PlayerStore from './stores/player'

const stores = {
    audio: new AudioStore(),
    player: new PlayerStore()
}

const onAnimationFrame = () => {
    if( stores.player.isRunning ) {
        stores.audio.updateAudioData()
    }

    requestAnimationFrame(onAnimationFrame)
}

requestAnimationFrame(onAnimationFrame)

class App extends React.Component {
    render() {
        return (
            <Provider {...stores}>
                <section>
                    <Header />

                    <AudioVisual size={2} />

                    <ControlPanel />
                </section>
            </Provider>
        )
    }
}

export default App