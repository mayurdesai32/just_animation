import {View, Text, StyleSheet, } from 'react-native';
import React from 'react';
import {hp, wp} from '../utils/common';
import Animated, {
  cancelAnimation,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  gestureHandlerRootHOC,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
  const circleRadius = wp(4);
const SpatialTapGesture = () => {
  const left = useSharedValue(0);
  const top = useSharedValue(0);
  const scale = useSharedValue(0);
    const previousLeft = useSharedValue(0);
    const previousTop = useSharedValue(0);
// const tap=Gesture.



  const tapGesture = Gesture.Tap().onBegin(event=>{ 
    previousLeft.value=left.value;
    previousTop.value=top.value;
    left.value=event.x;
    top.value=event.y
  })
                         
 
 

  const rStyle = useAnimatedStyle(() => {
    return {
      left: left.value - circleRadius,
      top: top.value - circleRadius,
      transform:[{scale:scale.value}]
    };
  }, []);


  const rPreviousStyle = useAnimatedStyle(() => {
    return {
      left: previousLeft.value - circleRadius,
      top: previousTop.value - circleRadius,
      transform: [{scale: scale.value}],
    };
  }, []);

 


   const animatedTop = useDerivedValue(()=>{
    return withTiming(top.value,
    {duration:1000,easing:Easing.inOut(Easing.quad)})
  })
   const animatedLeft = useDerivedValue(() => {
     return withTiming(left.value, {
       duration: 1000,
       easing: Easing.inOut(Easing.quad),
     });
   });

  const rMagicCircleStyle = useAnimatedStyle(() => {
    return {
      top: animatedTop.value,
      left: animatedLeft.value,
      transform: [{scale: scale.value}],
    };
  }, []);


useAnimatedReaction(
  ()=>{return left.value},(curr,prev)=>{

if(curr !==prev && curr !==0){
  cancelAnimation(scale)
  scale.value=0
scale.value = withSpring(1);
}


  }
)



  return (
    <View
      style={{
        flex: 1,
      }}>
      <GestureDetector gesture={tapGesture}>
        <Animated.View style={[styles.container]}>
          <Animated.View style={[styles.baseCirle, rStyle]} />
          <Animated.View style={[styles.baseCirle, rPreviousStyle]} />
          <Animated.View style={[styles.baseCirle,{backgroundColor:'#0074d3'}, rMagicCircleStyle]} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  baseCirle: {
    height: circleRadius * 2,
    width: circleRadius * 2,
    backgroundColor: '#2f2f2f',
    borderRadius: circleRadius,
    position:"absolute"
  },

  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
export default SpatialTapGesture;
