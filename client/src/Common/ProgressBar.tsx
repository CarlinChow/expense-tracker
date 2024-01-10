import React from 'react'
import { ColorValue, DimensionValue, StyleSheet, View } from 'react-native'

export type Props = {
    percentage: number,
    outerBarColor: ColorValue,
    innerBarColor: ColorValue,
    warningColor: ColorValue,
    height: number,
}

const ProgressBar: React.FC<Props> = ({
    percentage,
    outerBarColor,
    innerBarColor,
    warningColor = innerBarColor ,
    height,
}) => {
    return (
        <View style={[styles.outerBar, {
            backgroundColor: outerBarColor,
            height: height
        }]}>
            <View style={[styles.innerBar, {
                width: percentage > 100 ? '100%' : `${percentage.toFixed(0)}%` as DimensionValue,
                backgroundColor: percentage > 80 ? warningColor : innerBarColor
            }]}>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    outerBar: {
        width: '100%',
        borderRadius: 5,
    },
    innerBar: {
        height: '100%',
        borderRadius: 5,
    },
})

export default ProgressBar