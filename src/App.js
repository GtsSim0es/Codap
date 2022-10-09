import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon, {Icons} from './components/Icons';
import Colors from './constants/Colors';
import * as Animatable from 'react-native-animatable';

import Login from './Login/Login';
import Register from './Login/Register';
//import List from './src/Listadmin';
//import Config from './Config/Config';
import Perfil from './Users/Perfil';
import Store from './Market/Store';
import Class from './Aulas/Class';
import Html from './Aulas/Html';
import Javascript from './Aulas/Javascript';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const TabArr = [
  {
    route: 'Home',
    label: 'Home',
    type: Icons.Ionicons,
    activeIcon: 'grid',
    inActiveIcon: 'grid-outline',
    component: Class,
  },
  /*{
    route: 'Chat',
    label: 'Chat',
    type: Icons.MaterialCommunityIcons,
    activeIcon: 'chat',
    inActiveIcon: 'chat-outline',
    component: Config,
  },*/
  {
    route: 'Store',
    label: 'Store',
    type: Icons.MaterialCommunityIcons,
    activeIcon: 'store-settings',
    inActiveIcon: 'store-settings-outline',
    component: Store,
  },
  {
    route: 'Account',
    label: 'Account',
    type: Icons.FontAwesome,
    activeIcon: 'user-circle',
    inActiveIcon: 'user-circle-o',
    component: Perfil,
  },
];

const TabButton = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: {scale: 0.5, rotate: '0deg'},
        1: {scale: 1.5, rotate: '360deg'},
      });
    } else {
      viewRef.current.animate({
        0: {scale: 1.5, rotate: '360deg'},
        1: {scale: 1, rotate: '0deg'},
      });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <Icon
          type={item.type}
          name={focused ? item.activeIcon : item.inActiveIcon}
          color={focused ? Colors.primary : Colors.primaryLite}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
};

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
          backgroundColor: '#141f29'
        },
      }}>
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => null
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeTabs}
        />
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Register"
          component={Register}
        />
        <Stack.Screen
          name="Css"
          component={Class}
        />
        <Stack.Screen
          name="Html"
          component={Html}
        />
        <Stack.Screen
          name="Javascript"
          component={Javascript}
        />
        

      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default App;