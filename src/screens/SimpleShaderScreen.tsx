import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hp, wp } from '../utils/common'

import {
  Canvas,
  Fill,
  Shader,
  Skia,
  vec,
} from '@shopify/react-native-skia';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';


const source = Skia.RuntimeEffect.Make(`
 uniform float4 colors[4];
 uniform float2 center;
 uniform float2 pointer;

const float4 black=vec4(0,0,0,1);

  struct Paint {
  float4 color;
  bool stroke;
  float strokeWidth;
  };


float sdCircle(vec2 xy, float radius){
return length(xy) - radius;
}

float4 drawCircle(float4 color,float2 pos, float radius, Paint paint){
  float d= sdCircle(pos,radius);
  bool isFill = paint.stroke == false && d<0;
  bool isStroke = paint.stroke == true && abs(d) <= paint.strokeWidth/2;
  if(isFill || isStroke){
    return paint.color;
  }
  return color;
}

//  vec4 main(vec2 xy){
//  float strokeWidth=20;
//  float radius =center.x;
//  float d = sdCircle(xy-center,radius);
// if(abs(d)<= strokeWidth/2){
// return colors[0];
// } else if(d<0){
//  return colors[2];
//  }
//  return colors[3]; 
// }

  vec4 main(vec2 xy){
  float strokeWidth=20;
  float radius =center.x - strokeWidth/2;
  float4 color = colors[1];
  color = drawCircle(color, xy - center, radius, Paint(colors[2], false, 0));
  color = drawCircle(color, xy - pointer, 10, Paint(black, false, 0));

  float d=sdCircle(pointer-center,radius);
  color = drawCircle(color, xy - pointer, d, Paint(black, false, 3));
  return color;
}










    `)!;

const colors=["#dafb61","#61DAFB","#fb61da",'#61fbcf'].map((c)=>Skia.Color(c));

const SimpleShaderScreen = () => {
  const center=vec(wp(50),hp(50))
  const pointer = useSharedValue(vec(0, 0));
  const panGesture = Gesture.Pan().onBegin((e)=>{
 pointer.value = e;
    console.log("hgfdgdfg")
  })
  .onUpdate((e) => {
        pointer.value = e;
  }).onEnd(()=>{});

// const uniforms = {colors, center};
  const uniforms = useDerivedValue(() => ({colors,center,pointer: pointer.value}),[pointer]);
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
}

export default SimpleShaderScreen

const styles = StyleSheet.create({})