import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import Paths from "../screens/Paths";
import Quiz from "../screens/Quiz";
import Forest from "../screens/Forest";
import Profile from "../screens/Profile";
import Journal from "../screens/Journal";

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Paths" component={Paths} />
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="Forest" component={Forest} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Journal" component={Journal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
