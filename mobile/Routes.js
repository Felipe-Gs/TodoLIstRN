import { createNativeStackNavigator } from "@react-navigation/native-stack";
const { Navigator, Screen } = createNativeStackNavigator();

import Home from "./src/pages/Home";
import AddTask from "./src/pages/AddTask";

export default function AppRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                transparentCard: true,
            }}
            initialRouteName="Home"
        >
            <Screen name="Home" component={Home} />
            <Screen name="AddTask" component={AddTask} />


        </Navigator>
    )
}