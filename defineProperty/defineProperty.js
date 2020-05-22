
let app = {
    userInfo: null,
    _callback: []
};

let obj = app;
Object.defineProperty(obj, 'userInfo', {
    configurable: true, // 对象的属性是否可以被删除
    enumerable: true, // 对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举
    set: function (value) {
        obj._userInfo = value;
        obj._callback.forEach(elem => {
            elem(value);
        });
    },
    get: function () {
        return obj._userInfo;
    }
});

function watch(callback) {
    if (typeof callback == 'function') {
        for (let i = 0; i < app._callback.length; i++) {
            if (app._callback[i] == callback) {
                return;
            }
        }
        app._callback.push(callback);
    }
}

function unwatch(callback) {
    for (let i = 0; i < app._callback.length; i++) {
        if (app._callback[i] == callback) {
            app._callback.splice(i, 1);
            return;
        }
    }
}


function watchBack0(value) {
    console.log(`watchBack0: ${JSON.stringify(value)}`);
}

function watchBack1(value) {
    console.log(`watchBack1: ${JSON.stringify(value)}`);
}

watch(watchBack0);

app.userInfo = {
    name: 'hello'
}

app.userInfo.name = 'change name is can not call set';

watch(watchBack1);

app.userInfo = {
    name: 'newname'
}

console.log(app);
console.log(app.userInfo);

unwatch(watchBack1);

app.userInfo = {
    name: 'unwatch'
}

watch(watchBack0);

app.userInfo = {
    name: 'duwatch'
}