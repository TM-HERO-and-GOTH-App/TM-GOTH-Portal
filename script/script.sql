create or replace table TBL_ACTION_REMARK
(
    AR_ID       int auto_increment
        primary key,
    C_ID        int                                     not null,
    H_ID        int                                     not null,
    CT_ID       int(7)      default 0                   null comment 'CLOSURE_TYPE; REFER TO L_ID FROM TBL_LOV',
    B_ID        int                                     null comment 'REFER TO TBL_BLOB',
    REMARK_TYPE varchar(15) default 'NEW'               null comment 'NEW/ASSIGNED/IN-PROGRESS/CLOSED',
    REMARK      text                                    null,
    LOGGED_DATE datetime    default current_timestamp() null
)
    comment 'AUDIT TRAIL FOR ACTION REMARKS/UPDATES' charset = latin1;

create or replace index INDEXING
    on TBL_ACTION_REMARK (C_ID, H_ID, CT_ID, B_ID);

create or replace table TBL_ANNOUNCEMENT
(
    TBL_ANNOUNCEMENT int          not null
        primary key,
    TITLE            varchar(250) null,
    BODY             text         null,
    PICTURE          blob         null,
    G_ID             int          null,
    TAG              varchar(50)  null
);

create or replace index G_ID
    on TBL_ANNOUNCEMENT (G_ID);

create or replace index TAG
    on TBL_ANNOUNCEMENT (TAG);

create or replace table TBL_APP_VERSION
(
    V_ID        int(7) auto_increment
        primary key,
    APP_ID      int(4)                                null,
    APP_NAME    varchar(45)                           null,
    APP_VERSION varchar(10)                           null,
    APP_DESC    varchar(1000)                         null,
    APP_EXPIRED tinyint(1)                            null comment '0=FALSE;1=TRUE',
    APP_UPDATES timestamp default current_timestamp() null comment 'LOGGED DATE'
)
    charset = latin1;

create or replace index INDEXING
    on TBL_APP_VERSION (APP_ID, APP_EXPIRED, APP_VERSION);

create or replace table TBL_ASSIGNMENT_LOG
(
    AL_ID        int auto_increment
        primary key,
    C_ID         int                                  not null,
    H_ID         int                                  not null,
    H_ID_SUPPORT int                                  not null,
    SH_ID        int(7)   default 0                   null comment 'STAKEHOLDER_ID = L_ID IN TBL_LOV;  DEFAULT VAL = 0 IF TYPE != TRANSFER',
    AL_TYPE      varchar(10)                          null comment 'SELF/SUPPORT/TRANSFER',
    LOGGED_DATE  datetime default current_timestamp() null
)
    comment 'Log for every time case assignment occur' charset = latin1;

create or replace index INDEXING
    on TBL_ASSIGNMENT_LOG (C_ID, H_ID, H_ID_SUPPORT, SH_ID);

create or replace table TBL_AUTH_TOKEN
(
    T_ID           int auto_increment
        primary key,
    H_ID           int                                  null,
    AUTH_TOKEN     varchar(40)                          null comment 'EXACT 40 CHAR',
    REQUESTED_DATE datetime default current_timestamp() null,
    VALIDATED_DATE datetime                             null
)
    comment 'AUTHENTICATION TOKEN need to be called for each API. Token validity is 15 sec  ' charset = latin1;

create or replace index INDEXING
    on TBL_AUTH_TOKEN (H_ID, AUTH_TOKEN, REQUESTED_DATE);

create or replace table TBL_BLOB
(
    B_ID         int auto_increment
        primary key,
    PICTURE      blob                                 null,
    CREATED_DATE datetime default current_timestamp() null
)
    comment 'Store BLOB content. Will be referred from TBL_PICTURE & TBL_HERO_PROFILE' charset = latin1;

create or replace table TBL_CASE
(
    C_ID             int auto_increment
        primary key,
    H_ID             int                                  not null comment 'USER WHO LOGGED THE CASE',
    CASE_NUM         varchar(12)                          not null comment '12D = H-1710170012',
    CREATED_DATE     datetime default current_timestamp() not null,
    CLOSED_DATE      datetime                             null,
    OWNER_ID         int      default 0                   not null comment 'AGENT H_ID WHO RESPONSIBLE TO THE CASE',
    OWNER_ID_SUPPORT int      default 0                   null comment 'REQ SUPPORT : Support person is when there is specific personnel identified from the stakeholder’s team',
    C_TOKEN          varchar(32)                          null,
    constraint C_TOKEN_UNIQUE
        unique (C_TOKEN)
)
    comment 'To store Case detail' charset = latin1;

create or replace index CASE_INDEX
    on TBL_CASE (CASE_NUM, H_ID, OWNER_ID, OWNER_ID_SUPPORT, C_TOKEN);

create or replace definer = root@`%` trigger backup_tbl_case
    before delete
    on TBL_CASE
    for each row
begin
    -- missing source code
end;

create or replace definer = root@`%` trigger create_new_case
    before insert
    on TBL_CASE
    for each row
begin
    -- missing source code
end;

create or replace table TBL_CASE_DETAIL
(
    CD_ID           int auto_increment
        primary key,
    C_ID            int         default 0           not null comment 'CASE ID',
    SH_ID           int(7)      default 16          not null comment 'STAKEHOLDER_ID = L_ID IN TBL_LOV',
    CASE_TYPE       int(7)      default 0           null comment 'A.K.A AREA; FULFILLMENT/ASSURANCE/BILLING/etc; REFER TO L_ID IN TBL_LOV',
    PRODUCT_NAME    int(7)      default 0           null comment 'FIXED/MOBILE/etc ; REFER TO L_ID IN TBL_LOV',
    RATING          int(1)      default 0           null comment 'FROM 1 - 10',
    RATING_REMARK   text                            null,
    CASE_CONTENT    text                            not null comment 'DETAIL OF CASE/COMPLAINT',
    CASE_STATUS     int(7)      default 61          not null comment 'REFER TO L_ID IN TBL_LOV : NEW/ACKNOWLEDGE/IN-PROGRESS/CLOSED',
    PACKAGE_NAME    varchar(150)                    null,
    SERVICE_ID      varchar(15)                     null,
    LOGIN_ID        varchar(30)                     null,
    SERVICE_ADDRESS varchar(250)                    null,
    SR_NUM          varchar(15)                     null,
    TT_NUM          varchar(15)                     null,
    AREA_LOCATION   int(7)                          null comment 'REFER TO TBL_LOV',
    SEGMENT_ID      int(7)                          null comment 'REFER TO TBL_LOV (Consumer/SME/Enterprise/Government) ',
    SEGMENT_CODE    varchar(5)                      null,
    FLAG            varchar(15) default 'COMPLAINT' null,
    SOURCE_ID       int(7)                          null comment 'REFER TO TBL_LOV',
    SUB_SOURCE_ID   int(7)                          null comment 'REFER TO TBL_LOV',
    SMS_DESC        varchar(50)                     null,
    ELIGIBILITY     varchar(1)  default 'N'         null comment 'LOGGER''S ELIGIBILITY STATUS UPON CASE CREATION',
    CKC             varchar(1)  default 'N'         null,
    CKC_NUM         varchar(20)                     null,
    EXT_SYS_REF     varchar(50)                     null,
    STAKEHOLDER_REF varchar(20) default 'n/a'       null comment 'RRT,NMO,CSM,NOC',
    TEMP            varchar(20)                     null comment 'to store SH_ID as a backup before migration'
)
    comment 'Store the case details' charset = latin1;

create or replace index INDEXING
    on TBL_CASE_DETAIL (C_ID, SH_ID, CASE_TYPE, PRODUCT_NAME, CASE_STATUS, AREA_LOCATION, SERVICE_ID, SR_NUM, TT_NUM,
                        SEGMENT_ID, FLAG, SOURCE_ID, SUB_SOURCE_ID, SMS_DESC, STAKEHOLDER_REF);

create or replace definer = root@`%` trigger backup_tbl_case_detail
    before delete
    on TBL_CASE_DETAIL
    for each row
begin
    -- missing source code
end;

create or replace table TBL_CHAT
(
    CHAT_ID int auto_increment
        primary key,
    C_ID    int                    null,
    MESSAGE text                   null,
    SOURCE  varchar(11) default '' not null,
    HB_ID   int(7)                 null,
    G_ID    int(7)                 null,
    PICTURE blob                   null
);

create or replace index C_ID
    on TBL_CHAT (C_ID);

create or replace index G_ID
    on TBL_CHAT (G_ID);

create or replace index HB_ID
    on TBL_CHAT (HB_ID);

create or replace table TBL_CLEANUP_LOG
(
    CL_ID       int(7) auto_increment
        primary key,
    C_ID        int                                  null,
    LOGGED_DATE datetime default current_timestamp() null
)
    charset = latin1;

create or replace index C_ID
    on TBL_CLEANUP_LOG (C_ID);

create or replace table TBL_CUSTOMER_PROFILE
(
    CP_ID                int auto_increment
        primary key,
    C_ID                 int          not null,
    CUSTOMER_NAME        varchar(150) not null,
    ACTUAL_CUSTOMER_NAME varchar(150) null,
    NRIC_NUM             varchar(20)  null comment 'NRIC/PASSPORT-NUM/',
    MOBILE_NUM           varchar(15)  null
)
    comment 'Store Customer Details per Case' charset = latin1;

create or replace index INDEXING
    on TBL_CUSTOMER_PROFILE (C_ID, CUSTOMER_NAME, ACTUAL_CUSTOMER_NAME);

create or replace table TBL_GOTH_LOGGER
(
    G_ID              int auto_increment
        primary key,
    FULLNAME          varchar(150)                            not null,
    EMAIL             varchar(45)                             not null,
    LDAP_EMAIL        varchar(50)                             null,
    PASSWORD          varchar(35)                             not null,
    ACTIVATION_KEY    varchar(10)                             null,
    ACTIVATION_STATUS varchar(35) default 'N'                 null,
    VIP               varchar(3)                              not null,
    REGISTERED_DATE   datetime    default current_timestamp() not null,
    G_GROUP           varchar(5)  default 'USER'              null
);

create or replace index EMAIL
    on TBL_GOTH_LOGGER (EMAIL);

create or replace index FULLNAME
    on TBL_GOTH_LOGGER (FULLNAME);

create or replace index G_ID
    on TBL_GOTH_LOGGER (G_ID);

create or replace index LDAP_EMAIL
    on TBL_GOTH_LOGGER (LDAP_EMAIL);

create or replace index PASSWORD
    on TBL_GOTH_LOGGER (PASSWORD);

create or replace table TBL_GROUP_CHAT
(
    GC_ID       int auto_increment
        primary key,
    C_ID        int                                  not null,
    H_ID        int                                  not null,
    JOINED_DATE datetime default current_timestamp() null
)
    comment 'ONLY USERS IN THE SAME GROUP CAN PUSH/PULL CHAT-MESSAGE FOR THAT PARTICULAR CASE' charset = latin1;

create or replace index INDEXING
    on TBL_GROUP_CHAT (C_ID, H_ID);

create or replace table TBL_HERO
(
    H_ID              int auto_increment comment 'HERO_ID FOR SYS USED'
        primary key,
    FULLNAME          varchar(150)                                 not null,
    EMAIL             varchar(50)                                  not null comment 'AS USERNAME FOR LOGIN',
    LDAP_EMAIL        varchar(50)                                  null,
    PASSWORD          varchar(35) default 'EXTERNAL'               not null comment 'IN MD5 ENCRYPTED FORMAT',
    ACTIVATION_KEY    varchar(10)                                  null,
    ACTIVATION_STATUS varchar(1)  default 'N'                      null,
    REGISTERED_DATE   datetime    default current_timestamp()      not null,
    H_TOKEN           varchar(32) default 'MD5(CURRENT_TIMESTAMP)' null,
    H_GROUP           varchar(5)  default 'USER'                   null comment 'USER/ADMIN'
)
    comment 'To store Hero profiles' charset = latin1;

create or replace index INDEXING
    on TBL_HERO (EMAIL, H_TOKEN, H_GROUP, PASSWORD, FULLNAME, H_ID, LDAP_EMAIL);

create or replace definer = root@`%` trigger create_new_user
    before insert
    on TBL_HERO
    for each row
begin
    -- missing source code
end;

create or replace table TBL_HEROBUDDY_INFO
(
    HB_ID       int auto_increment
        primary key,
    C_ID        int                                  null,
    CONTENT     longtext                             null comment 'IN JSON FORMAT',
    REMARK      longtext                             null comment 'Additional Remark',
    LOGIN_ID    varchar(30)                          null,
    LOGGED_DATE datetime default current_timestamp() null
)
    charset = latin1;

create or replace index C_ID
    on TBL_HEROBUDDY_INFO (C_ID);

create or replace table TBL_INFOBLAST_LOG
(
    IB_ID       int auto_increment
        primary key,
    RECIPIENT   varchar(12)                          null,
    MESSAGE     varchar(500)                         null,
    LOGGED_DATE datetime default current_timestamp() null
)
    comment 'OUTGOING SMS HISTORY' charset = latin1;

create or replace index RECIPIENT
    on TBL_INFOBLAST_LOG (RECIPIENT);

create or replace table TBL_LDAP_PROFILE
(
    LP_ID       int auto_increment
        primary key,
    STAFF_ID    varchar(10)                          null,
    FULLNAME    varchar(50)                          null,
    EMAIL       varchar(45)                          null,
    NRIC        varchar(14)                          null,
    MOBILE_NUM  varchar(30)                          null,
    MANAGER_LVL varchar(5)                           null,
    DESIGNATION varchar(45)                          null,
    UNIT        varchar(80)                          null,
    DIVISION    varchar(80)                          null,
    COST_CENTRE varchar(7)                           null,
    LOGGED_DATE datetime default current_timestamp() null
)
    charset = latin1;

create or replace index EMAIL
    on TBL_LDAP_PROFILE (EMAIL);

create or replace index STAFF_ID
    on TBL_LDAP_PROFILE (STAFF_ID);

create or replace table TBL_LOGIN_HISTORY
(
    LH_ID       int auto_increment
        primary key,
    H_ID        int                                     null,
    EMAIL       varchar(150)                            not null,
    AUTH_TYPE   varchar(10) default 'HERO'              null comment 'HERO/FB/GOOGLE/LDAP',
    LOG_TYPE    varchar(3)  default 'IN'                null comment 'IN/OUT',
    PHONE_DESC  varchar(255)                            null,
    LOGGED_DATE datetime    default current_timestamp() not null
)
    charset = latin1;

create or replace index LOGIN_INDEX
    on TBL_LOGIN_HISTORY (EMAIL, H_ID, AUTH_TYPE, LOGGED_DATE, LH_ID);

create or replace table TBL_LOV
(
    L_ID      int(7) auto_increment
        primary key,
    L_NAME    varchar(150)              null,
    L_LABEL   varchar(150)              null comment 'Caption/Label Name',
    L_GROUP   varchar(30)               null comment 'STAKEHOLDER, CLOSURE TYPE, etc',
    PARENT_ID int(4)      default 0     null comment 'REFER TO L_ID',
    L_FLAG    varchar(10) default 'APP' null comment 'APP/GOTH'
)
    charset = latin1;

create or replace index INDEXING
    on TBL_LOV (PARENT_ID, L_NAME, L_GROUP);

create or replace table TBL_LOV_copy
(
    L_ID      int(7) auto_increment
        primary key,
    L_NAME    varchar(150)              null,
    L_LABEL   varchar(150)              null comment 'Caption/Label Name',
    L_GROUP   varchar(30)               null comment 'STAKEHOLDER, CLOSURE TYPE, etc',
    PARENT_ID int(4)      default 0     null comment 'REFER TO L_ID',
    L_FLAG    varchar(10) default 'APP' null comment 'APP/GOTH'
)
    charset = latin1;

create or replace index INDEXING
    on TBL_LOV_copy (PARENT_ID, L_NAME, L_GROUP);

create or replace table TBL_MESSAGE_BOX
(
    MB_ID       int auto_increment
        primary key,
    C_ID        int                                    not null comment 'REFER TO TBL_CASE_INFO',
    H_ID        int                                    not null comment 'REFER TO TBL_HERO_PROFILE',
    B_ID        int        default 0                   null comment 'REFER TO TBL_BLOB',
    MESSAGE     text                                   not null,
    FLAG        varchar(2) default 'FE'                null comment 'FE/BE',
    POSTED_DATE datetime   default current_timestamp() not null
)
    comment '2-WAY CHAT' charset = latin1;

create or replace index CHAT_INDEX
    on TBL_MESSAGE_BOX (C_ID, H_ID, FLAG, B_ID);

create or replace table TBL_NOTIFICATION
(
    N_ID         int auto_increment
        primary key,
    H_ID         int                                    not null,
    C_ID         int                                    null,
    MESSAGE      text                                   null,
    FLAG         varchar(5) default 'CHAT'              null comment 'CASE/CHAT',
    CREATED_DATE datetime   default current_timestamp() null
)
    comment 'AUTO NOTIFICATION - PUSH TO APP' charset = latin1;

create or replace index INDEXING
    on TBL_NOTIFICATION (H_ID, C_ID, FLAG);

create or replace definer = root@`%` trigger insert_notification_log
    after insert
    on TBL_NOTIFICATION
    for each row
begin
    -- missing source code
end;

create or replace table TBL_NOTIFICATION_LOG
(
    NL_ID  int auto_increment
        primary key,
    H_ID   int                  null,
    C_ID   int                  null,
    STATUS tinyint(1) default 0 null comment '1=READ'
)
    comment 'TO GET TOTAL_NEW_ALERT BY READ STATUS' charset = latin1;

create or replace index `INDEX`
    on TBL_NOTIFICATION_LOG (H_ID, C_ID, STATUS);

create or replace table TBL_NOTIFICATION_TEMPLATE
(
    NT_ID          int(4) auto_increment
        primary key,
    B_ID           int        default 0 null comment 'Template for Notification & Announcement',
    CONTROLLER     varchar(20)          null comment 'CASE, CHAT, etc',
    TEMPLATE       varchar(30)          null comment 'NEW, IN-PROGRESS, CANCELLED, CLOSED, etc',
    MESSAGE        varchar(1000)        null,
    TITLE          varchar(150)         null,
    SUBTITLE       varchar(150)         null,
    PUBLISHED_DATE date                 null,
    STATUS         tinyint(2) default 1 null comment '1=SHOW'
)
    comment 'PUSH NOTIFICATION MESSAGE TEMPLATE' charset = latin1;

create or replace index INDEXING
    on TBL_NOTIFICATION_TEMPLATE (CONTROLLER, TEMPLATE, B_ID);

create or replace table TBL_PASSWORD_RETRIEVAL
(
    PR_ID          int auto_increment
        primary key,
    EMAIL          varchar(50)                            not null,
    RESET_KEY      varchar(6)                             not null comment '6 DIGIT KEY FOR VERIFICATION',
    RESET_STATUS   varchar(1) default 'N'                 not null,
    REQUESTED_DATE datetime   default current_timestamp() not null
)
    charset = latin1;

create or replace index EMAIL
    on TBL_PASSWORD_RETRIEVAL (EMAIL);

create or replace table TBL_PICTURE
(
    P_ID        int auto_increment
        primary key,
    C_ID        int                                  not null,
    B_ID        int                                  not null,
    LONGITUDE   varchar(20)                          not null,
    LATITUDE    varchar(20)                          not null,
    LOGGED_DATE datetime default current_timestamp() not null
)
    charset = latin1;

create or replace index INDEXING
    on TBL_PICTURE (C_ID, B_ID);

create or replace table TBL_PUBLIC_HOLIDAY
(
    PH_ID       int(4) auto_increment
        primary key,
    EVENT_TITLE varchar(100) null,
    EVENT_DATE  date         null
)
    comment 'Public Holiday' charset = latin1;

create or replace index EVENT_DATE
    on TBL_PUBLIC_HOLIDAY (EVENT_DATE);

create or replace table TBL_RPA_KEYWORD
(
    RPA_ID  int unsigned auto_increment
        primary key,
    AREA    varchar(20) null,
    SUBAREA varchar(50) null,
    SYMPTOM varchar(50) null
)
    charset = latin1;

create or replace fulltext index SUBAREA
    on TBL_RPA_KEYWORD (SUBAREA, SYMPTOM);

create or replace table TBL_RPA_LOG
(
    RPA_L           int auto_increment
        primary key,
    C_ID            int                                  null,
    ORIG_TEXT       text                                 null,
    RPA_KEY_AREA    varchar(50)                          null,
    RPA_KEY_SUBAREA varchar(50)                          null,
    RPA_KEY_SYMPTOM varchar(50)                          null,
    LOGGED_DATE     datetime default current_timestamp() null
)
    comment 'MATCH KEYWORDS WILL BE STORED FOR REFF' charset = latin1;

create or replace index C_ID
    on TBL_RPA_LOG (C_ID);

create or replace table TBL_SCORE
(
    S_ID        int auto_increment
        primary key,
    H_ID        int                                     not null comment 'REFER TO HERO_PROFILE',
    C_ID        int                                     null comment 'INNER JOIN TBL_CASE; COUNT ONLY FOR CASE_STATUS != CANCELLED',
    SCORE       int(4)                                  not null,
    STATUS      varchar(10) default 'CREATED'           null comment 'CREATED/CLOSED',
    LOGGED_DATE datetime    default current_timestamp() not null
)
    comment 'Audit trail for each time User get score' charset = latin1;

create or replace index SCORE_INDEX
    on TBL_SCORE (H_ID, C_ID);

create or replace definer = root@`%` trigger update_total_score
    after insert
    on TBL_SCORE
    for each row
begin
    -- missing source code
end;

create or replace definer = root@`%` trigger update_total_score_if_cancelled
    after delete
    on TBL_SCORE
    for each row
begin
    -- missing source code
end;

create or replace table TBL_SDZ_STAFF
(
    SID           int(4) auto_increment
        primary key,
    STAFF_NAME    varchar(100) null,
    STAFF_ID      varchar(15)  null,
    MOBILE_NUMBER varchar(30)  null,
    EMAIL         varchar(50)  null
)
    charset = latin1;

create or replace index EMAIL
    on TBL_SDZ_STAFF (EMAIL);

create or replace table TBL_STAFF
(
    SID               int auto_increment
        primary key,
    PERSONNEL_NO      int(5)      null,
    STAFF_NAME        varchar(54) null,
    FLAG              varchar(4)  null,
    EMPSGROUP         varchar(17) null,
    EMPGROUP          varchar(19) null,
    DESIGNATION       varchar(40) null,
    STAFF_ID          varchar(10) null,
    STAFF_LOGIN_ID    varchar(10) null,
    CELL_NO           varchar(30) null,
    OFFICE_NO         varchar(30) null,
    EMAIL             varchar(50) null,
    STATE             varchar(15) null,
    COMPANY_DESC      varchar(25) null,
    LOB_DESC          varchar(16) null,
    COST_CENTR        varchar(7)  null,
    SUB_ORG_UNIT_DESC varchar(40) null,
    ORG_UNIT_DESC     varchar(40) null,
    EMPSTATS          int(1)      null,
    SUPERVISOR        int(5)      null
)
    comment 'Data as of 21Nov; Compulsory Field : PERSONNEL_NO,STAFF_NAME,DESIGNATION,EMAIL,STATE,FLAG,STAFF_ID'
    charset = utf8;

create or replace index EMAIL
    on TBL_STAFF (EMAIL);

create or replace index FLAG
    on TBL_STAFF (FLAG);

create or replace index STAFF_ID
    on TBL_STAFF (STAFF_ID);

create or replace index STATE
    on TBL_STAFF (STATE);

create or replace table TBL_STAFF_OLD
(
    SID                   int auto_increment
        primary key,
    PERSONNEL_NO          int(5)      null,
    STAFF_NAME            varchar(54) null,
    STATE                 varchar(15) null,
    EMPLOYEE_GROUP        varchar(19) null,
    EMPLOYEE_SUBGROUP     varchar(17) null,
    DESIGNATION           varchar(42) null,
    FLAG                  varchar(4)  null,
    STAFF_ID              varchar(8)  null,
    MOBILE_PHONE_NO       varchar(30) null,
    OFFICE_PHONE_NO       varchar(30) null,
    EMAIL                 varchar(60) null,
    COMPANY_CODE          varchar(25) null,
    LOB_DESC              varchar(16) null,
    COST_CENTRE           varchar(6)  null,
    UNIT                  varchar(40) null,
    DIVISION              varchar(40) null,
    EMPLOYEE_STATUS       int(1)      null,
    APPROVER_PERSONNEL_NO int(5)      null
)
    comment 'Data as of 15 Nov
Compulsory Field : PERSONNEL_NO,STAFF_NAME,EMAIL,STATE,DESIGNATION,FLAG,STAFF_ID
' charset = utf8;

create or replace index EMAIL
    on TBL_STAFF_OLD (EMAIL);

create or replace index FLAG
    on TBL_STAFF_OLD (FLAG);

create or replace index STAFF_ID
    on TBL_STAFF_OLD (STAFF_ID);

create or replace index STATE
    on TBL_STAFF_OLD (STATE);

create or replace table TBL_Save_Case
(
    name varchar(100) default '' not null,
    Id   int unsigned            not null
)
    charset = latin1;

create or replace table TBL_TELEGRAM_ALERT
(
    TA_ID       int auto_increment
        primary key,
    C_ID        int                                  not null,
    GCHAT       varchar(10)                          null comment 'VIP/SALES/BANJIR/etc',
    MESSAGE     varchar(500)                         null,
    LOGGED_DATE datetime default current_timestamp() null
)
    comment 'AUTO NOTIFICATION FROM SYSTEM TO TELEGRAM GCHAT' charset = latin1;

create or replace index C_ID
    on TBL_TELEGRAM_ALERT (C_ID);

create or replace index GCHAT
    on TBL_TELEGRAM_ALERT (GCHAT);

create or replace table TBL_TMCC_STAFF
(
    TMCC_ID       int(7) auto_increment
        primary key,
    TMCC_NAME     varchar(100)                           null,
    TMCC_IDM      varchar(10)                            null,
    TMCC_EMAIL    varchar(50)                            null,
    TMCC_PERNO    varchar(10)                            null,
    TMCC_ELIGIBLE varchar(1) default 'Y'                 null,
    TMCC_ACTIVE   varchar(1) default 'Y'                 null,
    TMCC_LOGGED   datetime   default current_timestamp() null
)
    comment 'FOR SALES TASKFORCE' charset = latin1;

create or replace index EMAIL
    on TBL_TMCC_STAFF (TMCC_EMAIL);

create or replace definer = root@`%` view VW_ACTION_REMARK as
select `T1`.`C_ID`        AS `C_ID`,
       `T1`.`CT_ID`       AS `CT_ID`,
       `T1`.`REMARK_TYPE` AS `REMARK_TYPE`,
       `T1`.`REMARK`      AS `REMARK`,
       `T1`.`LOGGED_DATE` AS `LOGGED_DATE`,
       `T2`.`CASE_NUM`    AS `CASE_NUM`,
       `T3`.`H_ID`        AS `H_ID`,
       `T3`.`FULLNAME`    AS `UPDATED_BY`,
       `T4`.`L_NAME`      AS `CLOSURE_TYPE`,
       `T5`.`PICTURE`     AS `FILENAME`
from ((((`emdev`.`TBL_ACTION_REMARK` `T1` join `emdev`.`TBL_CASE` `T2` on (`T2`.`C_ID` = `T1`.`C_ID`)) join `emdev`.`TBL_HERO` `T3` on (`T3`.`H_ID` = `T1`.`H_ID`)) left join `emdev`.`TBL_LOV` `T4` on (`T4`.`L_ID` = `T1`.`CT_ID`))
         left join `emdev`.`TBL_BLOB` `T5` on (`T5`.`B_ID` = `T1`.`B_ID`));

-- comment on column VW_ACTION_REMARK.CT_ID not supported: CLOSURE_TYPE; REFER TO L_ID FROM TBL_LOV

-- comment on column VW_ACTION_REMARK.REMARK_TYPE not supported: NEW/ASSIGNED/IN-PROGRESS/CLOSED

-- comment on column VW_ACTION_REMARK.CASE_NUM not supported: 12D = H-1710170012

-- comment on column VW_ACTION_REMARK.H_ID not supported: HERO_ID FOR SYS USED

create or replace definer = root@`%` view VW_ASSIGNMENT_LOG as
select `T2`.`CASE_NUM`     AS `CASE_NUM`,
       `T2`.`CREATED_DATE` AS `CREATED_DATE`,
       `T4`.`FULLNAME`     AS `ASSIGNED_BY`,
       `T4`.`EMAIL`        AS `EMAIL_ASSIGNED_BY`,
       `T9`.`L_NAME`       AS `GROUP_ASSIGNED_BY`,
       `T6`.`FULLNAME`     AS `ASSIGNED_TO`,
       `T6`.`EMAIL`        AS `EMAIL_ASSIGNED_TO`,
       `T8`.`L_NAME`       AS `GROUP_ASSIGNED_TO`,
       `T1`.`AL_TYPE`      AS `LOG_TYPE`,
       `T1`.`LOGGED_DATE`  AS `LOGGED_DATE`,
       `T3`.`L_NAME`       AS `STAKEHOLER_NAME`,
       `T1`.`C_ID`         AS `C_ID`,
       `T2`.`C_TOKEN`      AS `C_TOKEN`,
       `T1`.`H_ID`         AS `H_ID`,
       `T1`.`H_ID_SUPPORT` AS `H_ID_SUPPORT`,
       `T1`.`SH_ID`        AS `SH_ID`
from ((((((((`emdev`.`TBL_ASSIGNMENT_LOG` `T1` join `emdev`.`TBL_CASE` `T2` on (`T1`.`C_ID` = `T2`.`C_ID`)) join `emdev`.`TBL_LOV` `T3` on (`T1`.`SH_ID` = `T3`.`L_ID`)) join `emdev`.`TBL_HERO` `T4` on (`T1`.`H_ID` = `T4`.`H_ID`)) join `emdev`.`TBL_HERO_PROFILE` `T5` on (`T5`.`H_ID` = `T4`.`H_ID`)) join `emdev`.`TBL_LOV` `T9` on (`T5`.`SH_ID` = `T9`.`L_ID`)) left join `emdev`.`TBL_HERO` `T6` on (`T1`.`H_ID_SUPPORT` = `T6`.`H_ID`)) left join `emdev`.`TBL_HERO_PROFILE` `T7` on (`T7`.`H_ID` = `T6`.`H_ID`))
         left join `emdev`.`TBL_LOV` `T8` on (`T7`.`SH_ID` = `T8`.`L_ID`));

create or replace definer = root@`%` view VW_ASSIGNMENT_LOG_bak as
select `T1`.`C_ID`         AS `C_ID`,
       `T9`.`C_TOKEN`      AS `C_TOKEN`,
       `T1`.`H_ID`         AS `H_ID`,
       `T1`.`H_ID_SUPPORT` AS `H_ID_SUPPORT`,
       `T1`.`SH_ID`        AS `SH_ID`,
       `T2`.`FULLNAME`     AS `ASSIGNED_BY`,
       `T2`.`EMAIL`        AS `EMAIL_ASSIGNED_BY`,
       `T4`.`L_NAME`       AS `GROUP_ASSIGNED_BY`,
       `T6`.`FULLNAME`     AS `ASSIGNED_TO`,
       `T6`.`EMAIL`        AS `EMAIL_ASSIGNED_TO`,
       `T8`.`L_NAME`       AS `GROUP_ASSIGNED_TO`,
       `T5`.`L_NAME`       AS `STAKEHOLDER_NAME`,
       `T1`.`AL_TYPE`      AS `LOG_TYPE`,
       `T1`.`LOGGED_DATE`  AS `LOGGED_DATE`
from ((((((((`emdev`.`TBL_ASSIGNMENT_LOG` `T1` join `emdev`.`TBL_HERO` `T2` on (`T1`.`H_ID` = `T2`.`H_ID`)) join `emdev`.`TBL_HERO_PROFILE` `T3` on (`T1`.`H_ID` = `T3`.`H_ID`)) join `emdev`.`TBL_CASE` `T9` on (`T1`.`C_ID` = `T9`.`C_ID`)) left join `emdev`.`TBL_LOV` `T4` on (`T3`.`SH_ID` = `T4`.`L_ID`)) left join `emdev`.`TBL_LOV` `T5` on (`T1`.`SH_ID` = `T5`.`L_ID`)) left join `emdev`.`TBL_HERO` `T6` on (`T1`.`H_ID_SUPPORT` = `T6`.`H_ID`)) left join `emdev`.`TBL_HERO_PROFILE` `T7` on (`T1`.`H_ID_SUPPORT` = `T7`.`H_ID`))
         left join `emdev`.`TBL_LOV` `T8` on (`T7`.`SH_ID` = `T4`.`L_ID`));

create or replace definer = root@`%` view VW_CASE_DETAIL as
select `T1`.`C_ID`                                                                                          AS `C_ID`,
       `T1`.`C_TOKEN`                                                                                       AS `C_TOKEN`,
       `T1`.`H_ID`                                                                                          AS `H_ID`,
       `T7`.`H_TOKEN`                                                                                       AS `H_TOKEN`,
       `T1`.`CASE_NUM`                                                                                      AS `CASE_NUM`,
       `T1`.`CREATED_DATE`                                                                                  AS `CREATED_DATE`,
       `T1`.`CLOSED_DATE`                                                                                   AS `CLOSED_DATE`,
       `T1`.`OWNER_ID`                                                                                      AS `O_ID`,
       `T16`.`FULLNAME`                                                                                     AS `OWNER_NAME`,
       `T1`.`OWNER_ID_SUPPORT`                                                                              AS `S_ID`,
       `GET_AGING_WEEKDAYS`(`T1`.`CREATED_DATE`, current_timestamp())                                       AS `UNCLOSED_AGING`,
       `GET_AGING_WEEKDAYS`(`T1`.`CREATED_DATE`, `T1`.`CLOSED_DATE`)                                        AS `CLOSED_AGING`,
       `GET_AGING`(`T1`.`CREATED_DATE`, current_timestamp())                                                AS `UNCLOSED_AGING_DH`,
       `GET_AGING`(`T1`.`CREATED_DATE`, `T1`.`CLOSED_DATE`)                                                 AS `CLOSED_AGING_DH`,
       `T2`.`SH_ID`                                                                                         AS `SH_ID`,
       `T10`.`L_NAME`                                                                                       AS `CASE_TYPE`,
       `T11`.`L_NAME`                                                                                       AS `PRODUCT_NAME`,
       `T2`.`CASE_CONTENT`                                                                                  AS `CASE_CONTENT`,
       `T2`.`AREA_LOCATION`                                                                                 AS `AREA_LOCATION_ID`,
       `T13`.`L_NAME`                                                                                       AS `AREA_LOCATION`,
       `T12`.`L_NAME`                                                                                       AS `CASE_STATUS`,
       `T2`.`RATING`                                                                                        AS `RATING`,
       `T2`.`RATING_REMARK`                                                                                 AS `RATING_REMARK`,
       `T2`.`PACKAGE_NAME`                                                                                  AS `PACKAGE_NAME`,
       `T2`.`SERVICE_ADDRESS`                                                                               AS `SERVICE_ADDRESS`,
       `T2`.`SR_NUM`                                                                                        AS `SR_NUM`,
       `T2`.`TT_NUM`                                                                                        AS `TT_NUM`,
       `T3`.`CUSTOMER_NAME`                                                                                 AS `CUSTOMER_NAME`,
       `T3`.`ACTUAL_CUSTOMER_NAME`                                                                          AS `ACTUAL_CUSTOMER_NAME`,
       `T3`.`NRIC_NUM`                                                                                      AS `NRIC_NUM`,
       `T3`.`MOBILE_NUM`                                                                                    AS `MOBILE_NUM`,
       `T4`.`REMARK_TYPE`                                                                                   AS `REMARK_TYPE`,
       `T4`.`REMARK`                                                                                        AS `REMARK`,
       `T6`.`L_NAME`                                                                                        AS `CLOSURE_TYPE`,
       `T7`.`EMAIL`                                                                                         AS `EMAIL`,
       `T7`.`FULLNAME`                                                                                      AS `FULLNAME`,
       `T8`.`LONGITUDE`                                                                                     AS `LONGITUDE`,
       `T8`.`LATITUDE`                                                                                      AS `LATITUDE`,
       `T8`.`B_ID`                                                                                          AS `B_ID`,
       `T9`.`L_NAME`                                                                                        AS `STAKEHOLDER_NAME`,
       `T2`.`CASE_TYPE`                                                                                     AS `CASE_TYPE_ID`,
       `T2`.`PRODUCT_NAME`                                                                                  AS `PRODUCT_NAME_ID`,
       `T2`.`CASE_STATUS`                                                                                   AS `CASE_STATUS_ID`,
       `T4`.`CT_ID`                                                                                         AS `CT_ID`,
       `T14`.`PICTURE`                                                                                      AS `PICTURE`,
       `T2`.`SERVICE_ID`                                                                                    AS `SERVICE_ID`,
       case when `T22`.`MANAGER_LVL` = 'S' or `T22`.`MANAGER_LVL` = 'T' then `T22`.`FULLNAME` else NULL end AS `VIP`,
       `T15`.`STAFF_ID`                                                                                     AS `STAFF_ID`,
       `T15`.`PERSONNEL_NO`                                                                                 AS `PERNO`,
       `T2`.`SEGMENT_ID`                                                                                    AS `SEGMENT_ID`,
       `T17`.`L_NAME`                                                                                       AS `SEGMENT_NAME`,
       case when `T2`.`FLAG` = 'PROTECT' then 'COMPLAINT' else `T2`.`FLAG` end                              AS `FLAG`,
       `T2`.`SOURCE_ID`                                                                                     AS `SOURCE_ID`,
       `T18`.`L_NAME`                                                                                       AS `SOURCE_NAME`,
       `T2`.`SUB_SOURCE_ID`                                                                                 AS `SUB_SOURCE_ID`,
       `T19`.`L_NAME`                                                                                       AS `SUB_SOURCE_NAME`,
       case when `T2`.`SMS_DESC` = 'TqUnifi' then 'Yes' else 'No' end                                       AS `SMS_DESC`,
       `T2`.`ELIGIBILITY`                                                                                   AS `ELIGIBILITY`,
       `T20`.`TMCC_NAME`                                                                                    AS `TMCC_NAME`,
       `T20`.`TMCC_IDM`                                                                                     AS `TMCC_IDM`,
       `T20`.`TMCC_EMAIL`                                                                                   AS `TMCC_EMAIL`,
       `T20`.`TMCC_PERNO`                                                                                   AS `TMCC_PERNO`,
       `T20`.`TMCC_ACTIVE`                                                                                  AS `TMCC_ACTIVE`,
       `T20`.`TMCC_ELIGIBLE`                                                                                AS `TMCC_ELIGIBLE`,
       `T2`.`CKC`                                                                                           AS `CKC`,
       `T2`.`CKC_NUM`                                                                                       AS `CKC_NUM`,
       `T2`.`LOGIN_ID`                                                                                      AS `LOGIN_ID`,
       `T21`.`CONTENT`                                                                                      AS `HEROBUDDY_CONTENT`,
       `T2`.`STAKEHOLDER_REF`                                                                               AS `STAKEHOLDER_REF`,
       `T2`.`EXT_SYS_REF`                                                                                   AS `EXT_SYS_REF`,
       `T2`.`SEGMENT_CODE`                                                                                  AS `SEGMENT_CODE`
from ((((((((((((((((((((`emdev`.`TBL_CASE` `T1` join `emdev`.`TBL_CASE_DETAIL` `T2` on (`T1`.`C_ID` = `T2`.`C_ID`)) join `emdev`.`TBL_HERO` `T7` on (`T1`.`H_ID` = `T7`.`H_ID`)) left join `emdev`.`TBL_CUSTOMER_PROFILE` `T3` on (`T1`.`C_ID` = `T3`.`C_ID`)) left join `emdev`.`TBL_ACTION_REMARK` `T4` on (
            `T1`.`C_ID` = `T4`.`C_ID` and `T4`.`AR_ID` = (select `T5`.`AR_ID`
                                                          from `emdev`.`TBL_ACTION_REMARK` `T5`
                                                          where `T1`.`C_ID` = `T5`.`C_ID`
                                                          order by `T5`.`LOGGED_DATE` desc
                                                          limit 1))) left join `emdev`.`TBL_PICTURE` `T8` on (`T1`.`C_ID` = `T8`.`C_ID`)) left join `emdev`.`TBL_LOV` `T6` on (`T4`.`CT_ID` = `T6`.`L_ID`)) left join `emdev`.`TBL_LOV` `T9` on (`T2`.`SH_ID` = `T9`.`L_ID`)) left join `emdev`.`TBL_LOV` `T10` on (`T2`.`CASE_TYPE` = `T10`.`L_ID`)) left join `emdev`.`TBL_LOV` `T11` on (`T2`.`PRODUCT_NAME` = `T11`.`L_ID`)) left join `emdev`.`TBL_LOV` `T12` on (`T2`.`CASE_STATUS` = `T12`.`L_ID`)) left join `emdev`.`TBL_LOV` `T13` on (`T2`.`AREA_LOCATION` = `T13`.`L_ID`)) left join `emdev`.`TBL_BLOB` `T14` on (`T8`.`B_ID` = `T14`.`B_ID`)) left join `emdev`.`TBL_STAFF` `T15` on (convert(`T7`.`EMAIL` using utf8) = `T15`.`EMAIL`)) left join `emdev`.`TBL_LDAP_PROFILE` `T22` on (convert(`T7`.`EMAIL` using utf8) = convert(`T22`.`EMAIL` using utf8))) left join `emdev`.`TBL_HERO` `T16` on (`T1`.`OWNER_ID` = `T16`.`H_ID`)) left join `emdev`.`TBL_LOV` `T17` on (`T2`.`SEGMENT_ID` = `T17`.`L_ID`)) left join `emdev`.`TBL_LOV` `T18` on (`T2`.`SOURCE_ID` = `T18`.`L_ID`)) left join `emdev`.`TBL_LOV` `T19` on (`T2`.`SUB_SOURCE_ID` = `T19`.`L_ID`)) left join `emdev`.`TBL_TMCC_STAFF` `T20` on (
        convert(`T7`.`EMAIL` using utf8) = convert(`T20`.`TMCC_EMAIL` using utf8)))
         left join `emdev`.`TBL_HEROBUDDY_INFO` `T21` on (`T1`.`C_ID` = `T21`.`C_ID`));

-- comment on column VW_CASE_DETAIL.H_ID not supported: USER WHO LOGGED THE CASE

-- comment on column VW_CASE_DETAIL.CASE_NUM not supported: 12D = H-1710170012

-- comment on column VW_CASE_DETAIL.O_ID not supported: AGENT H_ID WHO RESPONSIBLE TO THE CASE

-- comment on column VW_CASE_DETAIL.S_ID not supported: REQ SUPPORT : Support person is when there is specific personnel identified from the stakeholder’s team

-- comment on column VW_CASE_DETAIL.SH_ID not supported: STAKEHOLDER_ID = L_ID IN TBL_LOV

-- comment on column VW_CASE_DETAIL.CASE_CONTENT not supported: DETAIL OF CASE/COMPLAINT

-- comment on column VW_CASE_DETAIL.AREA_LOCATION_ID not supported: REFER TO TBL_LOV

-- comment on column VW_CASE_DETAIL.RATING not supported: FROM 1 - 10

-- comment on column VW_CASE_DETAIL.NRIC_NUM not supported: NRIC/PASSPORT-NUM/

-- comment on column VW_CASE_DETAIL.REMARK_TYPE not supported: NEW/ASSIGNED/IN-PROGRESS/CLOSED

-- comment on column VW_CASE_DETAIL.EMAIL not supported: AS USERNAME FOR LOGIN

-- comment on column VW_CASE_DETAIL.CASE_TYPE_ID not supported: A.K.A AREA; FULFILLMENT/ASSURANCE/BILLING/etc; REFER TO L_ID IN TBL_LOV

-- comment on column VW_CASE_DETAIL.PRODUCT_NAME_ID not supported: FIXED/MOBILE/etc ; REFER TO L_ID IN TBL_LOV

-- comment on column VW_CASE_DETAIL.CASE_STATUS_ID not supported: REFER TO L_ID IN TBL_LOV : NEW/ACKNOWLEDGE/IN-PROGRESS/CLOSED

-- comment on column VW_CASE_DETAIL.CT_ID not supported: CLOSURE_TYPE; REFER TO L_ID FROM TBL_LOV

-- comment on column VW_CASE_DETAIL.SEGMENT_ID not supported: REFER TO TBL_LOV (Consumer/SME/Enterprise/Government)

-- comment on column VW_CASE_DETAIL.SOURCE_ID not supported: REFER TO TBL_LOV

-- comment on column VW_CASE_DETAIL.SUB_SOURCE_ID not supported: REFER TO TBL_LOV

-- comment on column VW_CASE_DETAIL.ELIGIBILITY not supported: LOGGER'S ELIGIBILITY STATUS UPON CASE CREATION

-- comment on column VW_CASE_DETAIL.HEROBUDDY_CONTENT not supported: IN JSON FORMAT

-- comment on column VW_CASE_DETAIL.STAKEHOLDER_REF not supported: RRT,NMO,CSM,NOC

create or replace definer = root@`%` view VW_CASE_LS as
select `T1`.`C_ID`                                                                                          AS `C_ID`,
       `T1`.`C_TOKEN`                                                                                       AS `C_TOKEN`,
       `T1`.`H_ID`                                                                                          AS `H_ID`,
       `T7`.`H_TOKEN`                                                                                       AS `H_TOKEN`,
       `T1`.`CASE_NUM`                                                                                      AS `CASE_NUM`,
       `T1`.`CREATED_DATE`                                                                                  AS `CREATED_DATE`,
       `T1`.`CLOSED_DATE`                                                                                   AS `CLOSED_DATE`,
       `T1`.`OWNER_ID`                                                                                      AS `O_ID`,
       `T16`.`FULLNAME`                                                                                     AS `OWNER_NAME`,
       `T1`.`OWNER_ID_SUPPORT`                                                                              AS `S_ID`,
       `GET_AGING_WEEKDAYS`(`T1`.`CREATED_DATE`, current_timestamp())                                       AS `UNCLOSED_AGING`,
       `GET_AGING_WEEKDAYS`(`T1`.`CREATED_DATE`, `T1`.`CLOSED_DATE`)                                        AS `CLOSED_AGING`,
       `GET_AGING`(`T1`.`CREATED_DATE`, current_timestamp())                                                AS `UNCLOSED_AGING_DH`,
       `GET_AGING`(`T1`.`CREATED_DATE`, `T1`.`CLOSED_DATE`)                                                 AS `CLOSED_AGING_DH`,
       `T2`.`SH_ID`                                                                                         AS `SH_ID`,
       `T10`.`L_NAME`                                                                                       AS `CASE_TYPE`,
       `T11`.`L_NAME`                                                                                       AS `PRODUCT_NAME`,
       `T2`.`CASE_CONTENT`                                                                                  AS `CASE_CONTENT`,
       `T2`.`AREA_LOCATION`                                                                                 AS `AREA_LOCATION_ID`,
       `T13`.`L_NAME`                                                                                       AS `AREA_LOCATION`,
       `T12`.`L_NAME`                                                                                       AS `CASE_STATUS`,
       `T2`.`RATING`                                                                                        AS `RATING`,
       `T2`.`RATING_REMARK`                                                                                 AS `RATING_REMARK`,
       `T2`.`PACKAGE_NAME`                                                                                  AS `PACKAGE_NAME`,
       `T2`.`SERVICE_ADDRESS`                                                                               AS `SERVICE_ADDRESS`,
       `T2`.`SR_NUM`                                                                                        AS `SR_NUM`,
       `T2`.`TT_NUM`                                                                                        AS `TT_NUM`,
       `T3`.`CUSTOMER_NAME`                                                                                 AS `CUSTOMER_NAME`,
       `T3`.`ACTUAL_CUSTOMER_NAME`                                                                          AS `ACTUAL_CUSTOMER_NAME`,
       `T3`.`NRIC_NUM`                                                                                      AS `NRIC_NUM`,
       `T3`.`MOBILE_NUM`                                                                                    AS `MOBILE_NUM`,
       `T4`.`REMARK_TYPE`                                                                                   AS `REMARK_TYPE`,
       `T4`.`REMARK`                                                                                        AS `REMARK`,
       `T6`.`L_NAME`                                                                                        AS `CLOSURE_TYPE`,
       `T7`.`EMAIL`                                                                                         AS `EMAIL`,
       `T7`.`FULLNAME`                                                                                      AS `FULLNAME`,
       `T8`.`LONGITUDE`                                                                                     AS `LONGITUDE`,
       `T8`.`LATITUDE`                                                                                      AS `LATITUDE`,
       `T8`.`B_ID`                                                                                          AS `B_ID`,
       `T9`.`L_NAME`                                                                                        AS `STAKEHOLDER_NAME`,
       `T2`.`CASE_TYPE`                                                                                     AS `CASE_TYPE_ID`,
       `T2`.`PRODUCT_NAME`                                                                                  AS `PRODUCT_NAME_ID`,
       `T2`.`CASE_STATUS`                                                                                   AS `CASE_STATUS_ID`,
       `T4`.`CT_ID`                                                                                         AS `CT_ID`,
       'null'                                                                                               AS `PICTURE`,
       `T2`.`SERVICE_ID`                                                                                    AS `SERVICE_ID`,
       case when `T22`.`MANAGER_LVL` = 'S' or `T22`.`MANAGER_LVL` = 'T' then `T22`.`FULLNAME` else NULL end AS `VIP`,
       `T14`.`STAFF_ID`                                                                                     AS `STAFF_ID`,
       `T14`.`PERSONNEL_NO`                                                                                 AS `PERNO`,
       `T2`.`SEGMENT_ID`                                                                                    AS `SEGMENT_ID`,
       `T17`.`L_NAME`                                                                                       AS `SEGMENT_NAME`,
       case when `T2`.`FLAG` = 'PROTECT' then 'COMPLAINT' else `T2`.`FLAG` end                              AS `FLAG`,
       `T2`.`SOURCE_ID`                                                                                     AS `SOURCE_ID`,
       `T18`.`L_NAME`                                                                                       AS `SOURCE_NAME`,
       `T2`.`SUB_SOURCE_ID`                                                                                 AS `SUB_SOURCE_ID`,
       `T19`.`L_NAME`                                                                                       AS `SUB_SOURCE_NAME`,
       case when `T2`.`SMS_DESC` = 'TqUnifi' then 'Yes' else 'No' end                                       AS `SMS_DESC`,
       `T2`.`ELIGIBILITY`                                                                                   AS `ELIGIBILITY`,
       `T20`.`TMCC_NAME`                                                                                    AS `TMCC_NAME`,
       `T20`.`TMCC_IDM`                                                                                     AS `TMCC_IDM`,
       `T20`.`TMCC_EMAIL`                                                                                   AS `TMCC_EMAIL`,
       `T20`.`TMCC_PERNO`                                                                                   AS `TMCC_PERNO`,
       `T20`.`TMCC_ACTIVE`                                                                                  AS `TMCC_ACTIVE`,
       `T20`.`TMCC_ELIGIBLE`                                                                                AS `TMCC_ELIGIBLE`,
       `T2`.`CKC`                                                                                           AS `CKC`,
       `T2`.`CKC_NUM`                                                                                       AS `CKC_NUM`,
       `T2`.`LOGIN_ID`                                                                                      AS `LOGIN_ID`,
       `T21`.`CONTENT`                                                                                      AS `HEROBUDDY_CONTENT`,
       `T2`.`STAKEHOLDER_REF`                                                                               AS `STAKEHOLDER_REF`,
       `T2`.`EXT_SYS_REF`                                                                                   AS `EXT_SYS_REF`,
       `T2`.`SEGMENT_CODE`                                                                                  AS `SEGMENT_CODE`
from (((((((((((((((((((`emdev`.`TBL_CASE` `T1` join `emdev`.`TBL_CASE_DETAIL` `T2` on (`T1`.`C_ID` = `T2`.`C_ID`)) join `emdev`.`TBL_HERO` `T7` on (`T1`.`H_ID` = `T7`.`H_ID`)) left join `emdev`.`TBL_CUSTOMER_PROFILE` `T3` on (`T1`.`C_ID` = `T3`.`C_ID`)) left join `emdev`.`TBL_ACTION_REMARK` `T4` on (
            `T1`.`C_ID` = `T4`.`C_ID` and `T4`.`AR_ID` = (select `T5`.`AR_ID`
                                                          from `emdev`.`TBL_ACTION_REMARK` `T5`
                                                          where `T1`.`C_ID` = `T5`.`C_ID`
                                                          order by `T5`.`LOGGED_DATE` desc
                                                          limit 1))) left join `emdev`.`TBL_PICTURE` `T8` on (`T1`.`C_ID` = `T8`.`C_ID`)) left join `emdev`.`TBL_LOV` `T6` on (`T4`.`CT_ID` = `T6`.`L_ID`)) left join `emdev`.`TBL_LOV` `T9` on (`T2`.`SH_ID` = `T9`.`L_ID`)) left join `emdev`.`TBL_LOV` `T10` on (`T2`.`CASE_TYPE` = `T10`.`L_ID`)) left join `emdev`.`TBL_LOV` `T11` on (`T2`.`PRODUCT_NAME` = `T11`.`L_ID`)) left join `emdev`.`TBL_LOV` `T12` on (`T2`.`CASE_STATUS` = `T12`.`L_ID`)) left join `emdev`.`TBL_LOV` `T13` on (`T2`.`AREA_LOCATION` = `T13`.`L_ID`)) left join `emdev`.`TBL_STAFF` `T14` on (convert(`T7`.`EMAIL` using utf8) = `T14`.`EMAIL`)) left join `emdev`.`TBL_LDAP_PROFILE` `T22` on (convert(`T7`.`EMAIL` using utf8) = convert(`T22`.`EMAIL` using utf8))) left join `emdev`.`TBL_HERO` `T16` on (`T1`.`OWNER_ID` = `T16`.`H_ID`)) left join `emdev`.`TBL_LOV` `T17` on (`T2`.`SEGMENT_ID` = `T17`.`L_ID`)) left join `emdev`.`TBL_LOV` `T18` on (`T2`.`SOURCE_ID` = `T18`.`L_ID`)) left join `emdev`.`TBL_LOV` `T19` on (`T2`.`SUB_SOURCE_ID` = `T19`.`L_ID`)) left join `emdev`.`TBL_TMCC_STAFF` `T20` on (
        convert(`T7`.`EMAIL` using utf8) = convert(`T20`.`TMCC_EMAIL` using utf8)))
         left join `emdev`.`TBL_HEROBUDDY_INFO` `T21` on (`T1`.`C_ID` = `T21`.`C_ID`));

-- comment on column VW_CASE_LS.H_ID not supported: USER WHO LOGGED THE CASE

-- comment on column VW_CASE_LS.CASE_NUM not supported: 12D = H-1710170012

-- comment on column VW_CASE_LS.O_ID not supported: AGENT H_ID WHO RESPONSIBLE TO THE CASE

-- comment on column VW_CASE_LS.S_ID not supported: REQ SUPPORT : Support person is when there is specific personnel identified from the stakeholder’s team

-- comment on column VW_CASE_LS.SH_ID not supported: STAKEHOLDER_ID = L_ID IN TBL_LOV

-- comment on column VW_CASE_LS.CASE_CONTENT not supported: DETAIL OF CASE/COMPLAINT

-- comment on column VW_CASE_LS.AREA_LOCATION_ID not supported: REFER TO TBL_LOV

-- comment on column VW_CASE_LS.RATING not supported: FROM 1 - 10

-- comment on column VW_CASE_LS.NRIC_NUM not supported: NRIC/PASSPORT-NUM/

-- comment on column VW_CASE_LS.REMARK_TYPE not supported: NEW/ASSIGNED/IN-PROGRESS/CLOSED

-- comment on column VW_CASE_LS.EMAIL not supported: AS USERNAME FOR LOGIN

-- comment on column VW_CASE_LS.CASE_TYPE_ID not supported: A.K.A AREA; FULFILLMENT/ASSURANCE/BILLING/etc; REFER TO L_ID IN TBL_LOV

-- comment on column VW_CASE_LS.PRODUCT_NAME_ID not supported: FIXED/MOBILE/etc ; REFER TO L_ID IN TBL_LOV

-- comment on column VW_CASE_LS.CASE_STATUS_ID not supported: REFER TO L_ID IN TBL_LOV : NEW/ACKNOWLEDGE/IN-PROGRESS/CLOSED

-- comment on column VW_CASE_LS.CT_ID not supported: CLOSURE_TYPE; REFER TO L_ID FROM TBL_LOV

-- comment on column VW_CASE_LS.SEGMENT_ID not supported: REFER TO TBL_LOV (Consumer/SME/Enterprise/Government)

-- comment on column VW_CASE_LS.SOURCE_ID not supported: REFER TO TBL_LOV

-- comment on column VW_CASE_LS.SUB_SOURCE_ID not supported: REFER TO TBL_LOV

-- comment on column VW_CASE_LS.ELIGIBILITY not supported: LOGGER'S ELIGIBILITY STATUS UPON CASE CREATION

-- comment on column VW_CASE_LS.HEROBUDDY_CONTENT not supported: IN JSON FORMAT

-- comment on column VW_CASE_LS.STAKEHOLDER_REF not supported: RRT,NMO,CSM,NOC

create or replace definer = root@`%` view VW_CHAT_MESSAGES as
select `T1`.`MB_ID`            AS `MB_ID`,
       `T1`.`C_ID`             AS `C_ID`,
       `T1`.`H_ID`             AS `H_ID`,
       `T1`.`FLAG`             AS `FLAG`,
       `T1`.`MESSAGE`          AS `MESSAGE`,
       `T1`.`POSTED_DATE`      AS `POSTED_DATE`,
       `T2`.`C_TOKEN`          AS `C_TOKEN`,
       `T2`.`OWNER_ID`         AS `O_ID`,
       `T2`.`OWNER_ID_SUPPORT` AS `S_ID`,
       `T3`.`FULLNAME`         AS `FULLNAME`,
       `T4`.`PICTURE`          AS `FILENAME`,
       `T1`.`B_ID`             AS `B_ID`
from (((`emdev`.`TBL_MESSAGE_BOX` `T1` join `emdev`.`TBL_CASE` `T2` on (`T1`.`C_ID` = `T2`.`C_ID`)) join `emdev`.`TBL_HERO` `T3` on (`T1`.`H_ID` = `T3`.`H_ID`))
         left join `emdev`.`TBL_BLOB` `T4` on (`T1`.`B_ID` = `T4`.`B_ID`))
order by `T1`.`POSTED_DATE` desc;

-- comment on column VW_CHAT_MESSAGES.C_ID not supported: REFER TO TBL_CASE_INFO

-- comment on column VW_CHAT_MESSAGES.H_ID not supported: REFER TO TBL_HERO_PROFILE

-- comment on column VW_CHAT_MESSAGES.FLAG not supported: FE/BE

-- comment on column VW_CHAT_MESSAGES.O_ID not supported: AGENT H_ID WHO RESPONSIBLE TO THE CASE

-- comment on column VW_CHAT_MESSAGES.S_ID not supported: REQ SUPPORT : Support person is when there is specific personnel identified from the stakeholder’s team

-- comment on column VW_CHAT_MESSAGES.B_ID not supported: REFER TO TBL_BLOB

create or replace definer = root@`%` view VW_GCHAT_MEMBERS as
select `T1`.`C_ID`     AS `C_ID`,
       `T2`.`H_ID`     AS `H_ID`,
       `T2`.`FULLNAME` AS `FULLNAME`,
       `T3`.`NICKNAME` AS `NICKNAME`,
       `T3`.`CATEGORY` AS `CATEGORY`,
       `T4`.`C_TOKEN`  AS `C_TOKEN`,
       `T2`.`H_TOKEN`  AS `H_TOKEN`,
       `T5`.`L_NAME`   AS `STAKEHOLDER_NAME`
from ((((`emdev`.`TBL_GROUP_CHAT` `T1` join `emdev`.`TBL_HERO` `T2` on (`T1`.`H_ID` = `T2`.`H_ID`)) join `emdev`.`TBL_HERO_PROFILE` `T3` on (`T2`.`H_ID` = `T3`.`H_ID`)) join `emdev`.`TBL_CASE` `T4` on (`T1`.`C_ID` = `T4`.`C_ID`))
         left join `emdev`.`TBL_LOV` `T5` on (`T3`.`SH_ID` = `T5`.`L_ID`));

create or replace definer = root@`%` view VW_HERO_DETAIL as
select `T1`.`H_ID`                                                           AS `H_ID`,
       `T1`.`H_TOKEN`                                                        AS `H_TOKEN`,
       `T1`.`FULLNAME`                                                       AS `FULLNAME`,
       `T1`.`EMAIL`                                                          AS `EMAIL`,
       `T1`.`ACTIVATION_KEY`                                                 AS `ACTIVATION_KEY`,
       `T1`.`ACTIVATION_STATUS`                                              AS `ACTIVATION_STATUS`,
       `T1`.`REGISTERED_DATE`                                                AS `REGISTERED_DATE`,
       `T2`.`NRIC_NUM`                                                       AS `NRIC_NUM`,
       `T2`.`MOBILE_NUM`                                                     AS `MOBILE_NUM`,
       case when `T2`.`CATEGORY` = 'PUBLIC' then 'TM' else 'STAKEHOLDER' end AS `CATEGORY`,
       `T2`.`SH_ID`                                                          AS `SH_ID`,
       `T2`.`RANK`                                                           AS `RANK`,
       `T2`.`SCORE`                                                          AS `SCORE`,
       `T2`.`LEVEL`                                                          AS `LEVEL`,
       `T2`.`NICKNAME`                                                       AS `NICKNAME`,
       `T2`.`B_ID`                                                           AS `B_ID`,
       `T4`.`PICTURE`                                                        AS `AVATAR_PICTURE`,
       `T3`.`L_NAME`                                                         AS `STAKEHOLDER_NAME`,
       `T1`.`H_GROUP`                                                        AS `H_GROUP`,
       `T2`.`STATE_ID`                                                       AS `STATE_ID`,
       `T2`.`POSITION_ID`                                                    AS `POSITION_ID`,
       `T2`.`DIVISION_ID`                                                    AS `DIVISION_ID`,
       `T2`.`ZONE_ID`                                                        AS `ZONE_ID`,
       `T2`.`TEAM_ID`                                                        AS `TEAM_ID`,
       `T5`.`L_NAME`                                                         AS `STATE_NAME`,
       `T6`.`L_NAME`                                                         AS `POSITION_NAME`,
       `T7`.`L_NAME`                                                         AS `DIVISION_NAME`,
       `T8`.`L_NAME`                                                         AS `ZONE_NAME`,
       `T9`.`L_NAME`                                                         AS `TEAM_NAME`,
       `T2`.`MY_STATUS`                                                      AS `MY_STATUS`,
       'null'                                                                AS `LAST_LOGGED_IN`
from ((((((((`emdev`.`TBL_HERO` `T1` join `emdev`.`TBL_HERO_PROFILE` `T2` on (`T1`.`H_ID` = `T2`.`H_ID`)) left join `emdev`.`TBL_LOV` `T3` on (`T2`.`SH_ID` = `T3`.`L_ID`)) left join `emdev`.`TBL_BLOB` `T4` on (`T2`.`B_ID` = `T4`.`B_ID`)) left join `emdev`.`TBL_LOV` `T5` on (`T2`.`STATE_ID` = `T5`.`L_ID`)) left join `emdev`.`TBL_LOV` `T6` on (`T2`.`POSITION_ID` = `T6`.`L_ID`)) left join `emdev`.`TBL_LOV` `T7` on (`T2`.`DIVISION_ID` = `T7`.`L_ID`)) left join `emdev`.`TBL_LOV` `T8` on (`T2`.`ZONE_ID` = `T8`.`L_ID`))
         left join `emdev`.`TBL_LOV` `T9` on (`T2`.`TEAM_ID` = `T9`.`L_ID`));

create or replace definer = root@`%` view VW_HERO_DETAIL_WITH_RANK as
select `T1`.`H_ID`                                                           AS `H_ID`,
       `T1`.`H_TOKEN`                                                        AS `H_TOKEN`,
       `T1`.`FULLNAME`                                                       AS `FULLNAME`,
       `T1`.`EMAIL`                                                          AS `EMAIL`,
       `T1`.`ACTIVATION_KEY`                                                 AS `ACTIVATION_KEY`,
       `T1`.`ACTIVATION_STATUS`                                              AS `ACTIVATION_STATUS`,
       `T1`.`REGISTERED_DATE`                                                AS `REGISTERED_DATE`,
       `T2`.`NRIC_NUM`                                                       AS `NRIC_NUM`,
       `T2`.`MOBILE_NUM`                                                     AS `MOBILE_NUM`,
       case when `T2`.`CATEGORY` = 'PUBLIC' then 'TM' else 'STAKEHOLDER' end AS `CATEGORY`,
       `T2`.`SH_ID`                                                          AS `SH_ID`,
       `T2`.`SCORE`                                                          AS `SCORE`,
       `T2`.`LEVEL`                                                          AS `LEVEL`,
       `T2`.`NICKNAME`                                                       AS `NICKNAME`,
       `T2`.`B_ID`                                                           AS `B_ID`,
       `T4`.`PICTURE`                                                        AS `AVATAR_PICTURE`,
       `T3`.`L_NAME`                                                         AS `STAKEHOLDER_NAME`,
       `T1`.`H_GROUP`                                                        AS `H_GROUP`,
       `T2`.`STATE_ID`                                                       AS `STATE_ID`,
       `T2`.`POSITION_ID`                                                    AS `POSITION_ID`,
       `T2`.`DIVISION_ID`                                                    AS `DIVISION_ID`,
       `T2`.`ZONE_ID`                                                        AS `ZONE_ID`,
       `T2`.`TEAM_ID`                                                        AS `TEAM_ID`,
       `T5`.`L_NAME`                                                         AS `STATE_NAME`,
       `T6`.`L_NAME`                                                         AS `POSITION_NAME`,
       `T7`.`L_NAME`                                                         AS `DIVISION_NAME`,
       `T8`.`L_NAME`                                                         AS `ZONE_NAME`,
       `T9`.`L_NAME`                                                         AS `TEAM_NAME`,
       `T2`.`MY_STATUS`                                                      AS `MY_STATUS`,
       'null'                                                                AS `LAST_LOGGED_IN`
from ((((((((`emdev`.`TBL_HERO` `T1` join `emdev`.`TBL_HERO_PROFILE` `T2` on (`T1`.`H_ID` = `T2`.`H_ID`)) left join `emdev`.`TBL_LOV` `T3` on (`T2`.`SH_ID` = `T3`.`L_ID`)) left join `emdev`.`TBL_BLOB` `T4` on (`T2`.`B_ID` = `T4`.`B_ID`)) left join `emdev`.`TBL_LOV` `T5` on (`T2`.`STATE_ID` = `T5`.`L_ID`)) left join `emdev`.`TBL_LOV` `T6` on (`T2`.`POSITION_ID` = `T6`.`L_ID`)) left join `emdev`.`TBL_LOV` `T7` on (`T2`.`DIVISION_ID` = `T7`.`L_ID`)) left join `emdev`.`TBL_LOV` `T8` on (`T2`.`ZONE_ID` = `T8`.`L_ID`))
         left join `emdev`.`TBL_LOV` `T9` on (`T2`.`TEAM_ID` = `T9`.`L_ID`));

create or replace definer = root@`%` view VW_HERO_LS as
select `T1`.`H_ID`                                                           AS `H_ID`,
       `T1`.`H_TOKEN`                                                        AS `H_TOKEN`,
       `T1`.`FULLNAME`                                                       AS `FULLNAME`,
       `T1`.`EMAIL`                                                          AS `EMAIL`,
       `T1`.`ACTIVATION_KEY`                                                 AS `ACTIVATION_KEY`,
       `T1`.`ACTIVATION_STATUS`                                              AS `ACTIVATION_STATUS`,
       `T1`.`REGISTERED_DATE`                                                AS `REGISTERED_DATE`,
       `T2`.`NRIC_NUM`                                                       AS `NRIC_NUM`,
       `T2`.`MOBILE_NUM`                                                     AS `MOBILE_NUM`,
       case when `T2`.`CATEGORY` = 'PUBLIC' then 'TM' else 'STAKEHOLDER' end AS `CATEGORY`,
       `T2`.`SH_ID`                                                          AS `SH_ID`,
       `T2`.`RANK`                                                           AS `RANK`,
       `T2`.`SCORE`                                                          AS `SCORE`,
       `T2`.`LEVEL`                                                          AS `LEVEL`,
       `T2`.`NICKNAME`                                                       AS `NICKNAME`,
       `T2`.`B_ID`                                                           AS `B_ID`,
       'null'                                                                AS `AVATAR_PICTURE`,
       `T3`.`L_NAME`                                                         AS `STAKEHOLDER_NAME`,
       `T1`.`H_GROUP`                                                        AS `H_GROUP`,
       `T2`.`STATE_ID`                                                       AS `STATE_ID`,
       `T2`.`POSITION_ID`                                                    AS `POSITION_ID`,
       `T2`.`DIVISION_ID`                                                    AS `DIVISION_ID`,
       `T2`.`ZONE_ID`                                                        AS `ZONE_ID`,
       `T2`.`TEAM_ID`                                                        AS `TEAM_ID`,
       `T5`.`L_NAME`                                                         AS `STATE_NAME`,
       `T6`.`L_NAME`                                                         AS `POSITION_NAME`,
       `T7`.`L_NAME`                                                         AS `DIVISION_NAME`,
       `T8`.`L_NAME`                                                         AS `ZONE_NAME`,
       `T9`.`L_NAME`                                                         AS `TEAM_NAME`,
       `T2`.`MY_STATUS`                                                      AS `MY_STATUS`,
       'null'                                                                AS `LAST_LOGGED_IN`
from (((((((`emdev`.`TBL_HERO` `T1` join `emdev`.`TBL_HERO_PROFILE` `T2` on (`T1`.`H_ID` = `T2`.`H_ID`)) left join `emdev`.`TBL_LOV` `T3` on (`T2`.`SH_ID` = `T3`.`L_ID`)) left join `emdev`.`TBL_LOV` `T5` on (`T2`.`STATE_ID` = `T5`.`L_ID`)) left join `emdev`.`TBL_LOV` `T6` on (`T2`.`POSITION_ID` = `T6`.`L_ID`)) left join `emdev`.`TBL_LOV` `T7` on (`T2`.`DIVISION_ID` = `T7`.`L_ID`)) left join `emdev`.`TBL_LOV` `T8` on (`T2`.`ZONE_ID` = `T8`.`L_ID`))
         left join `emdev`.`TBL_LOV` `T9` on (`T2`.`TEAM_ID` = `T9`.`L_ID`));

create or replace definer = root@`%` view VW_HERO_REPORTING as
select `A`.`CASE_NUM`                                                                                                 AS `HERO_CASE_ID`,
       replace(replace(replace((select `E`.`CUSTOMER_NAME`
                                from `emdev`.`TBL_CUSTOMER_PROFILE` `E`
                                where `E`.`C_ID` = `A`.`C_ID`), '\r', ' '), '\n                ', ' '), ',',
               ' ')                                                                                                   AS `CUST_NAME`,
       replace(replace(replace(replace(replace(replace(`B`.`CASE_CONTENT`, '\r', ' '), '\n                            ',
                                               ' '), ',', ' '), ';', ' '), '<', ' '), '"',
               ' ')                                                                                                   AS `DESCRIPTION`,
       (select `D`.`FULLNAME`
        from `emdev`.`TBL_HERO` `D`
        where `D`.`H_ID` = `A`.`H_ID`)                                                                                AS `HERO_LOGGER`,
       (select `ST`.`STATE`
        from (`emdev`.`TBL_STAFF` `ST`
                 join `emdev`.`TBL_HERO` `HERO`)
        where `HERO`.`H_ID` = `A`.`H_ID`
          and convert(`HERO`.`EMAIL` using utf8) = `ST`.`EMAIL`)                                                      AS `HERO_STATE`,
       (select `C`.`L_NAME`
        from `emdev`.`TBL_LOV` `C`
        where `C`.`L_ID` = `B`.`AREA_LOCATION`)                                                                       AS `AREA_LOCATION`,
       case
           when (select `C`.`L_NAME` from `emdev`.`TBL_LOV` `C` where `C`.`L_ID` = `B`.`CASE_STATUS`) = 'NEW'
               then 'UNASSIGNED'
           else (select `C`.`L_NAME`
                 from `emdev`.`TBL_LOV` `C`
                 where `C`.`L_ID` = `B`.`CASE_STATUS`) end                                                            AS `CASE_STATUS`,
       (select `C`.`L_NAME`
        from `emdev`.`TBL_LOV` `C`
        where `C`.`L_ID` = `B`.`CASE_TYPE`)                                                                           AS `CASE_TYPE`,
       case
           when (select `E`.`FLAG`
                 from (`emdev`.`TBL_HERO` `D`
                          join `emdev`.`TBL_STAFF` `E`)
                 where `D`.`H_ID` = `A`.`H_ID`
                   and convert(`D`.`EMAIL` using utf8) = `E`.`EMAIL`) = 'VIP' then 'VIP'
           else NULL end                                                                                              AS `VIP`,
       replace(replace(`B`.`PACKAGE_NAME`, ';', ' '), ',', ' ')                                                       AS `PACKAGE_NAME`,
       (select `C`.`L_NAME`
        from `emdev`.`TBL_LOV` `C`
        where `C`.`L_ID` = `B`.`PRODUCT_NAME`)                                                                        AS `PRODUCT`,
       (select `C`.`L_NAME`
        from `emdev`.`TBL_LOV` `C`
        where `C`.`L_ID` = `B`.`SEGMENT_ID`)                                                                          AS `SEGMENT`,
       (select `D`.`FULLNAME`
        from `emdev`.`TBL_HERO` `D`
        where `D`.`H_ID` = `A`.`OWNER_ID`)                                                                            AS `CASE_OWNER`,
       (select `C`.`L_NAME`
        from `emdev`.`TBL_LOV` `C`
        where `C`.`L_ID` = `B`.`SH_ID`)                                                                               AS `GROUP_`,
       replace(replace(replace(replace(`B`.`SR_NUM`, '\r', ' '), '\n                    ', ' '), ';', ' '), ',',
               ' ')                                                                                                   AS `SR_NUM`,
       replace(replace(replace(replace(`B`.`TT_NUM`, '\r', ' '), '\n                    ', ' '), ';', ' '), ',',
               ' ')                                                                                                   AS `TT_NUM`,
       case
           when `B`.`CASE_STATUS` = 70 then (select replace(replace(replace(replace(replace(`G`.`REMARK`, '\r', ' '),
                                                                                    '\n                                            ',
                                                                                    ' '), ',', ' '), ';', ' '), '<',
                                                            ' ')
                                             from `emdev`.`TBL_ACTION_REMARK` `G`
                                             where `G`.`C_ID` = `A`.`C_ID`
                                               and `G`.`REMARK_TYPE` = 'CLOSED'
                                             limit 1) end                                                             AS `UPDATE_REMARKS`,
       case
           when `B`.`CASE_STATUS` = 70 then (select `C`.`L_NAME`
                                             from (`emdev`.`TBL_ACTION_REMARK` `G`
                                                      join `emdev`.`TBL_LOV` `C`)
                                             where `G`.`C_ID` = `A`.`C_ID`
                                               and `G`.`CT_ID` = `C`.`L_ID`
                                               and `G`.`REMARK_TYPE` = 'CLOSED'
                                             limit 1) end                                                             AS `CLOSURE_TYPE`,
       `A`.`CREATED_DATE`                                                                                             AS `CREATED_DATE`,
       date_format(`A`.`CREATED_DATE`, '%M %Y')                                                                       AS `MONTH_YEAR`,
       case
           when `B`.`CASE_STATUS` = 70 then case
                                                when (select count(0)
                                                      from `emdev`.`TBL_ACTION_REMARK` `G`
                                                      where `G`.`C_ID` = `A`.`C_ID`
                                                        and `G`.`REMARK_TYPE` = 'IN-PROGRESS'
                                                      limit 1) > 0 then to_days(`A`.`CLOSED_DATE`) -
                                                                        to_days((select `G`.`LOGGED_DATE`
                                                                                 from `emdev`.`TBL_ACTION_REMARK` `G`
                                                                                 where `G`.`C_ID` = `A`.`C_ID`
                                                                                   and `G`.`REMARK_TYPE` = 'IN-PROGRESS'
                                                                                 limit 1))
                                                else case
                                                         when (select count(0)
                                                               from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                                               where `H`.`C_ID` = `A`.`C_ID`
                                                                 and `H`.`AL_TYPE` = 'SUPPORT'
                                                               limit 1) > 0 then to_days(`A`.`CLOSED_DATE`) -
                                                                                 to_days((select `H`.`LOGGED_DATE`
                                                                                          from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                                                                          where `H`.`C_ID` = `A`.`C_ID`
                                                                                            and `H`.`AL_TYPE` = 'SUPPORT'
                                                                                          limit 1))
                                                         else to_days(`A`.`CLOSED_DATE`) -
                                                              to_days((select `H`.`LOGGED_DATE`
                                                                       from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                                                       where `H`.`C_ID` = `A`.`C_ID`
                                                                         and `H`.`AL_TYPE` = 'SELF'
                                                                       limit 1)) end end end                          AS `AGING_CLOSED`,
       case
           when `B`.`CASE_STATUS` = 70 then (select `G`.`LOGGED_DATE`
                                             from `emdev`.`TBL_ACTION_REMARK` `G`
                                             where `G`.`C_ID` = `A`.`C_ID`
                                               and `G`.`REMARK_TYPE` = 'CLOSED'
                                             limit 1) end                                                             AS `CLOSED_DATE`,
       to_days((select min(`H`.`LOGGED_DATE`)
                from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                where `H`.`C_ID` = `A`.`C_ID`
                limit 1)) -
       to_days(`A`.`CREATED_DATE`)                                                                                    AS `AGING_UNASSIGNED`,
       (select min(`H`.`LOGGED_DATE`)
        from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
        where `H`.`C_ID` = `A`.`C_ID`
        limit 1)                                                                                                      AS `DATE_UNASSIGNED`,
       case
           when (select count(0)
                 from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                 where `H`.`C_ID` = `A`.`C_ID`
                   and `H`.`AL_TYPE` = 'TRANSFER'
                 limit 1) > 0 then case
                                       when (select count(0)
                                             from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                             where `H`.`C_ID` = `A`.`C_ID` and `H`.`AL_TYPE` = 'SELF'
                                             limit 1) > 0 then to_days((select min(`H`.`LOGGED_DATE`)
                                                                        from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                                                        where `H`.`C_ID` = `A`.`C_ID`
                                                                          and `H`.`AL_TYPE` = 'SELF'
                                                                        limit 1)) -
                                                               to_days((select min(`H`.`LOGGED_DATE`)
                                                                        from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                                                        where `H`.`C_ID` = `A`.`C_ID`
                                                                        limit 1))
                                       else to_days((select min(`H`.`LOGGED_DATE`)
                                                     from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                                     where `H`.`C_ID` = `A`.`C_ID`
                                                       and `H`.`AL_TYPE` = 'SUPPORT'
                                                     limit 1)) - to_days((select min(`H`.`LOGGED_DATE`)
                                                                          from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                                                          where `H`.`C_ID` = `A`.`C_ID`
                                                                            and `H`.`AL_TYPE` = 'TRANSFER'
                                                                          limit 1)) end
           else case
                    when (select count(0)
                          from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                          where `H`.`C_ID` = `A`.`C_ID`
                            and `H`.`AL_TYPE` = 'SUPPORT'
                          limit 1) > 0 then to_days((select min(`H`.`LOGGED_DATE`)
                                                     from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                                     where `H`.`C_ID` = `A`.`C_ID`
                                                       and `H`.`AL_TYPE` = 'SELF'
                                                     limit 1)) - to_days(`A`.`CREATED_DATE`)
                    else to_days((select min(`H`.`LOGGED_DATE`)
                                  from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                  where `H`.`C_ID` = `A`.`C_ID`
                                    and `H`.`AL_TYPE` = 'SUPPORT'
                                  limit 1)) -
                         to_days(`A`.`CREATED_DATE`) end end                                                          AS `AGING_ASSIGNED`,
       case
           when (select count(0)
                 from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                 where `H`.`C_ID` = `A`.`C_ID` and `H`.`AL_TYPE` = 'SELF'
                 limit 1) > 0 then (select min(`H`.`LOGGED_DATE`)
                                    from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                    where `H`.`C_ID` = `A`.`C_ID`
                                      and `H`.`AL_TYPE` = 'SELF'
                                    limit 1)
           else (select min(`H`.`LOGGED_DATE`)
                 from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                 where `H`.`C_ID` = `A`.`C_ID`
                   and `H`.`AL_TYPE` = 'SUPPORT'
                 limit 1) end                                                                                         AS `ASSIGNED_DATE`,
       case
           when (select count(0)
                 from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                 where `H`.`C_ID` = `A`.`C_ID`
                   and `H`.`AL_TYPE` = 'SUPPORT'
                 limit 1) > 0 then to_days((select `G`.`LOGGED_DATE`
                                            from `emdev`.`TBL_ACTION_REMARK` `G`
                                            where `G`.`C_ID` = `A`.`C_ID`
                                              and `G`.`REMARK_TYPE` = 'IN-PROGRESS'
                                            limit 1)) - to_days((select min(`H`.`LOGGED_DATE`)
                                                                 from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                                                 where `H`.`C_ID` = `A`.`C_ID`
                                                                   and `H`.`H_ID_SUPPORT` <> 0
                                                                 limit 1))
           else to_days((select `G`.`LOGGED_DATE`
                         from `emdev`.`TBL_ACTION_REMARK` `G`
                         where `G`.`C_ID` = `A`.`C_ID`
                           and `G`.`REMARK_TYPE` = 'IN-PROGRESS'
                         limit 1)) - to_days((select min(`H`.`LOGGED_DATE`)
                                              from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                              where `H`.`C_ID` = `A`.`C_ID`
                                              limit 1)) end                                                           AS `AGING_INPROGRESS`,
       (select `G`.`LOGGED_DATE`
        from `emdev`.`TBL_ACTION_REMARK` `G`
        where `G`.`C_ID` = `A`.`C_ID`
          and `G`.`REMARK_TYPE` = 'IN-PROGRESS'
        limit 1)                                                                                                      AS `INPROGRESS_DATE`,
       to_days((select `G`.`LOGGED_DATE`
                from `emdev`.`TBL_ACTION_REMARK` `G`
                where `G`.`C_ID` = `A`.`C_ID`
                  and `G`.`REMARK_TYPE` = 'CANCELLED'
                limit 1)) -
       to_days(`A`.`CREATED_DATE`)                                                                                    AS `AGING_CANCELLED`,
       (select `G`.`LOGGED_DATE`
        from `emdev`.`TBL_ACTION_REMARK` `G`
        where `G`.`C_ID` = `A`.`C_ID`
          and `G`.`REMARK_TYPE` = 'CANCELLED'
        limit 1)                                                                                                      AS `CANCELLED_DATE`,
       case
           when `B`.`CASE_STATUS` = 70 then to_days(`A`.`CLOSED_DATE`) - to_days(`A`.`CREATED_DATE`)
           when `B`.`CASE_STATUS` = 73 then to_days((select `G`.`LOGGED_DATE`
                                                     from `emdev`.`TBL_ACTION_REMARK` `G`
                                                     where `G`.`C_ID` = `A`.`C_ID`
                                                       and `G`.`REMARK_TYPE` = 'CANCELLED'
                                                     limit 1)) - to_days(`A`.`CREATED_DATE`)
           else to_days(current_timestamp()) - to_days(`A`.`CREATED_DATE`) end                                        AS `AGING`,
       `B`.`RATING`                                                                                                   AS `RATING`,
       ifnull(`B`.`FLAG`, 'COMPLAINT')                                                                                AS `FLAG`,
       `B`.`CKC`                                                                                                      AS `CKC`,
       `B`.`CKC_NUM`                                                                                                  AS `CKC_NUM`,
       `B`.`EXT_SYS_REF`                                                                                              AS `EXT_SYS_REF`,
       `B`.`STAKEHOLDER_REF`                                                                                          AS `STAKEHOLDER_REF`
from (`emdev`.`TBL_CASE` `A`
         join `emdev`.`TBL_CASE_DETAIL` `B` on (`A`.`C_ID` = `B`.`C_ID`))
where case
          when (select `C`.`L_NAME` from `emdev`.`TBL_LOV` `C` where `C`.`L_ID` = `B`.`CASE_STATUS`) = 'NEW'
              then 'UNASSIGNED'
          else (select `C`.`L_NAME` from `emdev`.`TBL_LOV` `C` where `C`.`L_ID` = `B`.`CASE_STATUS`) end <>
      'TO-BE-DELETED'
  and `A`.`CREATED_DATE` between current_timestamp() - interval 90 day and current_timestamp();

-- comment on column VW_HERO_REPORTING.HERO_CASE_ID not supported: 12D = H-1710170012

-- comment on column VW_HERO_REPORTING.RATING not supported: FROM 1 - 10

-- comment on column VW_HERO_REPORTING.STAKEHOLDER_REF not supported: RRT,NMO,CSM,NOC

create or replace definer = root@`%` view VW_HERO_REPORTING_OPEN as
select `A`.`CASE_NUM`                                                                                                 AS `HERO_CASE_ID`,
       replace(replace(replace((select `E`.`CUSTOMER_NAME`
                                from `emdev`.`TBL_CUSTOMER_PROFILE` `E`
                                where `E`.`C_ID` = `A`.`C_ID`), '\n', ' '), '\n                ', ' '), ',',
               ' ')                                                                                                   AS `CUST_NAME`,
       replace(replace(replace(replace(replace(replace(`B`.`CASE_CONTENT`, '\n', ' '), '\n                            ',
                                               ' '), ',', ' '), ';', ' '), '<', ' '), '"',
               ' ')                                                                                                   AS `DESCRIPTION`,
       (select `D`.`FULLNAME`
        from `emdev`.`TBL_HERO` `D`
        where `D`.`H_ID` = `A`.`H_ID`)                                                                                AS `HERO_LOGGER`,
       (select `ST`.`STATE`
        from (`emdev`.`TBL_STAFF` `ST`
                 join `emdev`.`TBL_HERO` `HERO`)
        where `HERO`.`H_ID` = `A`.`H_ID`
          and convert(`HERO`.`EMAIL` using utf8) = `ST`.`EMAIL`)                                                      AS `HERO_STATE`,
       (select `C`.`L_NAME`
        from `emdev`.`TBL_LOV` `C`
        where `C`.`L_ID` = `B`.`AREA_LOCATION`)                                                                       AS `AREA_LOCATION`,
       case
           when (select `C`.`L_NAME` from `emdev`.`TBL_LOV` `C` where `C`.`L_ID` = `B`.`CASE_STATUS`) = 'NEW'
               then 'UNASSIGNED'
           else (select `C`.`L_NAME`
                 from `emdev`.`TBL_LOV` `C`
                 where `C`.`L_ID` = `B`.`CASE_STATUS`) end                                                            AS `CASE_STATUS`,
       (select `C`.`L_NAME`
        from `emdev`.`TBL_LOV` `C`
        where `C`.`L_ID` = `B`.`CASE_TYPE`)                                                                           AS `CASE_TYPE`,
       case
           when (select `E`.`FLAG`
                 from (`emdev`.`TBL_HERO` `D`
                          join `emdev`.`TBL_STAFF` `E`)
                 where `D`.`H_ID` = `A`.`H_ID`
                   and convert(`D`.`EMAIL` using utf8) = `E`.`EMAIL`) = 'VIP' then 'VIP'
           else NULL end                                                                                              AS `VIP`,
       replace(replace(`B`.`PACKAGE_NAME`, ';', ' '), ',', ' ')                                                       AS `PACKAGE_NAME`,
       (select `C`.`L_NAME`
        from `emdev`.`TBL_LOV` `C`
        where `C`.`L_ID` = `B`.`PRODUCT_NAME`)                                                                        AS `PRODUCT`,
       (select `C`.`L_NAME`
        from `emdev`.`TBL_LOV` `C`
        where `C`.`L_ID` = `B`.`SEGMENT_ID`)                                                                          AS `SEGMENT`,
       (select `D`.`FULLNAME`
        from `emdev`.`TBL_HERO` `D`
        where `D`.`H_ID` = `A`.`OWNER_ID`)                                                                            AS `CASE_OWNER`,
       (select `C`.`L_NAME`
        from `emdev`.`TBL_LOV` `C`
        where `C`.`L_ID` = `B`.`SH_ID`)                                                                               AS `GROUP_`,
       replace(replace(replace(replace(`B`.`SR_NUM`, '\n', ' '), '\n                    ', ' '), ';', ' '), ',',
               ' ')                                                                                                   AS `SR_NUM`,
       replace(replace(replace(replace(`B`.`TT_NUM`, '\n', ' '), '\n                    ', ' '), ';', ' '), ',',
               ' ')                                                                                                   AS `TT_NUM`,
       case
           when `B`.`CASE_STATUS` = 70 then (select replace(replace(replace(replace(replace(`G`.`REMARK`, '\n', ' '),
                                                                                    '\n                                            ',
                                                                                    ' '), ',', ' '), ';', ' '), '<',
                                                            ' ')
                                             from `emdev`.`TBL_ACTION_REMARK` `G`
                                             where `G`.`C_ID` = `A`.`C_ID`
                                               and `G`.`REMARK_TYPE` = 'CLOSED'
                                             limit 1) end                                                             AS `UPDATE_REMARKS`,
       case
           when `B`.`CASE_STATUS` = 70 then (select `C`.`L_NAME`
                                             from (`emdev`.`TBL_ACTION_REMARK` `G`
                                                      join `emdev`.`TBL_LOV` `C`)
                                             where `G`.`C_ID` = `A`.`C_ID`
                                               and `G`.`CT_ID` = `C`.`L_ID`
                                               and `G`.`REMARK_TYPE` = 'CLOSED'
                                             limit 1) end                                                             AS `CLOSURE_TYPE`,
       `A`.`CREATED_DATE`                                                                                             AS `CREATED_DATE`,
       date_format(`A`.`CREATED_DATE`, '%M %Y')                                                                       AS `MONTH_YEAR`,
       case
           when `B`.`CASE_STATUS` = 70 then case
                                                when (select count(0)
                                                      from `emdev`.`TBL_ACTION_REMARK` `G`
                                                      where `G`.`C_ID` = `A`.`C_ID`
                                                        and `G`.`REMARK_TYPE` = 'IN-PROGRESS'
                                                      limit 1) > 0 then to_days(`A`.`CLOSED_DATE`) -
                                                                        to_days((select `G`.`LOGGED_DATE`
                                                                                 from `emdev`.`TBL_ACTION_REMARK` `G`
                                                                                 where `G`.`C_ID` = `A`.`C_ID`
                                                                                   and `G`.`REMARK_TYPE` = 'IN-PROGRESS'
                                                                                 limit 1))
                                                else case
                                                         when (select count(0)
                                                               from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                                               where `H`.`C_ID` = `A`.`C_ID`
                                                                 and `H`.`AL_TYPE` = 'SUPPORT'
                                                               limit 1) > 0 then to_days(`A`.`CLOSED_DATE`) -
                                                                                 to_days((select `H`.`LOGGED_DATE`
                                                                                          from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                                                                          where `H`.`C_ID` = `A`.`C_ID`
                                                                                            and `H`.`AL_TYPE` = 'SUPPORT'
                                                                                          limit 1))
                                                         else to_days(`A`.`CLOSED_DATE`) -
                                                              to_days((select `H`.`LOGGED_DATE`
                                                                       from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                                                       where `H`.`C_ID` = `A`.`C_ID`
                                                                         and `H`.`AL_TYPE` = 'SELF'
                                                                       limit 1)) end end end                          AS `AGING_CLOSED`,
       case
           when `B`.`CASE_STATUS` = 70 then (select `G`.`LOGGED_DATE`
                                             from `emdev`.`TBL_ACTION_REMARK` `G`
                                             where `G`.`C_ID` = `A`.`C_ID`
                                               and `G`.`REMARK_TYPE` = 'CLOSED'
                                             limit 1) end                                                             AS `CLOSED_DATE`,
       to_days((select min(`H`.`LOGGED_DATE`)
                from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                where `H`.`C_ID` = `A`.`C_ID`
                limit 1)) -
       to_days(`A`.`CREATED_DATE`)                                                                                    AS `AGING_UNASSIGNED`,
       (select min(`H`.`LOGGED_DATE`)
        from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
        where `H`.`C_ID` = `A`.`C_ID`
        limit 1)                                                                                                      AS `DATE_UNASSIGNED`,
       case
           when (select count(0)
                 from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                 where `H`.`C_ID` = `A`.`C_ID`
                   and `H`.`AL_TYPE` = 'TRANSFER'
                 limit 1) > 0 then case
                                       when (select count(0)
                                             from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                             where `H`.`C_ID` = `A`.`C_ID` and `H`.`AL_TYPE` = 'SELF'
                                             limit 1) > 0 then to_days((select min(`H`.`LOGGED_DATE`)
                                                                        from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                                                        where `H`.`C_ID` = `A`.`C_ID`
                                                                          and `H`.`AL_TYPE` = 'SELF'
                                                                        limit 1)) -
                                                               to_days((select min(`H`.`LOGGED_DATE`)
                                                                        from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                                                        where `H`.`C_ID` = `A`.`C_ID`
                                                                        limit 1))
                                       else to_days((select min(`H`.`LOGGED_DATE`)
                                                     from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                                     where `H`.`C_ID` = `A`.`C_ID`
                                                       and `H`.`AL_TYPE` = 'SUPPORT'
                                                     limit 1)) - to_days((select min(`H`.`LOGGED_DATE`)
                                                                          from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                                                          where `H`.`C_ID` = `A`.`C_ID`
                                                                            and `H`.`AL_TYPE` = 'TRANSFER'
                                                                          limit 1)) end
           else case
                    when (select count(0)
                          from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                          where `H`.`C_ID` = `A`.`C_ID`
                            and `H`.`AL_TYPE` = 'SUPPORT'
                          limit 1) > 0 then to_days((select min(`H`.`LOGGED_DATE`)
                                                     from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                                     where `H`.`C_ID` = `A`.`C_ID`
                                                       and `H`.`AL_TYPE` = 'SELF'
                                                     limit 1)) - to_days(`A`.`CREATED_DATE`)
                    else to_days((select min(`H`.`LOGGED_DATE`)
                                  from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                  where `H`.`C_ID` = `A`.`C_ID`
                                    and `H`.`AL_TYPE` = 'SUPPORT'
                                  limit 1)) -
                         to_days(`A`.`CREATED_DATE`) end end                                                          AS `AGING_ASSIGNED`,
       case
           when (select count(0)
                 from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                 where `H`.`C_ID` = `A`.`C_ID` and `H`.`AL_TYPE` = 'SELF'
                 limit 1) > 0 then (select min(`H`.`LOGGED_DATE`)
                                    from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                    where `H`.`C_ID` = `A`.`C_ID`
                                      and `H`.`AL_TYPE` = 'SELF'
                                    limit 1)
           else (select min(`H`.`LOGGED_DATE`)
                 from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                 where `H`.`C_ID` = `A`.`C_ID`
                   and `H`.`AL_TYPE` = 'SUPPORT'
                 limit 1) end                                                                                         AS `ASSIGNED_DATE`,
       case
           when (select count(0)
                 from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                 where `H`.`C_ID` = `A`.`C_ID`
                   and `H`.`AL_TYPE` = 'SUPPORT'
                 limit 1) > 0 then to_days((select `G`.`LOGGED_DATE`
                                            from `emdev`.`TBL_ACTION_REMARK` `G`
                                            where `G`.`C_ID` = `A`.`C_ID`
                                              and `G`.`REMARK_TYPE` = 'IN-PROGRESS'
                                            limit 1)) - to_days((select min(`H`.`LOGGED_DATE`)
                                                                 from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                                                 where `H`.`C_ID` = `A`.`C_ID`
                                                                   and `H`.`H_ID_SUPPORT` <> 0
                                                                 limit 1))
           else to_days((select `G`.`LOGGED_DATE`
                         from `emdev`.`TBL_ACTION_REMARK` `G`
                         where `G`.`C_ID` = `A`.`C_ID`
                           and `G`.`REMARK_TYPE` = 'IN-PROGRESS'
                         limit 1)) - to_days((select min(`H`.`LOGGED_DATE`)
                                              from `emdev`.`TBL_ASSIGNMENT_LOG` `H`
                                              where `H`.`C_ID` = `A`.`C_ID`
                                              limit 1)) end                                                           AS `AGING_INPROGRESS`,
       (select `G`.`LOGGED_DATE`
        from `emdev`.`TBL_ACTION_REMARK` `G`
        where `G`.`C_ID` = `A`.`C_ID`
          and `G`.`REMARK_TYPE` = 'IN-PROGRESS'
        limit 1)                                                                                                      AS `INPROGRESS_DATE`,
       to_days((select `G`.`LOGGED_DATE`
                from `emdev`.`TBL_ACTION_REMARK` `G`
                where `G`.`C_ID` = `A`.`C_ID`
                  and `G`.`REMARK_TYPE` = 'CANCELLED'
                limit 1)) -
       to_days(`A`.`CREATED_DATE`)                                                                                    AS `AGING_CANCELLED`,
       (select `G`.`LOGGED_DATE`
        from `emdev`.`TBL_ACTION_REMARK` `G`
        where `G`.`C_ID` = `A`.`C_ID`
          and `G`.`REMARK_TYPE` = 'CANCELLED'
        limit 1)                                                                                                      AS `CANCELLED_DATE`,
       case
           when `B`.`CASE_STATUS` = 70 then to_days(`A`.`CLOSED_DATE`) - to_days(`A`.`CREATED_DATE`)
           when `B`.`CASE_STATUS` = 73 then to_days((select `G`.`LOGGED_DATE`
                                                     from `emdev`.`TBL_ACTION_REMARK` `G`
                                                     where `G`.`C_ID` = `A`.`C_ID`
                                                       and `G`.`REMARK_TYPE` = 'CANCELLED'
                                                     limit 1)) - to_days(`A`.`CREATED_DATE`)
           else to_days(current_timestamp()) - to_days(`A`.`CREATED_DATE`) end                                        AS `AGING`,
       `B`.`RATING`                                                                                                   AS `RATING`,
       ifnull(`B`.`FLAG`, 'COMPLAINT')                                                                                AS `FLAG`,
       `B`.`CKC`                                                                                                      AS `CKC`,
       `B`.`CKC_NUM`                                                                                                  AS `CKC_NUM`,
       `B`.`EXT_SYS_REF`                                                                                              AS `EXT_SYS_REF`,
       `B`.`STAKEHOLDER_REF`                                                                                          AS `STAKEHOLDER_REF`
from (`emdev`.`TBL_CASE` `A`
         join `emdev`.`TBL_CASE_DETAIL` `B` on (`A`.`C_ID` = `B`.`C_ID`))
where case
          when (select `C`.`L_NAME` from `emdev`.`TBL_LOV` `C` where `C`.`L_ID` = `B`.`CASE_STATUS`) = 'NEW'
              then 'UNASSIGNED'
          else (select `C`.`L_NAME` from `emdev`.`TBL_LOV` `C` where `C`.`L_ID` = `B`.`CASE_STATUS`) end not in
      ('CLOSED', 'TO-BE-DELETED', 'CANCELLED');

-- comment on column VW_HERO_REPORTING_OPEN.HERO_CASE_ID not supported: 12D = H-1710170012

-- comment on column VW_HERO_REPORTING_OPEN.RATING not supported: FROM 1 - 10

-- comment on column VW_HERO_REPORTING_OPEN.STAKEHOLDER_REF not supported: RRT,NMO,CSM,NOC

create or replace definer = root@`%` view VW_REPORTING as
select `A`.`CASE_NUM`                                                                                     AS `HERO_CASE_ID`,
       (select `E`.`CUSTOMER_NAME`
        from `emdev`.`TBL_CUSTOMER_PROFILE` `E`
        where `E`.`C_ID` = `A`.`C_ID`)                                                                    AS `CUST_NAME`,
       replace(replace(replace(`B`.`CASE_CONTENT`, '\r', ' '), '\n', ' '), ',',
               ' ')                                                                                       AS `DESCRIPTION`,
       (select `D`.`FULLNAME`
        from `emdev`.`TBL_HERO` `D`
        where `D`.`H_ID` = `A`.`H_ID`)                                                                    AS `HERO_LOGGER`,
       (select `C`.`L_NAME`
        from `emdev`.`TBL_LOV` `C`
        where `C`.`L_ID` = `B`.`AREA_LOCATION`)                                                           AS `AREA_LOCATION`,
       case
           when (select `C`.`L_NAME` from `emdev`.`TBL_LOV` `C` where `C`.`L_ID` = `B`.`CASE_STATUS`) = 'NEW'
               then 'UNASSIGNED'
           else (select `C`.`L_NAME`
                 from `emdev`.`TBL_LOV` `C`
                 where `C`.`L_ID` = `B`.`CASE_STATUS`) end                                                AS `CASE_STATUS`,
       (select `C`.`L_NAME`
        from `emdev`.`TBL_LOV` `C`
        where `C`.`L_ID` = `B`.`CASE_TYPE`)                                                               AS `CASE_TYPE`,
       case
           when (select `E`.`FLAG`
                 from (`emdev`.`TBL_HERO` `D`
                          join `emdev`.`TBL_STAFF` `E`)
                 where `D`.`H_ID` = `A`.`H_ID`
                   and convert(`D`.`EMAIL` using utf8) = `E`.`EMAIL`) = 'VIP' then 'VIP'
           else NULL end                                                                                  AS `VIP`,
       `B`.`PACKAGE_NAME`                                                                                 AS `PACKAGE_NAME`,
       (select `C`.`L_NAME` from `emdev`.`TBL_LOV` `C` where `C`.`L_ID` = `B`.`PRODUCT_NAME`)             AS `PRODUCT`,
       (select `C`.`L_NAME` from `emdev`.`TBL_LOV` `C` where `C`.`L_ID` = `B`.`SEGMENT_ID`)               AS `SEGMENT`,
       (select `D`.`FULLNAME`
        from `emdev`.`TBL_HERO` `D`
        where `D`.`H_ID` = `A`.`OWNER_ID`)                                                                AS `CASE_OWNER`,
       (select `F`.`L_NAME`
        from (`emdev`.`TBL_HERO_PROFILE` `HP`
                 join `emdev`.`TBL_LOV` `F`)
        where `HP`.`H_ID` = `A`.`OWNER_ID`
          and `HP`.`SH_ID` = `F`.`L_ID`)                                                                  AS `GROUP_`,
       `B`.`SR_NUM`                                                                                       AS `SR_NUM`,
       `B`.`TT_NUM`                                                                                       AS `TT_NUM`,
       case
           when `B`.`CASE_STATUS` = 70 then (select replace(replace(replace(`G`.`REMARK`, '\r', ' '), '\n', ' '), ',',
                                                            ' ')
                                             from `emdev`.`TBL_ACTION_REMARK` `G`
                                             where `G`.`C_ID` = `A`.`C_ID`
                                               and `G`.`REMARK_TYPE` = 'CLOSED'
                                             limit 1) end                                                 AS `UPDATE_REMARKS`,
       case
           when `B`.`CASE_STATUS` = 70 then (select `C`.`L_NAME`
                                             from (`emdev`.`TBL_ACTION_REMARK` `G`
                                                      join `emdev`.`TBL_LOV` `C`)
                                             where `G`.`C_ID` = `A`.`C_ID`
                                               and `G`.`CT_ID` = `C`.`L_ID`
                                               and `G`.`REMARK_TYPE` = 'CLOSED'
                                             limit 1) end                                                 AS `CLOSURE_TYPE`,
       `A`.`CREATED_DATE`                                                                                 AS `CREATED_DATE`,
       to_days(`A`.`CLOSED_DATE`) - to_days(`A`.`CREATED_DATE`)                                           AS `AGING_CLOSED`,
       (select `G`.`LOGGED_DATE`
        from `emdev`.`TBL_ACTION_REMARK` `G`
        where `G`.`C_ID` = `A`.`C_ID`
          and `G`.`REMARK_TYPE` = 'CLOSED'
        limit 1)                                                                                          AS `CLOSED_DATE`,
       to_days((select `G`.`LOGGED_DATE`
                from `emdev`.`TBL_ACTION_REMARK` `G`
                where `G`.`C_ID` = `A`.`C_ID`
                  and `G`.`REMARK_TYPE` = 'NEW'
                limit 1)) -
       to_days(`A`.`CREATED_DATE`)                                                                        AS `AGING_UNASSIGNED`,
       (select `G`.`LOGGED_DATE`
        from `emdev`.`TBL_ACTION_REMARK` `G`
        where `G`.`C_ID` = `A`.`C_ID`
          and `G`.`REMARK_TYPE` = 'NEW'
        limit 1)                                                                                          AS `DATE_UNASSIGNED`,
       to_days((select `G`.`LOGGED_DATE`
                from `emdev`.`TBL_ACTION_REMARK` `G`
                where `G`.`C_ID` = `A`.`C_ID`
                  and `G`.`REMARK_TYPE` = 'ASSIGNED'
                limit 1)) -
       to_days(`A`.`CREATED_DATE`)                                                                        AS `AGING_ASSIGNED`,
       (select `G`.`LOGGED_DATE`
        from `emdev`.`TBL_ACTION_REMARK` `G`
        where `G`.`C_ID` = `A`.`C_ID`
          and `G`.`REMARK_TYPE` = 'ASSIGNED'
        limit 1)                                                                                          AS `ASSIGNED_DATE`,
       to_days((select `G`.`LOGGED_DATE`
                from `emdev`.`TBL_ACTION_REMARK` `G`
                where `G`.`C_ID` = `A`.`C_ID`
                  and `G`.`REMARK_TYPE` = 'IN-PROGRESS'
                limit 1)) -
       to_days(`A`.`CREATED_DATE`)                                                                        AS `AGING_INPROGRESS`,
       (select `G`.`LOGGED_DATE`
        from `emdev`.`TBL_ACTION_REMARK` `G`
        where `G`.`C_ID` = `A`.`C_ID`
          and `G`.`REMARK_TYPE` = 'IN-PROGRESS'
        limit 1)                                                                                          AS `INPROGRESS_DATE`,
       to_days((select `G`.`LOGGED_DATE`
                from `emdev`.`TBL_ACTION_REMARK` `G`
                where `G`.`C_ID` = `A`.`C_ID`
                  and `G`.`REMARK_TYPE` = 'CANCELLED'
                limit 1)) -
       to_days(`A`.`CREATED_DATE`)                                                                        AS `AGING_CANCELLED`,
       (select `G`.`LOGGED_DATE`
        from `emdev`.`TBL_ACTION_REMARK` `G`
        where `G`.`C_ID` = `A`.`C_ID`
          and `G`.`REMARK_TYPE` = 'CANCELLED'
        limit 1)                                                                                          AS `CANCELLED_DATE`
from (`emdev`.`TBL_CASE` `A`
         join `emdev`.`TBL_CASE_DETAIL` `B` on (`A`.`C_ID` = `B`.`C_ID`));

create or replace definer = root@`%` view VW_STAFF_LS as
select `emdev`.`TBL_STAFF`.`SID`               AS `SID`,
       `emdev`.`TBL_STAFF`.`PERSONNEL_NO`      AS `PERSONNEL_NO`,
       `emdev`.`TBL_STAFF`.`STAFF_NAME`        AS `STAFF_NAME`,
       `emdev`.`TBL_STAFF`.`STATE`             AS `STATE`,
       `emdev`.`TBL_STAFF`.`EMPGROUP`          AS `EMPLOYEE_GROUP`,
       `emdev`.`TBL_STAFF`.`EMPSGROUP`         AS `EMPLOYEE_SUBGROUP`,
       'null'                                  AS `SU_VIP`,
       'null'                                  AS `VIP_TAG`,
       `emdev`.`TBL_STAFF`.`FLAG`              AS `FLAG`,
       `emdev`.`TBL_STAFF`.`COMPANY_DESC`      AS `COMPANY`,
       `emdev`.`TBL_STAFF`.`DESIGNATION`       AS `DESIGNATION`,
       `emdev`.`TBL_STAFF`.`STAFF_ID`          AS `STAFF_NO`,
       `emdev`.`TBL_STAFF`.`STAFF_LOGIN_ID`    AS `STAFF_ID`,
       `emdev`.`TBL_STAFF`.`CELL_NO`           AS `MOBILE_PHONE_NO`,
       `emdev`.`TBL_STAFF`.`OFFICE_NO`         AS `OFFICE_PHONE_NO`,
       `emdev`.`TBL_STAFF`.`EMAIL`             AS `EMAIL`,
       `emdev`.`TBL_STAFF`.`COMPANY_DESC`      AS `COMPANY_CODE`,
       `emdev`.`TBL_STAFF`.`LOB_DESC`          AS `LOB_DESC`,
       `emdev`.`TBL_STAFF`.`COST_CENTR`        AS `COST_CENTRE`,
       `emdev`.`TBL_STAFF`.`SUB_ORG_UNIT_DESC` AS `UNIT`,
       `emdev`.`TBL_STAFF`.`ORG_UNIT_DESC`     AS `DIVISION`,
       `emdev`.`TBL_STAFF`.`EMPSTATS`          AS `EMPLOYEE_STATUS`,
       `emdev`.`TBL_STAFF`.`SUPERVISOR`        AS `APPROVER_PERSONNEL_NO`
from `emdev`.`TBL_STAFF`;

create or replace definer = root@`%` view VW_STAKEHOLDER_USERS as
select `T1`.`H_TOKEN`           AS `H_TOKEN`,
       `T1`.`FULLNAME`          AS `FULLNAME`,
       `T1`.`ACTIVATION_STATUS` AS `ACTIVATION_STATUS`,
       `T2`.`NICKNAME`          AS `NICKNAME`,
       `T3`.`L_NAME`            AS `STAKEHOLDER_NAME`
from ((`emdev`.`TBL_HERO` `T1` join `emdev`.`TBL_HERO_PROFILE` `T2` on (`T2`.`H_ID` = `T1`.`H_ID` and `T2`.`CATEGORY` = 'STAKEHOLDER'))
         join `emdev`.`TBL_LOV` `T3` on (`T3`.`L_ID` = `T2`.`SH_ID`));

create or replace definer = root@`%` view VW_TELEGRAM_ALERT as
select `T1`.`C_ID`        AS `C_ID`,
       `T1`.`GCHAT`       AS `GCHAT`,
       `T1`.`MESSAGE`     AS `MESSAGE`,
       `T1`.`LOGGED_DATE` AS `LOGGED_DATE`,
       `T2`.`C_TOKEN`     AS `C_TOKEN`,
       `T3`.`SH_ID`       AS `SH_ID`,
       `T4`.`L_NAME`      AS `CASE_STATUS`
from (((`emdev`.`TBL_TELEGRAM_ALERT` `T1` join `emdev`.`TBL_CASE` `T2` on (`T1`.`C_ID` = `T2`.`C_ID`)) join `emdev`.`TBL_CASE_DETAIL` `T3` on (`T2`.`C_ID` = `T3`.`C_ID`))
         left join `emdev`.`TBL_LOV` `T4` on (`T3`.`CASE_STATUS` = `T4`.`L_ID`));

-- comment on column VW_TELEGRAM_ALERT.GCHAT not supported: VIP/SALES/BANJIR/etc

-- comment on column VW_TELEGRAM_ALERT.SH_ID not supported: STAKEHOLDER_ID = L_ID IN TBL_LOV

create or replace definer = root@`%` view VW_TOP10_RANK as
select `T1`.`FULLNAME` AS `FULLNAME`,
       `T2`.`SCORE`    AS `SCORE`,
       `T2`.`LEVEL`    AS `LEVEL`,
       `T2`.`NICKNAME` AS `NICKNAME`,
       `T3`.`PICTURE`  AS `AVATAR_PICTURE`
from ((`emdev`.`TBL_HERO` `T1` join `emdev`.`TBL_HERO_PROFILE` `T2` on (`T1`.`H_ID` = `T2`.`H_ID`))
         left join `emdev`.`TBL_BLOB` `T3` on (`T2`.`B_ID` = `T3`.`B_ID`))
where `T1`.`ACTIVATION_STATUS` = 'Y'
order by `T2`.`SCORE` desc
limit 10;
