import { createContext, useState, useContext } from 'react';

// Criando o contexto de navegação
const NavigationContext = createContext();

// Hook personalizado para usar o contexto
export const useNavigation = () => useContext(NavigationContext);

// Provider para fornecer o contexto
export const NavigationProvider = ({ children }) => {
  const [currentComponent, setCurrentComponent] = useState('Homepage');

  // Função para atualizar o componente
  const navigateTo = (component) => {
    setCurrentComponent(component);
  };

  return (
    <NavigationContext.Provider value={{ currentComponent, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};
