function DataToCSV(data) {
    let processedData = [];
    for (let i = 0; i < data.length; i++) {
        const date = new Date(data[i].createdDate)
        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "2-digit",
            year: "numeric",
            hour: 'numeric',
            minute: 'numeric',
            hourCycle: 'h12'
        })
        const agingDay = (data[i].caseStatus === 'CLOSED') ? data[i].closedAging : data[i].unclosedAging;
        const agingKey = (data[i].caseStatus === 'CLOSED') ? data[i].closedAgingDH : data[i].unclosedAgingDH;
        processedData.push({
            case_id: data[i].caseNum + ' ' + formattedDate,
            status: data[i] ? 'A' : '-',
            aging: agingKey < 16 ? agingKey : agingKey, //(filteredData[i].unclosedAging > 30 ? 'danger' ? 'warning')
            type: data[i].caseType,
            vip: data[i].vip ? 'true' : 'false',
            eligibility: data[i].eligibility,
            product: data[i].productName,
            customer: data[i].customerName,
            hero: data[i].fullname,
            owner_group: data[i].ownerName === null ? ('Un-Assigned - ' + data[i].stakeholderName) : (data[i].ownerName + ' - ' + data[i].stakeholderName),
            state: data[i].areaLocation,
            alert: data[i].totalNewAlert > 0 ? data[i].totalNewAlert : '0'
        })
    }
    return processedData;
}

export default DataToCSV;
