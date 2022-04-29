import React from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import {visuallyHidden} from '@mui/utils';

const headCells = [
    {
        id: 'caseNum',
        center: false,
        disablePadding: false,
        label: 'Case ID',
        sortable: true,
    },
    {
        id: 'caseStatus',
        center: true,
        disablePadding: false,
        label: 'Status',
        sortable: false,
    },
    {
        id: 'unclosedAging',
        center: true,
        disablePadding: true,
        width: '6%',
        label: 'Aging',
        sortable: true,
    },
    {
        id: 'caseType',
        center: false,
        disablePadding: false,
        label: 'Type',
        sortable: true,
    },
    {
        id: 'vip',
        center: true,
        disablePadding: true,
        label: 'VIP',
        sortable: false,
    },
    {
        id: 'eligibility',
        center: true,
        disablePadding: true,
        label: 'ELG',
        sortable: false,
    },
    {
        id: 'productName',
        center: false,
        disablePadding: false,
        width: '8%',
        label: 'Product',
        sortable: true,
    },
    {
        id: 'customerName',
        center: false,
        disablePadding: true,
        label: 'Customer',
        sortable: true,
    },
    {
        id: 'fullname',
        center: false,
        disablePadding: false,
        label: 'HERO',
        sortable: true,
    },
    {
        id: 'ownerName',
        center: false,
        disablePadding: true,
        label: 'Owner / Group',
        sortable: true,
    },
    {
        id: 'areaLocation',
        center: true,
        disablePadding: false,
        label: 'State',
        sortable: false,
    },
    {
        id: 'totalNewAlert',
        center: true,
        disablePadding: true,
        label: <i className="ace-icon fa fa-bell icon-animated-bell"/>,
        sortable: false,
    },
];

function AssignmentTableHead(props) {
    const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead className="table-head">
            <TableRow className="table-head-row">
                <TableCell padding="checkbox" sx={{display: "none"}}>
                    <Checkbox
                        color="primary"
                        size="small"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all assignment',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.center ? 'center' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{minWidth: headCell.width ? headCell.width : ''}}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={!headCell.sortable ? null : createSortHandler(headCell.id)}
                            hideSortIcon={!headCell.sortable}
                            sx={headCell.sortable ? {} :
                                {
                                    color: '#1E90FF',
                                    '&:hover': {cursor: 'auto', color: '#1E90FF'},
                                }
                            }
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

AssignmentTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default AssignmentTableHead;
