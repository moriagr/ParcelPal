import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
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

    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
})