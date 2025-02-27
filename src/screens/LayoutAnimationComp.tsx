import {LayoutAnimation, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import {wp} from '../utils/common';
import Animated, { FadeIn, FadeOut, Keyframe, LinearTransition } from 'react-native-reanimated';



const LayoutAnimationComp = () => {
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
      {/* < EnterAndExist /> */}
      <MultipleList />
    </View>
  );
}


export default LayoutAnimationComp;

const styles = StyleSheet.create({});







const EnterAndExist = () => {
  const [isVisible, setIsVisible] = useState(true);

  const CustomFlipOut = new Keyframe({
    from: {
      opacity: 1,
      transform: [
        {
          perspective: 400,
        },
        {
          rotateX: '0deg',
        },
      ],
    },
    to: {
      opacity: 0,
      transform: [
        {
          perspective: 400,
        },
        {
          rotateX: '90deg',
        },
      ],
    },
  });

  const CustomFlipIn = new Keyframe({
    0: {
      opacity: 0,
      transform: [
        {
          perspective: 400,
        },
        {
          rotateX: '90deg',
        },
      ],
    },
    100: {
      opacity: 1,
      transform: [
        {
          perspective: 400,
        },
        {
          rotateX: '0deg',
        },
      ],
    },
  }).duration(1000);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        setIsVisible(prev => !prev);
        console.log('pressed');
      }}
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {isVisible && (
        <Animated.View
          // see the doc for  entering exisiting
          // entering={FadeIn.duration(1000)}
          // exiting={FadeOut}
          entering={CustomFlipIn}
          exiting={CustomFlipOut}
          style={{
            height: wp(20),
            backgroundColor: 'blue',
            borderRadius: wp(2),
            width: wp(20),
          }}
        />
      )}
    </TouchableOpacity>
  );
};




const MultipleList = () => {

const [ids,setIds]=useState<number[]>([0])

  return (
    <View style={{flex:1}} onTouchEnd={()=>{
      setIds(prev => [prev.length, ...prev]);
    }}>
      <ScrollView style={{flex: 1}} contentContainerStyle={{paddingTop: 70}}>
        {ids.map((e, i) => {
          return (
            <Animated.View
              // layout={LinearTransition}
              layout={LinearTransition.duration(1000)}
              // layout={LinearTransition.springify()}
              entering={FadeIn.duration(1000)}
              exiting={FadeOut.duration(1000)}
              key={e}
              style={{
                height: 90,
                width: '95%',
                backgroundColor: 'blue',
                borderRadius: 20,
                alignSelf: 'center',
                marginBottom: 10,
              }}
            />
          );
        })}

        {/* <EnterAndExist /> */}
      </ScrollView>
    </View>
  );
};
