import React, {useEffect, useMemo, useState} from 'react';
import Layout from '../Layout';
import ManageUserService from '../../web_service/manage_user_service/ManageUserService';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import moment from "moment";

function MU_Registereduser() {
    const userData = JSON.parse(sessionStorage.getItem('UserData'));
    const token = JSON.parse(sessionStorage.getItem('userToken'));
    const [registerUser, setRegisterUser] = useState([]);
    const [selected, setSelected] = useState([]);
    const [isFetchingData, setIsFetchingData] = useState(true);
    const [totalStakeHolderUser, setTotalStakeholderUser] = useState(0);
    const [TMUser, setTMUser] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Can refer all the MUI Table example here =>
    // https://mui.com/material-ui/react-table/#custom-pagination-actions
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    useEffect(() => {
        const getUserData = async () => {
            const res = await ManageUserService.getAllUser(token, userData.hID, 'ALL', 0, '')
            setRegisterUser(res.data);
            setTMUser(res.data.filter(filter => filter.CATEGORY === 'TM').length)
            setTotalStakeholderUser(res.data.filter(filter => filter.CATEGORY === 'STAKEHOLDER').length)
            setIsFetchingData(false);
        }
        getUserData();
        return () => setIsFetchingData(false);
    }, [token])

    // To avoid page crash and long fetching data
    let allTMUser = useMemo(() => registerUser
        .map(({
                  CATEGORY,
                  EMAIL,
                  FULLNAME,
                  H_ID,
                  REGISTERED_DATE,
                  STAKEHOLDER_NAME
              }, keys) => ({
            keys,
            CATEGORY,
            EMAIL,
            FULLNAME,
            H_ID,
            REGISTERED_DATE,
            STAKEHOLDER_NAME,
        })), [registerUser])

    return (
        <Layout
            pageTitle={
                <span> All Registered Users </span>
            }
            pageContent={
                <>
                    {/*<a name="group-members"/>*/}
                    {/*<div className="row">*/}
                    {/*    <div className="col-xs-6"/>*/}
                    {/*</div>*/}
                    <div className="space-2"/>
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="clearfix">
                                <div className="pull-right tableTools-container-1" style={{paddingTop: 5}}/>
                            </div>
                            <div>
                                <div
                                    variant="outlined"
                                    className="table-container"
                                    sx={{width: '100%', mb: 2}}>
                                    <TableContainer component={Paper}>
                                        <Table
                                            aria-label="registereduser table"
                                            size="medium"
                                            sx={{minWidth: 750}}>
                                            <TableHead className="table-head">
                                                <TableRow className="table-head-row">
                                                    <TableCell sx={{color: 'var(--color-primary)'}}
                                                               align={'center'}>
                                                        <h7>#</h7>
                                                    </TableCell>
                                                    <TableCell>Full Name</TableCell>
                                                    <TableCell>Email</TableCell>
                                                    <TableCell>Category</TableCell>
                                                    <TableCell>Stakeholder</TableCell>
                                                    <TableCell>Joined Date</TableCell>
                                                    <TableCell align={'center'}>VIP</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody className="table-body">
                                                {isFetchingData ?
                                                    <TableRow className="table-row">
                                                        <TableCell colSpan={12} align="center">
                                                            <CircularProgress/>
                                                            <p>Getting registered user data...</p>
                                                        </TableCell>
                                                    </TableRow>
                                                    :
                                                    allTMUser
                                                        // .sort(function(a, b){ return a.hID - b.hID })
                                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map((data, index) => {
                                                            return (
                                                                <TableRow
                                                                    key={data.key}
                                                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                                    className="table-row"
                                                                    hover
                                                                >
                                                                    <TableCell align={'center'}>
                                                                        {data.keys + 1}
                                                                    </TableCell>
                                                                    <TableCell sx={{textTransform: 'Capitalize'}}
                                                                               component="th" scope="row">
                                                                        {data.FULLNAME}
                                                                    </TableCell>
                                                                    <TableCell>{data.EMAIL}</TableCell>
                                                                    <TableCell>{data.CATEGORY}</TableCell>
                                                                    <TableCell align={'center'}>
                                                                        <div>
                                                                            {data.STAKEHOLDER_NAME != null ? data.STAKEHOLDER_NAME :
                                                                                <p style={{color: 'var(--color-danger)'}}>N/A</p>}
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell>{moment(data.REGISTERED_DATE).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                                                                    <TableCell align={'center'}>
                                                                        <input type="checkbox" disabled/>
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        })
                                                }
                                            </TableBody>
                                            <TableFooter>
                                                <TablePagination
                                                    className="table-pagination"
                                                    rowsPerPageOptions={[10, 25, 50]}
                                                    count={registerUser.length}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    onPageChange={handleChangePage}
                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                />
                                            </TableFooter>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        </div>
                        {/* /.span */}
                    </div>

                    <h3 className="header green">Total Registered Users</h3>
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="profile-user-info profile-user-info-striped" style={{margin: 0}}>
                                <div className="profile-info-row">
                                    <div className="profile-info-name">TM/PUBLIC</div>
                                    <div className="profile-info-value">
                                        <span className="editable" id="username">
                                            <b>
                                                {TMUser}
                                            </b>
                                        </span>
                                    </div>
                                </div>
                                <div className="profile-info-row">
                                    <div className="profile-info-name">STAKEHOLDER</div>
                                    <div className="profile-info-value">
                                        <span className="editable" id="username"><b>{totalStakeHolderUser}</b></span>
                                    </div>
                                </div>
                                <div className="profile-info-row">
                                    <div className="profile-info-name">TOTAL</div>
                                    <div className="profile-info-value">
                                        <span className="editable" id="username">
                                            <b style={{color: 'var(--color-danger)'}}>
                                                {totalStakeHolderUser + TMUser}
                                            </b>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        />
    );
}

export default MU_Registereduser;
