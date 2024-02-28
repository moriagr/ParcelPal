// LoginController.js
import { auth, database } from '../../firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = async (values, role, setLoading, setUser, navigation, clientsCount, driversCount, totalDeliveries) => {
  setLoading(true);
  try {
    const querySnapshot = await database.collection('users').where('email', '==', values.email).get();

    if (querySnapshot.empty) {
      setLoading(false);
      alert('User not found');
      return;
    }

    const user = querySnapshot.docs[0].data();

    if (user.role !== role) {
      setLoading(false);
      alert('Invalid role for this user');
      return;
    }

    auth.signInWithEmailAndPassword(values.email, values.password)
      .then(async (response) => {
        const uid = response.user.uid;
        const userToken = await response.user.getIdToken();

        await AsyncStorage.setItem('userToken', userToken);

        database.collection('users').doc(uid).get()
          .then(firestoreDocument => {
            if (!firestoreDocument.exists) {
              setLoading(false);
              alert('User does not exist anymore.');
              return;
            }
            const user = firestoreDocument.data();
            setUser(user);
            setLoading(true);
            if (role === 'Driver') {
              navigation.navigate('HomeDriver');
            } else {
              navigation.navigate('HomeClient');
            }
          })
          .catch(error => {
            setLoading(false);
            alert(error);
          });
      })
      .catch(error => {
        setLoading(false);
        alert(error);
      });
  } catch (error) {
    setLoading(false);
    alert(error);
  }
};
