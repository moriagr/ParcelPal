import { StyleSheet, Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
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
    height: 45, // Set a fixed height for the header within each section
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
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 10,
    borderRadius: 5,
  },
  packageInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  reviewText:{
    color: 'white',
    fontWeight: 'bold',
    alignItems: "center",
  },
  markbtn:{
    backgroundColor: '#ff7700',
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center',
    width: 100,
    paddingBottom: 2,
    paddingTop: 2
  },
  startbtn:{
    backgroundColor: 'green',
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center',
    width: 100,
    paddingBottom: 2,
    paddingTop: 2
  },

});

export default styles;
