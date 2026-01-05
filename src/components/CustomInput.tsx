import React, { forwardRef } from 'react';
import { 
  TextInput, 
  StyleSheet, 
  Text, 
  TextInputProps, 
  View, 
  TouchableOpacity, 
  ViewStyle, 
  StyleProp, 
  TextInput as RNTextInput 
} from 'react-native';
import { moderateScale, verticalScale } from '../theme/dimensions';
import { colors } from '../theme/colors';

type CustomInputProps = TextInputProps & {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
};

const CustomInput = forwardRef<RNTextInput, CustomInputProps>(({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputContainerStyle,
  style,
  ...props
}, ref) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, inputContainerStyle]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <TextInput
          ref={ref}
          style={[
            styles.input, 
            leftIcon && styles.inputWithLeftIcon,
            rightIcon && styles.inputWithRightIcon,
            error && styles.inputError,
            style
          ]}
          placeholderTextColor="#999"
          {...props}
        />

        {rightIcon && (
          <TouchableOpacity 
            onPress={onRightIconPress} 
            style={styles.rightIcon}
            activeOpacity={0.7}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(16),
    width: '100%',
  },
  label: {
    color: colors.primary,
    fontSize: moderateScale(14),
    marginBottom: verticalScale(6),
    fontWeight: '500',
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: moderateScale(8),
    padding: moderateScale(14),
    fontSize: moderateScale(16),
    color: colors.text.primary,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: 2,
  },
  inputWithLeftIcon: {
    paddingLeft: moderateScale(40),
  },
  inputWithRightIcon: {
    paddingRight: moderateScale(40),
  },
  leftIcon: {
    position: 'absolute',
    left: moderateScale(12),
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: moderateScale(12),
    padding: moderateScale(5),
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: moderateScale(12),
    marginTop: verticalScale(4),
  },
});

export default CustomInput;