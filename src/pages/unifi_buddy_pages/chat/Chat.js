import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ChatContainer, ConversationHeader, MessageList, MessageSeparator, MessageInput, Message, AttachmentButton, SendButton } from '@chatscope/chat-ui-kit-react';

function ChatPage() {
    const inputRef = useRef();
    const fileRef = useRef(null);
    const isUnifiBuddy = true;
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectedFile, setSelectedFile] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/chat/push-message/', {
            authToken: "someAuthTokenHere",
            cID: "123312",
            message: messageInput,
            source: "UNIFIBUDDY",
            userID: "31",
            picture: null
        }).then(res => {
            console.log(res.data);
        }).catch(e => console.log(e));
        setMessageInput('');
    }

    const handleSend = message => {
        setMessages([{
            message,
            // selectedFile,
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
        const getMessageList = () => {
            axios.post('http://localhost:3001/chat/pull-message', {
                authToken: 'someAuthTokenHere',
                cID: '123312'
            }).then(res => {
                // console.log(res.data)
                setMessages(res.data)
            });
        }
        getMessageList();
    }, [])

    return (
        <div style={{ height: "100vh" }}>
            <ChatContainer>
                <ConversationHeader>
                    <ConversationHeader.Content userName="Unifi Buddy User" />
                </ConversationHeader>
                <MessageList scrollBehavior="smooth">
                    {messages.map((data, i) => {
                        const currentDay = new Date().toLocaleString({ year: 'numeric', month: '2-digit', day: '2-digit' });
                        const dbDate = new Date(data.SENT_TIME).toLocaleString({ year: 'numeric', month: '2-digit', day: '2-digit' })
                        // console.log(data)
                        return <>
                            <MessageSeparator content={new Date(data?.SENT_TIME).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' })} />

                            <Message key={i} model={{
                                message: data?.MESSAGE,
                                sentTime: dbDate,
                                sender: data?.USERID,
                                direction: (data?.SOURCE === 'UNIFIBUDDY' ? 'incoming' : 'outgoing'),
                                position: "normal"
                            }}
                            />
                        </>
                    }
                    )}
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
                    <SendButton onClick={sendMessage} disabled={messageInput.length === 0} style={{
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
                    <input type='file' id='file' ref={fileRef} style={{ display: 'none' }} />
                </div>
            </ChatContainer>
        </div>
    )
}

export default ChatPage