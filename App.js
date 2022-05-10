import {View, Text} from 'react-native';
import colors from './src/theme/colors';
import {size} from './src/theme/fonts';
import Icon from 'react-native-vector-icons/AntDesign';

const App = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: colors.primary, fontSize: size.md}}>
        Hello World
        <Icon name="stepforward" />
      </Text>
    </View>
  );
};

export default App;
