import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import CaseDetailService from "../../web_service/case_detail_service/CaseDetailService";
import ManageUserService from "../../web_service/manage_user_service/ManageUserService";

function AssignToOther(props) {
  const [caseToken, setCaseToken] = useState(props.match.params.id);
  const [lovData, setLOVData] = useState(JSON.parse(sessionStorage.getItem("LovData")));
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem("userToken")));
  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem("UserData")));
  const [caseDetailData, setCaseDetailData] = useState({});
  const [groupMember, setGroupMember] = useState([]);
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [badge, setBadge] = useState("");
  const [caseOwner, setCaseOwner] = useState({});
  const [isCoordinator, setIsCoordinator] = useState([]);
  const [isAdmin, setIsAdmin] = useState([]);
  const [stakeholderGroup, setStakeholderGroup] = useState("0");

  useEffect(() => {
    const getGroupResult = () => {
      ManageUserService.getAllUser(token, userData.hID, 'STAKEHOLDER', stakeholderGroup, 'Y').then((res) => {
        // console.log(res.data);
        setGroupMember(res.data);
        setIsCoordinator(
          res.data.filter((filter) => filter.POSITION_NAME === "Coordinator")
        );
        setIsAdmin(res.data.filter((filter) => filter.POSITION_NAME === "Admin"));
      });
    };

    const getCaseDetail = () => {
      CaseDetailService.getCaseDetail(token, caseToken).then((res) => {
        setCaseDetailData(res.data);
        setCaseOwner(res.data.ownerName);
        // console.log(res.data)
      });
    };

    getGroupResult();
    getCaseDetail();
  }, [stakeholderGroup]);

  const assignCaseToAgent = (hID, shID) => e => {
    e.preventDefault();
    CaseDetailService.assignToAgent(token, caseToken, userData.hID, hID, shID).then((res, err) => {
      // console.log(Object.values(res.data)[0])
      // console.log(res.data)
      if (err) {
        setAlertStatus(true);
        setAlertMessage(
          "Only case owner or group coordinator can do the case assignment"
        );
        setBadge("danger");
      } else {
        setAlertStatus(true);
        setAlertMessage(
          "The case has been successfully assigned to the person"
        );
        setBadge("success");
      }
    });
  };

  const assignToPool = e => {
    e.preventDefault();
    CaseDetailService.transferOwnership(token, caseToken, userData.hID, stakeholderGroup).then(
      (res, err) => {
        // console.log(res);
        if (err) {
          setAlertStatus(true);
          setAlertMessage(
            "Only case owner or group coordinator can do the case assignment"
          );
          setBadge("danger");
        } else {
          setAlertStatus(true);
          setAlertMessage(
            "The case has been successfully assigned to this group pool"
          );
          setBadge("success");
        }
      }
    );
  };

  return (
    <Layout
      pageContent={
        <>
          <div class="row">
            <div class="col-sm-4">
              <Link class="btn btn-primary" to={`/case-detail/${caseToken}`}>
                <i class="ace-icon fa fa-arrow-left icon-on-left" />
                Back to Case Detail
              </Link>
            </div>
          </div>

          <div class="space-10" />

          <div class="row">
            <div class="col-sm-12">
              {alertStatus === true && (
                <div class={`alert alert-block alert-${badge}`}>
                  <button type="button" class="close" data-dismiss="alert">
                    <i class="ace-icon fa fa-times" />
                  </button>
                  <p>{alertMessage}</p>
                </div>
              )}
            </div>
          </div>
          {/* <!-- /.row --> */}

          <a href="#" name="group-members" />

          <div class="page-header">
            <h1>Group Members</h1>
          </div>
          <div class="row">
            <div class="col-sm-3">
              <form name="form" method="POST">
                <select
                  class="chosen-select form-control"
                  name="shID"
                  dataPlaceholder="Choose a Group..."
                  value={stakeholderGroup}
                  onChange={(e) => setStakeholderGroup(e.target.value)}
                >
                  <option value="0">All Group/Stakeholder ...</option>
                  {lovData
                    .filter(
                      (filter) =>
                        filter.L_GROUP === "STAKEHOLDER" &&
                        filter.L_NAME !== "ADMIN"
                    )
                    .map((data) => {
                      return (
                        <option key={data.L_ID} value={data.L_ID}>
                          {data.L_NAME}
                        </option>
                      );
                    })}
                </select>
              </form>
            </div>
            <div class="col-sm-9" align="right">
              {(caseOwner || isAdmin || isCoordinator) && (
                <button class="btn btn-sm btn-danger" onClick={assignToPool}>
                  <i class="ace-icon fa fa-exchange" />
                  Assign To Group Pool
                </button>
              )}
            </div>
            <div class="space-20" />
            <div class="col-xs-12">
              <table
                id="simple-table"
                class="table  table-bordered table-hover"
              >
                <thead>
                  <tr>
                    <th width="5%">
                      <div align="center">#</div>
                    </th>
                    <th>Fullname</th>
                    <th>Email</th>
                    <th>Position</th>
                    <th>
                      <div align="center">Group</div>
                    </th>
                    <th width="10%">
                      <div align="center">
                        <i class="ace-icon fa fa-cog" />
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {groupMember.length === 0 ? (
                    <tr>
                      <td colSpan="4">
                        <span style={{ color: "red" }}>
                          Selection NOT Allowed. Please select Group/Stakeholder
                        </span>
                      </td>
                    </tr>
                  ) : (
                    stakeholderGroup &&
                    groupMember.map((data, i) => {
                      i += 1;
                      return (
                        <tr>
                          <td>
                            <div align="center">{i}</div>
                          </td>
                          <td>{data.FULLNAME}</td>
                          <td>{data.EMAIL}</td>
                          <td>
                            {data.POSITION_NAME === "Admin" ? (
                              <span class="label label-warning arrowed-right">
                                {data.POSITION_NAME}
                              </span>
                            ) : (
                              data.POSITION_NAME
                            )}
                          </td>
                          <td>
                            <div align="center">{data.STAKEHOLDER_NAME}</div>
                          </td>
                          <td>
                            <div align="center">
                              {(data.POSITION_NAME === "Admin" ||
                                data.POSITION_NAME === "Coordinator") &&
                                caseOwner !== data.FULLNAME && (
                                  <button
                                    class="btn btn-minier btn-yellow"
                                    onClick={assignCaseToAgent(data.H_ID, data.SH_ID)}
                                  >
                                    Assign
                                  </button>
                                )}
                              {caseOwner === data.FULLNAME && (
                                <span class="badge badge-info">Owner</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            {/* <!-- /.span --> */}
          </div>
        </>
      }
    />
  );
}

export default AssignToOther;
