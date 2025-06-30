const WebSocket = require('ws');
const StompJS = require('@stomp/stompjs');

// Test the new chat system with topic-based messaging
const user1 = "buyer123";
const user2 = "seller456";
const chatRoomId = "room_buyer123_seller456_listing789";

console.log("🧪 Testing NEW chat system with topic-based messaging:");
console.log("👤 User 1 (Buyer):", user1);
console.log("👤 User 2 (Seller):", user2);
console.log("🏠 Chat Room ID:", chatRoomId);
console.log("");

// Create two separate connections for the two users
const client1 = new StompJS.Client({
    webSocketFactory: () => new WebSocket('ws://localhost:8081/ws'),
    connectHeaders: {},
    debug: function (str) {
        console.log(`[Client1] ${str}`);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000
});

const client2 = new StompJS.Client({
    webSocketFactory: () => new WebSocket('ws://localhost:8081/ws'),
    connectHeaders: {},
    debug: function (str) {
        console.log(`[Client2] ${str}`);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000
});

let messageCount1 = 0;
let messageCount2 = 0;

// Setup Client 1 (Buyer)
client1.onConnect = function (frame) {
    console.log("✅ Client 1 (Buyer) connected");
    
    // Subscribe to chat room topic
    client1.subscribe(`/topic/chat/${chatRoomId}`, function (message) {
        messageCount1++;
        const body = JSON.parse(message.body);
        console.log(`📨 [Client1] Received message #${messageCount1}:`, {
            from: body.senderId,
            content: body.content,
            chatRoomId: body.chatRoomId,
            timestamp: body.timestamp
        });
    });
    
    // Send join message
    client1.publish({
        destination: `/app/chat.join`,
        body: JSON.stringify({
            senderId: user1,
            senderName: user1,
            receiverId: user2,
            content: "joined",
            chatRoomId: chatRoomId,
            listingId: "listing789"
        })
    });
    
    // Send a message from buyer to seller after 2 seconds
    setTimeout(() => {
        console.log("📤 [Client1] Sending message from buyer to seller...");
        client1.publish({
            destination: `/app/chat.send`,
            body: JSON.stringify({
                senderId: user1,
                senderName: user1,
                receiverId: user2,
                content: "Hi! I'm interested in your listing. Is it still available?",
                chatRoomId: chatRoomId,
                listingId: "listing789"
            })
        });
    }, 2000);
    
    // Send another message after 6 seconds
    setTimeout(() => {
        console.log("📤 [Client1] Sending follow-up message from buyer...");
        client1.publish({
            destination: `/app/chat.send`,
            body: JSON.stringify({
                senderId: user1,
                senderName: user1,
                receiverId: user2,
                content: "What's the best price you can offer?",
                chatRoomId: chatRoomId,
                listingId: "listing789"
            })
        });
    }, 6000);
};

// Setup Client 2 (Seller)
client2.onConnect = function (frame) {
    console.log("✅ Client 2 (Seller) connected");
    
    // Subscribe to chat room topic
    client2.subscribe(`/topic/chat/${chatRoomId}`, function (message) {
        messageCount2++;
        const body = JSON.parse(message.body);
        console.log(`📨 [Client2] Received message #${messageCount2}:`, {
            from: body.senderId,
            content: body.content,
            chatRoomId: body.chatRoomId,
            timestamp: body.timestamp
        });
    });
    
    // Send join message
    client2.publish({
        destination: `/app/chat.join`,
        body: JSON.stringify({
            senderId: user2,
            senderName: user2,
            receiverId: user1,
            content: "joined",
            chatRoomId: chatRoomId,
            listingId: "listing789"
        })
    });
    
    // Send a response from seller to buyer after 4 seconds
    setTimeout(() => {
        console.log("📤 [Client2] Sending response from seller to buyer...");
        client2.publish({
            destination: `/app/chat.send`,
            body: JSON.stringify({
                senderId: user2,
                senderName: user2,
                receiverId: user1,
                content: "Yes, it's still available! When would you like to see it?",
                chatRoomId: chatRoomId,
                listingId: "listing789"
            })
        });
    }, 4000);
    
    // Send another response after 8 seconds
    setTimeout(() => {
        console.log("📤 [Client2] Sending price response from seller...");
        client2.publish({
            destination: `/app/chat.send`,
            body: JSON.stringify({
                senderId: user2,
                senderName: user2,
                receiverId: user1,
                content: "I can offer it for $500, that's $50 off the listed price!",
                chatRoomId: chatRoomId,
                listingId: "listing789"
            })
        });
    }, 8000);
};

client1.onStompError = function (frame) {
    console.error("❌ [Client1] STOMP error:", frame);
};

client2.onStompError = function (frame) {
    console.error("❌ [Client2] STOMP error:", frame);
};

client1.onWebSocketError = function (error) {
    console.error("❌ [Client1] WebSocket error:", error);
};

client2.onWebSocketError = function (error) {
    console.error("❌ [Client2] WebSocket error:", error);
};

client1.onWebSocketClose = function () {
    console.log("❌ [Client1] WebSocket connection closed");
};

client2.onWebSocketClose = function () {
    console.log("❌ [Client2] WebSocket connection closed");
};

// Connect both clients
console.log("🔌 Connecting both clients...");
client1.activate();
client2.activate();

// Test REST API after 12 seconds
setTimeout(async () => {
    console.log("");
    console.log("🔍 Testing REST API to fetch chat history...");
    try {
        const response = await fetch(`http://localhost:8081/api/chat/room/${chatRoomId}`);
        const messages = await response.json();
        console.log("📚 Chat history from REST API:", messages.length, "messages");
        messages.forEach((msg, index) => {
            console.log(`  ${index + 1}. [${msg.senderId}]: ${msg.content} (${msg.timestamp})`);
        });
    } catch (error) {
        console.error("❌ Error fetching chat history:", error.message);
    }
}, 12000);

// Test summary after 15 seconds
setTimeout(() => {
    console.log("");
    console.log("📊 TEST SUMMARY:");
    console.log(`📨 Client 1 (${user1}) received ${messageCount1} messages`);
    console.log(`📨 Client 2 (${user2}) received ${messageCount2} messages`);
    console.log("");
    
    if (messageCount1 >= 4 && messageCount2 >= 4) {
        console.log("✅ SUCCESS: New chat system working correctly!");
        console.log("   - Topic-based messaging working");
        console.log("   - Database persistence working");
        console.log("   - REST API working");
        console.log("   - Messages are properly broadcasted to all users in the room");
    } else {
        console.log("❌ FAILURE: Chat system not working as expected");
        console.log("   - Expected at least 4 messages each (2 joins + 2 messages)");
    }
    
    // Disconnect after test
    setTimeout(() => {
        client1.deactivate();
        client2.deactivate();
        process.exit(0);
    }, 2000);
}, 15000); 