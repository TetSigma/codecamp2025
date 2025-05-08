import { UIButton } from "@/components";
import { UIScreen, UIText } from "@/components/atoms";
import UIImage from "@/components/atoms/UIImage";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";


export default function Welcome() {
    const navigation = useRouter()
    const handleLoginPress= () =>{
        navigation.navigate('/login')
    }
    const handleSignupPress= () =>{
        navigation.navigate('/signup')
    }
    return(
        <UIScreen style={styles.container}>
            <View style={styles.textContainer}>
                <UIText variant="heading">
                    Welcome to Cramly!
                </UIText>
                <UIText variant="body">
                    Your personal AI Academic Weapon
                </UIText>
            </View>
            <UIImage source={require('../assets/images/welcome.png')}></UIImage>
            <View style={styles.buttonContainer}>
                <UIButton title="Login" onPress={handleLoginPress}></UIButton>
                <UIButton title="New here? Signup" onPress={handleSignupPress}></UIButton>
            </View>
        </UIScreen>
    )
}



const styles = StyleSheet.create((theme)=>({
    container:{
        justifyContent:'space-between',
    },
    textContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    buttonContainer:{
        gap: theme.s(10),
        marginBottom: theme.s(20)
    },
    signupBtn:{
        backgroundColor:theme.colors.background,
        borderWidth: theme.s(2),
        width: '100%',
        color: theme.colors.primary
    }
}))