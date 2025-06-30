package com.listri.chat.controller;

import com.listri.chat.model.ChatMessage;
import com.listri.chat.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatHistoryController {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @GetMapping("/room/{chatRoomId}")
    public ResponseEntity<List<ChatMessage>> getMessagesByRoom(@PathVariable String chatRoomId) {
        try {
            List<ChatMessage> messages = chatMessageRepository.findByChatRoomIdOrderByTimestampAsc(chatRoomId);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            System.err.println("Error fetching messages for room " + chatRoomId + ": " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/conversation/{senderId}/{receiverId}")
    public ResponseEntity<List<ChatMessage>> getMessagesByUsers(
            @PathVariable String senderId, 
            @PathVariable String receiverId) {
        try {
            List<ChatMessage> messages = chatMessageRepository.findBySenderIdAndReceiverIdOrderByTimestampAsc(senderId, receiverId);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            System.err.println("Error fetching messages between " + senderId + " and " + receiverId + ": " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/listing/{listingId}")
    public ResponseEntity<List<ChatMessage>> getMessagesByListing(@PathVariable String listingId) {
        try {
            List<ChatMessage> messages = chatMessageRepository.findByListingIdOrderByTimestampAsc(listingId);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            System.err.println("Error fetching messages for listing " + listingId + ": " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
} 