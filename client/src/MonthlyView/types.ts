import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { RootStackParamList } from '../Routing/types';
import type { BottomTabParamList } from '../Routing/types';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';

export type MonthlyViewScreenProps = CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, 'monthlyView', 'bottomTab'>,
    NativeStackScreenProps<RootStackParamList>
>

export type MonthlyViewNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList, 'monthlyView'>,
    NativeStackNavigationProp<RootStackParamList>
>

export interface PieChartInfo {
    category: {
        name: string
    }
    amount: number,
    color: string,
}