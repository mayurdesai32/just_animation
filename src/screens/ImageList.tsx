import {View, Text, Image, ScrollView, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import { wp } from '../utils/common';
import Animated, { interpolate, SharedValue, useAnimatedReaction, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
const data = [
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',
  'https://picsum.photos/400/400',

];

const ListImageWidth= wp(80)

const itemInternalPadding=20
const itemContainerWidth = ListImageWidth + itemInternalPadding * 2;
const listPadding = (wp(100) - itemContainerWidth) / 2;
const ImageList = () => {

const scrollRef=useAnimatedRef<Animated.ScrollView>();

const scrollOffset=useScrollViewOffset(scrollRef)

// useAnimatedReaction(()=>{
//   console.log("scrollOffset.value", scrollOffset.value);
//   return scrollOffset.value
// },current=>{
//   console.log(current)
// })



  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Animated.ScrollView
        ref={scrollRef}
        pagingEnabled
        horizontal
        style={{flex: 1}}
        contentContainerStyle={{
          alignItems: 'center',
          paddingLeft: listPadding,
          paddingRight: listPadding,
        }}
        snapToInterval={itemContainerWidth}
        decelerationRate={'fast'}>
        {data.map((e, i) => (
          <SingleImage
            key={i}
            scrollOffset={scrollOffset}
            imgLink={e}
            index={i}
            ImageWidth={ListImageWidth}
            itemWidth={itemContainerWidth}
            style={{
              marginHorizontal: itemInternalPadding,
              borderRadius: wp(10),
            }}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default ImageList;


type SingleImageProp = {
  index: number;
  imgLink: string;
  itemWidth: number;
  ImageWidth:number;
  scrollOffset: SharedValue<number>;
  style: StyleProp<ViewStyle>;
};

const SingleImage = ({
  index,
  imgLink,
  itemWidth,
  ImageWidth,
  style,
  scrollOffset,
}: SingleImageProp) => {

const screenWidth = wp(50);
const rImageStyle=useAnimatedStyle(()=>{

  const translateX = interpolate(
    scrollOffset.value,
    [itemWidth * (index - 1), itemWidth * index, itemWidth * (index + 1)],
    [screenWidth, 0,screenWidth],
  );
  return {
    transform: [{scale: 1.5}, {translateX: translateX}],
  };
})

const rContainerStyle=useAnimatedStyle(()=>{

  const scale= interpolate(
    scrollOffset.value,
    [itemWidth * (index - 1), itemWidth * index, itemWidth * (index + 1)],
    [1, 1.05, 1],
  );

  return {
    transform:[
      {scale}
    ]
  }
})


  return (
    <Animated.View style={[style, {overflow: 'hidden'}, rContainerStyle]}>
      <Animated.Image
        source={{uri: imgLink}}
        resizeMode={'cover'}
        style={[{width: ImageWidth, aspectRatio: 0.6}, rImageStyle]}
      />
    </Animated.View>
  );
};

