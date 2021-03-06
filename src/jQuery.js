window.$ = window.jQuery = function (selectorOrArray) {
    let elements
    if (typeof selectorOrArray === 'string') {
        elements = document.querySelectorAll(selectorOrArray)
    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray
    }
    const api = Object.create(jQuery.prototype)//创建一个对象，这个对象的__proto__为括号里的东西，相当于 const api = {__proto__:jQuery.prototype}
    // // api:可以操作elements的对象
    // api.elements = elements
    // api.oldApi = selectorOrArray.oldApi
    Object.assign(api, {
        elements = elements,
        oldApi = selectorOrArray.oldApi
    })// 用原型节约了内存
    return api//省去了声明api的步骤，直接返回这个对象
    // 闭包：函数访问外部变量，addClass访问了elements这个变量，去维持这个elements
    //因为刚才oldApi是加在数组的身上的，但是下面调用的时候用的是api，所以要把这个属性加在api上 


    jQuery.prototype = {
        constructor: jQuery,
        jQuery: true,
        addClass(className) {
            for (let i = 0; i < this.elements.length; i++) {
                this.elements[i].classList.add(className)
            }
            return this // 因为api没有被声明，所以这里用this很精髓
        },
        find(selector) {
            let array = []
            for (let i = 0; i < this.elements.length; i++) {
                array.push(this.element[i].querySelectorAll(selector))
            }
            array.oldApi = this // this就是api，这个this是之前的api，api1
            return jQuery(array) // 给我传什么，就会返回一个对象去操作它
        },
        end() {
            return this.oldApi // 这个this是当前的api 即数组的api，api2
        },
        each(fn) {
            for (let i = 0; i < this.elements.length; i++) {
                fn.call(null, this.elements[i], i)
            }
            return this// this就是当前的api
        },
        parent() {
            const array = []
            this.each((node) => {
                if (array.indexOf(node.parentNode) === -1) {
                    array.push(node.parentNode)
                }
            })
            return jQuery(array)//封装一个可以操作array的对象
        },
        print() {
            console.log(this.elements)//这个elements就是this所操作的东西，对应着当前api所操作的当前的elements
        },
        children() {
            const array = []
            this.each((node) => {
                if (array.indexOf(node.children) === -1) {
                    array.push(...node.children)//array.push(node.children[0],node.children[1]....)
                }
            })
            return jQuery(array)
        }
    }
}