import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import OverviewScreen from '../Overview/OverviewScreen'
import { TouchableOpacity, Alert } from 'react-native'
import SignOutScreen from '../Auth/SignOutScreen'
import { useAuthContext } from './helpers/useAuthContext'
import type { BottomTabParamList } from './types'

const Tab = createBottomTabNavigator<BottomTabParamList>()

const TabRoutes = () => {
    const { signOut } = useAuthContext() 
    const createSignOutAlert = () => (
        Alert.alert('Sign Out', 'Are you sure you want to sign out?', [{
                text: 'No',
            },{
                text: "Yes",
                onPress: () => signOut()
            }
        ])
    )

    return (
        <Tab.Navigator screenOptions={{headerShown: true}}>
            <Tab.Group>
                <Tab.Screen 
                    name="overview" 
                    component={OverviewScreen}
                    options={{
                        headerStyle:{
                            backgroundColor: '#6495ED',
                        },
                        headerTitle: "Overview",
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            color: 'white'
                        },
                        headerShadowVisible: false,
                }}/>
                <Tab.Screen 
                    name="signOut" 
                    component={SignOutScreen} 
                    options={{
                        tabBarButton: (props) => <TouchableOpacity {...props} onPress={createSignOutAlert}/>
                    }}
                />
            </Tab.Group>
        </Tab.Navigator>
    )
}

export default TabRoutes