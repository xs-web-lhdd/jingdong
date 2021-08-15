/**
 * 错误返回的数据格式
 */


 class ErrorModel {
    constructor(error = -1, message = 'error') {
        this.error = error 
        this.message = message
    }
}

module.exports = ErrorModel