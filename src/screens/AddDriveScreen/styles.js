import { StyleSheet, Platform } from 'react-native';

// style sheet
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    width: '100%',
  },
  postButton: {
    ...Platform.select({
      ios: {
        padding: 15,
        borderRadius: 8,
        backgroundColor: 'black',
      },
      android: {
        // backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: 'black',
      },
    }),
  },
});