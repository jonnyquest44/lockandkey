// screens/RegionScreen.js
import { useMemo } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cardsByRegion } from '../data/cards';

export default function RegionScreen({ navigation }) {
  const regions = useMemo(() => Object.keys(cardsByRegion), []);

  const handlePressRegion = (region) => {
    navigation.navigate('PatternList', { region });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Region</Text>

      <FlatList
        data={regions}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.regionButton}
            onPress={() => handlePressRegion(item)}
          >
            <Text style={styles.regionText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E5E7EB',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingVertical: 8,
  },
  regionButton: {
    backgroundColor: '#111827',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  regionText: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
