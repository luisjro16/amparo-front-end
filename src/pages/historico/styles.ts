import {StyleSheet} from 'react-native';
import { ColorPalette } from '../../contexts/AccessibilityContext';

export const makeStyles = (colors: ColorPalette, fontScale: number) => StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1, 
    },
    title: {
        color: colors.primary,
        fontSize: 20 * fontScale,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 16,
        marginTop: 20,
        textAlign: 'center'
    },
    sectionHeader: {
        fontSize: 18 * fontScale,
        fontWeight: 'bold',
        color: colors.primary,
        backgroundColor: colors.background,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16 * fontScale,
        color: colors.textSecondary,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: colors.surface,
        padding: 20,
        borderRadius: 10,
        width: '70%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20 * fontScale,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.text,
    },
    modalMedication: {
        fontSize: 20 * fontScale,
        marginBottom: 20,
        color: colors.text,
    },
    timePickerButton: {
        borderWidth: 1,
        borderColor: colors.border,
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
        backgroundColor: colors.inputBackground,
        justifyContent: 'center',
        fontSize: 14 * fontScale,
    },
    modalButtonContainer: {
        width: '85%',
        justifyContent: 'space-around',
        height: 70,
        alignItems: 'center',
        flexDirection: 'row',
    },
    inputLabel: {
        fontSize: 14 * fontScale,
        color: colors.textSecondary,
        marginBottom: 8,
    },
    timeInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    timeInputBox: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        width: 60,
        height: 50,
        textAlign: 'center',
        fontSize: 20 * fontScale,
        fontWeight: 'bold',
        color: colors.text,
        backgroundColor: colors.inputBackground,
    },
    timeInputSeparator: {
        fontSize: 24 * fontScale,
        fontWeight: 'bold',
        marginHorizontal: 10,
        color: colors.text,
    },
});