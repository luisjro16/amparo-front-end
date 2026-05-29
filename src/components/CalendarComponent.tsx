import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useAccessibility } from '../contexts/AccessibilityContext';

LocaleConfig.locales['br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ],
  monthNamesShort: [
    'Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.',
    'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.',
  ],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'br';

interface CalendarComponentProps {
  onDayPress: (day: any) => void;
  markedDates: any;
  currentMonth: string;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  onDayPress,
  markedDates,
  currentMonth,
}) => {
  const { colors, fontScale } = useAccessibility();
  const styles = useMemo(() => makeStyles(colors, fontScale), [colors, fontScale]);

  return (
    <View style={styles.container}>
      <Calendar
        current={currentMonth}
        onDayPress={onDayPress}
        monthFormat={'MMMM de yyyy'}
        hideExtraDays={true}
        enableSwipeMonths={true}
        markedDates={markedDates}
        markingType="multi-dot"
        theme={{
          backgroundColor: colors.surface,
          calendarBackground: colors.surface,
          textSectionTitleColor: colors.textSecondary,
          selectedDayBackgroundColor: colors.primary,
          selectedDayTextColor: colors.textOnPrimary,
          todayTextColor: colors.primary,
          dayTextColor: colors.text,
          textDisabledColor: colors.border,
          dotColor: colors.primary,
          selectedDotColor: colors.textOnPrimary,
          arrowColor: colors.primary,
          disabledArrowColor: colors.border,
          monthTextColor: colors.text,
          indicatorColor: colors.primary,
          textDayFontSize: 16 * fontScale,
          textMonthFontSize: 16 * fontScale,
          textDayHeaderFontSize: 14 * fontScale,
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
        }}
        renderHeader={date => {
          const month = LocaleConfig.locales['br'].monthNames[date.getMonth()];
          const year = date.getFullYear();
          return (
            <View style={styles.customHeader}>
              <Text style={styles.monthText}>{`${month} de ${year}`}</Text>
            </View>
          );
        }}
      />

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#5891d4' }]} />
          <Text style={styles.legendText}>Pontual</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FFD700' }]} />
          <Text style={styles.legendText}>Atrasado</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#0047AB' }]} />
          <Text style={styles.legendText}>Registrado depois</Text>
        </View>
      </View>
    </View>
  );
};

const makeStyles = (colors: any, fontScale: number) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderRadius: 8,
      marginHorizontal: 16,
      marginTop: 20,
      paddingBottom: 10,
    },
    customHeader: {
      alignItems: 'center',
      paddingVertical: 10,
    },
    monthText: {
      color: colors.text,
      fontSize: 18 * fontScale,
      fontWeight: 'bold',
    },
    legendContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 15,
      paddingHorizontal: 10,
    },
    legendDot: {
      borderRadius: 5,
      height: 10,
      marginRight: 5,
      width: 10,
    },
    legendItem: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    legendText: {
      color: colors.text,
      fontSize: 12 * fontScale,
    },
  });

export default CalendarComponent;
