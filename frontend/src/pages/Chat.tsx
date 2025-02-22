import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
import bg from "../assets/bg.jpg"; 
import Footer from "../components/footer/Footer";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "auto",
          boxSizing: "border-box",
          position: "fixed",
          top: 0,
          left: 0,
          padding: "20px",
        }}
      >
        {/* Sidebar for User Info and Clear Chat */}
        <Box
          sx={{
            display: { md: "flex", xs: "none", sm: "none" },
            flex: 0.2,
            flexDirection: "column",
            padding: "20px",
            marginTop: "40px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "60vh",
              bgcolor: "#E0F7FA",
              borderRadius: 5,
              flexDirection: "column",
              padding: "20px",
            }}
          >
            <Avatar
              sx={{
                mx: "auto",
                my: 2,
                bgcolor: "#B2EBF2",
                color: "black",
                fontWeight: 700,
              }}
            >
              {auth?.user?.name ? auth.user.name[0] : "U"}{" "}
              {auth?.user?.name?.split(" ")[1]
                ? auth.user.name.split(" ")[1][0]
                : ""}
            </Avatar>
            <Typography
              sx={{ mx: "auto", px: 3, fontFamily: "work sans", color: "#00796B" }}
            >
              You are talking to your AI Therapist.
            </Typography>
            <Typography
              sx={{
                mx: "auto",
                fontFamily: "work sans",
                my: 4,
                p: 3,
                color: "#00796B",
              }}
            >
              Welcome to a space designed for you—share your thoughts, reflect,
              and express your day in a few lines
            </Typography>
            <Button
              onClick={handleDeleteChats}
              sx={{
                width: "200px",
                my: "auto",
                color: "white",
                fontWeight: "700",
                borderRadius: 3,
                mx: "auto",
                bgcolor: "#00796B",
                ":hover": {
                  bgcolor: "#004D40",
                },
              }}
            >
              Start Fresh
            </Button>
          </Box>
        </Box>

        {/* Main Chat Section */}
        <Box
          sx={{
            display: "flex",
            flex: { md: 0.8, xs: 1, sm: 1 },
            flexDirection: "column",
            px: 5,
            py: 5,
            height: "90vh",
            maxHeight: "90vh",
          }}
        >
          <Typography
            sx={{
              fontSize: "40px",
              color: "#00796B",
              mb: 2,
              mx: "auto",
              fontWeight: "600",
            }}
          >
            Your Personal AI Therapist
          </Typography>

          {/* Chat Response & Input Area */}
          <Box
            sx={{
              width: "99%",
              height: "90vh",
              borderRadius: 3,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              scrollBehavior: "smooth",
              bgcolor: "#E0F7FA",
              p: 2,
            }}
          >
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                scrollBehavior: "smooth",
                padding: "3px",
              }}
            >
              {/* Chat Response Area */}
              {chatMessages.map((chat, index) => (
                <ChatItem content={chat.content} role={chat.role} key={index} />
              ))}
            </Box>
          </Box>

          {/* Chat Input Section */}
          <div
            style={{
              width: "100%",
              borderRadius: 8,
              backgroundColor: "#E0F7FA",
              display: "flex",
              margin: "10px auto",
              padding: "10px",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              style={{
                width: "100%",
                backgroundColor: "transparent",
                padding: "10px",
                border: "none",
                outline: "none",
                color: "#00796B",
                fontSize: "18px",
              }}
            />
            <IconButton onClick={handleSubmit} sx={{ color: "#00796B", mx: 1 }}>
              <IoMdSend />
            </IconButton>
          </div>
        </Box>
      </Box>

      
      <Footer />
    </>
  );
};

export default Chat;
