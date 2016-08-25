# A Particle System for React Native (iOS)
###Add particle effects to your React Native app

![](particle.gif)
##Add it to your project
###iOS
* Run `npm install react-native-particle-system --save`

Then:

1. Open your project in XCode, select the folder you want project file in, right click it and click `Add Files to "Your Folder Name"`.  Look under `node_modules/react-native-particle-system` and add `GPHParticleSystem.xcodeproj`.
2. Add `GPHParticleSystem` to `Build Phases -> Target Dependencies`.
3. Add `libGPHParticleSystem.a` to `Build Phases -> Link Binary With Libraries`.

Then:
* Whenever you want to use it within React code now you can: `import ParticleView from 'react-native-particle-system/ParticleView`

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

