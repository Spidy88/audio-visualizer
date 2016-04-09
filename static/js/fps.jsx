var FPS = React.createClass({
    getInitialState: function() {
        return {
            lastRenderTime: 0,
            isMounted: false,
            fps: 0
        };
    },

    componentDidMount: function() {
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
        var deltaRenderTime = currentRenderTime - this.state.lastRenderTime;

        // We'll assumed deltaRenderTime is never 0
        var fps = 1.0 / deltaRenderTime;

        this.setState({
            fps: fps
        });

        if( !this.state.isMounted ) {
            requestAnimationFrame( this.updateFPS.bind( this ) );
        }
    },

    render: function() {
        return (
            <div className="fps">{{ this.fps }} FPS</div>
        );
    }
});

React.render(<FPS />, $('#fps'));