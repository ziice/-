window.addEventListener('load',function (){
    let prev = document.querySelector('.prev');
    let next = document.querySelector('.next');
    let focus = document.querySelector('.focus');
    focus.addEventListener('mouseover',function (){
        prev.style.display = 'block';
        next.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseout',function (){
        prev.style.display = 'none';
        next.style.display = 'none';
        timer = setInterval(function (){
            // 手动调用右侧按钮点击事件
            next.click();
        },2000);
    })
    let focus_img = document.querySelector('.focus_img');
    let focus_nav = focus.querySelector('ol');
    let focusWidth = focus.offsetWidth;
    for(let i = 0; i < focus_img.children.length; i++){
        let li = document.createElement('li');
        // 记录当前小圆圈索引号，通过自定义属性
        li.setAttribute('index',i);
        focus_nav.appendChild(li);
        // 小圆圈的排他思想
        li.addEventListener('click',function (){
            for (let i = 0; i < focus_nav.children.length; i++){
                focus_nav.children[i].className = '';
            }
            this.className = 'selected';
            // 点击小圆圈，移动图片
            let index = this.getAttribute('index');
            // 当我们点击了某个li 就要把这个li的索引给num
            num = index;
            // 当我们点击了某个li 就要把这个li的索引给circle
            circle = index;
            animate(focus_img,-index*focusWidth);
        })
    }
    focus_nav.children[0].className = 'selected';
    // cloneNode()true深克隆，false浅克隆，
    let first = focus_img.children[0].cloneNode(true);
    focus_img.appendChild(first);
    let num = 0;
    // circle控制小圆圈的播放
    let circle = 0;
    // 节流阀：防止轮播图按钮连续点击造成播放过快，当上一个函数动画内容执行完毕再去执行下一个函数动画，利用回调函数，添加一个变量来控制，锁住函数和解锁函数
    let flag = true; // 节流阀
    next.addEventListener('click',function (){
        if (flag){
            flag = false; // 关闭节流阀
            // 无缝滚动
            if(num === focus_img.children.length - 1){
                focus_img.style.left = 0 + 'px';
                num = 0;
            }
            num++;
            animate(focus_img,-num*focusWidth,function (){
                flag = true; // 打开节流阀
            });
            circle++;
            // 如果circle=4 说明走到最后克隆的这张照片了
            if (circle === focus_nav.children.length){
                circle = 0;
            }
            circleChange();
        }
    })
    prev.addEventListener('click',function (){
        if(flag){
            flag = false;
            // 无缝滚动
            if(num === 0){
                num = focus_img.children.length - 1;
                focus_img.style.left = - num * focusWidth +'px';
            }
            num--;
            animate(focus_img,- num * focusWidth,function (){
                flag = true;
            });
            circle--;
            // 如果circle<0 说明第一张图片，则小圆圈改为第4个小圆圈
            circle = circle < 0 ? focus_nav.children.length-1:circle;
            circleChange();
        }
    })
    function circleChange(){
        // 排他思想
        for (let i = 0; i < focus_nav.children.length; i++){
            focus_nav.children[i].className = '';
        }
        focus_nav.children[circle].className = 'selected';
    }
    let timer = setInterval(function (){
        // 手动调用右侧按钮点击事件
        next.click();
    },2000);
    $(function (){
        // 当点击li，不需要执行页面滚动事件里的li的背景选择，添加current
        // 节流阀、互斥锁
        let flag = true;
        $(window).scroll(function (){
            if($(document).scrollTop() >= $('.funny_block').offset().top){
                $('.fixedtool').fadeIn();
            }else{
                $('.fixedtool').fadeOut();
            }
            if(flag === true){
                $('.floor .w').each(function (i,ele){
                    if($(document).scrollTop() >= $(ele).offset().top){
                        $('.fixedtool li').eq(i).addClass('current').siblings().removeClass('current');
                    }
                })
                if($(document).scrollTop() >= $('.hot').offset().top){
                    $('.fixedtool li').eq(3).addClass('current').siblings().removeClass('current');
                }
            }
        })
        $('.fixedtool li').click(function (){
            flag = false;
            index = $(this).index();
            if(index < $(this).parent().children().length-1){
                let current = $('.floor .w').eq(index).offset().top;
                $('body,html').stop().animate({
                    scrollTop:current
                },function (){
                    flag = true;
                })
            }
            if(index === $(this).parent().children().length-1){
                let current2 = $('.hot').offset().top;
                $('body,html').stop().animate({
                    scrollTop:current2
                },function (){
                    flag = true;
                })
            }
            $(this).addClass('current').siblings().removeClass('current');
        })
    })
})