import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import OverviewScreen from '../Overview/OverviewScreen'
import { TouchableOpacity, Alert } from 'react-native'
import SignOutScreen from '../Auth/SignOutScreen'
import { useAuthContext } from './helpers/useAuthContext'
import type { BottomTabParamList } from './types'
import MonthlyViewScreen from '../MonthlyView/MonthlyViewScreen'
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

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
                        tabBarLabel: "Overview",
                        tabBarIcon: ({focused}) => <FontAwesome name="home" size={24} color={focused ? '#6495ED' : "grey"} />
                }}/>
                <Tab.Screen 
                    name="monthlyView" 
                    component={MonthlyViewScreen}
                    options={{
                        headerStyle:{
                            backgroundColor: '#6495ED',
                        },
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            color: 'white'
                        },
                        headerShadowVisible: false,
                        tabBarLabel: "Monthly",
                        tabBarIcon: ({focused}) => <FontAwesome5 name="server" size={20} color={focused ? '#6495ED' : "grey"} />
                    }}
                />
                <Tab.Screen 
                    name="signOut" 
                    component={SignOutScreen} 
                    options={{
                        tabBarLabel: 'Sign Out',
                        tabBarButton: (props) => <TouchableOpacity {...props} onPress={createSignOutAlert}/>,
                        tabBarIcon: ({focused}) => <Ionicons name="exit" size={24} color={focused ? '#6495ED' : "grey"} />
                    }}
                />
            </Tab.Group>
        </Tab.Navigator>
    )
}

export default TabRoutes