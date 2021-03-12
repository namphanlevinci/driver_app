import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

export const FirebaseContext = createContext({});

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <FirebaseContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        },
        signInAnonymously: async () => {
          try {
            const response = await auth().signInAnonymously();
            setUser(response.user);
          } catch (e) {
            console.error(e);
          }
        },
      }}>
      {children}
    </FirebaseContext.Provider>
  );
};
