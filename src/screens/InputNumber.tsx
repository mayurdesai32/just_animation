import {View, Text, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import {hp, wp} from '../utils/common';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


const data = ["1","2","3","4","5","6","7","8","9", null, "0", 'X'];


const InputNumber = () => {
    const [number, setNumber] = useState([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',

      'X',
    ]);

const updateNum=(e:string)=>{
  console.log(e)
setNumber(prev=>([...prev,e]) );
}


  return (
    <View style={{flex: 1, backgroundColor: 'black', paddingBottom: 40}}>
      <Screenpad number={number} />
      <Numpad data={data} updateNum={updateNum} />
    </View>
  );
};

export default InputNumber;


const Numpad = ({
  data,
  updateNum,
}: {
  data: Array<string | null>;
  updateNum: (e: string) => void;
}) => {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        gap: wp(3),
        flexWrap: 'wrap',
      }}>
      {data.map((e, i) => (
        <Numb
          key={i}
          title={e}
          updateNum={() => {
            if (typeof e === 'string') {
              updateNum(e);
            }
          }}
        />
      ))}
    </View>
  );
};

const Numb = ({
  title,
  updateNum,
}: {
  title: string | number | null;

  updateNum: (e: number) => void;
}) => {
  const isActive = useSharedValue(false);
  const tapGesture = Gesture.Tap()
    .enabled(title !== null)
    .onBegin(() => {
      isActive.value = true;
    })
    .onTouchesUp(()=>{
        if(typeof title=== 'number'){
            runOnJS(updateNum);

        }
     
    })
    .onFinalize(() => {
      isActive.value = false;
    });

  const rButtonStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isActive.value ? 'rgba(255,255,255,0.3)' : 'transparent',
        // isActive.value ? 'rgba(236, 96, 96, 0.2)' : 'red',
      ),
      transform: [
        {
          scale: withTiming(isActive.value ? 0.95 : 1),
        },
      ],
    };
  }, []);

  return (
    <View
      style={{
        flexBasis: wp(30),
        height: wp(25),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <GestureDetector gesture={tapGesture}>
        <Animated.View
          style={[
            {
              // backgroundColor: 'red',
              paddingVertical: wp(6),
              paddingHorizontal: wp(12),
              borderRadius: wp(12),
            },
            rButtonStyle,
          ]}>
          <Text style={{color: 'white', fontSize: hp(2.8), fontWeight: '800'}}>
            {title}
          </Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const Screenpad = ({number}:{number:Array<string>}) => {
  return (
    <View
      style={{
        // flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '50%',
      }}>
      <Text style={{fontSize: hp(14), fontWeight: '600', color: 'white'}}>
        {number.map(e=>e)}
      </Text>
    </View>
  );
};
