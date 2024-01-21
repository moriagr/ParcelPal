import { StyleSheet, Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80, // Set a fixed height for the header within each section
    paddingHorizontal: 16,
  },
  arrowIcon: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  packageBox: {
    borderWidth: 1,
    borderColor: 'lightblue',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  packageInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editDeleteButtons: {
    flexDirection: 'row',
  },
  editButtonText: {
    marginRight: 10,
    color: 'green',
  },
  deleteButtonText: {
    color: 'red',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    marginTop: windowHeight / 3, // Centered position for the modal
    padding: 20,
  },
});

export default styles;