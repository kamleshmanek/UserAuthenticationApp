import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle, View } from 'react-native';
import { colors } from '../theme/colors';
import { moderateScale, verticalScale } from '../theme/dimensions';

type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  variant = 'primary',
  disabled = false,
  icon,
  fullWidth = false,
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return [styles.secondaryButton, style];
      case 'outline':
        return [styles.outlineButton, style];
      case 'primary':
      default:
        return [styles.primaryButton, style];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return [styles.secondaryButtonText, textStyle];
      case 'outline':
        return [styles.outlineButtonText, textStyle];
      case 'primary':
      default:
        return [styles.primaryButtonText, textStyle];
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        disabled && styles.disabledButton,
        fullWidth && styles.fullWidth,
      ]}
      onPress={onPress}
      activeOpacity={0.9}
      disabled={disabled}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: verticalScale(4) },
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(8),
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.primaryLight,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  disabledButton: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: colors.text.light,
    fontSize: moderateScale(16),
    fontWeight: '600',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  secondaryButtonText: {
    color: colors.text.light,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  outlineButtonText: {
    color: colors.primary,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  iconContainer: {
    marginRight: moderateScale(8),
  },
  fullWidth: {
    width: '100%',
  },
});

export default Button;
