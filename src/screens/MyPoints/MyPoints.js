import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './styles';

// TODO: Not using at the moment

const MyPointsScreen = () => {
  // Sample data for points
  const pointsData = [
    { sender: 'John Doe', points: 20 },
    { sender: 'Jane Smith', points: 10 },
    // Add more data as needed
  ];

  // Calculate total points
  const totalPoints = pointsData.reduce((total, item) => total + item.points, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={pointsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.pointsBox}>
            <Text style={styles.senderName}>{item.sender}</Text>
            <Text style={styles.pointsAmount}>{item.points} Points</Text>
          </View>
        )}
      />
      <View style={styles.totalPointsContainer}>
        <Text style={styles.totalPointsText}>Total Points: {totalPoints}</Text>
      </View>
    </View>
  );
};

export default MyPointsScreen;
