/**
 * 
 * @description user controller
 * @author  刘豪讲师
 */

 const  User = require('../modles/User')



 /**
  * 注册
  * @param {string} username 用户名
  * @param {string} password 密码
  */
 async function register(username, password) {
     // 保存到数据库
     const newUser = await User.create({ username, password })
     return newUser
 }
 
 
 /**
  * 登录
  * @param {string} username 用户名
  * @param {string} password 密码
  */
  async function login(username, password) {
     // 保存到数据库
     const user = await User.findOne({ username, password })
     if (user != null) {
         return true
     }
     return false
 }
 
 module.exports = {
     register,
     login
 }