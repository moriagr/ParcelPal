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
    marginTop: 2, // Centered position for the modal
    padding: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
  },
  star: {
    marginRight: 5,
    padding: 0,
  },
  reviewbtn:{
    backgroundColor: '#788eec',
    height: 25,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center',
    width: 70,
    paddingBottom: 2,
    paddingTop: 2
  },
  reviewText:{
    color: 'white',
    fontWeight: 'bold',
    alignItems: "center",
  },
  markbtn:{
    backgroundColor: '#788eec',
    height: 25,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center',
    width: 140,
    paddingBottom: 2,
    paddingTop: 2
  }
});

export default styles;
