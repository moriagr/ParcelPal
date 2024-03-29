import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginTop: 24
    },

    postButton: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
        // ...Platform.select({
        //     ios: {
        padding: 15,
        // borderRadius: 8,
        //         backgroundColor: 'black',
        //     },
        //     android: {
        //         backgroundColor: '#788eec',
        //         padding: 15,
        //         borderRadius: 8,
        //         // elevation: 3,
        //         // backgroundColor: 'black',
        //     },
        // }),
    },

    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        width: "100%",
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    inputRow: {
        flexDirection: 'row', // Ensure this is set to 'row'
        alignItems: 'center', // Remove if causing alignment issues
        justifyContent: 'space-between', // Align items along the row
        marginBottom: 12,
        // paddingHorizontal: 16,
        width: '100%',
        // position: 'relative', // Set input row position to relative
    },

    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },

    pickerContainer: {
        // position: 'absolute',
        top: 0,
        right: 0,
        // width: '40%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      picker: {
        width: '30%',
        height: '60%',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        // flex:1
      },
})