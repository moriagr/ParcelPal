import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'left',
      padding: 16,
      marginLeft:30
    },
    topinfo:{
      justifyContent: 'space-between',
      marginBottom: 20
    },
    profilePicture: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    editButton: {
      backgroundColor: '#788eec',
      marginRight: 30,
      marginTop: 0,
      height: 35,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: 'center',
      width: 120,
      marginBottom: 15
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
    input: {
      height: 48,
      borderRadius: 5,
      overflow: 'hidden',
      backgroundColor: 'white',
      marginTop: 10,
      marginBottom: 10,
      marginRight: 30,
      paddingHorizontal: 8
  },
  button: {
      backgroundColor: '#788eec',
      marginRight: 30,
      marginTop: 20,
      height: 48,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: 'center'
  },
  disableButton: {
      backgroundColor: '#d3d3d3',
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 48,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: 'center'
  },
  errorText: {
      fontSize: 16,
      color: '#ff0000',
      marginHorizontal: 30,
  },
  buttonTitle: {
      color: 'white',
      fontSize: 16,
      fontWeight: "bold"
  },
  txt:{
    fontWeight: "bold"
  },
  txtinfo:{
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5
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
  },
  profileTextContainer: {
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  gender: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonPressed:{
    borderColor: '#ff7700',
    borderWidth: 2
  }
  });
  
  export default styles;
  