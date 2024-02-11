import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
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
    padding: 10,
    width: '60%',
    borderRadius: 10,
    fontSize: 16,
  },
  postButton: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: 'blue',
    marginTop: 12,
  },
  iosInput: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  iosPostButton: {
    backgroundColor: 'green',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  inputRow: {
    flexDirection: 'row', // Ensure this is set to 'row'
    alignItems: 'center', // Remove if causing alignment issues
    justifyContent: 'space-between', // Align items along the row
    marginBottom: 12,
    width: '100%',
    position: 'relative', // Set input row position to relative
  },
  pickerContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '40%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: '35%',
    height: '60%',
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default styles;
