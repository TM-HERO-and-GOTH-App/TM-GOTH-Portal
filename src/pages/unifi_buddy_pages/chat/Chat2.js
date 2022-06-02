import {
  Box,
  CssBaseline,
  Divider,
  ThemeProvider,
  createTheme,
  Button
} from '@mui/material';
import {
  ChatController,
  MuiChat
} from 'chat-ui-react';
import React, { useState, useMemo } from 'react';
import { CgAttachment } from 'react-icons/cg';

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

  const selectAndSendFile = async () => {
    const file = await chatCtl.setActionRequest({
      type: 'file',
      accept: 'image/*',
      multiple: true,
    });
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
      self: true,
      avatar: '-',
    });
    echo(chatCtl);
  }

  React.useMemo(() => {
    echo(chatCtl);
  }, [chatCtl]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ height: '100vh'}}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            maxWidth: '640px',
            marginLeft: 'auto',
            marginRight: 'auto',
            bgcolor: 'background.default'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h4>
              Welcome to room chat for case {caseID}
            </h4>
          </div>
          <Divider />
          <Box sx={{ flex: '1 1 0%', minHeight: 0 }}>
            <MuiChat chatController={chatCtl}/>
            {/* <Button onClick={selectAndSendFile} color="secondary">
              <CgAttachment size={30}/>
            </Button> */}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

async function echo(chatCtl) {
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

  echo(chatCtl);
}