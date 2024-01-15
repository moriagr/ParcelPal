import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const PackageSection = ({ title, packages }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={toggleExpansion} style={styles.sectionContent}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} size={20} color="black" />
      </TouchableOpacity>
      {isExpanded && (
        <FlatList
          data={packages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.packageBox} onPress={() => console.log('View details', item)}>
              <View style={styles.packageInfoContainer}>
                <Text>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const MyDrivesScreen = () => {
  const CurrentDrives = ['Drive 1', 'Drive 2', 'Drive 3'];
  const PreviousDrives = ['Drive A', 'Drive B', 'Drive C'];

  return (
    <View style={styles.container}>
      <PackageSection title="Current Drives" packages={CurrentDrives} />
      <PackageSection title="Previous Drives" packages={PreviousDrives} />
    </View>
  );
};

export default MyDrivesScreen;
