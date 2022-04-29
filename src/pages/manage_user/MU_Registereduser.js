import React, { useEffect, useState, useMemo } from 'react';
import { Oval } from "react-loading-icons";
// Thanks to Moment.js for the date formatter
// -> https://momentjs.com/
// import * as moment from 'moment';
import Layout from '../Layout';
import ManageUserService from '../../web_service/manage_user_service/ManageUserService';
import Box from '@mui/material/Box';
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

// TODO: Need to add Table immediately to avoid maximum call stack size error
function MU_Registereduser() {
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
  const [registerUser, setRegisterUser] = useState([]);
  const [selected, setSelected] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [totalStakeHolderUser, setTotalStakeholderUser] = useState(0);
  const [TMUser, setTMUser] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  useEffect(() => {
    const getUserData = () => {
      ManageUserService.getAllUser(token, '').then(res => {
        // console.log(res)
        setRegisterUser(res);
        setTMUser(res.filter(filter => filter.category === 'TM').length)
        setTotalStakeholderUser(res.filter(filter => filter.category === 'STAKEHOLDER').length)
        setIsFetchingData(false);
      });
    }
    getUserData();

    return () => setIsFetchingData(false);
  }, [token])

  // To avoid page crash and long fetching data
  let allTMUser = [useMemo(() => {
    registerUser.map(({
      category,
      email,
      fullName,
      hID,
      registeredDate,
      stakeholderName
    }, keys) => ({
      category,
      email,
      fullName,
      hID,
      registeredDate,
      stakeholderName,
    }))
  }, [registerUser])]

  return (
    <Layout pageContent={
      <>
        <a name="group-members" />

        <div className="row">
          <div className="col-xs-6" />
        </div>
        <div className="space-2" />
        <div className="row">
          <div className="col-xs-12">
            <div className="clearfix">
              <div className="pull-right tableTools-container-1" style={{ paddingTop: 5 }} />
            </div>
            <div>
              <Box sx={{ width: '100%', mb: 2 }}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table" size="medium" sx={{ minWidth: 750 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Stakeholder</TableCell>
                        <TableCell>Joined Date</TableCell>
                        <TableCell>VIP</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isFetchingData ?
                        <TableCell colSpan={12} align="center">
                          <CircularProgress />
                        </TableCell>
                        :
                        (rowsPerPage > 0 ? registerUser.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : registerUser).map((data, index) => {
                          const isSelected = (name) => selected.indexOf(name) !== -1;
                          const isItemSelected = isSelected(index);
                          index += 1
                          return (
                            <TableRow
                              key={data.fullName}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              hover
                            >
                              <TableCell>
                                {index}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {data.fullName}
                              </TableCell>
                              <TableCell>{data.email}</TableCell>
                              <TableCell>{data.category}</TableCell>
                              <TableCell>
                                <div>
                                  {data.stakeholderName ? data.stakeholderName : 'n/a'}
                                </div>
                              </TableCell>
                              <TableCell>{data.registeredDate}</TableCell>
                              <TableCell>
                                <input type="checkbox" disabled />
                              </TableCell>
                            </TableRow>
                          )
                        })
                      }
                    </TableBody>
                    <TableFooter>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        count={registerUser.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Box>
            </div>
          </div>{/* /.span */}
        </div>

        <h4 className="header green">Total Registered Users</h4>
        <div className="row">
          <div className="col-sm-4">
            <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
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
                    <b style={{ color: 'red' }}>
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