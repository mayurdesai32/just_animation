import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Canvas, Fill, ImageShader, Shader, Skia, useImage } from '@shopify/react-native-skia';
import { hp, wp } from '../utils/common';
import Slider from '@react-native-community/slider';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { transition } from '../helpers/transition';

const ButterFlyScreen = () => {

const butterFlyWaveShader = `
uniform float amplitude; // = 2.0
uniform float waves; // = 5.0
uniform float colorSeparation; // = 0.6
float PI = 3.14159265358979323846264;
float compute(vec2 p, float progress, vec2 center) {
vec2 o = p*sin(progress * amplitude)-center;
// horizontal vector
vec2 h = vec2(1., 0.);
// butterfly polar function (don't ask me why this one :))
float theta = acos(dot(o, h)) * waves;
return (exp(cos(theta)) - 2.*cos(4.*theta) + pow(sin((2.*theta - PI) / 24.), 5.)) / 10.;
}
vec4 transition(vec2 uv) {
  vec2 p = uv.xy / vec2(1.0).xy;
  float inv = 1. - progress;
  vec2 dir = p - vec2(.5);
  float dist = length(dir);
  float disp = compute(p, progress, vec2(0.5, 0.5)) ;
  vec4 texTo = getToColor(p + inv*disp);
  vec4 texFrom = vec4(
  getFromColor(p + progress*disp*(1.0 - colorSeparation)).r,
  getFromColor(p + progress*disp).g,
  getFromColor(p + progress*disp*(1.0 + colorSeparation)).b,
  1.0);
  return texTo*progress + texFrom*inv;
}

`;






// const shader = `
// uniform shader image1;
// uniform shader image2;

// uniform float progress;
// uniform float2 resolution;

// // uv (0,0)-(1,1)
// // fragCoord (0,0)-(width,height)
// half4 getFromColor(float2 uv, float2 resolution){
//     return image1.eval(uv*resolution);
// }

// half4 getToColor(float2 uv, float2 resolution){
//     return image2.eval(uv*resolution);
// }


// // main take x,y
// half4 main(float2 fragCoord){
//     // return vec4(0,0,0,0.1);
// //    return getToColor(fragCoord/resolution, resolution);

// return mix(getFromColor(fragCoord/resolution, resolution),
// getToColor(fragCoord/resolution, resolution),progress);
// }

// `;

const butterflyShaderTransition= transition(butterFlyWaveShader)

// const shadowRuntimeEffect = Skia.RuntimeEffect.Make(butterflyShaderTransition);






const canvasHeight = hp(70);
const canvasWidth= wp(95);


const image1 = useImage(require('../asset/image1.jpg'));
const image2 = useImage(require('../asset/image2.jpeg'));
const image3 = useImage(require('../asset/image3.jpeg'));
const image4 = useImage(require('../asset/image4.jpeg'));
const image5 = useImage(require('../asset/image5.jpeg'));
  const [sliderValue, setSliderValue] = useState(0);

const progress=useSharedValue(0);
const uniforms=useDerivedValue(()=>{
    return {
        
     amplitude: 2.0,  waves: 5.0,  colorSeparation:0.6,
        
        progress:progress.value,
        resolution:[canvasWidth,canvasHeight]
    };
},[canvasWidth,canvasHeight])

  return (
    <View
      style={{
        flex: 1,
        marginTop: hp(6),
        backgroundColor: 'black',
      }}>
      <Slider
        style={{
          width: canvasWidth,
          height: 40,
          marginBottom: hp(2),
          marginTop: hp(2),
        }}
        minimumValue={0}
        // value={sliderValue}
        // onValueChange={e => setSliderValue(e)}
        value={progress.value}
        onValueChange={e => (progress.value = e)}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      <Canvas
        style={{
          width: canvasWidth,
          height: hp(70),
          borderRadius: hp(4),
          alignSelf: 'center',
        }}>
        <Fill>
          <Shader
            source={butterflyShaderTransition!}
            // uniforms={{
            //   progress: sliderValue,
            //   resolution: [canvasWidth, canvasHeight],
            // }}
            uniforms={uniforms}>
            <ImageShader
              width={canvasWidth}
              fit={'cover'}
              height={canvasHeight}
              image={image1}
            />
            <ImageShader
              width={canvasWidth}
              fit={'cover'}
              height={canvasHeight}
              image={image4}
            />
          </Shader>
        </Fill>
      </Canvas>
    </View>
  );
}

export default ButterFlyScreen

const styles = StyleSheet.create({})