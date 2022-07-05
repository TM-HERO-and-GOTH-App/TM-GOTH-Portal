import React from "react";
import {alpha} from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const AssignmentTableToolbar = (props) => {
  const {numSelected, clearSearch, onChange, searchText, handleSelection} = props;

  return (
      <Toolbar className="table-toolbar"
               sx={{
                 pl: {sm: 2}, pr: {xs: 1, sm: 1}, ...(numSelected > 0 && {
                   bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                 }),
               }}
      >
        {numSelected > 0 ?
            (<Typography
                sx={{flex: '1 1 100%', fontSize: 'var(--step-2)'}}
                color="inherit"
                variant="subtitle1"
                component="div"
            >
              <Tooltip title="Cancel">
                <IconButton
                    onClick={handleSelection}
                ><CancelIcon/></IconButton>
              </Tooltip>
              {numSelected} selected
            </Typography>) :
            (<Typography
                sx={{flex: '1 1 100%'}}
                variant="h5"
                fontWeight="bolder"
                id="tableTitle"
                component="div"
            >
              Assignment Table
            </Typography>)
        }

        { numSelected > 0 ?
            null
            :
            <Tooltip title="Select All">
              <IconButton
                  onClick={handleSelection}
              ><PlaylistAddCheckIcon/></IconButton>
            </Tooltip>
        }

        {<Box
            id="tableSearchbar"
            sx={{
              p: 0.5,
              pb: 0,
            }}
        >
          <TextField
              variant="standard"
              value={props.searchText}
              onChange={props.onChange}
              placeholder="Search…"
              InputProps={{
                startAdornment: <SearchIcon fontSize="small"/>, endAdornment: (<IconButton
                    title="Clear"
                    aria-label="Clear"
                    size="small"
                    style={{visibility: props.searchText ? 'visible' : 'hidden'}}
                    onClick={props.clearSearch}
                >
                  <ClearIcon fontSize="small"/>
                </IconButton>),
              }}
              sx={{
                width: {xs: 1, sm: 'auto',},
                m: (theme) => theme.spacing(1, 0.5, 1.5), '& .MuiSvgIcon-root': {
                  mr: 0.5,
                }, '& .MuiInput-underline:before': {
                  borderBottom: 1, borderColor: 'divider',
                },
              }}
          />
        </Box>}
      </Toolbar>)
}

AssignmentTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  handleSelection: PropTypes.func.isRequired,
};

export default AssignmentTableToolbar;
