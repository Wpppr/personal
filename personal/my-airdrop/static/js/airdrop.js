// function _upload(formdata){
// 	$.ajax({
// 		url: '/airdrop',
// 		data: formdata,
// 		type: 'post',
// 		dataType: 'json',
// 		cache: false,
// 		processData: false,
// 		contentType:false,
// 		success: function(res){
// 			// console.log(res);
// 			location.reload();
// 		},
// 		error: function(res){
// 			// console.log(res);
// 			location.reload();
// 		}
// 	});
// }
//上传进程显示
function _upload(formdata){
	$.ajax({
		url: '/airdrop',
		data: formdata,
		type: 'post',
		dataType: 'json',
		cache: false,
		processData: false,
		contentType:false,
		xhr: function(){
			var xhr = new XMLHttpRequest();
			var progress = document.getElementById("progress");
			var progress_text = document.getElementById("progress_text");
			var progress_bar = document.getElementById("progress_bar");
			progress.style.visibility = "visible";
			progress_text.style.visibility = "visible";
			progress_bar.style.visibility = "visible";
			xhr.upload.addEventListener('progress',function(e){
				if (e.total<1024){t = e.total+'B'}//Byte
				else if (e.total<1048576){t = (e.total/1024).toFixed(2)+'KB'}//KB
				else if (e.total<1073741824){t = (e.total/1048576).toFixed(2)+'MB'}//MB
				else{t = (e.total/1073741824).toFixed(2)+'GB'}//GB

				if (e.loaded<1024){l = e.loaded+'B'}//Byte
				else if (e.loaded<1048576){l = (e.loaded/1024).toFixed(2)+'KB'}//KB
				else if (e.loaded<1073741824){l = (e.loaded/1048576).toFixed(2)+'MB'}//MB
				else{l = (e.loaded/1073741824).toFixed(2)+'GB'}//GB
				progress_text.innerHTML = l+"/"+t;
				progress_bar.style.width = e.loaded/e.total*25+"vw";
				// console.log((e.loaded/e.total*100).toString()+'%')
				// progress_bar.setAttribute('value',(e.loaded/e.total*100).toString());
				if (e.total==e.loaded){
					location.reload();
				}
			})
		return xhr
		}
	});
}
//页面滑动
function adjust() {
	var event = window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
	var w=document.documentElement.clientWidth+scrollX;
	var h=document.documentElement.clientHeight+scrollY-30;
	// console.log(w+" "+h);
	var dropbox = document.getElementById('dropbox');
	dropbox.style.width = w+'px';
	dropbox.style.height = h+'px';
}

function prevent(e){
		e.stopPropagation();
		e.stopImmediatePropagation();
		e.preventDefault();
}

window.onload = function(){
	var fileInput = document.getElementById('fileInput');
	fileInput.addEventListener('change', inputUpload, false);
//	change 该事件在表单元素的内容改变时触发
//	第一个参数是事件的类型（如“ click”或“ mousedown”）。
//第二个参数是我们想要在事件发生时调用的函数。
//第三个参数是一个布尔值，指定是使用事件冒泡还是事件捕获。此参数是可选的。
	function inputUpload(){
		var formdata = new FormData();
//		数量
		var num = document.getElementById('fileInput').files.length;
		formdata.append('num',num);
//文件
		for(var i=0;i<num;i++){
			var file = document.getElementById('fileInput').files[i];
			formdata.append('file'+i,file);
		}
		_upload(formdata);
	}

	var dropbox = document.getElementById('dropbox');
	var p1 = document.getElementById('p1');
	var filelister = document.getElementById('filelister');
	var upload = document.getElementById('upload');
	var lists = document.getElementsByClassName('lists');
	filelister.ondragover = function(e){prevent(e);}
	filelister.ondragleave = function(e){prevent(e);}
	for(l in lists){l.ondragenter=function(e){prevent(e);l.ondragleave=function(e){prevent(e);}}}
	document.ondragover = () => false;
    document.ondrop = () => false;

    // 移动端适配
    var uA = navigator.userAgent.toLowerCase();
    var ipad = uA.match(/ipad/i) == "ipad";
    var iphone = uA.match(/iphone os/i) == "iphone os";
    var midp = uA.match(/midp/i) == "midp";
    var uc7 = uA.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var uc = uA.match(/ucweb/i) == "ucweb";
    var android = uA.match(/android/i) == "android";
    var windowsce = uA.match(/windows ce/i) == "windows ce";
    var windowsmd = uA.match(/windows mobile/i) == "windows mobile"; 
    if (!(ipad || iphone || midp || uc7 || uc || android || windowsce || windowsmd)) {
        dropbox.ondblclick = function(e){fileInput.click();}  #双击
    }else{
    	fileInput.setAttribute('class','Display');
    	// $('#p1').remove();
    	p1.innerhtml = "click to choose file(s)"
    }

	
	dropbox.ondragover = function(e){
		e.stopPropagation();
		e.stopImmediatePropagation();
	    e.preventDefault();
    }
	dropbox.ondragenter = (e) => {
		e.stopPropagation();
		e.stopImmediatePropagation();
		// console.log('enter');
		p1.style.visibility = 'hidden';
		dropbox.style.backgroundImage = "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%), url('/airdrop/upload.png')";
		return false;
	}
	dropbox.ondragleave = (e) => {
		e.stopPropagation();
		e.stopImmediatePropagation();
		// console.log('leave');
		dropbox.style.backgroundImage = 'none';
		p1.style.visibility = 'visible';
		return false;
    }
	dropbox.ondrop = function(e) {
		// console.log('hello')
		e.stopPropagation();
		e.preventDefault();
	    var formdata = new FormData();
	    var num = e.dataTransfer.files.length;
	    formdata.append('num',num);
	    for(var i=0;i<num;i++){
			var file = e.dataTransfer.files[i];
			formdata.append('file'+i,file);
		}
	    _upload(formdata);
	}

	var delBtns = document.getElementsByClassName('del');
	for(var i=0;i<delBtns.length;i++){
		// console.log(delBtns[i])
		delBtns[i].onclick=function(e){
			// console.log('hello')
			name = this.getAttribute('name');
			// console.log(name);
			formdata = new FormData();
			formdata.append('name',name)
			$.ajax({
				url: '/airdrop/haveBeenDownload',
				data: formdata,
				type: 'post',
				dataType: 'json',
				cache: false,
				processData: false,
				contentType:false,
				success: function(res){
					// console.log(res);
					location.reload();
				},
				error: function(res){
					// console.log(res);
					location.reload();
				}
			});
			return 'asdljfsalkjfslkf'
		}
	}
	// console.log(delBtns);


	setInterval(adjust,100);
}


