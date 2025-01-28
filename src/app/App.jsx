import './App.css';
import Layout from '../layout/layout';
import { NavigationProvider, useNavigation } from '../hooks/NavigationContext';
import React from 'react';

const context = import.meta.globEager('/src/pages/**/*.jsx');

const pages = Object.keys(context).map(path => {
  const value = context[path].default;
  const componentName = path.split('/').pop().replace('.jsx', '');
  return { componentName, component: value };
});

const App = () => {
  const { currentComponent } = useNavigation();

  return (
    <Layout>
      {pages.map(({ componentName, component }) => {
        if (currentComponent === componentName) {
          return React.createElement(component, { key: componentName });
        }
        return null;
      })}
    </Layout>
  );
};

const AppWrapper = () => (
  <NavigationProvider>
    <App />
  </NavigationProvider>
);

export default AppWrapper;
