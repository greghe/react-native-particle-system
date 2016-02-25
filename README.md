# A Particle System for React Native (iOS)
###Add particle effects to your React Native app

![](particle.gif)
##Usage
A particle system consist of one ParticleView component enclosing one or more ParticleCells. Each ParticleCell in turn encloses an Image component that is used to render the particle:

```
<ParticleView ...
  <ParticleCell ...
     <Image ... />
  </ParticleCell>
        .
        .
        .
  <ParticleCell ...
     <Image ... />
  </ParticleCell>
</ParticleView>
```

Both the ParticleView and the ParticleCells are highly configurable each with its own set of properties. Note that some of the ParticleView's properties are multiplied with the ParticleCell's properties to determine the final value. For example, the 'lifetime' property of the ParticleView is multiplied with the 'lifetime' property of a ParticleCell to determine the effective lifetime of that ParticleCell.

All of the properites correspond directly with the properties on CAEmitterLayer/CAEmitterCell, except the lifetime property of the former which is expressed in milliseconds in the JS component.

##Future Work
Clearly a version for Android would be welcome. 

