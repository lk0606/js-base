// class Parent {
//     constructor(options) {
//         this.options = options
//       	this._t = 't'
//     }
//   	eat() {
// 		return 'eat'
// 	}
//   	static t1() {
//       return 1
// 	}
  
//   	t2() {
//       return 1
// 	}
// }

// class Child extends Parent {
//  	constructor(props) {
//       	super(props)
    
// 	}
// }



"use strict";

function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
    return function () {
        var Super = _getPrototypeOf(Derived),
            result;
        if (_isNativeReflectConstruct()) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget); // Reflect.construct 对函数进行 new 操作
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}

function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}

function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
        return true;
    } catch (e) {
        return false;
    }
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}

function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

var Parent = /*#__PURE__*/ function () {
    function Parent(options) {
        _classCallCheck(this, Parent);

        this.options = options;
        this._t = 't';
    }

    _createClass(Parent, [{
        key: "eat",
        value: function eat() {
            return 'eat';
        }
    }, {
        key: "t2",
        value: function t2() {
            return 1;
        }
    }], [{
        key: "t1",
        value: function t1() {
            return 1;
        }
    }]);

    return Parent;
}();

var Child = /*#__PURE__*/ function (_Parent) {
    _inherits(Child, _Parent);

    var _super = _createSuper(Child);

    function Child(props) {
        _classCallCheck(this, Child);

        return _super.call(this, props);
    }

    return Child;
}(Parent);

var p = new Parent({
    name: 'parent'
});
var c = new Child({
    name: 'child'
});
console.log(p, c, 'p, c')
console.log(Object.getPrototypeOf(p))
console.log(Object.getPrototypeOf(c))