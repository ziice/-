function animate(obj,target,callback){
    clearInterval(obj.timer);
    obj.timer = setInterval(function (){ // 添加属性，节省开辟timer空间
        if(obj.offsetLeft === target){
            clearInterval(obj.timer);
            // if(callback){
            //     callback();
            // }
            callback && callback();
        }
        // 动画：缓动效果：（目标值-现在的位置）/10 作为每次移动的距离
        let step = (target-obj.offsetLeft)/10;
        step = step>0? Math.ceil(step): Math.floor(step)
        obj.style.left = obj.offsetLeft + step + 'px';
    },15)
}