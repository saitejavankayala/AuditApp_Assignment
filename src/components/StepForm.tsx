import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { AuditFormData } from '../types';

export const StepForm = ({
  onSubmit,
  initialData,
}: {
  onSubmit: (data: AuditFormData) => void;
  initialData?: AuditFormData;
}) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<AuditFormData>({
    ratings: 0,
    checks: [],
    comments: '',
    ...(initialData || {}),
  });

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const renderStarRating = () => (
    <View style={styles.ratingContainer}>
      {[1, 2, 3, 4, 5].map((num) => (
        <TouchableOpacity key={num} onPress={() => setData({ ...data, ratings: num })}>
          <Image
            source={
              num <= data.ratings
                ? require('../assets/star-filled.jpg')
                : require('../assets/star-outline.jpg')
            }
            style={styles.star}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  const steps = [
    <View key="1" style={styles.centeredStep}>
      <Text style={styles.title}>How would you rate the audit?</Text>
      {renderStarRating()}
    </View>,
    <View key="2" style={styles.centeredStep}>
      <Text style={styles.title}>Select applicable audit checkpoints</Text>
      <View style={styles.checkboxGroup}>
        {[
          'Proper documentation maintained',
          'Equipment is calibrated',
          'Safety protocols followed',
          'Cleanliness standards met',
          'Data backup is up-to-date',
        ].map((check) => {
          const isChecked = data.checks.includes(check);
          return (
            <TouchableOpacity
              key={check}
              style={[styles.customCheckbox, isChecked && styles.customCheckboxChecked]}
              onPress={() => {
                const newChecks = isChecked
                  ? data.checks.filter((c) => c !== check)
                  : [...data.checks, check];
                setData({ ...data, checks: newChecks });
              }}
            >
              <Text style={styles.checkboxText}>{check}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>,
    <View key="3" style={styles.centeredStep}>
      <Text style={styles.title}>Comments:</Text>
      <TextInput
        placeholder="Enter comments"
        value={data.comments}
        onChangeText={(text) => setData({ ...data, comments: text })}
        multiline
        numberOfLines={4}
        style={styles.commentInput}
      />
    </View>,
  ];

  const renderButtons = () => {
    if (step === 0) {
      return (
        <TouchableOpacity style={styles.fullWidthButton} onPress={() => setStep(step + 1)}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      );
    }

    if (step === 1) {
      return (
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.halfButton} onPress={() => setStep(step - 1)}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.halfButton} onPress={() => setStep(step + 1)}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (step === 2) {
      return (
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.halfButton} onPress={() => setStep(step - 1)}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.halfButton}
            onPress={() => {
              if (!data.ratings || data.checks.length === 0 || !data.comments.trim()) {
                alert('Please fill in all fields before submitting.');
                return;
              }
              console.log("on submit")
              onSubmit(data);
            }}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={{ paddingHorizontal: 20 }}>
      {steps[step]}
      {renderButtons()}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredStep: { alignItems: 'center', justifyContent: 'center', marginVertical: 40 },
  title: { fontSize: 18, marginBottom: 20 },
  ratingContainer: { flexDirection: 'row', justifyContent: 'center', gap: 8 },
  star: { width: 40, height: 40, marginHorizontal: 5 },
  checkboxGroup: { flexDirection: 'column', alignItems: 'center', gap: 12 },
  customCheckbox: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 280,
    alignItems: 'center',
  },
  customCheckboxChecked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkboxText: { color: '#000', fontSize: 16 },
  commentInput: {
    width: '100%',
    minHeight: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 30,
  },
  fullWidthButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    width: '50%',
    alignItems: 'center',
    marginTop: 20,
  },
  halfButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default StepForm;
