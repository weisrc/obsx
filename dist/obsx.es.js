const info = Symbol("info");
const bubble = (obs, fn) => {
  do
    fn(obs);
  while (obs = obs[info].prev);
};
let ignored = false;
function ignore(fn) {
  let prev = ignored;
  ignored = true;
  fn();
  ignored = prev;
}
function emit(kind, node, args, called = []) {
  if (ignored)
    return;
  for (let observer of node[info][kind].keys()) {
    if (!called.includes(observer)) {
      observer(...args);
      called.push(observer);
    }
  }
}
function on(kind, node, observer) {
  let map = node[info][kind];
  map.set(observer, 0);
  return () => map.delete(observer);
}
function watch(node, observer) {
  let disposers = [];
  bubble(node, (n) => disposers.push(on("set", n, observer)));
  return () => disposers.forEach((d) => d());
}
let use = () => {
};
function run(fn) {
  let disposers = [];
  let wrap = () => {
    for (let d of disposers)
      d();
    disposers = [];
    let prev = use;
    use = (node) => disposers.push(watch(node, wrap));
    fn();
    use = prev;
  };
  wrap();
}
function observe(data) {
  let root = [data];
  let fn = () => root;
  return _observe(fn, fn, fn)[0];
}
function _observe(get, set, call, prev) {
  call[info] = {
    prev,
    call: /* @__PURE__ */ new Map(),
    set: /* @__PURE__ */ new Map()
  };
  return new Proxy(Object.defineProperty(call, "$", { get, set }), {
    get(_, key, proxy) {
      if (key in call)
        return call[key];
      let obs = _observe(() => {
        var _a;
        use(obs);
        return (_a = get()) == null ? void 0 : _a[key];
      }, (value) => {
        get()[key] = value;
        let called = [];
        bubble(obs, (n) => emit("set", n, [], called));
      }, (...args) => {
        var _a;
        use(obs);
        let res = (_a = get()) == null ? void 0 : _a[key](...args);
        emit("call", obs, [args, res]);
        return res;
      }, proxy);
      return call[key] = obs;
    }
  });
}
export { bubble, emit, ignore, ignored, info, observe, on, run, use, watch };
