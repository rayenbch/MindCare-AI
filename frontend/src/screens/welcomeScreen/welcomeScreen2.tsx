import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { images } from '../../theme/images';
import { colors } from '@/src/theme';

export default function PersonalizeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <Text style={styles.stepText}>Step One</Text>
      </View>
      <Image source={images.stepOne} style={styles.illustration} />
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: '30%' }]} /> 
      </View>
      <Text style={styles.title}>Personalize Your Mental</Text>
      <Text style={styles.title}>Health State With AI</Text>
      <TouchableOpacity style={styles.arrowButton}>
        <Text style={styles.arrowText}>→</Text>
      </TouchableOpacity>
      <View style={styles.bottomBar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.personalizeBackground, // Couleur de fond
    alignItems: 'center',
  },
  stepContainer: {
    backgroundColor: colors.stepBackground, // Couleur de fond du "Step One"
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 50, // Ajustez la marge supérieure
  },
  stepText: {
    fontSize: 16,
    color: colors.stepText, // Couleur du texte "Step One"
  },
  illustration: {
    width: '100%',
    height: 300, // Ajustez la hauteur
    resizeMode: 'contain',
    marginTop: 30, // Ajustez la marge supérieure
  },
  progressBar: {
    width: '80%',
    height: 10,
    backgroundColor: colors.progressBarBackground, // Couleur de fond de la barre de progression
    borderRadius: 5,
    marginTop: 30, // Ajustez la marge supérieure
  },
  progress: {
    height: '100%',
    backgroundColor: colors.progressBarFill, // Couleur de remplissage de la barre de progression
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20, // Ajustez la marge supérieure
  },
  arrowButton: {
    backgroundColor: colors.arrowButtonBackground, // Couleur de fond du bouton flèche
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30, // Ajustez la marge supérieure
  },
  arrowText: {
    fontSize: 30,
    color: colors.arrowButtonText, // Couleur du texte de la flèche
  },
  bottomBar: {
    width: '60%',
    height: 5,
    backgroundColor: colors.bottomBar, // Couleur de la barre inférieure
    borderRadius: 3,
    marginTop: 50, // Ajustez la marge supérieure
  },
});