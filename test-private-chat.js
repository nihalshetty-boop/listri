const WebSocket = require('ws');
const SockJS = require('sockjs-client');
const StompJS = require('@stomp/stompjs');

console.log("Testing Private Chat Messaging");
console.log("==================================");

// Test users
const user1 = "buyer123";
const user2 = "seller456";
const listingId = "listing789";

console.log("User 1 (Buyer):", user1);
console.log("User 2 (Seller):", user2);
console.log("Listing ID:", listingId);
console.log("");

// Create SockJS clients for both users
const socket1 = new SockJS('http://localhost:8081/ws');
const socket2 = new SockJS('http://localhost:8081/ws');

const client1 = new StompJS.Client({
    webSocketFactory: () => socket1,
    connectHeaders: {},
    debug: function (str) {
        console.log(`[Client1] ${str}`);
    },
    reconnectDelay: 0,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000
});

const client2 = new StompJS.Client({
    webSocketFactory: () => socket2,
    connectHeaders: {},
    debug: function (str) {
        console.log(`[Client2] ${str}`);
    },
    reconnectDelay: 0,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000
});

let client1Connected = false;
let client2Connected = false;
let messagesReceived = 0;
let conversationId = null;

// Client 1 (Buyer) setup
client1.onConnect = () => {
    console.log("Client 1 (Buyer) connected");
    client1Connected = true;
    
    // Send join message
    const joinMessage = {
        senderId: user1,
        senderName: user1,
        content: "joined",
        receiverId: "",
        listingId: ""
    };
    client1.publish({
        destination: "/app/chat.join",
        body: JSON.stringify(joinMessage),
    });
    
    // Send a test message after a delay
    setTimeout(() => {
        if (client2Connected) {
            const testMessage = {
                senderId: user1,
                senderName: "Buyer",
                receiverId: user2,
                content: "Hello seller! I'm interested in your item.",
                listingId: listingId
            };
            console.log("Client 1 sending message:", testMessage.content);
            client1.publish({
                destination: "/app/chat.private",
                body: JSON.stringify(testMessage),
            });
        }
    }, 2000);
};

// Client 2 (Seller) setup
client2.onConnect = () => {
    console.log("Client 2 (Seller) connected");
    client2Connected = true;
    
    // Send join message
    const joinMessage = {
        senderId: user2,
        senderName: user2,
        content: "joined",
        receiverId: "",
        listingId: ""
    };
    client2.publish({
        destination: "/app/chat.join",
        body: JSON.stringify(joinMessage),
    });
};

// Both clients will subscribe to the conversation topic
const subscribeToConversation = (client, clientName) => {
    // Generate the conversation ID (same logic as in Java)
    const ids = [user1, user2, listingId].sort();
    const convId = ids.join("_");
    conversationId = convId;
    
    const conversationTopic = `/topic/conversation/${convId}`;
    console.log(`${clientName} subscribing to: ${conversationTopic}`);
    
    client.subscribe(conversationTopic, (message) => {
        console.log(`${clientName} received message:`, message.body);
        messagesReceived++;
        
        const body = JSON.parse(message.body);
        if (body.content && body.content !== "joined") {
            console.log(`${clientName} received private message:`, body.content);
            
            // If this is the seller and they received the first message, send a reply
            if (clientName === "Client2" && body.senderId === user1) {
                setTimeout(() => {
                    const replyMessage = {
                        senderId: user2,
                        senderName: "Seller",
                        receiverId: user1,
                        content: "Thanks for your interest! The item is still available.",
                        listingId: listingId
                    };
                    console.log("Client 2 sending reply:", replyMessage.content);
                    client.publish({
                        destination: "/app/chat.private",
                        body: JSON.stringify(replyMessage),
                    });
                }, 1000);
            }
        }
    });
};

client1.onStompError = (error) => {
    console.error("Client 1 STOMP error:", error);
};

client2.onStompError = (error) => {
    console.error("Client 2 STOMP error:", error);
};

client1.onWebSocketError = (error) => {
    console.error("Client 1 WebSocket error:", error);
};

client2.onWebSocketError = (error) => {
    console.error("Client 2 WebSocket error:", error);
};

// Start the test
console.log("Starting private chat test...");
client1.activate();
client2.activate();

// Subscribe to conversation after both clients are connected
setTimeout(() => {
    if (client1Connected && client2Connected) {
        subscribeToConversation(client1, "Client1");
        subscribeToConversation(client2, "Client2");
    }
}, 1000);

// Wait for test to complete
setTimeout(() => {
    console.log("");
    console.log("Test Results:");
    console.log("Messages received:", messagesReceived);
    console.log("Conversation ID:", conversationId);
    
    if (messagesReceived >= 2) {
        console.log("Private messaging is working correctly!");
    } else {
        console.log("Private messaging is not working properly");
    }
    
    // Cleanup
    client1.deactivate();
    client2.deactivate();
    process.exit(0);
}, 10000); 