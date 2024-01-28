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
    const [otherUser, setOtherUser] = useState();

    useLayoutEffect(() => {
        const fetchData = async () => {
            try {
                setOtherUser(route.params.user);
                const currentUserId = route.params.user.id;
                let chatId;
                // Use the emails of the two users to create a unique chat identifier
                if (userDetails.role === "Driver") {
                    chatId = `${userDetails.id}_${currentUserId}`;
                } else {
                    chatId = `${currentUserId}_${userDetails.id}`;
                }

                setCurrentUserId(chatId);
                const collectionRef = firebase.firestore().collection('chats').doc(chatId);

                // Check if the document exists
                const docSnapshot1 = await collectionRef.get();

                if (docSnapshot1.exists) {
                    console.log('Document exists!');
                    setChatNotExist(false);

                    // Proceed with the query and other logic
                    const messageRef = collectionRef.collection('messages');

                    if (messageRef) {

                        const unsubscribe = onSnapshot(messageRef.orderBy('createdAt', 'desc'), querySnapshot => {
                            if (querySnapshot && querySnapshot.docs) {
                                setMessages(
                                    querySnapshot.docs.map(doc => ({
                                        _id: doc.data()._id,
                                        createdAt: doc.data().createdAt.toDate(),
                                        text: doc.data().text,
                                        user: doc.data().user
                                    }))
                                );
                            }
                        });
                        return unsubscribe;
                    }
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
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages)
        );

        const { _id, createdAt, text, user } = messages[0];

        if (chatNotExist) {
            // Create the chat document if it doesn't exist
            setDoc(database, doc(currentUserId), {});
            setChatNotExist(false);
        }

        // Add the message to the chat
        const chatRef = firebase.firestore().collection('chats').doc(currentUserId).collection('messages');
        const newMessage = chatRef.doc()
        await newMessage.set({
            _id,
            createdAt,
            text,
            user
        });
    }, [currentUserId, chatNotExist]);

    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            showUserAvatar={true}
            onSend={messages => onSend(messages)}
            messagesContainerStyle={{
                backgroundColor: '#fff'
            }}
            textInputStyle={{
                backgroundColor: '#fff',
                borderRadius: 20,
            }}
            user={{
                _id: userDetails?.email,
                avatar: userDetails?.profilePicture
            }}
            
        />
    );
}
