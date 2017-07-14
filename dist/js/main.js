/**
 * Created by chloe on 2017/7/4.
 */
var Tips=function(str,param){
    var p="";
    $("#tips").css("display","flex");
    if(param) {
        p=param
    }
    $("#tips div").html(str+p);
    setTimeout(function(){
        $("#tips").css("display","none");
    },3000)
}
$("#audiosrc").on("canplay",function(){
    playaudio();
})
function playaudio(){
    var aud=document.getElementById("audiosrc");
    var playTimes=aud.duration;
    var intTimes=Math.ceil(playTimes);
    $(".details .allTimes span").text(intTimes+"'");
    var flag=false;
    $(".series").click(function(){
        var i=0;
        var src="";
        flag=!flag;
        if(flag){
            aud.play();
            var action= setInterval(function(){
                src="dist/img/audImg"+(i%4+1)+".png";
                $(".series img").attr("src",src);
                i++;
                if(aud.currentTime*1000<aud.duration*1000 && flag){

                }else{
                    clearInterval(action);
                    aud.pause();
                    if(flag){
                        flag=!flag;
                    }
                }
            },500)
        }
        else{
            console.log(flag);
            aud.pause();
            $(".series img").attr("src","dist/img/audImg4.png");
        }
    })
}
/*这段代码是固定的，必须要放到js中*/
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
function jugePhoneType(){
    var ua=navigator.userAgent.toLowerCase();
    if(/android/.test(ua)){
        return 1
    }else if(/iphone|ipad|ipod/.test(ua)){
        return 2
    }else{
        return -1
    }
}
function personPage(uuid){
    event.stopPropagation();
    console.log(uuid);
    if(jugePhoneType()==1) {
        blemobi.jumpPersonInfo(uuid.toString())
    }else{
        setupWebViewJavascriptBridge(function(bridge) {
            bridge.callHandler('jumpPersonInfo',{uuid:uuid}, function(response) {

            })
        })
    }
}
function configIP(){
    var url=  window.location.host;
    if(url=="sz1-test-sep-static.oss-cn-shenzhen.aliyuncs.com"){
        return "http://lb1qa1sep.blemobi.com:80";
    }else{
        return "http://192.168.5.105";
    }
}
var comment={};
(function(self,$){
    function request(url,fn){
        $.ajax({

            url:url,
            method:"GET",
            contentType:"application/json",
            beforeSend : function(xhr) {
                xhr.setRequestHeader("If-Modified-Since","0");
            },
            error:function(){
                Tips("网络出错,请稍后重试");
            },
            success:function(data){
                if(typeof fn=="function"){
                    fn(data)
                }
            }
        })
    }
    function setImgWidht(){
        var w=$(".oneImg").css("width");
        var h=0.5625*parseInt(w);
        $(".oneImg").css("height",h+"px");

        var w1=$(".twoImg").css("width");
        $(".twoImg").css("height",w1);

        var twoImg=$("#hot .twoImg");
        for(var i=0;i<twoImg.length;i++){
            var img=$(twoImg[i]).children("img");
            for(var j=0;j<img.length;j++){
                var imgw=  $(img[j]).css("width");
                var imgh=  $(img[j]).css("height");
                if(imgw<imgh){
                    $(img[j]).css("width",w1).css("height","auto");
                }else{
                    $(img[j]).css("height",w1).css("width","auto");
                }
            }
        }
        var twoImg1=$("#all .twoImg");
        for(var i=0;i<twoImg1.length;i++){
            var img1=$(twoImg1[i]).children("img");
            for(var j=0;j<img1.length;j++){
                var imgw1=  $(img1[j]).css("width");
                var imgh1=  $(img1[j]).css("height");
                if(imgw1<imgh1){
                    $(img1[j]).css("width",w1).css("height","auto");
                }else{
                    $(img1[j]).css("height",w1).css("width","auto");
                }
            }
        }


        var w2=$(".thumbnailHidden").css("width");
        $(".thumbnailHidden").css("height",w2);

        var th=$("#hot .thumbnailHidden");
        for(var i=0;i<th.length;i++){
            var thimg=$(th[i]).children("img");
            var thw=  $(thimg).css("width");
            var thh=  $(thimg).css("height");
            if(thw<thh){
                $(thimg).css("width",w2).css("height","auto");
            }else{
                $(thimg).css("height",w2).css("width","auto");
            }
        }

        var th1=$("#all .thumbnailHidden");
        for(var i=0;i<th1.length;i++){
            var thimg1=$(th1[i]).children("img");
            var thw1=  $(thimg1).css("width");
            var thh1=  $(thimg1).css("height");
            if(thw1<thh1){
                $(thimg1).css("width",w2).css("height","auto");
            }else{
                $(thimg1).css("height",w2).css("width","auto");
            }
        }

    }
    function parseAppURL(url,that){
        var arr = url.split("&bodyurl=");
        var UUID = arr[0].split("?");
        var postid = arr[0].split(/&|=/);
        var obj={
            htmlurl:arr[1],
            comment:UUID[1],
            postid:postid[3],
            uuid:postid[1]
        }
        that.comment=UUID[1];
        return obj;
    }
    function setPosition(){
        //全部评论和热门评论显示在顶部
        var hTop=$(" #commentBarHot").offset().top;
        var aTop=$("#commentBarAll").offset().top;
        $(window).scroll(function(){
            var h=$("#all").css("height");
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var viewportSize = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            var x =scrollTop + viewportSize- hTop- $(window).height()-50;
            var y=scrollTop + viewportSize-aTop-$(window).height()-50;
            if(x>=0){
                $("#commentBarHot").css("position","fixed").css("top","0").css("left",0).css("right",0);
                $("#commentBarAll").css("position","relative");
            }else{
                $("#commentBarHot").css("position","relative");
            }
            if(y>=0){
                $("#commentBarAll").css("position","fixed").css("top","0").css("left",0).css("right",0);
                $("#commentBarHot").css("position", "relative");
            }else{
                $("#commentBarAll").css("position", "relative");
            }
        })
    }
     self.loadVM=function(){
        var vm =new Vue({
            el: "#app",
            data: {
                items: [],
                imageList: [],
                context: "",
                offset: 0,
                dis: false,
                voteSum: 0,
                voteData: [],
                downVote: 0,
                dianzhan: "dianzhan",
                downvote: "downvote",
                contentImg: [],
                hotItems: [],
                swiper: null,
                hot: 0,
                uuid: "",
                currentImgIndex: 0,
                comment:"",
                sortComment:{
                     sort:0,//正序1，倒序0,倒序的是最新发表的在前面
                     text:"倒序",
                },
            },
            mounted: function () {
                var cxtURL, that = this;
                if (jugePhoneType() == 1) {
                    cxtURL = window.blemobi.getFrameUrl();
                    console.log("cxtURL==", cxtURL);
                    var url = JSON.parse(cxtURL);
                    var parseURL = parseAppURL(url.url,that);
                    console.log("parseURL==", parseURL);
                    this.getAppURLData(parseURL);
                    that.uuid = parseURL.uuid;
                } else {
                    setupWebViewJavascriptBridge(function (bridge) {
                        bridge.callHandler('getFrameUrl', {}, function (response) {
                            var parseURL = parseAppURL(response,that);
                            that.getAppURLData(parseURL);
                            that.uuid = parseURL.uuid;
                        })
                        bridge.registerHandler('comment.vm.votedNewsSuccess', function (data, votedNewsSuccess) {
                            that.votedNewsSuccess(data);
                        })
                        bridge.registerHandler('comment.vm.getCommentID', function (data, getCommentID) {
                            that.getCommentID(data.id,data.index);
                        })
                        bridge.registerHandler("comment.vm.updataComment", function (data, updataComment) {
                            alert(data);
                            that.updataComment(data.id,data.index);
                        })
                    })
                }
            },
            methods: {
                sortCom:function(){
                    var that=this;
                    if(this.sortComment.sort==1) {
                        that.sortComment = {
                            text: "倒序",
                            sort: 0,
                        }
                    }else{
                        that.sortComment = {
                            text: "正序",
                            sort: 1,
                        }
                    }
                    var comURL = configIP() + "/comment/guest/loadcomment?count=20&offset=0&sort="+this.sortComment.sort+"&" + this.comment;
                    request(comURL, function (data) {
                        console.log("data", data)
                        if (data.comments && data.comments.length > 0) {
                            that.items = data.comments;
                            that.offset = 20;
                            Vue.nextTick(function () {
                                setImgWidht()
                                setPosition()
                            })
                        }
                    })
                },
                splitAtUser: function (str) {
                    var exg = /\[図舙\:\/\/((?!\s{2}\]).)+\s{2}\]/gi, that = this;
                    var sy = str.replace(exg, function (word) {
                        var exgg = /\[図舙\:\/\/|\s{2}\]/gi;
                        var uname = word.split(exgg);
                        console.log("uname", uname)
                        var uuid = uname[1].substring(0, uname[1].indexOf(",")).toString();
                        var name = uname[1].substring(uname[1].indexOf(",") + 1);
                        console.log("uuidName==", uuid, name);
                        var s = '<a data-uuid="' + uuid + '" style="color:#a922ff" onclick=\'personPage("' + uuid + '")\'>' + name + '</a>';
                        return s;
                    })
                    return sy
                },
                getAppURLData: function (urlObj) {
                    var that = this;
                    that.items = [];
                    var u = "http://192.168.5.105:80/v1/news/guest/newsfeed/html?id=24",
                        uu = "http://192.168.5.105/comment/guest/loadcomment?count=2&postid=19&offset=0&uuid=1493048811581296819";
                    request(urlObj.htmlurl, function (data) {
                        console.log("data", data)
                        that.context = data;
                        var content = data;
                        var img = new Image();
                        if (content != "") {
                            if (content.indexOf("<img") != -1) {
                              content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
                                    console.log("match,capture",match,capture);
                                    that.contentImg.push({src: capture});
                                    //return '<img data-lazy="'+capture+'">';
                                })
                            }
                        }
                        console.log("img==", that.contentImg);
                        Vue.nextTick(function () {
                            $("#content img").each(function (index, _this) {
                                console.log(_this)
                                $(_this).click(function () {
                                    that.imageList = that.contentImg;
                                    var jsStr = JSON.stringify(that.imageList);
                                    if (jugePhoneType() == 1) {
                                        blemobi.jumpToShowImgPage("http://192.168.7.207:82/showImg.html", jsStr, index);
                                    } else {
                                        setupWebViewJavascriptBridge(function (bridge) {
                                            bridge.callHandler('jumpToShowImgPage', {
                                                "url": "http://192.168.7.207:82/showImg.html",
                                                "images": jsStr,
                                                "index": index
                                            }, function (response) {
                                            })
                                        })
                                    }

                                })
                            })
                        })
                    })
                    var hotURL = configIP() + "/comment/guest/loadcomment?count=20&offset=0&sort=3&" + urlObj.comment;
                    request(hotURL, function (data) {
                        if (data.comments && data.comments.length > 0) {
                            that.hotItems = data.comments;
                            Vue.nextTick(function () {
                                setImgWidht()
                                setPosition()
                            })
                        }
                    })
                    var comURL = configIP() + "/comment/guest/loadcomment?count=20&offset=0&" + urlObj.comment;
                    request(comURL, function (data) {
                        console.log("data", data)
                        if (data.comments && data.comments.length > 0) {
                            that.items = data.comments;
                            that.offset = 20;
                            Vue.nextTick(function () {
                                setImgWidht()
                                setPosition()
                            })
                        }
                    })
                    /**
                     *@note   获取点赞的用户列表,游客模式
                     *@path   /v1/news/guest/vote/users
                     *@method GET
                     *@param  id      帖子ID
                     *@param  offset  偏移, 为上次返回的数目.默认0
                     *@param  count   每次查询条数, 默认10, 最大50
                     *@return  成功返回 PNewsVoteUserList,失败返回PResult
                     */
                    var voteURL = configIP() + "/v1/news/guest/vote/users?offset=0&count=6&id=" + urlObj.postid;
                    request(voteURL, function (data) {
                        console.log("data==", data);
                        if (data.list) {
                            that.voteSum = data.total;
                            that.voteData = data.list;
                        }
                    })
                    $("#cover").click(function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (e.target !== "download") {
                            if (jugePhoneType() == 1) {
                                blemobi.hidePic();
                            } else {
                                setupWebViewJavascriptBridge(function (bridge) {
                                    bridge.callHandler('hidePic', {}, function (response) {
                                    })
                                })
                            }
                            $("body").css("overflow", "auto");
                            $("#cover").css("display", "none");
                        }
                    })
                },
                tools: function () {
                    javascript:(function () {
                        var script = document.createElement('script');
                        script.src = "http://eruda.liriliri.io/eruda.min.js";
                        document.body.appendChild(script);
                        script.onload = function () {
                            eruda.init()
                        }
                    })();
                },
                jumpToVotedList: function () {
                    if (jugePhoneType() == 1) {
                        blemobi.sendJumpToVoted()
                    } else {
                        setupWebViewJavascriptBridge(function (bridge) {
                            bridge.callHandler('sendJumpToVoted', {}, function (response) {

                            })
                        })
                    }
                },
                popShowImg: function () {
                    var index = this.currentImgIndex;
                    $('body').css({"height": "100%", "overflow": "hidden"});
                    $("#cover").css("display", "flex");
                    Vue.nextTick(function () {
                        that.swiper = new Swiper('.swiper-container', {
                            initialSlide: index
                        });
                    })
                },
                jumpSubCom: function (id,index) {
                    if (jugePhoneType() == 1) {
                        blemobi.jumpSecondComment(id,index);
                    } else {
                        setupWebViewJavascriptBridge(function (bridge) {
                              bridge.callHandler('jumpSecondComment', {id: id,index:index}, function (response) {
                            })
                        })
                    }
                },
                sendClosePicToWeb11: function () {
                    $("body").css("overflow", "auto");
                    $("#cover").css("display", "none");
                },
                sendClosePicToWeb: function () {
                    $("body").css("overflow", "auto");
                    $("#cover").css("display", "none");
                },
                setLevel: function (level) {
                    switch (level) {
                        case 0:
                            return "level0"
                        case 1:
                            return "level1"
                        case 2:
                            return "level2"
                        case 3:
                            return "level3"
                    }
                },
                downloadImg: function (src, e) {
                    e.stopPropagation();
                    if (jugePhoneType() == 1) {
                        blemobi.downloadPic(src);
                    } else {
                        setupWebViewJavascriptBridge(function (bridge) {
                            bridge.callHandler('downloadPic', src, function (response) {
                            })
                        })
                    }
                },
                likeComment: function (e, list, index, hot) {
                    var e = event || window.event;
                    e.stopPropagation();
                    this.dis = !this.dis;
                    this.hot = hot;
                    var v = 1, that = this;
                    if (list.vote == 1) {
                        v = 0;
                    }
                    console.log("list", list.vote, v);
                    if (jugePhoneType() == 1) {
                        blemobi.clickVoted(list.id.toString(), v.toString(), index.toString());
                    } else {
                        setupWebViewJavascriptBridge(function (bridge) {
                            bridge.callHandler('clickVoted', {id: list.id, vote: v, index: index}, function (resp) {
                                var res = resp.split(",")
                                that.votedSuccess(res[0], res[1], res[2]);
                            })
                        })
                    }

                },
                votedSuccess: function (id, vote, index) {  //app点赞成功后掉web端的函数
                    var key = parseInt(index), lenHot = this.hotItems.length, hotItems = this.hotItems,
                        len = this.items.length, items = this.items;
                    console.log("this.items==", this.items);
                    console.log("this.items==", items, hotItems);
                    console.log("this.items==", this.hot);
                    if (this.hot == 1) {
                        var hotlist = this.hotItems[key];
                        for (var i = 0; i < len; i++) {
                            if (items[i].id == id) {
                                break;
                            }
                        }
                        var list = this.items[i];
                    } else {
                        var list = this.items[key];
                        for (var i = 0; i < lenHot; i++) {
                            if (hotItems[i].id == id) {
                                break;
                            }
                        }
                        var hotlist = this.hotItems[i];
                    }
                    if (vote == 0) {
                        list.vote = 0;
                        list.upvotes = list.upvotes - 1;
                        hotlist.vote = 0;
                        hotlist.upvotes = hotlist.upvotes - 1;
                    } else {
                        list.vote = 1;
                        list.upvotes = list.upvotes + 1;
                        hotlist.vote = 1;
                        hotlist.upvotes = hotlist.upvotes + 1;
                    }

                },
                getCommentID: function (id) {
                    var that = this;
                    /*
                     *@note 按评论ID查询评论详情
                     *@path /v1.7/comment/guest/detail
                     *@method GET
                     *@param id 1级评论ID或2级评论ID
                     *@param uuid 用户uuid
                     *@return 成功返回PCommentExt,失败返回PResult
                     */
                    var url = configIP()+ "/v1.7/comment/guest/detail?id=" + id + "&uuid=" + that.uuid;
                    request(url, function (data){
                        if (data&&!data.code) {
                            that.items.splice(0,0,data);
                            Vue.nextTick(function(){
                                setImgWidht();
                            })

                            console.log(data)
                        }
                    })
                },
                updataComment: function (id,index) {
                    var that = this;
                    console.log("id==",id);
                    console.log("index==",index)
                    /*
                     *@note 按评论ID查询评论详情
                     *@path /v1.7/comment/guest/detail
                     *@method GET
                     *@param id 1级评论ID或2级评论ID
                     *@param uuid 用户uuid
                     *@return 成功返回PCommentExt,失败返回PResult
                     */
                    var url = configIP()+ "/v1.7/comment/guest/detail?id=" + id + "&uuid=" + that.uuid;
                    request(url, function (data){
                        if (data) {
                            for(var i=0;i<that.hotItems.length;i++){
                                if(that.hotItems[i].id==id){
                                    that.hotItems.splice(i,1,data);
                                }
                            }
                            for(var i=0;i<that.items.length;i++){
                                if(that.items[i].id==id){
                                    that.items.splice(i,1,data);
                                    console.log("that.items==")
                                }
                            }
                        }
                    })
                },
                votedNewsSuccess: function(objURL){
                    var uuid=this.uuid;
                    if(jugePhoneType()==1) {
                        var objApp= blemobi.getVotedHeadImg();
                        var obj=JSON.parse(objApp);
                    }else{
                        obj=JSON.parse(objURL)
                    }
                    if(obj.type==1){
                        this.voteData.push({user:
                                 {
                                    HeadImgURL: obj.headUrl,
                                    Level: obj.level,
                                    UUID:uuid,
                                  }
                         });
                        this.voteSum=this.voteSum+1;
                    }else{
                        this.voteSum=this.voteSum-1;
                        var len=this.voteData.length,voteData=this.voteData;
                        for(var i=0;i<len;i++){
                            if(voteData[i].user.UUID==uuid){
                                console.log("uuid==",uuid,voteData[i].user.UUID);
                                this.voteData.splice(i,1);
                                break;
                            }
                        }
                    }
                },
                showImg:function(e, index){
                    e.stopPropagation();
                    var that=this
                    that.imageList=[];
                    var img= $(e.currentTarget).parent().find("img");
                    for(var i=0; i<img.length; i++){
                        that.imageList.push({src:$(img[i]).attr("src")}) ;
                    }
                    var jsStr=JSON.stringify(that.imageList);
                    if(jugePhoneType()==1) {
                        blemobi.jumpToShowImgPage("http://192.168.7.207:82/showImg.html", jsStr, index);
                    }
                    else{
                        setupWebViewJavascriptBridge(function(bridge) {
                            bridge.callHandler('jumpToShowImgPage',{
                                    "url": "http://192.168.7.207:82/showImg.html",
                                    "images":jsStr,
                                    "index":index
                                },
                                function(response) {
                                })
                        })
                    }
                },
                address: function(p){
                    if(p== ""){
                        return "暂无地址"
                    }
                    return p;
                },
                loadMoreCom:function(){
                    var that=this;
                    var
//                           comURL="http://192.168.5.105/comment/guest/loadcomment?count=20&postid="+urlObj.postid+"&uuid="+urlObj.uuid+"&offset="+that.offset,
                        uu="http://192.168.5.105/comment/guest/loadcomment?count=2&postid=19&offset=0&uuid=1493048811581296819",
                        url= "http://192.168.5.105/comment/guest/loadcomment?count=2&offset=0&sort="+that.sortComment.sort+that.comment;
                    //uu1="http://192.168.5.105/comment/guest/loadcomment?count=2&offset=0&uuid=1493051392875521593&postid=36";
                    request(url,function(data){
                            Tips(
                                data.comments.length);
                            if(data&&data.comments){
                                console.log("data==",data);
                                if(!
                                        that.items){
                                    that.items=[];
                                    console.log(that.items)
                                }
                                that.items=that.items.concat(data.comments);
                                Vue.nextTick(function(){
                                    setImgWidht();
                                })
                                that.offset=that.offset+2;
                            }
                        }
                    )
                },
                beforeTime:function(publicTime){
                    var publicTime = new Date(publicTime);
                    var
                        nowTime=Math.floor((new Date())/1000);
                    var dd=Math.floor(( nowTime-publicTime)/60);
                    var time=0;
                    var objEdit={
                        showEdit:true, time:0,
                    }
                    if(dd<1){
                        time="1分钟";
                    }
                    else if(dd>=1
                        && dd<60){
                        time=dd+"分钟";
                    }else if(dd>=60 && dd<24*60){
                        time=Math.ceil(dd/
                                60)+"小时";
                    } else if(dd >=24 * 60 && dd <= 24* 3*60)
                    {
                        time=Math.ceil(dd/(60*24))+ "天";
                        objEdit.showEdit=false
                        ;
                    } else{
                        time=new Date(publicTime*1000).toLocaleString();
                        objEdit.showEdit=false;
                    }
                    objEdit.time=time;
                    return time;
                },
                publishTime:function(publicTime){
                    var publicTime=new Date(publicTime),now=new Date();
                    var dd=Math.floor((now- publicTime)/3600000);
                    var time=0;
                    if(publicTime.toDateString()===now.toDateString()){
                        time= publicTime.getHours()+"："+ publicTime.getMinutes();
                    }else if(dd >= 1&& dd<24*365)
                    {
                        console.log("dd==",dd)
                        time=(publicTime.getMonth() + 1) + "/" + publicTime.getDate();
                    }
                    else{
                        time= publicTime.getFullYear()+"/"+ (publicTime.getMonth()+1)+"/"+publicTime.getDate();
                    }
                    return time.toLocaleString();
                },
            }
        })
         return vm;
    }
     self.showImg=function(){
         var img=new Vue({
             el:"#showImg",
             data:{
                 imageList:[],
                 curImgIndex:0,
             },
             mounted:function(){
                 var that=this,obj;
                 if(jugePhoneType()==1) {
                     var jsStr = blemobi.getImageData();
                     obj = JSON.parse(jsStr);
                     var images= JSON.parse(obj.images);
                     that.newSwiper(images,obj.index);
                 }else{
                     setupWebViewJavascriptBridge(function(bridge) {
                         bridge.callHandler('getImageData',{},function(response) {
                             var images=JSON.parse(response.images);
                             that.newSwiper(images,response.index)
                         })
                     })
                 }
                 console.log("imageList==", that.imageList, that.curImgIndex);
                 $("#showImg").click(function(){
                     if(jugePhoneType()==1) {
                         blemobi.hidePic();
                     }else{
                         setupWebViewJavascriptBridge(function(bridge) {
                             bridge.callHandler('hidePic',function(response) {
                             })
                         })
                     }
                 })
             },
             methods:{
                 newSwiper:function(images,index){
                     var that=this;
                     that.imageList=images;
                     that.curImgIndex = index;
                     Vue.nextTick(function(){
                         var swiper = new Swiper('.swiper-container',{
                             initialSlide :that.curImgIndex
                         })
                     })
                 },
                 downloadImg:function(src,e){
                     e.stopPropagation();
                     if(jugePhoneType()==1) {
                         blemobi.downloadPic(src);
                     }else{
                         setupWebViewJavascriptBridge(function(bridge) {
                             bridge.callHandler('downloadPic',src, function(response) {
                             })
                         })
                     }
                 },
             }
         })
    }
})(comment,jQuery)