import { View, Text, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { hp, wp } from '../utils/common'
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector, gestureHandlerRootHOC, GestureHandlerRootView } from 'react-native-gesture-handler';
import HeaderComp from '../components/HeaderComp';

const MyPanGesture = (props:any) => {
      const translateX = useSharedValue(0);
      const translateY = useSharedValue(0);
      const context =useSharedValue({x:0,y:0});
      const isDragging = useSharedValue(false);

  const panGesture= Gesture.Pan().onBegin(event=>{
    isDragging.value=true;
    context.value={x:translateX.value,y:translateY.value}
  }).onUpdate(event =>{
    // const {translationX, translationY} =event;
    translateX.value =event.translationX +context.value.x;
    translateY.value = event.translationY + context.value.y;
    // console.log(event.translationX, event.translationY);
  }).onFinalize(event=>{
 isDragging.value = false;
  });


const rotate =useDerivedValue(()=>{
  return withSpring(isDragging.value ? '45deg' : '0deg'); 
})


const color = useDerivedValue(() => {
  if (isDragging.value) {
 return 'blue'
  }

const isInTheWhiteSpace =translateY.value<0;
const isInTheBlackSpace = translateY.value > 0;

if (isInTheWhiteSpace) {
  return 'black';
}

if (isInTheBlackSpace) {
  return 'white';
}

 return 'blue';
});

const animatedColor = useDerivedValue(() => {
return withTiming(color.value)
})


  const rStyle= useAnimatedStyle( ()=>  {
    return {
      backgroundColor: animatedColor.value,
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {rotate: rotate.value},
      ],
    };
     
  },[]);
  return (
    <View
      style={{flex: 1, paddingTop: Platform.OS == 'ios' ? 60 : 0}}>
      <HeaderComp title="My Pan Gesture "  goback={props.navigation.goback}/>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',

          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.Box, rStyle]} />
        </GestureDetector>
        <View style={styles.bottomBackground} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Box: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(4),
    backgroundColor: 'blue',
    zIndex:2
  },
  bottomBackground: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'black',
    width: wp(100),
    height: hp(46.5),
    zIndex: 1,
  },
});
export default MyPanGesture;