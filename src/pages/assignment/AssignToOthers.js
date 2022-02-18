import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import Footer from "../Footer";
import CaseDetailService from "../../web_service/case_detail_service/CaseDetailService";
import ManageUserService from "../../web_service/manage_user_service/ManageUserService";

function AssignToOther(props) {
  const caseToken = useState(props.match.params.id);
  const lovData = useState(JSON.parse(sessionStorage.getItem("LovData")));
  const token = useState(JSON.parse(sessionStorage.getItem("userToken")));
  const userData = useState(JSON.parse(sessionStorage.getItem("UserData")));
  const [caseDetailData, setCaseDetailData] = useState({});
  const [groupMember, setGroupMember] = useState([]);
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [badge, setBadge] = useState("");
  const [caseOwner, setCaseOwner] = useState({});
  const [isCoordinator, setIsCoordinator] = useState([]);
  const [isAdmin, setIsAdmin] = useState([]);
  const [stakeholderGroup, setStakeHolderGroup] = useState("0");

  useEffect(() => {
    const getGroupResult = () => {
      ManageUserService.getProfileByGroup(token, userData.shID).then((res) => {
        // console.log(res);
        setGroupMember(res);
        setIsCoordinator(
          res.filter((filter) => filter.positionName === "Coordinator")
        );
        setIsAdmin(res.filter((filter) => filter.positionName === "Admin"));
      });
    };

    const getCaseDetail = () => {
      CaseDetailService.getCaseDetail(token, caseToken).then((res) => {
        // console.log(res)
        setCaseDetailData(res);
        setCaseOwner(res.ownerName);
      });
    };

    getGroupResult();
    getCaseDetail();
  }, []);

  const assignCaseToAgent = (e) => {
    e.preventDefault();
    const hID = groupMember.map((data) => data.hID);
    const shID = groupMember.map((data) => data.shID);

    CaseDetailService.assignToAgent(token, caseToken, hID, shID).then((res) => {
      // console.log(res)
      if (res.response === "FAILED") {
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

  const assignToPool = (e) => {
    e.preventDefault();
    CaseDetailService.transferOwnership(token, caseToken, userData.shID).then(
      (res) => {
        // console.log(res);
        if (res.response === "FAILED") {
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
        <div>
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
                  onChange={(e) => setStakeHolderGroup(e.target.value)}
                >
                  <option value="0">All Group/Stakeholder ...</option>
                  {lovData
                    .filter(
                      (filter) =>
                        filter.lovGroup === "STAKEHOLDER" &&
                        filter.lovName !== "ADMIN"
                    )
                    .map((data) => {
                      return (
                        <option key={data.lovID} value={data.lovID}>
                          {data.lovName}
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
                  {groupMember.length === 1 ? (
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
                          <td>{data.fullName}</td>
                          <td>{data.email}</td>
                          <td>
                            {data.positionName === "Admin" ? (
                              <span class="label label-warning arrowed-right">
                                {data.positionName}
                              </span>
                            ) : (
                              data.positionName
                            )}
                          </td>
                          <td>
                            <div align="center">{data.stakeholderName}</div>
                          </td>
                          <td>
                            <div align="center">
                              {(data.positionName === "Admin" ||
                                data.positionName === "Coordinator") &&
                                caseOwner !== data.fullName && (
                                  <button
                                    class="btn btn-minier btn-yellow"
                                    onClick={assignCaseToAgent}
                                  >
                                    Assign
                                  </button>
                                )}
                              {caseOwner === data.fullName && (
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
        </div>
      }
    />
  );
}

export default AssignToOther;
