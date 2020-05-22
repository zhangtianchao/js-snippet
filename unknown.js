function toAsync(names) {    // 这里 names 期望是一个数组
    return (names || [])
        .map(name => (
            {
                name,
                member: wx[name]
            }
        ))
        .filter(t => typeof t.member === "function")
        .reduce((r, t) => {
            r[t.name] = promisify(wx[t.name]);
            return r;
        }, {});
}

function exarg(args){
    console.log({...args||{}, c:3});
}

// exarg([1, 2, 3])
exarg({
    a: 1,
    b: 2
})

exarg();