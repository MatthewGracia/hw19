import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  try {
    const db = await openDB('jate', 1);
    const transaction = db.transaction('jate', 'readwrite');
    const objectStore = transaction.objectStore('jate');
    await objectStore.add(content);
    console.log('Data added to the database successfully');
  } catch (error) {
    console.error('Error adding data to the database:', error);
  }
};

export const getDb = async () => {
  try {
    const db = await openDB('jate', 1);
    const transaction = db.transaction('jate', 'readonly');
    const objectStore = transaction.objectStore('jate');
    const data = await objectStore.getAll();
    console.log('Data retrieved from the database:', data);
    return data;
  } catch (error) {
    console.error('Error retrieving data from the database:', error);
    return [];
  }
};

initdb();