/**
 * 成功返回的格式
 */

class SuccessModel {
    constructor(data) {
        this.error = 0
        if (data != null) {
            this.data = data
        }
    }
}

module.exports = SuccessModel