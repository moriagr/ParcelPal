import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import firebase from './../../firebase/config'; // Make sure to import firebase
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

// ... (import statements remain unchanged)

const ReviewsGivenScreen = () => {
  //use states for setting points and total ratings
  const [pointsData, setPointsData] = useState([]);
  const [totalRating, setTotalRating] = useState(0);

    //use effect on mount
  useEffect(() => {
    const fetchReviews = async () => {
      const clientId = firebase.auth().currentUser.uid;
      try {
        const profileRef = firebase.firestore().collection('users').doc(clientId);
        const profileSnapshot = await profileRef.get();
        const userData = profileSnapshot.data();

        if (userData) {
          const pointsData = userData.reviews ?? [];
          // set state to the array of reviews
          setPointsData(pointsData);

          // Calculate total ratings given
          const totalRating = pointsData.reduce((total, review) => total + review.rating, 0);
          setTotalRating(totalRating);

          console.log("Reviews loaded successfully!");
        } else {
          console.error("User data not found.");
        }
      } catch (error) {
        console.error("Error loading reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const Stars = ({ rating }) => {
    const starIcons = Array.from({ length: rating }, (_, index) => (
      <Icon key={index} name="star" type="font-awesome" color="gold" size={20} style={{ marginRight: 7 }}/>
    ));
  
    return <View style={{ flexDirection: 'row',  }}>{starIcons}</View>;
  };

  

  return (
    <View style={styles.container}>
      <FlatList
        data={pointsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.pointsBox}>
            <Text style={styles.senderName}>{item.DriverName}</Text>
            <Stars rating={item.rating} />
          </View>
        )}
      />
      <View style={styles.totalPointsContainer}>
        <Text style={styles.totalPointsText}>Total Stars Given: {totalRating}</Text>
      </View>
    </View>
  );
};

export default ReviewsGivenScreen;
