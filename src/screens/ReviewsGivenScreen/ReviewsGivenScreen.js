import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
//Trying commits
const ReviewsGivenScreen = () => {
  const [ratings, setRatings] = useState([]); // Array to store individual ratings
  const [averageRating, setAverageRating] = useState(0); // State to store the average rating

  const handleRating = (value) => {
    // Update the array of ratings with the new rating
    const newRatings = [...ratings, value];
    setRatings(newRatings);

    // Calculate the average rating
    const newAverageRating =
      newRatings.reduce((sum, rating) => sum + rating, 0) / newRatings.length;
    setAverageRating(newAverageRating);

    // TODO: Add a commit message here if making changes related to rating handling
    // [ ] Example commit message: "feat: Handle rating and calculate average"
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Rate the item:</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => handleRating(star)}
            style={styles.starButton}
          >
            <Text style={star <= averageRating ? styles.filledStar : styles.emptyStar}>
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.averageRating}>Average Rating: {averageRating.toFixed(1)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  starButton: {
    marginHorizontal: 5,
  },
  filledStar: {
    color: 'gold',
    fontSize: 25,
  },
  emptyStar: {
    color: 'gray',
    fontSize: 25,
  },
  averageRating: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default ReviewsGivenScreen;
