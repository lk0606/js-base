Function.prototype.before = function( beforefn ){
    var __self = this; // 保存原函数的引用
    return function(){ // 返回包含了原函数和新函数的"代理"函数
      beforefn.apply( this, arguments ); // 执行新函数，修正this
      return __self.apply( this, arguments ); // 执行原函数
    }
  };
Function.prototype.after = function( afterfn ){
    var __self = this;
    return function(){
        var ret = __self.apply( this, arguments );
        afterfn.apply( this, arguments );
        return ret;
    }
};
var func = function(){
    console.log( 2 );
};
var fn = func
    .before(function(){
        console.log( 1 );
    })
    .before(function(){
        console.log( 11 );
    })
    .before(function(){
        console.log( 111 );
    })
    .after(function(){
        console.log( 3 );
    })
    .after(function(){
        console.log( 33 );
    })
    .after(function(){
        console.log( 333 );
    })
    .before(function(){
        console.log( 1114 );
    })
fn()
