import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {images} from '../../theme/images'; // Importer le thème
import { fonts } from '../../theme/fonts'; // Importer le thème
import { colors } from '@/src/theme';
export const unstable_settings = {
    headerShown: false,
  };
export default function HomeScreen() {
    return (     
          <View style={styles.container}>
            <Image source={images.logo} style={styles.logo} />
            <Text style={styles.subtitle}>MINDCARE-AI !</Text>
          </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo: {
        width: 80,
        height: 80,
        marginBottom: 40, // Ajustez l'espacement
      },

    subtitle: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.black,
    },
 
  });