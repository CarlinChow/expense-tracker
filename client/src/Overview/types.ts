import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { RootStackParamList } from '../Routing/types';
import type { BottomTabParamList } from '../Routing/types';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';

export type OverviewScreenProps = CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, 'overview', 'bottomTab'>,
    NativeStackScreenProps<RootStackParamList>
>

export type OverviewScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList, 'overview'>,
    NativeStackNavigationProp<RootStackParamList>
>