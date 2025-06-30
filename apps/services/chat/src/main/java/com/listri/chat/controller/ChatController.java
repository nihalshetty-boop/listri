package com.listri.chat.controller;

import com.listri.chat.model.ChatMessage;
import com.listri.chat.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
public class ChatController {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.send")
    public void sendMessage(@Payload ChatMessage message) {
        try {
            System.out.println("Received message: " + message.getContent() + " from " + message.getSenderId() + " in room " + message.getChatRoomId());
            
            // Set timestamp if not already set
            if (message.getTimestamp() == null) {
                message.setTimestamp(LocalDateTime.now());
            }
            
            // Save to database
            ChatMessage savedMessage = chatMessageRepository.save(message);
            System.out.println("Message saved to database with ID: " + savedMessage.getId());
            
            messagingTemplate.convertAndSend("/topic/chat/" + savedMessage.getChatRoomId(), savedMessage);
        } catch (Exception e) {
            System.err.println("Error processing message: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @MessageMapping("/chat.join")
    public void addUser(@Payload ChatMessage message, SimpMessageHeaderAccessor headerAccessor) {
        try {
            System.out.println("User joining: " + message.getSenderId() + " in room " + message.getChatRoomId());
            
            // Add username to web socket session
            headerAccessor.getSessionAttributes().put("username", message.getSenderId());
            headerAccessor.getSessionAttributes().put("chatRoomId", message.getChatRoomId());
            
            System.out.println("User " + message.getSenderId() + " joined room " + message.getChatRoomId() + " successfully");
            
            messagingTemplate.convertAndSend("/topic/chat/" + message.getChatRoomId(), message);
        } catch (Exception e) {
            System.err.println("Error processing join message: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
