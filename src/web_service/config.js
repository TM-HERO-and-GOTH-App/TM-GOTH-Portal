const configData = {
	 prodUrl : process.env.REACT_APP_API_URL,
	 localUrl : process.env.REACT_APP_LOCAL_API_URL,
	 devUrl : process.env.REACT_APP_DEV_API_URL
}

// Change the exported url to correspond with the environment
module.exports = configData.localUrl
