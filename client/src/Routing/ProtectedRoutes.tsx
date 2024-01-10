import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Home/HomeScreen'

const Tab = createBottomTabNavigator()

const ProtectedRoutes = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: true}}>
        <Tab.Group>
            <Tab.Screen 
                name="This Month" 
                component={HomeScreen}
                options={{
                    headerStyle:{
                        backgroundColor: '#3EB489',
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        color: 'white'
                    },
                    headerShadowVisible: false
                }}/>
        </Tab.Group>
    </Tab.Navigator>
  )
}

export default ProtectedRoutes