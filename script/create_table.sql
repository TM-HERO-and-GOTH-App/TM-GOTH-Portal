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
    TBL_ANNOUNCEMENT int          not null,
    TITLE            varchar(250) null,
    BODY             text         null,
    PICTURE          blob         null,
    G_ID             int          null,
    TAG              varchar(50)  null,
    primary key (TBL_ANNOUNCEMENT)
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

create or replace trigger backup_tbl_case
    before delete
    on TBL_CASE
    for each row
begin
    -- missing source code
end;

create or replace trigger create_new_case
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

create or replace trigger backup_tbl_case_detail
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

create or replace trigger create_new_user
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

create or replace trigger insert_notification_log
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

create or replace trigger update_total_score
    after insert
    on TBL_SCORE
    for each row
begin
    -- missing source code
end;

create or replace trigger update_total_score_if_cancelled
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

# GRANT ALL ON *.* TO 'root'@'%' IDENTIFIED BY 'complex-password';
# FLUSH PRIVILEGES;
