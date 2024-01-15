import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  pointsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pointsAmount: {
    fontSize: 16,
  },
  totalPointsContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  totalPointsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
