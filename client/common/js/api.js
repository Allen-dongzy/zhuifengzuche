import request from "./request.js"

export default {
	/**
	 * 登录
	 * @param {Object} params
	 */
	passwordLogin(params) {
		return request("/v1/partner/registerpartner", "POST", params)
	}
}