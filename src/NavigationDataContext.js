import React, { createContext, useContext, useState } from 'react';
import Relationship from './screens/Relationship';

const NavigationDataContext = createContext();

export const NavigationDataProvider = ({ children }) => {
  const user = {
    name: null,
    email: null,
    password: null,
    orientation: null,
    sex: null,
    autobio: null,
    relationship: null,
    ageCategory: null
  };
  const [images, setImages] = useState([]);

  return (
    <NavigationDataContext.Provider value={{ user, setUser, images, setImages }}>
      {children}
    </NavigationDataContext.Provider>
  );
};

export const useNavigationData = () => useContext(NavigationDataContext);