import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    launchContainer: {
        width: '100%',
        height: (Dimensions.get('window').height),
      },
      titles: {
        marginTop: '10%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.4)'
      },
      name: {
        fontSize: 24,
        fontWeight: '500',
        textDecorationLine: 'underline'
      },
      data: {
        fontSize: 16,
        color: 'black',
      },
      image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
      }
});

export default styles;