create or replace function ACTIVATE_ACCOUNT(email varchar(50), activationKey varchar(6)) returns int(4)
begin
    -- missing source code
    return NULL;
end
;

create or replace procedure Activate_Account(IN iEmail varchar(50), IN activationKey varchar(6), OUT rowCount int)
begin
    -- missing source code
end
;

create or replace procedure Bulk_Registration()
begin
    -- missing source code
end
;

create or replace function CASE_ASSIGNMENT(cToken varchar(32), hID int, hIDsupport int, shID int(4),
                                           assignmentType varchar(10)) returns int
begin
    -- missing source code
    return NULL;
end
;

create or replace function CREATE_FROM_APP(hID int, caseNum varchar(12), caseContent text, customerName varchar(150),
                                           nricNum varchar(50), mobileNum varchar(15), areaLocationID int(7),
                                           flag varchar(15), sourceID int(4)) returns varchar(32)
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function CREATE_FROM_PORTAL(hID int, caseContent text, customerName varchar(150), nricNum varchar(50),
                                              mobileNum varchar(15), areaLocationID int(7), flag varchar(15),
                                              sourceID int(7), subSourceID int(7), caseTypeID int(7),
                                              stakeholderRef varchar(10), extSysRef varchar(50)) returns varchar(32)
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function CREATE_NEW_CASE(hID int, caseNum varchar(12), caseContent text, customerName varchar(150),
                                           nricNum varchar(50), mobileNum varchar(15),
                                           areaLocation int(7)) returns varchar(32)
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function CREATE_UUID() returns varchar(40)
begin
    -- missing source code
    return NULL;
end
;

create or replace procedure Case_Assignment(IN cToken varchar(32), IN hID int, IN hIDsupport int, IN shID int(4),
                                            IN assignmentType varchar(10), OUT oRowCount int(4))
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Create_From_App(IN pCustomerName varchar(150), IN pNricNum varchar(150),
                                            IN pMobileNum varchar(150), IN pCaseContent text, IN pHID int,
                                            IN pCaseNum varchar(40), IN areaLocationID int(7), IN iFlag varchar(15),
                                            IN sourceID int(7), OUT oCToken varchar(32))
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Create_From_Portal(IN pCustomerName varchar(150), IN pNricNum varchar(150),
                                               IN pMobileNum varchar(150), IN pCaseContent text, IN pHID int(7),
                                               IN areaLocationID int(7), IN iFlag varchar(15), IN sourceID int(7),
                                               IN subSourceID int(7), IN caseTypeID int(7),
                                               IN stakeholderRef varchar(10), IN extSysRef varchar(50),
                                               OUT oCToken varchar(32))
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Create_New_Case(IN pCustomerName varchar(150), IN pNricNum varchar(150),
                                            IN pMobileNum varchar(150), IN pCaseContent text, IN pHID int,
                                            IN pCaseNum varchar(40), IN areaLocation int(7), OUT oCToken varchar(32))
    modifies sql data
begin
    -- missing source code
end
;

create or replace function DELETE_ACTION_REMARK(hID int, cToken varchar(32), aID int) returns int(4)
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace procedure Delete_Action_Remark(IN hID int, IN cToken varchar(32), IN aID int, OUT oRowCount int(4))
    modifies sql data
begin
    -- missing source code
end
;

create or replace function GENERATE_CASE_NUM() returns int
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function GET_AGING(date1 datetime, date2 datetime) returns varchar(10)
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function GET_AGING_WEEKDAYS(date1 datetime, date2 datetime) returns int
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function GET_AUTHENTICATION_TOKEN(apiKey varchar(40), email varchar(50)) returns varchar(40)
begin
    -- missing source code
    return NULL;
end
;

create or replace function GET_LATEST_NOTIFICATION(hID int) returns varchar(250)
begin
    -- missing source code
    return NULL;
end
;

create or replace function GET_NOTIFICATION_TEMPLATE(caseNum varchar(32), caseStatus varchar(12),
                                                     controller varchar(15), message varchar(250)) returns varchar(250)
begin
    -- missing source code
    return NULL;
end
;

create or replace function GET_TELEGRAM_MESSAGE(caseNum varchar(32), loggerFull varchar(250), stateName varchar(100),
                                                iDate varchar(30), gChat varchar(20)) returns varchar(500)
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function GET_TOTAL_CASE_RESOLVED_PERFORMANCE(hID int, category varchar(10), startDate varchar(10),
                                                               endDate varchar(10)) returns int(4)
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function GET_TOTAL_RESOLVED_BY_AGENT(oID int, days int(2)) returns int(4)
begin
    -- missing source code
    return NULL;
end
;

create or replace function GET_TOTAL_RESOLVED_BY_GROUP(shID int, days int(2)) returns int(4)
begin
    -- missing source code
    return NULL;
end
;

create or replace function GET_VOC_RESULT(hID int, category varchar(10), startDate varchar(10),
                                          endDate varchar(10)) returns varchar(15)
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace procedure Generate_Case_Num(OUT caseNum varchar(10))
begin
    -- missing source code
end
;

create or replace procedure Get_Action_Remark(IN oID int, IN cToken varchar(32))
begin
    -- missing source code
end
;

create or replace procedure Get_All_Case(IN hID int, IN caseStatus int(4))
begin
    -- missing source code
end
;

create or replace procedure Get_All_Case_By_Collaborator(IN hID int, IN caseStatus int(4))
begin
    -- missing source code
end
;

create or replace procedure Get_All_Case_By_Logger(IN hID int)
begin
    -- missing source code
end
;

create or replace procedure Get_All_Case_By_LoginID(IN hID int, IN loginID varchar(40))
begin
    -- missing source code
end
;

create or replace procedure Get_All_Case_By_Owner(IN oID int, IN caseStatus int(4))
begin
    -- missing source code
end
;

create or replace procedure Get_All_Case_By_Search(IN nricNum varchar(20), IN fullname varchar(150),
                                                   IN email varchar(50), IN srNum varchar(15), IN ttNum varchar(15),
                                                   IN caseNum varchar(12), IN vipName varchar(150),
                                                   IN customerName varchar(150), IN startDate varchar(10),
                                                   IN endDate varchar(10), IN caseTypeID int(7),
                                                   IN heroGroup varchar(10))
begin
    -- missing source code
end
;

create or replace procedure Get_All_Case_By_Stakeholder(IN hID int, IN shID int(4), IN caseType int(4),
                                                        IN caseStatus int(4))
begin
    -- missing source code
end
;

create or replace procedure Get_All_Notification_Msg(IN hID int)
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Get_All_Staff_Profile(IN hID int, IN keywords varchar(100))
begin
    -- missing source code
end
;

create or replace procedure Get_All_Unassigned_Case(IN hID int, IN shID int(4))
begin
    -- missing source code
end
;

create or replace procedure Get_All_User_Profile(IN hID int, IN shID int(7), IN iCategory varchar(11),
                                                 IN activationStatus varchar(150))
begin
    -- missing source code
end
;

create or replace procedure Get_Announcement_Text(IN iController varchar(20), IN iTemplate varchar(30))
begin
    -- missing source code
end
;

create or replace procedure Get_Authentication_Token(IN apiKey varchar(40), IN iEmail varchar(50),
                                                     OUT oToken varchar(40))
begin
    -- missing source code
end
;

create or replace procedure Get_Blob_Content(IN bID int)
begin
    -- missing source code
end
;

create or replace procedure Get_Case_Assignment_Log(IN cToken varchar(32))
begin
    -- missing source code
end
;

create or replace procedure Get_Case_Flag(IN cToken varchar(32))
begin
    -- missing source code
end
;

create or replace procedure Get_Case_Num(IN cToken varchar(32))
begin
    -- missing source code
end
;

create or replace procedure Get_Cases_By_Keywords(IN keywords varchar(100))
begin
    -- missing source code
end
;

create or replace procedure Get_Detail_Case_By_ID(IN cToken varchar(32))
begin
    -- missing source code
end
;

create or replace procedure Get_Herobuddy_Info(IN cToken varchar(32))
begin
    -- missing source code
end
;

create or replace procedure Get_Latest_Notification(IN hID int, OUT rMessage varchar(250))
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Get_Latest_Version(IN appID int(7))
begin
    -- missing source code
end
;

create or replace procedure Get_Profiles_By_Keywords(IN hID int, IN keywords varchar(100))
begin
    -- missing source code
end
;

create or replace procedure Get_Registered_User()
begin
    -- missing source code
end
;

create or replace procedure Get_Report_On_Demand(IN beginDate varchar(10), IN endDate varchar(10))
begin
    -- missing source code
end
;

create or replace procedure Get_Staff_ID_By_Email(IN iEmail varchar(50))
begin
    -- missing source code
end
;

create or replace procedure Get_System_LoV(IN hID int)
begin
    -- missing source code
end
;

create or replace procedure Get_System_LoV_N()
begin
    -- missing source code
end
;

create or replace procedure Get_Telegram_Alert(IN hID int)
begin
    -- missing source code
end
;

create or replace procedure Get_Telegram_Message(IN caseNum varchar(32), IN loggerFull varchar(250),
                                                 IN stateName varchar(100), IN iDate varchar(30), IN gChat varchar(20),
                                                 OUT oMessage varchar(500))
begin
    -- missing source code
end
;

create or replace procedure Get_Telegram_Message_By_ID(IN cToken varchar(32))
begin
    -- missing source code
end
;

create or replace procedure Get_Topten_Hero_By_State()
begin
    -- missing source code
end
;

create or replace procedure Get_Total_Case_By_Hero(IN beginDate varchar(10), IN endDate varchar(10))
begin
    -- missing source code
end
;

create or replace procedure Get_Total_Case_By_Hero_By_State(IN state varchar(30), IN beginDate varchar(10),
                                                            IN endDate varchar(10))
begin
    -- missing source code
end
;

create or replace procedure Get_Total_Case_By_Owner(IN oID int, IN caseStatusID int)
begin
    -- missing source code
end
;

create or replace procedure Get_Total_Case_By_Stakeholder(IN hID int, IN shID int(4))
begin
    -- missing source code
end
;

create or replace procedure Get_Total_Case_By_State(IN startDate varchar(20), IN endDate varchar(20),
                                                    IN category varchar(10))
begin
    -- missing source code
end
;

create or replace procedure Get_Total_Case_Resolved_Agent_Performance(IN oID int, IN startDate varchar(10),
                                                                      IN endDate varchar(10), OUT total int(4))
begin
    -- missing source code
end
;

create or replace procedure Get_Total_Case_Resolved_Group_Performance(IN shID int, IN startDate varchar(10),
                                                                      IN endDate varchar(10), OUT total int(4))
begin
    -- missing source code
end
;

create or replace procedure Get_Total_Hero_By_State(IN startDate varchar(20), IN endDate varchar(20))
begin
    -- missing source code
end
;

create or replace procedure Get_Total_New_Alert(IN hID int, IN cToken varchar(32))
begin
    -- missing source code
end
;

create or replace procedure Get_Total_Registered_HERO(IN beginDate varchar(10), IN endDate varchar(10), OUT total int(7))
begin
    -- missing source code
end
;

create or replace procedure Get_Total_Resolved_By_Agent(IN oID int, IN days int(2), OUT oTotal int(4))
begin
    -- missing source code
end
;

create or replace procedure Get_Total_Resolved_By_Group(IN shID int, IN days int(2), OUT oTotal int(4))
begin
    -- missing source code
end
;

create or replace procedure Get_Total_Resolved_Nationwide(IN days int(2), OUT oTotal int(4))
begin
    -- missing source code
end
;

create or replace procedure Get_Total_Unread_Message(IN hID int)
begin
    -- missing source code
end
;

create or replace procedure Get_User_Profile_By_Email(IN iEmail varchar(50))
begin
    -- missing source code
end
;

create or replace procedure Get_User_Profile_By_ID(IN hID int)
begin
    -- missing source code
end
;

create or replace procedure Get_User_Statistic_Info(IN hID int)
begin
    -- missing source code
end
;

create or replace procedure Get_VOC_Result(IN hID int, IN category varchar(10), IN startDate varchar(10),
                                           IN endDate varchar(10), OUT result varchar(15))
begin
    -- missing source code
end
;

create or replace function INSERT_AVATAR_PICTURE(hID int, fileName blob) returns int
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function INSERT_CASE_PICTURE(cToken varchar(32), fileName blob, longitude varchar(20),
                                               latitude varchar(20)) returns varchar(12)
begin
    -- missing source code
    return NULL;
end
;

create or replace function INVITE_TO_GCHAT(cToken varchar(32), hToken varchar(32), oID int) returns int
begin
    -- missing source code
    return NULL;
end
;

create or replace function IS_EMAIL_VALID(email varchar(50)) returns int(1)
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function IS_GCHAT_MEMBER(hID int, cToken varchar(32)) returns tinyint(1)
begin
    -- missing source code
    return NULL;
end
;

create or replace function IS_LOGGER_VIP(hID int) returns varchar(500)
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function IS_LOGGER_VIP1(hID int) returns varchar(500)
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function IS_REQUESTOR_ADMIN(hID int) returns tinyint(1)
begin
    -- missing source code
    return NULL;
end
;

create or replace function IS_REQUESTOR_INTERNAL(email varchar(50)) returns int
begin
    -- missing source code
    return NULL;
end
;

create or replace function IS_REQUESTOR_LOGGER(hID int, cToken varchar(32)) returns tinyint(1)
begin
    -- missing source code
    return NULL;
end
;

create or replace function IS_REQUESTOR_OWNER(hID int, cToken varchar(32)) returns tinyint(1)
begin
    -- missing source code
    return NULL;
end
;

create or replace function IS_REQUESTOR_STAKEHOLDER(hID int) returns tinyint(1)
begin
    -- missing source code
    return NULL;
end
;

create or replace function IS_STAKEHOLDER_ADMIN(hID int, shID int(4)) returns tinyint(1)
begin
    -- missing source code
    return NULL;
end
;

create or replace function IS_STAKEHOLDER_COORDINATOR(hID int, shID int(4)) returns tinyint(1)
begin
    -- missing source code
    return NULL;
end
;

create or replace function IS_STAKEHOLDER_MEMBER(hToken varchar(32), hID int, shID int(4)) returns tinyint(1)
begin
    -- missing source code
    return NULL;
end
;

create or replace procedure Insert_Avatar_Picture(IN hID int, IN fileName blob, OUT bID int)
begin
    -- missing source code
end
;

create or replace procedure Insert_Case_Picture(IN cToken varchar(32), IN fileName blob, IN longitude varchar(20),
                                                IN latitude varchar(20), OUT oCaseNum varchar(12))
begin
    -- missing source code
end
;

create or replace procedure Insert_Notification_Log(IN cID int)
begin
    -- missing source code
end
;

create or replace procedure Invite_To_GChat(IN cToken varchar(32), IN hToken varchar(32), IN oID int, OUT oGCID int)
begin
    -- missing source code
end
;

create or replace procedure Is_GChat_Member(IN hID int, IN cToken varchar(32), OUT isGChatMember tinyint(1))
begin
    -- missing source code
end
;

create or replace procedure Is_Logger_VIP(IN hID int, OUT oLogger varchar(500))
begin
    -- missing source code
end
;

create or replace procedure Is_Logger_VIP1(IN hID int, OUT oLogger varchar(500))
begin
    -- missing source code
end
;

create or replace procedure Is_Logger_VIP_New(IN hID int, OUT oLogger varchar(500))
begin
    -- missing source code
end
;

create or replace procedure Is_Requestor_Admin(IN hID int, OUT isAdmin tinyint(1))
begin
    -- missing source code
end
;

create or replace procedure Is_Requestor_Internal(IN iEmail varchar(50), OUT oHID int)
begin
    -- missing source code
end
;

create or replace procedure Is_Requestor_Logger(IN hID int, IN cToken varchar(32), OUT isLogger tinyint(1))
begin
    -- missing source code
end
;

create or replace procedure Is_Requestor_Owner(IN oID int, IN cToken varchar(32), OUT isOwner tinyint(1))
begin
    -- missing source code
end
;

create or replace procedure Is_Requestor_Stakeholder(IN hID int, OUT isStakeholder tinyint(1))
begin
    -- missing source code
end
;

create or replace procedure Is_Stakeholder_Admin(IN hID int, IN shID int(4), OUT isStakeholderAdmin tinyint(1))
begin
    -- missing source code
end
;

create or replace procedure Is_Stakeholder_Coordinator(IN hID int, IN shID int(4), OUT isStakeholderCoordinator tinyint(1))
begin
    -- missing source code
end
;

create or replace procedure Is_Stakeholder_Member(IN hToken varchar(32), IN hID int, IN shID int(4),
                                                  OUT isStakeholderMember tinyint(1))
begin
    -- missing source code
end
;

create or replace function PUSH_CHAT_MESSAGE(cToken varchar(32), hID int, message text, flag varchar(2),
                                             filename blob) returns int
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace procedure Pull_Chat_Message(IN cToken varchar(32), IN hID int, IN iflag varchar(2))
begin
    -- missing source code
end
;

create or replace procedure Push_Chat_Message(IN cToken varchar(32), IN hID int, IN message text, IN flag varchar(2),
                                              IN filename blob, OUT oMBID int)
begin
    -- missing source code
end
;

create or replace function RATE_AGENT(hID int, cToken varchar(32), rating int(1), remark text) returns int(4)
begin
    -- missing source code
    return NULL;
end
;

create or replace function REDEFINED_FLAG(caseContent text) returns varchar(15)
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function REMOVE_FROM_GCHAT(cToken varchar(32), hToken varchar(32), oID int) returns int(4)
begin
    -- missing source code
    return NULL;
end
;

create or replace function REOPEN_CASE(cToken varchar(32), oID int) returns int(4)
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function RESEND_ACTIVATION_CODE(email varchar(50)) returns varchar(6)
begin
    -- missing source code
    return NULL;
end
;

create or replace function RESEND_RESET_PASSWORD_CODE(email varchar(50)) returns varchar(6)
begin
    -- missing source code
    return NULL;
end
;

create or replace function RESET_PASSWORD(resetKey varchar(6), email varchar(50), password varchar(32)) returns int(4)
begin
    -- missing source code
    return NULL;
end
;

create or replace function RESET_PASSWORD_REQUEST(email varchar(50), resetKey varchar(6)) returns int
begin
    -- missing source code
    return NULL;
end
;

create or replace function RPA_CASE_ASSIGNMENT(iFlag varchar(15), areaLocationID int(7), caseContent text) returns int(7)
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace procedure RPA_Case_Assignment(IN iFlag varchar(15), IN areaLocationID int(7), IN caseContent text,
                                                OUT oID int)
begin
    -- missing source code
end
;

create or replace function RUN_RPA(hID int, oID int, areaLocationID int, caseContent text) returns int(7)
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function RUN_RPA_FEB(hID int, oID int, areaLocationID int, caseContent text) returns int(7)
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace procedure Rate_Agent(IN hID int, IN cToken varchar(32), IN iRating int(1), IN remark text,
                                       OUT oRowCount int(4))
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Remove_From_GChat(IN cToken varchar(32), IN hToken varchar(32), IN oID int,
                                              OUT rowCount int)
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Reopen_Case(IN cToken varchar(32), IN oID int, OUT rowCount int)
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Reporting_Raw_Data()
begin
    -- missing source code
end
;

create or replace procedure Resend_Activation_Code(IN iEmail varchar(50), OUT oCode varchar(6))
begin
    -- missing source code
end
;

create or replace procedure Resend_Reset_Password_Code(IN iEmail varchar(50), OUT oCode varchar(6))
begin
    -- missing source code
end
;

create or replace procedure Reset_Password(IN resetKey varchar(6), IN iEmail varchar(50), IN iPassword varchar(32),
                                           OUT oRowCount int)
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Reset_Password_Request(IN iEmail varchar(50), IN resetKey varchar(6), OUT oPID int)
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Run_Cleanup_Job(OUT totalRow int)
begin
    -- missing source code
end
;

create or replace function SET_ANNOUNCEMENT_TEXT(hID int, template varchar(30), message text, title varchar(200),
                                                 subtitle varchar(200), publishedDate varchar(10),
                                                 picture blob) returns int
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function SET_API_LOGGING(apiKey varchar(40), email varchar(50), logType varchar(10),
                                           content text) returns int
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function SET_INFOBLAST_LOG(iTo varchar(12), iMessage varchar(500), iDesc varchar(100),
                                             cToken varchar(32)) returns int(7)
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function SET_LATEST_VERSION(appID int, appName varchar(45), appVersion varchar(10),
                                              appDesc varchar(250), appExpired int) returns int
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function SET_LDAP_PROFILE(apiKey varchar(40), staffID varchar(10), fullName varchar(100),
                                            email varchar(50), nricNum varchar(15), mobileNum varchar(15),
                                            managerLevel varchar(5), designation varchar(50), unit varchar(70),
                                            division varchar(70), costCenter varchar(10)) returns int(4)
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function SET_LOGIN_HISTORY(email varchar(150), phoneDesc varchar(255)) returns int(7)
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function SET_LOG_HISTORY(email varchar(50), fullName varchar(150), authType varchar(10),
                                           logType varchar(3)) returns int
begin
    -- missing source code
    return NULL;
end
;

create or replace function SET_NEW_LOV(lovName varchar(150), lovLabel varchar(150), lovGroup varchar(30), parentID int,
                                       lovFlag varchar(10)) returns int
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function SIGN_IN(iEmail varchar(50), iPassword varchar(32)) returns int
begin
    -- missing source code
    return NULL;
end
;

create or replace function SIGN_OUT(iEmail varchar(50)) returns int
begin
    -- missing source code
    return NULL;
end
;

create or replace function SIGN_UP(apiKey varchar(40), fullName varchar(150), email varchar(50), password varchar(35),
                                   activationKey varchar(6), mobileNum varchar(12)) returns int
begin
    -- missing source code
    return NULL;
end
;

create or replace function SUBMIT_NEW_CASE(hID int, caseNum varchar(12), caseContent text, customerName varchar(150),
                                           mobileNum varchar(15), areaLocationID int(7), flag varchar(15),
                                           sourceID int(4), caseTypeID int(7), productID int(7), segmentCode varchar(5),
                                           additionalRemark text, herobuddyResponse text) returns varchar(32)
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace procedure Set_Announcement_Text(IN hID int, IN template varchar(30), IN message text,
                                                  IN title varchar(200), IN subtitle varchar(200),
                                                  IN publishedDate varchar(10), IN picture blob, OUT ntID int)
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Set_Api_Logging(IN apiKey varchar(40), IN email varchar(50), IN logType varchar(10),
                                            IN content text, OUT logID int)
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Set_Infoblast_Log(IN iTo varchar(12), IN iMessage varchar(500), IN iDesc varchar(100),
                                              IN cToken varchar(32), OUT lastInsertedID int(7))
begin
    -- missing source code
end
;

create or replace procedure Set_LDAP_Profile(IN apiKey varchar(40), IN staffID varchar(10), IN fullName varchar(100),
                                             IN email varchar(50), IN nricNum varchar(15), IN mobileNum varchar(30),
                                             IN managerLevel varchar(5), IN designation varchar(50),
                                             IN unit varchar(70), IN division varchar(70), IN costCenter varchar(10),
                                             OUT oID int)
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Set_Latest_Version(IN appID int, IN appName varchar(45), IN appVersion varchar(10),
                                               IN appDesc varchar(250), IN appExpired int, OUT vID int(7))
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Set_Log_History(IN iEmail varchar(50), IN iFullName varchar(150), IN authType varchar(10),
                                            IN logType varchar(3), OUT oLHID int)
begin
    -- missing source code
end
;

create or replace procedure Set_Login_History(IN iEmail varchar(150), IN phoneDesc varchar(255), OUT rowCount int(7))
begin
    -- missing source code
end
;

create or replace procedure Set_New_LoV(IN lovName varchar(150), IN lovLabel varchar(150), IN lovGroup varchar(30),
                                        IN parentID int(4), IN lovFlag varchar(10), OUT oLID int(7))
begin
    -- missing source code
end
;

create or replace procedure Set_Stakeholder_Admin(IN hID int, IN hToken varchar(32), IN shID int(2),
                                                  OUT oRowCount int(4))
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Set_Stakeholder_Coordinator(IN hID int, IN hToken varchar(32), IN shID int(2),
                                                        OUT oRowCount int(4))
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Set_Stakeholder_Member(IN hID int, IN hToken varchar(32), IN shID int(2),
                                                   OUT oRowCount int(4))
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Sign_In(IN iEmail varchar(50), IN iPassword varchar(32), OUT oLHID int)
begin
    -- missing source code
end
;

create or replace procedure Sign_Out(IN iEmail varchar(50), OUT oLHID int)
begin
    -- missing source code
end
;

create or replace procedure Sign_Up(IN apiKey varchar(40), IN fullName varchar(150), IN iEmail varchar(50),
                                    IN iPassword varchar(32), IN activationKey varchar(6), IN mobileNum varchar(12),
                                    OUT oHID int)
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Submit_New_Case(IN pCustomerName varchar(150), IN pMobileNum varchar(150),
                                            IN pCaseContent text, IN pHID int, IN pCaseNum varchar(40),
                                            IN areaLocationID int(7), IN iFlag varchar(15), IN sourceID int(7),
                                            IN caseTypeID int(7), IN productID int(7), IN segmentCode varchar(5),
                                            IN additionalRemark text, IN herobuddyResponse text,
                                            OUT oCToken varchar(32))
    modifies sql data
begin
    -- missing source code
end
;

create or replace function UPDATE_ACTION_REMARK(cToken varchar(32), oID int, closureTypeID int(4), caseStatusID int(4),
                                                remark text, filename blob) returns int(4)
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function UPDATE_AGENT_PROFILE(hID int, email varchar(50), fullName varchar(150), nricNum varchar(15),
                                                mobileNum varchar(12), nickName varchar(30), myStatus varchar(15),
                                                stateID int, divisionID int, zoneID int, teamID int) returns int(4)
begin
    -- missing source code
    return NULL;
end
;

create or replace function UPDATE_CASE_DETAIL(oID int, cToken varchar(32), caseTypeID int(4), productNameID int(4),
                                              packageName varchar(150), serviceAddress varchar(250), srNum varchar(15),
                                              ttNum varchar(15), serviceID varchar(15), areaLocationID int(7),
                                              actualCustomerName varchar(150), segmentID int(7), ckc varchar(1),
                                              ckcNum varchar(20), loginID varchar(30), stakeholderRef varchar(10),
                                              extSysRef varchar(50)) returns int(4)
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function UPDATE_CASE_INFO(oID int, cToken varchar(32), caseTypeID int(4), productNameID int(4),
                                            packageName varchar(150), serviceAddress varchar(250), srNum varchar(15),
                                            ttNum varchar(15), serviceID varchar(15),
                                            areaLocationID int(7)) returns int(4)
begin
    -- missing source code
    return NULL;
end
;

create or replace function UPDATE_CASE_STATUS(cToken varchar(32), oID int, closureTypeID int(4), caseStatusID int(4),
                                              remark text) returns int(4)
begin
    -- missing source code
    return NULL;
end
;

create or replace function UPDATE_STAKEHOLDER(hID int, hToken varchar(32), shID int(2), theAction varchar(15)) returns int(4)
begin
    -- missing source code
    return NULL;
end
;

create or replace function UPDATE_USER_PROFILE(hID int, email varchar(50), fullName varchar(150), nricNum varchar(15),
                                               mobileNum varchar(12), nickName varchar(30)) returns int(4)
begin
    -- missing source code
    return NULL;
end
;

create or replace procedure Unset_Stakeholder_Member(IN hID int, IN hToken varchar(32), IN shID int(2),
                                                     OUT oRowCount int(4))
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Update_Action_Remark(IN cToken varchar(32), IN oID int, IN closureTypeID int(4),
                                                 IN caseStatusID int(4), IN remark text, IN filename blob,
                                                 OUT oRowCount int(4))
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Update_Agent_Profile(IN hID int, IN iEmail varchar(50), IN fullName varchar(150),
                                                 IN nricNum varchar(15), IN mobileNum varchar(12),
                                                 IN nickName varchar(30), IN myStatus varchar(15), IN stateID int(7),
                                                 IN divisionID int(7), IN zoneID int(7), IN teamID int(7),
                                                 OUT rowCount int)
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Update_Case_Detail(IN oID int, IN cToken varchar(32), IN caseTypeID int(4),
                                               IN productNameID int(4), IN packageName varchar(150),
                                               IN serviceAddress varchar(250), IN srNum varchar(15),
                                               IN ttNum varchar(15), IN serviceID varchar(15), IN areaLocationID int(7),
                                               IN actualCustomerName varchar(150), IN segmentID int(7),
                                               IN ckc varchar(1), IN ckcNum varchar(20), IN loginID varchar(30),
                                               IN stakeholderRef varchar(10), IN extSysRef varchar(50),
                                               OUT rowCount int)
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Update_Case_Info(IN oID int, IN cToken varchar(32), IN caseTypeID int(4),
                                             IN productNameID int(4), IN packageName varchar(150),
                                             IN serviceAddress varchar(250), IN srNum varchar(15), IN ttNum varchar(15),
                                             IN serviceID varchar(15), IN areaLocationID int(7), OUT rowCount int)
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Update_Case_Status(IN cToken varchar(32), IN oID int, IN closureTypeID int(4),
                                               IN caseStatusID int(4), IN remark text, OUT oRowCount int(4))
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Update_Total_Score(IN hID int)
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Update_User_Profile(IN hID int, IN iEmail varchar(50), IN fullName varchar(150),
                                                IN nricNum varchar(15), IN mobileNum varchar(12),
                                                IN nickName varchar(30), OUT rowCount int)
    modifies sql data
begin
    -- missing source code
end
;

create or replace function VALIDATE_ACCOUNT(apiKey varchar(40), eventName varchar(20), email varchar(50),
                                            ldapEmail varchar(50)) returns int(4)
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace function VALIDATE_TOKEN(authToken varchar(40)) returns int
begin
    -- missing source code
    return NULL;
end
;

create or replace procedure Validate_Account(IN apiKey varchar(40), IN eventName varchar(20), IN iEmail varchar(50),
                                             IN ldapEmail varchar(50), OUT oHID int)
    modifies sql data
begin
    -- missing source code
end
;

create or replace procedure Validate_Token(IN authToken varchar(40), OUT oHID int)
    modifies sql data
begin
    -- missing source code
end
;

create or replace function WHO_IS_LOGGER(hID int) returns varchar(20)
    deterministic reads sql data
begin
    -- missing source code
    return NULL;
end
;

create or replace procedure Who_Is_Logger(IN hID int, OUT oFlag varchar(20))
begin
    -- missing source code
end
;

create or replace procedure run_HERO_REPOPRTING()
begin
    -- missing source code
end
;

create or replace procedure run_RPA(IN hID int, IN oID int, IN areaLocationID int(7), IN caseContent text,
                                    OUT oSHID int(7))
begin
    -- missing source code
end
;

create or replace procedure run_RPA_dev(IN hID int, IN oID int, IN areaLocationID int(7), IN caseContent text,
                                        OUT oSHID int(7))
begin
    -- missing source code
end
;

create or replace procedure run_RPA_feb(IN hID int, IN oID int, IN areaLocationID int(7), IN caseContent text,
                                        OUT oSHID int(7))
begin
    -- missing source code
end
;

create or replace procedure run_RPA_local(IN cID int, IN caseContent text)
begin
    -- missing source code
end
;

create or replace procedure run_RPA_orig(IN hID int, IN oID int, IN areaLocationID int(7), IN caseContent text,
                                         OUT oSHID int(7))
begin
    -- missing source code
end
;

create or replace procedure run_RPA_test(IN cID int, IN caseContent varchar(50))
begin
    -- missing source code
end
;

create or replace procedure test_dashboard(IN category varchar(10))
begin
    -- missing source code
end
;

