
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hp, wp } from '../utils/common'
import { Canvas, Fill, Shader, Skia, vec } from '@shopify/react-native-skia'






const source = Skia.RuntimeEffect.Make(`
 uniform float4 colors[4];
 uniform float2 center;

float sdCircle(vec2 xy, float radius){
return length(xy) -radius;
}

float4 drawCircle(float4 color,float2 pos,float radius, Paint paint){

float d=sdCircle(pos,radius);
bool isFill = paint.stroke== false && d<0;
bool isStroke = paint.stroke == true && abs(d) <= paint.strokeWidth/2;
 if(isFill || isStroke){
 return paint.color;
 }
return color;
}


 vec4 main(vec2 xy){
 float strokeWidth=20;
 float radius =center.x;
 float d = sdCircle(xy-center,radius);
if(abs(d)<= strokeWidth/2){
return colors[0];
} else if(d<0){
 return colors[2];
 }
 return colors[3]; 
    }
    `)!;

const colors=["#dafb61","#61DAFB","#fb61da",'#61fbcf'].map((c)=>Skia.Color(c));

const CustomShaderScreen = () => {
  return (
    <View
        style={{
          flex: 1,
        //    marginTop: hp(6),
          backgroundColor: 'black',
        }}>
            <Canvas style={{ flex: 1 }}>
                <Fill> 
                    
                    <Shader source={source} uniforms={{colors, center:vec(wp(50),hp(50))}}/>
                </Fill>
            </Canvas>
    </View>
  )
}

export default CustomShaderScreen

const styles = StyleSheet.create({})