// screens/PatternCardScreen.js
import { Video } from 'expo-av';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { cardsById } from '../data/cards';
import { videoMap } from '../data/videoMap';

function StepBlock({ step, index, type }) {
  const source = videoMap[step.video];

  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>
        {type} {index + 1}: {step.title}
      </Text>
      <Text style={styles.stepCuesLabel}>Cues:</Text>
      {step.cues && step.cues.length > 0 && (
        <View style={styles.cuesList}>
          {step.cues.map((cue, i) => (
            <Text key={i} style={styles.cueText}>• {cue}</Text>
          ))}
        </View>
      )}
      {source && (
        <Video
          source={source}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          isLooping={false}
        />
      )}
    </View>
  );
}

export default function PatternCardScreen({ route }) {
  const { cardId } = route.params;
  const card = cardsById[cardId];

  if (!card) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Card not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.cardId}>{card.id}</Text>
        <View
          style={[
            styles.colorDot,
            { backgroundColor: card.colorCode || '#22C55E' },
          ]}
        />
      </View>

      <Text style={styles.title}>{card.title}</Text>
      <Text style={styles.region}>{card.region}</Text>
      <Text style={styles.goalLabel}>Goal</Text>
      <Text style={styles.goalText}>{card.goal}</Text>

      {card.progression && card.progression.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progression</Text>
          {card.progression.map((step, index) => (
            <StepBlock
              key={`prog-${index}`}
              step={step}
              index={index}
              type="Step"
            />
          ))}
        </View>
      )}

      {card.regression && card.regression.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Regression Options</Text>
          {card.regression.map((step, index) => (
            <StepBlock
              key={`reg-${index}`}
              step={step}
              index={index}
              type="Option"
            />
          ))}
        </View>
      )}

      {card.trainerNotes ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trainer Notes</Text>
          <Text style={styles.notesText}>{card.trainerNotes}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardId: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '600',
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  title: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '700',
    color: '#F9FAFB',
  },
  region: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  goalLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  goalText: {
    fontSize: 14,
    color: '#E5E7EB',
    marginBottom: 16,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E5E7EB',
    marginBottom: 8,
  },
  stepContainer: {
    backgroundColor: '#020617',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F9FAFB',
    marginBottom: 4,
  },
  stepCuesLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  cuesList: {
    marginTop: 4,
    marginBottom: 8,
  },
  cueText: {
    fontSize: 12,
    color: '#D1D5DB',
  },
  video: {
    width: '100%',
    height: 200,
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: '#020617',
  },
  notesText: {
    fontSize: 13,
    color: '#E5E7EB',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#020617',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#F97373',
    fontSize: 16,
  },
});
