import React, { useEffect, useLayoutEffect, useState } from "react";
import CurrentChat from "../CurrentChat/CurrentChat";
import { useUserContext } from "../../common/context/UserContext";
import firebase from './../../firebase/config';
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from './styles'


const ChatsScreen = ({ navigation }) => {
    const { user } = useUserContext();

    const [driverMode, setDriverMode] = useState(false);
    const [chatsArray, setChatsArray] = useState([]);
    useLayoutEffect(() => {
        (async () => {
            if (user.role && user.role === "Client") {
                const chatsCollection = firebase.firestore().collection('chats');
                const chatsSnapshot = await chatsCollection.get();

                try {
                    const chatsPromises = chatsSnapshot.docs.map(async (driverDoc) => {
                        const splitUser = driverDoc.id.split("_");
                        let getIndexUser = splitUser.indexOf(user.id);
                        getIndexUser = getIndexUser === 1 ? 0 : 1;

                        if (getIndexUser !== -1) {
                            const drivesRef = await firebase.firestore().collection('users')
                                .where('id', '==', splitUser[getIndexUser])
                                .get();

                            const drivesData = drivesRef.docs.map((driveDoc) => driveDoc.data())[0];

                            return {
                                id: drivesData.id,
                                email: drivesData.email,
                                fullName: drivesData.fullName,
                                phone: drivesData.phone,
                                profilePicture: drivesData.profilePicture,
                                role: drivesData.role
                            };
                        }

                        return null;
                    });

                    const allChatsData = await Promise.all(chatsPromises);

                    // Filter out null values
                    const filteredChats = allChatsData.filter((chat) => chat !== null);
                    setChatsArray(filteredChats);
                } catch (error) {
                    console.error('Error fetching chats:', error);
                }
            } else {
                // Code for the case when user.role is not "Client"
                setChatsArray([{
                    email: "client@gmail.com",
                    fullName: "client",
                    id: "Qz5EmQAUQedr6Dbts0y15NqyvJb2",
                    phone: "0836271937",
                    role: "Client",
                    profilePicture: 12
                }]);
            }
        })();
    }, [user.role, user.id]);

    const goToChat = (data) => {
        console.log('goToChat', data)
        navigation.navigate("CurrentChat", { user: data })

    }

    return (
        <View>

            {chatsArray && chatsArray.map((data, index) => {
                return <TouchableOpacity key={index} style={styles.chatBox} onPress={() => goToChat(data)}>
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
            })}
        </View>
    )
}

export default ChatsScreen;