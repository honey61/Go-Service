
// import React, { useState, useEffect, useRef } from 'react';

// import { 
//   View, 
//   Text, 
//   TextInput, 
//   TouchableOpacity, 
//   FlatList, 
//   StyleSheet, 
//   Image, 
//   LayoutAnimation, 
//   Platform, 
//   UIManager 
// } from 'react-native';
// import io from 'socket.io-client';

// const SOCKET_SERVER_URL = 'http://192.168.230.232:3000'; // Replace with your server URL

// // Enable LayoutAnimation on Android
// if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// const ChatScreen = ({ route }) => {
//   const { userId, username, phoneNumber, profileImage, selectedCity, selectedTown } = route.params;
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState('');
  
//   // Use useRef to persist the socket connection
//   const socketRef = useRef(null);

//   useEffect(() => {
//     // Initialize the socket connection only once
//     socketRef.current = io(SOCKET_SERVER_URL);

//     // Join the room using the userId
//     socketRef.current.emit('join_room', userId);

//     // Listen for incoming messages
//     socketRef.current.on('receive_message', (data) => {
//       LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     // Cleanup the socket on component unmount
//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, [userId]);  // Only run once when component mounts or userId changes

//   const sendMessage = () => {
//     if (inputText.trim() === '') return;
    
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

//     const newMessage = { 
//       id: Date.now().toString(), 
//       text: inputText, 
//       sender: userId, 
//       room: userId, 
//     };
    
//     // Emit message to the server
//     socketRef.current.emit('send_message', newMessage);

//     // Add message to the state to update the UI
//     setMessages([...messages, newMessage]);
//     setInputText('');
//   };

//   const renderMessage = ({ item }) => (
//     <View 
//       style={[
//         styles.messageContainer, 
//         item.sender === userId ? styles.myMessage : styles.otherMessage
//       ]}
//     >
//       <Text style={styles.messageText}>{item.text}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Top Bar with User Details */}
//       <View style={styles.topBar}>
//         <Image source={{ uri: profileImage }} style={styles.userImage} />
//         <View style={styles.userInfo}>
//           <Text style={styles.userName}>{username}</Text>
//           <Text style={[styles.userStatus, styles.online]}>Online</Text>
//         </View>
//       </View>

//       <FlatList
//         data={messages}
//         keyExtractor={(item) => item.id}
//         renderItem={renderMessage}
//         contentContainerStyle={styles.messageList}
//       />

//       {/* Message Input */}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={inputText}
//           onChangeText={setInputText}
//           placeholder="Type a message..."
//           placeholderTextColor="#aaa"
//         />
//         <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
//           <Text style={styles.sendText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f2f5',
//   },
//   topBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   userImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   userInfo: {
//     flexDirection: 'column',
//   },
//   userName: {
//     color: '#333',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   userStatus: {
//     fontSize: 14,
//   },
//   online: {
//     color: 'green',
//   },
//   messageList: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   messageContainer: {
//     padding: 12,
//     borderRadius: 10,
//     marginVertical: 5,
//     maxWidth: '75%',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   myMessage: {
//     alignSelf: 'flex-end',
//     backgroundColor: '#007bff',
//     borderTopRightRadius: 0,
//   },
//   otherMessage: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#e5e5ea',
//     borderTopLeftRadius: 0,
//   },
//   messageText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderTopWidth: 1,
//     borderColor: '#ddd',
//     backgroundColor: '#ffffff',
//   },
//   input: {
//     flex: 1,
//     height: 45,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 25,
//     paddingHorizontal: 15,
//     backgroundColor: '#fff',
//     fontSize: 16,
//   },
//   sendButton: {
//     marginLeft: 10,
//     backgroundColor: '#007bff',
//     paddingVertical: 12,
//     paddingHorizontal: 18,
//     borderRadius: 25,
//   },
//   sendText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },

// });

// export default ChatScreen;
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  Image, 
  LayoutAnimation, 
  Platform, 
  UIManager 
} from 'react-native';
import io from 'socket.io-client';
import { useNavigation } from '@react-navigation/native';

const SOCKET_SERVER_URL = 'http://192.168.230.232:3000'; // Replace with your server URL

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ChatScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userId, username, phoneNumber, profileImage, selectedCity, selectedTown,adharnumber,
experience,selectedCategory } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  
  // Use useRef to persist the socket connection
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize the socket connection only once
    socketRef.current = io(SOCKET_SERVER_URL);

    // Join the room using the userId
    socketRef.current.emit('join_room', userId);

    // Listen for incoming messages
    socketRef.current.on('receive_message', (data) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup the socket on component unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, [userId]);  // Only run once when component mounts or userId changes

  const sendMessage = () => {
    if (inputText.trim() === '') return;
    
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const newMessage = { 
      id: Date.now().toString(), 
      text: inputText, 
      sender: userId, 
      room: userId, 
    };
    
    // Emit message to the server
    socketRef.current.emit('send_message', newMessage);

    // Add message to the state to update the UI
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const navigateToProfile = () => {
    navigation.navigate('ChatProfile', { 
      user: {
        userId,
        username,
        phoneNumber,
        profileImage,
        selectedCity,
        selectedTown,
        adharnumber,
        selectedCategory,
        experience
      }
    });
  };

  const renderMessage = ({ item }) => (
    <View 
      style={[
        styles.messageContainer, 
        item.sender === userId ? styles.myMessage : styles.otherMessage
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top Bar with User Details - Now clickable */}
      <TouchableOpacity 
        style={styles.topBar} 
        onPress={navigateToProfile}
        activeOpacity={0.7}
      >
        <Image 
          source={{ uri: profileImage || 'https://via.placeholder.com/150' }} 
          style={styles.userImage} 
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{username}</Text>
          <Text style={[styles.userStatus, styles.online]}>Online</Text>
        </View>
      </TouchableOpacity>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
        inverted
      />

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'column',
  },
  userName: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userStatus: {
    fontSize: 14,
  },
  online: {
    color: 'green',
  },
  messageList: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  messageContainer: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    borderTopRightRadius: 0,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5ea',
    borderTopLeftRadius: 0,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  otherMessageText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#ffffff',
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ChatScreen;