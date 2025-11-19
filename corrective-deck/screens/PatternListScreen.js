// screens/PatternListScreen.js
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cardsByRegion } from '../data/cards';

export default function PatternListScreen({ route, navigation }) {
  const { region } = route.params;
  const list = cardsByRegion[region] || [];

  const handlePressCard = (card) => {
    navigation.navigate('PatternCard', { cardId: card.id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.regionLabel}>{region}</Text>
      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.cardButton, { borderColor: item.colorCode || '#1D4ED8' }]}
            onPress={() => handlePressCard(item)}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardId}>{item.id}</Text>
              <View
                style={[
                  styles.colorDot,
                  { backgroundColor: item.colorCode || '#1D4ED8' },
                ]}
              />
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardGoal}>{item.goal}</Text>
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
  regionLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E5E7EB',
    marginBottom: 12,
    textAlign: 'center',
  },
  listContainer: {
    paddingVertical: 4,
  },
  cardButton: {
    backgroundColor: '#020617',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardId: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '600',
  },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  cardTitle: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardGoal: {
    color: '#9CA3AF',
    fontSize: 13,
  },
});
