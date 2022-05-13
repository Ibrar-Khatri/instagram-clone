import {StyleSheet, View} from 'react-native';
import colors from './src/theme/colors';
import Navigation from './src/navigation';
import Amplify from 'aws-amplify';
import config from './src/aws-exports';

Amplify.configure(config);

const App = () => {
  return (
    <View style={styles.app}>
      <Navigation />
    </View>
  );
};

const styles = StyleSheet.create({
  app: {flex: 1, backgroundColor: colors.white},
});

export default App;
