import { createDrawerNavigator } from '@react-navigation/drawer';
import { RFValue } from 'react-native-responsive-fontsize';
import HomeScreen from '../views/Home';
import ProfileScreen from '../views/Profile';
import SettingsScreen from '../views/Settings';
import CustomDrawer from './components/customDrawer';



const Drawer = createDrawerNavigator();


function Dashboard() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={
                {
                    headerShown: false,
                    drawerStyle: {
                        width: RFValue(200),
                        // width: '100%',
                        backgroundColor: '#FFFFFF'
                    }
                }}>
            <Drawer.Screen name="Main" component={HomeScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name='Settings' component={SettingsScreen} />

        </Drawer.Navigator>
    );
}

export default Dashboard