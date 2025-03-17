import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { fonts } from '../../theme/fonts';
import { colors } from '@/src/theme';
export const unstable_settings = {
    headerShown: false,
  };
export default function loadingScreen4() {
  return (
    <View style={styles.container}>
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>
          Fetching Data...
        </Text>
        <Text style={styles.authorText}>
        🖱️ Shake screen to interact!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green, // Couleur de fond orange
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20, // Ajout d'un peu de rembourrage horizontal
  },

  quoteContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  quoteText: {
    fontSize: 36, // Ajustez la taille de la police
    fontWeight: fonts.extraBold, // Ou un autre style de police
    textAlign: 'center',
    color: colors.white, // Couleur du texte blanc
    marginBottom: 20,
  },
  authorText: {
    fontSize: 18, // Ajustez la taille de la police
    textAlign: 'center',
    fontWeight: fonts.semiBold,
    color: colors.white,
  },
});