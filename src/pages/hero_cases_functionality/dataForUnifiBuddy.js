const unifiFormPageData = {
	areaLocation: [
		{id: '124', city: 'Johor'},
		{id: '127', city: 'Kedah'},
		{id: '127', city: 'Perlis'},
		{id: '133', city: 'Kelantan'},
		{id: '136', city: 'Terengganu'},
		{id: '139', city: 'Kuala Lumpur', state: 'WILAYAH PERSEKUTUAN'},
		{id: '142', city: 'Melaka'},
		{id: '145', city: 'MSC'},
		{id: '148', city: 'Negeri Sembilan'},
		{id: '151', city: 'Pahang'},
		{id: '154', city: 'Pulau Pinang'},
		{id: '157', city: 'Perak'},
		{id: '160', city: 'Selangor'},
		{id: '163', city: 'Petaling Jaya'},
		{id: '166', city: 'Sabah'},
		{id: '169', city: 'Sarawak'},
		{id: '641', city: 'RRT'}
	],
	type: [
		{id: '28', caseType: 'Assurance'},
		{id: '37', caseType: 'Billing'},
		{id: '503', caseType: 'Caution Report'},
	],
	area: [
		{id: '79', area: 'Service Failure'},
		{id: '82', area: 'Complaint'},
		{id: '121', area: 'Enquiries'}
	],
	subArea: [
		{id: '85', subArea: 'Services Down', parentID: '121'},
		{id: '88', subArea: 'Report Progress', parentID: '121'},
		{id: '91', subArea: 'Payment', parentID: '121'},
		{id: '94', subArea: 'Charges', parentID: '121'},
		{id: '97', subArea: 'Bill Details', parentID: '121'},
		{id: '100', subArea: 'TOS/RTN', parentID: '82'},
		{id: '103', subArea: 'Dispute-Invalid Charges', parentID: '82'},
		{id: '106', subArea: 'Complaint Handling & Resolution', parentID: '82'},
		{id: '109', subArea: 'Payment Not Updated', parentID: '82'}
	],
	product: [
		{id: '590', product: 'UniFi Mobile'},
		{id: '587', product: 'UniFi TV'},
		{id: '584', product: 'Broadband'},
		{id: '581', product: 'Telephony'}
	],
	symptom: [
		{id: '670', symptom: 'DT_NoDialTone', source: 660},
		{id: '672', symptom: 'DSL_NoDialTone', source: 660},
		{id: '674', symptom: 'DSL_CantLoginDTDSLBlinkCantReset', source: 660},
		{id: '676', symptom: 'DSL_CantLoginDTDSLBlinkPortReset', source: 660},
		{id: '678', symptom: 'DSL_LineDisconnect', source: 660},
		{id: '680', symptom: 'Blank Screen_All Channel', source: 662},
		{id: '682', symptom: 'Line Disconnect', source: 662},
		{id: '684', symptom: 'TMWiFi Modem Down', source: 662},
		{id: '686', symptom: 'VoBB Down', source: 662},
		{id: '688', symptom: 'Jerks/Pixel_HD Live TV', source: 662}
	]
}

module.exports = unifiFormPageData
