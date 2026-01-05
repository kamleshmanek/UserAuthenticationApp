import React, { useState } from 'react';
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

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const { register, isLoading } = useAuth();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = strings.validation.required(strings.common.fullName);
    }

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

    if (password !== confirmPassword) {
      newErrors.confirmPassword = strings.validation.passwordMismatch;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignup = async (): Promise<void> => {
    // First validate the form
    if (!validateForm()) {
      // Check for specific validation errors
      if (!name.trim()) {
        Alert.alert(
          'Missing Information',
          'Please enter your full name',
          [{ text: 'OK' }]
        );
        return;
      }
      
      if (!email.trim()) {
        Alert.alert(
          'Missing Information',
          'Please enter your email address',
          [{ text: 'OK' }]
        );
        return;
      }
      
      if (!/\S+@\S+\.\S+/.test(email)) {
        Alert.alert(
          'Invalid Email',
          'Please enter a valid email address',
          [{ text: 'OK' }]
        );
        return;
      }
      
      if (!password) {
        Alert.alert(
          'Missing Information',
          'Please enter a password',
          [{ text: 'OK' }]
        );
        return;
      }
      
      if (password.length < 6) {
        Alert.alert(
          'Password Too Short',
          'Password must be at least 6 characters long',
          [{ text: 'OK' }]
        );
        return;
      }
      
      if (password !== confirmPassword) {
        Alert.alert(
          'Password Mismatch',
          'The passwords you entered do not match',
          [{ text: 'OK' }]
        );
        return;
      }
      
      return;
    }

    // If form is valid, attempt to register
    const success = await register({ name, email, password });
    if (success) {
      navigation.goBack();
    } else {
      Alert.alert(
        'Registration Failed',
        'An account with this email already exists. Please use a different email or sign in.',
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
                    {strings.signup.createAccount}
                  </Text>
                  <Text style={styles.subHeaderText}>
                    {strings.signup.signupToContinue}
                  </Text>
                </View>

                <View style={styles.inputGroup}>
                  <CustomInput
                    label={strings.common.fullName}
                    placeholder={strings.signup.fullNamePlaceholder}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    error={errors.name}
                  />

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
                  />

                  <CustomInput
                    label={strings.common.confirmPassword}
                    placeholder={strings.signup.confirmPasswordPlaceholder}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    error={errors.confirmPassword}
                    rightIcon={
                      <FontAwesomeIcon
                        icon={showConfirmPassword ? faEyeSlash : faEye}
                        size={moderateScale(20)}
                        color={colors.text.secondary}
                      />
                    }
                    onRightIconPress={toggleConfirmPasswordVisibility}
                    autoCapitalize="none"
                    returnKeyType="done"
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <Button
                    title={
                      isLoading ? strings.common.loading : strings.login.signUp
                    }
                    onPress={handleSignup}
                    fullWidth
                    disabled={isLoading}
                  />
                </View>

                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    {strings.signup.alreadyHaveAccount}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                  >
                    <Text style={styles.link}>{strings.login.signIn}</Text>
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
    marginVertical: verticalScale(40),
    marginBottom: verticalScale(60),
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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: verticalScale(20),
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: moderateScale(14),
    fontWeight: '500',
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

export default SignupScreen;
