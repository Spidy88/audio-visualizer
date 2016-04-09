var FFT_SIZE = 256;
var MAX_FREQ_RANGE = 255;
var MAX_AMP_RANGE = 25;

var visualizer = Snap('#visualizer');
var circleRefs = [];

var context = new AudioContext();
var micInput;
var volumeNode;
var analyzerNode;
var freqByteData;

initAudio();

function initSVG() {
    visualizer.attr({
        stroke: '#000',
        strokeWidth: 2,
        fill: '#FFF',
        width: 500,
        height: 500
    });

    var circles = calculateCirclePositions(freqByteData);
    circleRefs = drawCircles(circles);
}

function drawCircles(circles) {
    var circleRefs = [];

    var circleRef;
    var i;
    for(i = 0; i < circles.length; i++ ) {
        circleRef = visualizer.circle(circles[i].x, circles[i].y, 2);
        circleRef.attr({
            fill: '#000',
            strokeWidth: 0
        });
        circleRefs.push(circleRef);
    }

    return circleRefs;
}

function initAudio() {
    // If we wanted to write our own polyfill;
    if( !navigator.getUserMedia ) {
        navigator.getUserMedia = navigator.webkitGetUserMedia;
    }

    var constraints = {
        audio: {
            mandoratory: {
                googEchoCancellation: false,
                googAutoGainControl: false,
                googNoiseSuppression: true,
                googHighpassFilter: false
            },
            optional: []
        }
    };
    var onMediaSuccess = function(stream) {
        micInput = context.createMediaStreamSource(stream);
        volumeNode = context.createGain();
        analyzerNode = context.createAnalyser();

        analyzerNode.fftSize = FFT_SIZE;

        micInput.connect(volumeNode);
        volumeNode.connect(analyzerNode);

        freqByteData = new Uint8Array(analyzerNode.frequencyBinCount);
        freqByteData.fill(0);
        initSVG();

        updateVisualizer();
    };
    var onMediaFailure = function(reason) {
        console.error('Failed to get media');
        $('#media-error')
            .removeClass('hide')
            .text('Unable to get user media device: ', + reason.toString());
    };

    navigator.getUserMedia(constraints, onMediaSuccess, onMediaFailure);
}

function updateVisualizer() {
    analyzerNode.getByteFrequencyData(freqByteData);

    var circles = calculateCirclePositions(freqByteData);

    animatePoints(circles);

    requestAnimationFrame(updateVisualizer);
}

function calculateCirclePositions(freqData) {
    var steps = freqData.length;
    var center = [150, 150];
    var radius = 50;
    var circles = [];

    var i;
    for( i = 0; i < steps; i++ ) {
        var amp = (freqData[i] / MAX_FREQ_RANGE) * MAX_AMP_RANGE;

        var x = (center[0] + (radius + amp) * Math.cos(2 * Math.PI * i / steps));
        var y = (center[1] + (radius + amp) * Math.sin(2 * Math.PI * i / steps));

        circles.push({ x: x, y: y });
    }

    return circles;
}

function animatePoints(points) {
    var fill;
    var i;
    for( i = 0; i < points.length; i++ ) {
        fill = freqByteData[i].toString(16);
        fill = '#0000' + (fill.length === 1 ? '0' + fill : fill);
        
        circleRefs[i].animate({
            'cx': points[i].x,
            'cy': points[i].y
        }, 100, mina.linear);

        circleRefs[i].attr({
            'fill': fill
        });
    }
}