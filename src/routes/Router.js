import { createAppContainer, createSwitchNavigator} from 'react-navigation'
import Login from '../screens/Login';
import Main from '../screens/main';

const AppNavigation =createSwitchNavigator({
    Home:{
        screen: Login
    },
    Main:{
        screen: Main
    }
},{
    defaultNavigationOptions:{
        header: null
    }
})

export default createAppContainer(AppNavigation)