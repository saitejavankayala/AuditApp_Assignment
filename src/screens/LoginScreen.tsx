import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRole } from '../contexts/RoleContext';

const LoginScreen = ({ navigation }: any) => {
  const { setRole } = useRole();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      setRole(selectedRole);

      if (selectedRole === 'Auditor') {
        navigation.replace('AuditForm');
      } else {
        navigation.replace('AuditHistory');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/login.jpg')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.label}>Please select your role:</Text>

      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedRole}
          onValueChange={(itemValue) => setSelectedRole(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Role --" value={null} />
          <Picker.Item label="Admin" value="Admin" />
          <Picker.Item label="Auditor" value="Auditor" />
          <Picker.Item label="Viewer" value="Viewer" />
        </Picker>
      </View>

      {selectedRole && (
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 40,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '500',
    color: '#333',
  },
  pickerWrapper: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 30,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});


export default LoginScreen;
