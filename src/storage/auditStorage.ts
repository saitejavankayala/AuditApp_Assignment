import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'audits';

export const getAudits = async () => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const addAudit = async (newAudit: any) => {
  const current = await getAudits();

  // If id not present, generate one
  if (!newAudit.id) {
    newAudit.id = uuidv4();
  }

  const exists = current.find((item: any) => item.id === newAudit.id);
  if (!exists) {
    current.push(newAudit);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  }
};


export const updateAudit = async (updatedAudit: any) => {
  const current = await getAudits();
  const updated = current.map((item: any) =>
    item.id === updatedAudit.id ? updatedAudit : item
  );
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const deleteAudit = async (id: string) => {
  const current = await getAudits();
  const updated = current.filter((item: any) => item.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
