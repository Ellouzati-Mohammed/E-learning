import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  Paper,
  TextField,
  Button,
  Typography,
  Grow,
  Avatar,
  Link
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import { styles, animations } from "../styles/ChatBotsStyle";
import { useAuth } from '../hooks/useAuth';
const ChatBotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isBotResponding, setIsBotResponding] = useState(false);
  const chatRef = useRef(null);
  const buttonRef = useRef(null);
  const { token } = useAuth();

  const toggleChat = () => setOpen(!open);

  const parseMessage = (text) => {
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    let parts = [];
    let lastIndex = 0;
    let match;

    while ((match = markdownLinkRegex.exec(text)) !== null) {
      parts.push(text.slice(lastIndex, match.index));
      parts.push(
        <Link
          href={match[2]}
          key={`link-${match[2]}-${parts.length}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ 
            color: 'primary.light', 
            fontWeight: 500,
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          {match[1]}
        </Link>
      );
      lastIndex = markdownLinkRegex.lastIndex;
    }

    const remainingText = text.slice(lastIndex);
    const urlParts = [];
    let urlLastIndex = 0;
    
    while ((match = urlRegex.exec(remainingText)) !== null) {
      urlParts.push(remainingText.slice(urlLastIndex, match.index));
      urlParts.push(
        <Link
          href={match[0]}
          key={`url-${match[0]}-${urlParts.length}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ 
            color: 'primary.light', 
            fontWeight: 500,
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          {match[0]}
        </Link>
      );
      urlLastIndex = urlRegex.lastIndex;
    }
    urlParts.push(remainingText.slice(urlLastIndex));

    return [...parts, ...urlParts].map((part, index) => 
      typeof part === 'string' ? 
      <span key={index}>{part}</span> : 
      React.cloneElement(part, { key: index })
    );
  };

  const sendMessage = async () => {
    if (!input.trim() || isBotResponding) return;
    
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsBotResponding(true);

    try {
      const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          sender: "user", 
          message: input,  
          metadata: {token: token} 
        }),
      });

      const data = await response.json();
      data.forEach((msg) => {
        if (msg.text) {
          setMessages((prev) => [...prev, { sender: "bot", text: msg.text }]);
        }
      });
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Erreur de connexion avec le serveur Rasa." },
      ]);
    }
    setIsBotResponding(false);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isBotResponding]);

  const TypingIndicator = () => (
    <Box sx={styles.typingIndicator}>
      <Box sx={styles.typingBubble}>
        {[...Array(3)].map((_, i) => (
          <Box key={i} sx={styles.typingDot(i)} />
        ))}
      </Box>
    </Box>
  );

  return (
    <Box ref={buttonRef} sx={styles.root}>
      <IconButton onClick={toggleChat} sx={styles.chatButton}>
        {open ? <CloseIcon /> : <ChatIcon />}
      </IconButton>

      <Grow in={open} style={{ transformOrigin: 'right bottom' }}>
        <Paper elevation={24} sx={styles.chatContainer}>
          <Box sx={styles.header}>
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar sx={{ 
                bgcolor: 'primary.light', 
                animation: `${animations.pulse} 2s infinite`
              }}>
                <SmartToyIcon sx={{ color: 'primary.dark' }} />
              </Avatar>
              <Typography variant="h6">Assistant Virtuel</Typography>
            </Box>
            <IconButton color="inherit" onClick={toggleChat}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={styles.messagesContainer} ref={chatRef}>
            {messages.map((msg, i) => (
              <Grow in={true} key={i} timeout={300}>
                <Box sx={{ 
                  display: "flex",
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  mb: 2
                }}>
                  <Paper sx={{
                    ...styles.messageBubble,
                    ...(msg.sender === "user" ? styles.userMessage : styles.botMessage)
                  }}>
                    {/* Modification pour les retours à ligne */}
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                      {parseMessage(msg.text)}
                    </Typography>
                  </Paper>
                </Box>
              </Grow>
            ))}
            {isBotResponding && <TypingIndicator />}
          </Box>

          <Box sx={styles.inputArea}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              size="small"
              placeholder={isBotResponding ? "Le bot répond..." : "Écrivez un message..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              disabled={isBotResponding}
              sx={styles.textField}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={sendMessage}
              disabled={isBotResponding}
              sx={styles.sendButton}
            >
              <SendIcon fontSize="small" />
            </Button>
          </Box>
        </Paper>
      </Grow>
    </Box>
  );
};

export default ChatBotWidget;