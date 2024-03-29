import { StyleSheet, Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 0,
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
  chatBox: {
    borderWidth: 1,
    borderColor: 'lightblue',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 10,
    borderRadius: 5,
  },
  sectionContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  chatInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
  },
  star: {
    marginRight: 5,
    padding: 0,
  },
  reviewbtn: {
    backgroundColor: '#788eec',
    height: 25,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center',
    width: 70,
    paddingBottom: 2,
    paddingTop: 2
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 40,
    marginRight: 10,
    // borderColor: '#788eec',
    borderWidth: 2
  },
  reviewText: {
    color: 'white',
    fontWeight: 'bold',
    alignItems: "center",
  },
  markbtn: {
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