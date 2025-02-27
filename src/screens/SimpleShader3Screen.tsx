
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hp, wp } from '../utils/common'

import {
  Canvas,
  Fill,
  Shader,
  Skia,
  vec,
  useClock,
} from '@shopify/react-native-skia';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';


const source = Skia.RuntimeEffect.Make(`
 uniform float4 colors[4];
 uniform float2 center;
 uniform float2 pointer;
 uniform float clock;
const float4 black=vec4(0,0,0,1);

  struct Paint {
  float4 color;
  bool stroke;
  float strokeWidth;
  };


float sdCircle(vec2 xy, float radius){
return length(xy) - radius;
}


float sdLine(vec2 p, vec2 a, vec2 b){
    vec2 pa = p - a;
    vec2 ba = b - a;

    // float q= dot(pa,ba)/length(ba);
    // if(dot(pa,ba)<0){
    // return length(pa);
    // }else if(length(ba)<q){
    // return length(p-b);
    // }
    // return sqrt(pow(length(pa),2) - pow(q,2));
// or
    float h= saturate(dot(pa,ba)/dot(ba,ba));
    return length(pa - ba * h);
    

}



float4 draw(float4 color, float d, Paint paint){
  bool isFill = paint.stroke == false && d<0;
  bool isStroke = paint.stroke == true && abs(d) <= paint.strokeWidth/2;
  if(isFill || isStroke){
    return paint.color;
  }
  return color;
}




float4 drawCircle(float4 color,float2 pos, float radius, Paint paint){
    float d = sdCircle(pos,radius);
    return draw(color,d,paint);
}



float4 drawLine(float4 color,float2 pos,float2 a,float2 b, Paint paint){
    float d = sdLine(pos,a,b);
    return draw(color,d,paint);
}



 vec4 main(vec2 xy){
  float strokeWidth=20;
  float radius =center.x - strokeWidth/2;
  float4 color = colors[1];
  float d =sdLine(xy,center,pointer);
  float offset = -clock *0.1;
// float i = mod(floor(d/strokeWidth),4);
  float i = mod(floor((d +offset)/strokeWidth),4);
if(i==0){
color=colors[0];
} else if(i==1){
color=colors[1];
} else if(i==2){
color=colors[2];
} else if(i==3){
color=colors[3];
} 


   return color;

}







    `)!;

const colors=["#dafb61","#61DAFB","#fb61da",'#61fbcf'].map((c)=>Skia.Color(c));

const SimpleShader3Screen = () => {
  const center = vec(wp(50), hp(50));
  const pointer = useSharedValue(vec(0, 0));
  const clock = useClock();
  const panGesture = Gesture.Pan()
    .onBegin(e => {
      pointer.value = e;
      console.log('hgfdgdfg');
    })
    .onUpdate(e => {
      pointer.value = e;
    })
    .onEnd(() => {});

  // const uniforms = {colors, center};
  const uniforms = useDerivedValue(
    () => ({colors, center, pointer: pointer.value,clock: clock.value}),
    [pointer, clock],
  );
  return (
    <View
      style={{
        flex: 1,
        //    marginTop: hp(6),
        backgroundColor: 'black',
      }}>
      <GestureDetector gesture={panGesture}>
        <Canvas style={{flex: 1}}>
          <Fill>
            <Shader source={source} uniforms={uniforms} />
          </Fill>
        </Canvas>
      </GestureDetector>
    </View>
  );
};

export default SimpleShader3Screen;

const styles = StyleSheet.create({})