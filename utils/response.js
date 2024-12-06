/**
 * @param {string} key - Tên của trường trong đối tượng dữ liệu trả về
 * @param {null | Array<Object> | Object} data - Dữ liệu trả về (có thể là một mảng hoặc đối tượng)
 * @param {Object} pagination - Thông tin phân trang
 * @param {number} pagination.total - Tổng số bản ghi
 * @param {number} pagination.count - Số bản ghi hiện tại
 * @param {number} pagination.per_page - Số bản ghi trên mỗi trang
 * @param {number} pagination.current_page - Trang hiện tại
 * @param {number} pagination.total_page - Tổng số trang
 * @returns {{ success: boolean, data: Object, pagination: Object }} - Đối tượng chứa dữ liệu thành công và phân trang
 */
const responseSuccess = (key, data, pagination = null) => {
	let response = {
		success: true,
		data: data
			? {
					[key]: data,
			  }
			: null,
	};
	if (pagination) {
		const { total, count, per_page, current_page } = pagination;
		const total_pages = Math.ceil(total / per_page);
		response.meta = {
			pagination: {
				...pagination,
				total_pages,
			},
		};
	}
	return response;
};
const responseFail = message => {
	return {
		success: false,
		data: null,
		message: `${message}`,
	};
};

module.exports = {
	responseSuccess,
	responseFail,
};
