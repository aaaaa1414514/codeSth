import { insertAdjacentHTML, parseDom } from '../util/index.js'

export default class Dialog {
  constructor(options) {
    const { title = '标题', message = '', type = 'alert', closeOnClickOverlay = true } = options
    // type: alert: 提示 confirm: 确认
    this.type = type
    // 标题
    this.title = title
    // 内容
    this.message = message
    // 是否在点击遮罩层后关闭弹窗
    this.closeOnClickOverlay = closeOnClickOverlay
  }

  open(resolve, reject) {
    this.resolve = resolve
    this.reject = reject

    const template = this.render()

    //insertAdjacentHTML(template)
    document.body.append(template)
  }

  onOk() {
    this.resolve()
    this.close()
  }

  cancel() {
    this.reject()
    this.close()
  }

  close() {
    this.template.remove()
  }

  bindClick() {
    const $ok = this.template.querySelector('.btn-ok')
    const $cancel = this.template.querySelector('.btn-cancel')
    // 遮罩是否支持关闭弹窗
    if (this.closeOnClickOverlay) {
      this.template.addEventListener('click', this.cancel.bind(this))
    }

    $ok && $ok.addEventListener('click', this.onOk.bind(this))
    $cancel && $cancel.addEventListener('click', this.cancel.bind(this))
  }

  hasCancel() {
    return this.type === 'confirm'
  }

  render() {
    let template = `
    <div class="shadow">
      <div class="dialog">
        <p class="dialog-title">${this.title}</p>

        <div class="dialog-content">
          ${this.message}
        </div>


        <div class="dialog-footer">
          ${this.hasCancel() ? '<div  class="dialog-btn btn-cancel ">取消</div>' : ''}
          <div  class="dialog-btn btn-ok primary-color">好的</div>
        </div>
      </div>
    </div>`

    template = parseDom(template)[1]
    this.template = template

    // 绑定事件
    this.bindClick()

    return template
  }
}

export function showDialog(options) {
  const dialog = new Dialog({
    ...options
  })

  return new Promise((resolve, reject) => {
    dialog.open(resolve, reject)
  })
}
