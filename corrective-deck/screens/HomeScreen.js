// screens/HomeScreen.js
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Corrective Pattern Deck</Text>
      <Text style={styles.subtitle}>Phase 1: Hips, Knees, Low Back, Shoulders</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Region')}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F172A',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#E5E7EB',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#22C55E',
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '600',
  },
});
