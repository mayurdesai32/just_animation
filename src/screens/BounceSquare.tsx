import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {hp, wp} from '../utils/common';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const BounceSquare = () => {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
  const rStyle = useAnimatedStyle(() => {
    return {
      // rotote we can also use rad , degree
      // if there translate in transform it should be alway 1st
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale: scale.value},
        {rotate: `${rotate.value}deg`},
      ],
    };
  }, []);




  const move=()=>{
    const MaxTranslation =100
    const tX = Math.random() * MaxTranslation * 2 - MaxTranslation;
     const tY = Math.random() * MaxTranslation * 2 - MaxTranslation;
translateX.value = withTiming(tX);
translateY.value = withTiming(tY);
  };


  return (
    <View style={{alignItems: 'center',
    justifyContent:'center'
    ,backgroundColor: 'white', flex: 1}}>
      <Text
        style={{
          position:'absolute',
          top:hp(1),
          color: 'red',
          fontSize: hp(4),
          fontWeight: '700',
          textAlign: 'center',
        }}>
        Bounce Square
      </Text>
      <Animated.View
        onTouchStart={() => {
          scale.value = withTiming(1.5);

          rotate.value = withTiming(rotate.value + 90);
        }}
        onTouchEnd={() => {
          scale.value = 1;
          rotate.value = withTiming(rotate.value + 90);
          // rotate.value = withRepeat(withTiming(rotate.value + 90), 4, true);
          //  if true-> reverse
        }}
        style={[
          {
            marginTop: hp(5),
            width: wp(20),
            height: wp(20),
            borderRadius: wp(4),
            backgroundColor: 'blue',
          },
          rStyle,
        ]}
      />
      <TouchableOpacity 
      onPress={move}
        style={{
          backgroundColor: 'black',
          borderRadius: hp(3),
          width: hp(6),
          height: hp(6),
          position:'absolute',
          bottom:hp(2),
          right:wp(4)
        }}
      />
    </View>
  );
};

export default BounceSquare;
