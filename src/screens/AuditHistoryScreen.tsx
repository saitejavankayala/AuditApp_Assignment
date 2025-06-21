import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getAudits, deleteAudit } from '../storage/auditStorage';
import { useNavigation } from '@react-navigation/native';
import { useRole } from '../contexts/RoleContext';

const AuditHistoryScreen = () => {
  const [audits, setAudits] = useState([]);
  const { role } = useRole();
  const navigation = useNavigation();

  useEffect(() => {
    let isMounted = true;

    const fetchAudits = async () => {
      const data = await getAudits();
      if (isMounted) setAudits(data.reverse());
    };

    const unsubscribe = navigation.addListener('focus', fetchAudits);
    fetchAudits();

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [navigation]);

  const handleDelete = async (id: string) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this entry?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteAudit(id);
          const updated = await getAudits();
          setAudits(updated.reverse());
        },
      },
    ]);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      {/* <Text style={styles.label}>Date: {new Date(item.createdAt).toLocaleString()}</Text> */}
      <Text style={styles.label}>Rating: {item.ratings} / 5</Text>
      <Text style={styles.label}>Checks: {item.checks.join(', ')}</Text>
      <Text style={styles.label}>Comments: {item.comments}</Text>

      {role === 'Auditor' && (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('AuditForm', { initialData: item })}
        >
          <Text style={styles.buttonText}>Edit & Resubmit</Text>
        </TouchableOpacity>
      )}

      {role === 'Admin' && (
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={audits}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingBottom: 40,
          flexGrow: 1,
          justifyContent: audits.length === 0 ? 'center' : 'flex-start',
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No audit data found.</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}
      >
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuditHistoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
  },
  label: { marginBottom: 6, fontSize: 14 },
  editButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#6c757d',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
});
