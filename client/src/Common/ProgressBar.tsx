import React from 'react'
import { ColorValue, DimensionValue, StyleSheet, View } from 'react-native'

type Props = {
    barOne:{
        percentage: number,
        color: ColorValue
    }
    barTwo?: {
        percentage: number,
        color: ColorValue,
    }
    outerBarColor: ColorValue,
    height?: number,
}

const ProgressBar: React.FC<Props> = ({
    barOne,
    barTwo,
    outerBarColor,
    height = 12,
}) => {
    return (
        <View style={[styles.outerBar, {
            backgroundColor: outerBarColor,
            height: height
        }]}>
            {barTwo == null ? (
                <View style={[styles.innerBar, {
                    width: barOne.percentage > 100 ? '100%' : `${barOne.percentage.toFixed(0)}%` as DimensionValue,
                    backgroundColor: barOne.color
                }]}>
                </View>) : (
                <View style={[styles.innerBar, {
                    width: barTwo.percentage > 100 ? '100%' : `${barTwo.percentage.toFixed(0)}%` as DimensionValue,
                    backgroundColor: barTwo.color,
                }]}> 
                    <View style={[styles.innerBar, {
                        width: barOne.percentage > 100 ? '100%' : `${barOne.percentage.toFixed(0)}%` as DimensionValue,
                        backgroundColor: barOne.color
                    }]}>
                    </View>       
                </View>) 
            }
        </View>
    )
}

const styles = StyleSheet.create({
    outerBar: {
        width: '100%',
        borderRadius: 10,
    },
    innerBar: {
        height: '100%',
        borderRadius: 10,
    },
})

export default ProgressBar