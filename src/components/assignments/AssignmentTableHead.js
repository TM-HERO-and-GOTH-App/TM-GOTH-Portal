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
        numeric: false,
        disablePadding: true,
        label: 'Case ID',
    },
    {
        id: 'caseStatus',
        numeric: false,
        disablePadding: false,
        label: 'Status',
    },
    {
        id: 'unclosedAging',
        numeric: false,
        disablePadding: false,
        label: 'Aging',
    },
    {
        id: 'caseType',
        numeric: false,
        disablePadding: false,
        label: 'Type',
    },
    {
        id: 'vip',
        numeric: true,
        disablePadding: false,
        label: 'VIP',
    },
    {
        id: 'eligibility',
        numeric: false,
        disablePadding: false,
        label: 'ELG',
    },
    {
        id: 'productName',
        numeric: false,
        disablePadding: false,
        label: 'Product',
    },
    {
        id: 'customerName',
        numeric: false,
        disablePadding: false,
        label: 'Customer',
    },
    {
        id: 'fullname',
        numeric: false,
        disablePadding: false,
        label: 'HERO',
    },
    {
        id: 'ownerName',
        numeric: false,
        disablePadding: false,
        label: 'Owner / Group',
    },
    {
        id: 'areaLocation',
        numeric: false,
        disablePadding: false,
        label: 'State',
    },
    {
        id: 'totalNewAlert',
        numeric: false,
        disablePadding: false,
        label: <i className="ace-icon fa fa-bell icon-animated-bell"/>,
    },
];

function AssignmentTableHead(props) {
    const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
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
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
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
