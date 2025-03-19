import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen1 from "../screens/WelcomeScreen/WelcomeScreen1";
import WelcomeScreen2 from "../screens/WelcomeScreen/WelcomeScreen2";
import { rootNavigation } from "./RootNavigation";
import ScreenName from "../constants/ScreenName";

const WelcomeStackNavigation=()=>{
    const WelcomeStack=createNativeStackNavigator<rootNavigation>();
    return (
        <WelcomeStack.Navigator>
            <WelcomeStack.Screen initialParams={{
                title:"Welcome Screen",
                }} name={ScreenName.WelcomeScreen1} component={WelcomeScreen1} options={{headerShown:false}}/>
            <WelcomeStack.Screen name={ScreenName.WelcomeScreen2} component={WelcomeScreen2} options={{headerShown:false}}/>
        </WelcomeStack.Navigator>
    )
}
export default WelcomeStackNavigation;