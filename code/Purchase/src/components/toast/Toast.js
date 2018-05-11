import { h, Component } from 'preact'
import Notification from 'rc-notification'
import './Toast.scss'
import { isNATIVE, showWaitView, makeToast } from 'utils/NativeCalls'

let notify;
let key = 1;
function getNotify() {
	if (notify) return notify;
	Notification.newInstance({}, (n) => notify = n);
	//console.log(notify);
	return notify;
}

function notice(type, msg, duration = 2) {
	if (type == 'loading') {
		duration = 5;
	}

	let iconType = ({
    'info': 'weui-icon-info weui-icon_toast',
    'success': 'weui-icon-success-no-circle weui-icon_toast',
    'warn': 'weui-icon-warn weui-icon_toast',
    'loading': 'weui-loading weui-icon_toast',
  })[type];

  let showType = ({
    'info': true,
    'success': true,
    'warn': true,
    'loading': false,
  })[type];

  let removeKey = key;

  getNotify().notice({
  	key,
  	duration,
    content: (
			<div>
        <div class="toast-mask" hidden={showType}></div>
        <div class="toast_loading" style={!showType ? "display:block;" : "display:none;"}></div>
      	<div class="weui-toast" style={showType ? "display:block;" : "display:none;"} onClick={() => doIt(removeKey)}>
          <i class={iconType}></i>
          <p class="weui-toast__content">{msg}</p>
        </div>
      </div>
    ),
    style: {'position': 'fixed', 'z-index': '1000'},
    onClose() {console.log('notice closed')},
  });

  return (function () {
    let target = key++;
    return function () {
      getNotify().removeNotice(target);
    }
  }())
}

function doIt(t) {
  getNotify().removeNotice(t);
}

let toast = isNATIVE ? {
  info(msg) {
    makeToast(msg)
    return () => {}
  },
  success(msg, duration) {
    makeToast(msg)
    return () => {}
  },
  warn(msg) {
    makeToast(msg)
    return () => {}
  },
  loading(msg) {
    showWaitView(true)
    return () => { showWaitView(false) }
  }
} : {
  info(msg) {
    return notice('info', msg);
  },
  success(msg, duration) {
    return notice('success', msg, duration);
  },
  warn(msg) {
    return notice('warn', msg);
  },
  loading(msg) {
    return notice('loading', msg);
  }
}

export default toast
