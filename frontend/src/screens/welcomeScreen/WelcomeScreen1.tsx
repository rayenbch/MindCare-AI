import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { images } from '../../theme/images';
import { fonts } from '../../theme/fonts';
import { colors } from '@/src/theme';
import ButtonPrimary from '@/src/components/ButtonPrimery';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { rootNavigation } from '@/src/navigation/RootNavigation';
import ScreenName from '@/src/constants/ScreenName';


type Props = NativeStackScreenProps<rootNavigation , ScreenName>
export default function WelcomeScreen1({route, navigation }:Props) {
  const handleSignIn = () => {
    console.log('Sign In pressed');
  };

  const WelcomeScreenPressed = () => {
    navigation.navigate(ScreenName.WelcomeScreen2,{
      title:"Welcome Screen 2",
    });}
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={images.logo} style={styles.logo} />
        <Text style={styles.title}>Welcome to the ultimate</Text>
        <Text style={styles.subtitle}>MINDCARE-AI !</Text>
        <Text style={styles.description}>Your mindful mental health AI companion for everyone, anywhere 🍃</Text>
      </View>
      <Image source={images.atmo} style={styles.illustration} />
      <ButtonPrimary
        title="Get Started →"
        onPress={WelcomeScreenPressed}
      />
      <TouchableOpacity style={styles.signInLink} onPress={handleSignIn}>
        <Text style={styles.description}>
          Already have an account? <Text style={styles.signInText}>Sign In.</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.white,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },
  header: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: fonts.extraBold,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007AFF',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color:colors.description,
  },
  illustration: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: colors.marron,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInLink: {
    marginTop: 20,
  },
  signInText: {
    color: colors.orange,
    fontSize: 16,
  },
});