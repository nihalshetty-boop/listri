const SockJS = require('sockjs-client');
const { Client } = require('@stomp/stompjs');

// Test configuration
const CHAT_SERVICE_URL = 'http://localhost:8081/ws';
const USER1_ID = 'test-user-1';
const USER2_ID = 'test-user-2';
const LISTING_ID = 'test-listing-123';

let user1Client = null;
let user2Client = null;
let user1Messages = [];
let user2Messages = [];

function generateConversationId(userId1, userId2, listingId) {
  return [userId1, userId2, listingId].sort().join('_');
}

function createClient(userId) {
  return new Promise((resolve, reject) => {
    console.log(`Creating WebSocket connection for ${userId}...`);
    const socket = new SockJS(CHAT_SERVICE_URL);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 0,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: function(str) {
        console.log(`${userId} STOMP Debug:`, str);
      },
      onConnect: () => {
        console.log(`${userId} connected successfully`);
        
        // Subscribe to conversation topics
        const conversationId = generateConversationId(USER1_ID, USER2_ID, LISTING_ID);
        console.log(`${userId} subscribing to /topic/conversation/${conversationId}`);
        client.subscribe(`/topic/conversation/${conversationId}`, (message) => {
          try {
            console.log(`${userId} received raw message:`, message);
            const body = JSON.parse(message.body);
            console.log(`${userId} parsed message:`, body);
            
            if (body.content && body.content !== 'joined') {
              console.log(`${userId} processing valid message:`, body.content);
              if (userId === USER1_ID) {
                user1Messages.push(body);
              } else {
                user2Messages.push(body);
              }
            } else {
              console.log(`${userId} ignoring join message`);
            }
          } catch (error) {
            console.error(`${userId} error parsing message:`, error);
          }
        });
        
        // Send join message
        const joinMessage = {
          senderId: userId,
          senderName: userId,
          content: 'joined',
          receiverId: '',
          listingId: ''
        };
        
        console.log(`${userId} sending join message:`, joinMessage);
        client.publish({
          destination: '/app/chat.join',
          body: JSON.stringify(joinMessage)
        });
        
        resolve(client);
      },
      onDisconnect: () => {
        console.log(`${userId} disconnected`);
      },
      onStompError: (error) => {
        console.error(`${userId} STOMP error:`, error);
        reject(error);
      },
      onWebSocketError: (error) => {
        console.error(`${userId} WebSocket error:`, error);
        reject(error);
      }
    });
    
    client.activate();
  });
}

function sendMessage(client, senderId, receiverId, content) {
  const message = {
    senderId: senderId,
    senderName: senderId,
    receiverId: receiverId,
    content: content,
    listingId: LISTING_ID
  };
  
  console.log(`${senderId} sending message to ${receiverId}:`, content);
  console.log(`${senderId} full message object:`, message);
  
  client.publish({
    destination: '/app/chat.private',
    body: JSON.stringify(message)
  });
}

async function runTest() {
  try {
    console.log('Starting chat messaging test...');
    
    // Connect both users
    console.log('Connecting users...');
    user1Client = await createClient(USER1_ID);
    user2Client = await createClient(USER2_ID);
    
    // Wait a bit for connections to stabilize
    console.log('Waiting for connections to stabilize...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Send messages between users
    console.log('\nTesting message exchange...');
    
    // User 1 sends message to User 2
    sendMessage(user1Client, USER1_ID, USER2_ID, 'Hello from User 1!');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // User 2 sends message to User 1
    sendMessage(user2Client, USER2_ID, USER1_ID, 'Hello from User 2!');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // User 1 sends another message
    sendMessage(user1Client, USER1_ID, USER2_ID, 'How are you doing?');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Wait a bit more for all messages to be processed
    console.log('Waiting for messages to be processed...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Check results
    console.log('\nTest Results:');
    console.log(`${USER1_ID} received ${user1Messages.length} messages:`, user1Messages.map(m => m.content));
    console.log(`${USER2_ID} received ${user2Messages.length} messages:`, user2Messages.map(m => m.content));
    
    // Verify that both users received messages
    const user1ReceivedFromUser2 = user1Messages.some(m => m.senderId === USER2_ID);
    const user2ReceivedFromUser1 = user2Messages.some(m => m.senderId === USER1_ID);
    
    console.log('\nVerification:');
    console.log(`${USER1_ID} received message from ${USER2_ID}:`, user1ReceivedFromUser2);
    console.log(`${USER2_ID} received message from ${USER1_ID}:`, user2ReceivedFromUser1);
    
    if (user1ReceivedFromUser2 && user2ReceivedFromUser1) {
      console.log('SUCCESS: Both users can receive messages!');
    } else {
      console.log('FAILURE: Some users cannot receive messages!');
    }
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    // Cleanup
    console.log('Cleaning up connections...');
    if (user1Client) {
      user1Client.deactivate();
    }
    if (user2Client) {
      user2Client.deactivate();
    }
    
    console.log('Test completed, connections closed.');
    process.exit(0);
  }
}

// Run the test
runTest(); 