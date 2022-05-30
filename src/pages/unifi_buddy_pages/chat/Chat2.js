import {
    Box,
    Button,
    CssBaseline,
    Divider,
    Link,
    ThemeProvider,
    Typography,
    createTheme,
  } from '@mui/material';
import {
    ChatController,
    MuiChat,
    MuiFileInput
  } from 'chat-ui-react';
  import React, { useState, useMemo } from 'react';
  
  const muiTheme = createTheme({
    palette: {
      primary: {
        main: '#007aff',
      },
    },
  });
  
  export default function Chat_2(props) {
    const caseID = props.match.params.id
    const [chatCtl] = React.useState(
      new ChatController({
        showDateTime: true,
      }),
    );
    const fileController = useState(
      new ChatController({
        showDateTime: true
      })
    )
  
    React.useMemo(() => {
      echo(chatCtl);
    }, [chatCtl]);
  
    return (
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Box sx={{ height: '100vh', backgroundColor: 'grey' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
              marginLeft: 'auto',
              marginRight: 'auto',
              backgroundColor: 'background.default',
            }}
          >
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <h4>
                Welcome to room chat for case {caseID}
              </h4>
            </div>
            <Divider />
            <Box sx={{ flex: '1 1 0%' }}>
              <MuiChat chatController={chatCtl} />
              {/* <MuiFileInput chatController={chatCtl} /> */}
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
  
  async function echo(chatCtl) {
    await chatCtl.addMessage({
      type: 'text',
      content: `Please enter something.`,
      self: false,
      avatar: '-',
    });
    const text = await chatCtl.setActionRequest({
      type: 'text',
      placeholder: 'Please enter something',
    });
    await chatCtl.addMessage({
      type: 'text',
      content: `You have entered:\n${text.value}`,
      self: false,
      avatar: '-',
    });
  
    await chatCtl.addMessage({
      type: 'text',
      content: `What is your gender?`,
      self: false,
      avatar: '-',
    });
    const sel = await chatCtl.setActionRequest({
      type: 'select',
      options: [
        {
          value: 'man',
          text: 'Man',
        },
        {
          value: 'woman',
          text: 'Woman',
        },
        {
          value: 'other',
          text: 'Other',
        },
      ],
    });
    await chatCtl.addMessage({
      type: 'text',
      content: `You have selected ${sel.value}.`,
      self: false,
      avatar: '-',
    });
  
    await chatCtl.addMessage({
      type: 'text',
      content: `What is your favorite fruit?`,
      self: false,
      avatar: '-',
    });
    const mulSel = await chatCtl.setActionRequest({
      type: 'multi-select',
      options: [
        {
          value: 'apple',
          text: 'Apple',
        },
        {
          value: 'orange',
          text: 'Orange',
        },
        {
          value: 'none',
          text: 'None',
        },
      ],
    });
    await chatCtl.addMessage({
      type: 'text',
      content: `You have selected '${mulSel.value}'.`,
      self: false,
      avatar: '-',
    });
  
    await chatCtl.addMessage({
      type: 'text',
      content: `What is your favorite picture?`,
      self: false,
      avatar: '-',
    });
    const file = (await chatCtl.setActionRequest({
      type: 'file',
      accept: 'image/*',
      multiple: true,
    }));
    await chatCtl.addMessage({
      type: 'jsx',
      content: (
        <div>
          {file.files.map((f) => (
            <img
              key={file.files.indexOf(f)}
              src={window.URL.createObjectURL(f)}
              alt="File"
              style={{ width: '100%', height: 'auto' }}
            />
          ))}
        </div>
      ),
      self: false,
      avatar: '-',
    });
  
    await chatCtl.addMessage({
      type: 'text',
      content: `Please enter your voice.`,
      self: false,
      avatar: '-',
    });
    const audio = (await chatCtl
      .setActionRequest({
        type: 'audio',
      })
      .catch(() => ({
        type: 'audio',
        value: 'Voice input failed.',
        avatar: '-',
      })));
    await (audio.audio
      ? chatCtl.addMessage({
          type: 'jsx',
          content: (
            <a href={window.URL.createObjectURL(audio.audio)}>Audio download</a>
          ),
          self: false,
          avatar: '-',
        })
      : chatCtl.addMessage({
          type: 'text',
          content: audio.value,
          self: false,
          avatar: '-',
        }));
  
    echo(chatCtl);
  }