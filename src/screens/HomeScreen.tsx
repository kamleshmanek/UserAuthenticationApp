import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { ScreenNavigationProp } from '../navigation/AppNavigator';
import { useAuth } from '../hooks/useAuth';
import { colors } from '../theme/colors';
import { moderateScale, verticalScale, scale } from '../theme/dimensions';
import { strings } from '../theme/strings';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  navigation: ScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Sample stats data
  const stats = [
    { value: '12', label: strings.common.tasks || 'Tasks' },
    { value: '5', label: strings.common.projects || 'Projects' },
    { value: '3', label: strings.common.messages || 'Messages' }
  ];

  return (
    <LinearGradient
      colors={[colors.background?.default || '#ffffff', colors.primary + '33']}
      style={styles.gradientContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.headerContent}>
              <Text style={styles.welcomeText}>
                {strings.home?.welcome || 'Welcome back'},
              </Text>
              <Text style={styles.userName}>
                {user?.name || strings.common.user || 'User'}!
              </Text>
              <Text style={styles.subHeaderText}>
                {strings.home?.subtitle || 'Great to see you again!'}
              </Text>
            </View>

            <View style={styles.contentContainer}>
              {/* <View style={styles.statsContainer}>
                {stats.map((stat, index) => (
                  <View key={index} style={styles.statItem}>
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
                ))}
              </View> */}

              <TouchableOpacity 
                style={styles.logoutButton} 
                onPress={handleLogout}
                activeOpacity={0.8}
              >
                <Text style={styles.logoutButtonText}>
                  {strings.common.logout || 'Logout'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(20),
  },
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(40),
    justifyContent:"center"
  },
  card: {
    borderRadius: moderateScale(15),
    padding: moderateScale(20),
    marginTop: verticalScale(20),
  },
  headerContent: {
    marginBottom: verticalScale(30),
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: moderateScale(24),
    color: colors.text?.primary || colors.black,
    marginBottom: verticalScale(5),
    fontFamily: 'System',
  },
  userName: {
    fontSize: moderateScale(28),
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
    fontFamily: 'System',
  },
  subHeaderText: {
    fontSize: moderateScale(16),
    color: colors.text?.secondary || colors.gray,
    textAlign: 'center',
    fontFamily: 'System',
    lineHeight: moderateScale(24),
  },
  contentContainer: {
    marginTop: verticalScale(20),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(30),
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: colors.background?.default || colors.lightGray,
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    flex: 1,
    marginHorizontal: moderateScale(5),
    minWidth: scale(80),
  },
  statValue: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: verticalScale(5),
    fontFamily: 'System',
  },
  statLabel: {
    fontSize: moderateScale(14),
    color: colors.text?.secondary || colors.gray,
    fontFamily: 'System',
  },
  logoutButton: {
    backgroundColor: colors.primary,
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: moderateScale(16),
    fontWeight: '600',
    fontFamily: 'System',
  },
});

export default HomeScreen;