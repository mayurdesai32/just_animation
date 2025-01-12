import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { hp, wp } from '../utils/common'

const HomeScreens = () => {
// const data = Array(20).fill(2)
    const data=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]


    return (
        <View >
      
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', 
                    flexWrap: 'wrap', 
                    // gap:wp(3),
                    justifyContent: 'space-between' ,}}>
                    {data.map((e, i) => <ScreenComp key={i} title={e}  />)} 
            
               
                </View>
                </ScrollView>
        </View>

    )
}

export default HomeScreens

const styles = StyleSheet.create({})




const ScreenComp = ({ title, }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} 
            // onPress={goTo(index)}
        style={{
            width: wp(30), height: wp(28),
            marginBottom: hp(3),
            borderRadius: wp(3),
            justifyContent: 'center',
            backgroundColor: 'red'
        }}>
            <Text style={{ textAlign: 'center', fontSize:wp(4), fontWeight:'600', color:'white'}}>{title}</Text>
        </TouchableOpacity>
    )
}

