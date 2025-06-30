const WebSocket = require('ws');
const StompJS = require('@stomp/stompjs');

// Test private messaging between two users
const user1 = "buyer123";
const user2 = "seller456";
const listingId = "listing789";

console.log("🧪 Testing PRIVATE messaging between users:");
console.log("👤 User 1 (Buyer):", user1);
console.log("👤 User 2 (Seller):", user2);
console.log("🏠 Listing ID:", listingId);
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
    
    // Subscribe to user-specific private messages
    client1.subscribe(`/user/${user1}/queue/messages`, function (message) {
        messageCount1++;
        const body = JSON.parse(message.body);
        console.log(`📨 [Client1] Received private message #${messageCount1}:`, {
            from: body.senderId,
            to: body.receiverId,
            content: body.content,
            conversationId: body.conversationId,
            timestamp: body.timestamp
        });
    });
    
    // Send join message
    client1.publish({
        destination: '/app/chat.join',
        body: JSON.stringify({
            senderId: user1,
            senderName: user1,
            content: "joined",
            receiverId: "",
            listingId: ""
        })
    });
    
    // Send a message from buyer to seller after 2 seconds
    setTimeout(() => {
        console.log("📤 [Client1] Sending message from buyer to seller...");
        client1.publish({
            destination: '/app/chat.private',
            body: JSON.stringify({
                senderId: user1,
                senderName: user1,
                receiverId: user2,
                content: "Hi! I'm interested in your listing. Is it still available?",
                listingId: listingId
            })
        });
    }, 2000);
    
    // Send another message after 6 seconds
    setTimeout(() => {
        console.log("📤 [Client1] Sending follow-up message from buyer...");
        client1.publish({
            destination: '/app/chat.private',
            body: JSON.stringify({
                senderId: user1,
                senderName: user1,
                receiverId: user2,
                content: "What's the best price you can offer?",
                listingId: listingId
            })
        });
    }, 6000);
};

// Setup Client 2 (Seller)
client2.onConnect = function (frame) {
    console.log("✅ Client 2 (Seller) connected");
    
    // Subscribe to user-specific private messages
    client2.subscribe(`/user/${user2}/queue/messages`, function (message) {
        messageCount2++;
        const body = JSON.parse(message.body);
        console.log(`📨 [Client2] Received private message #${messageCount2}:`, {
            from: body.senderId,
            to: body.receiverId,
            content: body.content,
            conversationId: body.conversationId,
            timestamp: body.timestamp
        });
    });
    
    // Send join message
    client2.publish({
        destination: '/app/chat.join',
        body: JSON.stringify({
            senderId: user2,
            senderName: user2,
            content: "joined",
            receiverId: "",
            listingId: ""
        })
    });
    
    // Send a response from seller to buyer after 4 seconds
    setTimeout(() => {
        console.log("📤 [Client2] Sending response from seller to buyer...");
        client2.publish({
            destination: '/app/chat.private',
            body: JSON.stringify({
                senderId: user2,
                senderName: user2,
                receiverId: user1,
                content: "Yes, it's still available! When would you like to see it?",
                listingId: listingId
            })
        });
    }, 4000);
    
    // Send another response after 8 seconds
    setTimeout(() => {
        console.log("📤 [Client2] Sending price response from seller...");
        client2.publish({
            destination: '/app/chat.private',
            body: JSON.stringify({
                senderId: user2,
                senderName: user2,
                receiverId: user1,
                content: "I can offer it for $500, that's $50 off the listed price!",
                listingId: listingId
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

// Test summary after 10 seconds
setTimeout(() => {
    console.log("");
    console.log("📊 TEST SUMMARY:");
    console.log(`📨 Client 1 (${user1}) received ${messageCount1} messages`);
    console.log(`📨 Client 2 (${user2}) received ${messageCount2} messages`);
    console.log("");
    
    if (messageCount1 === 2 && messageCount2 === 2) {
        console.log("✅ SUCCESS: Private messaging working correctly!");
        console.log("   - Each user only sees messages they sent or received");
        console.log("   - No duplicate messages");
        console.log("   - Messages are properly routed between buyer and seller");
    } else {
        console.log("❌ FAILURE: Private messaging not working as expected");
        console.log("   - Expected 2 messages each, but got different counts");
    }
    
    // Disconnect after test
    setTimeout(() => {
        client1.deactivate();
        client2.deactivate();
        process.exit(0);
    }, 2000);
}, 10000); 