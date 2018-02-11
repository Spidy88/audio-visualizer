import { action, observable } from 'mobx'

class PlayerStore {
    @observable
    isRunning = false

    @observable
    inputType = ''

    @action
    startPlayer = () => {
        this.isRunning = true
    }

    @action
    stopPlayer = () => {
        this.isRunning = false
    }

    @action
    changeInput = (inputType) => {
        if( this.inputType === inputType ) {
            return
        }

        if( this.inputType === 'mic' ) {
            // Turn off mic
        }

        this.inputType = inputType
    }
}

export default PlayerStore