import React from 'react'
import Modal from 'react-native-modal'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'

type Props = {
    isVisible: boolean,
    loadingMessage?: string
}

const LoadingModal:React.FC<Props> = ({
    isVisible,
    loadingMessage
}) => {
  return (
    <Modal
        isVisible={isVisible}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        hideModalContentWhileAnimating={true}
    >
        <View style={styles.container}>
            <ActivityIndicator 
                size='large'
                color='#6495ED'
            />
            <Text style={{color: '#6495ED'}}>{loadingMessage}</Text>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        alignSelf: 'center',
        width: "50%",
        height: '20%',
        borderRadius: 20,
        gap: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default LoadingModal