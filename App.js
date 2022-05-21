import 'react-native-get-random-values';
import Amplify from 'aws-amplify';
import Navigation from './src/navigation';
import {MenuProvider} from 'react-native-popup-menu';
import AuthContextProvider from './src/contexts/AuthContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Client from './src/apollo/Client';
import config from './src/aws-exports';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

// const updatedConfig = {
//   ...config,
//   oauth: {
//     ...config.oauth,
//     redirectSignIn: '',
//     redirectSignOut: '',
//   },
// };

Amplify.configure(config);

const App = () => {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <AuthContextProvider>
          <Client>
            <Navigation />
          </Client>
        </AuthContextProvider>
      </MenuProvider>
    </SafeAreaProvider>
  );
};

export default App;
