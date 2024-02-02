import React, {
    useState,
    useLayoutEffect,
    useCallback
} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot
} from 'firebase/firestore';
import firebase, { auth, database } from '../../firebase/config';
// import firebase from './../../firebase/config'
import { useUserContext } from '../../common/context/UserContext';

export default function Chat({ route }) {

    const [messages, setMessages] = useState([]);
    const { user: userDetails } = useUserContext();
    const [currentUserId, setCurrentUserId] = useState(null);
    const [chatNotExist, setChatNotExist] = useState(true);

    useLayoutEffect(() => {
        const fetchData = async () => {
            try {
                let chatId;
                // Use the emails of the two users to create a unique chat identifier
                if (userDetails.role === "Driver") {
                    chatId = `${userDetails.id}_${route.params.user.id}`;
                } else {
                    chatId = `${route.params.user.id}_${userDetails.id}`;
                }

                setCurrentUserId(chatId);
                console.log('✌️chatId --->', chatId);
                const collectionRef = firebase.firestore().collection('chats').doc(chatId);

                // Check if the document exists
                const docSnapshot1 = await collectionRef.get();

                console.log('✌️docSnapshot1.exists --->', docSnapshot1.exists);
                if (docSnapshot1.exists) {
                    console.log('Document exists!');
                    setChatNotExist(false);

                    // Proceed with the query and other logic
                    // const messageRef = collectionRef.collection('messages');
                    const messagesArray = docSnapshot1.data()?.messages || [];
                    console.log('✌️messagesArray --->', messagesArray);
                    if (messagesArray.length > 0) {
                        // messagesArray.orderBy('createdAt', 'desc')
                        const sortedMessagesArray = messagesArray.slice().sort((a, b) => {
                            // Sort in descending order based on createdAt
                            return b.createdAt.seconds - a.createdAt.seconds || b.createdAt.nanoseconds - a.createdAt.nanoseconds;
                        });
                        setMessages(
                            sortedMessagesArray.map(doc => {
                                // console.log('✌️doc --->', doc.data());
                                return {
                                    _id: doc._id,
                                    createdAt: doc.createdAt.toDate(),
                                    text: doc.text,
                                    user: doc.user
                                }
                            })
                        );
                    }
                    // if (messageRef) {

                    // const unsubscribe = onSnapshot(messageRef.orderBy('createdAt', 'desc'), querySnapshot => {
                    //     if (querySnapshot && querySnapshot.docs) {
                    //         setMessages(
                    //             querySnapshot.docs.map(doc => {
                    //                 console.log('✌️doc --->', doc.data());
                    //                 return {
                    //                     _id: doc.data()._id,
                    //                     createdAt: doc.data().createdAt.toDate(),
                    //                     text: doc.data().text,
                    //                     user: doc.data().user
                    //                 }
                    //             })
                    //         );
                    //     }
                    // });
                    // return unsubscribe;
                    // }
                } else {
                    console.log('Document does not exist.');
                    setChatNotExist(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const onSend = useCallback(async (messages = []) => {
        try {

            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, messages)
            );

            const { _id, createdAt, text, user } = messages[0];
            const newMessage = { _id, createdAt, text, user }

            if (chatNotExist) {
                // Create the chat document if it doesn't exist
                firebase.firestore().collection('chats').doc(currentUserId)
                    .set({
                        messages: [
                            newMessage
                        ]
                    })
                setChatNotExist(false);
            } else {
                // Add the message to the chat
                await firebase.firestore().collection('chats').doc(currentUserId).update({
                    messages: firebase.firestore.FieldValue.arrayUnion({
                        ...newMessage
                    }),
                })

            }
        }
        catch (error) {
            console.log('✌️error --->', error);

        }
    }, [currentUserId, chatNotExist]);

    return (
        <GiftedChat
            messages={messages}
            // showAvatarForEveryMessage={true}
            // showUserAvatar={true}
            onSend={messages => onSend(messages)}
            messagesContainerStyle={{
                backgroundColor: '#fff'
            }}
            textInputStyle={{
                backgroundColor: '#fff',
                borderRadius: 20,
            }}
            user={{
                _id: userDetails?.id,
                // avatar: userDetails?.profilePicture
            }}


        />
    );
}
