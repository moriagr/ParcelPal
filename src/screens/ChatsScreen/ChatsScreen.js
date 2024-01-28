import React, { useEffect, useLayoutEffect, useState } from "react";
import CurrentChat from "../CurrentChat/CurrentChat";
import { useUserContext } from "../../common/context/UserContext";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from './styles'


const ChatsScreen = ({ navigation }) => {
    const { user } = useUserContext();
    const [driverMode, setDriverMode] = useState(false);
    const [chatsArray, setChatsArray] = useState([]);
    useLayoutEffect(() => {
        if (user.role && user.role == "Client") {
            // setDriverMode(true); //All users with Packages that assigned to current user
            setChatsArray([{
                email: "driver@gmail.com",
                fullName: "driver",
                id: "eWOVdNiTUqS5vRU269jCioWksIb2",
                phone: "0563736283",
                profilePicture: 9,
                role: "Driver"
            }]);
        }
        else {
            //get all start conversations for my user;
            setChatsArray([{
                email: "client@gmail.com",
                fullName: "client",
                id: "Qz5EmQAUQedr6Dbts0y15NqyvJb2",
                phone: "0836271937",
                role: "Client",
                profilePicture: 12
            }]);
        }
    }, [])

    const goToChat = (data) => {
        console.log('goToChat', data)
        navigation.navigate("CurrentChat", { user: data })

    }

    return (
        <View>

            {chatsArray.map((data, index) => (
                <TouchableOpacity key={index} style={styles.chatBox} onPress={() => goToChat(data)}>
                    <View style={styles.chatInfoContainer}>
                        <Image
                            source={data?.profilePicture}
                            style={styles.profileImage}
                        />
                        <Text>{data.fullName}</Text>
                        <Text>{data.phone}</Text>
                        <Text>{data.email}</Text>

                    </View>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default ChatsScreen;