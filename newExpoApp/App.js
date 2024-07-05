import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { createContext, useContext, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

// ThemeContext.js
const ThemeContext = createContext();

const lightTheme = {
  background: '#ffffff',
  text: '#000000',
  button: {
    background: '#007bff',
    text: '#ffffff',
  },
};

const darkTheme = {
  background: '#000000',
  text: '#ffffff',
  button: {
    background: '#6c757d',
    text: '#ffffff',
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// CustomButton.js
const CustomButton = ({ title, onPress }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: theme.button.background }]} onPress={onPress}>
      <Text style={[styles.buttonText, { color: theme.button.text }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

// CustomText.js
const CustomText = ({ children, style }) => {
  const { theme } = useTheme();

  return <Text style={[textStyles.text, { color: theme.text }, style]}>{children}</Text>;
};

const textStyles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});

// HomeScreen.js
function HomeScreen() {
  const { theme } = useTheme();
  const screenWidth = Dimensions.get('window').width;

  const horizontalImages1 = [
    { id: '1', src: require('./assets/profile.png'), description: 'Eric Atsu' },
    { id: '2', src: require('./assets/search.png'), description: 'Null' },
  ];

  const horizontalImages2 = [
    { id: '1', src: require('./assets/Card.png'), description: 'null' },
  ];

  const horizontalImages = [
    { id: '1', src: require('./assets/send.png'), description: 'Send' },
    { id: '2', src: require('./assets/receive.png'), description: 'Receive' },
    { id: '3', src: require('./assets/loan.png'), description: 'Loan' },
    { id: '4', src: require('./assets/topUp.png'), description: 'TopUp' },
  ];

  const verticalImages = [
    { id: '1', src: require('./assets/apple.png'), description: 'Apple Store', value: '-$5,99' },
    { id: '2', src: require('./assets/spotify.png'), description: 'Spotify', value: '-$12,99' },
    { id: '3', src: require('./assets/moneyTransfer.png'), description: 'Money Transfer', value: '$300' },
    { id: '4', src: require('./assets/grocery.png'), description: 'Grocery', value: '-$88' },
  ];

  const renderHorizontalItem1 = ({ item }) => (
    <View style={styles.horizontalItem}>
      <Image source={item.src} style={styles.horizontalImage1} />
      <CustomText>{item.description}</CustomText>
    </View>
  );

  const renderHorizontalItem2 = ({ item }) => (
    <View style={styles.horizontalItem}>
      <Image source={item.src} style={[styles.horizontalImage2, { width: screenWidth - 40 }]} />
    </View>
  );

  const renderHorizontalItem = ({ item }) => (
    <View style={styles.horizontalItem}>
      <Image source={item.src} style={styles.horizontalImage} />
      <CustomText>{item.description}</CustomText>
    </View>
  );

  const renderVerticalItem = ({ item }) => (
    <View style={styles.verticalItem}>
      <Image source={item.src} style={styles.verticalImage} />
      <CustomText style={styles.verticalText}>{item.description}</CustomText>
      <CustomText style={styles.verticalValue}>{item.value}</CustomText>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomText style={styles.welcomeText}>Welcome back,</CustomText>
      <FlatList
        horizontal
        data={horizontalImages1}
        renderItem={renderHorizontalItem1}
        keyExtractor={(item) => item.id}
        style={styles.horizontalList}
      />
      <FlatList
        horizontal
        data={horizontalImages2}
        renderItem={renderHorizontalItem2}
        keyExtractor={(item) => item.id}
        style={styles.horizontalList}
      />
      <FlatList
        horizontal
        data={horizontalImages}
        renderItem={renderHorizontalItem}
        keyExtractor={(item) => item.id}
        style={styles.horizontalList}
      />
      <CustomText style={styles.heading}>Transactions</CustomText>
      <FlatList
        data={verticalImages}
        renderItem={renderVerticalItem}
        keyExtractor={(item) => item.id}
        style={styles.verticalList}
      />
      <CustomButton title="Click Me" onPress={() => alert('Button Pressed!')} />
    </View>
  );
}

// Settings.js
function Settings() {
  const { theme, toggleTheme } = useTheme();

  const settingsText1 = [
    { id: '1', title: 'Language', description: '>' },
    { id: '2', title: 'My Profile', description: '>' },
    { id: '3', title: 'Contact Us', description: '>' },
    { id: '4', title: 'Change Password', description: '>' },
    { id: '5', title: 'Privacy Policy', description: '>' },
  ];

  const renderSettingsItem = ({ item }) => (
    <View style={styles.verticalItem}>
      <Image source={item.src} style={styles.verticalImage} />
      <Text style={[styles.verticalText1, { color: theme.text1 }]}>{item.title}</Text>
      <Text style={[styles.verticalText1, { color: theme.text1 }]}>{item.description}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={settingsText}
        renderItem={renderSettingsItem}
        keyExtractor={(item) => item.id}
        style={styles.verticalList}
      />
      <Text style={[styles.text, { color: theme.text }]}>Theme</Text>
      <Switch
        value={theme === darkTheme}
        onValueChange={toggleTheme}
        thumbColor={theme.button.background}
        trackColor={{ false: theme.button.background, true: theme.button.background }}
      />
    </View>
  );
}

// BottomTabNavigator.js
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const { theme } = useTheme();

  return (
    <NavigationContainer theme={{ colors: { background: theme.background } }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'My Cards') {
              iconName = 'card';
            } else if (route.name === 'Statistics') {
              iconName = 'stats-chart';
            } else if (route.name === 'Settings') {
              iconName = 'settings';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            display: 'flex',
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="My Cards" component={HomeScreen} />
        <Tab.Screen name="Statistics" component={Settings} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// App.js
export default function App() {
  return (
    <ThemeProvider>
      <BottomTabNavigator />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
  button: buttonStyles.button,
  buttonText: buttonStyles.buttonText,
  horizontalList: {
    marginVertical: 20,
  },
  horizontalItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
  },
  horizontalImage: {
    width: 50,
    height: 60,
  },
  horizontalImage1: {
    width: 50,
    height: 60,
  },
  horizontalImage2: {
    width: 100,
    height: 150,
  },
  verticalList: {
    width: '100%',
  },
  verticalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  verticalImage: {
    width: 50,
    height: 50,
    margin: 20,
  },
  verticalText: {
    fontSize: 16,
  },
  verticalText1: {
    fontSize: 16,
    textAlign: 'right',
  },
  verticalValue: {
    fontSize: 16,
    marginLeft: 'auto',
  },
  welcomeText: {
    fontSize: 24,
    marginVertical: 10,
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    marginVertical: 20,
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 20,
  },
});