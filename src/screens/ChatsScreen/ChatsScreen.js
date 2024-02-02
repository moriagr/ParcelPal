import React, { useEffect, useLayoutEffect, useState } from "react";
import CurrentChat from "../CurrentChat/CurrentChat";
import { useUserContext } from "../../common/context/UserContext";
import firebase from './../../firebase/config';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import styles from './styles'


const ChatsScreen = ({ navigation }) => {
    const { user } = useUserContext();

    const [chatsArray, setChatsArray] = useState(null);
    useLayoutEffect(() => {
        (async () => {
            if (user.role && user.role === "Client") {
                const chatsCollection = firebase.firestore().collection('chats');
                const chatsSnapshot = await chatsCollection.get();

                try {
                    const chatsPromises = chatsSnapshot.docs.map(async (driverDoc) => {
                        console.log('✌️driverDoc --->', await driverDoc);
                        try {

                            const splitUser = driverDoc.id.split("_");
                            let getIndexUser = splitUser.indexOf(user.id);
                            getIndexUser = getIndexUser === 1 ? 0 : 1;

                            if (getIndexUser !== -1) {
                                const drivesUserRef = await firebase.firestore().collection('users')
                                    .where('id', '==', splitUser[getIndexUser])
                                    .get();

                                const userChatData = drivesUserRef.docs.map((userDoc) => userDoc.data())[0];

                                return {
                                    id: userChatData.id,
                                    email: userChatData.email,
                                    fullName: userChatData.fullName,
                                    phone: userChatData.phone,
                                    profilePicture: userChatData.profilePicture,
                                    role: userChatData.role
                                };
                            }

                        } catch (error) {
                            console.log('✌️error --->', error);

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
                const driveRef = await firebase.firestore().collection(`users/${user.id}/drives`).get();

                // Assuming there is only one document with the specified user ID
                const userDoc = driveRef.docs[0];
                const drivesData = userDoc.data();

                // Assuming PackagesId is an array in the document
                const packagesIds = drivesData.packagesIds
                if (packagesIds) {

                    let unique = packagesIds.reduce(function (acc, curr) {
                        if (!acc.includes(curr.clientId))
                            acc.push(curr.clientId);
                        return acc;
                    }, []);

                    const drivesPromises = await unique.map(async (currUserId) => {
                        const userClient = await firebase.firestore().collection('users').where("id", "==", currUserId).get();
                        console.log('✌️userClient --->', userClient.docs);
                        const drivesData = userClient.docs.map((driveDoc) => driveDoc.data())[0];
                        return {
                            id: drivesData.id,
                            email: drivesData.email,
                            fullName: drivesData.fullName,
                            phone: drivesData.phone,
                            profilePicture: drivesData.profilePicture,
                            role: drivesData.role
                        };
                    })
                    const allDrivesData = await Promise.all(drivesPromises);

                    // Filter out null values
                    const filteredData = allDrivesData.filter((chat) => chat !== null);
                    setChatsArray(filteredData);

                }
            }
        })();
    }, [user.role, user.id]);

    const goToChat = (data) => {
        navigation.navigate("CurrentChat", { user: data })
    }

    return (chatsArray ?
        <View>

            {chatsArray.length > 0 ? chatsArray.map((data, index) => {
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
            }) :
                <Text>No chats yet</Text>}
        </View> :
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )
}

export default ChatsScreen;