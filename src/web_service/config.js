const configData = {
	envUrl: process.env.REACT_APP_API_URL,
	localUrl: process.env.REACT_APP_LOCAL_API_URL,
}

// Change the exported url to correspond with the environment
module.exports = configData.localUrl
