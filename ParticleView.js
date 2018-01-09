/*
  @providesModule ParticleView
*/
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var PropTypes = require('prop-types');
var GPHParticleView = ReactNative.requireNativeComponent('GPHParticleView', null);

var {
  View
} = ReactNative;

class ParticleView extends React.Component {

  static propTypes = {
    emitterPosition:      PropTypes.shape({x:PropTypes.number, y:PropTypes.number}),
    emitterZPosition:     PropTypes.number,
    emitterShape:         PropTypes.oneOf(['point', 'line', 'rectangle', 'circle', 'cuboid', 'sphere']),
    emitterSize:          PropTypes.shape({width:PropTypes.number, height:PropTypes.number}),
    emitterMode:          PropTypes.oneOf(["points", 'outline', 'surface', 'volume']),

    // specifies the order the particles are rendered on the screen
    renderMode:           PropTypes.oneOf(["unordered", "oldestFirst", "oldestLast", "backToFront", "additive"]),
    emitterDepth:         PropTypes.number,
    preservesDepth:       PropTypes.bool,

    // specifies the begin time of the particle emitter - specified in milliseconds
    beginTimeOffset:      PropTypes.number,
    // specifies whether the begin time should use the current media time
    useCurrentMediaTime:  PropTypes.bool,

    // the next five properties are multipliers of the ParticleCell's property with the same name
    // so a scale property of "2" would double the scale of all the enclosed ParticleCells
    birthRate:            PropTypes.number,
    lifetime:             PropTypes.number,
    velocity:             PropTypes.number,
    scale:                PropTypes.number,
    spin:                 PropTypes.number,

    seed:                 PropTypes.number,
    ...View.propTypes
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <GPHParticleView {...this.props}></GPHParticleView>);
  }
}

ParticleView.defaultProps = {
  birthRate: 1,
  lifetime: 1,
  emitterPosition: {x:0, y:0},
  emitterZPosition: 0,
  emitterShape: 'point',
  emitterSize: {width:0, height:0},
  emitterMode: 'volume',
  renderMode: 'unordered',
  emitterDepth: 0,
  preservesDepth: false,
  velocity: 1,
  scale: 1,
  spin: 1,
  seed: 0
};

module.exports = ParticleView;
