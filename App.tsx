import React from 'react';
import {
  Button,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  gestureHandlerRootHOC,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import HomeScreens from './src/screens/HomeScreens';
import BounceSquare from './src/screens/BounceSquare';
import MyPanGesture from './src/screens/MyPanGesture';
import SpatialTapGesture from './src/screens/SpatialTapGesture';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ImageList from './src/screens/ImageList';
import AnimatedTextScreen from './src/screens/AnimatedTextScreen';
import LayoutAnimationComp from './src/screens/LayoutAnimationComp';
import InputNumber from './src/screens/InputNumber';
import MyImageShader from './src/screens/MyImageShader';
import ButterFlyScreen from './src/screens/ButterFlyScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="ButterFlyScreen">
            <Stack.Screen
              name="home"
              component={HomeScreens}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="BounceSquare"
              component={BounceSquare}
              options={{title: 'Bounce Square', headerShown: true}}
            />
            <Stack.Screen
              name="MyPanGesture"
              component={MyPanGesture}
              options={{
                title: 'Pan Gesture',

                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SpatialTapGesture"
              component={SpatialTapGesture}
              options={{title: 'Tap Gesture'}}
            />
            <Stack.Screen
              name="ImageList"
              component={ImageList}
              options={{title: 'ImageList', headerShown: true}}
            />
            <Stack.Screen
              name="AnimatedTextScreen"
              component={AnimatedTextScreen}
              options={{title: 'AnimatedText', headerShown: true}}
            />
            <Stack.Screen
              name="LayoutAnimationComp"
              component={LayoutAnimationComp}
              options={{title: 'LayoutAnimationComp', headerShown: true}}
            />
            <Stack.Screen
              name="InputNumber"
              component={InputNumber}
              options={{title: 'InputNumber', headerShown: false}}
            />
            <Stack.Screen
              name="MyImageShader"
              component={MyImageShader}
              options={{title: 'MyImageShader', headerShown: false}}
            />
            <Stack.Screen
              name="ButterFlyScreen"
              component={ButterFlyScreen}
              options={{title: 'ButterFlyScreen', headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
        {/* <MyPanGesture /> */}
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default gestureHandlerRootHOC(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
