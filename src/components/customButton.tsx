// src/components/CustomButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, DimensionValue } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  width?: DimensionValue;
  height?: DimensionValue;
};

const CustomButton: React.FC<Props> = ({
  title,
  onPress,
  backgroundColor = '#007AFF',
  width = '80%',
  height = 50,
}) => {
  const buttonStyle: ViewStyle = {
    backgroundColor,
    width:width,
    height: height,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CustomButton;
