import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

type ButtonProps = {
  label?: string;
  title?: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'danger';
};

const Button = ({
  label,
  title,
  onPress,
  style,
  textStyle,
  variant = 'primary',
}: ButtonProps) => {
  // Use the appropriate button text - title takes precedence if both are provided
  const buttonText = title || label || '';

  // Determine style based on variant
  const variantStyle = getVariantStyle(variant);

  return (
    <TouchableOpacity
      style={[styles.button, variantStyle, style]}
      onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const getVariantStyle = (variant: string): ViewStyle => {
  switch (variant) {
    case 'secondary':
      return {backgroundColor: '#6c757d'};
    case 'danger':
      return {backgroundColor: '#dc3545'};
    case 'primary':
    default:
      return {backgroundColor: '#3498db'};
  }
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;
