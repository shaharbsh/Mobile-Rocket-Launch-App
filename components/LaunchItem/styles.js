import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    launchContainer: {
        width: '100%',
        height: ((Dimensions.get('window').height)),
      },
      titles: {
        marginTop: '10%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.6)'
      },
      name: {
        fontSize: 26,
        fontWeight: '500',
        textDecorationLine: 'underline',
        alignItems: 'center',
      },
      data: {
        fontSize: 18,
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