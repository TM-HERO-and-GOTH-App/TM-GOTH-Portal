import React, { useMemo, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
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
            (typeof props.caseType != null && typeof props.groupType != null) ?
                (item.CASE_TYPE === props.caseType && item.STAKEHOLDER_NAME === props.groupType) || (props.caseType === item.CASE_TYPE && props.groupType === "0") || (props.groupType === item.STAKEHOLDER_NAME && props.caseType === "0") || (props.caseType === "0" && props.groupType === "0") :
                (item)
        )
        .map(({
            CREATED_DATE,
            CASE_STATUS,
            CLOSED_AGING,
            UNCLOSED_AGING,
            CLOSED_AGING_DH,
            UNCLOSED_AGING_DH,
            CASETYPE,
            STAKEHOLDER_NAME,
            C_TOKEN,
            CASE_NUM,
            VIP,
            ELIGIBILITY,
            RODUCT_NAME,
            CUSTOMER_NAME,
            FULLNAME,
            OWNER_NAME,
            AREA_LOCATION,
            TOTAL_NEW_ALERT,
            response
        }, keys) => ({
            CREATED_DATE,
            CASE_STATUS,
            CLOSED_AGING,
            UNCLOSED_AGING,
            CLOSED_AGING_DH,
            UNCLOSED_AGING_DH,
            CASETYPE,
            STAKEHOLDER_NAME,
            C_TOKEN,
            CASE_NUM,
            VIP,
            ELIGIBILITY,
            RODUCT_NAME,
            CUSTOMER_NAME,
            FULLNAME,
            OWNER_NAME,
            AREA_LOCATION,
            TOTAL_NEW_ALERT,
            response
        })), [props]);
    // const prepData = []
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('case_id');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
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
        const res = await (selected.length === 0 ? (searchText.length >= 1 ? DataToCSV(filteredData) : DataToCSV(prepData)) : DataToCSV(prepData.filter((item) => selected.includes(item.CASE_NUM))))
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

    //This function is originally used for AssignmentTableHead Checkbox to select all.
    //And was reused to handle selection on AssignmentTableToolbar as the Checkbox was
    //hidden.
    const handleSelectAllClick = (event) => {
        if (event.target.checked || selected.length === 0) {
            const newSelecteds = prepData.map((n) => n.CASE_NUM);
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
        <div>
            <Box sx={{ width: '100%' }}>
                <div
                    variant="outlined"
                    className="table-container"
                    sx={{ width: '100%', mb: 2 }}>
                    <AssignmentTableToolbar
                        numSelected={selected.length}
                        searchText={searchText}
                        onChange={(e) => requestSearch(e.target.value)}
                        clearSearch={() => requestSearch('')}
                        handleSelection={handleSelectAllClick}
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
                            <TableBody className="table-body">
                                {props.isLoading ? ( //loading prop
                                    <TableRow className="table-row">
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
                                                    const isItemSelected = isSelected(data?.CASE_NUM);
                                                    const labelId = `assignment-table-checkbox-${index}`;
                                                    const date = new Date(data?.CREATED_DATE)
                                                    const formattedDate = date.toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "2-digit",
                                                        year: "numeric"
                                                    })
                                                    const formattedTime = date.toLocaleTimeString("en-GB", {
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                        hourCycle: 'h12'
                                                    })
                                                    const agingDay = (data?.CASE_STATUS === 'CLOSED') ? data?.CLOSED_AGING : data?.UNCLOSED_AGING;
                                                    const agingKey = (data?.CASE_STATUS === 'CLOSED') ? data?.CLOSED_AGING_DH : data?.UNCLOSED_AGING_DH;
                                                    return (data?.response === "FAILED") ?
                                                        (<TableRow>
                                                            <TableCell colSpan={12} align="center"
                                                                style={{ color: 'red' }}>
                                                                List is empty
                                                            </TableCell>
                                                        </TableRow>) :
                                                        (<TableRow
                                                            className="table-row"
                                                            hover
                                                            onClick={(event) => handleClick(event, data?.CASE_NUM)}
                                                            role="checkbox"
                                                            aria-checked={isItemSelected}
                                                            tabIndex={-1}
                                                            key={data?.CASE_NUM}
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
                                                                to={`/case-detail/${data?.C_TOKEN}`}>{data?.CASE_NUM}</Link><br />
                                                                <p className="datetime" title="Created Date">{formattedDate}</p>
                                                                <p className="datetime" title="Created Date">{formattedTime}</p>
                                                            </TableCell>
                                                            <TableCell align="center" >{
                                                                data?.CASE_STATUS === 'NEW' ?
                                                                    <span className='badge badge-danger'>N</span> :
                                                                    data?.CASE_STATUS === 'IN-PROGRESS' ? <span
                                                                        className='badge badge-info'>IP</span> :
                                                                        data?.CASE_STATUS === 'ASSIGNED' ? <span
                                                                            className='badge badge-info'>A</span> :
                                                                            data?.CASE_STATUS === 'CLOSED' ? <span
                                                                                className='badge badge-success'>CL</span> :
                                                                                data?.CASE_STATUS === 'CANCELLED' ?
                                                                                    <span
                                                                                        className='badge badge-info'>CA</span> :
                                                                                    <span
                                                                                        className='badge badge-pink'>TBD</span>
                                                            }
                                                            </TableCell>
                                                            <TableCell
                                                                title='Day:Hour'>{agingDay < 16 ? agingKey :
                                                                    <span style={{ fontSize: "10px" }}
                                                                        className={`badge badge-sm badge-${data?.UNCLOSED_AGING > 30 ? 'danger' : 'warning'}`}>{agingKey}
                                                                    </span>}
                                                            </TableCell>
                                                            <TableCell padding="none">{data?.CASETYPE == null ? 'n/a' : data?.CASETYPE}</TableCell>
                                                            <TableCell align="center">{data?.VIP ?
                                                                <i className="menu-icon glyphicon glyphicon-ok"></i> : '-'}</TableCell>
                                                            <TableCell align="center">{data?.ELIGIBILITY}</TableCell>
                                                            <TableCell align="center">{data?.PRODUCT_NAME == null ? '-' : data?.PRODUCT_NAME}</TableCell>
                                                            <TableCell style={{ textTransform: "capitalize" }}
                                                                padding="none">{data?.CUSTOMER_NAME}</TableCell>
                                                            <TableCell>{data?.VIP ?
                                                                <span className="label label-success arrowed-right"
                                                                    style={{ textTransform: "capitalize" }}>{data?.FULLNAME}</span> :
                                                                <p style={{ textTransform: "capitalize" }}>{data?.FULLNAME}</p>
                                                            }</TableCell>
                                                            <TableCell
                                                                padding="none">
                                                                <p style={{ textTransform: "capitalize" }}>{data?.OWNER_NAME === null ? 'Un - Assigned - ' + data?.STAKEHOLDER_NAME : data?.OWNER_NAME + ' - ' + data?.STAKEHOLDER_NAME}</p>
                                                            </TableCell>
                                                            <TableCell
                                                                align="center">{data?.AREA_LOCATION == null ? 'n/a' : data?.AREA_LOCATION}</TableCell>
                                                            <TableCell align="center">{data?.TOTAL_NEW_ALERT > 0 ?
                                                                <span style={{ fontSize: 10 }}
                                                                    className="badge badge-warning">{data?.TOTAL_NEW_ALERT}
                                                                </span> : '-'}
                                                            </TableCell>
                                                        </TableRow>
                                                        );
                                                }) :
                                            <TableRow>
                                                <TableCell colSpan={12} align="center">
                                                    <p style={{ color: "red", fontSize: 15 }}>List is empty</p>
                                                </TableCell>
                                            </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        className="table-pagination"
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        component="div"
                        count={(searchText.length >= 1 ? filteredData : prepData).length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
                <FormControlLabel
                    id="paddingController"
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
