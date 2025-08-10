import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Intro from "../screens/Intro";
import SignIn from "../screens/SignIn";
import Home from "../screens/Home";
import Paths from "../screens/Paths";
import Quiz from "../screens/Quiz";
import Forest from "../screens/Forest";
import Profile from "../screens/Profile";
import Journal from "../screens/Journal";
import IntroTwo from "../screens/IntroTwo";
import PathDay from "../screens/PathDay";
import Question from "../screens/Question";
import Leaderboard from "../screens/Leaderboard";
import SavedJournalEntries from "../screens/SavedJournalEntries";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="IntroTwo" component={IntroTwo} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Paths" component={Paths} />
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="Forest" component={Forest} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Journal" component={Journal} />
        <Stack.Screen name="PathDay" component={PathDay} />
        <Stack.Screen name="Question" component={Question} />
        <Stack.Screen name="Leaderboard" component={Leaderboard} />
        <Stack.Screen
          name="SavedJournalEntries"
          component={SavedJournalEntries}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
