import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/LoginScreen";
import AuditFormScreen from "../screens/AuditFormScreen";
import AuditSummaryScreen from "../screens/AuditSummaryScreen";
import AuditHistoryScreen from "../screens/AuditHistoryScreen";
import PolicyViewerScreen from "../screens/PolicyViewerScreen";

const Stack=createNativeStackNavigator();

const AppNavigator=()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:true}}>
                <Stack.Screen name="Login"  component={LoginScreen}/>
                <Stack.Screen name="AuditForm" component={AuditFormScreen}/>
                <Stack.Screen name="AuditSummary" component={AuditSummaryScreen}/>
                <Stack.Screen name="AuditHistory" component={AuditHistoryScreen}/>
                <Stack.Screen name="PolicyViewer" component={PolicyViewerScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default AppNavigator;