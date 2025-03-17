import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { images } from '../../theme/images';
import { colors } from '@/src/theme';
export const unstable_settings = {
    headerShown: false,
  };
export default function LoadingScreen3() {
  return (
    <View style={styles.container}>
      <Image source={images.logo} style={styles.logo} />
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>
          "In the midst of winter, I found there was within me an invincible summer."
        </Text>
        <Text style={styles.authorText}>
          — ALBERT CAMUS
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.orange, // Couleur de fond orange
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20, // Ajout d'un peu de rembourrage horizontal
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 40,
    color: colors.white, // Couleur du logo blanc
  },
  quoteContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  quoteText: {
    fontSize: 24, // Ajustez la taille de la police
    fontWeight: 'bold', // Ou un autre style de police
    textAlign: 'center',
    color: colors.white, // Couleur du texte blanc
    marginBottom: 20,
  },
  authorText: {
    fontSize: 18, // Ajustez la taille de la police
    textAlign: 'center',
    color: colors.white,
  },
});