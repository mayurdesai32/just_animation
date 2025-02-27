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
import SimpleShaderScreen from './src/screens/SimpleShaderScreen';
import CustomShaderScreen from './src/screens/CustomShaderScreen';
import SimpleShader2Screen from './src/screens/SimpleShader2Screen';
import SimpleShader3Screen from './src/screens/SimpleShader3Screen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SimpleShader3Screen12">
            <Stack.Screen
              name="home"
              component={HomeScreens}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="BounceSquare1"
              component={BounceSquare}
              options={{title: 'Bounce Square', headerShown: true}}
            />
            <Stack.Screen
              name="MyPanGesture2"
              component={MyPanGesture}
              options={{
                title: 'Pan Gesture',

                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SpatialTapGesture3"
              component={SpatialTapGesture}
              options={{title: 'Tap Gesture'}}
            />
            <Stack.Screen
              name="ImageList4"
              component={ImageList}
              options={{title: 'ImageList', headerShown: true}}
            />
            <Stack.Screen
              name="AnimatedTextScreen5"
              component={AnimatedTextScreen}
              options={{title: 'AnimatedText', headerShown: true}}
            />
            <Stack.Screen
              name="LayoutAnimationComp6"
              component={LayoutAnimationComp}
              options={{title: 'LayoutAnimationComp', headerShown: true}}
            />
            <Stack.Screen
              name="InputNumber7"
              component={InputNumber}
              options={{title: 'InputNumber', headerShown: false}}
            />
            <Stack.Screen
              name="MyImageShader8"
              component={MyImageShader}
              options={{title: 'MyImageShader', headerShown: false}}
            />
            <Stack.Screen
              name="ButterFlyScreen9"
              component={ButterFlyScreen}
              options={{title: 'ButterFlyScreen', headerShown: false}}
            />
            <Stack.Screen
              name="SimpleShaderScreen10"
              component={SimpleShaderScreen}
              options={{title: 'SimpleShaderScreen', headerShown: false}}
            />
            <Stack.Screen
              name="SimpleShader2Screen11"
              component={SimpleShader2Screen}
              options={{title: 'SimpleShader2Screen', headerShown: false}}
            />

            <Stack.Screen
              name="SimpleShader3Screen12"
              component={SimpleShader3Screen}
              options={{title: 'SimpleShader3Screen', headerShown: false}}
            />

            {/* <Stack.Screen
              name="CustomShaderScreen11"
              component={CustomShaderScreen}
              options={{title: 'CustomShaderScreen', headerShown: false}}
            /> */}
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
