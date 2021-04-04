import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        width: '30%',
        padding: 10,
        alignSelf: 'center'
      },
      button: {
          height: 30,
          width: 75,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius:5,
          borderWidth: 1,
          borderColor: 'black',
      },
      text: {
        fontSize: 12,
        color: 'black',
        fontWeight: '500',
        textTransform: 'uppercase'
      }
      
});

export default styles;