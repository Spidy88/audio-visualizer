var FPS = React.createClass({
    getInitialState: function() {
        return {
            lastRenderTime: 0,
            isMounted: false,
            fps: 0
        };
    },

    componentDidMount: function() {
        this.state.lastRenderTime = Date.now();
        this.state.isMounted = true;

        this.setState({
            lastRenderTime: Date.now(),
            isMounted: true
        });

        this.updateFPS();
    },

    componentWillUnmount: function() {
        this.setState({
            isMounted: false
        });
    },

    updateFPS: function() {
        var currentRenderTime = Date.now();
        var deltaRenderTime = (currentRenderTime - this.state.lastRenderTime) / 1000;

        // We'll assumed deltaRenderTime is never 0
        var fps = Math.floor(1.0 / deltaRenderTime);

        this.setState({
            lastRenderTime: currentRenderTime,
            fps: fps
        });

        if( this.state.isMounted ) {
            requestAnimationFrame( this.updateFPS );
        }
    },

    render: function() {
        return (
            <div className="fps">{ this.state.fps } FPS</div>
        );
    }
});

ReactDOM.render(<FPS />, document.querySelector('#fps'));