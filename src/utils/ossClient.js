/**
 * 封装阿里云 OSS 图片上传功能
 * 使用方式:
 * 1、生成 OSS 实例: const oss = new OssClient()
 * 2、调用实例方法 getOssInfo 获取上传凭证: oss.getOssInfo()
 * 3、如果上传凭证获取成功，则调用实例上传方法，获取上传成功后的图片地址:
 *    oss.ossUpStream(data).then(res => {
 *      const ossUrlList = res
 *    }).catch (err => {
 *      this.$message.error('图片上传失败')
 *    })
 */
import Vue from 'vue'

class OssClient {
  constructor() {
    this.options = {
      key: '', // 文件名(含路径, 不能包含host, 如: nongzhengbao/images/8.png)
      policy: '', // policy规定了请求的表单域的合法性
      Signature: '', // 根据AccessKeySecret和policy计算的签名信息，OSS验证该签名信息从而验证该Post请求的合法性
      OSSAccessKeyId: '', // Bucket拥有者的AccessKeyId
      success_action_status: '200', // 未指定success_action_redirect表单域时，该表单域指定了上传成功后返回给客户端的状态码（默认会返回204）
    }
    this.downloadDir = '' // 图片存储的oss文件夹路径
    this.downloadUrl = '' // oss图片下载地址列表
    this.server = {
      url: '', // 上传服务器地址
    }
  }

  /**
   * 获取 OSS 上传凭证
   */
  getOssInfo() {
    return new Promise(async (resolve) => {
      try {
        const res = await Vue.prototype.$request.get('/share/ossPolicy')
        const { host, dir, policy, accessid, signature } = res
        this.options.policy = policy
        this.options.Signature = signature
        this.options.OSSAccessKeyId = accessid
        this.options.key = `${dir}`
        this.downloadDir = `${host}/${dir}`
        this.server.url = host
        resolve(true)
      } catch (err) {
        Vue.prototype.$message.error(err.message || '获取 OSS 凭证失败')
        resolve(false)
      }
    })
  }

  /**
   * 封装 formData 数据对象
   */
  formData(rawData, fileName) {
    // this.downloadUrlList.push(`${this.downloadDir}${fileName}`)
    this.downloadUrl = `${this.downloadDir}${fileName}`
    let form = new FormData()
    let obj = {
      ...this.options,
      key: `${this.options.key}${fileName}`,
    }
    for (let item in obj) {
      form.append(item, obj[item])
    }
    // oss对参数顺序有要求,file必须是表单中的最后一个域
    form.append('file', rawData)
    return form
  }

  /**
   * oss 流上传
   * @param {Object} fileList[file] - 文件对象--单文件上传
   * @param {String} file.name - 文件原名称
   * @param {Object} file.rawData - 文件原始 File 类型数据
   */
  ossUpStream(file) {
    console.log('-------------ossUpStream file: ', file)

    // let promiseList = []
    // 生成文件名: 32位包含0-9数字及a-z字母的随机字符串
    let fileName = Array.from(Array(32), () => Math.floor(Math.random() * 36).toString(36)).join('')
    // 获取文件扩展名
    const extName = file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase()

    // 合成最终的文件名
    fileName = `${fileName}.${extName}`

    let formData = this.formData(file.raw, fileName)
    let params = {}
    params.body = formData
    params.url = this.server.url

    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.request(params)
        res.downloadUrl = this.downloadUrl
        resolve(res)
      } catch (err) {
        reject(err)
      }
    })
  }

  /**
   * 采用 XHR 上传图片
   */
  request(options) {
    const { method, url, contentType, body } = options
    let xhr = new XMLHttpRequest()
    xhr.open(method || 'POST', url, true)
    if (contentType) {
      xhr.setRequestHeader('Content-Type', contentType)
    }
    xhr.send(body)
    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const json = xhr.responseText ? JSON.parse(xhr.responseText) : {}
            resolve(json)
          } else {
            reject(xhr.responseText)
          }
        }
      }
    })
  }
}

export default OssClient
