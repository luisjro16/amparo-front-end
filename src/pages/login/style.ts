import { Dimensions, StyleSheet } from "react-native";
import { ColorPalette } from "../../contexts/AccessibilityContext";

export const makeStyles = (colors: ColorPalette, fontScale: number) => StyleSheet.create({
    boxBottom:{
        alignItems:'center',
        height:Dimensions.get('window').height/3,
        marginBottom: -40,
        paddingTop: 40,
        width:'40%'
    },
    boxInput:{
        alignItems:'center',
        backgroundColor: colors.inputBackground,
        borderRadius: 20,
        elevation: 10,
        flexDirection:'row',
        height: 45,
        marginBottom: 8,
        marginTop: 12,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        width:'100%',
    },
    boxMid:{
        height:Dimensions.get('window').height/4,
        justifyContent:'center',
        marginTop: 20,
        paddingHorizontal: 32,
        width:'100%',
    },
    boxTop:{
        alignItems:'center',
        height:Dimensions.get('window').height/3,
        justifyContent:'center',
        width:'100%',
    },
    button:{
        alignItems:'center',
        backgroundColor: colors.primary,
        borderRadius: 24,
        elevation: 6,
        height: 48,
        justifyContent:'center',
        shadowColor:'#000',
        shadowOffset:{
            width: 0,
            height: 4
        },
        shadowOpacity: 0.18,
        shadowRadius: 8,
        width: '100%',
    },
    container:{
        alignContent:'center',
        alignItems:'center',
        backgroundColor: colors.primary,
        flex:1,
        justifyContent:'center'
    },
    logo:{
        height: 250,
        marginBottom: 10,
        resizeMode: 'contain',
        width: 250,
    },
    textBotton:{
        color: colors.textOnPrimary,
        fontSize: 15 * fontScale,
        fontWeight:'bold'
    },
    textButton:{
        color: colors.textOnPrimary,
        fontSize: 18 * fontScale,
        fontWeight:'bold',
        letterSpacing: 1,
    },
    textForget:{
        alignSelf:'flex-end',
        color: colors.textOnPrimary,
        fontSize: 15 * fontScale,
        fontWeight:'500',
        marginBottom: 10,
        marginTop: 10,
        paddingLeft: 8,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 4,
        marginBottom: 4,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rememberMeText: {
        alignSelf: 'flex-start',
        marginLeft: 5,
        color: colors.textOnPrimary,
        fontSize: 15 * fontScale,
    },
    textInput:{
        backgroundColor: 'transparent',
        color: colors.text,
        flex: 1,
        fontSize: 15 * fontScale,
        height:'100%',
        paddingLeft: 5,
    },
    textTitle:{
        color: colors.textOnPrimary,
        fontFamily:'inter',
        fontSize: 18 * fontScale,
        fontWeight:'bold',
        letterSpacing: 2,
        marginBottom: 2,
        marginTop: 15,
        paddingLeft: 8,
    }
});