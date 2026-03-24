import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function App() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});

  const next = (key, value) => {
    setData({ ...data, [key]: value });
    setStep(step + 1);
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <>
          <Text style={styles.title}>Is your client experiencing:</Text>
          <Button title="Pain" onPress={() => next('status', 'pain')} />
          <Button title="Discomfort" onPress={() => next('status', 'discomfort')} />
          <Button title="Unclear" onPress={() => next('status', 'unclear')} />
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.title}>Select Area</Text>
          <Button title="Ankle/Foot" onPress={() => next('region', 'ankle')} />
          <Button title="Knee" onPress={() => next('region', 'knee')} />
          <Button title="Hip" onPress={() => next('region', 'hip')} />
          <Button title="Spine/Pelvis" onPress={() => next('region', 'spine')} />
        </>
      )}

      {step === 3 && (
        <>
          <Text style={styles.title}>Classification</Text>
          <Button title="Muscular" onPress={() => next('type', 'muscular')} />
          <Button title="Impingement" onPress={() => next('type', 'impingement')} />
        </>
      )}

      {step === 4 && (
        <>
          <Text style={styles.title}>Movement</Text>
          <Button title="Flexion" onPress={() => next('movement', 'flexion')} />
          <Button title="Extension" onPress={() => next('movement', 'extension')} />
          <Button title="Rotation" onPress={() => next('movement', 'rotation')} />
        </>
      )}

      {step === 5 && (
        <>
          <Text style={styles.title}>Solutions</Text>
          <Text>• Stretch</Text>
          <Text>• Activate</Text>
          <Text>• Mobility Drill</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});