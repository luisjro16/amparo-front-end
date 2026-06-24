import React, { useMemo } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useAccessibility } from '../contexts/AccessibilityContext';

type SettingsRowProps = {
  label: string;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
};

const SettingsRow: React.FC<SettingsRowProps> = ({ label, value, onValueChange }) => {
  const { colors, fontScale } = useAccessibility();
  const styles = useMemo(() => makeStyles(colors, fontScale), [colors, fontScale]);

  return (
    <View style={styles.rowContainer}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        trackColor={{ false: '#555555', true: '#FFD700' }}
        thumbColor={value ? '#FFFFFF' : '#E0E0E0'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );
};

const makeStyles = (colors: any, fontScale: number) =>
  StyleSheet.create({
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    label: {
      fontSize: 16 * fontScale,
      color: colors.text,
      flex: 1,
      paddingRight: 10,
    },
  });

export default SettingsRow;
