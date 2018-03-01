/**
 * Created by Administrator on 2018/3/1.
 */
;(function (window) {
    var Interval;//定时器
    var _start = function (that) {
        Interval = setInterval(function () {
            if (that.ImgListLength===that.index||that.ImgListLength<that.index){
                that.index=0
            }else {
                that.index++
            }
            that.fadIn(that.index)
        },that.time)
    };
    var _bind = function (that) {
        var htmlContent = '';
        htmlContent +=
            '<div>';
        for (var i=0;i<that.ImgListLength;i++){
            htmlContent +=
                '<div class="t-Carousel-content">'+
                '<img class="t-Carousel-img" src="'+this.ImgList[i]+'" alt="">'+
                '</div>'
        }
        htmlContent +=
            '</div>'+
            '<div class="t-Carousel-Choice" style="margin-left:'+that.ChoiceDivLenght+'">';
        for (var i=0;i<that.ImgListLength;i++){
            htmlContent += '<div></div>'
        }
        htmlContent +=
            '</div>'+
            '<div class="t-Carousel-left">'+
            '<svg class="icon" width="40px" height="40px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#dbdbdb" d="M670.977781 808.954249c-5.300726 0-10.596336-2.045589-14.603603-6.126534L368.69006 509.86743c-7.818059-7.961322-7.818059-20.717857 0-28.67918l287.684118-292.960285c7.92039-8.065699 20.877493-8.182356 28.942169-0.26299 8.065699 7.919367 8.182356 20.877493 0.264013 28.942169L411.976936 495.526817l273.603425 278.620695c7.918343 8.064676 7.801686 21.022803-0.264013 28.942169C681.331593 807.002804 676.153664 808.954249 670.977781 808.954249z" /></svg>'+
            '</div>'+
            '<div class="t-Carousel-right">'+
            '<svg class="icon" width="40px" height="40px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#dbdbdb" d="M383.291616 808.954249c-5.175883 0-10.353812-1.950422-14.338566-5.862521-8.064676-7.919367-8.182356-20.877493-0.26299-28.942169l273.602402-278.620695L368.69006 216.907145c-7.919367-8.064676-7.801686-21.022803 0.26299-28.942169 8.065699-7.918343 21.022803-7.80271 28.942169 0.26299l287.685141 292.960285c7.818059 7.961322 7.818059 20.717857 0 28.67918L397.895219 802.826692C393.887952 806.907637 388.591319 808.954249 383.291616 808.954249z" /></svg>'+
            '</div>';
        $(that.ContentDOM).html(htmlContent);//插入dom
        _start(that)
    };
    var _bindDom = function (that) {
        $(that.DomComtentImg).hover(function () {//绑定DOM
            that.fadIn(that.index);
            clearInterval(Interval)
        },function () {
            _start(that)
        });
        $(that.DomCarouselLeft).hover(function () {//绑定DOM
            clearInterval(Interval)
        });
        $(that.DomCarouselLeft).click(function () {//绑定DOM
            if (that.index===0||that.index<0){
                that.index = that.ImgListLength-1
            }else {
                --that.index
            }
            that.fadIn(that.index)
        });
        $(that.DomCarouselRight).hover(function () {//绑定DOM
            clearInterval(Interval)
        });
        $(that.DomCarouselRight).click(function () {//绑定DOM
            console.log(that.ImgListLength)
            if (that.ImgListLength<that.index||that.ImgListLength-1===that.index){
                that.index = 0
            }else {
                ++that.index
            }
            console.log(that.index)
            that.fadIn(that.index)
        });
        $(that.DomChoice).hover(function () {
            that.fadIn($(that.DomChoice).index(this))
            clearInterval(Interval)
        })
    };
    function Carousel(options) {
        this.time = options.time || 3000;
        this.index = 0;
        this.ImgListLength = options.ImgList.length; //长度
        this.ImgList = options.ImgList; //图片数据 （必填）
        this.ContentDOM = options.id;//容器DOM （必填）
        this.DomComtentImg = '.t-Carousel-content';//img容器DOM
        this.DomChoice = '.t-Carousel-Choice div';//下面圆圈
        this.ChoiceDivLenght = '-' + this.ImgListLength*17.55/2 + 'px';//圆圈的总长度为了适应居中
        this.DomCarouselLeft = '.t-Carousel-left';//向左
        this.DomCarouselRight = '.t-Carousel-right';//向右
        _bind(this);
        _bindDom(this)
    }
    Carousel.prototype.init = function () {
    };
    Carousel.prototype.fadIn = function (index) {
        $(this.DomComtentImg).eq(index).fadeIn().siblings().fadeOut()
    };
    window.Carousel = Carousel
}(window));