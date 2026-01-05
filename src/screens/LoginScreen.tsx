// In LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { ScreenNavigationProp } from '../navigation/AppNavigator';
import CustomInput from '../components/CustomInput';
import Button from '../components/Button';
import { colors } from '../theme/colors';
import { strings } from '../theme/strings';
import { moderateScale, verticalScale } from '../theme/dimensions';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// Import LinearGradient based on platform
const LinearGradient = Platform.select({
  ios: require('react-native-linear-gradient').default,
  android: require('react-native-linear-gradient').default,
  default: ({ children, colors, style, ...props }: any) => (
    <View
      style={[style, { background: `linear-gradient(${colors.join(', ')})` }]}
      {...props}
    >
      {children}
    </View>
  ),
});

type Props = {
  navigation: ScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login, user, isLoading } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = strings.validation.required(strings.common.email);
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = strings.validation.emailInvalid;
    }

    if (!password) {
      newErrors.password = strings.validation.required(strings.common.password);
    } else if (password.length < 6) {
      newErrors.password = strings.validation.passwordLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (user) {
      navigation.replace('Home');
    }
  }, [user, navigation]);

  const handleLogin = async (): Promise<void> => {
    // First validate the form
    if (!validateForm()) {
      // Check for specific validation errors
      if (email && !/\S+@\S+\.\S+/.test(email)) {
        Alert.alert(
          'Invalid Format',
          'Please enter a valid email address ',
          [{ text: 'OK' }]
        );
        return;
      }
      if (password && password.length < 6) {
        Alert.alert(
          'Invalid Password',
          'Password must be at least 6 characters long',
          [{ text: 'OK' }]
        );
        return;
      }
      return;
    }

    // If form is valid, attempt to login
    const success = await login({ email, password });
    if (!success) {
      Alert.alert(
        'Login Failed',
        'The email or password you entered is incorrect. Please try again.',
        [{ text: 'OK' }],
        { cancelable: true }
      );
    }
  };

  return (
    <LinearGradient
      colors={[colors.background.default, colors.primary + '33']}
      style={styles.gradientContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.formContainer}>
              <View style={styles.formContent}>
                <View style={styles.headerContent}>
                  <Text style={styles.welcomeText}>
                    {strings.login.welcomeBack}
                  </Text>
                  <Text style={styles.subHeaderText}>
                    {strings.login.signInToContinue}
                  </Text>
                </View>

                <View style={styles.inputGroup}>
                  <CustomInput
                    label={strings.common.email}
                    placeholder={strings.login.emailPlaceholder}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={errors.email}
                  />

                  <CustomInput
                    label={strings.common.password}
                    placeholder={strings.login.passwordPlaceholder}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    error={errors.password}
                    rightIcon={
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        size={moderateScale(20)}
                        color={colors.text.secondary}
                      />
                    }
                    onRightIconPress={togglePasswordVisibility}
                    autoCapitalize="none"
                    returnKeyType="done"
                    onSubmitEditing={handleLogin}
                  />
                  <View style={styles.buttonContainer}>
                    <Button
                      title={
                        isLoading
                          ? strings.common.loading
                          : strings.login.signIn
                      }
                      onPress={handleLogin}
                      fullWidth
                      disabled={isLoading}
                    />
                  </View>
                </View>

                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    {strings.login.dontHaveAccount}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Signup')}
                  >
                    <Text style={styles.link}>{strings.login.signUp}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingBottom: verticalScale(30),
  },
  headerContent: {
    marginVertical: verticalScale(60),
    marginBottom: verticalScale(80),
  },
  welcomeText: {
    fontSize: moderateScale(32),
    fontWeight: 'bold',
    color: colors.text.dark,
    marginBottom: verticalScale(8),
  },
  subHeaderText: {
    fontSize: moderateScale(16),
    color: colors.text.secondary,
  },
  card: {
    flex: 1,
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    marginTop: verticalScale(30),
    marginHorizontal: 0,
    padding: moderateScale(30),
    paddingTop: verticalScale(40),
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: verticalScale(-3) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(20),
    elevation: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  formContent: {
    flex: 1,
    justifyContent: 'center',
  },
  inputGroup: {},
  buttonContainer: {
    marginTop: verticalScale(10),
  },
  
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(30),
    marginBottom: verticalScale(10),
  },
  footerText: {
    color: colors.text.secondary,
    fontSize: moderateScale(14),
  },
  link: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: moderateScale(14),
    marginLeft: moderateScale(4),
  },
});

export default LoginScreen;
