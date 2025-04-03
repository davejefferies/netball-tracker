import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

type PlayerButtonProps = {
    name: string;
    onPress?: () => void;
    style?: ViewStyle;
};

const PlayerButton: React.FC<PlayerButtonProps> = ({ name, onPress, style }) => {
    return (
        <TouchableOpacity style={[styles.buttonWrapper, style]} onPress={onPress}>
            <LinearGradient
                colors={['#339af0', '#1c7ed6']}
                start={{ x: 0.1, y: 0.1 }}
                end={{ x: 0.9, y: 0.9 }}
                style={styles.button}
            >
                <View style={styles.gloss} />
                <Text style={styles.text}>{name}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default PlayerButton;

const styles = StyleSheet.create({
    buttonWrapper: {
      position: 'absolute',
      width: 64,
      height: 64,
      borderRadius: 32,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 10,
    },
    button: {
      width: '100%',
      height: '100%',
      borderRadius: 32,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#ffffff44',
      overflow: 'hidden',
    },
    gloss: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '50%',
      backgroundColor: '#ffffff33',
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
    },
    text: {
      color: '#fff',
      fontWeight: '900',
      fontSize: 16,
      textShadowColor: '#00000060',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
    },
  });
  