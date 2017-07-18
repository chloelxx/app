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
function foridden() {
    document.documentElement.style.webkitTouchCallout = "none"; //禁止弹出菜单
    document.documentElement.style.webkitUserSelect = "none";//禁止选中
}
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
function personPage(uuid,that){
    event.stopPropagation();
    console.log(uuid);
    clearTimeout(that.clearTime);
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
    }else if(url=="192.168.7.207:82"){
        return "http://192.168.5.105";
    }else{
        return "http://sep.miwutech.com"
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

        var w2=$(".thumbnailHidden").css("width");
        $(".thumbnailHidden").css("height",w2);
        /*   var twoImg=$("#hot .twoImg");
        for(var i=0;i<twoImg.length;i++){
            var img=$(twoImg[i]).children("img");
            var imgw=  $(img[0]).attr("width");
            var imgh=  $(img[0]).attr("height");
            console.log("imgw1,imgh1==",imgw,imgh);
            if(imgw<imgh){
                $(img[0]).css("width",w1).css("height","auto");
            }else{
                $(img[0]).css("height",w1).css("width","auto");
            }
        }
        var twoImg1=$("#all .twoImg");
        for(var i=0;i<twoImg1.length;i++){
            var img1=$(twoImg1[i]).children("img");
            console.log($(img1[0]))
            var imgw1=  $(img1[0]).attr("width");
            var imgh1=  $(img1[0]).attr("height");
            console.log("imgw1,imgh1==",imgw1,imgh1)
            if(imgw1<imgh1){
                $(img1[0]).css("width",w1).css("height","auto");
            }else{
                $(img1[0]).css("height",w1).css("width","auto");
            }
        }


        var w2=$(".thumbnailHidden").css("width");
        $(".thumbnailHidden").css("height",w2);

        var th=$("#hot .thumbnailHidden");
        for(var i=0;i<th.length;i++){
            var thimg=$(th[i]).children("img");
            var thw=  $(thimg[0]).attr("width");
            var thh=  $(thimg[0]).attr("height");
            console.log("imgw1,imgh1==",thw,thh)
            if(thw<thh){
                $(thimg[0]).css("width",w2).css("height","auto");
            }else{
                $(thimg[0]).css("height",w2).css("width","auto");
            }
        }

        var th1=$("#all .thumbnailHidden");
        for(var i=0;i<th1.length;i++){
            var thimg1=$(th1[i]).children("img");
            var thw1=  $(thimg1[0]).attr("width");
            var thh1=  $(thimg1[0]).attr("height");
            console.log("imgw1,imgh1==",thw1,thh1)
            if(thw1<thh1){
                $(thimg1[0]).css("width",w2).css("height","auto");
            }else{
                $(thimg1[0]).css("height",w2).css("width","auto");
            }
        }
*/
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
                clearTime:null,
                action:null,
                isPlay:false,
                allCommentSum:0,
                firsttime:0,
                lasttime:0,
                longPress:true,
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
                    var sum=blemobi.getAppVoteData();
                    console.log("sum==",sum)
                    this.allCommentSum=parseInt(sum);
                } else {
                    setupWebViewJavascriptBridge(function (bridge) {
                        bridge.callHandler('getFrameUrl', {}, function (response) {
                            var parseURL = parseAppURL(response,that);
                            that.getAppURLData(parseURL);
                            that.uuid = parseURL.uuid;
                        })
                        bridge.callHandler('getAppVoteData', {}, function (data) {
                            that.allCommentSum=data;
                        })
                        bridge.registerHandler('comment.vm.votedNewsSuccess', function (data, votedNewsSuccess) {
                            that.votedNewsSuccess(data);
                        })
                        bridge.registerHandler('comment.vm.getCommentID', function (data, getCommentID) {
                            that.getCommentID(data);
                        })
                        bridge.registerHandler("comment.vm.updataComment", function (data, updataComment) {
                            alert(data);
                            that.updataComment(data.id,data.index);
                        })
                        bridge.registerHandler("comment.vm.stopPlay", function (data, stopPlay) {
                            alert(data);
                            that.stopPlay();
                        })
                    })
                }
                var vid=$("video");
                for(var i=0;i<vid.length;i++){
                    console.log("video");
                    $(vid[i])[0].pause();
                }
            },
            methods: {
                stopPlay:function(){
                    var aud= $("audio"),vid=$("video");
                    for(var i=0;i<aud.length;i++){
                        $(aud[i])[0].pause();
                    }
                },
                sortCom:function(){
                    var that=this;
                    var sort=this.sortComment.sort;
                    if(sort==1) {
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
                                if(data.comments.length!=20){
                                    $("#loadMore").html("已加载全部");
                                }
                               // setPosition()
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
                        var s = '<a data-uuid="' + uuid + '" style="color:#a922ff" onclick=\'comment.vm.personPage("' + uuid + '")\'>' + name + '</a>';
                        return s;
                    })
                    return sy
                },
                personPage :function(uuid){
                     var that=this;
                     event.stopPropagation();
                     console.log(uuid);
                     clearTimeout(that.clearTime);
                     if(jugePhoneType()==1) {
                         blemobi.jumpPersonInfo(uuid.toString())
                     }else{
                         setupWebViewJavascriptBridge(function(bridge) {
                             bridge.callHandler('jumpPersonInfo',{uuid:uuid}, function(response) {

                             })
                         })
                     }
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
                           var vid= $("#content video");
                            console.log("vid",vid);
                            for(var i=0;i<vid.length;i++){
                                console.log(i)
                                $(vid[i])[0].pause();
                            }
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
                                //setPosition()
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
                                if(data.comments.length!=20){
                                    $("#loadMore").html("已加载全部");
                                }
                                //setPosition()
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
                deleteComment11:function(list,index,flag){
                    console.log("isosssss")
                    window.ontouchstart = function(e) { e.preventDefault(); };
                    var e=event||window.event;
                    e.stopPropagation();
                    var that=this;
                    /*if(list.author.UUID!==this.uuid){
                        return;
                    }*/
                    that.firsttime=new Date();
                   /* alert(111);
                    if (jugePhoneType() == 1) {
                        blemobi.sendDeleteMsgToApp(list.id, index, isHot.toString());
                    } else {
                        setupWebViewJavascriptBridge(function (bridge) {
                            alert("ios");
                            console.log("ggg");
                            bridge.callHandler('sendDeleteMsgToApp', {id: list.id, index: index, isHot: isHot}, function (res) {
                                that.deleteSuccess(res.id, res.index, res.isHot)
                            })
                        })
                    }*/
                },
                deleteComment12:function(list,index,flag){
                    var e=event||window.event;
                    e.stopPropagation();
                    var that=this;
                    /*if(list.author.UUID!==this.uuid){
                     return;
                     }*/
                    that.lasttime=new Date();
                    var dd=that.lasttime-that.firsttime;
                    alert(111);
                    alert(dd);
                    if(dd>=200&&dd<=5000) {
                        if (jugePhoneType() == 1) {
                            blemobi.sendDeleteMsgToApp(list.id, index, isHot.toString());
                        } else {
                            setupWebViewJavascriptBridge(function (bridge) {
                                alert("ios");
                                bridge.callHandler('sendDeleteMsgToApp', {
                                    id: list.id,
                                    index: index,
                                    isHot: isHot
                                }, function (res) {
                                    that.deleteSuccess(res.id, res.index, res.isHot)
                                })
                            })
                        }
                    }
                },
                deleteComment:function(list,index,isHot){
                    var that=this;
                    if(list.author.UUID!==this.uuid){
                        return;
                    }
                    var e=event||window.event;
                    e.stopPropagation();
                    e.preventDefault();
                    console.log("dddjjj");
                    alert(222221);
                    that.longPress=false;
                    console.log("e==",e);
                   //this.clearTime=setTimeout(function(){
                        if (jugePhoneType() == 1) {
                            blemobi.sendDeleteMsgToApp(list.id, index, isHot.toString());
                        } else {
                            setupWebViewJavascriptBridge(function (bridge) {
                                alert("ios");
                                bridge.callHandler('sendDeleteMsgToApp', {id: list.id, index: index, isHot: isHot}, function (res) {
                                    that.deleteSuccess(res.id, res.index, res.isHot)
                                })
                            })
                        }
                   //},300)
                },
                deleteSuccess:function(id,index,isHot){
                    var that=this;
                    console.log("index==",index,id,isHot);
                    if(isHot==1){
                        for(var i=0;i<that.items.length;i++){
                            if(that.items[i].id==id){
                                that.items.splice(i,1);
                                break;
                            }
                        }
                        that.hotItems.splice(index,1);
                    }else{
                        for(var i=0;i<that.hotItems.length;i++){
                            if(that.hotItems[i].id==id){
                                that.hotItems.splice(i,1);
                                break;
                            }
                        }
                        that.items.splice(index,1);
                    }
                    that.allCommentSum=that.allCommentSum-1;
                    that.longPress=true;
                    Vue.nextTick(function(){
                        setImgWidht();
                    })
                },
                jumpSubCom: function (id,index) {
                    var e=event||window.event,that=this;
                    e.stopPropagation();
                    clearTimeout(this.clearTime);
                    if(that.longPress) {
                        if (jugePhoneType() == 1) {
                            blemobi.jumpSecondComment(id, index);
                        } else {
                            setupWebViewJavascriptBridge(function (bridge) {
                                bridge.callHandler('jumpSecondComment', {id: id, index: index}, function (response) {
                                })
                            })
                        }
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
                    var arr=["level0","level1","level2","level3"];
                    return arr[level];
                },
                setLevelColor:function(lv){
                    var arr=["colorLv0","colorLv1","colorLv2","colorLv3"];
                    return arr[lv];
                },
                jumpToPearsonPage:function(uuid,e){
                    e.stopPropagation();
                    clearTimeout(this.clearTime);
                    if (jugePhoneType() == 1) {
                        blemobi.jumpPersonInfo(uuid);
                    } else {
                        setupWebViewJavascriptBridge(function (bridge) {
                            bridge.callHandler('jumpPersonInfo',{uuid:uuid}, function (response) {
                            })
                        })
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
                    clearTimeout(this.clearTime);
                    this.dis = !this.dis;
                    this.hot = hot;
                    var v = 1, that = this;
                    if (list.vote == 1) {
                        v = 0;
                    }
                    console.log("list", list,list.vote, v);
                    if (jugePhoneType() == 1) {
                        console.log("list phone",list.id)
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
                    var key = parseInt(index), lenHot = this.hotItems.length,
                        len = this.items.length;
                    console.log("this.items==", this.items);
                    console.log("this.items==", this.hotItems);
                    /* console.log("this.items==", this.hot);*/
                    if (this.hot == 1) {
                        console.log("111333")
                        var hotlist = this.hotItems[key];
                        for (var i = 0; i < len; i++) {
                            if (this.items[i].id == id) {
                                break;
                            }
                        }
                        var list = this.items[i];
                    } else {
                        console.log("22222233")
                        var list = this.items[key];
                        for (var i = 0; i < lenHot; i++) {
                            if (this.hotItems[i].id == id) {
                                break;
                            }
                        }
                        var hotlist = this.hotItems[i];
                    }
                    if (vote == 0) {
                        console.log("vote==",vote);
                        if(this.items.length>0) {
                            list.vote = 0;
                            list.upvotes = list.upvotes - 1;
                        }
                        if(this.hotItems.length>0) {
                            hotlist.vote = 0;
                            hotlist.upvotes = hotlist.upvotes - 1;
                        }
                    } else {
                        console.log("vote==",vote);
                        if(this.items.length>0) {
                            list.vote = 1;
                            list.upvotes = list.upvotes + 1;
                        }
                        if(this.hotItems.length>0) {
                            hotlist.vote = 1;
                            hotlist.upvotes = hotlist.upvotes + 1;
                        }
                    }
                },
                getCommentID: function (id) {  //插入评论
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
                            if(that.sortComment.sort==1&&that.items.length<20){
                                var len=that.items.length;
                                that.items.splice(len,0,data);
                            }else{
                                that.items.splice(0, 0, data);
                            }
                            that.allCommentSum=that.allCommentSum+1;
                            Vue.nextTick(function(){
                                 setImgWidht();
                            })
                        }
                    })
                },
                playAudio:function(size, e,list){
                    e.stopPropagation();
                    clearTimeout(this.clearTime)
                    var aud= $(e.currentTarget).prev();
                    console.log("swss=",$(e.currentTarget).prev());
                    var a=["audio0","audio1","audio2","audio3"];
                    var arr=["0px -94px","-36px -94px","-73px -94px","-108px -94px"];
                    var i= 0,that=this;
                    var icon= $(e.currentTarget).find(".iconImg");
                    console.log("iconImg=",icon,list);
                    var action=null;
                    that.isPlay=!that.isPlay; //true为播放，false为暂停
                    if(that.isPlay||!list.isPlay){
                        var audios=$("audio");
                        for(var a=0;a<audios.length;a++){
                            $(audios[a])[0].pause();
                            $(audios[a]).next().find(".iconImg").css("backgroundPosition",arr[0]);
                        }
                        $(aud)[0].play();
                        Vue.set(list,"isPlay",true);
                        console.log("list==",list);
                        action= setInterval(function(){
                           // $(icon).removeClass("audio0");
                            console.log("iconImg=", $(icon).removeClass("audio0"));
                            console.log("arrr==",arr[(i+1)%4]);
                            var src=arr[(i+1)%4];
                            $(icon).css("backgroundPosition",src);
                            console.log(aud[0].currentTime,size);
                            i++;
                            if(aud[0].currentTime*1000<size*1000&&that.isPlay){

                            }else if(aud[0].currentTime*1000>=size*1000){
                                clearInterval(action);
                                Vue.set(list,"isPlay",false);
                                $(icon).css("backgroundPosition",arr[0]);
                                aud[0].currentTime=0;
                                aud[0].pause();
                            }else{
                                that.isPlay=!that.isPlay;
                                clearInterval(action);
                                Vue.set(list,"isPlay",false);
                                aud[0].pause();
                            }
                        },500)
                    }else{
                        Vue.set(list,"isPlay",false);
                        //var src=arr[0];
                        clearInterval(action);
                        //$(icon).css("backgroundPosition",src);
                        aud[0].pause();
                    }
                },
                updataComment: function (id,index) {   //更新评论
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
                            var obj= $.extend({},data);
                            var obj1= $.extend({},data);
                            for(var i=0;i<that.hotItems.length;i++){
                                if(that.hotItems[i].id==id){
                                    that.hotItems.splice(i,1,obj);
                                }
                            }
                            for(var i=0;i<that.items.length;i++){
                                if(that.items[i].id==id){
                                    that.items.splice(i,1,obj1);
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
                        this.voteData.splice(0,0, {user:{
                                    HeadImgURL: obj.headUrl,
                                    Level: obj.level,
                                    UUID:uuid,
                                  }});
                        this.voteSum=this.voteSum+1;
                    }else{
                        this.voteSum=this.voteSum-1;
                        var len=this.voteData.length,voteData=this.voteData;
                        for(var i=0;i<len;i++){
                            if(voteData[i].user.UUID==uuid){
                                this.voteData.splice(i,1);
                                break;
                            }
                        }
                    }
                },
                showImg:function(e, index){
                    e.stopPropagation();
                    var that=this
                    clearTimeout(that.clearTime);
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
                        url= "http://192.168.5.105/comment/guest/loadcomment?count=20&offset="+that.offset+"&sort="+that.sortComment.sort+"&"+that.comment;
                    //uu1="http://192.168.5.105/comment/guest/loadcomment?count=2&offset=0&uuid=1493051392875521593&postid=36";
                    request(url,function(data){
                            if(data&&data.comments){
                                console.log("data==",data);
                                if(!that.items){
                                    that.items=[];
                                    console.log(that.items)
                                }
                                that.items=that.items.concat(data.comments);
                                Vue.nextTick(function(){
                                    setImgWidht();
                                    if(data.comments.length!=20){
                                        console.log("dddd")
                                        $("#loadMore").html("已加载全部");
                                    }
                                })
                                that.offset=that.offset+20;
                            }
                        }
                    )
                },
                beforeTime:function(publicTime){
                    var publicTime = new Date(publicTime);
                    var nowTime=new Date();
                    var dd=Math.floor(( nowTime-publicTime)/60000);
                    var time=0;
                    if(dd==0){
                        time="刚刚"
                    }
                    else if(dd>0 && dd<60){
                        time=dd+"分钟前";
                    }else if(dd>=60 && dd<24*60){
                        time=Math.ceil(dd/60)+"小时前";
                    } else if(dd >=24 * 60 && dd <= 24* 7*60) {
                        time=Math.ceil(dd/(60*24))+ "天前";
                    } else{
                       if(publicTime.getFullYear()==nowTime.getFullYear()){
                           time=(publicTime.getMonth() + 1) + "/" + publicTime.getDate();
                       }else{
                           time= publicTime.getFullYear()+"/"+ (publicTime.getMonth()+1)+"/"+publicTime.getDate();
                       }
                    }
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