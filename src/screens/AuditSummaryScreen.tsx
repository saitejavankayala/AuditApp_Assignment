import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRole } from '../contexts/RoleContext';
import { addAudit } from '../storage/auditStorage';

const AuditSummaryScreen = ({ route }: any) => {
  const { formData } = route.params;
  const navigation = useNavigation();
  const { role } = useRole();

  const handleFinalSubmit = () => {
    addAudit({ ...formData, createdAt: new Date().toISOString() });
    navigation.reset({ index: 0, routes: [{ name: 'AuditHistory' }] });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Audit Summary</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Rating</Text>
        <Text style={styles.value}>{formData.ratings} / 5</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Selected Checks</Text>
        {formData.checks.map((check: string, idx: number) => (
          <Text key={idx} style={styles.value}>• {check}</Text>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Comments</Text>
        <Text style={styles.value}>{formData.comments || 'No comments added'}</Text>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleFinalSubmit}>
        <Text style={styles.submitText}>Submit to History</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AuditSummaryScreen;

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f9f9f9' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 25, textAlign: 'center' },
  card: {
    backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 15,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 3, elevation: 2,
  },
  label: { fontWeight: '700', fontSize: 16, marginBottom: 8 },
  value: { fontSize: 15, color: '#333', marginBottom: 4 },
  submitButton: {
    marginTop: 30,
    backgroundColor: '#28a745',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
