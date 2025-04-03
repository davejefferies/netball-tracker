import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type NetballButtonProps = {
  label: string;
  onPress?: () => void;
  style?: ViewStyle; // for positioning
};

const NetballButton: React.FC<NetballButtonProps> = ({ label, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.wrapper, style]} onPress={onPress}>
      <LinearGradient
        colors={['#ffffff', '#e3e3e3']}
        start={{ x: 0.3, y: 0.3 }}
        end={{ x: 0.7, y: 0.7 }}
        style={styles.button}
      >
        {/* Fake netball stitching lines */}
        <View style={styles.line1} />
        <View style={styles.line2} />
        <View style={styles.line3} />

        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default NetballButton;

const styles = StyleSheet.create({
    wrapper: {
      width: 80,
      height: 80,
      borderRadius: 40,
      elevation: 6,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
    },
    button: {
      flex: 1,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: '#ccc',
    },
    label: {
      fontWeight: 'bold',
      fontSize: 20,
      color: '#1c7ed6',
      zIndex: 2,
      textShadowColor: '#00000040',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    // Decorative lines
    line1: {
      position: 'absolute',
      width: '150%',
      height: 1,
      backgroundColor: '#bbb',
      top: '30%',
      transform: [{ rotate: '20deg' }],
      opacity: 0.2,
    },
    line2: {
      position: 'absolute',
      width: '150%',
      height: 1,
      backgroundColor: '#bbb',
      top: '50%',
      transform: [{ rotate: '-10deg' }],
      opacity: 0.2,
    },
    line3: {
      position: 'absolute',
      width: '150%',
      height: 1,
      backgroundColor: '#bbb',
      top: '70%',
      transform: [{ rotate: '25deg' }],
      opacity: 0.2,
    },
  });
  