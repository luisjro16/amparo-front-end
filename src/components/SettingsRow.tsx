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
        trackColor={{ false: '#767577', true: colors.primaryLight }}
        thumbColor={value ? colors.primary : '#f4f3f4'}
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
