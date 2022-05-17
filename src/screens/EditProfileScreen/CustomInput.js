import {View, Text, TextInput} from 'react-native';
import {Controller} from 'react-hook-form';
import styles from './style';
import colors from '../../theme/colors';

const CustomInput = ({label, multiline, control, name, rules}) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <View style={{flex: 1}}>
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={label}
            multiline={multiline}
            style={[
              styles.input,
              {borderColor: error ? colors.error : colors.border},
            ]}
          />
          {error && (
            <Text style={styles.errorText}>{error?.message || 'required'}</Text>
          )}
        </View>
      </View>
    )}
  />
);
export default CustomInput;
