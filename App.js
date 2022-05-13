import {StyleSheet, View} from 'react-native';
import colors from './src/theme/colors';
import Navigation from './src/navigation';

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
