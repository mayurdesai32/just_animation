import { View, Text, TouchableOpacity } from 'react-native'
import React, { VoidFunctionComponent } from 'react'
import { hp } from '../utils/common';

const HeaderComp = ({title, goback}: {title: string;goback: () => void}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30,
        paddingVertical: 20,
        paddingLeft: 10,
      }}>
      <TouchableOpacity onPress={goback}>
        <Text style={{ fontSize: hp(1.8)}}>Go Back</Text>
      </TouchableOpacity>
      <Text style={{textAlign: 'center',fontWeight:'600', fontSize: hp(3)}}>{title}</Text>
    </View>
  );
};

export default HeaderComp