import React from "react";
import PropTypes from 'prop-types';
import {alpha} from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { borders } from '@mui/system';

const AssignmentTableToolbar = (props) => {
    const {numSelected, clearSearch, onChange, searchText} = props;

    return (<Toolbar className="table-toolbar"
        sx={{
            pl: {sm: 2}, pr: {xs: 1, sm: 1}, ...(numSelected > 0 && {
                bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
        }}
    >
        {numSelected > 0 ? (<Typography
            sx={{flex: '1 1 100%'}}
            color="inherit"
            variant="subtitle1"
            component="div"
        >
            {numSelected} selected
        </Typography>) : (<Typography
            sx={{flex: '1 1 100%'}}
            variant="h5"
            fontWeight="bolder"
            id="tableTitle"
            component="div"
        >
            Assignment Table
        </Typography>)}

        {numSelected > 0 ? (<Tooltip title="Delete">
            <IconButton>
                <DeleteIcon/>
            </IconButton>
        </Tooltip>) : (<Tooltip title="Filter list">
            <IconButton>
                <FilterListIcon/>
            </IconButton>
        </Tooltip>)}

        {<Box
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
    </Toolbar>);
};

AssignmentTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    searchText: PropTypes.string.isRequired,
};

export default AssignmentTableToolbar;
