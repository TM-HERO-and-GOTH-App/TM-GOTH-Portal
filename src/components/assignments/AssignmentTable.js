import React, { useMemo, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { Oval } from 'react-loading-icons';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';
import DataToCSV from '../../utils/assignment-table/CSVConfiguration';
import AssignmentTableToolbar from './AssignmentTableToolbar'
import AssignmentTableHead from './AssignmentTableHead'

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function AssignmentTable(props) {
    let prepData = useMemo(() => props.tableData
        .filter((item) =>
            (typeof props.caseType !== 'undefined' && typeof props.groupType !== 'undefined') ?
                (item.caseType === props.caseType && item.stakeholderName === props.groupType) || (props.caseType === item.caseType && props.groupType === "0") || (props.groupType === item.stakeholderName && props.caseType === "0") || (props.caseType === "0" && props.groupType === "0") :
                (item)
        )
        .map(({
            createdDate,
            caseStatus,
            closedAging,
            unclosedAging,
            closedAgingDH,
            unclosedAgingDH,
            caseType,
            stakeholderName,
            cToken,
            caseNum,
            vip,
            eligibility,
            productName,
            customerName,
            fullname,
            ownerName,
            areaLocation,
            totalNewAlert,
            response
        }, keys) => ({
            createdDate,
            caseStatus,
            closedAging,
            unclosedAging,
            closedAgingDH,
            unclosedAgingDH,
            caseType,
            stakeholderName,
            cToken,
            caseNum,
            vip,
            eligibility,
            productName,
            customerName,
            fullname,
            ownerName,
            areaLocation,
            totalNewAlert,
            response
        })), [props]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('case_id');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const csvheaders = [
        { label: "Case ID", key: "case_id" },
        { label: "Status", key: "status" },
        { label: "Aging", key: "aging" },
        { label: "Type", key: "type" },
        { label: "VIP", key: "vip" },
        { label: "ELG", key: "eligibility" },
        { label: "Product", key: "product" },
        { label: "Customer", key: "customer" },
        { label: "HERO", key: "hero" },
        { label: "Owner/Group", key: "owner_group" },
        { label: "State", key: "state" },
        { label: "Alert", key: "alert" },
    ];

    const [csvData, setCSVData] = useState([])
    const csvLink = useRef()
    const isMounted = useRef(false)
    const getCSVData = async () => {
        const res = await (selected.length === 0 ? (searchText.length >= 1 ? DataToCSV(filteredData) : DataToCSV(prepData)) : DataToCSV(prepData.filter((item) => selected.includes(item.caseNum))))
        setCSVData(res)
        isMounted.current = true
    }
    //useEffect only CSVData is changed
    React.useEffect(() => {
        //to prevent useEffect from running on initial render
        if (isMounted.current) {
            csvLink.current.link.click()
            isMounted.current = false
        }
    }, [csvData])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = prepData.map((n) => n.caseNum);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1),);
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // RegExp is include in the requestSearch function to ensure consisten
    const requestSearch = (searchValue) => {
        setSearchText(searchValue)
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        if (searchText !== '') {
            const filteredRows = prepData.filter((row) => {
                return Object.keys(row).some((field) => {
                    if (row[field] !== null && row[field] !== undefined) {
                        return searchRegex.test(row[field].toString());
                    } else {
                        return false;
                    }
                })
            })
            setFilteredData(filteredRows)
        } else {
            setFilteredData(prepData)
        }
    };

    return (
        <div className="table-container">
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <AssignmentTableToolbar
                        numSelected={selected.length}
                        searchText={searchText}
                        onChange={(e) => requestSearch(e.target.value)}
                        clearSearch={() => requestSearch('')}
                        cancelSelection={handleSelectAllClick}
                    />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <AssignmentTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={prepData.length}
                            />
                            <TableBody>
                                {props.isLoading ? ( //loading prop
                                    <TableRow>
                                        <TableCell colSpan={12} align="center">
                                            <CircularProgress />
                                            <p>Getting the data...</p>
                                        </TableCell>
                                    </TableRow>
                                ) :
                                    (
                                        // depending on which data the table handling, return the correspond
                                        // data and check if the data is not empty. Else return empty row.
                                        (searchText.length >= 1 ? (filteredData.length !== 0) : (prepData.length !== 0)) ?
                                            (searchText.length >= 1 ? filteredData : prepData)
                                                .slice()
                                                .sort(getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((data, index) => {
                                                    const isItemSelected = isSelected(data.caseNum);
                                                    const labelId = `assignment-table-checkbox-${index}`;
                                                    const date = new Date(data.createdDate)
                                                    const formattedDate = date.toLocaleDateString("en-GB", {
                                                        day: "numeric",
                                                        month: "2-digit",
                                                        year: "numeric",
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                        hourCycle: 'h12'
                                                    })
                                                    const agingDay = (data.caseStatus === 'CLOSED') ? data.closedAging : data.unclosedAging;
                                                    const agingKey = (data.caseStatus === 'CLOSED') ? data.closedAgingDH : data.unclosedAgingDH;
                                                    return (data.response === "FAILED") ?
                                                        (<TableRow>
                                                            <TableCell colSpan={12} align="center" style={{ color: 'red' }}>
                                                                List is empty
                                                            </TableCell>
                                                        </TableRow>) :
                                                        (<TableRow
                                                            hover
                                                            onClick={(event) => handleClick(event, data.caseNum)}
                                                            role="checkbox"
                                                            aria-checked={isItemSelected}
                                                            tabIndex={-1}
                                                            key={data.caseNum}
                                                            selected={isItemSelected}
                                                        >
                                                            <TableCell
                                                                padding="checkbox"
                                                                sx={{ display: "none" }}
                                                            >
                                                                <Checkbox
                                                                    size="small"
                                                                    color="primary"
                                                                    checked={isItemSelected}
                                                                    inputProps={{
                                                                        'aria-labelledby': labelId,
                                                                    }}
                                                                />
                                                            </TableCell>
                                                            <TableCell component="th" id={labelId} scope="row"><Link
                                                                to={`/case-detail/${data.cToken}`}>{data.caseNum}</Link><br />
                                                                <small title="Created Date">{formattedDate}</small>
                                                            </TableCell>
                                                            <TableCell align="center" padding="none"><span
                                                                className='badge badge-info'>{data.caseStatus ? 'A' : '-'}</span>
                                                            </TableCell>
                                                            <TableCell align="center" padding="none"
                                                                title='Day:Hour'>{agingDay < 16 ? agingKey :
                                                                    <span style={{ fontSize: "10px" }}
                                                                        className={`badge badge-sm badge-${data.unclosedAging > 30 ? 'danger' : 'warning'}`}>{agingKey}
                                                                    </span>}
                                                            </TableCell>
                                                            <TableCell>{data.caseType}</TableCell>
                                                            <TableCell align="center">{data.vip ?
                                                                <i className="menu-icon glyphicon glyphicon-ok"></i> : '-'}</TableCell>
                                                            <TableCell align="center">{data.eligibility}</TableCell>
                                                            <TableCell>{data.productName === null ? '-' : data.productName}</TableCell>
                                                            <TableCell padding="none">{data.customerName}</TableCell>
                                                            <TableCell>{data.vip ? <span
                                                                className="label label-success arrowed-right">{data.fullname}
                                                            </span> : data.fullname}</TableCell>
                                                            <TableCell
                                                                padding="none">{data.ownerName === null ? 'Un - Assigned - ' + data.stakeholderName : data.ownerName + ' - ' + data.stakeholderName}</TableCell>
                                                            <TableCell align="center">{data.areaLocation}</TableCell>
                                                            <TableCell align="center">{data.totalNewAlert > 0 ?
                                                                <span style={{ fontSize: 10 }}
                                                                    className="badge badge-warning">{data.totalNewAlert}
                                                                </span> : '-'}
                                                            </TableCell>
                                                        </TableRow>
                                                        );
                                                }) :
                                            (<TableRow>
                                                <TableCell colSpan={12} align="center">
                                                    <p style={{ color: "red", fontSize: 15 }}>List is empty</p>
                                                </TableCell>
                                            </TableRow>)
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={(searchText.length >= 1 ? filteredData : prepData).length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                />
                <div className="pull-right tableTools-container dt-buttons btn-overlap btn-group">
                    <button onClick={getCSVData}
                        className="buttons-csv buttons-html5 btn btn-white btn-primary btn-bold pull-right">
                        <i className="fa fa-database bigger-110 orange" /> Export to CSV
                    </button>
                    <CSVLink
                        className="hidden"
                        data={csvData}
                        filename={"HERO Portal Back-End Control System.csv"}
                        headers={csvheaders}
                        ref={csvLink}
                        target='_blank'
                    />
                </div>
            </Box>
        </div>);
}

export default AssignmentTable;
