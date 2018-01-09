/*
    @providesModule ParticleCell
*/
'use strict';


var React = require('react');
var PropTypes = require('prop-types');

var ReactNative = require('react-native');
var GPHParticleCell = ReactNative.NativeModules.GPHParticleCell;


var {
  ColorPropType
} = React;

class ParticleCell extends React.Component {

    static propTypes = {
      name                   : PropTypes.string,

      enabled                : PropTypes.bool,

      // a unit rectangle specifying the portion of the particle image to render
      contentsRect           : PropTypes.shape({ x: PropTypes.number, y: PropTypes.number, width: PropTypes.number, height: PropTypes.number}),

      magnificationFilter    : PropTypes.oneOf(["linear", "nearest"]),
      minificationFilter     : PropTypes.oneOf(["linear", "nearest"]),
      minificationFilterBias : PropTypes.number,

      scale                  : PropTypes.number,
      scaleRange             : PropTypes.number,
      scaleSpeed             : PropTypes.number,

      color                  : ColorPropType,
      redRange               : PropTypes.number,
      greenRange             : PropTypes.number,
      blueRange              : PropTypes.number,
      alphaRange             : PropTypes.number,

      // the rate at which the individaul color components can change
      redSpeed               : PropTypes.number,
      greenSpeed             : PropTypes.number,
      blueSpeed              : PropTypes.number,
      alphaSpeed             : PropTypes.number,

      // how long a particle exists in the system - specified in milliseconds
      lifetime               : PropTypes.number,
      lifetimeRange          : PropTypes.number,

      // how many particles are created each second
      birthRate              : PropTypes.number,

      velocity               : PropTypes.number,
      velocityRange          : PropTypes.number,

      xAcceleration          : PropTypes.number,
      yAcceleration          : PropTypes.number,
      zAcceleration          : PropTypes.number,

      spin                   : PropTypes.number,
      spinRange              : PropTypes.number,

      // expressed in radians - specifies the inital direction of a particle
      emissionLatitude       : PropTypes.number,
      emissionLongitude      : PropTypes.number,
      emissionRange          : PropTypes.number,

      beginTime              : PropTypes.number,
      // basic duration - in milliseconds
      duration               : PropTypes.number,

      // The rate of the layer. Used to scale parent time to local cell time/
      speed                  : PropTypes.number,

      // Additional offset in active local time. (ms)
      timeOffset             : PropTypes.number,

      // The repeat count of the cell. May be fractional.
      repeatCount            : PropTypes.number,
      repeatDuration         : PropTypes.number,
      autoreverses           : PropTypes.bool,

      // Defines how the timed cell behaves outside its active duration.
      fillMode               : PropTypes.oneOf(['backwards', 'forwards', 'both', 'removed'])
    };

    constructor(props) {
      super(props);
    }

    render() {
      var {color,
        ...otherProps} = this.props;
      color = ReactNative.processColor(color);

      return (
        <GPHParticleCell props={{color: color, ...otherProps}}/>
        );
    }
}

ParticleCell.defaultProps = {
    name                   : null,

    enabled                : false,

    color                  : 'white',

    lifetime               : 0,
    lifetimeRange          : 0,
    birthRate              : 0,

    emissionLatitude       : 0 * 2 * 3.14159,
    emissionLongitude      : 0 * 2 * 3.14159,
    emissionRange          : 0 * 2 * 3.14159,

    velocity               : 0,
    velocityRange          : 0,

    xAcceleration          : 0,
    yAcceleration          : 0,
    zAcceleration          : 0,

    scale                  : 1,
    scaleRange             : 0,
    scaleSpeed             : 0,

    spin                   : 0,
    spinRange              : 0,

    redRange               : 0,
    greenRange             : 0,
    blueRange              : 0,
    alphaRange             : 0,

    redSpeed               : 0,
    greenSpeed             : 0,
    blueSpeed              : 0,
    alphaSpeed             : 0,

    contentScale           : 1,
    contentsRect           : { x: 0, y: 0, width: 1, height: 1},

    magnificationFilter    : "linear",
    minificationFilter     : "linear",
    minificationFilterBias : 0,

    beginTime              : 0,
    duration               : 0,
    speed                  : 1,

    timeOffset             : 0,

    repeatCount            : 0,
    repeatDuration         : 0,
    autoreverses           : false,

    fillMode               : 'removed',
};

//module.exports = ParticleCell;

module.exports = ReactNative.requireNativeComponent('GPHParticleCell', null);
