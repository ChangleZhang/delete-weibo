//�Զ�ɾ������΢���ű�
//author:xavierskip
//
//
//
//
//

function del_weibo(){
	var done  = 0,
		wrong = 0,
		array = [],
		weibo_lists = document.getElementsByClassName("feed_list W_linecolor");
    // get whole page weibo_mid
	for(var i=0;i<weibo_lists.length;i++){
		array.push(weibo_lists[i].getAttribute("mid"));
	};
	console.log('get all mid & ready to del!');   //console output
	//sent XMLHttpRequest to del weibo 
	function deletes(mid){
		var	del   = new XMLHttpRequest();
		del.open('post','http://weibo.com/aj/mblog/del?',false);
		del.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		del.send('mid='+mid+'&_t=0');
		var Return = eval("("+del.response+")");
		if(Return.code=='100000'){
			done++;
		}else{
			wrong++;
		};
		console.log("delete weibo!");             //console output
		return true;
	};
	var start_time = new Date();
	for(i in array){
		deletes(array[i]);
	}
	var end_time = new Date();
	var time = (end_time - start_time)/1000;
	n++;
	console.log('ɾ����'+done+'��΢����\n'+wrong+'��ɾ��ʧ��\n����ɾ�����󹲻���'+time+'s');//console output		
};

function next_page(){
	var next_page = document.getElementsByClassName("W_pages")[0];
	next_page.children[next_page.children.length-1].click();
};

function main(){
	var onload_page = setInterval(function(){
		window.scroll(0,document.body.scrollHeight);
		console.log("scrolling~");    //�ҹ����ҹ����ҹ�����~~~~
		if(document.getElementsByClassName("W_pages")[0] != undefined){
    		clearInterval(onload_page);
			console.log("loading page complete!!!!"); //console output
			del_weibo();
			next_page();
			console.log(n+"jump to next page");         //console output
    	}
    },1000);//�����ʵ���Сһ�������ֵ��������ĵ��Ի᲻����á�������Ҳ��֪����
};

function goto_del(number){
	for (var x=0;x<number;x++){
		main();
	}
};

var n=0;
var weibo_num = document.getElementsByTagName('strong')[3].textContent;
var weibo_pags = Math.ceil(weibo_num/45);
goto_del(weibo_pags);//���Ը�Ϊ����ɾ����ҳ��