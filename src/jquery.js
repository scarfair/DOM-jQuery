window.$ = window.jQuery = function(selectorOrArray){
    let elements
    if(typeof selectorOrArray==='string'){
        elements = document.querySelectorAll(selectorOrArray)
    }else if(selectorOrArray instanceof Array){
        elements = selectorOrArray
    }
    //返回对象api来操作
    //闭包：函数访问外部的变量
    const api = Object.create(jQuery.prototype)
    //相当于 const api= {__proto__: jQuery.prototype}
    // api.elements = elements
    // api.oldApi = selectorOrArray.oldApi
    Object.assign(api,{
        elements : elements,
        oldApi : selectorOrArray.oldApi
    })
    return api
        
    
}
jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    addClass(className){
        for(let i=0;i<this.elements.length;i++){
            this.elements[i].classList.add(className);
        }
        return this//返回api对象，满足链式操作
    },
    find(selector){
        let array = []
        for(let i= 0;i<this.elements.length;i++){
            array = array.concat(Array.from(this.elements[i].querySelectorAll(selector)))
        }
        array.oldApi = this;//this就是旧的api，用于实现end（）函数

        //得到新的api
        return jQuery(array);
    },
    end(){
        return this.oldApi;
    },
    each(fn){
        for(let i =0;i<this.elements.length;i++){
            fn.call(null,this.elements[i],i)
        }
        return this;
    },
    
    parent(){
        //获取每个元素的爸爸
        const array = []
        this.each(
            (node)=>{
                //重复只收录一次
                if(array.indexOf(node.parentNode)===-1)
                array.push(node.parentNode)
            }
        )
        return jQuery(array)
    },
    print(){
        console.log(this.elements)
        return this;
    },
    children(){
        const array = []
        this.each(node=>{
            array.push(...node.children)
        })
        return jQuery(array)
    },

}
