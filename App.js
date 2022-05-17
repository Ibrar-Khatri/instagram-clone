import Navigation from './src/navigation';
import Amplify from 'aws-amplify';

import config from './src/aws-exports';
import AuthContextProvider from './src/contexts/AuthContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Client from './src/apollo/Client';

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
      <AuthContextProvider>
        <Client>
          <Navigation />
        </Client>
      </AuthContextProvider>
    </SafeAreaProvider>
  );
};

export default App;
