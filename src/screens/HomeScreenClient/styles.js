import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {

  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // Add margin to create space between the profile and menu buttons
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
    borderColor: '#788eec',
    borderWidth: 2
  },
  profileTextContainer: {
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  menuButtonsContainer: {
    marginTop: 20,
  },
  menuButton: {
    flexDirection: 'row', // Align text and arrow horizontally
    justifyContent: 'space-between', // Spread content along the row
    alignItems: 'center', // Center items vertically
    backgroundColor: '#788eec',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderRadius: 5,
    marginLeft: -25,
  },
  menuButtonText: {
    color: '#fff', // Change the text color to your preference
    fontWeight: 'bold',
    fontSize: 22,

  },
  menuButtonLogout: {
    flexDirection: 'row', // Align text and arrow horizontally
    justifyContent: 'space-between', // Spread content along the row
    alignItems: 'center', // Center items vertically
    backgroundColor: '#788eec',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
    marginTop: 200,
    marginLeft: -25
  },
  ratingContainer: {
    flexDirection: 'row', // Align stars and rating horizontally
    alignItems: 'center', // Center items vertically
    marginTop: 5, // Add margin to separate the name and rating
  },
  ratingText: {
    marginLeft: 5,
    fontWeight: 'bold'
  },
  editButtonText: {
    marginLeft: 10,
    color: 'green',
  },
  actionArea: {
    height: 130,
    width: 345,
    backgroundColor: 'fff',
    borderWidth: 2,
    borderRadius: 5

  },
  driveActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#4b6cb7',
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#788eec'

  },
  actionText: {
    marginTop: 5,
    color: '#fff',
    fontWeight: 'bold'
  },

});

export default styles;
