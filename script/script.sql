create
    definer = root@`%` function ACTIVATE_ACCOUNT(email varchar(50), activationKey varchar(6)) returns int(4)
BEGIN

	CALL Activate_Account(email, activationKey, @rowCount);
	RETURN (SELECT @rowCount);

END;

create
    definer = root@`%` procedure Activate_Account(IN iEmail varchar(50), IN activationKey varchar(6), OUT rowCount int)
BEGIN
	
	DECLARE hID INT DEFAULT 0;    

	SELECT 
		H_ID
	INTO hID FROM
		TBL_HERO
	WHERE
		EMAIL = iEmail
			AND ACTIVATION_STATUS = 'N'
	LIMIT 1;

	IF hID > 0 THEN
		
        UPDATE TBL_HERO SET ACTIVATION_STATUS = 'Y'
        WHERE H_ID = hID AND EMAIL = iEmail AND ACTIVATION_KEY = activationKey
        LIMIT 1;
        
        SET rowCount = ROW_COUNT();
        
    END IF;        

END;

create
    definer = root@`%` procedure Bulk_Registration()
BEGIN

	/* 1ST STEP */
    INSERT INTO TBL_HERO(FULLNAME,EMAIL,PASSWORD,ACTIVATION_KEY,ACTIVATION_STATUS,H_GROUP)
	SELECT T1.STAFF_NAME,T1.EMAIL,MD5("123456"),"999999","Y","USER" 
    FROM DB_HERO.TBL_SDZ_STAFF T1
    LEFT OUTER JOIN DB_HERO.TBL_HERO T2 ON T1.EMAIL = T2.EMAIL
    WHERE T1.EMAIL <> '' AND T2.EMAIL IS NULL;
	
	/* 2ND STEP */
	UPDATE DB_HERO.TBL_HERO
	SET H_TOKEN = MD5(EMAIL)
	WHERE ACTIVATION_KEY = '999999';
    
	/* FINAL STEP */
    INSERT INTO TBL_HERO_PROFILE(H_ID,MOBILE_NUM)    
    SELECT T1.H_ID,T3.MOBILE_NUMBER
	FROM DB_HERO.TBL_HERO T1
	LEFT OUTER JOIN DB_HERO.TBL_HERO_PROFILE T2 ON T1.H_ID = T2.H_ID
	JOIN  DB_HERO.TBL_SDZ_STAFF T3 ON T1.EMAIL = T3.EMAIL
	WHERE T2.H_ID IS NULL;


END;

create
    definer = root@`%` function CASE_ASSIGNMENT(cToken varchar(32), hID int, hIDsupport int, shID int(4),
                                                assignmentType varchar(10)) returns int
BEGIN

	CALL Case_Assignment(cToken, hID, hIDsupport, shID, assignmentType, @oAID);

	RETURN (SELECT @oAID);
    
END;

create
    definer = root@`%` function CREATE_FROM_APP(hID int, caseNum varchar(12), caseContent text,
                                                customerName varchar(150), nricNum varchar(50), mobileNum varchar(15),
                                                areaLocationID int(7), flag varchar(15),
                                                sourceID int(4)) returns varchar(32) deterministic reads sql data
BEGIN

	CALL Create_From_App(customerName,nricNum,mobileNum,caseContent,hID,caseNum,areaLocationID,flag,sourceID, @oCToken);
	RETURN (SELECT @oCToken);
    
END;

create
    definer = root@`%` function CREATE_FROM_PORTAL(hID int, caseContent text, customerName varchar(150),
                                                   nricNum varchar(50), mobileNum varchar(15), areaLocationID int(7),
                                                   flag varchar(15), sourceID int(7), subSourceID int(7),
                                                   caseTypeID int(7), stakeholderRef varchar(10),
                                                   extSysRef varchar(50)) returns varchar(32)
    deterministic
    reads sql data
BEGIN

	CALL Create_From_Portal(customerName,nricNum,mobileNum,caseContent,hID,areaLocationID,flag,sourceID,subSourceID,caseTypeID,stakeholderRef,extSysRef, @oCToken);
	RETURN (SELECT @oCToken);
    
END;

create
    definer = root@`%` function CREATE_NEW_CASE(hID int, caseNum varchar(12), caseContent text,
                                                customerName varchar(150), nricNum varchar(50), mobileNum varchar(15),
                                                areaLocation int(7)) returns varchar(32) deterministic reads sql data
BEGIN

	CALL Create_New_Case(customerName, nricNum, mobileNum, caseContent, hID, caseNum, areaLocation, @oCToken);

	RETURN (SELECT @oCToken);
    
END;

create
    definer = root@`%` function CREATE_UUID() returns varchar(40)
BEGIN

	DECLARE md5_string VARCHAR(32);
    DECLARE UUID VARCHAR(40);
    
	SET md5_string = MD5(NOW());
    RETURN CONCAT(SUBSTR(md5_string,1,8),'-',SUBSTR(md5_string,9,4),'-',SUBSTR(md5_string,13,4),'-',SUBSTR(md5_string,17,4),'-',SUBSTR(md5_string,21,12),'-',ROUND(RAND() * (999-100) + 100));
        
END;

create
    definer = root@`%` procedure Case_Assignment(IN cToken varchar(32), IN hID int, IN hIDsupport int, IN shID int(4),
                                                 IN assignmentType varchar(10), OUT oRowCount int(4)) modifies sql data
BEGIN

    DECLARE cID,self_shID,caseType,productName,areaLocation,totalChat,aID INT DEFAULT 0;
    DECLARE caseStatus INT;
	DECLARE msg VARCHAR(250);
    DECLARE caseNum,srNum VARCHAR(15);
    DECLARE proceed BOOL DEFAULT TRUE;

    DECLARE isAdmin,isStakeholderAdmin,isStakeholder,isStakeholderCoordinator BOOL DEFAULT FALSE;
    
    SET isAdmin = IS_REQUESTOR_ADMIN(hID);
    SET isStakeholderAdmin = IS_STAKEHOLDER_ADMIN(hID,shID);    
    SET isStakeholderCoordinator = IS_STAKEHOLDER_COORDINATOR(hID,shID);    
    SET isStakeholder = IS_REQUESTOR_STAKEHOLDER(hID);

	/* COMPULSORY INPUTS CHECKED IF CASE ASSIGNMENT TO SALES TASK FORCE TEAM */
    IF shID = 413 THEN
		
		SELECT T1.C_ID,T2.CASE_TYPE,T2.PRODUCT_NAME,T2.SR_NUM,T2.AREA_LOCATION 
		INTO cID,caseType,productName,srNum,areaLocation 
		FROM TBL_CASE T1
		INNER JOIN TBL_CASE_DETAIL T2 ON T1.C_ID = T2.C_ID
		WHERE T1.C_TOKEN = cToken 
		LIMIT 1;

		SELECT COUNT(MB_ID) AS TOTAL INTO totalChat
		FROM TBL_MESSAGE_BOX
		WHERE C_ID = cID
		LIMIT 1;
        
		SET proceed = false;
		IF caseType <> 0 AND productName <> 0 AND areaLocation <> 0 AND srNum <> "" AND totalChat <> 0 THEN
			SET proceed = true;
		END IF;
        
	END IF;
	/* END */

    IF isStakeholder OR isStakeholderCoordinator OR isAdmin OR isStakeholderAdmin THEN

		SELECT C_ID,CASE_NUM INTO cID,caseNum FROM TBL_CASE WHERE C_TOKEN = cToken LIMIT 1;
		SELECT SH_ID INTO self_shID FROM TBL_HERO_PROFILE WHERE H_ID = hID LIMIT 1;
		
        IF assignmentType = "SELF" THEN
			SET shID = self_shID;
        END IF;
        IF proceed THEN
			INSERT INTO TBL_ASSIGNMENT_LOG (C_ID, H_ID, H_ID_SUPPORT, SH_ID, AL_TYPE) 
			VALUES (cID, hID, hIDsupport, shID, assignmentType);
			SET aID = LAST_INSERT_ID();
		END IF;
        
		IF aID = 0 THEN
        
			SET oRowCount = 0;
            
        ELSE
					
			IF assignmentType = "TRANSFER" THEN
				
                IF isStakeholderCoordinator OR isAdmin OR isStakeholderAdmin THEN
					UPDATE TBL_CASE SET OWNER_ID = 0, OWNER_ID_SUPPORT = 0  WHERE C_ID = cID LIMIT 1;
					UPDATE TBL_CASE_DETAIL SET SH_ID = shID WHERE C_ID = cID LIMIT 1;
				END IF;
				
			ELSEIF assignmentType = "SELF" THEN
				
                SELECT L_ID INTO caseStatus FROM TBL_LOV
                WHERE L_GROUP = 'CASE-STATUS' AND L_NAME = 'ASSIGNED' 
                LIMIT 1;                                
				
				SELECT MESSAGE INTO msg FROM TBL_NOTIFICATION_TEMPLATE
				WHERE CONTROLLER = 'CASE' AND TEMPLATE = caseStatus LIMIT 1;

				INSERT INTO TBL_NOTIFICATION (H_ID, C_ID, MESSAGE, FLAG) 
				VALUES (hID, cID, REPLACE(msg,'{CASENUM}',caseNum), 'CASE');

				UPDATE TBL_CASE SET OWNER_ID = hID WHERE C_ID = cID LIMIT 1;
				UPDATE TBL_CASE_DETAIL SET SH_ID = shID, CASE_STATUS = caseStatus WHERE C_ID = cID LIMIT 1;
				
				
			ELSE 
				
				IF isStakeholderCoordinator OR isAdmin OR isStakeholderAdmin THEN
                
					SELECT CASE_STATUS INTO caseStatus FROM TBL_CASE_DETAIL WHERE C_ID = cID LIMIT 1;
					IF caseStatus = 0 OR caseStatus = 61 THEN
						SET caseStatus = 64;
                    END IF;                    
						
					UPDATE TBL_CASE SET OWNER_ID = hIDsupport, OWNER_ID_SUPPORT = hIDsupport 
					WHERE C_ID = cID LIMIT 1;    
					UPDATE TBL_CASE_DETAIL SET SH_ID = shID, CASE_STATUS = caseStatus WHERE C_ID = cID LIMIT 1;
                    
                END IF;
                
			END IF;
			
			SET oRowCount = ROW_COUNT();
		
			IF oRowCount = 0 THEN
				DELETE FROM TBL_ASSIGNMENT_LOG WHERE AL_ID = aID LIMIT 1;
			END IF;
		
		END IF;
	
    ELSE
    
		SET oRowCount = 0;
        
	END IF;
    
END;

create
    definer = root@`%` procedure Create_From_App(IN pCustomerName varchar(150), IN pNricNum varchar(150),
                                                 IN pMobileNum varchar(150), IN pCaseContent text, IN pHID int,
                                                 IN pCaseNum varchar(40), IN areaLocationID int(7),
                                                 IN iFlag varchar(15), IN sourceID int(7), OUT oCToken varchar(32))
    modifies sql data
this_proc:BEGIN

   DECLARE cID,oID,shID,cdID,cpID,score,dd,mm,caseType,heroID INT DEFAULT 0;
   DECLARE caseStatusID INT DEFAULT 61;
   DECLARE success BOOL;
   /*DECLARE nFlag VARCHAR(15) DEFAULT 'COMPLAINT';*/
   DECLARE cToken,cDate,tpl,serviceID VARCHAR(32) DEFAULT '';
   DECLARE vipName,vip1Name,loggerFlag,loggerName,stateName VARCHAR(255) DEFAULT '';
   DECLARE chatMsg,salesChatMsg,telegramMessage VARCHAR(500) DEFAULT '';

   /* unblock from HERO Buddy */
   IF sourceID <> 494 THEN
	   SET oCTOKEN = '';
	   LEAVE this_proc;
   END IF;
   
   /* abort if STATE not defined */
   IF areaLocationID = 0 THEN
	   LEAVE this_proc;
   END IF;
   
   
   
   SET iFlag = REDEFINED_FLAG(pCaseContent);
   /*SET iFlag = nFlag;*/
   
   IF iFlag = "SALES" THEN
	   IF LOCATE('#event',pCaseContent) > 0 THEN
		  SET pCaseNum = CONCAT("E-",CONCAT(SUBSTR(REPLACE(CURDATE(),"-",""),3,6),FLOOR( 1000 + ( RAND() *8999 ))));
          SET shID = 598;       
	   ELSE
		  SET pCaseNum = CONCAT("S-",CONCAT(SUBSTR(REPLACE(CURDATE(),"-",""),3,6),FLOOR( 1000 + ( RAND() *8999 ))));
          SET shID = 407;
	   END IF;
       
	   SET caseType = 419;        
        
   ELSEIF iFlag = "PROTECT" THEN
		SET pCaseNum = CONCAT("P-",CONCAT(SUBSTR(REPLACE(CURDATE(),"-",""),3,6),FLOOR( 1000 + ( RAND() *8999 ))));
        SET caseType = 542;
   ELSEIF iFlag = "DRUNIFI" THEN
		SET pCaseNum = CONCAT("D-",CONCAT(SUBSTR(REPLACE(CURDATE(),"-",""),3,6),FLOOR( 1000 + ( RAND() *8999 ))));
        SET caseType = 557;
        SET shID = 554;
   ELSE
		SET pCaseNum = CONCAT("H-",CONCAT(SUBSTR(REPLACE(CURDATE(),"-",""),3,6),FLOOR( 1000 + ( RAND() *8999 ))));	        
   END IF;

   IF LOCATE('#serviceID#',pNricNum) > 0 THEN
      SET serviceID = SUBSTR(pNricNum, 12, 30); 
      SET pNricNum = '';
   END IF;
    
   IF areaLocationID <> 0 THEN
	   SET oID = RPA_CASE_ASSIGNMENT(iFlag,areaLocationID,pCaseContent);
       IF oID > 0 THEN
			SET caseStatusID = 64;
       END IF;
       /* ROT Pilot
       IF iFlag = "COMPLAINT" AND (areaLocationID = 124 OR areaLocationID = 145) THEN
	       SET shID = 16;
           SET caseStatusID = 61;
       END IF;*/
   END IF;
   
   INSERT INTO TBL_CASE (H_ID,CASE_NUM,OWNER_ID) VALUES (pHID,pCaseNum,oID);
   SET cID = LAST_INSERT_ID();   
   
   IF 0 = shID THEN
       SET shID = RUN_RPA_FEB(pHID,oID,areaLocationID,pCaseContent);
   END IF;
   
   IF cID > 0 THEN

       IF sourceID = 0 THEN
			/* from APP */
			SET sourceID = 284;
       END IF;
		
       INSERT INTO TBL_CASE_DETAIL (C_ID,SH_ID,CASE_TYPE,CASE_CONTENT,CASE_STATUS,SERVICE_ID,AREA_LOCATION,FLAG,SOURCE_ID) 
       VALUES (cID,shID,caseType,pCaseContent,caseStatusID,serviceID,areaLocationID,iFlag,sourceID);   
       SET cdID = LAST_INSERT_ID();   
       
	   IF cdID > 0 THEN
       
		   INSERT INTO TBL_CUSTOMER_PROFILE (C_ID,CUSTOMER_NAME,NRIC_NUM,MOBILE_NUM)
		   VALUES (cID, pCustomerName, pNricNum, pMobileNum);
		   SET cpID = LAST_INSERT_ID();   
           
           IF cpID = 0 THEN				
                SET success = FALSE;
		   END IF;
           
       ELSE 
          SET success = FALSE;
       END IF;
       
   ELSE
	  SET success = FALSE;
   END IF;   
   
	IF success = FALSE THEN
		DELETE FROM TBL_CASE WHERE C_ID = cID LIMIT 1;
		DELETE FROM TBL_CUSTOMER_PROFILE WHERE CP_ID = cpID LIMIT 1;
		DELETE FROM TBL_CASE_DETAIL WHERE CD_ID = cdID LIMIT 1;
	ELSE 
		
        SELECT UPPER(FULLNAME) INTO loggerName FROM TBL_HERO WHERE H_ID = pHID LIMIT 1;
        SELECT C_TOKEN,CREATED_DATE INTO cToken,cDate FROM TBL_CASE WHERE C_ID = cID LIMIT 1;
        SELECT UPPER(L_NAME) INTO stateName FROM TBL_LOV WHERE L_ID = areaLocationID LIMIT 1;
        
        SET score = 10;
        INSERT INTO TBL_SCORE (H_ID, C_ID, SCORE, STATUS) VALUES (pHID, cID, score, 'CREATED');        

        /*SET loggerFlag = WHO_IS_LOGGER(pHID);
        IF loggerFlag = 'AGM' THEN			
			SET telegramMessage = GET_TELEGRAM_MESSAGE(pCaseNum,loggerName,loggerName,cDate,'AGM');
        END IF; */
		SET vipName = IS_LOGGER_VIP(pHID);
		/*SET vip1Name = IS_LOGGER_VIP1(pHID);*/

        IF iFlag = 'SALES' THEN			
			
            IF vipName <> '' THEN
				SET telegramMessage = GET_TELEGRAM_MESSAGE(pCaseNum,vipName,'',cDate,'VIP-SALES');
			ELSE
				SET telegramMessage = GET_TELEGRAM_MESSAGE(pCaseNum,loggerName,'',cDate,'SALES');            
            END IF;
            
            /* CNY */
            SET dd = DAY(CURRENT_TIMESTAMP);
            SET mm = MONTH(CURRENT_TIMESTAMP);
            IF 2 = mm AND dd > 1 AND dd < 11 THEN
				/*SET tpl = 'HARI-RAYA';*/
                SET tpl = 'SALES-LEAD';
			ELSE
				SET tpl = 'SALES-LEAD';
            END IF;
            
			SELECT MESSAGE INTO salesChatMsg FROM TBL_NOTIFICATION_TEMPLATE
			WHERE CONTROLLER = 'APP' AND TEMPLATE = tpl
			LIMIT 1;
            
			INSERT INTO TBL_MESSAGE_BOX (C_ID,H_ID,B_ID,MESSAGE,FLAG) VALUES (cID, 8240, 0, salesChatMsg, 'FE');            
            
		ELSE
						
			IF vipName <> '' THEN
				SET telegramMessage = GET_TELEGRAM_MESSAGE(pCaseNum,vipName,'',cDate,'VIP1');
			/*ELSEIF vipName <> '' THEN
				SET telegramMessage = GET_TELEGRAM_MESSAGE(pCaseNum,vipName,stateName,cDate,'VIP2');*/
			ELSE
				SET telegramMessage = '';
			END IF;
            
            /* CNY */
            SET dd = DAY(CURRENT_TIMESTAMP);
            SET mm = MONTH(CURRENT_TIMESTAMP);
            /*IF 2 = mm AND dd > 1 AND dd < 11 THEN
				SET tpl = 'HARI-RAYA';
			ELSE
				SET tpl = 'CASE-CREATED';
            END IF;*/
            SET tpl = 'CASE-CREATED';
			SELECT MESSAGE INTO chatMsg FROM TBL_NOTIFICATION_TEMPLATE
			WHERE CONTROLLER = 'APP' AND TEMPLATE = tpl
			LIMIT 1;
			SET chatMsg = REPLACE(chatMsg,'{CASENUM}',pCaseNum);
            
			INSERT INTO TBL_MESSAGE_BOX (C_ID,H_ID,B_ID,MESSAGE,FLAG) VALUES (cID, 22, 0, chatMsg, 'FE');            
        
        END IF;        
        
	END IF;

	SET oCTOKEN = cToken;

END;

create
    definer = root@`%` procedure Create_From_Portal(IN pCustomerName varchar(150), IN pNricNum varchar(150),
                                                    IN pMobileNum varchar(150), IN pCaseContent text, IN pHID int(7),
                                                    IN areaLocationID int(7), IN iFlag varchar(15), IN sourceID int(7),
                                                    IN subSourceID int(7), IN caseTypeID int(7),
                                                    IN stakeholderRef varchar(10), IN extSysRef varchar(50),
                                                    OUT oCToken varchar(32)) modifies sql data
this_proc:BEGIN

   DECLARE cID,oID,shID,cdID,cpID,score,caseType INT DEFAULT 0;
   DECLARE caseStatusID INT DEFAULT 61;
   DECLARE success BOOL;
   DECLARE nFlag VARCHAR(15) DEFAULT 'COMPLAINT';
   DECLARE cToken,cDate,serviceID,pCaseNum VARCHAR(32) DEFAULT '';
   DECLARE vipName VARCHAR(255) DEFAULT '';
   DECLARE chatMsg,telegramMessage VARCHAR(500) DEFAULT '';

   /* abort if STATE not defined */
   IF areaLocationID = 0 THEN
	   LEAVE this_proc;
   END IF;
   
   /* re-defined */
   SET iFlag = REDEFINED_FLAG(pCaseContent);
   /*IF nFlag <> "COMPLAINT" THEN
		SET iFlag = nFlag;
   END IF;*/
   IF iFlag = "SALES" OR caseTypeID = 419 THEN
	   IF LOCATE('#event',pCaseContent) > 0 THEN
		  SET pCaseNum = CONCAT("E-",CONCAT(SUBSTR(REPLACE(CURDATE(),"-",""),3,6),FLOOR( 1000 + ( RAND() *8999 ))));
          SET shID = 598;       
	   ELSE
		  SET pCaseNum = CONCAT("S-",CONCAT(SUBSTR(REPLACE(CURDATE(),"-",""),3,6),FLOOR( 1000 + ( RAND() *8999 ))));
          SET shID = 407;
	   END IF;
   
   ELSEIF iFlag = "PROTECT" OR caseTypeID = 542 THEN
		SET pCaseNum = CONCAT("P-",CONCAT(SUBSTR(REPLACE(CURDATE(),"-",""),3,6),FLOOR( 1000 + ( RAND() *8999 ))));
   ELSEIF iFlag = "DRUNIFI" OR caseTypeID = 557 THEN
		SET pCaseNum = CONCAT("D-",CONCAT(SUBSTR(REPLACE(CURDATE(),"-",""),3,6),FLOOR( 1000 + ( RAND() *8999 ))));
        SET shID = 554;
   ELSE
		SET pCaseNum = CONCAT("H-",CONCAT(SUBSTR(REPLACE(CURDATE(),"-",""),3,6),FLOOR( 1000 + ( RAND() *8999 ))));	        
   END IF;

   IF LOCATE('#serviceID#',pNricNum) > 0 THEN
      SET serviceID = SUBSTR(pNricNum, 12, 30); 
      SET pNricNum = '';
   END IF;

   IF areaLocationID <> 0 THEN
	   SET oID = RPA_CASE_ASSIGNMENT(iFlag,areaLocationID,pCaseContent);
       IF oID > 0 THEN
			SET caseStatusID = 64;
       END IF;
       /* ROT Pilot
       IF iFlag = "COMPLAINT" AND (areaLocationID = 124 OR areaLocationID = 145) THEN
	       SET shID = 16;
           SET caseStatusID = 61;
       END IF;*/
   END IF;
   
   INSERT INTO TBL_CASE (H_ID,CASE_NUM,OWNER_ID) VALUES (pHID,pCaseNum,oID);
   SET cID = LAST_INSERT_ID();   
   
   IF 0 = shID THEN
       SET shID = RUN_RPA_FEB(pHID,oID,areaLocationID,pCaseContent);
   END IF;
   
   IF cID > 0 THEN

       IF sourceID = 0 THEN
			/* from APP */
			SET sourceID = 284;
       END IF;
		
       INSERT INTO TBL_CASE_DETAIL (C_ID,SH_ID,CASE_TYPE,CASE_CONTENT,CASE_STATUS,SERVICE_ID,AREA_LOCATION,FLAG,SOURCE_ID,SUB_SOURCE_ID,EXT_SYS_REF,STAKEHOLDER_REF) 
       VALUES (cID,shID,caseTypeID,pCaseContent,caseStatusID,serviceID,areaLocationID,iFlag,sourceID,subSourceID,extSysRef,stakeholderRef);   
       SET cdID = LAST_INSERT_ID();   
       
	   IF cdID > 0 THEN
       
		   INSERT INTO TBL_CUSTOMER_PROFILE (C_ID,CUSTOMER_NAME,NRIC_NUM,MOBILE_NUM)
		   VALUES (cID, pCustomerName, pNricNum, pMobileNum);
		   SET cpID = LAST_INSERT_ID();   
           
           IF cpID = 0 THEN				
                SET success = FALSE;
		   END IF;
           
       ELSE 
          SET success = FALSE;
       END IF;
       
   ELSE
	  SET success = FALSE;
   END IF;   
   
	IF success = FALSE THEN
		DELETE FROM TBL_CASE WHERE C_ID = cID LIMIT 1;
		DELETE FROM TBL_CUSTOMER_PROFILE WHERE CP_ID = cpID LIMIT 1;
		DELETE FROM TBL_CASE_DETAIL WHERE CD_ID = cdID LIMIT 1;
	ELSE 
		
        SELECT C_TOKEN,CREATED_DATE INTO cToken,cDate FROM TBL_CASE WHERE C_ID = cID LIMIT 1;
        
        SET score = 10;
        INSERT INTO TBL_SCORE (H_ID, C_ID, SCORE, STATUS) VALUES (pHID, cID, score, 'CREATED');
        
        SET vipName = IS_LOGGER_VIP(pHID);
        IF vipName <> '' THEN
			SET telegramMessage = GET_TELEGRAM_MESSAGE(pCaseNum,vipName,'',cDate,'VIP');
        END IF;
        
        /* auto-insert the default chat msg upon case created */
		SELECT MESSAGE INTO chatMsg FROM TBL_NOTIFICATION_TEMPLATE
		WHERE CONTROLLER = 'APP' AND TEMPLATE = 'CASE-CREATED'
		LIMIT 1;
		SET chatMsg = REPLACE(chatMsg,'{CASENUM}',pCaseNum);
		
		INSERT INTO TBL_MESSAGE_BOX (C_ID,H_ID,B_ID,MESSAGE,FLAG) VALUES (cID, 7, 0, chatMsg, 'FE');            
        
	END IF;

	SET oCTOKEN = cToken;

END;

create
    definer = root@`%` procedure Create_New_Case(IN pCustomerName varchar(150), IN pNricNum varchar(150),
                                                 IN pMobileNum varchar(150), IN pCaseContent text, IN pHID int,
                                                 IN pCaseNum varchar(40), IN areaLocation int(7),
                                                 OUT oCToken varchar(32)) modifies sql data
this_proc:BEGIN

   DECLARE cID,oID,shID,cdID,cpID,score,dd,mm,caseType INT DEFAULT 0;
   DECLARE caseStatusID INT DEFAULT 61;
   DECLARE success BOOL;
   DECLARE cToken,cDate,iFlag,tpl,serviceID VARCHAR(32) DEFAULT '';
   DECLARE vipName,loggerFlag,loggerName VARCHAR(255) DEFAULT '';
   DECLARE chatMsg,salesChatMsg,telegramMessage VARCHAR(500) DEFAULT '';

   SET oCTOKEN = '';
   LEAVE this_proc;
   
   
   /* abort if STATE not defined */
   IF areaLocation = 0 THEN
	   LEAVE this_proc;
   END IF;
   /* block for HERO Buddy */
   /*IF sourceID = 494 THEN
	   LEAVE this_proc; 
   END IF;*/
   
   INSERT INTO TBL_CASE (H_ID,CASE_NUM) VALUES (pHID, pCaseNum);
   SET cID = LAST_INSERT_ID();

   SET loggerFlag = WHO_IS_LOGGER(pHID);
   
   SET iFlag = REDEFINED_FLAG(pCaseContent);
   IF iFlag = "SALES" THEN
	   IF LOCATE('#event',pCaseContent) > 0 THEN
		  SET pCaseNum = CONCAT("E-",CONCAT(SUBSTR(REPLACE(CURDATE(),"-",""),3,6),FLOOR( 1000 + ( RAND() *8999 ))));
          SET shID = 598;       
	   ELSE
		  SET pCaseNum = CONCAT("S-",CONCAT(SUBSTR(REPLACE(CURDATE(),"-",""),3,6),FLOOR( 1000 + ( RAND() *8999 ))));
          SET shID = 407;
	   END IF;
	   SET caseType = 419;                
   ELSEIF iFlag = "PROTECT" THEN
		SET pCaseNum = CONCAT("P-",CONCAT(SUBSTR(REPLACE(CURDATE(),"-",""),3,6),FLOOR( 1000 + ( RAND() *8999 ))));
        SET caseType = 542;
   ELSEIF iFlag = "DRUNIFI" THEN
		SET pCaseNum = CONCAT("D-",CONCAT(SUBSTR(REPLACE(CURDATE(),"-",""),3,6),FLOOR( 1000 + ( RAND() *8999 ))));
        SET caseType = 557;        
        SET shID = 554;
   ELSE
		SET pCaseNum = CONCAT("H-",CONCAT(SUBSTR(REPLACE(CURDATE(),"-",""),3,6),FLOOR( 1000 + ( RAND() *8999 ))));	        
   END IF;

   IF LOCATE('#serviceID#',pNricNum) > 0 THEN
      SET serviceID = SUBSTR(pNricNum, 12, 30); 
      SET pNricNum = '';
   END IF;
   
   /* ROT Pilot
   IF areaLocation <> 0 THEN       
       IF iFlag = "COMPLAINT" AND (areaLocation = 124 OR areaLocation = 145) THEN
	       SET shID = 16;
           SET caseStatusID = 61;
       END IF;       
   END IF;*/
   
   IF 0 = shID THEN
      SET shID = RUN_RPA_FEB(pHID,oID,areaLocation,pCaseContent);
	  /*SET shID = 16;*/
   END IF;
   IF loggerFlag = 'AGM' THEN				
		SET shID = 13; /* override value (assign to RRT) */
   END IF;           	
   
   IF cID > 0 THEN
   
       INSERT INTO TBL_CASE_DETAIL (C_ID,SH_ID,CASE_TYPE,CASE_CONTENT,CASE_STATUS,SERVICE_ID,AREA_LOCATION) 
       VALUES (cID,shID,caseType,pCaseContent,caseStatusID,serviceID,areaLocation);   
       SET cdID = LAST_INSERT_ID();   
       
	   IF cdID > 0 THEN
       
		   INSERT INTO TBL_CUSTOMER_PROFILE (C_ID,CUSTOMER_NAME,NRIC_NUM,MOBILE_NUM)
		   VALUES (cID, pCustomerName, pNricNum, pMobileNum);
		   SET cpID = LAST_INSERT_ID();   
           
           IF cpID = 0 THEN				
                SET success = FALSE;
		   END IF;
           
       ELSE 
          SET success = FALSE;
       END IF;
       
   ELSE
	  SET success = FALSE;
   END IF;   
   
	IF success = FALSE THEN
		DELETE FROM TBL_CASE WHERE C_ID = cID LIMIT 1;
		DELETE FROM TBL_CUSTOMER_PROFILE WHERE CP_ID = cpID LIMIT 1;
		DELETE FROM TBL_CASE_DETAIL WHERE CD_ID = cdID LIMIT 1;
	ELSE 
		
        SELECT FULLNAME INTO loggerName FROM TBL_HERO WHERE H_ID = pHID LIMIT 1;
        SELECT C_TOKEN,CREATED_DATE INTO cToken,cDate FROM TBL_CASE WHERE C_ID = cID LIMIT 1;
        
        SET score = 10;
        INSERT INTO TBL_SCORE (H_ID, C_ID, SCORE, STATUS) VALUES (pHID, cID, score, 'CREATED');
        
        SET vipName = IS_LOGGER_VIP(pHID);
        IF vipName <> '' THEN
			SET telegramMessage = GET_TELEGRAM_MESSAGE(pCaseNum,vipName,'',cDate,'VIP');
        END IF;
        
        IF loggerFlag = 'AGM' THEN			
			SET telegramMessage = GET_TELEGRAM_MESSAGE(pCaseNum,loggerName,loggerName,cDate,'AGM');
        END IF;        
        
        IF iFlag = 'SALES' THEN			
			
            /*SET telegramMessage = GET_TELEGRAM_MESSAGE(pCaseNum,loggerName,'',cDate,'SALES');*/
            
            /* CNY */
            SET dd = DAY(CURRENT_TIMESTAMP);
            SET mm = MONTH(CURRENT_TIMESTAMP);
            IF 2 = mm AND dd > 1 AND dd < 7 THEN
				SET tpl = 'HARI-RAYA';
			ELSE
				SET tpl = 'SALES-LEAD';
            END IF;
            
			SELECT MESSAGE INTO salesChatMsg FROM TBL_NOTIFICATION_TEMPLATE
			WHERE CONTROLLER = 'APP' AND TEMPLATE = tpl
			LIMIT 1;
            
			INSERT INTO TBL_MESSAGE_BOX (C_ID,H_ID,B_ID,MESSAGE,FLAG) VALUES (cID, 8240, 0, salesChatMsg, 'FE');            
            
		ELSE
			
            /* CNY */
            SET dd = DAY(CURRENT_TIMESTAMP);
            SET mm = MONTH(CURRENT_TIMESTAMP);
            /*IF 2 = mm AND dd > 1 AND dd < 7 THEN
				SET tpl = 'HARI-RAYA';
			ELSE
				SET tpl = 'CASE-CREATED';
            END IF;*/
            SET tpl = 'CASE-CREATED';
			SELECT MESSAGE INTO chatMsg FROM TBL_NOTIFICATION_TEMPLATE
			WHERE CONTROLLER = 'APP' AND TEMPLATE = tpl
			LIMIT 1;
			SET chatMsg = REPLACE(chatMsg,'{CASENUM}',pCaseNum);
            
			INSERT INTO TBL_MESSAGE_BOX (C_ID,H_ID,B_ID,MESSAGE,FLAG) VALUES (cID, 22, 0, chatMsg, 'FE');            
        
        END IF;                     
        
	END IF;

	SET oCTOKEN = cToken;

END;

create
    definer = root@`%` function DELETE_ACTION_REMARK(hID int, cToken varchar(32), aID int) returns int(4)
    deterministic
    reads sql data
BEGIN

	CALL Delete_Action_Remark(hID,cToken,aID, @rowCount);

	RETURN (SELECT @rowCount);

END;

create
    definer = root@`%` procedure Delete_Action_Remark(IN hID int, IN cToken varchar(32), IN aID int, OUT oRowCount int(4))
    modifies sql data
BEGIN

    DECLARE cID,shID,rowCount INT DEFAULT 0;
    DECLARE isStakeholderAdmin BOOL DEFAULT FALSE;
    
    SELECT SH_ID INTO shID FROM TBL_HERO_PROFILE WHERE H_ID = hID AND CATEGORY = 'STAKEHOLDER' LIMIT 1;
    
    SET isStakeholderAdmin = IS_STAKEHOLDER_ADMIN(hID,shID);    

    IF isStakeholderAdmin THEN

		SELECT C_ID INTO cID FROM TBL_CASE WHERE C_TOKEN = cToken LIMIT 1;
        
        IF cID <> 0 AND aID <> 0 THEN
			DELETE FROM TBL_ACTION_REMARK
			WHERE AR_ID = aID AND C_ID = cID
			LIMIT 1;			
			SET rowCount = ROW_COUNT();
		END IF;
        
	END IF;
	
    SET oRowCount = rowCount;

END;

create
    definer = root@`%` function GENERATE_CASE_NUM() returns int deterministic reads sql data
BEGIN
    
	/*DECLARE today VARCHAR(10);
	SET today  = REPLACE(CURDATE(),"-","");    
	RETURN CONCAT(SUBSTR(today,3,6),FLOOR(1000+ RAND()*9999));*/
    
    DECLARE newCaseNum VARCHAR(10) DEFAULT '';
	WHILE newCaseNum = '' DO
		
		CALL Generate_Case_Num(@caseNum);
        SET newCaseNum = (SELECT @caseNum);
    
    END WHILE;
    
    RETURN (SELECT @caseNum);    
    
END;

create
    definer = root@`%` function GET_AGING(date1 datetime, date2 datetime) returns varchar(10)
    deterministic
    reads sql data
BEGIN
    
    RETURN CONCAT(TIMESTAMPDIFF(DAY,date1,date2), ':', MOD( TIMESTAMPDIFF(HOUR,date1,date2), 24));
    
END;

create
    definer = root@`%` function GET_AGING_WEEKDAYS(date1 datetime, date2 datetime) returns int
    deterministic
    reads sql data
BEGIN

	/*RETURN TIMESTAMPDIFF(HOUR, date1, date2);*/
    RETURN DATEDIFF(date2, date1);
    
    /*
    RETURN ABS(DATEDIFF(date2, date1)) - ABS(DATEDIFF(ADDDATE(date2, INTERVAL 1 - DAYOFWEEK(date2) DAY), ADDDATE(date1, INTERVAL 1 - DAYOFWEEK(date1) DAY))) / 7 * 2 - (DAYOFWEEK(IF(date1 < date2, date1, date2)) = 1) - (DAYOFWEEK(IF(date1 > date2, date1, date2)) = 7) + (CASE WHEN (WEEKDAY(date1) = 5 OR WEEKDAY(date1) = 6) THEN 1 ELSE 0 END)
    */
    
END;

create
    definer = root@`%` function GET_AUTHENTICATION_TOKEN(apiKey varchar(40), email varchar(50)) returns varchar(40)
BEGIN

	CALL Get_Authentication_Token(apiKey,email, @oToken);
	RETURN (SELECT @oToken);

END;

create
    definer = root@`%` function GET_LATEST_NOTIFICATION(hID int) returns varchar(250)
BEGIN
	
	CALL Get_Latest_Notification(hID, @oMessage);
	RETURN (SELECT @oMessage);

END;

create
    definer = root@`%` function GET_NOTIFICATION_TEMPLATE(caseNum varchar(32), caseStatus varchar(12),
                                                          controller varchar(15),
                                                          message varchar(250)) returns varchar(250)
BEGIN
	
	DECLARE header VARCHAR(20);
	DECLARE msg VARCHAR(250);
    
    IF controller = "Case" THEN

		SET header = "Case Updates: ";
        
		IF caseStatus = "NEW" THEN
			SET msg = "has been successfully created!";
		ELSEIF caseStatus = "IN-PROGRESS" THEN
			SET msg = "is in progress. Go to Case Action Remark for the detail updates.";
		ELSEIF caseStatus = "ACKNOWLEDGED" THEN
			SET msg = "is being attended by HERO Support Team. Stay tune!";
		ELSEIF caseStatus = "CLOSED" THEN
			SET msg = "has been successfully closed!";
		ELSE
			SET msg = "has been cancelled!";    
		END IF;
	
    ELSEIF controller = "Chat" THEN
		SET header = "Chat Updates: ";    
		SET msg = message;    
    ELSE 
		SET msg = "";
    END IF;
    
	RETURN CONCAT(header,'(', caseNum,'): ', msg);

END;

create
    definer = root@`%` function GET_TELEGRAM_MESSAGE(caseNum varchar(32), loggerFull varchar(250),
                                                     stateName varchar(100), iDate varchar(30),
                                                     gChat varchar(20)) returns varchar(500)
    deterministic
    reads sql data
BEGIN

	CALL Get_Telegram_Message(caseNum,loggerFull,stateName,iDate,gChat, @oMessage);
	RETURN (SELECT @oMessage);

END;

create
    definer = root@`%` function GET_TOTAL_CASE_RESOLVED_PERFORMANCE(hID int, category varchar(10),
                                                                    startDate varchar(10),
                                                                    endDate varchar(10)) returns int(4)
    deterministic
    reads sql data
BEGIN
	
    DECLARE shID INT DEFAULT 0;    
	
	IF category = "GROUP" THEN
    
		SELECT SH_ID INTO shID FROM TBL_HERO_PROFILE WHERE H_ID = hID LIMIT 1;   
    
		CALL Get_Total_Case_Resolved_Group_Performance(shID,startDate,endDate, @total);
        
    ELSE
    
		CALL Get_Total_Case_Resolved_Agent_Performance(hID,startDate,endDate, @total);
        
    END IF;
    
    RETURN (SELECT @total);

END;

create
    definer = root@`%` function GET_TOTAL_RESOLVED_BY_AGENT(oID int, days int(2)) returns int(4)
BEGIN

	CALL Get_Total_Resolved_By_Agent(oID, days, @oTotal);
	RETURN (SELECT @oTotal);

END;

create
    definer = root@`%` function GET_TOTAL_RESOLVED_BY_GROUP(shID int, days int(2)) returns int(4)
BEGIN

	IF shID = 0 THEN
		CALL Get_Total_Resolved_Nationwide(days, @oTotal);
    ELSE
		CALL Get_Total_Resolved_By_Group(shID, days, @oTotal);
    END IF;
    
	RETURN (SELECT @oTotal);

END;

create
    definer = root@`%` function GET_VOC_RESULT(hID int, category varchar(10), startDate varchar(10),
                                               endDate varchar(10)) returns varchar(15) deterministic reads sql data
BEGIN

	CALL Get_VOC_Result(hID,category,startDate,endDate, @result);
    RETURN (SELECT @result);

END;

create
    definer = root@`%` procedure Generate_Case_Num(OUT caseNum varchar(10))
BEGIN

	DECLARE today VARCHAR(10);
	DECLARE cID INT(11) DEFAULT 0;
	
	SET today  = REPLACE(CURDATE(),"-","");    
	SET caseNum = CONCAT(SUBSTR(today,3,6),FLOOR( 1000 + ( RAND() *8999 )));

	SELECT C_ID INTO cID FROM TBL_CASE
    WHERE SUBSTR(CASE_NUM,3,10) = caseNum
    LIMIT 1;

	IF cID <> 0 THEN
        SET caseNum = '';    
    END IF;

END;

create
    definer = root@`%` procedure Get_Action_Remark(IN oID int, IN cToken varchar(32))
BEGIN
	
    DECLARE isOwner,isLogger,isStakeholder BOOL DEFAULT FALSE;
    DECLARE cID INT(7) DEFAULT 0;
    
    SET isOwner = IS_REQUESTOR_OWNER(oID,cToken);
    SET isLogger = IS_REQUESTOR_LOGGER(oID,cToken);
    SET isStakeholder = IS_REQUESTOR_STAKEHOLDER(oID);
    
    IF isOwner OR isLogger OR isStakeholder THEN
		
        SELECT C_ID INTO cID FROM TBL_CASE WHERE C_TOKEN = cToken LIMIT 1;
        
		SELECT DISTINCT(LOGGED_DATE),C_ID,CT_ID,REMARK_TYPE,REMARK,CASE_NUM,H_ID,UPDATED_BY,CLOSURE_TYPE,FILENAME FROM VW_ACTION_REMARK
        WHERE C_ID = cID
        ORDER BY LOGGED_DATE DESC;            
    
    ELSE
		
        
		SELECT * FROM TBL_ACTION_REMARK WHERE AR_ID = 0 LIMIT 1;            
    
    END IF;

END;

create
    definer = root@`%` procedure Get_All_Case(IN hID int, IN caseStatus int(4))
BEGIN

    DECLARE isAdmin BOOL DEFAULT FALSE;
    
    SET isAdmin = IS_REQUESTOR_ADMIN(hID);

    IF isAdmin THEN
		        
        IF caseStatus = 0 THEN
			SELECT * FROM VW_CASE_LS ORDER BY CREATED_DATE DESC;
        ELSE
			SELECT * FROM VW_CASE_LS 		
			WHERE CASE_STATUS = caseStatus        
			ORDER BY CREATED_DATE DESC;        
        END IF;
            
    ELSE
		
        
		SELECT * FROM VW_CASE_DETAIL WHERE C_ID = 0 LIMIT 1;    
    
	END IF;

END;

create
    definer = root@`%` procedure Get_All_Case_By_Collaborator(IN hID int, IN caseStatus int(4))
BEGIN

    DECLARE isStakeholder BOOL DEFAULT FALSE;
    
    SET isStakeholder = IS_REQUESTOR_STAKEHOLDER(hID);

    IF isStakeholder THEN
		
        IF caseStatus = 0 THEN
        
			SELECT T1.*, 
                    (SELECT 
                COUNT(`T2`.`NL_ID`) AS `TOTAL`
            FROM
                `TBL_NOTIFICATION_LOG` `T2`
            WHERE
                ((`T2`.`STATUS` = 0)
                    AND (`T2`.`C_ID` = `T1`.`C_ID`)
                    AND (`T2`.`H_ID` = hID))) AS `TOTAL_NEW_ALERT`
            FROM VW_CASE_LS T1
            INNER JOIN TBL_GROUP_CHAT T3 ON T1.C_ID = T3.C_ID
			WHERE T3.H_ID = hID AND T1.CASE_STATUS_ID <= 70
			ORDER BY TOTAL_NEW_ALERT DESC,T1.CREATED_DATE DESC;
            /* T1.UNCLOSED_AGING DESC, */
        ELSE
        
			SELECT T1.*, 
                    (SELECT 
                COUNT(`T2`.`NL_ID`) AS `TOTAL`
            FROM
                `TBL_NOTIFICATION_LOG` `T2`
            WHERE
                ((`T2`.`STATUS` = 0)
                    AND (`T2`.`C_ID` = `T1`.`C_ID`)
                    AND (`T2`.`H_ID` = hID))) AS `TOTAL_NEW_ALERT`
            FROM VW_CASE_LS T1
            INNER JOIN TBL_GROUP_CHAT T3 ON T1.C_ID = T3.C_ID
			WHERE T1.CASE_STATUS_ID = caseStatus AND T3.H_ID = hID AND T1.CASE_STATUS_ID <= 70
			ORDER BY TOTAL_NEW_ALERT DESC,T1.CREATED_DATE DESC;
            
		END IF;
        
    ELSE
		
        
		SELECT * FROM VW_CASE_DETAIL WHERE C_ID = 0 LIMIT 1;    
    
	END IF;


END;

create
    definer = root@`%` procedure Get_All_Case_By_Logger(IN hID int)
BEGIN
		
	SELECT T1.*, 
			(SELECT 
		COUNT(`T2`.`NL_ID`) AS `TOTAL`
	FROM
		`TBL_NOTIFICATION_LOG` `T2`
	WHERE
		((`T2`.`STATUS` = 0)
			AND (`T2`.`C_ID` = `T1`.`C_ID`)
			AND (`T2`.`H_ID` = hID))) AS `TOTAL_NEW_ALERT`
	FROM VW_CASE_LS T1
	WHERE T1.H_ID = hID AND T1.CASE_STATUS_ID <= 70
	ORDER BY TOTAL_NEW_ALERT DESC,T1.CREATED_DATE DESC;
    /* T1.UNCLOSED_AGING DESC, */   

END;

create
    definer = root@`%` procedure Get_All_Case_By_LoginID(IN hID int, IN loginID varchar(40))
BEGIN

	SELECT T1.*, 
			(SELECT 
		COUNT(`T2`.`NL_ID`) AS `TOTAL`
	FROM
		`TBL_NOTIFICATION_LOG` `T2`
	WHERE
		((`T2`.`STATUS` = 0)
			AND (`T2`.`C_ID` = `T1`.`C_ID`)
			AND (`T2`.`H_ID` = hID))) AS `TOTAL_NEW_ALERT`
	FROM VW_CASE_LS T1
    LEFT JOIN TBL_HEROBUDDY_INFO T3 ON T3.C_ID = T1.C_ID
	WHERE T3.CONTENT LIKE CONCAT('%',loginID,'%') AND T1.CASE_STATUS_ID <= 70
	ORDER BY TOTAL_NEW_ALERT DESC,T1.CREATED_DATE DESC;

END;

create
    definer = root@`%` procedure Get_All_Case_By_Owner(IN oID int, IN caseStatus int(4))
BEGIN

    DECLARE isStakeholder BOOL DEFAULT FALSE;
    
    SET isStakeholder = IS_REQUESTOR_STAKEHOLDER(oID);

    IF isStakeholder THEN
		
        IF caseStatus = 0 THEN
        
			SELECT T1.*, 
                    (SELECT 
                COUNT(`T2`.`NL_ID`) AS `TOTAL`
            FROM
                `TBL_NOTIFICATION_LOG` `T2`
            WHERE
                ((`T2`.`STATUS` = 0)
                    AND (`T2`.`C_ID` = `T1`.`C_ID`)
                    AND (`T2`.`H_ID` = oID))) AS `TOTAL_NEW_ALERT`
            FROM VW_CASE_LS T1
			WHERE T1.O_ID = oID AND T1.CASE_STATUS_ID <= 70
			ORDER BY TOTAL_NEW_ALERT DESC,T1.CREATED_DATE DESC;
            /* T1.UNCLOSED_AGING DESC, */ 
        ELSE
        
			SELECT T1.*, 
                    (SELECT 
                COUNT(`T2`.`NL_ID`) AS `TOTAL`
            FROM
                `TBL_NOTIFICATION_LOG` `T2`
            WHERE
                ((`T2`.`STATUS` = 0)
                    AND (`T2`.`C_ID` = `T1`.`C_ID`)
                    AND (`T2`.`H_ID` = oID))) AS `TOTAL_NEW_ALERT`
            FROM VW_CASE_LS T1
			WHERE T1.CASE_STATUS_ID = caseStatus AND T1.O_ID = oID AND T1.CASE_STATUS_ID <= 70
			ORDER BY TOTAL_NEW_ALERT DESC,T1.CREATED_DATE DESC;
            
		END IF;
        
    ELSE
		
        
		SELECT * FROM VW_CASE_DETAIL WHERE C_ID = 0 LIMIT 1;    
    
	END IF;


END;

create
    definer = root@`%` procedure Get_All_Case_By_Search(IN nricNum varchar(20), IN fullname varchar(150),
                                                        IN email varchar(50), IN srNum varchar(15),
                                                        IN ttNum varchar(15), IN caseNum varchar(12),
                                                        IN vipName varchar(150), IN customerName varchar(150),
                                                        IN startDate varchar(10), IN endDate varchar(10),
                                                        IN caseTypeID int(7), IN heroGroup varchar(10))
BEGIN

    IF caseTypeID <> '' OR ( startDate <> '' AND endDate <> '' ) OR heroGroup <> '' OR nricNum <> '' OR fullname <> '' OR email <> '' OR srNum <> '' OR ttNum <> '' OR caseNum <> '' OR vipName <> '' OR customerName <> '' THEN
		        
        SET @preSql = CONCAT("SELECT T1.*, (SELECT COUNT(T2.NL_ID) AS TOTAL FROM TBL_NOTIFICATION_LOG T2 WHERE (T2.STATUS = 0 AND T2.C_ID = T1.C_ID AND T2.H_ID = T1.O_ID)) AS TOTAL_NEW_ALERT ");
        SET @preSql = CONCAT(@preSql, "FROM VW_CASE_LS T1 ");
		SET @preSql = CONCAT(@preSql,"WHERE T1.CASE_STATUS_ID <> 75 ");
        
        IF nricNum <> '' THEN
			SET @preSql = CONCAT(@preSql,"AND T1.NRIC_NUM LIKE '%", TRIM(nricNum) , "%' ");
        END IF;
        
        IF fullname <> '' THEN
			SET @preSql = CONCAT(@preSql,"AND T1.FULLNAME LIKE '%", TRIM(fullname) , "%' ");
        END IF;
        
        IF email <> '' THEN
			SET @preSql = CONCAT(@preSql,"AND T1.EMAIL LIKE '%", TRIM(email) , "%' ");
        END IF;

        IF srNum <> '' THEN
			SET @preSql = CONCAT(@preSql,"AND T1.SR_NUM LIKE '%", TRIM(srNum) , "%' ");
        END IF;

        IF ttNum <> '' THEN
			SET @preSql = CONCAT(@preSql,"AND T1.TT_NUM LIKE '%", TRIM(ttNum) , "%' ");
        END IF;

        IF caseNum <> '' THEN
			SET @preSql = CONCAT(@preSql,"AND T1.CASE_NUM LIKE '%", TRIM(caseNum) , "%' ");
        END IF;

        IF vipName <> '' THEN
			SET @preSql = CONCAT(@preSql,"AND T1.VIP LIKE '%", TRIM(vipName) , "%' ");
        END IF;

        IF customerName <> '' THEN
			SET @preSql = CONCAT(@preSql,"AND T1.CUSTOMER_NAME LIKE '%", TRIM(customerName) , "%' ");
        END IF;

        IF startDate <> '' AND endDate <> '' THEN
			SET @preSql = CONCAT(@preSql,"AND T1.CREATED_DATE BETWEEN CAST('", startDate , "' AS DATE) AND CAST('", endDate ,"' AS DATE) + INTERVAL 1 DAY ");
        END IF;

        IF caseTypeID <> 0 THEN
			SET @preSql = CONCAT(@preSql,"AND T1.CASE_TYPE_ID = ", caseTypeID);
        END IF;

        IF heroGroup = 'TMCC' THEN
			SET @preSql = CONCAT(@preSql,"AND T1.FLAG = 'SALES' ");
        ELSEIF heroGroup = 'WKTM' THEN
			SET @preSql = CONCAT(@preSql,"AND LOWER(T1.EMAIL) LIKE '%@tm.com.my%' ");
        ELSEIF heroGroup = 'OTHERS' THEN
			SET @preSql = CONCAT(@preSql,"AND LOWER(T1.EMAIL) NOT LIKE '%@tm.com.my%' ");
		ELSE
			SET @preSql = CONCAT(@preSql,"AND T1.FLAG <> '' ");        
        END IF;
		
        SET @preSql = CONCAT(@preSql, " ORDER BY TOTAL_NEW_ALERT DESC,T1.CREATED_DATE DESC ");
        SET @preSql = CONCAT(@preSql, "LIMIT 99");
        
        /* T1.UNCLOSED_AGING DESC, */
		PREPARE stmt FROM @preSql;
		EXECUTE stmt;
		DEALLOCATE PREPARE stmt;
        
    ELSE        
            
		SELECT * FROM VW_CASE_DETAIL WHERE C_ID = 0 LIMIT 1;    
        
    END IF;	


END;

create
    definer = root@`%` procedure Get_All_Case_By_Stakeholder(IN hID int, IN shID int(4), IN caseType int(4),
                                                             IN caseStatus int(4))
BEGIN

    DECLARE isStakeholder BOOL DEFAULT FALSE;
    
    SET isStakeholder = IS_REQUESTOR_STAKEHOLDER(hID);

    IF isStakeholder THEN
		
        SET @preSql = "SELECT T1.*, (SELECT COUNT(T2.NL_ID) AS TOTAL FROM TBL_NOTIFICATION_LOG T2 WHERE (T2.STATUS = 0 AND T2.C_ID = T1.C_ID AND T2.H_ID = T1.O_ID)) AS TOTAL_NEW_ALERT ";
        SET @preSql = CONCAT(@preSql, "FROM VW_CASE_LS T1 WHERE T1.C_ID <> 0 ");
        
        IF shID <> 0 THEN
			SET @preSql = CONCAT(@preSql, " AND T1.SH_ID = ", shID); 			                
        END IF;
        IF caseType <> 0 THEN
			SET @preSql = CONCAT(@preSql, " AND T1.CASE_TYPE_ID = ", caseType); 			                
        END IF;
        
        IF caseStatus = 0 THEN
			SET @preSql = CONCAT(@preSql, " AND T1.CASE_STATUS_ID <= 70"); 			                            
		ELSEIF caseStatus = 60 THEN
			/* PREV SETTING WAS FOR UN-ASSIGNED (caseStatus = 61) */
			SET @preSql = CONCAT(@preSql, " AND T1.O_ID = 0"); 			                
		ELSEIF caseStatus = 70 THEN
			SET @preSql = CONCAT(@preSql, " AND T1.CASE_STATUS_ID = 70"); 		
            /*SET @preSql = CONCAT(@preSql, " AND T1.CASE_TYPE_ID = 419"); 		
            SET @preSql = CONCAT(@preSql, " AND T1.PRODUCT_NAME_ID = 640");*/ 		
            SET @preSql = CONCAT(@preSql, " AND (T1.CREATED_DATE >= DATE(NOW()) - INTERVAL 1 MONTH)");
        ELSE 
			SET @preSql = CONCAT(@preSql, " AND T1.CASE_STATUS_ID = ", caseStatus); 			                
        END IF;        
        
		/* T1.UNCLOSED_AGING DESC, */
        SET @preSql = CONCAT(@preSql, " ORDER BY TOTAL_NEW_ALERT DESC,T1.CREATED_DATE DESC");
		PREPARE stmt FROM @preSql;
		EXECUTE stmt;
		DEALLOCATE PREPARE stmt;
        
    ELSE
		
        
		SELECT * FROM VW_CASE_DETAIL WHERE C_ID = 0 LIMIT 1;    
    
	END IF;


END;

create
    definer = root@`%` procedure Get_All_Notification_Msg(IN hID int) modifies sql data
BEGIN
	
	
	UPDATE TBL_NOTIFICATION SET STATUS = 2 WHERE STATUS != 2 AND H_ID = hID;
    
	SELECT * FROM TBL_NOTIFICATION WHERE H_ID = hID;
    
    
END;

create
    definer = root@`%` procedure Get_All_Staff_Profile(IN hID int, IN keywords varchar(100))
BEGIN

    DECLARE isAdmin BOOL DEFAULT FALSE;
    
    SET isAdmin = IS_REQUESTOR_ADMIN(hID);
    
    IF isAdmin THEN

		SET @preSql = "SELECT * FROM VW_STAFF_LS ";
		SET @preSql = CONCAT(@preSql, "WHERE UPPER(EMPSTATS) = 'ACTIVE' ");
        
		IF LENGTH(keywords) <> 0 THEN            
			SET @preSql = CONCAT(@preSql," AND STAFF_NAME LIKE '%",keywords,"%'");
		END IF;
		
		PREPARE stmt FROM @preSql;
		EXECUTE stmt;
		DEALLOCATE PREPARE stmt;
    
	END IF;

END;

create
    definer = root@`%` procedure Get_All_Unassigned_Case(IN hID int, IN shID int(4))
BEGIN

    DECLARE isStakeholder BOOL DEFAULT FALSE;
    
    SET isStakeholder = IS_REQUESTOR_STAKEHOLDER(hID);

    IF isStakeholder THEN

        SET @preSql = "SELECT T1.*, (SELECT COUNT(T2.NL_ID) AS TOTAL FROM TBL_NOTIFICATION_LOG T2 WHERE (T2.STATUS = 0 AND T2.C_ID = T1.C_ID AND T2.H_ID = T1.O_ID)) AS TOTAL_NEW_ALERT ";
        SET @preSql = CONCAT(@preSql, "FROM VW_CASE_LS T1 WHERE T1.C_ID <> 0 ");
        
        IF shID <> 0 THEN
			SET @preSql = CONCAT(@preSql, " AND T1.SH_ID = ", shID); 			                
        END IF;
        
		SET @preSql = CONCAT(@preSql, " AND T1.CASE_STATUS_ID = 61 "); 			                
        
        SET @preSql = CONCAT(@preSql, " ORDER BY TOTAL_NEW_ALERT DESC,T1.CREATED_DATE DESC");
		PREPARE stmt FROM @preSql;
		EXECUTE stmt;
		DEALLOCATE PREPARE stmt;		        
        
    ELSE
		
        
		SELECT * FROM VW_CASE_DETAIL WHERE C_ID = 0 LIMIT 1;    
    
	END IF;

END;

create
    definer = root@`%` procedure Get_All_User_Profile(IN hID int, IN shID int(7), IN iCategory varchar(11),
                                                      IN activationStatus varchar(150))
BEGIN
	
    DECLARE isAdmin,isStakeholderAdmin,isStakeholderMember,isStakeholderCoordinator BOOL DEFAULT FALSE;
    
    SET isAdmin = IS_REQUESTOR_ADMIN(hID);
    SET isStakeholderAdmin = IS_STAKEHOLDER_ADMIN(hID,shID);
    SET isStakeholderMember = IS_STAKEHOLDER_MEMBER('',hID,shID);
    SET isStakeholderCoordinator = IS_STAKEHOLDER_COORDINATOR(hID,shID);
	
    IF isStakeholderAdmin OR isStakeholderMember OR isAdmin OR isStakeholderCoordinator THEN
		
        IF iCategory = 'PUBLIC' OR iCategory = 'TM' OR iCategory = 'ALL' THEN
			SET shID = 0;
        END IF;
        
        IF 0 = shID AND iCategory = 'ALL' THEN
        
			SET @preSql = "SELECT * FROM VW_HERO_LS ";
			SET @preSql = CONCAT(@preSql, "WHERE ACTIVATION_STATUS = 'Y'");
			IF LENGTH(activationStatus) <> 1 THEN            
				SET @preSql = CONCAT(@preSql,"AND (FULLNAME LIKE '%",activationStatus,"%' OR ");
				SET @preSql = CONCAT(@preSql," EMAIL LIKE '%",activationStatus,"%')");
            END IF;
            
			PREPARE stmt FROM @preSql;
			EXECUTE stmt;
			DEALLOCATE PREPARE stmt;
            
        ELSEIF 0 = shID THEN
			SELECT * FROM VW_HERO_LS
			WHERE CATEGORY = iCategory AND ACTIVATION_STATUS = 'Y';
        ELSE
			SELECT * FROM VW_HERO_LS
			WHERE SH_ID = shID AND CATEGORY = iCategory AND ACTIVATION_STATUS = 'Y';        
		END IF;
        
    ELSE
        
            
		SELECT * FROM VW_HERO_DETAIL WHERE H_ID = 0 LIMIT 1;    
        
    END IF;	

END;

create
    definer = root@`%` procedure Get_Announcement_Text(IN iController varchar(20), IN iTemplate varchar(30))
BEGIN
	
    IF iTemplate = 'WELCOME' THEN
		SELECT T1.NT_ID,T1.STATUS,T1.CONTROLLER,T1.MESSAGE,T1.TITLE,T1.SUBTITLE,T1.PUBLISHED_DATE,T2.PICTURE 
		FROM TBL_NOTIFICATION_TEMPLATE T1
        LEFT JOIN TBL_BLOB T2 ON T1.B_ID = T2.B_ID
		WHERE T1.CONTROLLER = iController AND T1.TEMPLATE = iTemplate;    
	ELSE
		# NT_ID,STATUS,CONTROLLER,MESSAGE,TITLE,SUBTITLE,PUBLISHED_DATE,'null' AS PICTURE
		SELECT MESSAGE 
		FROM TBL_NOTIFICATION_TEMPLATE
		WHERE CONTROLLER = iController AND TEMPLATE = iTemplate
		LIMIT 1;
    END IF;
    
END;

create
    definer = root@`%` procedure Get_Authentication_Token(IN apiKey varchar(40), IN iEmail varchar(50),
                                                          OUT oToken varchar(40))
BEGIN
	
    DECLARE isExist, hID, tID INT DEFAULT 0;
    DECLARE token VARCHAR(40) DEFAULT "";
	DECLARE expectedApiKey VARCHAR(40) DEFAULT "32c70cb3-7381-e2ef-ad1f-b5a61964d408-cxt";
    
	IF iEmail = '' OR apiKey <> expectedApiKey THEN
    
		SET oToken = '';
        
    ELSE
    
		SELECT 
			H_ID
		INTO hID FROM
			TBL_HERO
		WHERE
			 ACTIVATION_STATUS = 'Y' AND EMAIL = iEmail
		LIMIT 1;
		
		SELECT AUTH_TOKEN INTO token FROM TBL_AUTH_TOKEN
		WHERE H_ID = hID
		LIMIT 1;		
		
		IF hID > 0 AND expectedApiKey = apiKey AND token = '' THEN
			
			SET token = CREATE_UUID();
			
			INSERT INTO TBL_AUTH_TOKEN(H_ID,AUTH_TOKEN)
			VALUES(hID,token);
			SET tID = LAST_INSERT_ID();
			
			IF tID > 0 THEN
				SET oToken = token;
			END IF;
			
		END IF;

		SET oToken = token;
        
	END IF;
    
END;

create
    definer = root@`%` procedure Get_Blob_Content(IN bID int)
BEGIN

	SELECT PICTURE FROM TBL_BLOB 
    WHERE B_ID = bID LIMIT 1;

END;

create
    definer = root@`%` procedure Get_Case_Assignment_Log(IN cToken varchar(32))
BEGIN
    /* For Audit Trail Purposed */
	SELECT * FROM VW_ASSIGNMENT_LOG
    WHERE C_TOKEN = cToken
    ORDER BY LOGGED_DATE;

END;

create
    definer = root@`%` procedure Get_Case_Flag(IN cToken varchar(32))
BEGIN

	SELECT UCASE(T2.FLAG) AS FLAG 
    FROM TBL_CASE T1
    JOIN TBL_CASE_DETAIL T2 ON T1.C_ID = T2.C_ID
    WHERE T1.C_TOKEN = cToken LIMIT 1;

END;

create
    definer = root@`%` procedure Get_Case_Num(IN cToken varchar(32))
BEGIN

	SELECT CASE_NUM FROM TBL_CASE
    WHERE C_TOKEN = cToken LIMIT 1;

END;

create
    definer = root@`%` procedure Get_Cases_By_Keywords(IN keywords varchar(100))
BEGIN
	    	
    IF keywords <> '' THEN
		        
        SET @preSql = CONCAT("SELECT T1.*, (SELECT COUNT(T2.NL_ID) AS TOTAL FROM TBL_NOTIFICATION_LOG T2 WHERE (T2.STATUS = 0 AND T2.C_ID = T1.C_ID AND T2.H_ID = T1.O_ID)) AS TOTAL_NEW_ALERT ");
        SET @preSql = CONCAT(@preSql, "FROM VW_CASE_LS T1 ");
		SET @preSql = CONCAT(@preSql,"WHERE T1.C_ID <> 0 AND (");
		SET @preSql = CONCAT(@preSql,"T1.FULLNAME LIKE '%", TRIM(keywords) , "%' OR ");
		SET @preSql = CONCAT(@preSql,"T1.CASE_NUM LIKE '%", TRIM(keywords) , "%' OR ");
		SET @preSql = CONCAT(@preSql,"T1.VIP LIKE '%", TRIM(keywords) , "%' OR ");
		SET @preSql = CONCAT(@preSql,"T1.CUSTOMER_NAME LIKE '%", TRIM(keywords) , "%')");
        SET @preSql = CONCAT(@preSql, " ORDER BY TOTAL_NEW_ALERT DESC,T1.CREATED_DATE DESC");        
		PREPARE stmt FROM @preSql;
		EXECUTE stmt;
		DEALLOCATE PREPARE stmt;
        
    ELSE
        
            
		SELECT * FROM VW_CASE_DETAIL WHERE C_ID = 0 LIMIT 1;    
        
    END IF;	

END;

create
    definer = root@`%` procedure Get_Detail_Case_By_ID(IN cToken varchar(32))
BEGIN
		
	SELECT T1.*, 
			(SELECT 
		COUNT(`T2`.`NL_ID`) AS `TOTAL`
	FROM
		`TBL_NOTIFICATION_LOG` `T2`
	WHERE
		((`T2`.`STATUS` = 0)
			AND (`T2`.`C_ID` = `T1`.`C_ID`)
			AND (`T2`.`H_ID` = `T1`.`H_ID`))) AS `TOTAL_NEW_ALERT`
	FROM VW_CASE_DETAIL T1
	WHERE T1.C_TOKEN = cToken
    LIMIT 1;
	/*ORDER BY T1.CREATED_DATE DESC;*/
       

END;

create
    definer = root@`%` procedure Get_Herobuddy_Info(IN cToken varchar(32))
BEGIN

	DECLARE cID INT DEFAULT 0;
    	
    SELECT T1.CONTENT,T3.CASE_CONTENT AS REMARK,T1.LOGGED_DATE 
    FROM TBL_HEROBUDDY_INFO T1 
    INNER JOIN TBL_CASE T2 ON T1.C_ID = T2.C_ID
    INNER JOIN TBL_CASE_DETAIL T3 ON T1.C_ID = T3.C_ID
    WHERE T2.C_TOKEN = cToken 
    LIMIT 1;
        

END;

create
    definer = root@`%` procedure Get_Latest_Notification(IN hID int, OUT rMessage varchar(250)) modifies sql data
BEGIN
	
    DECLARE oMessage VARCHAR(250);

	SELECT MESSAGE INTO oMessage FROM TBL_NOTIFICATION
    WHERE H_ID = hID AND STATUS = 0
    ORDER BY CREATED_DATE DESC
    LIMIT 1;
	
    SET rMessage = oMessage;
    
    UPDATE TBL_NOTIFICATION
    SET STATUS = 1
    WHERE H_ID = hID AND STATUS = 0;
    

END;

create
    definer = root@`%` procedure Get_Latest_Version(IN appID int(7))
BEGIN

	/* ltr change APP_EXPIRED into APP_UPDATES at SPROC & MAPPER */
	SELECT APP_ID,APP_NAME,APP_VERSION,APP_DESC,APP_EXPIRED,APP_UPDATES 
    FROM TBL_APP_VERSION
    /*WHERE APP_ID = appID */
    WHERE APP_UPDATES = (SELECT MAX(APP_UPDATES) FROM DB_HERO.TBL_APP_VERSION)
    AND APP_EXPIRED = 0
    ORDER BY APP_UPDATES DESC
    LIMIT 1;

END;

create
    definer = root@`%` procedure Get_Profiles_By_Keywords(IN hID int, IN keywords varchar(100))
BEGIN
	
    DECLARE isAdmin BOOL DEFAULT FALSE;
    DECLARE isStakeholderAdmin BOOL DEFAULT FALSE;
    DECLARE keyStakeholderName VARCHAR(15) DEFAULT "";
    DECLARE keyHeroName VARCHAR(50) DEFAULT "";
    DECLARE addSql VARCHAR(100) DEFAULT "";
    DECLARE shID INT(11) DEFAULT 0;
    
    SELECT SH_ID INTO shID FROM TBL_HERO_PROFILE WHERE H_ID = hID LIMIT 1;
    
    SET isAdmin = IS_REQUESTOR_ADMIN(hID);    
    SET isStakeholderAdmin = IS_STAKEHOLDER_ADMIN(hID,shID);
    	
    IF isAdmin OR isStakeholderAdmin THEN
		
        SET keyHeroName = SUBSTRING_INDEX(keywords,'+',1);
        SET keyStakeholderName = SUBSTRING_INDEX(keywords,'+',-1);
        
        IF keyHeroName <> '' THEN
			
            SET addSql = CONCAT("(FULLNAME LIKE '%", TRIM(keyHeroName) , "%' OR ");
            SET addSql = CONCAT(addSql, "EMAIL LIKE '%", TRIM(keyHeroName) , "%') ");
            
            IF keyStakeholderName <> '' AND keyStakeholderName <> keyHeroName THEN
				SET addSql = CONCAT(addSql, "AND STAKEHOLDER_NAME LIKE '%", TRIM(keyStakeholderName) , "%'");
            END IF;
            
			SET @preSql = CONCAT("SELECT * FROM VW_HERO_LS ");
			SET @preSql = CONCAT(@preSql,"WHERE ACTIVATION_STATUS = 'Y' AND ", addSql);
            PREPARE stmt FROM @preSql;
            EXECUTE stmt;
			DEALLOCATE PREPARE stmt;
			
        END IF;
        
    ELSE
        
            
		SELECT * FROM VW_HERO_DETAIL WHERE H_ID = 0 LIMIT 1;    
        
    END IF;	

END;

create
    definer = root@`%` procedure Get_Registered_User()
BEGIN

	SELECT  T1.FULLNAME,
			T1.EMAIL,
            T2.CATEGORY,
            T4.L_NAME AS STAKEHOLDER_NAME,
            T5.L_NAME AS STATE_HERO,
            T3.STATE AS STATE_GEMS,
            T1.REGISTERED_DATE 
	FROM DB_HERO.TBL_HERO T1
	JOIN  DB_HERO.TBL_HERO_PROFILE T2 ON T1.H_ID = T2.H_ID
	LEFT JOIN DB_HERO.TBL_STAFF T3 ON T1.EMAIL = T3.EMAIL
	LEFT JOIN DB_HERO.TBL_LOV T4 ON T2.SH_ID = T4.L_ID
	LEFT JOIN DB_HERO.TBL_LOV T5 ON T2.STATE_ID = T5.L_ID
	WHERE T1.ACTIVATION_STATUS = "Y"
	LIMIT 50000;

	/*SELECT  T2.FULLNAME, 
			T2.EMAIL, 
            T2.REGISTERED_DATE,
            T2.MOBILE_NUM,
            T2.CATEGORY,
            T2.LEVEL,
            T2.STAKEHOLDER_NAME,
            T2.POSITION_NAME,
            T2.STATE_NAME AS STATE_HERO,
            T1.STATE AS STATE_GEMS
	FROM VW_STAFF_LS T1
	LEFT JOIN VW_HERO_DETAIL T2 ON T1.EMAIL = T2.EMAIL
	WHERE T2.ACTIVATION_STATUS = "Y";*/
    
    

END;

create
    definer = root@`%` procedure Get_Report_On_Demand(IN beginDate varchar(10), IN endDate varchar(10))
BEGIN
	
    /* endDate not included in rows retrieved */
    /* sol: + INTERVAL 1 DAY */    
	
	SELECT CASE_NUM,CREATED_DATE,CLOSED_DATE,OWNER_NAME,UNCLOSED_AGING_DH,CLOSED_AGING_DH,
    CASE_TYPE,PRODUCT_NAME,AREA_LOCATION,CASE_STATUS,RATING,SR_NUM,TT_NUM,
    CUSTOMER_NAME,ACTUAL_CUSTOMER_NAME,REMARK_TYPE,CLOSURE_TYPE,EMAIL,FULLNAME AS HERO_NAME,
    STAKEHOLDER_NAME,SERVICE_ID,STAFF_ID,PERNO,VIP,SEGMENT_NAME,FLAG,SOURCE_NAME,
    TMCC_NAME,TMCC_IDM,TMCC_EMAIL,CKC,CKC_NUM
    FROM DB_HERO.VW_CASE_DETAIL
	WHERE CASE_STATUS_ID < 73 
		AND CREATED_DATE >= CAST(beginDate AS DATE) 
		AND CREATED_DATE <= CAST(endDate AS DATE) + INTERVAL 1 DAY
    ORDER BY CREATED_DATE;
    
END;

create
    definer = root@`%` procedure Get_Staff_ID_By_Email(IN iEmail varchar(50))
BEGIN
	
                
    IF iEmail <> '' THEN
			
		SELECT staff_id FROM TBL_STAFF
        WHERE email = iEmail AND email <> ''
        LIMIT 1;
        
    ELSE
        
            
		SELECT staff_id FROM TBL_STAFF WHERE sid = 0 LIMIT 1;    
        
    END IF;	

END;

create
    definer = root@`%` procedure Get_System_LoV(IN hID int)
BEGIN

	SELECT L_ID,L_NAME,L_GROUP,PARENT_ID
	FROM TBL_LOV 
	ORDER BY L_GROUP,L_NAME;

END;

create
    definer = root@`%` procedure Get_System_LoV_N()
BEGIN

	SELECT *
	FROM TBL_LOV 
	ORDER BY L_GROUP,L_NAME;

END;

create
    definer = root@`%` procedure Get_Telegram_Alert(IN hID int)
BEGIN

    DECLARE isStakeholder BOOL DEFAULT FALSE;
    
    SET isStakeholder = IS_REQUESTOR_STAKEHOLDER(hID);

    IF isStakeholder THEN
		
        SELECT * FROM VW_TELEGRAM_ALERT;
    
    ELSE
    
		SELECT C_ID FROM VW_TELEGRAM_ALERT WHERE TA_ID = 0 LIMIT 1;
    
	END IF;
    
END;

create
    definer = root@`%` procedure Get_Telegram_Message(IN caseNum varchar(32), IN loggerFull varchar(250),
                                                      IN stateName varchar(100), IN iDate varchar(30),
                                                      IN gChat varchar(20), OUT oMessage varchar(500))
BEGIN
	
    DECLARE iMessage VARCHAR(255) DEFAULT '';        	
    DECLARE cID INT DEFAULT 0;
	
    SELECT C_ID INTO cID FROM TBL_CASE WHERE CASE_NUM = caseNum LIMIT 1;

	SELECT MESSAGE INTO iMessage FROM TBL_NOTIFICATION_TEMPLATE
    WHERE CONTROLLER = 'TELEGRAM' AND TEMPLATE = gChat
    LIMIT 1;
	
    SET oMessage = REPLACE(iMessage,'{CASENUM}',caseNum);
    SET oMessage = REPLACE(oMessage,'{LOGGER}',loggerFull);
    SET oMessage = REPLACE(oMessage,'{DATE}',iDate);
    /*SET oMessage = REPLACE(oMessage,'{NAME}',loggerNameOnly);*/
    SET oMessage = REPLACE(oMessage,'{STATE}',stateName);    
	
    INSERT INTO TBL_TELEGRAM_ALERT(C_ID,GCHAT,MESSAGE)
    VALUES(cID,gChat,oMessage);
    
    
END;

create
    definer = root@`%` procedure Get_Telegram_Message_By_ID(IN cToken varchar(32))
BEGIN

	SELECT MESSAGE FROM VW_TELEGRAM_ALERT
    WHERE C_TOKEN = cToken LIMIT 1;

END;

create
    definer = root@`%` procedure Get_Topten_Hero_By_State()
BEGIN

	SELECT H_TOKEN, EMAIL, STAFF_NAME, STAFF_LOGIN_ID, STATE, TOTAL_CASE, RANKING
	FROM (
	SELECT H_TOKEN, EMAIL, STAFF_NAME, STAFF_LOGIN_ID, STATE, TOTAL_CASE,
	@currcount := IF(@currvalue = STATE, @currcount + 1, 1) AS RANKING, @currvalue := STATE
	FROM (
	SELECT C.H_TOKEN, C.EMAIL, B.STATE, B.STAFF_NAME, B.STAFF_LOGIN_ID, COUNT(A.C_ID) AS TOTAL_CASE
	FROM TBL_CASE A
	JOIN TBL_CASE_DETAIL D ON D.C_ID = A.C_ID
	JOIN TBL_HERO C ON C.H_ID = A.H_ID
	LEFT JOIN TBL_STAFF B ON B.EMAIL = C.EMAIL
	WHERE D.CASE_STATUS < 73 AND B.STATE <> ''
	GROUP BY C.H_TOKEN, C.EMAIL, B.STATE, B.STAFF_NAME, B.STAFF_LOGIN_ID
	ORDER BY B.STATE ASC, TOTAL_CASE DESC) X,
	(SELECT @currvalue := NULL, @currcount := 0) Y) RANK
	WHERE RANKING <= 10;


END;

create
    definer = root@`%` procedure Get_Total_Case_By_Hero(IN beginDate varchar(10), IN endDate varchar(10))
BEGIN
	
    /* endDate not included in rows retrieved */
    /* sol: + INTERVAL 1 DAY */    

	SELECT T3.FULLNAME AS HERO_NAME,T3.EMAIL, COUNT(T1.C_ID) AS TOTAL_CASE_CREATED
	FROM DB_HERO.TBL_CASE T1
		JOIN DB_HERO.TBL_CASE_DETAIL T2 ON T1.C_ID = T2.C_ID
		JOIN DB_HERO.TBL_HERO T3 ON T1.H_ID = T3.H_ID
	WHERE T2.CASE_STATUS <= 70 
		AND T1.CREATED_DATE >= CAST(beginDate AS DATE) 
		AND T1.CREATED_DATE <= CAST(endDate AS DATE) + INTERVAL 1 DAY
	GROUP BY T1.H_ID
	ORDER BY TOTAL_CASE_CREATED DESC;
    
END;

create
    definer = root@`%` procedure Get_Total_Case_By_Hero_By_State(IN state varchar(30), IN beginDate varchar(10),
                                                                 IN endDate varchar(10))
BEGIN

    /* endDate not included in rows retrieved */
    /* sol: + INTERVAL 1 DAY */    

	SELECT UPPER(T4.STATE) AS STATE_NAME,UPPER(T3.FULLNAME) AS HERO_NAME,T3.EMAIL, COUNT(T1.C_ID) AS TOTAL_CASE_CREATED
	FROM DB_HERO.TBL_CASE T1
		JOIN DB_HERO.TBL_CASE_DETAIL T2 ON T1.C_ID = T2.C_ID
		JOIN DB_HERO.TBL_HERO T3 ON T1.H_ID = T3.H_ID
        LEFT JOIN TBL_STAFF T4 ON T3.EMAIL = T4.EMAIL
	WHERE T2.CASE_STATUS <= 70 
		AND T4.STATE = state
		AND T1.CREATED_DATE >= CAST(beginDate AS DATE) 
		AND T1.CREATED_DATE <= CAST(endDate AS DATE) + INTERVAL 1 DAY
	GROUP BY T1.H_ID
	ORDER BY TOTAL_CASE_CREATED DESC;

END;

create
    definer = root@`%` procedure Get_Total_Case_By_Owner(IN oID int, IN caseStatusID int)
BEGIN

    DECLARE isStakeholder BOOL DEFAULT FALSE;
    
    SET isStakeholder = IS_REQUESTOR_STAKEHOLDER(oID);

    IF isStakeholder THEN
		
		SELECT T2.H_TOKEN,T2.FULLNAME,
        SUM(CASE WHEN T1.CASE_STATUS <> 'CANCELLED' THEN 1 ELSE 0 END) AS GTOTAL,
        SUM(CASE WHEN T1.CASE_STATUS = 'CANCELLED' THEN 1 ELSE 0 END) AS CANCELLED,
        0 AS NEW,
        SUM(CASE WHEN T1.CASE_STATUS = 'ASSIGNED' THEN 1 ELSE 0 END) AS ASSIGNED,
        SUM(CASE WHEN T1.CASE_STATUS = 'IN-PROGRESS' THEN 1 ELSE 0 END) AS INPROGRESS,
        SUM(CASE WHEN T1.CASE_STATUS = 'CLOSED' THEN 1 ELSE 0 END) AS CLOSED
        FROM VW_CASE_DETAIL T1
        INNER JOIN TBL_HERO T2 ON T1.O_ID = T2.H_ID
        WHERE T1.O_ID = oID
        GROUP BY T1.O_ID;
            
    ELSE
		
        
		SELECT * FROM VW_CASE_DETAIL WHERE C_ID = 0 LIMIT 1;    
    
	END IF;

END;

create
    definer = root@`%` procedure Get_Total_Case_By_Stakeholder(IN hID int, IN shID int(4))
BEGIN

    DECLARE isStakeholder BOOL DEFAULT FALSE;
    
    SET isStakeholder = IS_REQUESTOR_STAKEHOLDER(hID);

    IF isStakeholder THEN
		
        IF shID > 0 THEN
			SELECT 'N/A' AS H_TOKEN,T2.L_NAME AS FULLNAME,
			SUM(CASE WHEN T1.CASE_STATUS <> 'CANCELLED' THEN 1 ELSE 0 END) AS GTOTAL,
			SUM(CASE WHEN T1.CASE_STATUS = 'CANCELLED' THEN 1 ELSE 0 END) AS CANCELLED,
			SUM(CASE WHEN T1.CASE_STATUS = 'NEW' THEN 1 ELSE 0 END) AS NEW,
			SUM(CASE WHEN T1.CASE_STATUS = 'ASSIGNED' THEN 1 ELSE 0 END) AS ASSIGNED,
			SUM(CASE WHEN T1.CASE_STATUS = 'IN-PROGRESS' THEN 1 ELSE 0 END) AS INPROGRESS,
			SUM(CASE WHEN T1.CASE_STATUS = 'CLOSED' THEN 1 ELSE 0 END) AS CLOSED
			FROM VW_CASE_DETAIL T1
			INNER JOIN TBL_LOV T2 ON T1.SH_ID = T2.L_ID
			WHERE T1.SH_ID = shID AND T1.CASE_STATUS_ID <= 70
			GROUP BY T1.SH_ID;
		ELSE
			SELECT 'N/A' AS H_TOKEN,'N/A' AS FULLNAME,
			SUM(CASE WHEN CASE_STATUS <> 'CANCELLED' THEN 1 ELSE 0 END) AS GTOTAL,
			SUM(CASE WHEN CASE_STATUS = 'CANCELLED' THEN 1 ELSE 0 END) AS CANCELLED,
			SUM(CASE WHEN CASE_STATUS = 'NEW' THEN 1 ELSE 0 END) AS NEW,
			SUM(CASE WHEN CASE_STATUS = 'ASSIGNED' THEN 1 ELSE 0 END) AS ASSIGNED,
			SUM(CASE WHEN CASE_STATUS = 'IN-PROGRESS' THEN 1 ELSE 0 END) AS INPROGRESS,
			SUM(CASE WHEN CASE_STATUS = 'CLOSED' THEN 1 ELSE 0 END) AS CLOSED
			FROM VW_CASE_DETAIL
            WHERE CASE_STATUS_ID <= 70;
        END IF;
        
    ELSE
		
        
		SELECT * FROM VW_CASE_DETAIL WHERE C_ID = 0 LIMIT 1;    
    
	END IF;


END;

create
    definer = root@`%` procedure Get_Total_Case_By_State(IN startDate varchar(20), IN endDate varchar(20),
                                                         IN category varchar(10))
BEGIN
	    
	/*SET @preSql = CONCAT("SELECT C.STATE,COUNT(A.C_ID) AS TOTAL ");
	SET @preSql = CONCAT(@preSql, "FROM TBL_CASE A ");
	SET @preSql = CONCAT(@preSql, "INNER JOIN TBL_HERO B ON B.H_ID = A.H_ID ");
	SET @preSql = CONCAT(@preSql, "LEFT JOIN TBL_STAFF C ON C.EMAIL = B.EMAIL ");
	SET @preSql = CONCAT(@preSql, "INNER JOIN TBL_CASE_DETAIL D ON D.C_ID = A.C_ID ");
	SET @preSql = CONCAT(@preSql, "WHERE D.CASE_STATUS <= 70 ");
	IF category = 'SALES' THEN
		SET @preSql = CONCAT(@preSql,"AND D.FLAG = 'SALES' ");
	ELSE
		SET @preSql = CONCAT(@preSql,"AND D.FLAG <> 'SALES' ");    
	END IF;
	SET @preSql = CONCAT(@preSql, "GROUP BY C.STATE ");
	SET @preSql = CONCAT(@preSql, "ORDER BY TOTAL DESC");*/
    
	SET @preSql = CONCAT("SELECT C.STATE,COUNT(A.C_ID) AS TOTAL ");
	SET @preSql = CONCAT(@preSql, "FROM TBL_CASE A ");
	SET @preSql = CONCAT(@preSql, "JOIN TBL_HERO B ON B.H_ID = A.H_ID ");
	SET @preSql = CONCAT(@preSql, "JOIN TBL_STAFF C ON C.EMAIL = B.EMAIL ");
	SET @preSql = CONCAT(@preSql, "JOIN TBL_CASE_DETAIL D ON D.C_ID = A.C_ID ");
	SET @preSql = CONCAT(@preSql, "LEFT JOIN TBL_TMCC_STAFF E ON C.EMAIL = E.TMCC_EMAIL ");
	SET @preSql = CONCAT(@preSql, "WHERE D.CASE_STATUS <= 70 AND E.TMCC_NAME IS NULL ");
    
	IF category = 'SALES' THEN
		SET @preSql = CONCAT(@preSql,"AND D.FLAG = 'SALES' ");
	ELSE
		SET @preSql = CONCAT(@preSql,"AND D.FLAG <> 'SALES' ");    
	END IF;
	
	SET @preSql = CONCAT(@preSql, "GROUP BY C.STATE ");
        
	SET @preSql = CONCAT(@preSql, "UNION ");
	SET @preSql = CONCAT(@preSql, "SELECT 'OTHERS',COUNT(F.C_ID) AS TOTAL ");
	SET @preSql = CONCAT(@preSql, "FROM TBL_CASE F ");
	SET @preSql = CONCAT(@preSql, "JOIN TBL_HERO G ON G.H_ID = F.H_ID ");
	SET @preSql = CONCAT(@preSql, "JOIN TBL_CASE_DETAIL H ON H.C_ID = F.C_ID ");
	SET @preSql = CONCAT(@preSql, "WHERE H.CASE_STATUS <= 70 AND LOWER(G.EMAIL) NOT LIKE '%@tm.com.my%' AND LOWER(G.FULLNAME) NOT LIKE 'tad%' ");
	IF category = 'SALES' THEN
		SET @preSql = CONCAT(@preSql, "AND H.FLAG = 'SALES' ");
	ELSE
		SET @preSql = CONCAT(@preSql, "AND H.FLAG <> 'SALES' ");    
	END IF;
    
	SET @preSql = CONCAT(@preSql, "UNION ");
	SET @preSql = CONCAT(@preSql, "SELECT 'TAD',COUNT(J.C_ID) AS TOTAL ");
	SET @preSql = CONCAT(@preSql, "FROM TBL_CASE J ");
	SET @preSql = CONCAT(@preSql, "JOIN TBL_HERO K ON K.H_ID = J.H_ID ");
	SET @preSql = CONCAT(@preSql, "JOIN TBL_CASE_DETAIL L ON L.C_ID = J.C_ID ");
	SET @preSql = CONCAT(@preSql, "WHERE L.CASE_STATUS <= 70 AND LOWER(K.EMAIL) NOT LIKE '%@tm.com.my%' AND LOWER(K.FULLNAME) LIKE 'tad%' ");
	IF category = 'SALES' THEN
		SET @preSql = CONCAT(@preSql, "AND L.FLAG = 'SALES' ");
	ELSE
		SET @preSql = CONCAT(@preSql, "AND L.FLAG <> 'SALES' ");    
	END IF;
    
	SET @preSql = CONCAT(@preSql, "UNION ");
	SET @preSql = CONCAT(@preSql, "SELECT 'TMCC',COUNT(M.C_ID) AS TOTAL ");
	SET @preSql = CONCAT(@preSql, "FROM TBL_CASE M ");
	SET @preSql = CONCAT(@preSql, "JOIN TBL_HERO N ON N.H_ID = M.H_ID ");
	SET @preSql = CONCAT(@preSql, "JOIN TBL_CASE_DETAIL P ON P.C_ID = M.C_ID ");
	SET @preSql = CONCAT(@preSql, "JOIN TBL_TMCC_STAFF Q ON N.EMAIL = Q.TMCC_EMAIL ");
	SET @preSql = CONCAT(@preSql, "WHERE P.CASE_STATUS <= 70 ");
	IF category = 'SALES' THEN
		SET @preSql = CONCAT(@preSql, "AND P.FLAG = 'SALES' ");
	ELSE
		SET @preSql = CONCAT(@preSql, "AND P.FLAG <> 'SALES' ");    
	END IF;
    
	SET @preSql = CONCAT(@preSql, "ORDER BY TOTAL DESC");    
    
	PREPARE stmt FROM @preSql;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
    
END;

create
    definer = root@`%` procedure Get_Total_Case_Resolved_Agent_Performance(IN oID int, IN startDate varchar(10),
                                                                           IN endDate varchar(10), OUT total int(4))
BEGIN

    DECLARE eof BOOL DEFAULT FALSE;
    DECLARE rTotal, rAging, gTotal INT DEFAULT 0;
    
	DECLARE cur CURSOR FOR
		
		SELECT COUNT(A.C_ID) AS TOTAL,GET_AGING_WEEKDAYS(A.CREATED_DATE,A.CLOSED_DATE) AS AGING
		FROM TBL_CASE A
		INNER JOIN TBL_CASE_DETAIL B ON A.C_ID = B.C_ID
		WHERE A.OWNER_ID = oID AND B.CASE_STATUS = 70
		GROUP BY AGING
		HAVING AGING <= days;
        
	DECLARE CONTINUE HANDLER
		FOR NOT FOUND
	BEGIN
		SET eof = TRUE;
	END;
	
	OPEN cur;
    
		`rs_loop`:
		LOOP
			FETCH cur INTO rTotal, rAging;
			IF eof IS TRUE THEN
				LEAVE rs_loop;
			END IF;
			
			SET gTotal = gTotal + rTotal;
            
		END LOOP;
    
    CLOSE cur;

	SET total = gTotal;

END;

create
    definer = root@`%` procedure Get_Total_Case_Resolved_Group_Performance(IN shID int, IN startDate varchar(10),
                                                                           IN endDate varchar(10), OUT total int(4))
BEGIN

    DECLARE eof BOOL DEFAULT FALSE;
    DECLARE rTotal, rAging, gTotal INT DEFAULT 0;
    
	DECLARE cur CURSOR FOR
		
		SELECT COUNT(A.C_ID) AS TOTAL,GET_AGING_WEEKDAYS(A.CREATED_DATE,A.CLOSED_DATE) AS AGING
		FROM TBL_CASE A
		INNER JOIN TBL_CASE_DETAIL B ON A.C_ID = B.C_ID
		WHERE B.SH_ID = shID AND B.CASE_STATUS = 70
		GROUP BY AGING
		HAVING AGING <= days;
        
	DECLARE CONTINUE HANDLER
		FOR NOT FOUND
	BEGIN
		SET eof = TRUE;
	END;
	
	OPEN cur;
    
		`rs_loop`:
		LOOP
			FETCH cur INTO rTotal, rAging;
			IF eof IS TRUE THEN
				LEAVE rs_loop;
			END IF;
			
			SET gTotal = gTotal + rTotal;
            
		END LOOP;
    
    CLOSE cur;

	SET total = gTotal;

END;

create
    definer = root@`%` procedure Get_Total_Hero_By_State(IN startDate varchar(20), IN endDate varchar(20))
BEGIN

	/*SELECT B.STATE,COUNT(A.H_ID) AS TOTAL
	FROM TBL_HERO A
	LEFT JOIN TBL_STAFF B ON A.EMAIL = B.EMAIL
	WHERE A.ACTIVATION_STATUS = 'Y'
        
	GROUP BY B.STATE
	ORDER BY TOTAL DESC;*/
    
    /* WKTM */
	SELECT B.STATE,COUNT(A.H_ID) AS TOTAL
	FROM TBL_HERO A
	JOIN TBL_STAFF B ON A.EMAIL = B.EMAIL
    LEFT JOIN TBL_TMCC_STAFF G ON B.EMAIL = G.TMCC_EMAIL
	WHERE A.ACTIVATION_STATUS = 'Y' AND G.TMCC_NAME IS NULL
    GROUP BY B.STATE
    
    UNION
    
    /* OTHERS */
	SELECT "OTHERS",COUNT(C.H_ID) AS TOTAL
	FROM TBL_HERO C
	WHERE C.ACTIVATION_STATUS = 'Y' AND LOWER(C.EMAIL) NOT LIKE '%@tm.com.my%' AND LOWER(C.FULLNAME) NOT LIKE 'tad%'

    UNION
    
    /* TAD */
	SELECT "TAD",COUNT(D.H_ID) AS TOTAL
	FROM TBL_HERO D
	WHERE D.ACTIVATION_STATUS = 'Y' AND LOWER(D.EMAIL) NOT LIKE '%@tm.com.my%' AND LOWER(D.FULLNAME) LIKE 'tad%'
	
    UNION
    
    /* TMCC */
    SELECT "TMCC",COUNT(E.H_ID) AS TOTAL
    FROM TBL_HERO E
    JOIN TBL_TMCC_STAFF F ON E.EMAIL = F.TMCC_EMAIL
    WHERE E.ACTIVATION_STATUS = 'Y'
    
    ORDER BY TOTAL DESC;    

END;

create
    definer = root@`%` procedure Get_Total_New_Alert(IN hID int, IN cToken varchar(32))
BEGIN
	
    DECLARE cID INT DEFAULT 0;
    
	SELECT C_ID INTO cID FROM TBL_CASE WHERE C_TOKEN = cToken LIMIT 1;
    
	SELECT COUNT(N_ID) AS TOTAL 
    FROM TBL_NOTIFICATION 
    WHERE STATUS != 2 AND C_ID = cID;    

    
END;

create
    definer = root@`%` procedure Get_Total_Registered_HERO(IN beginDate varchar(10), IN endDate varchar(10), OUT total int(7))
BEGIN
	
    /* endDate not included in rows retrieved */
    /* sol: + INTERVAL 1 DAY */
    
    DECLARE totalRegistered INT DEFAULT 0;    

	SELECT COUNT(H_ID) AS totalRegistered 
    FROM DB_HERO.TBL_HERO
	WHERE ACTIVATION_STATUS = 'Y' 
		AND REGISTERED_DATE >= CAST(beginDate AS DATE) 
        AND REGISTERED_DATE <= CAST(endDate AS DATE) + INTERVAL 1 DAY;

	SET total = totalRegistered;
    
END;

create
    definer = root@`%` procedure Get_Total_Resolved_By_Agent(IN oID int, IN days int(2), OUT oTotal int(4))
BEGIN
	
    DECLARE eof BOOL DEFAULT FALSE;
    DECLARE rTotal, rAging INT DEFAULT 0;
    DECLARE gTotal INT DEFAULT 0; 
    
    DECLARE cur CURSOR FOR
		SELECT COUNT(A.C_ID) AS TOTAL,GET_AGING_WEEKDAYS(A.CREATED_DATE,A.CLOSED_DATE) AS AGING
		FROM TBL_CASE A
		INNER JOIN TBL_CASE_DETAIL B ON A.C_ID = B.C_ID
		WHERE A.OWNER_ID = oID AND B.CASE_STATUS = 70
		GROUP BY AGING
		HAVING AGING <= days;


	DECLARE CONTINUE HANDLER
		FOR NOT FOUND
	BEGIN
		SET eof = TRUE;
	END;
    
    
	OPEN cur;
    
		`rs_loop`:
		LOOP
			FETCH cur INTO rTotal, rAging;
			IF eof IS TRUE THEN
				LEAVE rs_loop;
			END IF;
			
			SET gTotal = gTotal + rTotal;
            
		END LOOP;
    
    CLOSE cur;

	SET oTotal = gTotal;

END;

create
    definer = root@`%` procedure Get_Total_Resolved_By_Group(IN shID int, IN days int(2), OUT oTotal int(4))
BEGIN
	
    DECLARE eof BOOL DEFAULT FALSE;
    DECLARE rTotal, rAging INT DEFAULT 0;
    DECLARE gTotal INT DEFAULT 0; 
    

	DECLARE cur CURSOR FOR
		SELECT COUNT(A.C_ID) AS TOTAL,GET_AGING_WEEKDAYS(A.CREATED_DATE,A.CLOSED_DATE) AS AGING
		FROM TBL_CASE A
		INNER JOIN TBL_CASE_DETAIL B ON A.C_ID = B.C_ID
		WHERE B.SH_ID = shID AND B.CASE_STATUS = 70
		GROUP BY AGING
		HAVING AGING <= days;

	DECLARE CONTINUE HANDLER
		FOR NOT FOUND
	BEGIN
		SET eof = TRUE;
	END;
    
    
	OPEN cur;
    
		`rs_loop`:
		LOOP
			FETCH cur INTO rTotal, rAging;
			IF eof IS TRUE THEN
				LEAVE rs_loop;
			END IF;
			
			SET gTotal = gTotal + rTotal;
            
		END LOOP;
    
    CLOSE cur;

	SET oTotal = gTotal;

END;

create
    definer = root@`%` procedure Get_Total_Resolved_Nationwide(IN days int(2), OUT oTotal int(4))
BEGIN

    DECLARE eof BOOL DEFAULT FALSE;
    DECLARE rTotal, rAging INT DEFAULT 0;
    DECLARE gTotal INT DEFAULT 0; 
    
	DECLARE cur CURSOR FOR
		SELECT COUNT(A.C_ID) AS TOTAL,GET_AGING_WEEKDAYS(A.CREATED_DATE,A.CLOSED_DATE) AS AGING
		FROM TBL_CASE A
		INNER JOIN TBL_CASE_DETAIL B ON A.C_ID = B.C_ID
		WHERE B.CASE_STATUS = 70
		GROUP BY AGING
		HAVING AGING <= days;

	DECLARE CONTINUE HANDLER
		FOR NOT FOUND
	BEGIN
		SET eof = TRUE;
	END;
    
    
	OPEN cur;
    
		`rs_loop`:
		LOOP
			FETCH cur INTO rTotal, rAging;
			IF eof IS TRUE THEN
				LEAVE rs_loop;
			END IF;
			
			SET gTotal = gTotal + rTotal;
            
		END LOOP;
    
    CLOSE cur;

	SET oTotal = gTotal;

END;

create
    definer = root@`%` procedure Get_Total_Unread_Message(IN hID int)
BEGIN
	    
	SELECT COUNT(T1.NL_ID) AS TOTAL 
    FROM TBL_NOTIFICATION_LOG T1
    JOIN TBL_CASE_DETAIL T2 ON T1.C_ID = T2.C_ID
    WHERE T1.STATUS = 0 AND T1.H_ID = hID AND T2.CASE_STATUS < 73;    

    
END;

create
    definer = root@`%` procedure Get_User_Profile_By_Email(IN iEmail varchar(50))
BEGIN
	
	SELECT H_ID 
    FROM TBL_HERO 
    WHERE EMAIL = iEmail AND ACTIVATION_STATUS = 'Y' LIMIT 1;
	
END;

create
    definer = root@`%` procedure Get_User_Profile_By_ID(IN hID int)
BEGIN
	
    SET @rownum=0;
    
	SELECT T1.*, COUNT(T2.SCORE) AS RANK
	FROM VW_HERO_DETAIL_WITH_RANK T1
	JOIN VW_HERO_DETAIL_WITH_RANK T2 ON T1.SCORE < T2.SCORE OR (T1.SCORE=T2.SCORE AND T1.H_ID = T2.H_ID)
	WHERE T1.ACTIVATION_STATUS = 'Y' AND T1.H_ID = hID 
	GROUP BY 
		T1.H_ID,T1.NRIC_NUM,T1.MOBILE_NUM,T1.CATEGORY,T1.SH_ID,T1.SCORE,T1.LEVEL,T1.NICKNAME,T1.B_ID,T1.STATE_ID,
        T1.POSITION_ID,T1.DIVISION_ID,T1.ZONE_ID,T1.TEAM_ID,T1.MY_STATUS,T1.LAST_LOGGED_IN
	ORDER BY RANK
	LIMIT 1;
    	
END;

create
    definer = root@`%` procedure Get_User_Statistic_Info(IN hID int)
BEGIN

	SELECT T1.EMAIL, 
	SUM(CASE WHEN T3.FLAG = 'COMPLAINT' THEN 1 ELSE 0 END) AS TOTAL_COMPLAINT,
	SUM(CASE WHEN T3.FLAG = 'SALES' THEN 1 ELSE 0 END) AS TOTAL_SALES
    FROM TBL_HERO T1
    JOIN TBL_CASE T2 ON T2.H_ID = T1.H_ID
    JOIN TBL_CASE_DETAIL T3 ON T3.C_ID = T2.C_ID
    WHERE T1.H_ID = hID AND T3.CASE_STATUS <> 75;

END;

create
    definer = root@`%` procedure Get_VOC_Result(IN hID int, IN category varchar(10), IN startDate varchar(10),
                                                IN endDate varchar(10), OUT result varchar(15))
BEGIN
	
    DECLARE shID,maxRating,totalRating INT DEFAULT 0;
    
	SELECT SH_ID INTO shID FROM TBL_HERO_PROFILE WHERE H_ID = hID LIMIT 1;   
    
    IF category = "GROUP" THEN

        SELECT COUNT(C_ID)*5 AS totalCID, SUM(RATING) AS sumRating
        INTO maxRating,totalRating
        FROM TBL_CASE_DETAIL
        WHERE CASE_STATUS = 70 AND RATING <> 0 AND SH_ID = shID;        
        
    ELSE 
		
        SELECT COUNT(T1.C_ID)*5 AS totalCID, SUM(T1.RATING) AS sumRating
        INTO maxRating,totalRating
        FROM TBL_CASE_DETAIL T1
        INNER JOIN TBL_CASE T2 ON T1.C_ID = T2.C_ID
        WHERE T1.CASE_STATUS = 70 AND T1.RATING <> 0 AND T2.OWNER_ID = hID;
		                
    END IF;
	
	IF totalRating <> 0 THEN
		SET result = totalRating/maxRating * 100;
        SET result = ROUND(result, 2);
	ELSE
		SET result = 0;
	END IF; 
    
    
END;

create
    definer = root@`%` function INSERT_AVATAR_PICTURE(hID int, fileName blob) returns int deterministic reads sql data
BEGIN

	CALL Insert_Avatar_Picture(hID, fileName, @bID);

	RETURN (SELECT @bID);

END;

create
    definer = root@`%` function INSERT_CASE_PICTURE(cToken varchar(32), fileName blob, longitude varchar(20),
                                                    latitude varchar(20)) returns varchar(12)
BEGIN

	CALL Insert_Case_Picture(cToken, fileName, longitude, latitude, @oCaseNum);

	RETURN (SELECT @oCaseNum);

END;

create
    definer = root@`%` function INVITE_TO_GCHAT(cToken varchar(32), hToken varchar(32), oID int) returns int
BEGIN

	CALL Invite_To_GChat(cToken,hToken,oID, @oGCID);

	RETURN (SELECT @oGCID);

END;

create
    definer = root@`%` function IS_EMAIL_VALID(email varchar(50)) returns int(1) deterministic reads sql data
BEGIN
		
	RETURN (SELECT email REGEXP '^[A-Za-z0-9._%\-+!#$&/=?^|~]+@[A-Za-z0-9.-]+[.][A-Za-z]+$');

END;

create
    definer = root@`%` function IS_GCHAT_MEMBER(hID int, cToken varchar(32)) returns tinyint(1)
BEGIN

	CALL Is_GChat_Member(hID, cToken, @isGChatMember);
	RETURN (SELECT @isGChatMember);

END;

create
    definer = root@`%` function IS_LOGGER_VIP(hID int) returns varchar(500) deterministic reads sql data
BEGIN

	CALL Is_Logger_VIP(hID, @oLogger);
	RETURN (SELECT @oLogger);

END;

create
    definer = root@`%` function IS_LOGGER_VIP1(hID int) returns varchar(500) deterministic reads sql data
BEGIN

	CALL Is_Logger_VIP1(hID, @oLogger);
	RETURN (SELECT @oLogger);

END;

create
    definer = root@`%` function IS_REQUESTOR_ADMIN(hID int) returns tinyint(1)
BEGIN

	CALL Is_Requestor_Admin(hID, @isAdmin);
	RETURN (SELECT @isAdmin);

END;

create
    definer = root@`%` function IS_REQUESTOR_INTERNAL(email varchar(50)) returns int
BEGIN

	CALL Is_Requestor_Internal(email, @oHID);

	RETURN (SELECT @oHID);

END;

create
    definer = root@`%` function IS_REQUESTOR_LOGGER(hID int, cToken varchar(32)) returns tinyint(1)
BEGIN

	CALL Is_Requestor_Logger(hID,cToken, @isLogger);
	RETURN (SELECT @isLogger);

END;

create
    definer = root@`%` function IS_REQUESTOR_OWNER(hID int, cToken varchar(32)) returns tinyint(1)
BEGIN

	CALL Is_Requestor_Owner(hID,cToken, @isOwner);
	RETURN (SELECT @isOwner);

END;

create
    definer = root@`%` function IS_REQUESTOR_STAKEHOLDER(hID int) returns tinyint(1)
BEGIN

	CALL Is_Requestor_Stakeholder(hID, @isStakeholder);
	RETURN (SELECT @isStakeholder);

END;

create
    definer = root@`%` function IS_STAKEHOLDER_ADMIN(hID int, shID int(4)) returns tinyint(1)
BEGIN

	CALL Is_Stakeholder_Admin(hID, shID, @isStakeholderAdmin);
	RETURN (SELECT @isStakeholderAdmin);

END;

create
    definer = root@`%` function IS_STAKEHOLDER_COORDINATOR(hID int, shID int(4)) returns tinyint(1)
BEGIN

	CALL Is_Stakeholder_Coordinator(hID, shID, @isStakeholderCoordinator);
	RETURN (SELECT @isStakeholderCoordinator);

END;

create
    definer = root@`%` function IS_STAKEHOLDER_MEMBER(hToken varchar(32), hID int, shID int(4)) returns tinyint(1)
BEGIN

	CALL Is_Stakeholder_Member(hToken, hID, shID, @isStakeholderMember);
	RETURN (SELECT @isStakeholderMember);

END;

create
    definer = root@`%` procedure Insert_Avatar_Picture(IN hID int, IN fileName blob, OUT bID int)
BEGIN

	DECLARE bID,db_bID INT DEFAULT 0;

	SELECT B_ID INTO db_bID
    FROM TBL_HERO_PROFILE
    WHERE H_ID = hID LIMIT 1;

	IF db_bID > 0 THEN

		UPDATE TBL_BLOB
        SET PICTURE = fileName
        WHERE B_ID = db_bID
        LIMIT 1;
        
        SET bID = db_bID;
        
	ELSE
    
        IF fileName <> '' THEN
			
            INSERT INTO TBL_BLOB (PICTURE) VALUES (fileName);
			SET bID = LAST_INSERT_ID();       
			
			UPDATE TBL_HERO_PROFILE SET B_ID = bID
			WHERE H_ID = hID LIMIT 1;
            
		END IF;
            
    END IF;
   

END;

create
    definer = root@`%` procedure Insert_Case_Picture(IN cToken varchar(32), IN fileName blob, IN longitude varchar(20),
                                                     IN latitude varchar(20), OUT oCaseNum varchar(12))
BEGIN

	DECLARE bID INT;
	DECLARE pID INT;
	DECLARE cID INT DEFAULT 0;
	DECLARE caseNum VARCHAR(12) DEFAULT '';
	
    SELECT C_ID,CASE_NUM INTO cID,caseNum FROM TBL_CASE WHERE C_TOKEN = cToken LIMIT 1;

	
	IF cID > 0 THEN
		
        INSERT INTO TBL_BLOB (PICTURE) VALUES (fileName);
		SET bID = LAST_INSERT_ID();       

		INSERT INTO TBL_PICTURE (C_ID,B_ID,LONGITUDE,LATITUDE)
		VALUES (cID, bID, longitude, latitude);
        
	END IF;
    
    SET oCaseNum = caseNum;

END;

create
    definer = root@`%` procedure Insert_Notification_Log(IN cID int)
BEGIN

	INSERT INTO TBL_NOTIFICATION_LOG(H_ID,C_ID)
	SELECT H_ID,C_ID FROM TBL_GROUP_CHAT WHERE C_ID = cID;

	INSERT INTO TBL_NOTIFICATION_LOG(H_ID,C_ID)
	SELECT H_ID,C_ID FROM TBL_CASE WHERE C_ID = cID LIMIT 1;

	INSERT INTO TBL_NOTIFICATION_LOG(H_ID,C_ID)
	SELECT OWNER_ID,C_ID FROM TBL_CASE WHERE C_ID = cID LIMIT 1;

	INSERT INTO TBL_NOTIFICATION_LOG(H_ID,C_ID)
	SELECT OWNER_ID_SUPPORT,C_ID FROM TBL_CASE 
    WHERE C_ID = cID AND OWNER_ID_SUPPORT != 0 AND OWNER_ID_SUPPORT != OWNER_ID 
    LIMIT 1;


END;

create
    definer = root@`%` procedure Invite_To_GChat(IN cToken varchar(32), IN hToken varchar(32), IN oID int,
                                                 OUT oGCID int)
BEGIN

	DECLARE hID,cID,shID,isUserExist,isCaseOwner,isGroupMember INT DEFAULT 0;
    DECLARE proceed BOOL DEFAULT FALSE;
    DECLARE msg VARCHAR(250);
    DECLARE isAdmin,isStakeholderAdmin,isStakeholderCoordinator BOOL DEFAULT FALSE;
    
    SELECT T1.H_ID,T2.SH_ID INTO hID,shID 
    FROM TBL_HERO T1 
    INNER JOIN TBL_HERO_PROFILE T2 ON T1.H_ID = T2.H_ID
    WHERE T1.H_TOKEN = hToken LIMIT 1;
    
    SELECT C_ID INTO cID FROM TBL_CASE WHERE C_TOKEN = cToken LIMIT 1;

    SET isAdmin = IS_REQUESTOR_ADMIN(oID);
    SET isStakeholderAdmin = IS_STAKEHOLDER_ADMIN(oID,shID);
    SET isStakeholderCoordinator = IS_STAKEHOLDER_COORDINATOR(oID,shID);
    
	SELECT GC_ID INTO isUserExist 
    FROM TBL_GROUP_CHAT
    WHERE C_ID = cID AND H_ID = hID 
    LIMIT 1;    
    
    IF isUserExist = 0 THEN 
    
		SELECT COUNT(C_ID) AS TOTAL INTO isCaseOwner 
        FROM TBL_CASE 
		WHERE C_TOKEN = cToken AND (OWNER_ID = oID OR OWNER_ID_SUPPORT = oID) 
		LIMIT 1;
		
		IF isCaseOwner > 0 OR isAdmin OR isStakeholderAdmin OR isStakeholderCoordinator THEN
			SET proceed = TRUE;
		END IF;
				
		

		IF proceed = TRUE THEN
            
			INSERT INTO TBL_GROUP_CHAT (C_ID,H_ID) VALUES (cID, hID);
			SET isUserExist = LAST_INSERT_ID(); 

		END IF;
    
    END IF;
    
    SET oGCID = isUserExist;
    
END;

create
    definer = root@`%` procedure Is_GChat_Member(IN hID int, IN cToken varchar(32), OUT isGChatMember tinyint(1))
BEGIN
	
    DECLARE count INT DEFAULT 0;

	SELECT COUNT(T1.GC_ID) INTO count 
    FROM TBL_GROUP_CHAT T1
    INNER JOIN TBL_CASE T2 ON T2.C_ID = T1.C_ID    
    WHERE T2.C_TOKEN = cToken AND T1.H_ID = hID;
        
    IF count > 0 THEN
		SET isGChatMember = TRUE;    
	ELSE
		SET isGChatMember = FALSE;    
    END IF;    


END;

create
    definer = root@`%` procedure Is_Logger_VIP(IN hID int, OUT oLogger varchar(500))
BEGIN

	DECLARE iEmail VARCHAR(50) DEFAULT '';        	
	DECLARE foundRow INT DEFAULT 0;        	
	
    /*SELECT EMAIL INTO iEmail 
    FROM TBL_HERO
    WHERE H_ID = hID
    LIMIT 1;
    
    SELECT CONCAT(UPPER(STAFF_NAME),' - ',DESIGNATION) AS LOGGER
    INTO oLogger
    FROM TBL_STAFF
    WHERE EMAIL = iEmail AND (FLAG = 'VIP1' OR FLAG = 'VIP2')
    LIMIT 1;*/

	SELECT CONCAT(UPPER(B.FULLNAME),' - ',B.DESIGNATION) AS LOGGER
    INTO oLogger
    FROM TBL_HERO A, TBL_LDAP_PROFILE B
    WHERE A.H_ID = hID AND A.EMAIL = B.EMAIL AND B.MANAGER_LVL IN('T')
    LIMIT 1;
    
    SET foundRow = FOUND_ROWS();
    
    IF 0 = foundRow THEN
		SET oLogger = '';
    END IF;
        
END;

create
    definer = root@`%` procedure Is_Logger_VIP1(IN hID int, OUT oLogger varchar(500))
BEGIN

	DECLARE iEmail VARCHAR(50) DEFAULT '';        	
	DECLARE foundRow INT DEFAULT 0;        	
	
    SELECT EMAIL INTO iEmail 
    FROM TBL_HERO
    WHERE H_ID = hID
    LIMIT 1;
    
    /* ONLY FOR RRT */
    SELECT CONCAT(UPPER(STAFF_NAME),' - ',DESIGNATION) AS LOGGER
    INTO oLogger
    FROM TBL_STAFF
    WHERE EMAIL = iEmail AND FLAG = 'VIP1'
    LIMIT 1;
    SET foundRow = FOUND_ROWS();
    
    IF 0 = foundRow THEN
		SET oLogger = '';
    END IF;
        
END;

create
    definer = root@`%` procedure Is_Logger_VIP_New(IN hID int, OUT oLogger varchar(500))
BEGIN

DECLARE iEmail VARCHAR(50) DEFAULT '';
DECLARE foundRow INT DEFAULT 0;  

	SELECT A.EMAIL INTO iEmail 
    FROM TBL_HERO A,TBL_LDAP_PROFILE B
    WHERE A.H_ID = hID AND A.EMAIL = B.EMAIL AND B.MANAGER_LVL NOT IN('M','N','E')
    LIMIT 1;
    
    SELECT CONCAT(UPPER(FULLNAME),' - ',DESIGNATION) AS LOGGER
    INTO oLogger
    FROM TBL_LDAP_PROFILE
    WHERE EMAIL = iEmail 
    LIMIT 1;
    SET foundRow = FOUND_ROWS();
    
    IF 0 = foundRow THEN
		SET oLogger = '';
    END IF;

END;

create
    definer = root@`%` procedure Is_Requestor_Admin(IN hID int, OUT isAdmin tinyint(1))
BEGIN

	DECLARE stakeholderName VARCHAR(10) DEFAULT '';        	

    SELECT T2.L_NAME INTO stakeholderName 
    FROM TBL_HERO_PROFILE T1
    INNER JOIN TBL_LOV T2 ON T1.SH_ID = T2.L_ID
    WHERE T1.CATEGORY = 'STAKEHOLDER' AND T1.H_ID = hID AND T1.SH_ID != 0 
    LIMIT 1;
	
    IF stakeholderName = 'ADMIN' THEN
		SET isAdmin = TRUE;    
	ELSE
		SET isAdmin = FALSE;    
    END IF;

END;

create
    definer = root@`%` procedure Is_Requestor_Internal(IN iEmail varchar(50), OUT oHID int)
BEGIN

    DECLARE hID INT DEFAULT 0;

    
	SELECT H_ID INTO hID FROM TBL_HERO
    WHERE EMAIL = iEmail AND PASSWORD != 'EXTERNAL'
    LIMIT 1;

	SET oHID = hID;

END;

create
    definer = root@`%` procedure Is_Requestor_Logger(IN hID int, IN cToken varchar(32), OUT isLogger tinyint(1))
BEGIN

    DECLARE cID INT(11) DEFAULT 0;

	SELECT C_ID INTO cID
    FROM TBL_CASE
    WHERE C_TOKEN = cToken AND H_ID = hID
    LIMIT 1;
	
    IF cID > 0 THEN
		SET isLogger = TRUE;
    ELSE
		SET isLogger = FALSE;
    END IF;


END;

create
    definer = root@`%` procedure Is_Requestor_Owner(IN oID int, IN cToken varchar(32), OUT isOwner tinyint(1))
BEGIN
	
    DECLARE cID INT(11) DEFAULT 0;

	SELECT C_ID INTO cID
    FROM TBL_CASE
    WHERE C_TOKEN = cToken AND (OWNER_ID = oID OR OWNER_ID_SUPPORT = oID)
    LIMIT 1;
	
    IF cID > 0 THEN
		SET isOwner = TRUE;
    ELSE
		SET isOwner = FALSE;
    END IF;

END;

create
    definer = root@`%` procedure Is_Requestor_Stakeholder(IN hID int, OUT isStakeholder tinyint(1))
BEGIN

	DECLARE stakeholderName VARCHAR(10) DEFAULT '';        	

    SELECT T2.L_NAME INTO stakeholderName 
    FROM TBL_HERO_PROFILE T1
    INNER JOIN TBL_LOV T2 ON T1.SH_ID = T2.L_ID
    WHERE T1.CATEGORY = 'STAKEHOLDER' AND T1.H_ID = hID AND T1.SH_ID != 0 
    LIMIT 1;
	
    IF stakeholderName <> '' THEN
		SET isStakeholder = TRUE;    
	ELSE
		SET isStakeholder = FALSE;    
    END IF;


END;

create
    definer = root@`%` procedure Is_Stakeholder_Admin(IN hID int, IN shID int(4), OUT isStakeholderAdmin tinyint(1))
BEGIN

	DECLARE stakeholderName VARCHAR(10) DEFAULT '';        	

    SELECT T3.L_NAME INTO stakeholderName 
    FROM TBL_HERO_PROFILE T1
    INNER JOIN TBL_HERO T2 ON T1.H_ID = T2.H_ID
    INNER JOIN TBL_LOV T3 ON T1.SH_ID = T3.L_ID
    WHERE T1.CATEGORY = 'STAKEHOLDER' AND T2.H_GROUP = 'ADMIN' AND T1.H_ID = hID 
    LIMIT 1;
	
    IF stakeholderName <> '' THEN
		SET isStakeholderAdmin = TRUE;    
	ELSE
		SET isStakeholderAdmin = FALSE;    
    END IF;    

END;

create
    definer = root@`%` procedure Is_Stakeholder_Coordinator(IN hID int, IN shID int(4), OUT isStakeholderCoordinator tinyint(1))
BEGIN

	DECLARE hpID INT(11) DEFAULT 0;        	

    SELECT T1.HP_ID INTO hpID 
    FROM TBL_HERO_PROFILE T1
    INNER JOIN TBL_HERO T2 ON T1.H_ID = T2.H_ID
    INNER JOIN TBL_LOV T3 ON T1.SH_ID = T3.L_ID
    LEFT JOIN TBL_LOV T4 ON T1.POSITION_ID = T4.L_ID
    WHERE T1.CATEGORY = 'STAKEHOLDER' AND T1.H_ID = hID 
		AND UPPER(T4.L_NAME) = 'COORDINATOR' AND T4.L_GROUP = 'POSITION'
    LIMIT 1;
	
    IF hpID <> 0 THEN
		SET isStakeholderCoordinator = TRUE;    
	ELSE
		SET isStakeholderCoordinator = FALSE;    
    END IF;    

END;

create
    definer = root@`%` procedure Is_Stakeholder_Member(IN hToken varchar(32), IN hID int, IN shID int(4),
                                                       OUT isStakeholderMember tinyint(1))
BEGIN

	DECLARE stakeholderName VARCHAR(10) DEFAULT '';        	
	
    IF hID = 0 AND hToken <> '' THEN
		
        SELECT H_ID INTO hID
        FROM TBL_HERO
        WHERE H_TOKEN = hToken
        LIMIT 1;
    
    END IF;    

    SELECT T3.L_NAME INTO stakeholderName 
    FROM TBL_HERO_PROFILE T1
    INNER JOIN TBL_HERO T2 ON T1.H_ID = T2.H_ID
    INNER JOIN TBL_LOV T3 ON T1.SH_ID = T3.L_ID
    WHERE T1.CATEGORY = 'STAKEHOLDER' AND T1.H_ID = hID AND T1.SH_ID = shID 
    LIMIT 1;
	
    IF stakeholderName <> '' THEN
		SET isStakeholderMember = TRUE;    
	ELSE
		SET isStakeholderMember = FALSE;    
    END IF;    


END;

create
    definer = root@`%` function PUSH_CHAT_MESSAGE(cToken varchar(32), hID int, message text, flag varchar(2),
                                                  filename blob) returns int deterministic reads sql data
BEGIN

	CALL Push_Chat_Message(cToken,hID,message,flag,filename, @oMBID);

	RETURN (SELECT @oMBID);

END;

create
    definer = root@`%` procedure Pull_Chat_Message(IN cToken varchar(32), IN hID int, IN iflag varchar(2))
BEGIN

    DECLARE cID INT DEFAULT 0;
	DECLARE isGChatMember,isCaseLogger,isCaseOwner,isStakeholder BOOL DEFAULT FALSE;
    SET isGChatMember = IS_GCHAT_MEMBER(hID,cToken);
    SET isCaseLogger = IS_REQUESTOR_LOGGER(hID,cToken);
    SET isCaseOwner = IS_REQUESTOR_OWNER(hID,cToken);
    SET isStakeholder = IS_REQUESTOR_STAKEHOLDER(hID);
	
    
    IF isCaseLogger OR isCaseOwner OR isGChatMember OR isStakeholder THEN

		SELECT C_ID INTO cID FROM TBL_CASE WHERE C_TOKEN = cToken LIMIT 1;		
        
		UPDATE TBL_NOTIFICATION_LOG 
        SET STATUS = 1 
        WHERE STATUS = 0 AND C_ID = cID AND H_ID = hID;
        
		SELECT DISTINCT(POSTED_DATE),C_ID,H_ID,FLAG,MESSAGE,C_TOKEN,O_ID,S_ID,FULLNAME,FILENAME,B_ID 
        FROM VW_CHAT_MESSAGES 
        WHERE C_TOKEN = cToken AND FLAG = iflag
        ORDER BY POSTED_DATE DESC;
    
    ELSE
		
        
		SELECT * FROM VW_CHAT_MESSAGES WHERE C_ID = 0;
    
    END IF;


END;

create
    definer = root@`%` procedure Push_Chat_Message(IN cToken varchar(32), IN hID int, IN message text,
                                                   IN flag varchar(2), IN filename blob, OUT oMBID int)
BEGIN

	DECLARE isGChatMember,isCaseLogger,isCaseOwner,isAdmin,isStakeholderAdmin,isStakeholder BOOL DEFAULT FALSE;
    DECLARE cID,mbID,bID,shID INT DEFAULT 0;
    DECLARE msgTemplate VARCHAR(250);    
    DECLARE caseNum VARCHAR(12);
    DECLARE completeMsg TEXT;

    SELECT C_ID,CASE_NUM INTO cID,caseNum FROM TBL_CASE WHERE C_TOKEN = cToken LIMIT 1;
    SELECT SH_ID INTO shID FROM TBL_HERO_PROFILE WHERE H_ID = hID LIMIT 1;
    
    SET isAdmin = IS_REQUESTOR_ADMIN(hID);    
    SET isStakeholderAdmin = IS_STAKEHOLDER_ADMIN(hID,shID);
        
    SET isGChatMember = IS_GCHAT_MEMBER(hID,cToken);
    SET isCaseLogger = IS_REQUESTOR_LOGGER(hID,cToken);
    SET isCaseOwner = IS_REQUESTOR_OWNER(hID,cToken);
    SET isStakeholder = IS_REQUESTOR_STAKEHOLDER(hID);	
    
    IF cID <> 0 AND message <> '' AND (isStakeholder OR isCaseLogger OR isCaseOwner OR isGChatMember OR isAdmin OR isStakeholderAdmin) THEN
		
        IF filename <> '' THEN
			INSERT INTO TBL_BLOB (PICTURE) VALUES (filename);
			SET bID = LAST_INSERT_ID();       
		END IF;
        
		INSERT INTO TBL_MESSAGE_BOX (C_ID,H_ID,B_ID,MESSAGE,FLAG) VALUES (cID, hID, bID, message, flag);
		SET mbID = LAST_INSERT_ID(); 

		/*SELECT MESSAGE INTO msgTemplate FROM TBL_NOTIFICATION_TEMPLATE
		WHERE CONTROLLER = 'CHAT' AND TEMPLATE = 'PUSH' LIMIT 1;*/
		        
        SET completeMsg = REPLACE('Chat ({CASENUM}): {CHATMSG}','{CASENUM}',caseNum);
        SET completeMsg = REPLACE(completeMsg,'{CHATMSG}',message);
        
		INSERT INTO TBL_NOTIFICATION (H_ID, C_ID, MESSAGE, FLAG) 
        VALUES (hID, cID, completeMsg, 'CHAT');

	END IF;
    
	SET oMBID = mbID;
    
END;

create
    definer = root@`%` function RATE_AGENT(hID int, cToken varchar(32), rating int(1), remark text) returns int(4)
BEGIN

	CALL Rate_Agent(hID, cToken, rating, remark, @oRowCount);

	RETURN (SELECT @oRowCount);

END;

create
    definer = root@`%` function REDEFINED_FLAG(caseContent text) returns varchar(15) deterministic reads sql data
BEGIN

    IF LOCATE('sdz rebate',caseContent) > 0 THEN
		RETURN "AR";
    ELSEIF LOCATE('#save',caseContent) > 0 THEN
		RETURN "PROTECT";                
    ELSEIF LOCATE('#sales',caseContent) > 0 THEN
		RETURN "SALES";                
    ELSEIF LOCATE('#unifisuperhero',caseContent) > 0 THEN
		RETURN "DRUNIFI";                
    ELSE 
		RETURN "COMPLAINT";    
	END IF;
    
    
END;

create
    definer = root@`%` function REMOVE_FROM_GCHAT(cToken varchar(32), hToken varchar(32), oID int) returns int(4)
BEGIN

	CALL Remove_From_GChat(cToken,hToken,oID, @rowCount);

	RETURN (SELECT @rowCount);

END;

create
    definer = root@`%` function REOPEN_CASE(cToken varchar(32), oID int) returns int(4) deterministic reads sql data
BEGIN

	CALL Reopen_Case(cToken,oID, @rowCount);

	RETURN (SELECT @rowCount);

END;

create
    definer = root@`%` function RESEND_ACTIVATION_CODE(email varchar(50)) returns varchar(6)
BEGIN

	CALL Resend_Activation_Code(email, @oCode);
	RETURN (SELECT @oCode);

END;

create
    definer = root@`%` function RESEND_RESET_PASSWORD_CODE(email varchar(50)) returns varchar(6)
BEGIN

	CALL Resend_Reset_Password_Code(email, @oCode);
	RETURN (SELECT @oCode);	

END;

create
    definer = root@`%` function RESET_PASSWORD(resetKey varchar(6), email varchar(50), password varchar(32)) returns int(4)
BEGIN

	CALL Reset_Password(resetKey, email, password, @oRowCount);
	RETURN (SELECT @oRowCount);	

END;

create
    definer = root@`%` function RESET_PASSWORD_REQUEST(email varchar(50), resetKey varchar(6)) returns int
BEGIN

	CALL Reset_Password_Request(email, resetKey, @oPID);
	RETURN (SELECT @oPID);	

END;

create
    definer = root@`%` function RPA_CASE_ASSIGNMENT(iFlag varchar(15), areaLocationID int(7), caseContent text) returns int(7)
    deterministic
    reads sql data
BEGIN

	CALL RPA_Case_Assignment(iFlag,areaLocationID,caseContent, @oID);
    RETURN (SELECT @oID);

END;

create
    definer = root@`%` procedure RPA_Case_Assignment(IN iFlag varchar(15), IN areaLocationID int(7),
                                                     IN caseContent text, OUT oID int)
BEGIN
	
    DECLARE ownerID INT DEFAULT 0;
    DECLARE iFlag VARCHAR(32) DEFAULT '';
    
    IF iFlag = "COMPLAINT" THEN
		SET iFlag = REDEFINED_FLAG(caseContent);
    END IF;
    
    /*IF LOCATE('sdz billing',caseContent) > 0 THEN
		SET iFlag = "AR";
	END IF;*/
        
	IF iFlag = "AR" THEN
		
        SELECT T1.H_ID INTO ownerID
        FROM TBL_HERO_PROFILE T1
        LEFT JOIN TBL_LOV T2 ON T1.CATEGORY = T2.L_GROUP
        WHERE T1.CATEGORY = 'STAKEHOLDER' AND T1.POSITION_ID = 172 AND T1.STATE_ID = areaLocationID
        AND T2.L_NAME LIKE '%CMT%'
        LIMIT 1;
        
    END IF;	    
    
    SET oID = ownerID;

END;

create
    definer = root@`%` function RUN_RPA(hID int, oID int, areaLocationID int, caseContent text) returns int(7)
    deterministic
    reads sql data
BEGIN

	CALL run_RPA(hID,oID,areaLocationID,caseContent, @shID);
    RETURN (SELECT @shID);
    
END;

create
    definer = root@`%` function RUN_RPA_FEB(hID int, oID int, areaLocationID int, caseContent text) returns int(7)
    deterministic
    reads sql data
BEGIN

	CALL run_RPA_feb(hID,oID,areaLocationID,caseContent, @shID);
    RETURN (SELECT @shID);
    
END;

create
    definer = root@`%` procedure Rate_Agent(IN hID int, IN cToken varchar(32), IN iRating int(1), IN remark text,
                                            OUT oRowCount int(4)) modifies sql data
BEGIN
	
    DECLARE cID, rowCount INT DEFAULT 0;

	SELECT T1.C_ID INTO cID
    FROM TBL_CASE T1 
    INNER JOIN TBL_CASE_DETAIL T2 ON T1.C_ID = T2.C_ID
	WHERE T1.C_TOKEN = cToken AND T1.H_ID = hID AND T2.CASE_STATUS = 70 
    LIMIT 1;	
	
    IF cID > 0 THEN
    
		UPDATE TBL_CASE_DETAIL 
        SET RATING = iRating, RATING_REMARK = remark 
        WHERE C_ID = cID LIMIT 1;
        
		SET rowCount = ROW_COUNT();
    
    END IF;
    
    SET oRowCount = rowCount;

END;

create
    definer = root@`%` procedure Remove_From_GChat(IN cToken varchar(32), IN hToken varchar(32), IN oID int,
                                                   OUT rowCount int) modifies sql data
BEGIN

	DECLARE hID INT DEFAULT 0;
	DECLARE cID INT DEFAULT 0;
	DECLARE isGroupMember INT DEFAULT 0;
	DECLARE isCaseOwner INT DEFAULT 0;
    DECLARE proceed BOOL DEFAULT FALSE;
	SET rowCount = 0;
    
	SELECT T1.GC_ID,T2.C_ID,T3.H_ID INTO isGroupMember,cID,hID 
    FROM TBL_GROUP_CHAT T1
    INNER JOIN TBL_CASE T2 ON T2.C_ID = T1.C_ID
    INNER JOIN TBL_HERO T3 ON T3.H_ID = T1.H_ID
    WHERE T2.C_TOKEN = cToken AND T3.H_TOKEN = hToken 
    LIMIT 1;    
    
    
    IF isGroupMember > 0 THEN     
    
		SELECT COUNT(C_ID) AS TOTAL INTO isCaseOwner 
		FROM TBL_CASE 
		WHERE C_TOKEN = cToken AND (OWNER_ID = oID OR OWNER_ID_SUPPORT = oID) 
		LIMIT 1;
		
		IF isCaseOwner > 0 THEN
			SET proceed = TRUE;
		END IF;

		IF proceed = TRUE THEN
		
			DELETE FROM TBL_GROUP_CHAT
			WHERE C_ID = cID AND H_ID = hID 
			LIMIT 1;
            
			SET rowCount = ROW_COUNT();
			
		END IF;
	
    END IF;    
    
END;

create
    definer = root@`%` procedure Reopen_Case(IN cToken varchar(32), IN oID int, OUT rowCount int) modifies sql data
BEGIN

    DECLARE isAdmin BOOL DEFAULT FALSE;
    DECLARE cID,shID INT DEFAULT 0;

    SELECT T2.SH_ID INTO shID 
    FROM TBL_HERO T1 
    INNER JOIN TBL_HERO_PROFILE T2 ON T1.H_ID = T2.H_ID
    WHERE T1.H_ID = oID LIMIT 1;
    
    SET isAdmin = IS_STAKEHOLDER_ADMIN(oID,shID);

    IF isAdmin THEN
		
        SELECT C_ID INTO cID FROM TBL_CASE WHERE C_TOKEN = cToken LIMIT 1; 
        
		UPDATE TBL_CASE_DETAIL 
		SET CASE_STATUS = 67
		WHERE C_ID = cID 
		LIMIT 1;		
		SET rowCount = ROW_COUNT();
        
        IF rowCount > 0 THEN
			INSERT INTO TBL_ACTION_REMARK (C_ID,H_ID,CT_ID,B_ID,REMARK_TYPE,REMARK)
			VALUES (cID,oID,0,null,'IN-PROGRESS','Case Re-Opened');        
        END IF;
	    
    ELSE
		SET rowCount = 0;    
    END IF;

END;

create
    definer = root@`%` procedure Reporting_Raw_Data()
BEGIN

SELECT  A.CASE_NUM as HERO_CASE_ID, 
REPLACE(REPLACE(REPLACE((SELECT E.CUSTOMER_NAME FROM  DB_HERO.TBL_CUSTOMER_PROFILE E WHERE E.C_ID = A.C_ID),'\r',' '),'\n',' '),',',' ')CUST_NAME,
REPLACE(REPLACE(REPLACE(REPLACE(B.CASE_CONTENT, '\r', ' '), '\n', ' '),',',' '),';',' ')AS DESCRIPTION, 
(SELECT D.FULLNAME FROM  DB_HERO.TBL_HERO D WHERE D.H_ID = A.H_ID)HERO_LOGGER,
(SELECT D.EMAIL FROM  DB_HERO.TBL_HERO D WHERE D.H_ID = A.H_ID)EMAIL_LOGGER,
(SELECT C.L_NAME FROM  DB_HERO.TBL_LOV C WHERE C.L_ID = B.AREA_LOCATION)AREA_LOCATION,
CASE 
WHEN (SELECT C.L_NAME FROM  DB_HERO.TBL_LOV C WHERE C.L_ID = B.CASE_STATUS) = 'NEW' THEN 'UNASSIGNED'
ELSE (SELECT C.L_NAME FROM  DB_HERO.TBL_LOV C WHERE C.L_ID = B.CASE_STATUS)
END CASE_STATUS,
(SELECT C.L_NAME FROM  DB_HERO.TBL_LOV C WHERE C.L_ID = B.CASE_TYPE)CASE_TYPE,
CASE
WHEN (select E.FLAG from DB_HERO.TBL_HERO D, DB_HERO.TBL_STAFF E where D.H_ID = A.H_ID AND D.EMAIL = E.EMAIL) = 'VIP' THEN 'VIP'
ELSE NULL
END VIP,
REPLACE(REPLACE(B.PACKAGE_NAME,';',' '),',',' ') PACKAGE_NAME,(SELECT C.L_NAME FROM  DB_HERO.TBL_LOV C WHERE C.L_ID = B.PRODUCT_NAME)PRODUCT,
(SELECT C.L_NAME FROM  DB_HERO.TBL_LOV C WHERE C.L_ID = B.SEGMENT_ID)SEGMENT,
(SELECT D.FULLNAME FROM DB_HERO.TBL_HERO D WHERE D.H_ID = A.OWNER_ID)CASE_OWNER,
(select F.L_NAME from DB_HERO.TBL_HERO_PROFILE HP,DB_HERO.TBL_LOV F where HP.H_ID = A.OWNER_ID and HP.SH_ID = F.L_ID) as GROUP_,
REPLACE(REPLACE(REPLACE(REPLACE(B.SR_NUM,'\r', ' '),'\n', ' '),';',' '),',',' ') SR_NUM,REPLACE(REPLACE(REPLACE(REPLACE(B.TT_NUM,'\r', ' '),'\n', ' '),';',' '),',',' ')TT_NUM,
CASE
WHEN B.CASE_STATUS = 70 THEN 
(SELECT REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(G.REMARK,'\r', ' '),'\n', ' '), ',' ,' '),';',' '),'<',' ')FROM DB_HERO.TBL_ACTION_REMARK G WHERE G.C_ID = A.C_ID AND G.REMARK_TYPE ='CLOSED' LIMIT 1)
END UPDATE_REMARKS,
CASE
WHEN B.CASE_STATUS = 70 THEN 
(SELECT C.L_NAME FROM DB_HERO.TBL_ACTION_REMARK G,DB_HERO.TBL_LOV C WHERE G.C_ID = A.C_ID AND G.CT_ID = C.L_ID AND G.REMARK_TYPE ='CLOSED' LIMIT 1)
END CLOSURE_TYPE,
A.CREATED_DATE,DATE_FORMAT(A.CREATED_DATE,'%M %Y') MONTH_YEAR,
CASE
WHEN B.CASE_STATUS = 70 THEN 
	CASE
    WHEN (SELECT COUNT(*) FROM DB_HERO.TBL_ACTION_REMARK G WHERE G.C_ID = A.C_ID AND G.REMARK_TYPE ='IN-PROGRESS' LIMIT 1) > 0 THEN
    DATEDIFF(A.CLOSED_DATE,(SELECT G.LOGGED_DATE FROM DB_HERO.TBL_ACTION_REMARK G WHERE G.C_ID = A.C_ID AND G.REMARK_TYPE ='IN-PROGRESS' LIMIT 1))
    ELSE
		CASE
        WHEN (SELECT COUNT(*) FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SUPPORT' LIMIT 1) > 0 THEN 
			  DATEDIFF(A.CLOSED_DATE,(SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SUPPORT' LIMIT 1))
		ELSE  DATEDIFF(A.CLOSED_DATE,(SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SELF' LIMIT 1))
		END 
	END
END AGING_CLOSED,
CASE
WHEN  B.CASE_STATUS = 70 THEN (SELECT G.LOGGED_DATE FROM DB_HERO.TBL_ACTION_REMARK G WHERE G.C_ID = A.C_ID AND G.REMARK_TYPE ='CLOSED' LIMIT 1) 
END CLOSED_DATE,
DATEDIFF((SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='TRANSFER' LIMIT 1),A.CREATED_DATE)AGING_UNASSIGNED ,
(SELECT H.LOGGED_DATE FROM DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='TRANSFER' LIMIT 1) DATE_UNASSIGNED ,
CASE
WHEN (SELECT COUNT(*) FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='TRANSFER' LIMIT 1) > 0 THEN
	CASE 
    WHEN (SELECT COUNT(*) FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SUPPORT' LIMIT 1) > 0 THEN 
		DATEDIFF((SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SUPPORT' LIMIT 1),(SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='TRANSFER' LIMIT 1))
	ELSE DATEDIFF((SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SELF' LIMIT 1),(SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='TRANSFER' LIMIT 1))
    END
ELSE
	CASE
	WHEN (SELECT COUNT(*) FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SUPPORT' LIMIT 1) > 0 THEN 
		DATEDIFF((SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SUPPORT' LIMIT 1),A.CREATED_DATE)
	ELSE DATEDIFF((SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SELF' LIMIT 1),A.CREATED_DATE)
	END 
END AGING_ASSIGNED,
CASE
WHEN (SELECT COUNT(*) FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SUPPORT' LIMIT 1) > 0 THEN 
(SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SUPPORT' LIMIT 1) 
ELSE (SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SELF' LIMIT 1)
END ASSIGNED_DATE,
CASE
WHEN (SELECT COUNT(*) FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SUPPORT' LIMIT 1) > 0 THEN
DATEDIFF((SELECT G.LOGGED_DATE FROM DB_HERO.TBL_ACTION_REMARK G WHERE G.C_ID = A.C_ID AND G.REMARK_TYPE ='IN-PROGRESS' LIMIT 1),(SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SUPPORT' LIMIT 1)) 
ELSE DATEDIFF((SELECT G.LOGGED_DATE FROM DB_HERO.TBL_ACTION_REMARK G WHERE G.C_ID = A.C_ID AND G.REMARK_TYPE ='IN-PROGRESS' LIMIT 1),(SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SELF' LIMIT 1)) 
END AGING_INPROGRESS,
(SELECT G.LOGGED_DATE FROM DB_HERO.TBL_ACTION_REMARK G WHERE G.C_ID = A.C_ID AND G.REMARK_TYPE ='IN-PROGRESS' LIMIT 1) INPROGRESS_DATE,
DATEDIFF((SELECT G.LOGGED_DATE FROM DB_HERO.TBL_ACTION_REMARK G WHERE G.C_ID = A.C_ID AND G.REMARK_TYPE ='CANCELLED' LIMIT 1),A.CREATED_DATE) AGING_CANCELLED,
(SELECT G.LOGGED_DATE FROM DB_HERO.TBL_ACTION_REMARK G WHERE G.C_ID = A.C_ID AND G.REMARK_TYPE ='CANCELLED' LIMIT 1) CANCELLED_DATE,
CASE
WHEN B.CASE_STATUS = 70 THEN DATEDIFF(A.CLOSED_DATE,A.CREATED_DATE)
WHEN B.CASE_STATUS = 73 THEN DATEDIFF((SELECT G.LOGGED_DATE FROM DB_HERO.TBL_ACTION_REMARK G WHERE G.C_ID = A.C_ID AND G.REMARK_TYPE ='CANCELLED' LIMIT 1),A.CREATED_DATE)
ELSE DATEDIFF(SYSDATE(),A.CREATED_DATE)
END AGING, B.RATING
FROM DB_HERO.TBL_CASE A
JOIN DB_HERO.TBL_CASE_DETAIL B ON A.C_ID = B.C_ID
WHERE B.CASE_STATUS <> 75 AND A.CREATED_DATE >= CAST('2018-05-01' AS DATE) AND A.CREATED_DATE <= CAST('2018-08-06' AS DATE)
LIMIT 30000;


END;

create
    definer = root@`%` procedure Resend_Activation_Code(IN iEmail varchar(50), OUT oCode varchar(6))
BEGIN

	DECLARE hID INT DEFAULT 0;    
	DECLARE activationKey VARCHAR(6) DEFAULT '';    

	SELECT 
		H_ID
	INTO hID FROM
		TBL_HERO
	WHERE
		EMAIL = iEmail
			AND ACTIVATION_STATUS = 'N'
	LIMIT 1;

	IF hID > 0 THEN
    
		SELECT ACTIVATION_KEY INTO activationKey FROM TBL_HERO 
        WHERE H_ID = hID AND EMAIL = iEmail 
        LIMIT 1;
        
	END IF;

	SET oCode = activationKey;

END;

create
    definer = root@`%` procedure Resend_Reset_Password_Code(IN iEmail varchar(50), OUT oCode varchar(6))
BEGIN
	
    DECLARE resetKey VARCHAR(6) DEFAULT '';
    DECLARE hID INT DEFAULT 0;

    
	SET hID = IS_REQUESTOR_INTERNAL(iEmail);

	IF hID > 0 THEN
    
		SELECT 
			RESET_KEY
		INTO resetKey FROM
			TBL_PASSWORD_RETRIEVAL
		WHERE
			EMAIL = iEmail AND RESET_STATUS = 'N'
		LIMIT 1;
	
    END IF;
    
	SET oCode = resetKey;

END;

create
    definer = root@`%` procedure Reset_Password(IN resetKey varchar(6), IN iEmail varchar(50), IN iPassword varchar(32),
                                                OUT oRowCount int) modifies sql data
BEGIN
	
    DECLARE hID,prID,rowCount INT DEFAULT 0;

    
	SET hID = IS_REQUESTOR_INTERNAL(iEmail);

	IF hID > 0 THEN
		
        SELECT PR_ID INTO prID FROM TBL_PASSWORD_RETRIEVAL
        WHERE EMAIL = iEmail AND RESET_KEY = resetKey LIMIT 1;
        
        IF prID > 0 THEN 
			
            UPDATE TBL_HERO SET PASSWORD = iPassword WHERE EMAIL = iEmail LIMIT 1;
			SET rowCount = ROW_COUNT();		
		
			UPDATE TBL_PASSWORD_RETRIEVAL 
			SET RESET_STATUS = 'Y'
			WHERE EMAIL = iEmail AND RESET_STATUS = 'N';
            
		END IF;
        
	END IF;

	SET oRowCount = rowCount;

END;

create
    definer = root@`%` procedure Reset_Password_Request(IN iEmail varchar(50), IN resetKey varchar(6), OUT oPID int)
    modifies sql data
BEGIN
	
    DECLARE totalRequest INT DEFAULT 0;
    DECLARE hID INT DEFAULT 0;
    DECLARE pID INT DEFAULT 0;
	
    
	SET hID = IS_REQUESTOR_INTERNAL(iEmail);
    
	IF hID > 0 THEN
    
		UPDATE TBL_PASSWORD_RETRIEVAL 
        SET RESET_STATUS = 'Y'
		WHERE EMAIL = iEmail AND RESET_STATUS = 'N';
				
		INSERT INTO TBL_PASSWORD_RETRIEVAL (EMAIL, RESET_KEY) VALUES (iEmail, resetKey);
		SET pID = LAST_INSERT_ID();
		
	END IF;
    
    SET oPID = pID;

END;

create
    definer = root@`%` procedure Run_Cleanup_Job(OUT totalRow int)
BEGIN

	INSERT INTO TBL_CLEANUP_LOG (C_ID)
		SELECT T1.C_ID 
		FROM DB_HERO.TBL_CASE T1
		JOIN DB_HERO.TBL_CASE_DETAIL T2 ON T1.C_ID = T2.C_ID
		WHERE T2.CASE_STATUS = 75;	
    
    /* 
		RUN DELETE JOB 
        CASE_STATUS = 75 => 'DELETED'
    */
	DELETE T1, T2 
	FROM DB_HERO.TBL_CASE T1
	JOIN DB_HERO.TBL_CASE_DETAIL T2 ON T1.C_ID = T2.C_ID
	WHERE T2.CASE_STATUS = 75;	
    
    /* GET TOTAL DELETED ROWS */
    SET totalRow = ROW_COUNT();
    
END;

create
    definer = root@`%` function SET_ANNOUNCEMENT_TEXT(hID int, template varchar(30), message text, title varchar(200),
                                                      subtitle varchar(200), publishedDate varchar(10),
                                                      picture blob) returns int deterministic reads sql data
BEGIN

	CALL Set_Announcement_Text(hID,template,message,title,subtitle,publishedDate,picture, @ID);
	RETURN (SELECT @ID);
    
END;

create
    definer = root@`%` function SET_API_LOGGING(apiKey varchar(40), email varchar(50), logType varchar(10),
                                                content text) returns int deterministic reads sql data
BEGIN
	
    CALL Set_Api_Logging(apiKey,email,logType,content, @vID);
    RETURN (SELECT @vID);
    
END;

create
    definer = root@`%` function SET_INFOBLAST_LOG(iTo varchar(12), iMessage varchar(500), iDesc varchar(100),
                                                  cToken varchar(32)) returns int(7) deterministic reads sql data
BEGIN

	CALL Set_Infoblast_Log(iTo,iMessage,iDesc,cToken, @lastInsertedID);
    RETURN (SELECT @lastInsertedID);

END;

create
    definer = root@`%` function SET_LATEST_VERSION(appID int, appName varchar(45), appVersion varchar(10),
                                                   appDesc varchar(250), appExpired int) returns int
    deterministic
    reads sql data
BEGIN

	CALL Set_Latest_Version(appID,appName,appVersion,appDesc,appExpired, @vID);
    RETURN (SELECT @vID);
    
END;

create
    definer = root@`%` function SET_LDAP_PROFILE(apiKey varchar(40), staffID varchar(10), fullName varchar(100),
                                                 email varchar(50), nricNum varchar(15), mobileNum varchar(15),
                                                 managerLevel varchar(5), designation varchar(50), unit varchar(70),
                                                 division varchar(70), costCenter varchar(10)) returns int(4)
    deterministic
    reads sql data
BEGIN

    CALL Set_LDAP_Profile(apiKey,staffID,fullName,email,nricNum,mobileNum,managerLevel,designation,unit,division,costCenter, @oID);

	RETURN (SELECT @oID);

END;

create
    definer = root@`%` function SET_LOGIN_HISTORY(email varchar(150), phoneDesc varchar(255)) returns int(7)
    deterministic
    reads sql data
BEGIN

	CALL Set_Login_History(email,phoneDesc, @rowCount);
    RETURN (SELECT @rowCount);

END;

create
    definer = root@`%` function SET_LOG_HISTORY(email varchar(50), fullName varchar(150), authType varchar(10),
                                                logType varchar(3)) returns int
BEGIN

	CALL Set_Log_History(email, fullName, authType, logType, @oLHID);
	RETURN (SELECT @oLHID);	

END;

create
    definer = root@`%` function SET_NEW_LOV(lovName varchar(150), lovLabel varchar(150), lovGroup varchar(30),
                                            parentID int, lovFlag varchar(10)) returns int deterministic reads sql data
BEGIN

	CALL Set_New_LoV(lovName,lovLabel,lovGroup,parentID,lovFlag, @LID);
    RETURN (SELECT @LID);

END;

create
    definer = root@`%` function SIGN_IN(iEmail varchar(50), iPassword varchar(32)) returns int
BEGIN
	
	CALL Sign_In(iEmail, iPassword, @oLHID);
	RETURN (SELECT @oLHID);
    
END;

create
    definer = root@`%` function SIGN_OUT(iEmail varchar(50)) returns int
BEGIN

	CALL Sign_Out(iEmail, @oLHID);
	RETURN (SELECT @oLHID);

END;

create
    definer = root@`%` function SIGN_UP(apiKey varchar(40), fullName varchar(150), email varchar(50),
                                        password varchar(35), activationKey varchar(6),
                                        mobileNum varchar(12)) returns int
BEGIN

	CALL Sign_Up(apiKey, fullName, email, password, activationKey, mobileNum, @oHID);
	RETURN (SELECT @oHID);

END;

create
    definer = root@`%` function SUBMIT_NEW_CASE(hID int, caseNum varchar(12), caseContent text,
                                                customerName varchar(150), mobileNum varchar(15), areaLocationID int(7),
                                                flag varchar(15), sourceID int(4), caseTypeID int(7), productID int(7),
                                                segmentCode varchar(5), additionalRemark text,
                                                herobuddyResponse text) returns varchar(32) deterministic reads sql data
BEGIN

	CALL Submit_New_Case(customerName, mobileNum, caseContent, hID, caseNum, areaLocationID, flag, sourceID, caseTypeID, productID, segmentCode, additionalRemark, herobuddyResponse, @oCToken);

	RETURN (SELECT @oCToken);
    
END;

create
    definer = root@`%` procedure Set_Announcement_Text(IN hID int, IN template varchar(30), IN message text,
                                                       IN title varchar(200), IN subtitle varchar(200),
                                                       IN publishedDate varchar(10), IN picture blob, OUT ntID int)
    modifies sql data
BEGIN
	
	DECLARE bID INT DEFAULT 0;
    
    IF picture <> '' THEN

        INSERT INTO TBL_BLOB (PICTURE) VALUES (picture);
		SET bID = LAST_INSERT_ID();       

	END IF;

	INSERT INTO TBL_NOTIFICATION_TEMPLATE (B_ID,CONTROLLER,TEMPLATE,MESSAGE,TITLE,SUBTITLE,PUBLISHED_DATE)
    VALUES (bID,'APP',template,message,title,subtitle,publishedDate);

	SET ntID = LAST_INSERT_ID();       


END;

create
    definer = root@`%` procedure Set_Api_Logging(IN apiKey varchar(40), IN email varchar(50), IN logType varchar(10),
                                                 IN content text, OUT logID int) modifies sql data
BEGIN

	SET logID = 1;

END;

create
    definer = root@`%` procedure Set_Infoblast_Log(IN iTo varchar(12), IN iMessage varchar(500), IN iDesc varchar(100),
                                                   IN cToken varchar(32), OUT lastInsertedID int(7))
BEGIN

    DECLARE cID INT DEFAULT 0;

	INSERT INTO TBL_INFOBLAST_LOG(RECIPIENT,MESSAGE)
    VALUES (iTo,iMessage);
    
	SET lastInsertedID = LAST_INSERT_ID();    

	IF cToken <> '' THEN
		SELECT C_ID INTO cID FROM TBL_CASE WHERE C_TOKEN = cToken LIMIT 1;		
		
		UPDATE TBL_CASE_DETAIL
		SET SMS_DESC = iDesc
		WHERE C_ID = cID
		LIMIT 1;
	END IF;

END;

create
    definer = root@`%` procedure Set_LDAP_Profile(IN apiKey varchar(40), IN staffID varchar(10),
                                                  IN fullName varchar(100), IN email varchar(50),
                                                  IN nricNum varchar(15), IN mobileNum varchar(30),
                                                  IN managerLevel varchar(5), IN designation varchar(50),
                                                  IN unit varchar(70), IN division varchar(70),
                                                  IN costCenter varchar(10), OUT oID int) modifies sql data
BEGIN

	DECLARE expectedApiKey VARCHAR(40) DEFAULT "32c70cb3-7381-e2ef-ad1f-b5a61964d408-cxt";
    DECLARE uID INT DEFAULT 0;

	IF apiKey = expectedApiKey THEN
		
        SELECT LP_ID INTO uID FROM TBL_LDAP_PROFILE WHERE STAFF_ID = UPPER(staffID) LIMIT 1;
        
        IF uID > 0 THEN
        
			UPDATE TBL_LDAP_PROFILE
            SET FULLNAME = fullname,
				NRIC = nricNum,
				MOBILE_NUM = mobileNum,
				MANAGER_LVL = managerLevel,
				DESIGNATION = designation,
				UNIT = unit,
				DIVISION = division,
                COST_CENTRE = costCenter
            WHERE STAFF_ID = UPPER(staffID) 
            LIMIT 1;
            
            SET oID = ROW_COUNT();
            
        ELSE
        
			INSERT INTO TBL_LDAP_PROFILE(STAFF_ID,FULLNAME,EMAIL,NRIC,MOBILE_NUM,MANAGER_LVL,DESIGNATION,UNIT,DIVISION,COST_CENTRE)
            VALUES (UPPER(staffID),fullname,LOWER(email),nricNum,mobileNum,managerLevel,designation,unit,division,costCenter);
            
			SET oID = LAST_INSERT_ID();    
            
        END IF;
        
    ELSE
		SET oID = 0;
    END IF;


END;

create
    definer = root@`%` procedure Set_Latest_Version(IN appID int, IN appName varchar(45), IN appVersion varchar(10),
                                                    IN appDesc varchar(250), IN appExpired int, OUT vID int(7))
    modifies sql data
BEGIN

	INSERT INTO TBL_APP_VERSION(APP_ID,APP_NAME,APP_VERSION,APP_DESC,APP_EXPIRED)
    VALUES (appID,appName,appVersion,appDesc,appExpired);
    
    SET vID = LAST_INSERT_ID();
	
	IF vID > 0 THEN
		
        UPDATE TBL_APP_VERSION
        SET APP_EXPIRED = 1
        WHERE APP_ID = appID AND V_ID <> vID
        LIMIT 1;
    
    END IF;

END;

create
    definer = root@`%` procedure Set_Log_History(IN iEmail varchar(50), IN iFullName varchar(150),
                                                 IN authType varchar(10), IN logType varchar(3), OUT oLHID int)
BEGIN
	
    DECLARE hID INT DEFAULT 0;
	DECLARE lhID INT DEFAULT 0; 
    
	SELECT 
		H_ID
	INTO hID FROM
		TBL_HERO
	WHERE
		EMAIL = iEmail AND ACTIVATION_STATUS = 'Y'
	LIMIT 1;

	
	IF hID = 0 THEN
		
        INSERT INTO TBL_HERO (FULLNAME,EMAIL,PASSWORD,ACTIVATION_STATUS)
        VALUES (iFullName, iEmail,'EXTERNAL', 'Y');
        SET hID = LAST_INSERT_ID();
        
        INSERT INTO TBL_HERO_PROFILE (H_ID) VALUES (hID);
        
    END IF;
    
	INSERT INTO TBL_LOGIN_HISTORY (H_ID,EMAIL,AUTH_TYPE,LOG_TYPE) 
	VALUES (hID, iEmail, authType, logType);
	SET lhID = LAST_INSERT_ID();        
    
    SET oLHID = lhID;    
    
END;

create
    definer = root@`%` procedure Set_Login_History(IN iEmail varchar(150), IN phoneDesc varchar(255),
                                                   OUT rowCount int(7))
BEGIN

    DECLARE hID,lhID INT DEFAULT 0;

	SELECT H_ID INTO hID 
    FROM TBL_HERO
	WHERE EMAIL = iEmail AND ACTIVATION_STATUS = 'Y'
	LIMIT 1;

	IF hID <> 0 THEN
	
		SELECT MAX(LH_ID) INTO lhID
		FROM TBL_LOGIN_HISTORY
		WHERE EMAIL = iEmail AND LOG_TYPE = 'IN';
		
		UPDATE TBL_LOGIN_HISTORY
		SET PHONE_DESC = phoneDesc
		WHERE EMAIL = iEmail AND LH_ID = lhID
		LIMIT 1;
			
		SET rowCount = ROW_COUNT();        
        
	ELSE		
        SET rowCount = 0;
    END IF;

END;

create
    definer = root@`%` procedure Set_New_LoV(IN lovName varchar(150), IN lovLabel varchar(150), IN lovGroup varchar(30),
                                             IN parentID int(4), IN lovFlag varchar(10), OUT oLID int(7))
BEGIN

	INSERT INTO TBL_LOV(L_NAME,L_LABEL,L_GROUP,PARENT_ID,L_FLAG)
    VALUES (lovName,lovLabel,lovGroup,parentID,lovFlag);
    
    SET oLID = LAST_INSERT_ID();

END;

create
    definer = root@`%` procedure Set_Stakeholder_Admin(IN hID int, IN hToken varchar(32), IN shID int(2),
                                                       OUT oRowCount int(4)) modifies sql data
BEGIN

    DECLARE isAdmin, isStakeholderAdmin, isStakeholderMember BOOL DEFAULT FALSE;
    DECLARE rowCount,positionID INT(4) DEFAULT 0;
        
    SET isAdmin = IS_REQUESTOR_ADMIN(hID);
    SET isStakeholderAdmin = IS_STAKEHOLDER_ADMIN(hID,shID);
    SET isStakeholderMember = IS_STAKEHOLDER_MEMBER(hToken,0,shID);
    
 	
    IF (isAdmin OR isStakeholderAdmin) AND isStakeholderMember THEN

        SELECT L_ID INTO positionID
        FROM TBL_LOV 
        WHERE L_GROUP = 'POSITION' AND UPPER(L_NAME) = 'ADMIN'
        LIMIT 1;
    
		UPDATE TBL_HERO T1
        JOIN TBL_HERO_PROFILE T2 ON T1.H_ID = T2.H_ID
        SET T1.H_GROUP = 'ADMIN', T2.POSITION_ID = positionID
        WHERE T1.H_TOKEN = hToken AND T2.CATEGORY = 'STAKEHOLDER' AND T2.SH_ID = shID;
		
        SET rowCount = ROW_COUNT();
    
	END IF;        

END;

create
    definer = root@`%` procedure Set_Stakeholder_Coordinator(IN hID int, IN hToken varchar(32), IN shID int(2),
                                                             OUT oRowCount int(4)) modifies sql data
BEGIN
	
    DECLARE isAdmin, isStakeholderAdmin BOOL DEFAULT FALSE;
    DECLARE rowCount,positionID INT(4) DEFAULT 0;
        
    SET isAdmin = IS_REQUESTOR_ADMIN(hID);
    SET isStakeholderAdmin = IS_STAKEHOLDER_ADMIN(hID,shID);
    
 	
    IF isAdmin OR isStakeholderAdmin THEN
		
        SELECT L_ID INTO positionID
        FROM TBL_LOV 
        WHERE L_GROUP = 'POSITION' AND UPPER(L_NAME) = 'COORDINATOR'
        LIMIT 1;
        
		UPDATE TBL_HERO_PROFILE T1
        JOIN TBL_HERO T2 ON T2.H_ID = T1.H_ID
        SET T1.CATEGORY = 'STAKEHOLDER', 
			T1.SH_ID = shID, 
            T1.POSITION_ID = positionID,
            T2.H_GROUP = 'USER'            
        WHERE T2.H_TOKEN = hToken;
		
        SET rowCount = ROW_COUNT();
        
    END IF;

	SET oRowCount = rowCount;    

END;

create
    definer = root@`%` procedure Set_Stakeholder_Member(IN hID int, IN hToken varchar(32), IN shID int(2),
                                                        OUT oRowCount int(4)) modifies sql data
BEGIN
	
    DECLARE isAdmin, isStakeholderAdmin BOOL DEFAULT FALSE;
    DECLARE rowCount,positionID,stateID INT(7) DEFAULT 0;
        
    SET isAdmin = IS_REQUESTOR_ADMIN(hID);
    SET isStakeholderAdmin = IS_STAKEHOLDER_ADMIN(hID,shID);
    
 	
    IF isAdmin OR isStakeholderAdmin THEN

        SELECT L_ID INTO positionID
        FROM TBL_LOV 
        WHERE L_GROUP = 'POSITION' AND UPPER(L_NAME) = 'AGENT'
        LIMIT 1;
		
        SELECT STATE_ID INTO stateID
        FROM TBL_HERO_PROFILE
        WHERE H_ID = hID
        LIMIT 1;
        
		UPDATE TBL_HERO_PROFILE T1
        JOIN TBL_HERO T2 ON T2.H_ID = T1.H_ID
        SET T1.CATEGORY = 'STAKEHOLDER', 
			T1.SH_ID = shID, 
            T1.POSITION_ID = positionID, 
            T1.STATE_ID = stateID,
            T2.H_GROUP = 'USER'
        WHERE T2.H_TOKEN = hToken;
		
        SET rowCount = ROW_COUNT();
        
    END IF;

	SET oRowCount = rowCount;

END;

create
    definer = root@`%` procedure Sign_In(IN iEmail varchar(50), IN iPassword varchar(32), OUT oLHID int)
BEGIN
	
    DECLARE hID INT DEFAULT 0;
    DECLARE lhID INT DEFAULT 0;        
    
	SELECT 
		H_ID
	INTO hID FROM
		TBL_HERO
	WHERE
		EMAIL = iEmail AND PASSWORD = iPassword
			AND ACTIVATION_STATUS = 'Y'
	LIMIT 1;

	IF hID > 0 THEN
		INSERT INTO TBL_LOGIN_HISTORY (H_ID,EMAIL) VALUES (hID, iEmail);
		SET lhID = LAST_INSERT_ID();        
    END IF;
	
    SET oLHID = lhID;

END;

create
    definer = root@`%` procedure Sign_Out(IN iEmail varchar(50), OUT oLHID int)
BEGIN

    DECLARE hID INT DEFAULT 0;
    DECLARE lhID INT DEFAULT 0;        
    DECLARE logType VARCHAR(3);

	SELECT 
		H_ID,LOG_TYPE
	INTO hID,logType FROM
		TBL_LOGIN_HISTORY
	WHERE
		AUTH_TYPE = 'HERO' AND EMAIL = iEmail
	ORDER BY LOGGED_DATE DESC
	LIMIT 1;
	
	IF logType = 'IN' THEN
		INSERT INTO TBL_LOGIN_HISTORY (H_ID,EMAIL,AUTH_TYPE,LOG_TYPE) 
        VALUES (hID, iEmail, 'HERO', 'OUT');
		SET lhID = LAST_INSERT_ID();        
    END IF;
	
    SET oLHID = lhID;

END;

create
    definer = root@`%` procedure Sign_Up(IN apiKey varchar(40), IN fullName varchar(150), IN iEmail varchar(50),
                                         IN iPassword varchar(32), IN activationKey varchar(6),
                                         IN mobileNum varchar(12), OUT oHID int) modifies sql data
BEGIN
	
  	DECLARE expectedApiKey VARCHAR(40);
	DECLARE hID,hpID,rowCnt01,rowCnt02 INT DEFAULT 0;    

    SET expectedApiKey = "32c70cb3-7381-e2ef-ad1f-b5a61964d408-cxt";

    IF expectedApiKey = apiKey THEN
		
		SELECT H_ID INTO hID
		FROM TBL_HERO 
		WHERE EMAIL = iEmail AND ACTIVATION_STATUS = 'N' LIMIT 1;
        
        IF 0 = hID THEN
        
			INSERT INTO TBL_HERO (FULLNAME,EMAIL,PASSWORD,ACTIVATION_KEY)
			VALUES (fullName, LOWER(iEmail), iPassword, activationKey);
			SET hID = LAST_INSERT_ID();
			
			INSERT INTO TBL_HERO_PROFILE (H_ID,MOBILE_NUM) VALUES (hID, mobileNum);
			SET hpID = LAST_INSERT_ID();
            
        ELSE 
			
            UPDATE TBL_HERO
            SET FULLNAME = fullName,
				PASSWORD = iPassword,
				ACTIVATION_KEY = activationKey
            WHERE EMAIL = LOWER(iEmail)
            LIMIT 1;
            
            UPDATE TBL_HERO_PROFILE
            SET MOBILE_NUM = mobileNum
            WHERE H_ID = hID
            LIMIT 1;            
            
		END IF;
        
	END IF;
    
	SET oHID = hID;

END;

create
    definer = root@`%` procedure Submit_New_Case(IN pCustomerName varchar(150), IN pMobileNum varchar(150),
                                                 IN pCaseContent text, IN pHID int, IN pCaseNum varchar(40),
                                                 IN areaLocationID int(7), IN iFlag varchar(15), IN sourceID int(7),
                                                 IN caseTypeID int(7), IN productID int(7), IN segmentCode varchar(5),
                                                 IN additionalRemark text, IN herobuddyResponse text,
                                                 OUT oCToken varchar(32)) modifies sql data
this_proc:BEGIN

   DECLARE cID,oID,shID,cdID,cpID,score,dd,mm,caseType,heroID INT DEFAULT 0;
   DECLARE caseStatusID INT DEFAULT 61;
   DECLARE success BOOL;
   /*DECLARE nFlag VARCHAR(15) DEFAULT 'COMPLAINT';*/
   DECLARE cToken,cDate,tpl,serviceID VARCHAR(32) DEFAULT '';
   DECLARE vipName,vip1Name,loggerFlag,loggerName,stateName VARCHAR(255) DEFAULT '';
   DECLARE chatMsg,salesChatMsg,telegramMessage VARCHAR(500) DEFAULT '';
   
   /* abort if STATE not defined */
   IF areaLocationID = 0 THEN
	   LEAVE this_proc;
   END IF;
   /* block for HERO Buddy */
   /*IF sourceID = 494 THEN
	   LEAVE this_proc;
   END IF;*/
   
   IF additionalRemark <> '' THEN
       SET pCaseContent = CONCAT(pCaseContent,"\r\n",additionalRemark);
   END IF;
   
   IF iFlag = "COMPLAINT" THEN
	   SET iFlag = REDEFINED_FLAG(pCaseContent);
	   /*SET iFlag = nFlag;*/
   END IF;
   
   /* redefined iFlag value */
   IF caseTypeID = 419 OR productID = 640 THEN
	 SET iFlag = 'SALES';
   END IF;
   
   IF iFlag = "SALES" THEN
		
	   IF LOCATE('#event',pCaseContent) > 0 THEN
		  SET pCaseNum = CONCAT("E-",CONCAT(SUBSTR(REPLACE(CURDATE(),"-",""),3,6),FLOOR( 1000 + ( RAND() *8999 ))));
          SET shID = 598;       
	   ELSE
		  SET pCaseNum = CONCAT("S-",CONCAT(SUBSTR(REPLACE(CURDATE(),"-",""),3,6),FLOOR( 1000 + ( RAND() *8999 ))));
          SET shID = 407;
	   END IF;
        
	   SET caseType = 419;      
        
   ELSEIF iFlag = "PROTECT" THEN
		SET pCaseNum = CONCAT("P-",CONCAT(SUBSTR(REPLACE(CURDATE(),"-",""),3,6),FLOOR( 1000 + ( RAND() *8999 ))));
        SET caseType = 542;
   ELSEIF iFlag = "DRUNIFI" THEN
		SET pCaseNum = CONCAT("D-",CONCAT(SUBSTR(REPLACE(CURDATE(),"-",""),3,6),FLOOR( 1000 + ( RAND() *8999 ))));
        SET caseType = 557;
        SET shID = 554;
   ELSE
		SET pCaseNum = CONCAT("H-",CONCAT(SUBSTR(REPLACE(CURDATE(),"-",""),3,6),FLOOR( 1000 + ( RAND() *8999 ))));	        
   END IF;

   /*IF LOCATE('#serviceID#',pNricNum) > 0 THEN
      SET serviceID = SUBSTR(pNricNum, 12, 30); 
      SET pNricNum = '';
   END IF;*/
    
   IF areaLocationID <> 0 THEN
	   SET oID = RPA_CASE_ASSIGNMENT(iFlag,areaLocationID,pCaseContent);
       IF oID > 0 THEN
			SET caseStatusID = 64;
       END IF;
       /* ROT Pilot
       IF iFlag = "COMPLAINT" AND (areaLocationID = 124 OR areaLocationID = 145) THEN
	       SET shID = 16;
           SET caseStatusID = 61;
       END IF;*/
   END IF;

   -- Reassign Stakeholder	
   IF productID = 590 THEN
	  SET shID = 512;
   END IF;
   
   INSERT INTO TBL_CASE (H_ID,CASE_NUM,OWNER_ID) VALUES (pHID,pCaseNum,oID);
   SET cID = LAST_INSERT_ID();   
   
   IF 0 = shID THEN
       SET shID = RUN_RPA_FEB(pHID,oID,areaLocationID,pCaseContent);
   END IF;
   
   IF cID > 0 THEN

       IF sourceID = 0 THEN
			/* from APP */
			SET sourceID = 284;
       END IF;
	   
       IF 0 = caseType THEN
	       SET caseType = caseTypeID;
       END IF;
       
       INSERT INTO TBL_CASE_DETAIL (C_ID,SH_ID,CASE_TYPE,PRODUCT_NAME,CASE_CONTENT,CASE_STATUS,SERVICE_ID,AREA_LOCATION,SEGMENT_CODE,FLAG,SOURCE_ID) 
       VALUES (cID,shID,caseType,productID,pCaseContent,caseStatusID,serviceID,areaLocationID,segmentCode,iFlag,sourceID);   
       SET cdID = LAST_INSERT_ID();  
       
       /*add by anas 19/july 2019 */
       /* auto populate login id when apps send service number from field additional remarks.*/
       /*condition if buddyresponse if null*/
       
       IF herobuddyResponse <> '' THEN
			INSERT INTO TBL_HEROBUDDY_INFO(C_ID,CONTENT,REMARK,LOGIN_ID)
            VALUES (cID,REPLACE(herobuddyResponse,'`','"'),REPLACE(additionalRemark,'`','"'),replace(substr(REPLACE(herobuddyResponse,'`','"'),instr(REPLACE(herobuddyResponse,'`','"'),'Login_Id'),instr(REPLACE(herobuddyResponse,'`','"'),'Login_Id_IPTV') - instr(REPLACE(herobuddyResponse,'`','"'),'Login_Id') -3),'Login_Id":"',''));  
            
            UPDATE TBL_CASE_DETAIL SET LOGIN_ID = replace(substr(REPLACE(herobuddyResponse,'`','"'),instr(REPLACE(herobuddyResponse,'`','"'),'Login_Id'),instr(REPLACE(herobuddyResponse,'`','"'),'Login_Id_IPTV') - instr(REPLACE(herobuddyResponse,'`','"'),'Login_Id') -3),'Login_Id":"','') WHERE C_ID = cID LIMIT 1;
       END IF;
       
       
	   IF cdID > 0 THEN
       
		   INSERT INTO TBL_CUSTOMER_PROFILE (C_ID,CUSTOMER_NAME,MOBILE_NUM)
		   VALUES (cID, pCustomerName, pMobileNum);
		   SET cpID = LAST_INSERT_ID();   
           
           IF cpID = 0 THEN				
                SET success = FALSE;
		   END IF;
           
       ELSE 
          SET success = FALSE;
       END IF;
       
   ELSE
	  SET success = FALSE;
   END IF;   
   
	IF success = FALSE THEN
		DELETE FROM TBL_CASE WHERE C_ID = cID LIMIT 1;
		DELETE FROM TBL_HEROBUDDY_INFO WHERE C_ID = cID LIMIT 1;
		DELETE FROM TBL_CUSTOMER_PROFILE WHERE CP_ID = cpID LIMIT 1;
		DELETE FROM TBL_CASE_DETAIL WHERE CD_ID = cdID LIMIT 1;
	ELSE 
		
        SELECT UPPER(FULLNAME) INTO loggerName FROM TBL_HERO WHERE H_ID = pHID LIMIT 1;
        SELECT C_TOKEN,CREATED_DATE INTO cToken,cDate FROM TBL_CASE WHERE C_ID = cID LIMIT 1;
        SELECT UPPER(L_NAME) INTO stateName FROM TBL_LOV WHERE L_ID = areaLocationID LIMIT 1;
        
        SET score = 10;
        INSERT INTO TBL_SCORE (H_ID, C_ID, SCORE, STATUS) VALUES (pHID, cID, score, 'CREATED');        

        /*SET loggerFlag = WHO_IS_LOGGER(pHID);
        IF loggerFlag = 'AGM' THEN			
			SET telegramMessage = GET_TELEGRAM_MESSAGE(pCaseNum,loggerName,loggerName,cDate,'AGM');
        END IF; */
		SET vipName = IS_LOGGER_VIP(pHID);
		/*SET vip1Name = IS_LOGGER_VIP1(pHID);*/

        IF iFlag = 'SALES' THEN			
			
            IF vipName <> '' THEN
				SET telegramMessage = GET_TELEGRAM_MESSAGE(pCaseNum,vipName,'',cDate,'VIP-SALES');
			ELSE
				SET telegramMessage = GET_TELEGRAM_MESSAGE(pCaseNum,loggerName,'',cDate,'SALES');            
            END IF;
            
            /* CNY */
            SET dd = DAY(CURRENT_TIMESTAMP);
            SET mm = MONTH(CURRENT_TIMESTAMP);
            IF 2 = mm AND dd > 1 AND dd < 11 THEN
				/*SET tpl = 'HARI-RAYA';*/
                SET tpl = 'SALES-LEAD';
			ELSE
				SET tpl = 'SALES-LEAD';
            END IF;
            
			SELECT MESSAGE INTO salesChatMsg FROM TBL_NOTIFICATION_TEMPLATE
			WHERE CONTROLLER = 'APP' AND TEMPLATE = tpl
			LIMIT 1;
            
			INSERT INTO TBL_MESSAGE_BOX (C_ID,H_ID,B_ID,MESSAGE,FLAG) VALUES (cID, 8240, 0, salesChatMsg, 'FE');            
            
		ELSE
						
			IF vipName <> '' THEN
				SET telegramMessage = GET_TELEGRAM_MESSAGE(pCaseNum,vipName,'',cDate,'VIP1');
			/*ELSEIF vipName <> '' THEN
				SET telegramMessage = GET_TELEGRAM_MESSAGE(pCaseNum,vipName,stateName,cDate,'VIP2');*/
			ELSE
				SET telegramMessage = '';
			END IF;
            
            /* CNY */
            SET dd = DAY(CURRENT_TIMESTAMP);
            SET mm = MONTH(CURRENT_TIMESTAMP);
            IF 2 = mm AND dd > 1 AND dd < 11 THEN
				/*SET tpl = 'HARI-RAYA';*/
                SET tpl = 'CASE-CREATED';
			ELSE
				SET tpl = 'CASE-CREATED';
            END IF;
            
			SELECT MESSAGE INTO chatMsg FROM TBL_NOTIFICATION_TEMPLATE
			WHERE CONTROLLER = 'APP' AND TEMPLATE = tpl
			LIMIT 1;
			SET chatMsg = REPLACE(chatMsg,'{CASENUM}',pCaseNum);
            
			INSERT INTO TBL_MESSAGE_BOX (C_ID,H_ID,B_ID,MESSAGE,FLAG) VALUES (cID, 22, 0, chatMsg, 'FE');            
        
        END IF;        
        
	END IF;

	SET oCTOKEN = cToken;

END;

create
    definer = root@`%` function UPDATE_ACTION_REMARK(cToken varchar(32), oID int, closureTypeID int(4),
                                                     caseStatusID int(4), remark text, filename blob) returns int(4)
    deterministic
    reads sql data
BEGIN

    CALL Update_Action_Remark(cToken,oID,closureTypeID,caseStatusID,remark,filename, @oRowCount);
	RETURN (SELECT @oRowCount);

END;

create
    definer = root@`%` function UPDATE_AGENT_PROFILE(hID int, email varchar(50), fullName varchar(150),
                                                     nricNum varchar(15), mobileNum varchar(12), nickName varchar(30),
                                                     myStatus varchar(15), stateID int, divisionID int, zoneID int,
                                                     teamID int) returns int(4)
BEGIN

 	CALL Update_Agent_Profile(hID,email,fullName,nricNum,mobileNum,nickName,myStatus,stateID,divisionID,zoneID,teamID, @rowCount);
	RETURN (SELECT @rowCount);

END;

create
    definer = root@`%` function UPDATE_CASE_DETAIL(oID int, cToken varchar(32), caseTypeID int(4), productNameID int(4),
                                                   packageName varchar(150), serviceAddress varchar(250),
                                                   srNum varchar(15), ttNum varchar(15), serviceID varchar(15),
                                                   areaLocationID int(7), actualCustomerName varchar(150),
                                                   segmentID int(7), ckc varchar(1), ckcNum varchar(20),
                                                   loginID varchar(30), stakeholderRef varchar(10),
                                                   extSysRef varchar(50)) returns int(4) deterministic reads sql data
BEGIN

 	CALL Update_Case_Detail(oID,cToken,caseTypeID,productNameID,packageName,serviceAddress,srNum,ttNum,serviceID,areaLocationID,actualCustomerName,segmentID,ckc,ckcNum,loginID,stakeholderRef,extSysRef, @rowCount);
	RETURN (SELECT @rowCount);

END;

create
    definer = root@`%` function UPDATE_CASE_INFO(oID int, cToken varchar(32), caseTypeID int(4), productNameID int(4),
                                                 packageName varchar(150), serviceAddress varchar(250),
                                                 srNum varchar(15), ttNum varchar(15), serviceID varchar(15),
                                                 areaLocationID int(7)) returns int(4)
BEGIN

 	CALL Update_Case_Info(oID,cToken,caseTypeID,productNameID,packageName,serviceAddress,srNum,ttNum,serviceID,areaLocationID,@rowCount);
	RETURN (SELECT @rowCount);

END;

create
    definer = root@`%` function UPDATE_CASE_STATUS(cToken varchar(32), oID int, closureTypeID int(4),
                                                   caseStatusID int(4), remark text) returns int(4)
BEGIN
	
    CALL Update_Case_Status(cToken, oID, closureTypeID, caseStatusID, remark, @oRowCount);
	RETURN (SELECT @oRowCount);
    
END;

create
    definer = root@`%` function UPDATE_STAKEHOLDER(hID int, hToken varchar(32), shID int(2), theAction varchar(15)) returns int(4)
BEGIN
	
    IF theAction = "SET" THEN
		CALL Set_Stakeholder_Member(hID, hToken, shID, @oRowCount);    
	ELSEIF theAction = "UNSET" THEN
		CALL Unset_Stakeholder_Member(hID, hToken, shID, @oRowCount);
	ELSEIF theAction = "COORDINATOR" THEN
		CALL Set_Stakeholder_Coordinator(hID, hToken, shID, @oRowCount);    
    ELSE
		CALL Set_Stakeholder_Admin(hID, hToken, shID, @oRowCount);    
    END IF;
    
	RETURN (SELECT @oRowCount);
    
END;

create
    definer = root@`%` function UPDATE_USER_PROFILE(hID int, email varchar(50), fullName varchar(150),
                                                    nricNum varchar(15), mobileNum varchar(12),
                                                    nickName varchar(30)) returns int(4)
BEGIN

 	CALL Update_User_Profile(hID,email,fullName,nricNum,mobileNum,nickName, @rowCount);
	RETURN (SELECT @rowCount);

END;

create
    definer = root@`%` procedure Unset_Stakeholder_Member(IN hID int, IN hToken varchar(32), IN shID int(2),
                                                          OUT oRowCount int(4)) modifies sql data
BEGIN

    DECLARE isAdmin, isStakeholderAdmin BOOL DEFAULT FALSE;
    DECLARE rowCount INT(4) DEFAULT 0;
        
    SET isAdmin = IS_REQUESTOR_ADMIN(hID);
    SET isStakeholderAdmin = IS_STAKEHOLDER_ADMIN(hID,shID);
    
 	
    IF isAdmin OR isStakeholderAdmin THEN

		UPDATE TBL_HERO_PROFILE T1
        JOIN TBL_HERO T2 ON T2.H_ID = T1.H_ID
        SET T1.CATEGORY = 'PUBLIC', T1.SH_ID = 0, T1.POSITION_ID = 0
        WHERE T2.H_TOKEN = hToken;
				
        SET rowCount = ROW_COUNT();
		
        IF rowCount <> 0 THEN
        
			UPDATE TBL_HERO
			SET H_GROUP = 'USER'
			WHERE H_TOKEN = hToken
			LIMIT 1;
        
        END IF;        
    
	END IF;

END;

create
    definer = root@`%` procedure Update_Action_Remark(IN cToken varchar(32), IN oID int, IN closureTypeID int(4),
                                                      IN caseStatusID int(4), IN remark text, IN filename blob,
                                                      OUT oRowCount int(4)) modifies sql data
BEGIN

    DECLARE bID,cID,hID,shID,ownerID,score,currentCaseStatus,finalCaseStatus,caseType,productName,areaLocation,totalChat INT DEFAULT 0;
    DECLARE caseNum VARCHAR(12);
    DECLARE msg VARCHAR(250);
    DECLARE caseStatusVal,srNum,ckc,ckcNum VARCHAR(15);
    DECLARE isOwner,isStakeholderAdmin,isStakeholderCoordinator,isStakeholder,proceed BOOL DEFAULT FALSE;
    
	SELECT SH_ID INTO shID FROM TBL_HERO_PROFILE WHERE H_ID = oID LIMIT 1;
    
    SET isOwner = IS_REQUESTOR_OWNER(oID,cToken);
    SET isStakeholderAdmin = IS_STAKEHOLDER_ADMIN(oID,shID);    
    SET isStakeholderCoordinator = IS_STAKEHOLDER_COORDINATOR(oID,shID);    
    SET isStakeholder = IS_REQUESTOR_STAKEHOLDER(oID);
    
    IF isStakeholder THEN
    
		SELECT T1.C_ID,T1.H_ID,T1.CASE_NUM,T1.OWNER_ID,T2.CASE_STATUS,T2.CASE_TYPE,T2.PRODUCT_NAME,T2.SR_NUM,T2.AREA_LOCATION,T2.CKC,T2.CKC_NUM 
        INTO cID,hID,caseNum,ownerID,currentCaseStatus,caseType,productName,srNum,areaLocation,ckc,ckcNum 
        FROM TBL_CASE T1
        INNER JOIN TBL_CASE_DETAIL T2 ON T1.C_ID = T2.C_ID
        WHERE T1.C_TOKEN = cToken 
        LIMIT 1;
		
        IF isOwner OR isStakeholderAdmin OR isStakeholderCoordinator THEN
			
            IF caseStatusID = 0 THEN
				IF ownerID = 0 THEN
					SET caseStatusID = currentCaseStatus;
                ELSE
					SET caseStatusID = 67;
                END IF;
            END IF;
			SET finalCaseStatus = caseStatusID;

			SELECT L_NAME INTO caseStatusVal FROM TBL_LOV WHERE L_ID = finalCaseStatus LIMIT 1;
            
            IF caseStatusVal = "CLOSED" THEN
				
				SELECT COUNT(MB_ID) AS TOTAL INTO totalChat
                FROM TBL_MESSAGE_BOX
                WHERE C_ID = cID
                LIMIT 1;
            
                IF caseType <> 0 AND productName <> 0 AND areaLocation <> 0 AND srNum <> "" AND totalChat <> 0 THEN
					SET proceed = true;
                END IF;
                IF ckc = 'Y' AND ckcNum = '' THEN
					SET proceed = false;
                END IF;
                
            ELSE
				SET proceed = true;
            END IF;
            
            IF proceed THEN            
				UPDATE TBL_CASE_DETAIL SET CASE_STATUS = caseStatusID WHERE C_ID = cID LIMIT 1;
				SET oRowCount = ROW_COUNT();
            ELSE
				SET oRowCount = 0;                
            END IF;
                        
		ELSE 
			/* because anyone can update the Action Taken */
			SET finalCaseStatus = currentCaseStatus;
			SET oRowCount = 1;        
		END IF;
        
		IF proceed AND oRowCount > 0 THEN			
			            
			IF filename <> '' THEN
				INSERT INTO TBL_BLOB (PICTURE) VALUES (filename);
				SET bID = LAST_INSERT_ID();       
			END IF;

			INSERT INTO TBL_ACTION_REMARK (C_ID,H_ID,CT_ID,B_ID,REMARK_TYPE,REMARK)
			VALUES (cID,oID,closureTypeID,bID,caseStatusVal,remark);
						
			IF caseStatusVal = "CLOSED" OR caseStatusVal = "CANCELLED" THEN
				
				IF caseStatusVal = "CLOSED" THEN
					SET score = 10;
					INSERT INTO TBL_SCORE (H_ID, C_ID, SCORE, STATUS) VALUES (hID, cID, score, 'CLOSED');
					INSERT INTO TBL_SCORE (H_ID, C_ID, SCORE, STATUS) VALUES (oID, cID, score, 'CLOSED');
				ELSE
					DELETE FROM TBL_SCORE WHERE C_ID = cID AND H_ID = hID AND STATUS = 'CREATED' LIMIT 1;        
				END IF;
				
				UPDATE TBL_CASE SET CLOSED_DATE = NOW() WHERE C_ID = cID LIMIT 1;
							
			END IF;        

			/*SELECT MESSAGE INTO msg FROM TBL_NOTIFICATION_TEMPLATE
			WHERE CONTROLLER = 'CASE' AND TEMPLATE = caseStatusVal LIMIT 1;
		
			INSERT INTO TBL_NOTIFICATION (H_ID, C_ID, MESSAGE, FLAG) 
			VALUES (hID, cID, REPLACE(msg,'{CASENUM}',caseNum), 'CASE');*/
			
		END IF;        
	
    ELSE 
    
		SET oRowCount = 0;    
    
    END IF;


END;

create
    definer = root@`%` procedure Update_Agent_Profile(IN hID int, IN iEmail varchar(50), IN fullName varchar(150),
                                                      IN nricNum varchar(15), IN mobileNum varchar(12),
                                                      IN nickName varchar(30), IN myStatus varchar(15),
                                                      IN stateID int(7), IN divisionID int(7), IN zoneID int(7),
                                                      IN teamID int(7), OUT rowCount int) modifies sql data
BEGIN

	DECLARE rowCnt01,rowCnt02 INT DEFAULT 0;    

	UPDATE TBL_HERO 
    SET 
		FULLNAME = fullName 
    WHERE H_ID = hID AND EMAIL = iEmail 
    LIMIT 1;
    SET rowCnt01 = ROW_COUNT();

	IF rowCnt01 > 0 THEN

		UPDATE TBL_HERO_PROFILE 
		SET 
			NRIC_NUM = nricNum,
			MOBILE_NUM = mobileNum,
			NICKNAME = nickName,
			STATE_ID = stateID,
			DIVISION_ID = divisionID,
			ZONE_ID = zoneID,
			TEAM_ID = teamID        
		WHERE H_ID = hID
		LIMIT 1;
		SET rowCnt02 = ROW_COUNT();
        
	END IF;
    
	

	
    
    SET rowCount = rowCnt01 + rowCnt02;
    
END;

create
    definer = root@`%` procedure Update_Case_Detail(IN oID int, IN cToken varchar(32), IN caseTypeID int(4),
                                                    IN productNameID int(4), IN packageName varchar(150),
                                                    IN serviceAddress varchar(250), IN srNum varchar(15),
                                                    IN ttNum varchar(15), IN serviceID varchar(15),
                                                    IN areaLocationID int(7), IN actualCustomerName varchar(150),
                                                    IN segmentID int(7), IN ckc varchar(1), IN ckcNum varchar(20),
                                                    IN loginID varchar(30), IN stakeholderRef varchar(10),
                                                    IN extSysRef varchar(50), OUT rowCount int) modifies sql data
BEGIN

    DECLARE isOwner,isStakeholderAdmin,isStakeholderCoordinator BOOL DEFAULT FALSE;
    DECLARE cID,shID,hbID INT DEFAULT 0;

	SELECT SH_ID INTO shID FROM TBL_HERO_PROFILE WHERE H_ID = oID LIMIT 1;
    
    SET isOwner = IS_REQUESTOR_OWNER(oID,cToken);
    SET isStakeholderAdmin = IS_STAKEHOLDER_ADMIN(oID,shID);    
    SET isStakeholderCoordinator = IS_STAKEHOLDER_COORDINATOR(oID,shID);    

    IF isOwner OR isStakeholderAdmin OR isStakeholderCoordinator THEN
		
        IF ckcNum <> '' THEN
			SET CKC = 'Y';
		ELSE
			SET CKC = 'N';
        END IF;
        
        SELECT C_ID INTO cID FROM TBL_CASE WHERE C_TOKEN = cToken LIMIT 1; 
        
		UPDATE TBL_CASE_DETAIL 
		SET CASE_TYPE = caseTypeID,
			PRODUCT_NAME = productNameID,
			PACKAGE_NAME = packageName,
			SERVICE_ID = serviceID,    
            LOGIN_ID = loginID,
			SERVICE_ADDRESS = serviceAddress,
			SR_NUM = srNum,
			TT_NUM = ttNum,
            AREA_LOCATION = areaLocationID,
            SEGMENT_ID = segmentID,
            CKC = ckc,
            CKC_NUM = ckcNum,
            STAKEHOLDER_REF = stakeholderRef,
            EXT_SYS_REF = extSysRef
		WHERE C_ID = cID 
		LIMIT 1;		
		SET rowCount = ROW_COUNT();
	
		UPDATE TBL_CUSTOMER_PROFILE 
		SET ACTUAL_CUSTOMER_NAME = actualCustomerName
		WHERE C_ID = cID 
		LIMIT 1;		

        /*SELECT HB_ID INTO hbID FROM TBL_HEROBUDDY_INFO WHERE C_ID = cID LIMIT 1; 
		
        IF hbID > 0 THEN 
			UPDATE TBL_HEROBUDDY_INFO 
			SET LOGIN_ID = loginID
			WHERE C_ID = cID 
			LIMIT 1;		
		ELSE
			INSERT INTO TBL_HEROBUDDY_INFO(C_ID,LOGIN_ID)
            VALUES (cID,loginID);
        END IF;*/
        
		SET rowCount = rowCount + ROW_COUNT();
    
    ELSE
		SET rowCount = 0;    
    END IF;
    
END;

create
    definer = root@`%` procedure Update_Case_Info(IN oID int, IN cToken varchar(32), IN caseTypeID int(4),
                                                  IN productNameID int(4), IN packageName varchar(150),
                                                  IN serviceAddress varchar(250), IN srNum varchar(15),
                                                  IN ttNum varchar(15), IN serviceID varchar(15),
                                                  IN areaLocationID int(7), OUT rowCount int) modifies sql data
BEGIN
	
    DECLARE isOwner,isStakeholderAdmin,isStakeholderCoordinator BOOL DEFAULT FALSE;
    DECLARE cID,shID INT DEFAULT 0;

	SELECT SH_ID INTO shID FROM TBL_HERO_PROFILE WHERE H_ID = oID LIMIT 1;
    
    SET isOwner = IS_REQUESTOR_OWNER(oID,cToken);
    SET isStakeholderAdmin = IS_STAKEHOLDER_ADMIN(oID,shID);    
    SET isStakeholderCoordinator = IS_STAKEHOLDER_COORDINATOR(oID,shID);    

    IF isOwner OR isStakeholderAdmin OR isStakeholderCoordinator THEN
		
        SELECT C_ID INTO cID FROM TBL_CASE WHERE C_TOKEN = cToken LIMIT 1; 
        
		UPDATE TBL_CASE_DETAIL 
		SET CASE_TYPE = caseTypeID,
			PRODUCT_NAME = productNameID,
			PACKAGE_NAME = packageName,
			SERVICE_ID = serviceID,            
			SERVICE_ADDRESS = serviceAddress,
			SR_NUM = srNum,
			TT_NUM = ttNum,
            AREA_LOCATION = areaLocationID
		WHERE C_ID = cID 
		LIMIT 1;		
		SET rowCount = ROW_COUNT();
	
    ELSE
		SET rowCount = 0;    
    END IF;
    
END;

create
    definer = root@`%` procedure Update_Case_Status(IN cToken varchar(32), IN oID int, IN closureTypeID int(4),
                                                    IN caseStatusID int(4), IN remark text, OUT oRowCount int(4))
    modifies sql data
BEGIN
	
    DECLARE cID,hID,shID,ownerID,score,currentCaseStatus,finalCaseStatus,caseType,productName,areaLocation,totalChat INT DEFAULT 0;
    DECLARE caseNum VARCHAR(12);
    DECLARE msg VARCHAR(250);
    DECLARE caseStatusVal,srNum VARCHAR(15);
    DECLARE isOwner,isStakeholderAdmin,isStakeholderCoordinator,isStakeholder,proceed BOOL DEFAULT FALSE;
    
	SELECT SH_ID INTO shID FROM TBL_HERO_PROFILE WHERE H_ID = oID LIMIT 1;
    
    SET isOwner = IS_REQUESTOR_OWNER(oID,cToken);
    SET isStakeholderAdmin = IS_STAKEHOLDER_ADMIN(oID,shID);    
    SET isStakeholderCoordinator = IS_STAKEHOLDER_COORDINATOR(oID,shID);    
    SET isStakeholder = IS_REQUESTOR_STAKEHOLDER(oID);
    
    IF isStakeholder THEN
    
		SELECT T1.C_ID,T1.H_ID,T1.CASE_NUM,T1.OWNER_ID,T2.CASE_STATUS,T2.CASE_TYPE,T2.PRODUCT_NAME,T2.SR_NUM,T2.AREA_LOCATION 
        INTO cID,hID,caseNum,ownerID,currentCaseStatus,caseType,productName,srNum,areaLocation 
        FROM TBL_CASE T1
        INNER JOIN TBL_CASE_DETAIL T2 ON T1.C_ID = T2.C_ID
        WHERE T1.C_TOKEN = cToken 
        LIMIT 1;
		
        IF isOwner OR isStakeholderAdmin OR isStakeholderCoordinator THEN
			
            IF caseStatusID = 0 THEN
				IF ownerID = 0 THEN
					SET caseStatusID = currentCaseStatus;
                ELSE
					SET caseStatusID = 67;
                END IF;
            END IF;
			SET finalCaseStatus = caseStatusID;

			SELECT L_NAME INTO caseStatusVal FROM TBL_LOV WHERE L_ID = finalCaseStatus LIMIT 1;
            
            IF caseStatusVal = "CLOSED" THEN
				
				SELECT COUNT(MB_ID) AS TOTAL INTO totalChat
                FROM TBL_MESSAGE_BOX
                WHERE C_ID = cID
                LIMIT 1;
            
                IF caseType <> 0 AND productName <> 0 AND areaLocation <> 0 AND srNum <> "" AND totalChat <> 0 THEN
					SET proceed = true;
                END IF;
                
            ELSE
				SET proceed = true;
            END IF;
            
            IF proceed THEN            
				UPDATE TBL_CASE_DETAIL SET CASE_STATUS = caseStatusID WHERE C_ID = cID LIMIT 1;
				SET oRowCount = ROW_COUNT();
            ELSE
				SET oRowCount = 0;                
            END IF;
                        
		ELSE 
			/* because anyone can update the Action Taken */
			SET finalCaseStatus = currentCaseStatus;
			SET oRowCount = 1;        
		END IF;
        
		IF proceed AND oRowCount > 0 THEN			
			            
			INSERT INTO TBL_ACTION_REMARK (C_ID,H_ID,CT_ID,REMARK_TYPE,REMARK)
			VALUES (cID, oID, closureTypeID, caseStatusVal, remark);
						
			IF caseStatusVal = "CLOSED" OR caseStatusVal = "CANCELLED" THEN
				
				IF caseStatusVal = "CLOSED" THEN
					SET score = 10;
					INSERT INTO TBL_SCORE (H_ID, C_ID, SCORE, STATUS) VALUES (hID, cID, score, 'CLOSED');
					INSERT INTO TBL_SCORE (H_ID, C_ID, SCORE, STATUS) VALUES (oID, cID, score, 'CLOSED');
				ELSE
					DELETE FROM TBL_SCORE WHERE C_ID = cID AND H_ID = hID AND STATUS = 'CREATED' LIMIT 1;        
				END IF;
				
				UPDATE TBL_CASE SET CLOSED_DATE = NOW() WHERE C_ID = cID LIMIT 1;
							
			END IF;        

			/*SELECT MESSAGE INTO msg FROM TBL_NOTIFICATION_TEMPLATE
			WHERE CONTROLLER = 'CASE' AND TEMPLATE = caseStatusVal LIMIT 1;
		
			INSERT INTO TBL_NOTIFICATION (H_ID, C_ID, MESSAGE, FLAG) 
			VALUES (hID, cID, REPLACE(msg,'{CASENUM}',caseNum), 'CASE');*/
			
		END IF;        
	
    ELSE 
    
		SET oRowCount = 0;    
    
    END IF;
    
END;

create
    definer = root@`%` procedure Update_Total_Score(IN hID int) modifies sql data
BEGIN
   DECLARE totalScore INT;
   DECLARE lvl VARCHAR(10);
   
   SELECT SUM(SCORE) INTO totalScore FROM TBL_SCORE WHERE H_ID = hID;
   
   IF totalScore < 100 THEN SET lvl = "Junior";
   ELSEIF totalScore < 200 THEN SET lvl = "Apprentice";
   ELSEIF totalScore < 500 THEN SET lvl = "Knight";
   ELSEIF totalScore < 1000 THEN SET lvl = "Ninja";
   ELSE SET lvl = "Super";
   END IF;   
  
   UPDATE TBL_HERO_PROFILE
      SET SCORE = totalScore,
		  LEVEL = lvl
   WHERE H_ID = hID
   LIMIT 1;


END;

create
    definer = root@`%` procedure Update_User_Profile(IN hID int, IN iEmail varchar(50), IN fullName varchar(150),
                                                     IN nricNum varchar(15), IN mobileNum varchar(12),
                                                     IN nickName varchar(30), OUT rowCount int) modifies sql data
BEGIN

	DECLARE rowCnt01 INT;
	DECLARE rowCnt02 INT DEFAULT 0;    

	UPDATE TBL_HERO 
    SET 
		FULLNAME = fullName 
    WHERE H_ID = hID AND EMAIL = iEmail 
    LIMIT 1;
    
    SET rowCnt01 = ROW_COUNT();
    
    IF rowCnt01 > 0 THEN
		
        UPDATE TBL_HERO_PROFILE 
		SET 
			NRIC_NUM = nricNum, 
			MOBILE_NUM = mobileNum, 
			NICKNAME = nickName
		WHERE H_ID = hID 
		LIMIT 1;
		
		SET rowCnt01 = ROW_COUNT();
        
	END IF;
	
    SET rowCount = rowCnt01 + rowCnt02;
    
END;

create
    definer = root@`%` function VALIDATE_ACCOUNT(apiKey varchar(40), eventName varchar(20), email varchar(50),
                                                 ldapEmail varchar(50)) returns int(4) deterministic reads sql data
BEGIN
	
    CALL Validate_Account(apiKey,eventName,email,ldapEmail, @oHID);

	RETURN (SELECT @oHID);
    
END;

create
    definer = root@`%` function VALIDATE_TOKEN(authToken varchar(40)) returns int
BEGIN

	CALL Validate_Token(authToken, @oHID);

	RETURN (SELECT @oHID);

END;

create
    definer = root@`%` procedure Validate_Account(IN apiKey varchar(40), IN eventName varchar(20),
                                                  IN iEmail varchar(50), IN ldapEmail varchar(50), OUT oHID int)
    modifies sql data
BEGIN

	DECLARE expectedApiKey VARCHAR(40) DEFAULT "32c70cb3-7381-e2ef-ad1f-b5a61964d408-cxt";
    DECLARE hID,rowCount INT DEFAULT 0;
	DECLARE dFullName,dEmail,dNric,dMobileNum VARCHAR(50);

	IF apiKey = expectedApiKey THEN

		/*checking if email exist */
		IF eventName = "check-email" THEN
        
			SELECT H_ID INTO hID FROM TBL_HERO 
            WHERE EMAIL = LOWER(iEmail) OR LDAP_EMAIL = LOWER(iEmail) 
            LIMIT 1;
			
			IF hID > 0 THEN
				INSERT INTO TBL_LOGIN_HISTORY (H_ID,EMAIL) 
				VALUES (hID, LOWER(iEmail));

				SET oHID = hID;	
			ELSE
				SET oHID = 0;
			END IF;
            
		/*if 1st time user */
		ELSEIF eventName = "first-time-login" THEN   
            
			SELECT H_ID INTO hID FROM TBL_HERO WHERE EMAIL = LOWER(ldapEmail) LIMIT 1;
            
            /* if EMAIL not yet registered, then proceed */
            IF hID = 0 THEN
            
				SELECT FULLNAME,EMAIL,NRIC,MOBILE_NUM INTO dFullName,dEmail,dNric,dMobileNum 
				FROM TBL_LDAP_PROFILE WHERE EMAIL = LOWER(ldapEmail) LIMIT 1;
				
				/* Auto register User from LDAP Profile table */
                IF dEmail <> '' THEN
                
					INSERT INTO TBL_HERO (FULLNAME, EMAIL, PASSWORD, ACTIVATION_KEY, ACTIVATION_STATUS) 
					VALUES (UPPER(dFullName) ,LOWER(dEmail) , MD5("123456"), "052019", "Y");
					
					SET hID = LAST_INSERT_ID();
                    
                END IF;
				
			END IF;
            
			IF hID <> 0 THEN
			
				INSERT INTO TBL_HERO_PROFILE (H_ID,NRIC_NUM,MOBILE_NUM) 
				VALUES (hID,dNric,dMobileNum);            

				INSERT INTO TBL_LOGIN_HISTORY (H_ID,EMAIL) 
				VALUES (hID, LOWER(ldapEmail));

				SET oHID = hID;	
				
			ELSE
				SET oHID = 0;	            
			END IF;
            
			/*IF iNonEmail = "" THEN
				INSERT INTO TBL_HERO (FULLNAME, EMAIL, PASSWORD, ACTIVATION_KEY, ACTIVATION_STATUS, H_TOKEN, H_GROUP) 
				VALUES (UPPER(iFullName) ,LOWER(iEmail) , MD5("123456"), "999999", "Y", MD5(LOWER(iEmail)), "USER");
				
				SET lhID = LAST_INSERT_ID();
				SET oLHID = lhID;
				
				INSERT INTO TBL_HERO_PROFILE (H_ID, CATEGORY, MY_STATUS) 
				VALUE(oLHID,"PUBLIC","Available");
				
				INSERT INTO TBL_LOGIN_HISTORY (H_ID,EMAIL) 
				VALUES (oLHID, LOWER(iEmail));
			END IF;*/
            
		ELSEIF eventName = "merge-account" THEN   
			
			IF iEmail <> "" THEN
            
				SELECT H_ID INTO hID FROM TBL_HERO WHERE EMAIL = LOWER(iEmail) LIMIT 1;
				
				IF hID > 0 THEN
                
					UPDATE TBL_HERO
					SET LDAP_EMAIL = LOWER(ldapEmail)
					WHERE H_ID = hID
                    LIMIT 1;

					SET rowCount = ROW_COUNT();
					                    
					IF rowCount > 0 THEN
						INSERT INTO TBL_LOGIN_HISTORY (H_ID,EMAIL) 
						VALUES (hID, LOWER(ldapEmail));
					END IF;
                    
					SET oHID = hID;	
                    
					/*INSERT INTO TBL_MERGED_HISTORY(H_ID,EMAIL_NEW,EMAIL_OLD)
					VALUES(hID,LOWER(iEmail),LOWER(iNonEmail));*/
				ELSE
					SET oHID = 0;	
				END IF;
			ELSE
				SET oHID = 0;	
			END IF;
            
		ELSE        
			SET oHID = 0;            
		END IF;
        
    ELSE
		SET oHID = 0;
    END IF;

END;

create
    definer = root@`%` procedure Validate_Token(IN authToken varchar(40), OUT oHID int) modifies sql data
BEGIN
	
    DECLARE hID INT DEFAULT 0;
	
	
    SELECT H_ID INTO hID FROM TBL_AUTH_TOKEN
    WHERE AUTH_TOKEN = authToken 
    LIMIT 1;
    
	
    IF hID > 0 THEN 
		UPDATE TBL_AUTH_TOKEN
        SET VALIDATED_DATE = NOW()
        WHERE AUTH_TOKEN = authToken
        LIMIT 1;
    END IF;
    
    SET oHID = hID;

END;

create
    definer = root@`%` function WHO_IS_LOGGER(hID int) returns varchar(20) deterministic reads sql data
BEGIN

	CALL Who_Is_Logger(hID, @oFlag);
	RETURN (SELECT @oFlag);

END;

create
    definer = root@`%` procedure Who_Is_Logger(IN hID int, OUT oFlag varchar(20))
BEGIN

	DECLARE iEmail VARCHAR(50) DEFAULT '';        	
	DECLARE foundRow INT DEFAULT 0;        	
	
    SELECT EMAIL INTO iEmail 
    FROM TBL_HERO
    WHERE H_ID = hID
    LIMIT 1;
    
    SELECT FLAG INTO oFlag
    FROM TBL_STAFF
    WHERE EMAIL = iEmail
    LIMIT 1;
    SET foundRow = FOUND_ROWS();
    
    IF 0 = foundRow THEN
		SET oFlag = '';
    END IF;

END;

create
    definer = root@`%` procedure run_HERO_REPOPRTING()
BEGIN

	SELECT  A.CASE_NUM as HERO_CASE_ID, 
	REPLACE(REPLACE(REPLACE((SELECT UPPER(E.CUSTOMER_NAME) FROM  DB_HERO.TBL_CUSTOMER_PROFILE E WHERE E.C_ID = A.C_ID),'\r',' '),'\n',' '),',',' ')CUST_NAME,
	REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(B.CASE_CONTENT, '\r', ' '), '\n', ' '),',',' '),';',' '),'<',' '),'\"',' ')AS DESCRIPTION,
	(SELECT UPPER(D.FULLNAME) FROM  DB_HERO.TBL_HERO D WHERE D.H_ID = A.H_ID)HERO_LOGGER,
	(SELECT C.L_NAME FROM  DB_HERO.TBL_LOV C WHERE C.L_ID = B.AREA_LOCATION)AREA_LOCATION,
	CASE 
	WHEN (SELECT C.L_NAME FROM  DB_HERO.TBL_LOV C WHERE C.L_ID = B.CASE_STATUS) = 'NEW' THEN 'UNASSIGNED'
	ELSE (SELECT C.L_NAME FROM  DB_HERO.TBL_LOV C WHERE C.L_ID = B.CASE_STATUS)
	END CASE_STATUS,
	(SELECT C.L_NAME FROM  DB_HERO.TBL_LOV C WHERE C.L_ID = B.CASE_TYPE)CASE_TYPE,
	CASE
	WHEN (select E.FLAG from DB_HERO.TBL_HERO D, DB_HERO.TBL_STAFF E where D.H_ID = A.H_ID AND D.EMAIL = E.EMAIL) = 'VIP' THEN 'VIP'
	ELSE NULL
	END VIP,
	REPLACE(REPLACE(B.PACKAGE_NAME,';',' '),',',' ') PACKAGE_NAME,(SELECT C.L_NAME FROM  DB_HERO.TBL_LOV C WHERE C.L_ID = B.PRODUCT_NAME)PRODUCT,
	(SELECT C.L_NAME FROM  DB_HERO.TBL_LOV C WHERE C.L_ID = B.SEGMENT_ID)SEGMENT,
	(SELECT UPPER(D.FULLNAME) FROM DB_HERO.TBL_HERO D WHERE D.H_ID = A.OWNER_ID)CASE_OWNER,
	/*(select F.L_NAME from DB_HERO.TBL_HERO_PROFILE HP,DB_HERO.TBL_LOV F where HP.H_ID = A.OWNER_ID and HP.SH_ID = F.L_ID) as GROUP_,*/
	(SELECT C.L_NAME FROM  DB_HERO.TBL_LOV C WHERE C.L_ID = B.SH_ID) GROUP_,
	REPLACE(REPLACE(REPLACE(REPLACE(B.SR_NUM,'\r', ' '),'\n', ' '),';',' '),',',' ') SR_NUM,REPLACE(REPLACE(REPLACE(REPLACE(B.TT_NUM,'\r', ' '),'\n', ' '),';',' '),',',' ')TT_NUM,
	CASE
	WHEN B.CASE_STATUS = 70 THEN 
	(SELECT REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(G.REMARK,'\r', ' '),'\n', ' '), ',' ,' '),';',' '),'<',' ')FROM DB_HERO.TBL_ACTION_REMARK G WHERE G.C_ID = A.C_ID AND G.REMARK_TYPE ='CLOSED' LIMIT 1)
	END UPDATE_REMARKS,
	CASE
	WHEN B.CASE_STATUS = 70 THEN 
	(SELECT C.L_NAME FROM DB_HERO.TBL_ACTION_REMARK G,DB_HERO.TBL_LOV C WHERE G.C_ID = A.C_ID AND G.CT_ID = C.L_ID AND G.REMARK_TYPE ='CLOSED' LIMIT 1)
	END CLOSURE_TYPE,
	A.CREATED_DATE,DATE_FORMAT(A.CREATED_DATE,'%M %Y') MONTH_YEAR,
	CASE
	WHEN B.CASE_STATUS = 70 THEN 
		CASE
		WHEN (SELECT COUNT(*) FROM DB_HERO.TBL_ACTION_REMARK G WHERE G.C_ID = A.C_ID AND G.REMARK_TYPE ='IN-PROGRESS' LIMIT 1) > 0 THEN
		DATEDIFF(A.CLOSED_DATE,(SELECT G.LOGGED_DATE FROM DB_HERO.TBL_ACTION_REMARK G WHERE G.C_ID = A.C_ID AND G.REMARK_TYPE ='IN-PROGRESS' LIMIT 1))
		ELSE
			CASE
			WHEN (SELECT COUNT(*) FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SUPPORT' LIMIT 1) > 0 THEN 
				  DATEDIFF(A.CLOSED_DATE,(SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SUPPORT' LIMIT 1))
			ELSE  DATEDIFF(A.CLOSED_DATE,(SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SELF' LIMIT 1))
			END 
		END
	END AGING_CLOSED,
	CASE
	WHEN  B.CASE_STATUS = 70 THEN (SELECT G.LOGGED_DATE FROM DB_HERO.TBL_ACTION_REMARK G WHERE G.C_ID = A.C_ID AND G.REMARK_TYPE ='CLOSED' LIMIT 1) 
	END CLOSED_DATE,
	DATEDIFF((SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='TRANSFER' LIMIT 1),A.CREATED_DATE)AGING_UNASSIGNED ,
	(SELECT H.LOGGED_DATE FROM DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='TRANSFER' LIMIT 1) DATE_UNASSIGNED ,
	CASE
	WHEN (SELECT COUNT(*) FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='TRANSFER' LIMIT 1) > 0 THEN
		CASE 
		WHEN (SELECT COUNT(*) FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SUPPORT' LIMIT 1) > 0 THEN 
			DATEDIFF((SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SUPPORT' LIMIT 1),(SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='TRANSFER' LIMIT 1))
		ELSE DATEDIFF((SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SELF' LIMIT 1),(SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='TRANSFER' LIMIT 1))
		END
	ELSE
		CASE
		WHEN (SELECT COUNT(*) FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SUPPORT' LIMIT 1) > 0 THEN 
			DATEDIFF((SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SUPPORT' LIMIT 1),A.CREATED_DATE)
		ELSE DATEDIFF((SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SELF' LIMIT 1),A.CREATED_DATE)
		END 
	END AGING_ASSIGNED,
	CASE
	WHEN (SELECT COUNT(*) FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SUPPORT' LIMIT 1) > 0 THEN 
	(SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SUPPORT' LIMIT 1) 
	ELSE (SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SELF' LIMIT 1)
	END ASSIGNED_DATE,
	CASE
	WHEN (SELECT COUNT(*) FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SUPPORT' LIMIT 1) > 0 THEN
	DATEDIFF((SELECT G.LOGGED_DATE FROM DB_HERO.TBL_ACTION_REMARK G WHERE G.C_ID = A.C_ID AND G.REMARK_TYPE ='IN-PROGRESS' LIMIT 1),(SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SUPPORT' LIMIT 1)) 
	ELSE DATEDIFF((SELECT G.LOGGED_DATE FROM DB_HERO.TBL_ACTION_REMARK G WHERE G.C_ID = A.C_ID AND G.REMARK_TYPE ='IN-PROGRESS' LIMIT 1),(SELECT H.LOGGED_DATE FROM  DB_HERO.TBL_ASSIGNMENT_LOG H WHERE H.C_ID = A.C_ID AND H.AL_TYPE ='SELF' LIMIT 1)) 
	END AGING_INPROGRESS,
	(SELECT G.LOGGED_DATE FROM DB_HERO.TBL_ACTION_REMARK G WHERE G.C_ID = A.C_ID AND G.REMARK_TYPE ='IN-PROGRESS' LIMIT 1) INPROGRESS_DATE,
	DATEDIFF((SELECT G.LOGGED_DATE FROM DB_HERO.TBL_ACTION_REMARK G WHERE G.C_ID = A.C_ID AND G.REMARK_TYPE ='CANCELLED' LIMIT 1),A.CREATED_DATE) AGING_CANCELLED,
	(SELECT G.LOGGED_DATE FROM DB_HERO.TBL_ACTION_REMARK G WHERE G.C_ID = A.C_ID AND G.REMARK_TYPE ='CANCELLED' LIMIT 1) CANCELLED_DATE,
	CASE
	WHEN B.CASE_STATUS = 70 THEN DATEDIFF(A.CLOSED_DATE,A.CREATED_DATE)
	WHEN B.CASE_STATUS = 73 THEN DATEDIFF((SELECT G.LOGGED_DATE FROM DB_HERO.TBL_ACTION_REMARK G WHERE G.C_ID = A.C_ID AND G.REMARK_TYPE ='CANCELLED' LIMIT 1),A.CREATED_DATE)
	ELSE DATEDIFF(SYSDATE(),A.CREATED_DATE)
	END AGING, B.RATING,B.CKC,B.CKC_NUM
	FROM DB_HERO.TBL_CASE A
	JOIN DB_HERO.TBL_CASE_DETAIL B ON A.C_ID = B.C_ID
	WHERE B.CASE_STATUS < 73 AND B.FLAG = 'SALES' AND A.CREATED_DATE >= '2018-01-01 00:00:00'
	/*(A.CREATED_DATE >= DATE_FORMAT(CURDATE(), '%Y-%m-01') - INTERVAL 1 MONTH)*/
	LIMIT 10000;

END;

create
    definer = root@`%` procedure run_RPA(IN hID int, IN oID int, IN areaLocationID int(7), IN caseContent text,
                                         OUT oSHID int(7))
BEGIN

	DECLARE pArea VARCHAR(20) DEFAULT '';        	
	DECLARE matchCount,cDay,cHour,shID,caseTypeID,pubHoliday,tmrwPubHoliday INT(4) DEFAULT 0;        	
    DECLARE relevance FLOAT;
    DECLARE isPubHoliday,isOffDay,isWorkingDay,isTmrwWorkingDay,isBussHour,isVIP1,isTime1,isTime2,isTime3 BOOLEAN DEFAULT false;
	DECLARE iFlag VARCHAR(50) DEFAULT '';
	
    SET cHour = HOUR( CURRENT_TIMESTAMP );    
    SET cDay = WEEKDAY( CURRENT_TIMESTAMP ); /* 0=MON */
    /*SET cDay = WEEKDAY("2018-02-23 22:23:00"); */
	
    IF cHour >= 9 AND cHour < 16 THEN
		SET isBussHour = true;
    ELSEIF cHour >= 9 AND cHour < 22 THEN
		SET isTime3 = true;        
    ELSEIF cHour >= 16 AND cHour < 22 THEN
		SET isTime1 = true;
    ELSEIF cHour >= 22 AND cHour < 9 THEN
		SET isTime2 = true;
    ELSE    
		SET matchCount = 0;    
	END IF;
    
    IF cDay = 5 OR cDay = 6 THEN
		SET isOffDay = true;
    END IF;
    IF cDay = 0 OR cDay = 1 OR cDay = 2 OR cDay = 3 OR cDay = 4 THEN
		SET isWorkingDay = true;
    END IF;
    IF cDay = 6 OR cDay = 0 OR cDay = 1 OR cDay = 2 OR cDay = 3 THEN
		SET isTmrwWorkingDay = true;
    END IF;

    SELECT T2.FLAG INTO iFlag 
    FROM TBL_HERO T1
    INNER JOIN TBL_STAFF T2 ON T1.EMAIL = T2.EMAIL
    WHERE T1.H_ID = hID
    LIMIT 1;
    
    IF iFlag = 'VIP1' THEN
        SET isVIP1 = true;
    END IF;

	IF oID <> 0 THEN
		
		SELECT SH_ID INTO shID 
		FROM TBL_HERO_PROFILE WHERE H_ID = oID
		LIMIT 1; 
	
    ELSE

		IF LOCATE('#sales',caseContent) > 0 THEN
			SET shID = 407; 
		ELSEIF LOCATE('#save',caseContent) > 0 THEN
			SET shID = 492; 
		ELSEIF LOCATE('#superherounifi',caseContent) > 0 THEN
			SET shID = 554; 
		ELSE
        
			/* COMPLAINT */
			SELECT PH_ID INTO pubHoliday FROM TBL_PUBLIC_HOLIDAY
			WHERE EVENT_DATE = CURDATE();

			SELECT PH_ID INTO tmrwPubHoliday FROM TBL_PUBLIC_HOLIDAY
			WHERE EVENT_DATE = CURDATE() + INTERVAL 1 DAY;
             
			IF pubHoliday <> 0 THEN
				SET isPubHoliday = true;
			END IF;

			IF tmrwPubHoliday <> 0 THEN
				SET isTmrwWorkingDay = false;
			END IF;
			
            IF isPubHoliday OR isOffDay THEN
				
                IF isTime3 THEN
					/* 0910-2200 */
					SET shID = 16; /* ROT */
				ELSE
                
					IF isTmrwWorkingDay THEN
						/* folo BH rules */
						IF isVIP1 THEN					
							SET shID = 13; /* RRT */       
						ELSE						                    
							SET shID = 19; /* CAT HQ 19 */
						END IF;
					
					ELSE
						SET shID = 16; /* ROT */
                    END IF;
                    
                END IF;
                
            ELSEIF isWorkingDay THEN
				
                IF isBussHour THEN
					/* BH rule 0910-1600 */
					IF isVIP1 THEN					
						SET shID = 13; /* RRT */       
					ELSE						                    
						SET shID = 19; /* CAT HQ 19 */
					END IF;
					
                ELSE
					/* NON-BH Hour */
                    IF isTime1 THEN
						SET shID = 16; /* ROT */       
                    ELSE
						/* isTime2 applied */
						IF isTmrwWorkingDay THEN
							/* folo BH rules */
							IF isVIP1 THEN					
								SET shID = 13; /* RRT */       
							ELSE						                    
								SET shID = 19; /* CAT HQ 19 */
							END IF;
                        
                        ELSE
							SET shID = 16; /* ROT */
                        END IF;
                    END IF;
                    
                END IF;
                
            ELSE 
				/* DEFAULT */
                SET shID = 16; /* ROT */
            END IF;
            
                        
			/*IF isPubHoliday OR cDay = 5 OR cDay = 6 THEN
                SET shID = 16;                                
			ELSE
            
				IF cHour >= 16 AND cHour < 22 THEN
					SET shID = 16;
				ELSE 
					IF iFlag = 'VIP1' THEN
						SET shID = 13;        
					ELSE
						SET shID = 19;
					END IF;
				END IF;
                
			END IF;*/
            

		END IF; /* FLAG = COMPLAINT */   
	
	END IF; /* oID <> 0 */

	/* Final SET for retuned value */
    SET oSHID = shID;

	/* ROT Pilot
	IF areaLocationID = 124 OR areaLocationID = 145 THEN
		SET shID = 16;
	END IF;*/
		    
	/*SELECT COUNT(RPA_ID) AS TOTAL, AREA, MATCH (SUBAREA,SYMPTOM) AGAINST (caseContent IN BOOLEAN MODE) AS RELEVANCE
    INTO matchCount,pArea,relevance
	FROM TBL_RPA_KEYWORD
    GROUP BY AREA,SUBAREA,SYMPTOM
    HAVING RELEVANCE > 0
	ORDER BY RELEVANCE DESC
	LIMIT 1;

	IF pArea <> '' THEN
		SELECT L_ID INTO caseTypeID
		FROM TBL_LOV
		WHERE L_NAME = pArea AND L_GROUP = 'CASE-TYPE'
		LIMIT 1;
		
		IF pArea = 'Assurance' THEN    
			SET shID = 19;		
		END IF;
    END IF;*/
    
    /*SELECT cDay,cHour,shID,caseTypeID,pArea,caseContent;*/
    /*UPDATE TBL_CASE_DETAIL
    SET SH_ID = shID
    WHERE C_ID = cID
    LIMIT 1;*/
    
END;

create
    definer = root@`%` procedure run_RPA_dev(IN hID int, IN oID int, IN areaLocationID int(7), IN caseContent text,
                                             OUT oSHID int(7))
BEGIN

	DECLARE pArea VARCHAR(20) DEFAULT '';        	
	DECLARE matchCount,cDay,cHour,shID,caseTypeID,pubHoliday INT(4) DEFAULT 0;        	
    DECLARE relevance FLOAT;
    DECLARE isPubHoliday,isOffDay,isWorkingDay,isTmrwWorkingDay,isBussHour,isVIP1,isTime1,isTime2,isTime3 BOOLEAN DEFAULT false;
	DECLARE iFlag VARCHAR(50) DEFAULT '';
	
    SET cHour = HOUR( CURRENT_TIMESTAMP );    
    SET cDay = WEEKDAY( CURRENT_TIMESTAMP ); /* 0=MON */
    /*SET cDay = WEEKDAY("2018-02-23 22:23:00"); */
	
    IF cHour >= 9 AND cHour < 16 THEN
		SET isBussHour = true;
    ELSEIF cHour >= 9 AND cHour < 22 THEN
		SET isTime3 = true;        
    ELSEIF cHour >= 16 AND cHour < 22 THEN
		SET isTime1 = true;
    ELSEIF cHour >= 22 AND cHour < 9 THEN
		SET isTime2 = true;
    ELSE    
		SET matchCount = 0;    
	END IF;
    
    IF cDay = 5 OR cDay = 6 THEN
		SET isOffDay = true;
    END IF;
    IF cDay = 0 OR cDay = 1 OR cDay = 2 OR cDay = 3 OR cDay = 4 THEN
		SET isWorkingDay = true;
    END IF;
    IF cDay = 6 OR cDay = 0 OR cDay = 1 OR cDay = 2 OR cDay = 3 THEN
		SET isTmrwWorkingDay = true;
    END IF;

    SELECT T2.FLAG INTO iFlag 
    FROM TBL_HERO T1
    INNER JOIN TBL_STAFF T2 ON T1.EMAIL = T2.EMAIL
    WHERE T1.H_ID = hID
    LIMIT 1;
    
    IF iFlag = 'VIP1' THEN
        SET isVIP1 = true;
    END IF;

	IF oID <> 0 THEN
		
		SELECT SH_ID INTO shID 
		FROM TBL_HERO_PROFILE WHERE H_ID = oID
		LIMIT 1; 
	
    ELSE

		IF LOCATE('#sales',caseContent) > 0 THEN
			SET shID = 407; 
		ELSEIF LOCATE('#save',caseContent) > 0 THEN
			SET shID = 492; 
		ELSEIF LOCATE('#superherounifi',caseContent) > 0 THEN
			SET shID = 554; 
		ELSE
        
			/* COMPLAINT */
			SELECT PH_ID INTO pubHoliday FROM TBL_PUBLIC_HOLIDAY
			WHERE EVENT_DATE = CURDATE();
            
			IF pubHoliday <> 0 THEN
				SET isPubHoliday = true;
			END IF;
			
            IF isPubHoliday OR isOffDay THEN
				
                IF isTime3 THEN
					/* 0910-2200 */
					SET shID = 16; /* ROT */
				ELSE
                
					IF isTmrwWorkingDay THEN
						/* folo BH rules */
						IF isVIP1 THEN					
							SET shID = 13; /* RRT */       
						ELSE						                    
							SET shID = 19; /* CAT HQ */
						END IF;
					
					ELSE
						SET shID = 16; /* ROT */
                    END IF;
                    
                END IF;
                
            ELSEIF isWorkingDay THEN
				
                IF isBussHour THEN
					/* BH rule 0910-1600 */
					IF isVIP1 THEN					
						SET shID = 13; /* RRT */       
					ELSE						                    
						SET shID = 19; /* CAT HQ */
					END IF;
					
                ELSE
					/* NON-BH Hour */
                    IF isTime1 THEN
						SET shID = 16; /* ROT */       
                    ELSE
						/* isTime2 applied */
						IF isTmrwWorkingDay THEN
							/* folo BH rules */
							IF isVIP1 THEN					
								SET shID = 13; /* RRT */       
							ELSE						                    
								SET shID = 19; /* CAT HQ */
							END IF;
                        
                        ELSE
							SET shID = 16; /* ROT */
                        END IF;
                    END IF;
                    
                END IF;
                
            ELSE 
				/* DEFAULT */
                SET shID = 16; /* ROT */
            END IF;
            
                        
            
			IF isPubHoliday OR cDay = 5 OR cDay = 6 THEN
				/* ROT */
                SET shID = 16;                                
			ELSE
            
				IF cHour >= 16 AND cHour < 22 THEN
					SET shID = 16;
				ELSE 
					IF iFlag = 'VIP1' THEN
						/* RRT */
						SET shID = 13;        
					ELSE
						/* CAT HQ */                    
						SET shID = 19;
					END IF;
				END IF;
                
			END IF; /* IS WORKING DAY */

		END IF; /* FLAG = COMPLAINT */   
	
	END IF; /* oID <> 0 */

	/* Final SET for retuned value */
    SET oSHID = shID;

	/* ROT Pilot
	IF areaLocationID = 124 OR areaLocationID = 145 THEN
		SET shID = 16;
	END IF;*/
		    
	/*SELECT COUNT(RPA_ID) AS TOTAL, AREA, MATCH (SUBAREA,SYMPTOM) AGAINST (caseContent IN BOOLEAN MODE) AS RELEVANCE
    INTO matchCount,pArea,relevance
	FROM TBL_RPA_KEYWORD
    GROUP BY AREA,SUBAREA,SYMPTOM
    HAVING RELEVANCE > 0
	ORDER BY RELEVANCE DESC
	LIMIT 1;

	IF pArea <> '' THEN
		SELECT L_ID INTO caseTypeID
		FROM TBL_LOV
		WHERE L_NAME = pArea AND L_GROUP = 'CASE-TYPE'
		LIMIT 1;
		
		IF pArea = 'Assurance' THEN    
			SET shID = 19;		
		END IF;
    END IF;*/
    
    /*SELECT cDay,cHour,shID,caseTypeID,pArea,caseContent;*/
    /*UPDATE TBL_CASE_DETAIL
    SET SH_ID = shID
    WHERE C_ID = cID
    LIMIT 1;*/
    
END;

create
    definer = root@`%` procedure run_RPA_feb(IN hID int, IN oID int, IN areaLocationID int(7), IN caseContent text,
                                             OUT oSHID int(7))
BEGIN

	DECLARE pArea VARCHAR(20) DEFAULT '';        	
	DECLARE matchCount,cDay,cHour,shID,caseTypeID INT(4) DEFAULT 0;        	
    DECLARE relevance FLOAT;
    DECLARE isVIP BOOLEAN DEFAULT false;
	DECLARE vFlag VARCHAR(50) DEFAULT '';
	
    /*SELECT T2.FLAG INTO vFlag 
    FROM TBL_HERO T1
    INNER JOIN TBL_STAFF T2 ON T1.EMAIL = T2.EMAIL
    WHERE T1.H_ID = hID
    LIMIT 1;*/

	SELECT MANAGER_LVL INTO vFlag
    FROM TBL_HERO A, TBL_LDAP_PROFILE B
    WHERE A.H_ID = hID AND A.EMAIL = B.EMAIL AND B.MANAGER_LVL IN('T')
    LIMIT 1;
    
    IF vFlag <> '' THEN
        SET isVIP = true;
    END IF;

	IF oID <> 0 THEN
		
		SELECT SH_ID INTO shID 
		FROM TBL_HERO_PROFILE WHERE H_ID = oID
		LIMIT 1; 
	
    ELSE
		
        IF areaLocationID = 13 THEN
        
			SET shID = 13; 

        ELSE
        
			IF LOCATE('#sales',caseContent) > 0 THEN
				SET shID = 407; 
			ELSEIF LOCATE('#save',caseContent) > 0 THEN
				SET shID = 492; 
			ELSEIF LOCATE('#unifisuperhero',caseContent) > 0 THEN
				SET shID = 554; 
			ELSE
			
				/* COMPLAINT */			
				IF isVIP THEN					
					SET shID = 13; /* RRT */       
				ELSE						           
					
					SELECT L_ID INTO shID 
					FROM TBL_LOV 
					WHERE PARENT_ID > 0 
						AND L_GROUP = 'STAKEHOLDER' 
						AND PARENT_ID = areaLocationID
					LIMIT 1; 
					
					/* IF areaLocationID didnt MATCH to any STATE, then set CSM HQ as default */
					IF 0 = shID THEN
						SET shID = 19;
					END IF;
					
				END IF; /* FLAG = COMPLAINT */           
				
			END IF; /* LOCATE KEYWORD */   
	
        END IF; /* areaLocationID = 13 */
    
	END IF; /* oID <> 0 */

	/* Final SET for returned value */
    SET oSHID = shID;
    
END;

create
    definer = root@`%` procedure run_RPA_local(IN cID int, IN caseContent text)
BEGIN

	DECLARE pArea,pSubArea,pSymptom VARCHAR(50) DEFAULT '';        	
	DECLARE matchCount,cDay,cHour,shID,caseTypeID,isPubHoliday INT(4) DEFAULT 0;        	
    DECLARE relevance FLOAT;
    DECLARE pubHoliday BOOLEAN DEFAULT false;
	
    SET cHour = HOUR( CURRENT_TIMESTAMP );    
    SET cDay = WEEKDAY( CURRENT_TIMESTAMP ); /* 0=MON */
    /*SET cDay = WEEKDAY("2018-02-23 22:23:00"); */
    
	SELECT PH_ID INTO isPubHoliday FROM TBL_PUBLIC_HOLIDAY
	WHERE EVENT_DATE = CURDATE()+1;
    IF isPubHoliday <> 0 THEN
		SET pubHoliday = true;
    END IF;
    
    IF pubHoliday OR cDay = 5 OR cDay = 6 THEN
		SET shID = 16;        
	ELSEIF cDay = 4 THEN
		IF cHour >= 16 THEN
			SET shID = 16;        
		ELSE
			SET shID = 13;        
        END IF;    
    ELSE
		IF cHour >= 16 AND cHour < 22 THEN
			SET shID = 16;        
		ELSE
			SET shID = 13;        
        END IF;
    END IF;

	SELECT 
    COUNT(RPA_ID) AS MATCH_COUNT,
    AREA,SUBAREA,SYMPTOM,
    MATCH (SUBAREA,SYMPTOM) AGAINST (caseContent IN BOOLEAN MODE) AS RELEVANCE
    INTO matchCount,pArea,pSubArea,pSymptom,relevance
	FROM TBL_RPA_KEYWORD
    WHERE MATCH (SUBAREA,SYMPTOM) AGAINST (caseContent IN BOOLEAN MODE)
	GROUP BY AREA,SUBAREA,SYMPTOM
	HAVING RELEVANCE > 0
	ORDER BY MATCH_COUNT DESC,RELEVANCE DESC
	LIMIT 1;
    
	/*SELECT COUNT(RPA_ID) AS TOTAL, AREA, MATCH (SUBAREA,SYMPTOM) AGAINST ("bill" IN BOOLEAN MODE) AS RELEVANCE
    INTO matchCount,pArea,relevance
	FROM TBL_RPA_KEYWORD
	GROUP BY AREA,SUBAREA,SYMPTOM
	HAVING RELEVANCE > 0
	ORDER BY RELEVANCE DESC
	LIMIT 1;*/
    
	IF matchCount > 0 THEN
		/*SELECT L_ID INTO caseTypeID
		FROM TBL_LOV
		WHERE L_NAME = pArea AND L_GROUP = 'CASE-TYPE'
		LIMIT 1;*/
		
		IF pArea = 'Assurance' THEN    
			SET shID = 19;		
		END IF;
        
        INSERT INTO TBL_RPA_LOG (C_ID,ORIG_TEXT,RPA_KEY_AREA,RPA_KEY_SUBAREA,RPA_KEY_SYMPTOM)
        VALUES (cID,caseContent,pArea,pSubArea,pSymptom);
        
    END IF;
    
    SELECT cDay,cHour,shID,caseTypeID,pArea,caseContent;
        
END;

create
    definer = root@`%` procedure run_RPA_orig(IN hID int, IN oID int, IN areaLocationID int(7), IN caseContent text,
                                              OUT oSHID int(7))
BEGIN

	DECLARE pArea VARCHAR(20) DEFAULT '';        	
	DECLARE matchCount,cDay,cHour,shID,caseTypeID,isPubHoliday INT(4) DEFAULT 0;        	
    DECLARE relevance FLOAT;
    DECLARE pubHoliday,isOffDay,isTmrwWorkingDay,isBussHour,isVIP1 BOOLEAN DEFAULT false;
	DECLARE iFlag VARCHAR(50) DEFAULT '';
	
    SET cHour = HOUR( CURRENT_TIMESTAMP );    
    SET cDay = WEEKDAY( CURRENT_TIMESTAMP ); /* 0=MON */
    /*SET cDay = WEEKDAY("2018-02-23 22:23:00"); */
	
    IF cDay = 5 OR cDay = 6 THEN
		SET isOffDay = true;
    END IF;
    IF cDay = 6 THEN
		SET isTmrwWorkingDay = true;
    END IF;

    SELECT T2.FLAG INTO iFlag 
    FROM TBL_HERO T1
    INNER JOIN TBL_STAFF T2 ON T1.EMAIL = T2.EMAIL
    WHERE T1.H_ID = hID
    LIMIT 1;
    
	SELECT PH_ID INTO isPubHoliday FROM TBL_PUBLIC_HOLIDAY
	WHERE EVENT_DATE = CURDATE();
    IF isPubHoliday <> 0 THEN
		SET pubHoliday = true;
    END IF;
    
    IF pubHoliday OR cDay = 5 OR cDay = 6 THEN
		SET shID = 16;        
    ELSE
		IF cHour >= 16 AND cHour < 22 THEN
			SET shID = 16;
		ELSE 
			IF iFlag = 'VIP1' THEN
				SET shID = 13;        
            ELSE
				SET shID = 19;
            END IF;
        END IF;
    END IF;

	/* ROT Pilot
    IF areaLocationID = 124 OR areaLocationID = 145 THEN
		SET shID = 16;
	END IF;*/
    
    IF oID <> 0 THEN
		
        SELECT SH_ID INTO shID 
        FROM TBL_HERO_PROFILE WHERE H_ID = oID
        LIMIT 1; 
    
    END IF;
    
	/*SELECT COUNT(RPA_ID) AS TOTAL, AREA, MATCH (SUBAREA,SYMPTOM) AGAINST (caseContent IN BOOLEAN MODE) AS RELEVANCE
    INTO matchCount,pArea,relevance
	FROM TBL_RPA_KEYWORD
    GROUP BY AREA,SUBAREA,SYMPTOM
    HAVING RELEVANCE > 0
	ORDER BY RELEVANCE DESC
	LIMIT 1;

	IF pArea <> '' THEN
		SELECT L_ID INTO caseTypeID
		FROM TBL_LOV
		WHERE L_NAME = pArea AND L_GROUP = 'CASE-TYPE'
		LIMIT 1;
		
		IF pArea = 'Assurance' THEN    
			SET shID = 19;		
		END IF;
    END IF;*/
    
    /*SELECT cDay,cHour,shID,caseTypeID,pArea,caseContent;*/
    /*UPDATE TBL_CASE_DETAIL
    SET SH_ID = shID
    WHERE C_ID = cID
    LIMIT 1;*/
    
    /* LOCATE('#needhelp',caseContent) = 0 AND */
    IF LOCATE('#sales',caseContent) > 0 THEN
		SET shID = 407; 
	END IF;    

    IF LOCATE('#save',caseContent) > 0 THEN
		SET shID = 492; 
	END IF;    

    IF LOCATE('#superherounifi',caseContent) > 0 THEN
		SET shID = 554; 
	END IF;    
    
    SET oSHID = shID;
    
END;

create
    definer = root@`%` procedure run_RPA_test(IN cID int, IN caseContent varchar(50))
BEGIN

	DECLARE pArea,pSubArea,pSymptom VARCHAR(50) DEFAULT '';        	
	DECLARE matchCount,cDay,cHour,shID,caseTypeID,isPubHoliday INT(4) DEFAULT 0;        	
    DECLARE relevance FLOAT;
    
	SELECT 
    COUNT(RPA_ID) AS MATCH_COUNT,
    AREA,SUBAREA,SYMPTOM,
    MATCH (SUBAREA,SYMPTOM) AGAINST (caseContent IN BOOLEAN MODE) AS SCORE
    INTO matchCount,pArea,pSubArea,pSymptom,relevance
	FROM
    TBL_RPA_KEYWORD
    WHERE MATCH (SUBAREA,SYMPTOM) AGAINST (caseContent IN BOOLEAN MODE)
	GROUP BY AREA , SUBAREA , SYMPTOM
	HAVING SCORE > 0
	ORDER BY SCORE DESC
	LIMIT 1;

    /*SELECT matchCount,pArea,pSubArea,pSymptom,relevance,caseContent;*/

	IF matchCount > 0 THEN
	
		INSERT INTO TBL_RPA_LOG (C_ID,ORIG_TEXT,RPA_KEY_AREA,RPA_KEY_SUBAREA,RPA_KEY_SYMPTOM)
		VALUES (cID,caseContent,pArea,pSubArea,pSymptom);
    
	END IF;
    
END;

create
    definer = root@`%` procedure test_dashboard(IN category varchar(10))
BEGIN

	SET @preSql = CONCAT("SELECT C.STATE,COUNT(A.C_ID) AS TOTAL ");
	SET @preSql = CONCAT(@preSql, "FROM TBL_CASE A ");
	SET @preSql = CONCAT(@preSql, "JOIN TBL_HERO B ON B.H_ID = A.H_ID ");
	SET @preSql = CONCAT(@preSql, "JOIN TBL_STAFF C ON C.EMAIL = B.EMAIL ");
	SET @preSql = CONCAT(@preSql, "JOIN TBL_CASE_DETAIL D ON D.C_ID = A.C_ID ");
	SET @preSql = CONCAT(@preSql, "LEFT JOIN TBL_TMCC_STAFF E ON C.EMAIL = E.TMCC_EMAIL ");
	SET @preSql = CONCAT(@preSql, "WHERE D.CASE_STATUS <= 70 AND E.TMCC_NAME IS NULL ");
    
	IF category = 'SALES' THEN
		SET @preSql = CONCAT(@preSql,"AND D.FLAG = 'SALES' ");
	ELSE
		SET @preSql = CONCAT(@preSql,"AND D.FLAG <> 'SALES' ");    
	END IF;
	
	SET @preSql = CONCAT(@preSql, "GROUP BY C.STATE ");
        
	SET @preSql = CONCAT(@preSql, "UNION ");
	SET @preSql = CONCAT(@preSql, "SELECT 'OTHERS',COUNT(F.C_ID) AS TOTAL ");
	SET @preSql = CONCAT(@preSql, "FROM TBL_CASE F ");
	SET @preSql = CONCAT(@preSql, "JOIN TBL_HERO G ON G.H_ID = F.H_ID ");
	SET @preSql = CONCAT(@preSql, "JOIN TBL_CASE_DETAIL H ON H.C_ID = F.C_ID ");
	SET @preSql = CONCAT(@preSql, "WHERE H.CASE_STATUS <= 70 AND LOWER(G.EMAIL) NOT LIKE '%@tm.com.my%' AND LOWER(G.FULLNAME) NOT LIKE 'tad%' ");
	IF category = 'SALES' THEN
		SET @preSql = CONCAT(@preSql, "AND H.FLAG = 'SALES' ");
	ELSE
		SET @preSql = CONCAT(@preSql, "AND H.FLAG <> 'SALES' ");    
	END IF;
    
	SET @preSql = CONCAT(@preSql, "UNION ");
	SET @preSql = CONCAT(@preSql, "SELECT 'TAD',COUNT(J.C_ID) AS TOTAL ");
	SET @preSql = CONCAT(@preSql, "FROM TBL_CASE J ");
	SET @preSql = CONCAT(@preSql, "JOIN TBL_HERO K ON K.H_ID = J.H_ID ");
	SET @preSql = CONCAT(@preSql, "JOIN TBL_CASE_DETAIL L ON L.C_ID = J.C_ID ");
	SET @preSql = CONCAT(@preSql, "WHERE L.CASE_STATUS <= 70 AND LOWER(K.EMAIL) NOT LIKE '%@tm.com.my%' AND LOWER(K.FULLNAME) LIKE 'tad%' ");
	IF category = 'SALES' THEN
		SET @preSql = CONCAT(@preSql, "AND L.FLAG = 'SALES' ");
	ELSE
		SET @preSql = CONCAT(@preSql, "AND L.FLAG <> 'SALES' ");    
	END IF;
    
	SET @preSql = CONCAT(@preSql, "UNION ");
	SET @preSql = CONCAT(@preSql, "SELECT 'TMCC',COUNT(M.C_ID) AS TOTAL ");
	SET @preSql = CONCAT(@preSql, "FROM TBL_CASE M ");
	SET @preSql = CONCAT(@preSql, "JOIN TBL_HERO N ON N.H_ID = M.H_ID ");
	SET @preSql = CONCAT(@preSql, "JOIN TBL_CASE_DETAIL P ON P.C_ID = M.C_ID ");
	SET @preSql = CONCAT(@preSql, "JOIN TBL_TMCC_STAFF Q ON N.EMAIL = Q.TMCC_EMAIL ");
	SET @preSql = CONCAT(@preSql, "WHERE P.CASE_STATUS <= 70 ");
	IF category = 'SALES' THEN
		SET @preSql = CONCAT(@preSql, "AND P.FLAG = 'SALES' ");
	ELSE
		SET @preSql = CONCAT(@preSql, "AND P.FLAG <> 'SALES' ");    
	END IF;
    
	SET @preSql = CONCAT(@preSql, "ORDER BY TOTAL DESC");
    
	PREPARE stmt FROM @preSql;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
    
END;


