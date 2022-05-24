app.get('/case/update-case-status/', (req, res) => {
    res.send('API for Update Case Status')
})
app.get('/case/get-action-remark-list/', (req, res) => {
    res.send('API for Get Action Remark List')
})
app.get('/case/update-action-remark/', (req, res) => {
    res.send('API for Update Action Remark List')
})
app.get('/case/transfer-case-owner/', (req, res) => {
    res.send('API for Transfer Case Owner')
})
app.get('/case/assign-to-support/', (req, res) => {
    res.send('API for Case Assignment to Support')
})
app.get('/case/assign-case-to-me/', (req, res) => {
    res.send('API for Case Assignment to Me')
})
app.get('/case/reopen-case/', (req, res) => {
    res.send('API for Reopen Case')
})
app.get('/case/get-assignment-log/', (req, res) => {
    res.send('API for Get Assignment Log')
})
