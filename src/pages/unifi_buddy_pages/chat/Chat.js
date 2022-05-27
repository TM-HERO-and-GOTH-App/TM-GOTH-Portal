import React, { useState, useRef, useEffect } from 'react';
import { ChatContainer, ConversationHeader, MessageList, MessageInput, Message, AttachmentButton, SendButton } from '@chatscope/chat-ui-kit-react';

function ChatPage() {
    const inputRef = useRef();
    const fileRef = useRef(null);
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectedFile, setSelectedFile] = useState('');

    const handleSend = message => {
        setMessages([{
            message,
            selectedFile,
            direction: 'outgoing'
        }]);
        setMessageInput("");
        inputRef.current.focus();
    };

    const onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            selectedFile,
            selectedFile.name
        );

        // Details of the uploaded file
        console.log(selectedFile);
    };

    useEffect(() => {
        const theMessageList = () => {
            // Execute the API here
        }
        theMessageList()
    }, [messages])

    return (
        <div style={{ height: "100vh" }}>
            <ChatContainer>
                <ConversationHeader>
                    <ConversationHeader.Content userName="Unifi Buddy User" />
                </ConversationHeader>
                <MessageList scrollBehavior="smooth">
                    {messages.map((m, i) => <Message key={i} model={m} />)}
                </MessageList>
                <div as={MessageInput} style={{
                    display: "flex",
                    flexDirection: "row",
                    borderTop: "1px dashed #d1dbe4"
                }}>
                    <MessageInput placeholder="Type message here"
                        onSend={handleSend}
                        onChange={(messagesInput) => setMessageInput(messagesInput)}
                        value={messageInput} ref={inputRef}
                        attachButton={false}
                        sendButton={false}
                        style={{
                            flexGrow: 1,
                            borderTop: 0,
                            flexShrink: "initial",
                            paddingTop: "2.5vh",
                            paddingBottom: "2.5vh"
                        }}
                    />
                    <SendButton onClick={() => handleSend(messageInput)} disabled={messageInput.length === 0} style={{
                        fontSize: "2em",
                        marginLeft: 0,
                        paddingLeft: "0.2em",
                        paddingRight: "0.2em"
                    }} />
                    <AttachmentButton
                        style={{
                            fontSize: "2em",
                            paddingLeft: "0.2em",
                            paddingRight: "0.2em"
                        }}
                        onClick={() => fileRef.current.click()} 
                        onSend={onFileUpload}
                    />
                    <input type='file' id='file' ref={fileRef} style={{display: 'none'}}/>
                </div>
            </ChatContainer>
        </div>
    )
}

export default ChatPage