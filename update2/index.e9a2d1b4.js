function t(t) {
    return t && t.__esModule ? t.default : t
}
var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {}
  , n = {}
  , i = {}
  , r = e.parcelRequire894d;
null == r && ((r = function(t) {
    if (t in n)
        return n[t].exports;
    if (t in i) {
        var e = i[t];
        delete i[t];
        var r = {
            id: t,
            exports: {}
        };
        return n[t] = r,
        e.call(r.exports, r, r.exports),
        r.exports
    }
    var s = new Error("Cannot find module '" + t + "'");
    throw s.code = "MODULE_NOT_FOUND",
    s
}
).register = function(t, e) {
    i[t] = e
}
,
e.parcelRequire894d = r),
r.register("4hJWI", (function(t, e) {
    !function(e, n) {
        t.exports ? t.exports = n() : e.EvEmitter = n()
    }("undefined" != typeof window ? window : t.exports, (function() {
        function t() {}
        let e = t.prototype;
        return e.on = function(t, e) {
            if (!t || !e)
                return this;
            let n = this._events = this._events || {}
              , i = n[t] = n[t] || [];
            return i.includes(e) || i.push(e),
            this
        }
        ,
        e.once = function(t, e) {
            if (!t || !e)
                return this;
            this.on(t, e);
            let n = this._onceEvents = this._onceEvents || {};
            return (n[t] = n[t] || {})[e] = !0,
            this
        }
        ,
        e.off = function(t, e) {
            let n = this._events && this._events[t];
            if (!n || !n.length)
                return this;
            let i = n.indexOf(e);
            return -1 != i && n.splice(i, 1),
            this
        }
        ,
        e.emitEvent = function(t, e) {
            let n = this._events && this._events[t];
            if (!n || !n.length)
                return this;
            n = n.slice(0),
            e = e || [];
            let i = this._onceEvents && this._onceEvents[t];
            for (let r of n) {
                i && i[r] && (this.off(t, r),
                delete i[r]),
                r.apply(this, e)
            }
            return this
        }
        ,
        e.allOff = function() {
            return delete this._events,
            delete this._onceEvents,
            this
        }
        ,
        t
    }
    ))
}
));
var s = {};
/*!
 * imagesLoaded v5.0.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
!function(t, e) {
    s ? s = e(t, r("4hJWI")) : t.imagesLoaded = e(t, t.EvEmitter)
}("undefined" != typeof window ? window : s, (function(t, e) {
    let n = t.jQuery
      , i = t.console;
    function r(t, e, s) {
        if (!(this instanceof r))
            return new r(t,e,s);
        let o = t;
        var a;
        ("string" == typeof t && (o = document.querySelectorAll(t)),
        o) ? (this.elements = (a = o,
        Array.isArray(a) ? a : "object" == typeof a && "number" == typeof a.length ? [...a] : [a]),
        this.options = {},
        "function" == typeof e ? s = e : Object.assign(this.options, e),
        s && this.on("always", s),
        this.getImages(),
        n && (this.jqDeferred = new n.Deferred),
        setTimeout(this.check.bind(this))) : i.error(`Bad element for imagesLoaded ${o || t}`)
    }
    r.prototype = Object.create(e.prototype),
    r.prototype.getImages = function() {
        this.images = [],
        this.elements.forEach(this.addElementImages, this)
    }
    ;
    const s = [1, 9, 11];
    r.prototype.addElementImages = function(t) {
        "IMG" === t.nodeName && this.addImage(t),
        !0 === this.options.background && this.addElementBackgroundImages(t);
        let {nodeType: e} = t;
        if (!e || !s.includes(e))
            return;
        let n = t.querySelectorAll("img");
        for (let t of n)
            this.addImage(t);
        if ("string" == typeof this.options.background) {
            let e = t.querySelectorAll(this.options.background);
            for (let t of e)
                this.addElementBackgroundImages(t)
        }
    }
    ;
    const o = /url\((['"])?(.*?)\1\)/gi;
    function a(t) {
        this.img = t
    }
    function l(t, e) {
        this.url = t,
        this.element = e,
        this.img = new Image
    }
    return r.prototype.addElementBackgroundImages = function(t) {
        let e = getComputedStyle(t);
        if (!e)
            return;
        let n = o.exec(e.backgroundImage);
        for (; null !== n; ) {
            let i = n && n[2];
            i && this.addBackground(i, t),
            n = o.exec(e.backgroundImage)
        }
    }
    ,
    r.prototype.addImage = function(t) {
        let e = new a(t);
        this.images.push(e)
    }
    ,
    r.prototype.addBackground = function(t, e) {
        let n = new l(t,e);
        this.images.push(n)
    }
    ,
    r.prototype.check = function() {
        if (this.progressedCount = 0,
        this.hasAnyBroken = !1,
        !this.images.length)
            return void this.complete();
        let t = (t,e,n)=>{
            setTimeout((()=>{
                this.progress(t, e, n)
            }
            ))
        }
        ;
        this.images.forEach((function(e) {
            e.once("progress", t),
            e.check()
        }
        ))
    }
    ,
    r.prototype.progress = function(t, e, n) {
        this.progressedCount++,
        this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded,
        this.emitEvent("progress", [this, t, e]),
        this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t),
        this.progressedCount === this.images.length && this.complete(),
        this.options.debug && i && i.log(`progress: ${n}`, t, e)
    }
    ,
    r.prototype.complete = function() {
        let t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0,
        this.emitEvent(t, [this]),
        this.emitEvent("always", [this]),
        this.jqDeferred) {
            let t = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[t](this)
        }
    }
    ,
    a.prototype = Object.create(e.prototype),
    a.prototype.check = function() {
        this.getIsImageComplete() ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image,
        this.img.crossOrigin && (this.proxyImage.crossOrigin = this.img.crossOrigin),
        this.proxyImage.addEventListener("load", this),
        this.proxyImage.addEventListener("error", this),
        this.img.addEventListener("load", this),
        this.img.addEventListener("error", this),
        this.proxyImage.src = this.img.currentSrc || this.img.src)
    }
    ,
    a.prototype.getIsImageComplete = function() {
        return this.img.complete && this.img.naturalWidth
    }
    ,
    a.prototype.confirm = function(t, e) {
        this.isLoaded = t;
        let {parentNode: n} = this.img
          , i = "PICTURE" === n.nodeName ? n : this.img;
        this.emitEvent("progress", [this, i, e])
    }
    ,
    a.prototype.handleEvent = function(t) {
        let e = "on" + t.type;
        this[e] && this[e](t)
    }
    ,
    a.prototype.onload = function() {
        this.confirm(!0, "onload"),
        this.unbindEvents()
    }
    ,
    a.prototype.onerror = function() {
        this.confirm(!1, "onerror"),
        this.unbindEvents()
    }
    ,
    a.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this),
        this.proxyImage.removeEventListener("error", this),
        this.img.removeEventListener("load", this),
        this.img.removeEventListener("error", this)
    }
    ,
    l.prototype = Object.create(a.prototype),
    l.prototype.check = function() {
        this.img.addEventListener("load", this),
        this.img.addEventListener("error", this),
        this.img.src = this.url,
        this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
        this.unbindEvents())
    }
    ,
    l.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this),
        this.img.removeEventListener("error", this)
    }
    ,
    l.prototype.confirm = function(t, e) {
        this.isLoaded = t,
        this.emitEvent("progress", [this, this.element, e])
    }
    ,
    r.makeJQueryPlugin = function(e) {
        (e = e || t.jQuery) && (n = e,
        n.fn.imagesLoaded = function(t, e) {
            return new r(this,t,e).jqDeferred.promise(n(this))
        }
        )
    }
    ,
    r.makeJQueryPlugin(),
    r
}
));
const o = (t,e,n)=>{
    t.forEach((t=>{
        const i = document.createElement(e);
        i.classList = n,
        t.parentNode.appendChild(i),
        i.appendChild(t)
    }
    ))
}
;
function a(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n,
    t
}
function l(t, e) {
    return Object.getOwnPropertyNames(Object(t)).reduce(((n,i)=>{
        const r = Object.getOwnPropertyDescriptor(Object(t), i)
          , s = Object.getOwnPropertyDescriptor(Object(e), i);
        return Object.defineProperty(n, i, s || r)
    }
    ), {})
}
function u(t) {
    return "string" == typeof t
}
function c(t) {
    return Array.isArray(t)
}
function h(t={}) {
    const e = l(t);
    let n;
    return void 0 !== e.types ? n = e.types : void 0 !== e.split && (n = e.split),
    void 0 !== n && (e.types = (u(n) || c(n) ? String(n) : "").split(",").map((t=>String(t).trim())).filter((t=>/((line)|(word)|(char))/i.test(t)))),
    (e.absolute || e.position) && (e.absolute = e.absolute || /absolute/.test(t.position)),
    e
}
function f(t) {
    const e = u(t) || c(t) ? String(t) : "";
    return {
        none: !e,
        lines: /line/i.test(e),
        words: /word/i.test(e),
        chars: /char/i.test(e)
    }
}
function d(t) {
    return null !== t && "object" == typeof t
}
function p(t) {
    return d(t) && /^(1|3|11)$/.test(t.nodeType)
}
function g(t) {
    return c(t) ? t : null == t ? [] : function(t) {
        return d(t) && function(t) {
            return "number" == typeof t && t > -1 && t % 1 == 0
        }(t.length)
    }(t) ? Array.prototype.slice.call(t) : [t]
}
function m(t) {
    let e = t;
    return u(t) && (e = /^(#[a-z]\w+)$/.test(t.trim()) ? document.getElementById(t.trim().slice(1)) : document.querySelectorAll(t)),
    g(e).reduce(((t,e)=>[...t, ...g(e).filter(p)]), [])
}
(()=>{
    function t(...t) {
        const e = t.length;
        for (let n = 0; n < e; n++) {
            const e = t[n];
            1 === e.nodeType || 11 === e.nodeType ? this.appendChild(e) : this.appendChild(document.createTextNode(String(e)))
        }
    }
    function e(...t) {
        for (; this.lastChild; )
            this.removeChild(this.lastChild);
        t.length && this.append(...t)
    }
    function n(...t) {
        const e = this.parentNode;
        let n = t.length;
        if (e)
            for (n || e.removeChild(this); n--; ) {
                let i = t[n];
                "object" != typeof i ? i = this.ownerDocument.createTextNode(i) : i.parentNode && i.parentNode.removeChild(i),
                n ? e.insertBefore(this.previousSibling, i) : e.replaceChild(i, this)
            }
    }
    "undefined" != typeof Element && (Element.prototype.append || (Element.prototype.append = t,
    DocumentFragment.prototype.append = t),
    Element.prototype.replaceChildren || (Element.prototype.replaceChildren = e,
    DocumentFragment.prototype.replaceChildren = e),
    Element.prototype.replaceWith || (Element.prototype.replaceWith = n,
    DocumentFragment.prototype.replaceWith = n))
}
)();
const {entries: v, keys: _, values: y} = Object
  , w = {};
let b = 0;
function x(t, e, n) {
    if (!d(t))
        return console.warn("[data.set] owner is not an object"),
        null;
    const i = t._splittype || (t._splittype = ++b)
      , r = w[i] || (w[i] = {});
    return void 0 === n ? e && Object.getPrototypeOf(e) === Object.prototype && (w[i] = {
        ...r,
        ...e
    }) : void 0 !== e && (r[e] = n),
    n
}
function T(t, e) {
    const n = d(t) ? t._splittype : null
      , i = n && w[n] || {};
    return void 0 === e ? i : i[e]
}
function O(t) {
    const e = t && t._splittype;
    e && (delete t[e],
    delete w[e])
}
const M = "[\ud800-\udfff]"
  , S = "[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]"
  , E = "[^\ud800-\udfff]"
  , k = "(?:\ud83c[\udde6-\uddff]){2}"
  , C = "[\ud800-\udbff][\udc00-\udfff]"
  , D = `${`(?:${S}|\ud83c[\udffb-\udfff])`}?`
  , P = "[\\ufe0e\\ufe0f]?" + D + ("(?:\\u200d(?:" + [E, k, C].join("|") + ")[\\ufe0e\\ufe0f]?" + D + ")*")
  , A = `(?:${[`${E}${S}?`, S, k, C, M].join("|")}\n)`
  , I = RegExp(`\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|${A}${P}`, "g")
  , L = RegExp(`[${["\\u200d", "\ud800-\udfff", "\\u0300-\\u036f\\ufe20-\\ufe23", "\\u20d0-\\u20f0", "\\ufe0e\\ufe0f"].join("")}]`);
function R(t) {
    return L.test(t)
}
function z(t) {
    return R(t) ? function(t) {
        return t.match(I) || []
    }(t) : function(t) {
        return t.split("")
    }(t)
}
function B(t, e="") {
    var n;
    return (t = null == (n = t) ? "" : String(n)) && u(t) && !e && R(t) ? z(t) : t.split(e)
}
function Y(t, e) {
    const n = document.createElement(t);
    return e ? (Object.keys(e).forEach((t=>{
        const i = e[t]
          , r = u(i) ? i.trim() : i;
        null !== r && "" !== r && ("children" === t ? n.append(...g(r)) : n.setAttribute(t, r))
    }
    )),
    n) : n
}
var W = {
    splitClass: "",
    lineClass: "line",
    wordClass: "word",
    charClass: "char",
    types: ["lines", "words", "chars"],
    absolute: !1,
    tagName: "div"
};
function X(t, e) {
    const n = f((e = l(W, e)).types)
      , i = e.tagName
      , r = t.nodeValue
      , s = document.createDocumentFragment();
    let o = []
      , a = [];
    return /^\s/.test(r) && s.append(" "),
    o = function(t, e=" ") {
        return (t ? String(t) : "").trim().replace(/\s+/g, " ").split(e)
    }(r).reduce(((t,r,o,l)=>{
        let u, c;
        return n.chars && (c = B(r).map((t=>{
            const n = Y(i, {
                class: `${e.splitClass} ${e.charClass}`,
                style: "display: inline-block;",
                children: t
            });
            return x(n, "isChar", !0),
            a = [...a, n],
            n
        }
        ))),
        n.words || n.lines ? (u = Y(i, {
            class: `${e.wordClass} ${e.splitClass}`,
            style: "display: inline-block; " + (n.words && e.absolute ? "position: relative;" : ""),
            children: n.chars ? c : r
        }),
        x(u, {
            isWord: !0,
            isWordStart: !0,
            isWordEnd: !0
        }),
        s.appendChild(u)) : c.forEach((t=>{
            s.appendChild(t)
        }
        )),
        o < l.length - 1 && s.append(" "),
        n.words ? t.concat(u) : t
    }
    ), []),
    /\s$/.test(r) && s.append(" "),
    t.replaceWith(s),
    {
        words: o,
        chars: a
    }
}
function F(t, e) {
    const n = t.nodeType
      , i = {
        words: [],
        chars: []
    };
    if (!/(1|3|11)/.test(n))
        return i;
    if (3 === n && /\S/.test(t.nodeValue))
        return X(t, e);
    const r = g(t.childNodes);
    if (r.length && (x(t, "isSplit", !0),
    !T(t).isRoot)) {
        t.style.display = "inline-block",
        t.style.position = "relative";
        const e = t.nextSibling
          , n = t.previousSibling
          , i = t.textContent || ""
          , r = e ? e.textContent : " "
          , s = n ? n.textContent : " ";
        x(t, {
            isWordEnd: /\s$/.test(i) || /^\s/.test(r),
            isWordStart: /^\s/.test(i) || /\s$/.test(s)
        })
    }
    return r.reduce(((t,n)=>{
        const {words: i, chars: r} = F(n, e);
        return {
            words: [...t.words, ...i],
            chars: [...t.chars, ...r]
        }
    }
    ), i)
}
function N(t) {
    T(t).isWord ? (O(t),
    t.replaceWith(...t.childNodes)) : g(t.children).forEach((t=>N(t)))
}
function V(t, e, n) {
    const i = f(e.types)
      , r = e.tagName
      , s = t.getElementsByTagName("*")
      , o = [];
    let a, l, u, c = [], h = null, d = [];
    const p = t.parentElement
      , m = t.nextElementSibling
      , v = document.createDocumentFragment()
      , _ = window.getComputedStyle(t)
      , y = _.textAlign
      , w = .2 * parseFloat(_.fontSize);
    return e.absolute && (u = {
        left: t.offsetLeft,
        top: t.offsetTop,
        width: t.offsetWidth
    },
    l = t.offsetWidth,
    a = t.offsetHeight,
    x(t, {
        cssWidth: t.style.width,
        cssHeight: t.style.height
    })),
    g(s).forEach((r=>{
        const s = r.parentElement === t
          , {width: a, height: l, top: u, left: f} = function(t, e, n, i) {
            if (!n.absolute)
                return {
                    top: e ? t.offsetTop : null
                };
            const r = t.offsetParent
              , [s,o] = i;
            let a = 0
              , l = 0;
            if (r && r !== document.body) {
                const t = r.getBoundingClientRect();
                a = t.x + s,
                l = t.y + o
            }
            const {width: u, height: c, x: h, y: f} = t.getBoundingClientRect();
            return {
                width: u,
                height: c,
                top: f + o - l,
                left: h + s - a
            }
        }(r, s, e, n);
        /^br$/i.test(r.nodeName) || (i.lines && s && ((null === h || u - h >= w) && (h = u,
        o.push(c = [])),
        c.push(r)),
        e.absolute && x(r, {
            top: u,
            left: f,
            width: a,
            height: l
        }))
    }
    )),
    p && p.removeChild(t),
    i.lines && (d = o.map((t=>{
        const n = Y(r, {
            class: `${e.splitClass} ${e.lineClass}`,
            style: `display: block; text-align: ${y}; width: 100%;`
        });
        x(n, "isLine", !0);
        const i = {
            height: 0,
            top: 1e4
        };
        return v.appendChild(n),
        t.forEach(((t,e,r)=>{
            const {isWordEnd: s, top: o, height: a} = T(t)
              , l = r[e + 1];
            i.height = Math.max(i.height, a),
            i.top = Math.min(i.top, o),
            n.appendChild(t),
            s && T(l).isWordStart && n.append(" ")
        }
        )),
        e.absolute && x(n, {
            height: i.height,
            top: i.top
        }),
        n
    }
    )),
    i.words || N(v),
    t.replaceChildren(v)),
    e.absolute && (t.style.width = `${t.style.width || l}px`,
    t.style.height = `${a}px`,
    g(s).forEach((t=>{
        const {isLine: e, top: n, left: i, width: r, height: s} = T(t)
          , o = T(t.parentElement)
          , a = !e && o.isLine;
        t.style.top = `${a ? n - o.top : n}px`,
        t.style.left = e ? `${u.left}px` : i - (a ? u.left : 0) + "px",
        t.style.height = `${s}px`,
        t.style.width = e ? `${u.width}px` : `${r}px`,
        t.style.position = "absolute"
    }
    ))),
    p && (m ? p.insertBefore(t, m) : p.appendChild(t)),
    d
}
let j = l(W, {});
class q {
    static get data() {
        return w
    }
    static get defaults() {
        return j
    }
    static set defaults(t) {
        j = l(j, h(t))
    }
    static setDefaults(t) {
        return j = l(j, h(t)),
        W
    }
    static revert(t) {
        m(t).forEach((t=>{
            const {isSplit: e, html: n, cssWidth: i, cssHeight: r} = T(t);
            e && (t.innerHTML = n,
            t.style.width = i || "",
            t.style.height = r || "",
            O(t))
        }
        ))
    }
    static create(t, e) {
        return new q(t,e)
    }
    split(t) {
        this.revert(),
        this.lines = [],
        this.words = [],
        this.chars = [];
        const e = [window.pageXOffset, window.pageYOffset];
        void 0 !== t && (this.settings = l(this.settings, h(t)));
        const n = f(this.settings.types);
        n.none || (this.elements.forEach((t=>{
            x(t, "isRoot", !0);
            const {words: e, chars: n} = F(t, this.settings);
            this.words = [...this.words, ...e],
            this.chars = [...this.chars, ...n]
        }
        )),
        this.elements.forEach((t=>{
            if (n.lines || this.settings.absolute) {
                const n = V(t, this.settings, e);
                this.lines = [...this.lines, ...n]
            }
        }
        )),
        this.isSplit = !0,
        window.scrollTo(e[0], e[1]),
        v(w).forEach((([t,{isRoot: e, isSplit: n}])=>{
            e && n || (w[t] = null,
            delete w[t])
        }
        )))
    }
    revert() {
        this.isSplit && (this.lines = null,
        this.words = null,
        this.chars = null,
        this.isSplit = !1),
        q.revert(this.elements)
    }
    constructor(t, e) {
        this.isSplit = !1,
        this.settings = l(j, h(e)),
        this.elements = m(t),
        this.revert(),
        this.elements.forEach((t=>{
            x(t, "html", t.innerHTML)
        }
        )),
        this.split()
    }
}
function H(t) {
    if (void 0 === t)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t
}
function $(t, e) {
    t.prototype = Object.create(e.prototype),
    t.prototype.constructor = t,
    t.__proto__ = e
}
/*!
 * GSAP 3.10.4
 * https://greensock.com
 *
 * @license Copyright 2008-2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var U, G, K, Q, Z, J, tt, et, nt, it, rt, st, ot, at, lt, ut, ct, ht, ft, dt, pt, gt, mt, vt, _t, yt, wt, bt, xt = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: {
        lineHeight: ""
    }
}, Tt = {
    duration: .5,
    overwrite: !1,
    delay: 0
}, Ot = 2 * Math.PI, Mt = Ot / 4, St = 0, Et = Math.sqrt, kt = Math.cos, Ct = Math.sin, Dt = function(t) {
    return "string" == typeof t
}, Pt = function(t) {
    return "function" == typeof t
}, At = function(t) {
    return "number" == typeof t
}, It = function(t) {
    return void 0 === t
}, Lt = function(t) {
    return "object" == typeof t
}, Rt = function(t) {
    return !1 !== t
}, zt = function() {
    return "undefined" != typeof window
}, Bt = function(t) {
    return Pt(t) || Dt(t)
}, Yt = "function" == typeof ArrayBuffer && ArrayBuffer.isView || function() {}
, Wt = Array.isArray, Xt = /(?:-?\.?\d|\.)+/gi, Ft = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Nt = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Vt = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, jt = /[+-]=-?[.\d]+/, qt = /[^,'"\[\]\s]+/gi, Ht = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, $t = {}, Ut = {}, Gt = function(t) {
    return (Ut = be(t, $t)) && ci
}, Kt = function(t, e) {
    return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()")
}, Qt = function(t, e) {
    return !e && console.warn(t)
}, Zt = function(t, e) {
    return t && ($t[t] = e) && Ut && (Ut[t] = e) || $t
}, Jt = function() {
    return 0
}, te = {}, ee = [], ne = {}, ie = {}, re = {}, se = 30, oe = [], ae = "", le = function(t) {
    var e, n, i = t[0];
    if (Lt(i) || Pt(i) || (t = [t]),
    !(e = (i._gsap || {}).harness)) {
        for (n = oe.length; n-- && !oe[n].targetTest(i); )
            ;
        e = oe[n]
    }
    for (n = t.length; n--; )
        t[n] && (t[n]._gsap || (t[n]._gsap = new In(t[n],e))) || t.splice(n, 1);
    return t
}, ue = function(t) {
    return t._gsap || le(Ze(t))[0]._gsap
}, ce = function(t, e, n) {
    return (n = t[e]) && Pt(n) ? t[e]() : It(n) && t.getAttribute && t.getAttribute(e) || n
}, he = function(t, e) {
    return (t = t.split(",")).forEach(e) || t
}, fe = function(t) {
    return Math.round(1e5 * t) / 1e5 || 0
}, de = function(t) {
    return Math.round(1e7 * t) / 1e7 || 0
}, pe = function(t, e) {
    var n = e.charAt(0)
      , i = parseFloat(e.substr(2));
    return t = parseFloat(t),
    "+" === n ? t + i : "-" === n ? t - i : "*" === n ? t * i : t / i
}, ge = function(t, e) {
    for (var n = e.length, i = 0; t.indexOf(e[i]) < 0 && ++i < n; )
        ;
    return i < n
}, me = function() {
    var t, e, n = ee.length, i = ee.slice(0);
    for (ne = {},
    ee.length = 0,
    t = 0; t < n; t++)
        (e = i[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0)
}, ve = function(t, e, n, i) {
    ee.length && me(),
    t.render(e, n, i),
    ee.length && me()
}, _e = function(t) {
    var e = parseFloat(t);
    return (e || 0 === e) && (t + "").match(qt).length < 2 ? e : Dt(t) ? t.trim() : t
}, ye = function(t) {
    return t
}, we = function(t, e) {
    for (var n in e)
        n in t || (t[n] = e[n]);
    return t
}, be = function(t, e) {
    for (var n in e)
        t[n] = e[n];
    return t
}, xe = function t(e, n) {
    for (var i in n)
        "__proto__" !== i && "constructor" !== i && "prototype" !== i && (e[i] = Lt(n[i]) ? t(e[i] || (e[i] = {}), n[i]) : n[i]);
    return e
}, Te = function(t, e) {
    var n, i = {};
    for (n in t)
        n in e || (i[n] = t[n]);
    return i
}, Oe = function(t) {
    var e, n = t.parent || G, i = t.keyframes ? (e = Wt(t.keyframes),
    function(t, n) {
        for (var i in n)
            i in t || "duration" === i && e || "ease" === i || (t[i] = n[i])
    }
    ) : we;
    if (Rt(t.inherit))
        for (; n; )
            i(t, n.vars.defaults),
            n = n.parent || n._dp;
    return t
}, Me = function(t, e, n, i, r) {
    void 0 === n && (n = "_first"),
    void 0 === i && (i = "_last");
    var s, o = t[i];
    if (r)
        for (s = e[r]; o && o[r] > s; )
            o = o._prev;
    return o ? (e._next = o._next,
    o._next = e) : (e._next = t[n],
    t[n] = e),
    e._next ? e._next._prev = e : t[i] = e,
    e._prev = o,
    e.parent = e._dp = t,
    e
}, Se = function(t, e, n, i) {
    void 0 === n && (n = "_first"),
    void 0 === i && (i = "_last");
    var r = e._prev
      , s = e._next;
    r ? r._next = s : t[n] === e && (t[n] = s),
    s ? s._prev = r : t[i] === e && (t[i] = r),
    e._next = e._prev = e.parent = null
}, Ee = function(t, e) {
    t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove(t),
    t._act = 0
}, ke = function(t, e) {
    if (t && (!e || e._end > t._dur || e._start < 0))
        for (var n = t; n; )
            n._dirty = 1,
            n = n.parent;
    return t
}, Ce = function(t) {
    for (var e = t.parent; e && e.parent; )
        e._dirty = 1,
        e.totalDuration(),
        e = e.parent;
    return t
}, De = function t(e) {
    return !e || e._ts && t(e.parent)
}, Pe = function(t) {
    return t._repeat ? Ae(t._tTime, t = t.duration() + t._rDelay) * t : 0
}, Ae = function(t, e) {
    var n = Math.floor(t /= e);
    return t && n === t ? n - 1 : n
}, Ie = function(t, e) {
    return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
}, Le = function(t) {
    return t._end = de(t._start + (t._tDur / Math.abs(t._ts || t._rts || 1e-8) || 0))
}, Re = function(t, e) {
    var n = t._dp;
    return n && n.smoothChildTiming && t._ts && (t._start = de(n._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)),
    Le(t),
    n._dirty || ke(n, t)),
    t
}, ze = function(t, e) {
    var n;
    if ((e._time || e._initted && !e._dur) && (n = Ie(t.rawTime(), e),
    (!e._dur || Ue(0, e.totalDuration(), n) - e._tTime > 1e-8) && e.render(n, !0)),
    ke(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
        if (t._dur < t.duration())
            for (n = t; n._dp; )
                n.rawTime() >= 0 && n.totalTime(n._tTime),
                n = n._dp;
        t._zTime = -1e-8
    }
}, Be = function(t, e, n, i) {
    return e.parent && Ee(e),
    e._start = de((At(n) ? n : n || t !== G ? qe(t, n, e) : t._time) + e._delay),
    e._end = de(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)),
    Me(t, e, "_first", "_last", t._sort ? "_start" : 0),
    Fe(e) || (t._recent = e),
    i || ze(t, e),
    t
}, Ye = function(t, e) {
    return ($t.ScrollTrigger || Kt("scrollTrigger", e)) && $t.ScrollTrigger.create(e, t)
}, We = function(t, e, n, i) {
    return Fn(t, e),
    t._initted ? !n && t._pt && (t._dur && !1 !== t.vars.lazy || !t._dur && t.vars.lazy) && tt !== wn.frame ? (ee.push(t),
    t._lazy = [e, i],
    1) : void 0 : 1
}, Xe = function t(e) {
    var n = e.parent;
    return n && n._ts && n._initted && !n._lock && (n.rawTime() < 0 || t(n))
}, Fe = function(t) {
    var e = t.data;
    return "isFromStart" === e || "isStart" === e
}, Ne = function(t, e, n, i) {
    var r = t._repeat
      , s = de(e) || 0
      , o = t._tTime / t._tDur;
    return o && !i && (t._time *= s / t._dur),
    t._dur = s,
    t._tDur = r ? r < 0 ? 1e10 : de(s * (r + 1) + t._rDelay * r) : s,
    o > 0 && !i ? Re(t, t._tTime = t._tDur * o) : t.parent && Le(t),
    n || ke(t.parent, t),
    t
}, Ve = function(t) {
    return t instanceof Rn ? ke(t) : Ne(t, t._dur)
}, je = {
    _start: 0,
    endTime: Jt,
    totalDuration: Jt
}, qe = function t(e, n, i) {
    var r, s, o, a = e.labels, l = e._recent || je, u = e.duration() >= 1e8 ? l.endTime(!1) : e._dur;
    return Dt(n) && (isNaN(n) || n in a) ? (s = n.charAt(0),
    o = "%" === n.substr(-1),
    r = n.indexOf("="),
    "<" === s || ">" === s ? (r >= 0 && (n = n.replace(/=/, "")),
    ("<" === s ? l._start : l.endTime(l._repeat >= 0)) + (parseFloat(n.substr(1)) || 0) * (o ? (r < 0 ? l : i).totalDuration() / 100 : 1)) : r < 0 ? (n in a || (a[n] = u),
    a[n]) : (s = parseFloat(n.charAt(r - 1) + n.substr(r + 1)),
    o && i && (s = s / 100 * (Wt(i) ? i[0] : i).totalDuration()),
    r > 1 ? t(e, n.substr(0, r - 1), i) + s : u + s)) : null == n ? u : +n
}, He = function(t, e, n) {
    var i, r, s = At(e[1]), o = (s ? 2 : 1) + (t < 2 ? 0 : 1), a = e[o];
    if (s && (a.duration = e[1]),
    a.parent = n,
    t) {
        for (i = a,
        r = n; r && !("immediateRender"in i); )
            i = r.vars.defaults || {},
            r = Rt(r.vars.inherit) && r.parent;
        a.immediateRender = Rt(i.immediateRender),
        t < 2 ? a.runBackwards = 1 : a.startAt = e[o - 1]
    }
    return new Hn(e[0],a,e[o + 1])
}, $e = function(t, e) {
    return t || 0 === t ? e(t) : e
}, Ue = function(t, e, n) {
    return n < t ? t : n > e ? e : n
}, Ge = function(t, e) {
    return Dt(t) && (e = Ht.exec(t)) ? e[1] : ""
}, Ke = [].slice, Qe = function(t, e) {
    return t && Lt(t) && "length"in t && (!e && !t.length || t.length - 1 in t && Lt(t[0])) && !t.nodeType && t !== K
}, Ze = function(t, e, n) {
    return !Dt(t) || n || !Q && bn() ? Wt(t) ? function(t, e, n) {
        return void 0 === n && (n = []),
        t.forEach((function(t) {
            var i;
            return Dt(t) && !e || Qe(t, 1) ? (i = n).push.apply(i, Ze(t)) : n.push(t)
        }
        )) || n
    }(t, n) : Qe(t) ? Ke.call(t, 0) : t ? [t] : [] : Ke.call((e || Z).querySelectorAll(t), 0)
}, Je = function(t) {
    return t.sort((function() {
        return .5 - Math.random()
    }
    ))
}, tn = function(t) {
    if (Pt(t))
        return t;
    var e = Lt(t) ? t : {
        each: t
    }
      , n = kn(e.ease)
      , i = e.from || 0
      , r = parseFloat(e.base) || 0
      , s = {}
      , o = i > 0 && i < 1
      , a = isNaN(i) || o
      , l = e.axis
      , u = i
      , c = i;
    return Dt(i) ? u = c = {
        center: .5,
        edges: .5,
        end: 1
    }[i] || 0 : !o && a && (u = i[0],
    c = i[1]),
    function(t, o, h) {
        var f, d, p, g, m, v, _, y, w, b = (h || e).length, x = s[b];
        if (!x) {
            if (!(w = "auto" === e.grid ? 0 : (e.grid || [1, 1e8])[1])) {
                for (_ = -1e8; _ < (_ = h[w++].getBoundingClientRect().left) && w < b; )
                    ;
                w--
            }
            for (x = s[b] = [],
            f = a ? Math.min(w, b) * u - .5 : i % w,
            d = 1e8 === w ? 0 : a ? b * c / w - .5 : i / w | 0,
            _ = 0,
            y = 1e8,
            v = 0; v < b; v++)
                p = v % w - f,
                g = d - (v / w | 0),
                x[v] = m = l ? Math.abs("y" === l ? g : p) : Et(p * p + g * g),
                m > _ && (_ = m),
                m < y && (y = m);
            "random" === i && Je(x),
            x.max = _ - y,
            x.min = y,
            x.v = b = (parseFloat(e.amount) || parseFloat(e.each) * (w > b ? b - 1 : l ? "y" === l ? b / w : w : Math.max(w, b / w)) || 0) * ("edges" === i ? -1 : 1),
            x.b = b < 0 ? r - b : r,
            x.u = Ge(e.amount || e.each) || 0,
            n = n && b < 0 ? Sn(n) : n
        }
        return b = (x[t] - x.min) / x.max || 0,
        de(x.b + (n ? n(b) : b) * x.v) + x.u
    }
}, en = function(t) {
    var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
    return function(n) {
        var i = Math.round(parseFloat(n) / t) * t * e;
        return (i - i % 1) / e + (At(n) ? 0 : Ge(n))
    }
}, nn = function(t, e) {
    var n, i, r = Wt(t);
    return !r && Lt(t) && (n = r = t.radius || 1e8,
    t.values ? (t = Ze(t.values),
    (i = !At(t[0])) && (n *= n)) : t = en(t.increment)),
    $e(e, r ? Pt(t) ? function(e) {
        return i = t(e),
        Math.abs(i - e) <= n ? i : e
    }
    : function(e) {
        for (var r, s, o = parseFloat(i ? e.x : e), a = parseFloat(i ? e.y : 0), l = 1e8, u = 0, c = t.length; c--; )
            (r = i ? (r = t[c].x - o) * r + (s = t[c].y - a) * s : Math.abs(t[c] - o)) < l && (l = r,
            u = c);
        return u = !n || l <= n ? t[u] : e,
        i || u === e || At(e) ? u : u + Ge(e)
    }
    : en(t))
}, rn = function(t, e, n, i) {
    return $e(Wt(t) ? !e : !0 === n ? (n = 0,
    !1) : !i, (function() {
        return Wt(t) ? t[~~(Math.random() * t.length)] : (i = (n = n || 1e-5) < 1 ? Math.pow(10, (n + "").length - 2) : 1) && Math.floor(Math.round((t - n / 2 + Math.random() * (e - t + .99 * n)) / n) * n * i) / i
    }
    ))
}, sn = function(t, e, n) {
    return $e(n, (function(n) {
        return t[~~e(n)]
    }
    ))
}, on = function(t) {
    for (var e, n, i, r, s = 0, o = ""; ~(e = t.indexOf("random(", s)); )
        i = t.indexOf(")", e),
        r = "[" === t.charAt(e + 7),
        n = t.substr(e + 7, i - e - 7).match(r ? qt : Xt),
        o += t.substr(s, e - s) + rn(r ? n : +n[0], r ? 0 : +n[1], +n[2] || 1e-5),
        s = i + 1;
    return o + t.substr(s, t.length - s)
}, an = function(t, e, n, i, r) {
    var s = e - t
      , o = i - n;
    return $e(r, (function(e) {
        return n + ((e - t) / s * o || 0)
    }
    ))
}, ln = function(t, e, n) {
    var i, r, s, o = t.labels, a = 1e8;
    for (i in o)
        (r = o[i] - e) < 0 == !!n && r && a > (r = Math.abs(r)) && (s = i,
        a = r);
    return s
}, un = function(t, e, n) {
    var i, r, s = t.vars, o = s[e];
    if (o)
        return i = s[e + "Params"],
        r = s.callbackScope || t,
        n && ee.length && me(),
        i ? o.apply(r, i) : o.call(r)
}, cn = function(t) {
    return Ee(t),
    t.scrollTrigger && t.scrollTrigger.kill(!1),
    t.progress() < 1 && un(t, "onInterrupt"),
    t
}, hn = function(t) {
    var e = (t = !t.name && t.default || t).name
      , n = Pt(t)
      , i = e && !n && t.init ? function() {
        this._props = []
    }
    : t
      , r = {
        init: Jt,
        render: ei,
        add: Wn,
        kill: ii,
        modifier: ni,
        rawVars: 0
    }
      , s = {
        targetTest: 0,
        get: 0,
        getSetter: Qn,
        aliases: {},
        register: 0
    };
    if (bn(),
    t !== i) {
        if (ie[e])
            return;
        we(i, we(Te(t, r), s)),
        be(i.prototype, be(r, Te(t, s))),
        ie[i.prop = e] = i,
        t.targetTest && (oe.push(i),
        te[e] = 1),
        e = ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin"
    }
    Zt(e, i),
    t.register && t.register(ci, i, oi)
}, fn = {
    aqua: [0, 255, 255],
    lime: [0, 255, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, 255],
    navy: [0, 0, 128],
    white: [255, 255, 255],
    olive: [128, 128, 0],
    yellow: [255, 255, 0],
    orange: [255, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [255, 0, 0],
    pink: [255, 192, 203],
    cyan: [0, 255, 255],
    transparent: [255, 255, 255, 0]
}, dn = function(t, e, n) {
    return 255 * (6 * (t += t < 0 ? 1 : t > 1 ? -1 : 0) < 1 ? e + (n - e) * t * 6 : t < .5 ? n : 3 * t < 2 ? e + (n - e) * (2 / 3 - t) * 6 : e) + .5 | 0
}, pn = function(t, e, n) {
    var i, r, s, o, a, l, u, c, h, f, d = t ? At(t) ? [t >> 16, t >> 8 & 255, 255 & t] : 0 : fn.black;
    if (!d) {
        if ("," === t.substr(-1) && (t = t.substr(0, t.length - 1)),
        fn[t])
            d = fn[t];
        else if ("#" === t.charAt(0)) {
            if (t.length < 6 && (i = t.charAt(1),
            r = t.charAt(2),
            s = t.charAt(3),
            t = "#" + i + i + r + r + s + s + (5 === t.length ? t.charAt(4) + t.charAt(4) : "")),
            9 === t.length)
                return [(d = parseInt(t.substr(1, 6), 16)) >> 16, d >> 8 & 255, 255 & d, parseInt(t.substr(7), 16) / 255];
            d = [(t = parseInt(t.substr(1), 16)) >> 16, t >> 8 & 255, 255 & t]
        } else if ("hsl" === t.substr(0, 3))
            if (d = f = t.match(Xt),
            e) {
                if (~t.indexOf("="))
                    return d = t.match(Ft),
                    n && d.length < 4 && (d[3] = 1),
                    d
            } else
                o = +d[0] % 360 / 360,
                a = +d[1] / 100,
                i = 2 * (l = +d[2] / 100) - (r = l <= .5 ? l * (a + 1) : l + a - l * a),
                d.length > 3 && (d[3] *= 1),
                d[0] = dn(o + 1 / 3, i, r),
                d[1] = dn(o, i, r),
                d[2] = dn(o - 1 / 3, i, r);
        else
            d = t.match(Xt) || fn.transparent;
        d = d.map(Number)
    }
    return e && !f && (i = d[0] / 255,
    r = d[1] / 255,
    s = d[2] / 255,
    l = ((u = Math.max(i, r, s)) + (c = Math.min(i, r, s))) / 2,
    u === c ? o = a = 0 : (h = u - c,
    a = l > .5 ? h / (2 - u - c) : h / (u + c),
    o = u === i ? (r - s) / h + (r < s ? 6 : 0) : u === r ? (s - i) / h + 2 : (i - r) / h + 4,
    o *= 60),
    d[0] = ~~(o + .5),
    d[1] = ~~(100 * a + .5),
    d[2] = ~~(100 * l + .5)),
    n && d.length < 4 && (d[3] = 1),
    d
}, gn = function(t) {
    var e = []
      , n = []
      , i = -1;
    return t.split(vn).forEach((function(t) {
        var r = t.match(Nt) || [];
        e.push.apply(e, r),
        n.push(i += r.length + 1)
    }
    )),
    e.c = n,
    e
}, mn = function(t, e, n) {
    var i, r, s, o, a = "", l = (t + a).match(vn), u = e ? "hsla(" : "rgba(", c = 0;
    if (!l)
        return t;
    if (l = l.map((function(t) {
        return (t = pn(t, e, 1)) && u + (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) + ")"
    }
    )),
    n && (s = gn(t),
    (i = n.c).join(a) !== s.c.join(a)))
        for (o = (r = t.replace(vn, "1").split(Nt)).length - 1; c < o; c++)
            a += r[c] + (~i.indexOf(c) ? l.shift() || u + "0,0,0,0)" : (s.length ? s : l.length ? l : n).shift());
    if (!r)
        for (o = (r = t.split(vn)).length - 1; c < o; c++)
            a += r[c] + l[c];
    return a + r[o]
}, vn = function() {
    var t, e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
    for (t in fn)
        e += "|" + t + "\\b";
    return new RegExp(e + ")","gi")
}(), _n = /hsl[a]?\(/, yn = function(t) {
    var e, n = t.join(" ");
    if (vn.lastIndex = 0,
    vn.test(n))
        return e = _n.test(n),
        t[1] = mn(t[1], e),
        t[0] = mn(t[0], e, gn(t[1])),
        !0
}, wn = (ut = Date.now,
ct = 500,
ht = 33,
ft = ut(),
dt = ft,
gt = pt = 1e3 / 240,
vt = function t(e) {
    var n, i, r, s, o = ut() - dt, a = !0 === e;
    if (o > ct && (ft += o - ht),
    ((n = (r = (dt += o) - ft) - gt) > 0 || a) && (s = ++ot.frame,
    at = r - 1e3 * ot.time,
    ot.time = r /= 1e3,
    gt += n + (n >= pt ? 4 : pt - n),
    i = 1),
    a || (it = rt(t)),
    i)
        for (lt = 0; lt < mt.length; lt++)
            mt[lt](r, at, s, e)
}
,
ot = {
    time: 0,
    frame: 0,
    tick: function() {
        vt(!0)
    },
    deltaRatio: function(t) {
        return at / (1e3 / (t || 60))
    },
    wake: function() {
        J && (!Q && zt() && (K = Q = window,
        Z = K.document || {},
        $t.gsap = ci,
        (K.gsapVersions || (K.gsapVersions = [])).push(ci.version),
        Gt(Ut || K.GreenSockGlobals || !K.gsap && K || {}),
        st = K.requestAnimationFrame),
        it && ot.sleep(),
        rt = st || function(t) {
            return setTimeout(t, gt - 1e3 * ot.time + 1 | 0)
        }
        ,
        nt = 1,
        vt(2))
    },
    sleep: function() {
        (st ? K.cancelAnimationFrame : clearTimeout)(it),
        nt = 0,
        rt = Jt
    },
    lagSmoothing: function(t, e) {
        ct = t || 1 / 1e-8,
        ht = Math.min(e, ct, 0)
    },
    fps: function(t) {
        pt = 1e3 / (t || 240),
        gt = 1e3 * ot.time + pt
    },
    add: function(t, e, n) {
        var i = e ? function(e, n, r, s) {
            t(e, n, r, s),
            ot.remove(i)
        }
        : t;
        return ot.remove(t),
        mt[n ? "unshift" : "push"](i),
        bn(),
        i
    },
    remove: function(t, e) {
        ~(e = mt.indexOf(t)) && mt.splice(e, 1) && lt >= e && lt--
    },
    _listeners: mt = []
}), bn = function() {
    return !nt && wn.wake()
}, xn = {}, Tn = /^[\d.\-M][\d.\-,\s]/, On = /["']/g, Mn = function(t) {
    for (var e, n, i, r = {}, s = t.substr(1, t.length - 3).split(":"), o = s[0], a = 1, l = s.length; a < l; a++)
        n = s[a],
        e = a !== l - 1 ? n.lastIndexOf(",") : n.length,
        i = n.substr(0, e),
        r[o] = isNaN(i) ? i.replace(On, "").trim() : +i,
        o = n.substr(e + 1).trim();
    return r
}, Sn = function(t) {
    return function(e) {
        return 1 - t(1 - e)
    }
}, En = function t(e, n) {
    for (var i, r = e._first; r; )
        r instanceof Rn ? t(r, n) : !r.vars.yoyoEase || r._yoyo && r._repeat || r._yoyo === n || (r.timeline ? t(r.timeline, n) : (i = r._ease,
        r._ease = r._yEase,
        r._yEase = i,
        r._yoyo = n)),
        r = r._next
}, kn = function(t, e) {
    return t && (Pt(t) ? t : xn[t] || function(t) {
        var e, n, i, r, s = (t + "").split("("), o = xn[s[0]];
        return o && s.length > 1 && o.config ? o.config.apply(null, ~t.indexOf("{") ? [Mn(s[1])] : (e = t,
        n = e.indexOf("(") + 1,
        i = e.indexOf(")"),
        r = e.indexOf("(", n),
        e.substring(n, ~r && r < i ? e.indexOf(")", i + 1) : i)).split(",").map(_e)) : xn._CE && Tn.test(t) ? xn._CE("", t) : o
    }(t)) || e
}, Cn = function(t, e, n, i) {
    void 0 === n && (n = function(t) {
        return 1 - e(1 - t)
    }
    ),
    void 0 === i && (i = function(t) {
        return t < .5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2
    }
    );
    var r, s = {
        easeIn: e,
        easeOut: n,
        easeInOut: i
    };
    return he(t, (function(t) {
        for (var e in xn[t] = $t[t] = s,
        xn[r = t.toLowerCase()] = n,
        s)
            xn[r + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")] = xn[t + "." + e] = s[e]
    }
    )),
    s
}, Dn = function(t) {
    return function(e) {
        return e < .5 ? (1 - t(1 - 2 * e)) / 2 : .5 + t(2 * (e - .5)) / 2
    }
}, Pn = function t(e, n, i) {
    var r = n >= 1 ? n : 1
      , s = (i || (e ? .3 : .45)) / (n < 1 ? n : 1)
      , o = s / Ot * (Math.asin(1 / r) || 0)
      , a = function(t) {
        return 1 === t ? 1 : r * Math.pow(2, -10 * t) * Ct((t - o) * s) + 1
    }
      , l = "out" === e ? a : "in" === e ? function(t) {
        return 1 - a(1 - t)
    }
    : Dn(a);
    return s = Ot / s,
    l.config = function(n, i) {
        return t(e, n, i)
    }
    ,
    l
}, An = function t(e, n) {
    void 0 === n && (n = 1.70158);
    var i = function(t) {
        return t ? --t * t * ((n + 1) * t + n) + 1 : 0
    }
      , r = "out" === e ? i : "in" === e ? function(t) {
        return 1 - i(1 - t)
    }
    : Dn(i);
    return r.config = function(n) {
        return t(e, n)
    }
    ,
    r
};
he("Linear,Quad,Cubic,Quart,Quint,Strong", (function(t, e) {
    var n = e < 5 ? e + 1 : e;
    Cn(t + ",Power" + (n - 1), e ? function(t) {
        return Math.pow(t, n)
    }
    : function(t) {
        return t
    }
    , (function(t) {
        return 1 - Math.pow(1 - t, n)
    }
    ), (function(t) {
        return t < .5 ? Math.pow(2 * t, n) / 2 : 1 - Math.pow(2 * (1 - t), n) / 2
    }
    ))
}
)),
xn.Linear.easeNone = xn.none = xn.Linear.easeIn,
Cn("Elastic", Pn("in"), Pn("out"), Pn()),
_t = 7.5625,
wt = 1 / (yt = 2.75),
Cn("Bounce", (function(t) {
    return 1 - bt(1 - t)
}
), bt = function(t) {
    return t < wt ? _t * t * t : t < .7272727272727273 ? _t * Math.pow(t - 1.5 / yt, 2) + .75 : t < .9090909090909092 ? _t * (t -= 2.25 / yt) * t + .9375 : _t * Math.pow(t - 2.625 / yt, 2) + .984375
}
),
Cn("Expo", (function(t) {
    return t ? Math.pow(2, 10 * (t - 1)) : 0
}
)),
Cn("Circ", (function(t) {
    return -(Et(1 - t * t) - 1)
}
)),
Cn("Sine", (function(t) {
    return 1 === t ? 1 : 1 - kt(t * Mt)
}
)),
Cn("Back", An("in"), An("out"), An()),
xn.SteppedEase = xn.steps = $t.SteppedEase = {
    config: function(t, e) {
        void 0 === t && (t = 1);
        var n = 1 / t
          , i = t + (e ? 0 : 1)
          , r = e ? 1 : 0;
        return function(t) {
            return ((i * Ue(0, .99999999, t) | 0) + r) * n
        }
    }
},
Tt.ease = xn["quad.out"],
he("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", (function(t) {
    return ae += t + "," + t + "Params,"
}
));
var In = function(t, e) {
    this.id = St++,
    t._gsap = this,
    this.target = t,
    this.harness = e,
    this.get = e ? e.get : ce,
    this.set = e ? e.getSetter : Qn
}
  , Ln = function() {
    function t(t) {
        this.vars = t,
        this._delay = +t.delay || 0,
        (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0,
        this._yoyo = !!t.yoyo || !!t.yoyoEase),
        this._ts = 1,
        Ne(this, +t.duration, 1, 1),
        this.data = t.data,
        nt || wn.wake()
    }
    var e = t.prototype;
    return e.delay = function(t) {
        return t || 0 === t ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + t - this._delay),
        this._delay = t,
        this) : this._delay
    }
    ,
    e.duration = function(t) {
        return arguments.length ? this.totalDuration(this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t) : this.totalDuration() && this._dur
    }
    ,
    e.totalDuration = function(t) {
        return arguments.length ? (this._dirty = 0,
        Ne(this, this._repeat < 0 ? t : (t - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
    }
    ,
    e.totalTime = function(t, e) {
        if (bn(),
        !arguments.length)
            return this._tTime;
        var n = this._dp;
        if (n && n.smoothChildTiming && this._ts) {
            for (Re(this, t),
            !n._dp || n.parent || ze(n, this); n && n.parent; )
                n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0),
                n = n.parent;
            !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && t < this._tDur || this._ts < 0 && t > 0 || !this._tDur && !t) && Be(this._dp, this, this._start - this._delay)
        }
        return (this._tTime !== t || !this._dur && !e || this._initted && 1e-8 === Math.abs(this._zTime) || !t && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = t),
        ve(this, t, e)),
        this
    }
    ,
    e.time = function(t, e) {
        return arguments.length ? this.totalTime(Math.min(this.totalDuration(), t + Pe(this)) % (this._dur + this._rDelay) || (t ? this._dur : 0), e) : this._time
    }
    ,
    e.totalProgress = function(t, e) {
        return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio
    }
    ,
    e.progress = function(t, e) {
        return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? t : 1 - t) + Pe(this), e) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio
    }
    ,
    e.iteration = function(t, e) {
        var n = this.duration() + this._rDelay;
        return arguments.length ? this.totalTime(this._time + (t - 1) * n, e) : this._repeat ? Ae(this._tTime, n) + 1 : 1
    }
    ,
    e.timeScale = function(t) {
        if (!arguments.length)
            return -1e-8 === this._rts ? 0 : this._rts;
        if (this._rts === t)
            return this;
        var e = this.parent && this._ts ? Ie(this.parent._time, this) : this._tTime;
        return this._rts = +t || 0,
        this._ts = this._ps || -1e-8 === t ? 0 : this._rts,
        this.totalTime(Ue(-this._delay, this._tDur, e), !0),
        Le(this),
        Ce(this)
    }
    ,
    e.paused = function(t) {
        return arguments.length ? (this._ps !== t && (this._ps = t,
        t ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()),
        this._ts = this._act = 0) : (bn(),
        this._ts = this._rts,
        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && 1e-8 !== Math.abs(this._zTime) && (this._tTime -= 1e-8)))),
        this) : this._ps
    }
    ,
    e.startTime = function(t) {
        if (arguments.length) {
            this._start = t;
            var e = this.parent || this._dp;
            return e && (e._sort || !this.parent) && Be(e, this, t - this._delay),
            this
        }
        return this._start
    }
    ,
    e.endTime = function(t) {
        return this._start + (Rt(t) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
    }
    ,
    e.rawTime = function(t) {
        var e = this.parent || this._dp;
        return e ? t && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Ie(e.rawTime(t), this) : this._tTime : this._tTime
    }
    ,
    e.globalTime = function(t) {
        for (var e = this, n = arguments.length ? t : e.rawTime(); e; )
            n = e._start + n / (e._ts || 1),
            e = e._dp;
        return n
    }
    ,
    e.repeat = function(t) {
        return arguments.length ? (this._repeat = t === 1 / 0 ? -2 : t,
        Ve(this)) : -2 === this._repeat ? 1 / 0 : this._repeat
    }
    ,
    e.repeatDelay = function(t) {
        if (arguments.length) {
            var e = this._time;
            return this._rDelay = t,
            Ve(this),
            e ? this.time(e) : this
        }
        return this._rDelay
    }
    ,
    e.yoyo = function(t) {
        return arguments.length ? (this._yoyo = t,
        this) : this._yoyo
    }
    ,
    e.seek = function(t, e) {
        return this.totalTime(qe(this, t), Rt(e))
    }
    ,
    e.restart = function(t, e) {
        return this.play().totalTime(t ? -this._delay : 0, Rt(e))
    }
    ,
    e.play = function(t, e) {
        return null != t && this.seek(t, e),
        this.reversed(!1).paused(!1)
    }
    ,
    e.reverse = function(t, e) {
        return null != t && this.seek(t || this.totalDuration(), e),
        this.reversed(!0).paused(!1)
    }
    ,
    e.pause = function(t, e) {
        return null != t && this.seek(t, e),
        this.paused(!0)
    }
    ,
    e.resume = function() {
        return this.paused(!1)
    }
    ,
    e.reversed = function(t) {
        return arguments.length ? (!!t !== this.reversed() && this.timeScale(-this._rts || (t ? -1e-8 : 0)),
        this) : this._rts < 0
    }
    ,
    e.invalidate = function() {
        return this._initted = this._act = 0,
        this._zTime = -1e-8,
        this
    }
    ,
    e.isActive = function() {
        var t, e = this.parent || this._dp, n = this._start;
        return !(e && !(this._ts && this._initted && e.isActive() && (t = e.rawTime(!0)) >= n && t < this.endTime(!0) - 1e-8))
    }
    ,
    e.eventCallback = function(t, e, n) {
        var i = this.vars;
        return arguments.length > 1 ? (e ? (i[t] = e,
        n && (i[t + "Params"] = n),
        "onUpdate" === t && (this._onUpdate = e)) : delete i[t],
        this) : i[t]
    }
    ,
    e.then = function(t) {
        var e = this;
        return new Promise((function(n) {
            var i = Pt(t) ? t : ye
              , r = function() {
                var t = e.then;
                e.then = null,
                Pt(i) && (i = i(e)) && (i.then || i === e) && (e.then = t),
                n(i),
                e.then = t
            };
            e._initted && 1 === e.totalProgress() && e._ts >= 0 || !e._tTime && e._ts < 0 ? r() : e._prom = r
        }
        ))
    }
    ,
    e.kill = function() {
        cn(this)
    }
    ,
    t
}();
we(Ln.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -1e-8,
    _prom: 0,
    _ps: !1,
    _rts: 1
});
var Rn = function(t) {
    function e(e, n) {
        var i;
        return void 0 === e && (e = {}),
        (i = t.call(this, e) || this).labels = {},
        i.smoothChildTiming = !!e.smoothChildTiming,
        i.autoRemoveChildren = !!e.autoRemoveChildren,
        i._sort = Rt(e.sortChildren),
        G && Be(e.parent || G, H(i), n),
        e.reversed && i.reverse(),
        e.paused && i.paused(!0),
        e.scrollTrigger && Ye(H(i), e.scrollTrigger),
        i
    }
    $(e, t);
    var n = e.prototype;
    return n.to = function(t, e, n) {
        return He(0, arguments, this),
        this
    }
    ,
    n.from = function(t, e, n) {
        return He(1, arguments, this),
        this
    }
    ,
    n.fromTo = function(t, e, n, i) {
        return He(2, arguments, this),
        this
    }
    ,
    n.set = function(t, e, n) {
        return e.duration = 0,
        e.parent = this,
        Oe(e).repeatDelay || (e.repeat = 0),
        e.immediateRender = !!e.immediateRender,
        new Hn(t,e,qe(this, n),1),
        this
    }
    ,
    n.call = function(t, e, n) {
        return Be(this, Hn.delayedCall(0, t, e), n)
    }
    ,
    n.staggerTo = function(t, e, n, i, r, s, o) {
        return n.duration = e,
        n.stagger = n.stagger || i,
        n.onComplete = s,
        n.onCompleteParams = o,
        n.parent = this,
        new Hn(t,n,qe(this, r)),
        this
    }
    ,
    n.staggerFrom = function(t, e, n, i, r, s, o) {
        return n.runBackwards = 1,
        Oe(n).immediateRender = Rt(n.immediateRender),
        this.staggerTo(t, e, n, i, r, s, o)
    }
    ,
    n.staggerFromTo = function(t, e, n, i, r, s, o, a) {
        return i.startAt = n,
        Oe(i).immediateRender = Rt(i.immediateRender),
        this.staggerTo(t, e, i, r, s, o, a)
    }
    ,
    n.render = function(t, e, n) {
        var i, r, s, o, a, l, u, c, h, f, d, p, g = this._time, m = this._dirty ? this.totalDuration() : this._tDur, v = this._dur, _ = t <= 0 ? 0 : de(t), y = this._zTime < 0 != t < 0 && (this._initted || !v);
        if (this !== G && _ > m && t >= 0 && (_ = m),
        _ !== this._tTime || n || y) {
            if (g !== this._time && v && (_ += this._time - g,
            t += this._time - g),
            i = _,
            h = this._start,
            l = !(c = this._ts),
            y && (v || (g = this._zTime),
            (t || !e) && (this._zTime = t)),
            this._repeat) {
                if (d = this._yoyo,
                a = v + this._rDelay,
                this._repeat < -1 && t < 0)
                    return this.totalTime(100 * a + t, e, n);
                if (i = de(_ % a),
                _ === m ? (o = this._repeat,
                i = v) : ((o = ~~(_ / a)) && o === _ / a && (i = v,
                o--),
                i > v && (i = v)),
                f = Ae(this._tTime, a),
                !g && this._tTime && f !== o && (f = o),
                d && 1 & o && (i = v - i,
                p = 1),
                o !== f && !this._lock) {
                    var w = d && 1 & f
                      , b = w === (d && 1 & o);
                    if (o < f && (w = !w),
                    g = w ? 0 : v,
                    this._lock = 1,
                    this.render(g || (p ? 0 : de(o * a)), e, !v)._lock = 0,
                    this._tTime = _,
                    !e && this.parent && un(this, "onRepeat"),
                    this.vars.repeatRefresh && !p && (this.invalidate()._lock = 1),
                    g && g !== this._time || l !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
                        return this;
                    if (v = this._dur,
                    m = this._tDur,
                    b && (this._lock = 2,
                    g = w ? v : -1e-4,
                    this.render(g, !0),
                    this.vars.repeatRefresh && !p && this.invalidate()),
                    this._lock = 0,
                    !this._ts && !l)
                        return this;
                    En(this, p)
                }
            }
            if (this._hasPause && !this._forcing && this._lock < 2 && (u = function(t, e, n) {
                var i;
                if (n > e)
                    for (i = t._first; i && i._start <= n; ) {
                        if ("isPause" === i.data && i._start > e)
                            return i;
                        i = i._next
                    }
                else
                    for (i = t._last; i && i._start >= n; ) {
                        if ("isPause" === i.data && i._start < e)
                            return i;
                        i = i._prev
                    }
            }(this, de(g), de(i)),
            u && (_ -= i - (i = u._start))),
            this._tTime = _,
            this._time = i,
            this._act = !c,
            this._initted || (this._onUpdate = this.vars.onUpdate,
            this._initted = 1,
            this._zTime = t,
            g = 0),
            !g && i && !e && (un(this, "onStart"),
            this._tTime !== _))
                return this;
            if (i >= g && t >= 0)
                for (r = this._first; r; ) {
                    if (s = r._next,
                    (r._act || i >= r._start) && r._ts && u !== r) {
                        if (r.parent !== this)
                            return this.render(t, e, n);
                        if (r.render(r._ts > 0 ? (i - r._start) * r._ts : (r._dirty ? r.totalDuration() : r._tDur) + (i - r._start) * r._ts, e, n),
                        i !== this._time || !this._ts && !l) {
                            u = 0,
                            s && (_ += this._zTime = -1e-8);
                            break
                        }
                    }
                    r = s
                }
            else {
                r = this._last;
                for (var x = t < 0 ? t : i; r; ) {
                    if (s = r._prev,
                    (r._act || x <= r._end) && r._ts && u !== r) {
                        if (r.parent !== this)
                            return this.render(t, e, n);
                        if (r.render(r._ts > 0 ? (x - r._start) * r._ts : (r._dirty ? r.totalDuration() : r._tDur) + (x - r._start) * r._ts, e, n),
                        i !== this._time || !this._ts && !l) {
                            u = 0,
                            s && (_ += this._zTime = x ? -1e-8 : 1e-8);
                            break
                        }
                    }
                    r = s
                }
            }
            if (u && !e && (this.pause(),
            u.render(i >= g ? 0 : -1e-8)._zTime = i >= g ? 1 : -1,
            this._ts))
                return this._start = h,
                Le(this),
                this.render(t, e, n);
            this._onUpdate && !e && un(this, "onUpdate", !0),
            (_ === m && this._tTime >= this.totalDuration() || !_ && g) && (h !== this._start && Math.abs(c) === Math.abs(this._ts) || this._lock || ((t || !v) && (_ === m && this._ts > 0 || !_ && this._ts < 0) && Ee(this, 1),
            e || t < 0 && !g || !_ && !g && m || (un(this, _ === m && t >= 0 ? "onComplete" : "onReverseComplete", !0),
            this._prom && !(_ < m && this.timeScale() > 0) && this._prom())))
        }
        return this
    }
    ,
    n.add = function(t, e) {
        var n = this;
        if (At(e) || (e = qe(this, e, t)),
        !(t instanceof Ln)) {
            if (Wt(t))
                return t.forEach((function(t) {
                    return n.add(t, e)
                }
                )),
                this;
            if (Dt(t))
                return this.addLabel(t, e);
            if (!Pt(t))
                return this;
            t = Hn.delayedCall(0, t)
        }
        return this !== t ? Be(this, t, e) : this
    }
    ,
    n.getChildren = function(t, e, n, i) {
        void 0 === t && (t = !0),
        void 0 === e && (e = !0),
        void 0 === n && (n = !0),
        void 0 === i && (i = -1e8);
        for (var r = [], s = this._first; s; )
            s._start >= i && (s instanceof Hn ? e && r.push(s) : (n && r.push(s),
            t && r.push.apply(r, s.getChildren(!0, e, n)))),
            s = s._next;
        return r
    }
    ,
    n.getById = function(t) {
        for (var e = this.getChildren(1, 1, 1), n = e.length; n--; )
            if (e[n].vars.id === t)
                return e[n]
    }
    ,
    n.remove = function(t) {
        return Dt(t) ? this.removeLabel(t) : Pt(t) ? this.killTweensOf(t) : (Se(this, t),
        t === this._recent && (this._recent = this._last),
        ke(this))
    }
    ,
    n.totalTime = function(e, n) {
        return arguments.length ? (this._forcing = 1,
        !this._dp && this._ts && (this._start = de(wn.time - (this._ts > 0 ? e / this._ts : (this.totalDuration() - e) / -this._ts))),
        t.prototype.totalTime.call(this, e, n),
        this._forcing = 0,
        this) : this._tTime
    }
    ,
    n.addLabel = function(t, e) {
        return this.labels[t] = qe(this, e),
        this
    }
    ,
    n.removeLabel = function(t) {
        return delete this.labels[t],
        this
    }
    ,
    n.addPause = function(t, e, n) {
        var i = Hn.delayedCall(0, e || Jt, n);
        return i.data = "isPause",
        this._hasPause = 1,
        Be(this, i, qe(this, t))
    }
    ,
    n.removePause = function(t) {
        var e = this._first;
        for (t = qe(this, t); e; )
            e._start === t && "isPause" === e.data && Ee(e),
            e = e._next
    }
    ,
    n.killTweensOf = function(t, e, n) {
        for (var i = this.getTweensOf(t, n), r = i.length; r--; )
            zn !== i[r] && i[r].kill(t, e);
        return this
    }
    ,
    n.getTweensOf = function(t, e) {
        for (var n, i = [], r = Ze(t), s = this._first, o = At(e); s; )
            s instanceof Hn ? ge(s._targets, r) && (o ? (!zn || s._initted && s._ts) && s.globalTime(0) <= e && s.globalTime(s.totalDuration()) > e : !e || s.isActive()) && i.push(s) : (n = s.getTweensOf(r, e)).length && i.push.apply(i, n),
            s = s._next;
        return i
    }
    ,
    n.tweenTo = function(t, e) {
        e = e || {};
        var n, i = this, r = qe(i, t), s = e, o = s.startAt, a = s.onStart, l = s.onStartParams, u = s.immediateRender, c = Hn.to(i, we({
            ease: e.ease || "none",
            lazy: !1,
            immediateRender: !1,
            time: r,
            overwrite: "auto",
            duration: e.duration || Math.abs((r - (o && "time"in o ? o.time : i._time)) / i.timeScale()) || 1e-8,
            onStart: function() {
                if (i.pause(),
                !n) {
                    var t = e.duration || Math.abs((r - (o && "time"in o ? o.time : i._time)) / i.timeScale());
                    c._dur !== t && Ne(c, t, 0, 1).render(c._time, !0, !0),
                    n = 1
                }
                a && a.apply(c, l || [])
            }
        }, e));
        return u ? c.render(0) : c
    }
    ,
    n.tweenFromTo = function(t, e, n) {
        return this.tweenTo(e, we({
            startAt: {
                time: qe(this, t)
            }
        }, n))
    }
    ,
    n.recent = function() {
        return this._recent
    }
    ,
    n.nextLabel = function(t) {
        return void 0 === t && (t = this._time),
        ln(this, qe(this, t))
    }
    ,
    n.previousLabel = function(t) {
        return void 0 === t && (t = this._time),
        ln(this, qe(this, t), 1)
    }
    ,
    n.currentLabel = function(t) {
        return arguments.length ? this.seek(t, !0) : this.previousLabel(this._time + 1e-8)
    }
    ,
    n.shiftChildren = function(t, e, n) {
        void 0 === n && (n = 0);
        for (var i, r = this._first, s = this.labels; r; )
            r._start >= n && (r._start += t,
            r._end += t),
            r = r._next;
        if (e)
            for (i in s)
                s[i] >= n && (s[i] += t);
        return ke(this)
    }
    ,
    n.invalidate = function() {
        var e = this._first;
        for (this._lock = 0; e; )
            e.invalidate(),
            e = e._next;
        return t.prototype.invalidate.call(this)
    }
    ,
    n.clear = function(t) {
        void 0 === t && (t = !0);
        for (var e, n = this._first; n; )
            e = n._next,
            this.remove(n),
            n = e;
        return this._dp && (this._time = this._tTime = this._pTime = 0),
        t && (this.labels = {}),
        ke(this)
    }
    ,
    n.totalDuration = function(t) {
        var e, n, i, r = 0, s = this, o = s._last, a = 1e8;
        if (arguments.length)
            return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -t : t));
        if (s._dirty) {
            for (i = s.parent; o; )
                e = o._prev,
                o._dirty && o.totalDuration(),
                (n = o._start) > a && s._sort && o._ts && !s._lock ? (s._lock = 1,
                Be(s, o, n - o._delay, 1)._lock = 0) : a = n,
                n < 0 && o._ts && (r -= n,
                (!i && !s._dp || i && i.smoothChildTiming) && (s._start += n / s._ts,
                s._time -= n,
                s._tTime -= n),
                s.shiftChildren(-n, !1, -1 / 0),
                a = 0),
                o._end > r && o._ts && (r = o._end),
                o = e;
            Ne(s, s === G && s._time > r ? s._time : r, 1, 1),
            s._dirty = 0
        }
        return s._tDur
    }
    ,
    e.updateRoot = function(t) {
        if (G._ts && (ve(G, Ie(t, G)),
        tt = wn.frame),
        wn.frame >= se) {
            se += xt.autoSleep || 120;
            var e = G._first;
            if ((!e || !e._ts) && xt.autoSleep && wn._listeners.length < 2) {
                for (; e && !e._ts; )
                    e = e._next;
                e || wn.sleep()
            }
        }
    }
    ,
    e
}(Ln);
we(Rn.prototype, {
    _lock: 0,
    _hasPause: 0,
    _forcing: 0
});
var zn, Bn, Yn = function(t, e, n, i, r, s, o) {
    var a, l, u, c, h, f, d, p, g = new oi(this._pt,t,e,0,1,ti,null,r), m = 0, v = 0;
    for (g.b = n,
    g.e = i,
    n += "",
    (d = ~(i += "").indexOf("random(")) && (i = on(i)),
    s && (s(p = [n, i], t, e),
    n = p[0],
    i = p[1]),
    l = n.match(Vt) || []; a = Vt.exec(i); )
        c = a[0],
        h = i.substring(m, a.index),
        u ? u = (u + 1) % 5 : "rgba(" === h.substr(-5) && (u = 1),
        c !== l[v++] && (f = parseFloat(l[v - 1]) || 0,
        g._pt = {
            _next: g._pt,
            p: h || 1 === v ? h : ",",
            s: f,
            c: "=" === c.charAt(1) ? pe(f, c) - f : parseFloat(c) - f,
            m: u && u < 4 ? Math.round : 0
        },
        m = Vt.lastIndex);
    return g.c = m < i.length ? i.substring(m, i.length) : "",
    g.fp = o,
    (jt.test(i) || d) && (g.e = 0),
    this._pt = g,
    g
}, Wn = function(t, e, n, i, r, s, o, a, l) {
    Pt(i) && (i = i(r || 0, t, s));
    var u, c = t[e], h = "get" !== n ? n : Pt(c) ? l ? t[e.indexOf("set") || !Pt(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](l) : t[e]() : c, f = Pt(c) ? l ? Gn : Un : $n;
    if (Dt(i) && (~i.indexOf("random(") && (i = on(i)),
    "=" === i.charAt(1) && ((u = pe(h, i) + (Ge(h) || 0)) || 0 === u) && (i = u)),
    h !== i || Bn)
        return isNaN(h * i) || "" === i ? (!c && !(e in t) && Kt(e, i),
        Yn.call(this, t, e, h, i, f, a || xt.stringFilter, l)) : (u = new oi(this._pt,t,e,+h || 0,i - (h || 0),"boolean" == typeof c ? Jn : Zn,0,f),
        l && (u.fp = l),
        o && u.modifier(o, this, t),
        this._pt = u)
}, Xn = function(t, e, n, i, r, s) {
    var o, a, l, u;
    if (ie[t] && !1 !== (o = new ie[t]).init(r, o.rawVars ? e[t] : function(t, e, n, i, r) {
        if (Pt(t) && (t = Vn(t, r, e, n, i)),
        !Lt(t) || t.style && t.nodeType || Wt(t) || Yt(t))
            return Dt(t) ? Vn(t, r, e, n, i) : t;
        var s, o = {};
        for (s in t)
            o[s] = Vn(t[s], r, e, n, i);
        return o
    }(e[t], i, r, s, n), n, i, s) && (n._pt = a = new oi(n._pt,r,t,0,1,o.render,o,0,o.priority),
    n !== et))
        for (l = n._ptLookup[n._targets.indexOf(r)],
        u = o._props.length; u--; )
            l[o._props[u]] = a;
    return o
}, Fn = function t(e, n) {
    var i, r, s, o, a, l, u, c, h, f, d, p, g, m = e.vars, v = m.ease, _ = m.startAt, y = m.immediateRender, w = m.lazy, b = m.onUpdate, x = m.onUpdateParams, T = m.callbackScope, O = m.runBackwards, M = m.yoyoEase, S = m.keyframes, E = m.autoRevert, k = e._dur, C = e._startAt, D = e._targets, P = e.parent, A = P && "nested" === P.data ? P.parent._targets : D, I = "auto" === e._overwrite && !U, L = e.timeline;
    if (L && (!S || !v) && (v = "none"),
    e._ease = kn(v, Tt.ease),
    e._yEase = M ? Sn(kn(!0 === M ? v : M, Tt.ease)) : 0,
    M && e._yoyo && !e._repeat && (M = e._yEase,
    e._yEase = e._ease,
    e._ease = M),
    e._from = !L && !!m.runBackwards,
    !L || S && !m.stagger) {
        if (p = (c = D[0] ? ue(D[0]).harness : 0) && m[c.prop],
        i = Te(m, te),
        C && (Ee(C.render(-1, !0)),
        C._lazy = 0),
        _)
            if (Ee(e._startAt = Hn.set(D, we({
                data: "isStart",
                overwrite: !1,
                parent: P,
                immediateRender: !0,
                lazy: Rt(w),
                startAt: null,
                delay: 0,
                onUpdate: b,
                onUpdateParams: x,
                callbackScope: T,
                stagger: 0
            }, _))),
            n < 0 && !y && !E && e._startAt.render(-1, !0),
            y) {
                if (n > 0 && !E && (e._startAt = 0),
                k && n <= 0)
                    return void (n && (e._zTime = n))
            } else
                !1 === E && (e._startAt = 0);
        else if (O && k)
            if (C)
                !E && (e._startAt = 0);
            else if (n && (y = !1),
            s = we({
                overwrite: !1,
                data: "isFromStart",
                lazy: y && Rt(w),
                immediateRender: y,
                stagger: 0,
                parent: P
            }, i),
            p && (s[c.prop] = p),
            Ee(e._startAt = Hn.set(D, s)),
            n < 0 && e._startAt.render(-1, !0),
            e._zTime = n,
            y) {
                if (!n)
                    return
            } else
                t(e._startAt, 1e-8);
        for (e._pt = e._ptCache = 0,
        w = k && Rt(w) || w && !k,
        r = 0; r < D.length; r++) {
            if (u = (a = D[r])._gsap || le(D)[r]._gsap,
            e._ptLookup[r] = f = {},
            ne[u.id] && ee.length && me(),
            d = A === D ? r : A.indexOf(a),
            c && !1 !== (h = new c).init(a, p || i, e, d, A) && (e._pt = o = new oi(e._pt,a,h.name,0,1,h.render,h,0,h.priority),
            h._props.forEach((function(t) {
                f[t] = o
            }
            )),
            h.priority && (l = 1)),
            !c || p)
                for (s in i)
                    ie[s] && (h = Xn(s, i, e, d, a, A)) ? h.priority && (l = 1) : f[s] = o = Wn.call(e, a, s, "get", i[s], d, A, 0, m.stringFilter);
            e._op && e._op[r] && e.kill(a, e._op[r]),
            I && e._pt && (zn = e,
            G.killTweensOf(a, f, e.globalTime(n)),
            g = !e.parent,
            zn = 0),
            e._pt && w && (ne[u.id] = 1)
        }
        l && si(e),
        e._onInit && e._onInit(e)
    }
    e._onUpdate = b,
    e._initted = (!e._op || e._pt) && !g,
    S && n <= 0 && L.render(1e8, !0, !0)
}, Nn = function(t, e, n, i) {
    var r, s, o = e.ease || i || "power1.inOut";
    if (Wt(e))
        s = n[t] || (n[t] = []),
        e.forEach((function(t, n) {
            return s.push({
                t: n / (e.length - 1) * 100,
                v: t,
                e: o
            })
        }
        ));
    else
        for (r in e)
            s = n[r] || (n[r] = []),
            "ease" === r || s.push({
                t: parseFloat(t),
                v: e[r],
                e: o
            })
}, Vn = function(t, e, n, i, r) {
    return Pt(t) ? t.call(e, n, i, r) : Dt(t) && ~t.indexOf("random(") ? on(t) : t
}, jn = ae + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", qn = {};
he(jn + ",id,stagger,delay,duration,paused,scrollTrigger", (function(t) {
    return qn[t] = 1
}
));
var Hn = function(t) {
    function e(e, n, i, r) {
        var s;
        "number" == typeof n && (i.duration = n,
        n = i,
        i = null);
        var o, a, l, u, c, h, f, d, p = (s = t.call(this, r ? n : Oe(n)) || this).vars, g = p.duration, m = p.delay, v = p.immediateRender, _ = p.stagger, y = p.overwrite, w = p.keyframes, b = p.defaults, x = p.scrollTrigger, T = p.yoyoEase, O = n.parent || G, M = (Wt(e) || Yt(e) ? At(e[0]) : "length"in n) ? [e] : Ze(e);
        if (s._targets = M.length ? le(M) : Qt("GSAP target " + e + " not found. https://greensock.com", !xt.nullTargetWarn) || [],
        s._ptLookup = [],
        s._overwrite = y,
        w || _ || Bt(g) || Bt(m)) {
            if (n = s.vars,
            (o = s.timeline = new Rn({
                data: "nested",
                defaults: b || {}
            })).kill(),
            o.parent = o._dp = H(s),
            o._start = 0,
            _ || Bt(g) || Bt(m)) {
                if (u = M.length,
                f = _ && tn(_),
                Lt(_))
                    for (c in _)
                        ~jn.indexOf(c) && (d || (d = {}),
                        d[c] = _[c]);
                for (a = 0; a < u; a++)
                    (l = Te(n, qn)).stagger = 0,
                    T && (l.yoyoEase = T),
                    d && be(l, d),
                    h = M[a],
                    l.duration = +Vn(g, H(s), a, h, M),
                    l.delay = (+Vn(m, H(s), a, h, M) || 0) - s._delay,
                    !_ && 1 === u && l.delay && (s._delay = m = l.delay,
                    s._start += m,
                    l.delay = 0),
                    o.to(h, l, f ? f(a, h, M) : 0),
                    o._ease = xn.none;
                o.duration() ? g = m = 0 : s.timeline = 0
            } else if (w) {
                Oe(we(o.vars.defaults, {
                    ease: "none"
                })),
                o._ease = kn(w.ease || n.ease || "none");
                var S, E, k, C = 0;
                if (Wt(w))
                    w.forEach((function(t) {
                        return o.to(M, t, ">")
                    }
                    ));
                else {
                    for (c in l = {},
                    w)
                        "ease" === c || "easeEach" === c || Nn(c, w[c], l, w.easeEach);
                    for (c in l)
                        for (S = l[c].sort((function(t, e) {
                            return t.t - e.t
                        }
                        )),
                        C = 0,
                        a = 0; a < S.length; a++)
                            (k = {
                                ease: (E = S[a]).e,
                                duration: (E.t - (a ? S[a - 1].t : 0)) / 100 * g
                            })[c] = E.v,
                            o.to(M, k, C),
                            C += k.duration;
                    o.duration() < g && o.to({}, {
                        duration: g - o.duration()
                    })
                }
            }
            g || s.duration(g = o.duration())
        } else
            s.timeline = 0;
        return !0 !== y || U || (zn = H(s),
        G.killTweensOf(M),
        zn = 0),
        Be(O, H(s), i),
        n.reversed && s.reverse(),
        n.paused && s.paused(!0),
        (v || !g && !w && s._start === de(O._time) && Rt(v) && De(H(s)) && "nested" !== O.data) && (s._tTime = -1e-8,
        s.render(Math.max(0, -m))),
        x && Ye(H(s), x),
        s
    }
    $(e, t);
    var n = e.prototype;
    return n.render = function(t, e, n) {
        var i, r, s, o, a, l, u, c, h, f = this._time, d = this._tDur, p = this._dur, g = t > d - 1e-8 && t >= 0 ? d : t < 1e-8 ? 0 : t;
        if (p) {
            if (g !== this._tTime || !t || n || !this._initted && this._tTime || this._startAt && this._zTime < 0 != t < 0) {
                if (i = g,
                c = this.timeline,
                this._repeat) {
                    if (o = p + this._rDelay,
                    this._repeat < -1 && t < 0)
                        return this.totalTime(100 * o + t, e, n);
                    if (i = de(g % o),
                    g === d ? (s = this._repeat,
                    i = p) : ((s = ~~(g / o)) && s === g / o && (i = p,
                    s--),
                    i > p && (i = p)),
                    (l = this._yoyo && 1 & s) && (h = this._yEase,
                    i = p - i),
                    a = Ae(this._tTime, o),
                    i === f && !n && this._initted)
                        return this._tTime = g,
                        this;
                    s !== a && (c && this._yEase && En(c, l),
                    !this.vars.repeatRefresh || l || this._lock || (this._lock = n = 1,
                    this.render(de(o * s), !0).invalidate()._lock = 0))
                }
                if (!this._initted) {
                    if (We(this, t < 0 ? t : i, n, e))
                        return this._tTime = 0,
                        this;
                    if (f !== this._time)
                        return this;
                    if (p !== this._dur)
                        return this.render(t, e, n)
                }
                if (this._tTime = g,
                this._time = i,
                !this._act && this._ts && (this._act = 1,
                this._lazy = 0),
                this.ratio = u = (h || this._ease)(i / p),
                this._from && (this.ratio = u = 1 - u),
                i && !f && !e && (un(this, "onStart"),
                this._tTime !== g))
                    return this;
                for (r = this._pt; r; )
                    r.r(u, r.d),
                    r = r._next;
                c && c.render(t < 0 ? t : !i && l ? -1e-8 : c._dur * c._ease(i / this._dur), e, n) || this._startAt && (this._zTime = t),
                this._onUpdate && !e && (t < 0 && this._startAt && this._startAt.render(t, !0, n),
                un(this, "onUpdate")),
                this._repeat && s !== a && this.vars.onRepeat && !e && this.parent && un(this, "onRepeat"),
                g !== this._tDur && g || this._tTime !== g || (t < 0 && this._startAt && !this._onUpdate && this._startAt.render(t, !0, !0),
                (t || !p) && (g === this._tDur && this._ts > 0 || !g && this._ts < 0) && Ee(this, 1),
                e || t < 0 && !f || !g && !f || (un(this, g === d ? "onComplete" : "onReverseComplete", !0),
                this._prom && !(g < d && this.timeScale() > 0) && this._prom()))
            }
        } else
            !function(t, e, n, i) {
                var r, s, o, a = t.ratio, l = e < 0 || !e && (!t._start && Xe(t) && (t._initted || !Fe(t)) || (t._ts < 0 || t._dp._ts < 0) && !Fe(t)) ? 0 : 1, u = t._rDelay, c = 0;
                if (u && t._repeat && (c = Ue(0, t._tDur, e),
                s = Ae(c, u),
                t._yoyo && 1 & s && (l = 1 - l),
                s !== Ae(t._tTime, u) && (a = 1 - l,
                t.vars.repeatRefresh && t._initted && t.invalidate())),
                l !== a || i || 1e-8 === t._zTime || !e && t._zTime) {
                    if (!t._initted && We(t, e, i, n))
                        return;
                    for (o = t._zTime,
                    t._zTime = e || (n ? 1e-8 : 0),
                    n || (n = e && !o),
                    t.ratio = l,
                    t._from && (l = 1 - l),
                    t._time = 0,
                    t._tTime = c,
                    r = t._pt; r; )
                        r.r(l, r.d),
                        r = r._next;
                    t._startAt && e < 0 && t._startAt.render(e, !0, !0),
                    t._onUpdate && !n && un(t, "onUpdate"),
                    c && t._repeat && !n && t.parent && un(t, "onRepeat"),
                    (e >= t._tDur || e < 0) && t.ratio === l && (l && Ee(t, 1),
                    n || (un(t, l ? "onComplete" : "onReverseComplete", !0),
                    t._prom && t._prom()))
                } else
                    t._zTime || (t._zTime = e)
            }(this, t, e, n);
        return this
    }
    ,
    n.targets = function() {
        return this._targets
    }
    ,
    n.invalidate = function() {
        return this._pt = this._op = this._startAt = this._onUpdate = this._lazy = this.ratio = 0,
        this._ptLookup = [],
        this.timeline && this.timeline.invalidate(),
        t.prototype.invalidate.call(this)
    }
    ,
    n.resetTo = function(t, e, n, i) {
        nt || wn.wake(),
        this._ts || this.play();
        var r = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
        return this._initted || Fn(this, r),
        function(t, e, n, i, r, s, o) {
            var a, l, u, c = (t._pt && t._ptCache || (t._ptCache = {}))[e];
            if (!c)
                for (c = t._ptCache[e] = [],
                l = t._ptLookup,
                u = t._targets.length; u--; ) {
                    if ((a = l[u][e]) && a.d && a.d._pt)
                        for (a = a.d._pt; a && a.p !== e; )
                            a = a._next;
                    if (!a)
                        return Bn = 1,
                        t.vars[e] = "+=0",
                        Fn(t, o),
                        Bn = 0,
                        1;
                    c.push(a)
                }
            for (u = c.length; u--; )
                (a = c[u]).s = !i && 0 !== i || r ? a.s + (i || 0) + s * a.c : i,
                a.c = n - a.s,
                a.e && (a.e = fe(n) + Ge(a.e)),
                a.b && (a.b = a.s + Ge(a.b))
        }(this, t, e, n, i, this._ease(r / this._dur), r) ? this.resetTo(t, e, n, i) : (Re(this, 0),
        this.parent || Me(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0),
        this.render(0))
    }
    ,
    n.kill = function(t, e) {
        if (void 0 === e && (e = "all"),
        !(t || e && "all" !== e))
            return this._lazy = this._pt = 0,
            this.parent ? cn(this) : this;
        if (this.timeline) {
            var n = this.timeline.totalDuration();
            return this.timeline.killTweensOf(t, e, zn && !0 !== zn.vars.overwrite)._first || cn(this),
            this.parent && n !== this.timeline.totalDuration() && Ne(this, this._dur * this.timeline._tDur / n, 0, 1),
            this
        }
        var i, r, s, o, a, l, u, c = this._targets, h = t ? Ze(t) : c, f = this._ptLookup, d = this._pt;
        if ((!e || "all" === e) && function(t, e) {
            for (var n = t.length, i = n === e.length; i && n-- && t[n] === e[n]; )
                ;
            return n < 0
        }(c, h))
            return "all" === e && (this._pt = 0),
            cn(this);
        for (i = this._op = this._op || [],
        "all" !== e && (Dt(e) && (a = {},
        he(e, (function(t) {
            return a[t] = 1
        }
        )),
        e = a),
        e = function(t, e) {
            var n, i, r, s, o = t[0] ? ue(t[0]).harness : 0, a = o && o.aliases;
            if (!a)
                return e;
            for (i in n = be({}, e),
            a)
                if (i in n)
                    for (r = (s = a[i].split(",")).length; r--; )
                        n[s[r]] = n[i];
            return n
        }(c, e)),
        u = c.length; u--; )
            if (~h.indexOf(c[u]))
                for (a in r = f[u],
                "all" === e ? (i[u] = e,
                o = r,
                s = {}) : (s = i[u] = i[u] || {},
                o = e),
                o)
                    (l = r && r[a]) && ("kill"in l.d && !0 !== l.d.kill(a) || Se(this, l, "_pt"),
                    delete r[a]),
                    "all" !== s && (s[a] = 1);
        return this._initted && !this._pt && d && cn(this),
        this
    }
    ,
    e.to = function(t, n) {
        return new e(t,n,arguments[2])
    }
    ,
    e.from = function(t, e) {
        return He(1, arguments)
    }
    ,
    e.delayedCall = function(t, n, i, r) {
        return new e(n,0,{
            immediateRender: !1,
            lazy: !1,
            overwrite: !1,
            delay: t,
            onComplete: n,
            onReverseComplete: n,
            onCompleteParams: i,
            onReverseCompleteParams: i,
            callbackScope: r
        })
    }
    ,
    e.fromTo = function(t, e, n) {
        return He(2, arguments)
    }
    ,
    e.set = function(t, n) {
        return n.duration = 0,
        n.repeatDelay || (n.repeat = 0),
        new e(t,n)
    }
    ,
    e.killTweensOf = function(t, e, n) {
        return G.killTweensOf(t, e, n)
    }
    ,
    e
}(Ln);
we(Hn.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0
}),
he("staggerTo,staggerFrom,staggerFromTo", (function(t) {
    Hn[t] = function() {
        var e = new Rn
          , n = Ke.call(arguments, 0);
        return n.splice("staggerFromTo" === t ? 5 : 4, 0, 0),
        e[t].apply(e, n)
    }
}
));
var $n = function(t, e, n) {
    return t[e] = n
}
  , Un = function(t, e, n) {
    return t[e](n)
}
  , Gn = function(t, e, n, i) {
    return t[e](i.fp, n)
}
  , Kn = function(t, e, n) {
    return t.setAttribute(e, n)
}
  , Qn = function(t, e) {
    return Pt(t[e]) ? Un : It(t[e]) && t.setAttribute ? Kn : $n
}
  , Zn = function(t, e) {
    return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e)
}
  , Jn = function(t, e) {
    return e.set(e.t, e.p, !!(e.s + e.c * t), e)
}
  , ti = function(t, e) {
    var n = e._pt
      , i = "";
    if (!t && e.b)
        i = e.b;
    else if (1 === t && e.e)
        i = e.e;
    else {
        for (; n; )
            i = n.p + (n.m ? n.m(n.s + n.c * t) : Math.round(1e4 * (n.s + n.c * t)) / 1e4) + i,
            n = n._next;
        i += e.c
    }
    e.set(e.t, e.p, i, e)
}
  , ei = function(t, e) {
    for (var n = e._pt; n; )
        n.r(t, n.d),
        n = n._next
}
  , ni = function(t, e, n, i) {
    for (var r, s = this._pt; s; )
        r = s._next,
        s.p === i && s.modifier(t, e, n),
        s = r
}
  , ii = function(t) {
    for (var e, n, i = this._pt; i; )
        n = i._next,
        i.p === t && !i.op || i.op === t ? Se(this, i, "_pt") : i.dep || (e = 1),
        i = n;
    return !e
}
  , ri = function(t, e, n, i) {
    i.mSet(t, e, i.m.call(i.tween, n, i.mt), i)
}
  , si = function(t) {
    for (var e, n, i, r, s = t._pt; s; ) {
        for (e = s._next,
        n = i; n && n.pr > s.pr; )
            n = n._next;
        (s._prev = n ? n._prev : r) ? s._prev._next = s : i = s,
        (s._next = n) ? n._prev = s : r = s,
        s = e
    }
    t._pt = i
}
  , oi = function() {
    function t(t, e, n, i, r, s, o, a, l) {
        this.t = e,
        this.s = i,
        this.c = r,
        this.p = n,
        this.r = s || Zn,
        this.d = o || this,
        this.set = a || $n,
        this.pr = l || 0,
        this._next = t,
        t && (t._prev = this)
    }
    return t.prototype.modifier = function(t, e, n) {
        this.mSet = this.mSet || this.set,
        this.set = ri,
        this.m = t,
        this.mt = n,
        this.tween = e
    }
    ,
    t
}();
he(ae + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", (function(t) {
    return te[t] = 1
}
)),
$t.TweenMax = $t.TweenLite = Hn,
$t.TimelineLite = $t.TimelineMax = Rn,
G = new Rn({
    sortChildren: !1,
    defaults: Tt,
    autoRemoveChildren: !0,
    id: "root",
    smoothChildTiming: !0
}),
xt.stringFilter = yn;
var ai = {
    registerPlugin: function() {
        for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
            e[n] = arguments[n];
        e.forEach((function(t) {
            return hn(t)
        }
        ))
    },
    timeline: function(t) {
        return new Rn(t)
    },
    getTweensOf: function(t, e) {
        return G.getTweensOf(t, e)
    },
    getProperty: function(t, e, n, i) {
        Dt(t) && (t = Ze(t)[0]);
        var r = ue(t || {}).get
          , s = n ? ye : _e;
        return "native" === n && (n = ""),
        t ? e ? s((ie[e] && ie[e].get || r)(t, e, n, i)) : function(e, n, i) {
            return s((ie[e] && ie[e].get || r)(t, e, n, i))
        }
        : t
    },
    quickSetter: function(t, e, n) {
        if ((t = Ze(t)).length > 1) {
            var i = t.map((function(t) {
                return ci.quickSetter(t, e, n)
            }
            ))
              , r = i.length;
            return function(t) {
                for (var e = r; e--; )
                    i[e](t)
            }
        }
        t = t[0] || {};
        var s = ie[e]
          , o = ue(t)
          , a = o.harness && (o.harness.aliases || {})[e] || e
          , l = s ? function(e) {
            var i = new s;
            et._pt = 0,
            i.init(t, n ? e + n : e, et, 0, [t]),
            i.render(1, i),
            et._pt && ei(1, et)
        }
        : o.set(t, a);
        return s ? l : function(e) {
            return l(t, a, n ? e + n : e, o, 1)
        }
    },
    quickTo: function(t, e, n) {
        var i, r = ci.to(t, be(((i = {})[e] = "+=0.1",
        i.paused = !0,
        i), n || {})), s = function(t, n, i) {
            return r.resetTo(e, t, n, i)
        };
        return s.tween = r,
        s
    },
    isTweening: function(t) {
        return G.getTweensOf(t, !0).length > 0
    },
    defaults: function(t) {
        return t && t.ease && (t.ease = kn(t.ease, Tt.ease)),
        xe(Tt, t || {})
    },
    config: function(t) {
        return xe(xt, t || {})
    },
    registerEffect: function(t) {
        var e = t.name
          , n = t.effect
          , i = t.plugins
          , r = t.defaults
          , s = t.extendTimeline;
        (i || "").split(",").forEach((function(t) {
            return t && !ie[t] && !$t[t] && Qt(e + " effect requires " + t + " plugin.")
        }
        )),
        re[e] = function(t, e, i) {
            return n(Ze(t), we(e || {}, r), i)
        }
        ,
        s && (Rn.prototype[e] = function(t, n, i) {
            return this.add(re[e](t, Lt(n) ? n : (i = n) && {}, this), i)
        }
        )
    },
    registerEase: function(t, e) {
        xn[t] = kn(e)
    },
    parseEase: function(t, e) {
        return arguments.length ? kn(t, e) : xn
    },
    getById: function(t) {
        return G.getById(t)
    },
    exportRoot: function(t, e) {
        void 0 === t && (t = {});
        var n, i, r = new Rn(t);
        for (r.smoothChildTiming = Rt(t.smoothChildTiming),
        G.remove(r),
        r._dp = 0,
        r._time = r._tTime = G._time,
        n = G._first; n; )
            i = n._next,
            !e && !n._dur && n instanceof Hn && n.vars.onComplete === n._targets[0] || Be(r, n, n._start - n._delay),
            n = i;
        return Be(G, r, 0),
        r
    },
    utils: {
        wrap: function t(e, n, i) {
            var r = n - e;
            return Wt(e) ? sn(e, t(0, e.length), n) : $e(i, (function(t) {
                return (r + (t - e) % r) % r + e
            }
            ))
        },
        wrapYoyo: function t(e, n, i) {
            var r = n - e
              , s = 2 * r;
            return Wt(e) ? sn(e, t(0, e.length - 1), n) : $e(i, (function(t) {
                return e + ((t = (s + (t - e) % s) % s || 0) > r ? s - t : t)
            }
            ))
        },
        distribute: tn,
        random: rn,
        snap: nn,
        normalize: function(t, e, n) {
            return an(t, e, 0, 1, n)
        },
        getUnit: Ge,
        clamp: function(t, e, n) {
            return $e(n, (function(n) {
                return Ue(t, e, n)
            }
            ))
        },
        splitColor: pn,
        toArray: Ze,
        selector: function(t) {
            return t = Ze(t)[0] || Qt("Invalid scope") || {},
            function(e) {
                var n = t.current || t.nativeElement || t;
                return Ze(e, n.querySelectorAll ? n : n === t ? Qt("Invalid scope") || Z.createElement("div") : t)
            }
        },
        mapRange: an,
        pipe: function() {
            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
                e[n] = arguments[n];
            return function(t) {
                return e.reduce((function(t, e) {
                    return e(t)
                }
                ), t)
            }
        },
        unitize: function(t, e) {
            return function(n) {
                return t(parseFloat(n)) + (e || Ge(n))
            }
        },
        interpolate: function t(e, n, i, r) {
            var s = isNaN(e + n) ? 0 : function(t) {
                return (1 - t) * e + t * n
            }
            ;
            if (!s) {
                var o, a, l, u, c, h = Dt(e), f = {};
                if (!0 === i && (r = 1) && (i = null),
                h)
                    e = {
                        p: e
                    },
                    n = {
                        p: n
                    };
                else if (Wt(e) && !Wt(n)) {
                    for (l = [],
                    u = e.length,
                    c = u - 2,
                    a = 1; a < u; a++)
                        l.push(t(e[a - 1], e[a]));
                    u--,
                    s = function(t) {
                        t *= u;
                        var e = Math.min(c, ~~t);
                        return l[e](t - e)
                    }
                    ,
                    i = n
                } else
                    r || (e = be(Wt(e) ? [] : {}, e));
                if (!l) {
                    for (o in n)
                        Wn.call(f, e, o, "get", n[o]);
                    s = function(t) {
                        return ei(t, f) || (h ? e.p : e)
                    }
                }
            }
            return $e(i, s)
        },
        shuffle: Je
    },
    install: Gt,
    effects: re,
    ticker: wn,
    updateRoot: Rn.updateRoot,
    plugins: ie,
    globalTimeline: G,
    core: {
        PropTween: oi,
        globals: Zt,
        Tween: Hn,
        Timeline: Rn,
        Animation: Ln,
        getCache: ue,
        _removeLinkedListItem: Se,
        suppressOverwrites: function(t) {
            return U = t
        }
    }
};
he("to,from,fromTo,delayedCall,set,killTweensOf", (function(t) {
    return ai[t] = Hn[t]
}
)),
wn.add(Rn.updateRoot),
et = ai.to({}, {
    duration: 0
});
var li = function(t, e) {
    for (var n = t._pt; n && n.p !== e && n.op !== e && n.fp !== e; )
        n = n._next;
    return n
}
  , ui = function(t, e) {
    return {
        name: t,
        rawVars: 1,
        init: function(t, n, i) {
            i._onInit = function(t) {
                var i, r;
                if (Dt(n) && (i = {},
                he(n, (function(t) {
                    return i[t] = 1
                }
                )),
                n = i),
                e) {
                    for (r in i = {},
                    n)
                        i[r] = e(n[r]);
                    n = i
                }
                !function(t, e) {
                    var n, i, r, s = t._targets;
                    for (n in e)
                        for (i = s.length; i--; )
                            (r = t._ptLookup[i][n]) && (r = r.d) && (r._pt && (r = li(r, n)),
                            r && r.modifier && r.modifier(e[n], t, s[i], n))
                }(t, n)
            }
        }
    }
}
  , ci = ai.registerPlugin({
    name: "attr",
    init: function(t, e, n, i, r) {
        var s, o;
        for (s in e)
            (o = this.add(t, "setAttribute", (t.getAttribute(s) || 0) + "", e[s], i, r, 0, 0, s)) && (o.op = s),
            this._props.push(s)
    }
}, {
    name: "endArray",
    init: function(t, e) {
        for (var n = e.length; n--; )
            this.add(t, n, t[n] || 0, e[n])
    }
}, ui("roundProps", en), ui("modifiers"), ui("snap", nn)) || ai;
Hn.version = Rn.version = ci.version = "3.10.4",
J = 1,
zt() && bn();
xn.Power0,
xn.Power1,
xn.Power2,
xn.Power3,
xn.Power4,
xn.Linear,
xn.Quad,
xn.Cubic,
xn.Quart,
xn.Quint,
xn.Strong,
xn.Elastic,
xn.Back,
xn.SteppedEase,
xn.Bounce,
xn.Sine,
xn.Expo,
xn.Circ;
var hi, fi, di, pi, gi, mi, vi, _i = {}, yi = 180 / Math.PI, wi = Math.PI / 180, bi = Math.atan2, xi = /([A-Z])/g, Ti = /(left|right|width|margin|padding|x)/i, Oi = /[\s,\(]\S/, Mi = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity"
}, Si = function(t, e) {
    return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
}, Ei = function(t, e) {
    return e.set(e.t, e.p, 1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
}, ki = function(t, e) {
    return e.set(e.t, e.p, t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b, e)
}, Ci = function(t, e) {
    var n = e.s + e.c * t;
    e.set(e.t, e.p, ~~(n + (n < 0 ? -.5 : .5)) + e.u, e)
}, Di = function(t, e) {
    return e.set(e.t, e.p, t ? e.e : e.b, e)
}, Pi = function(t, e) {
    return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e)
}, Ai = function(t, e, n) {
    return t.style[e] = n
}, Ii = function(t, e, n) {
    return t.style.setProperty(e, n)
}, Li = function(t, e, n) {
    return t._gsap[e] = n
}, Ri = function(t, e, n) {
    return t._gsap.scaleX = t._gsap.scaleY = n
}, zi = function(t, e, n, i, r) {
    var s = t._gsap;
    s.scaleX = s.scaleY = n,
    s.renderTransform(r, s)
}, Bi = function(t, e, n, i, r) {
    var s = t._gsap;
    s[e] = n,
    s.renderTransform(r, s)
}, Yi = "transform", Wi = Yi + "Origin", Xi = function(t, e) {
    var n = fi.createElementNS ? fi.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : fi.createElement(t);
    return n.style ? n : fi.createElement(t)
}, Fi = function t(e, n, i) {
    var r = getComputedStyle(e);
    return r[n] || r.getPropertyValue(n.replace(xi, "-$1").toLowerCase()) || r.getPropertyValue(n) || !i && t(e, Vi(n) || n, 1) || ""
}, Ni = "O,Moz,ms,Ms,Webkit".split(","), Vi = function(t, e, n) {
    var i = (e || gi).style
      , r = 5;
    if (t in i && !n)
        return t;
    for (t = t.charAt(0).toUpperCase() + t.substr(1); r-- && !(Ni[r] + t in i); )
        ;
    return r < 0 ? null : (3 === r ? "ms" : r >= 0 ? Ni[r] : "") + t
}, ji = function() {
    "undefined" != typeof window && window.document && (hi = window,
    fi = hi.document,
    di = fi.documentElement,
    gi = Xi("div") || {
        style: {}
    },
    Xi("div"),
    Yi = Vi(Yi),
    Wi = Yi + "Origin",
    gi.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0",
    vi = !!Vi("perspective"),
    pi = 1)
}, qi = function t(e) {
    var n, i = Xi("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = this.parentNode, s = this.nextSibling, o = this.style.cssText;
    if (di.appendChild(i),
    i.appendChild(this),
    this.style.display = "block",
    e)
        try {
            n = this.getBBox(),
            this._gsapBBox = this.getBBox,
            this.getBBox = t
        } catch (t) {}
    else
        this._gsapBBox && (n = this._gsapBBox());
    return r && (s ? r.insertBefore(this, s) : r.appendChild(this)),
    di.removeChild(i),
    this.style.cssText = o,
    n
}, Hi = function(t, e) {
    for (var n = e.length; n--; )
        if (t.hasAttribute(e[n]))
            return t.getAttribute(e[n])
}, $i = function(t) {
    var e;
    try {
        e = t.getBBox()
    } catch (n) {
        e = qi.call(t, !0)
    }
    return e && (e.width || e.height) || t.getBBox === qi || (e = qi.call(t, !0)),
    !e || e.width || e.x || e.y ? e : {
        x: +Hi(t, ["x", "cx", "x1"]) || 0,
        y: +Hi(t, ["y", "cy", "y1"]) || 0,
        width: 0,
        height: 0
    }
}, Ui = function(t) {
    return !(!t.getCTM || t.parentNode && !t.ownerSVGElement || !$i(t))
}, Gi = function(t, e) {
    if (e) {
        var n = t.style;
        e in _i && e !== Wi && (e = Yi),
        n.removeProperty ? ("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6) || (e = "-" + e),
        n.removeProperty(e.replace(xi, "-$1").toLowerCase())) : n.removeAttribute(e)
    }
}, Ki = function(t, e, n, i, r, s) {
    var o = new oi(t._pt,e,n,0,1,s ? Pi : Di);
    return t._pt = o,
    o.b = i,
    o.e = r,
    t._props.push(n),
    o
}, Qi = {
    deg: 1,
    rad: 1,
    turn: 1
}, Zi = function t(e, n, i, r) {
    var s, o, a, l, u = parseFloat(i) || 0, c = (i + "").trim().substr((u + "").length) || "px", h = gi.style, f = Ti.test(n), d = "svg" === e.tagName.toLowerCase(), p = (d ? "client" : "offset") + (f ? "Width" : "Height"), g = 100, m = "px" === r, v = "%" === r;
    return r === c || !u || Qi[r] || Qi[c] ? u : ("px" !== c && !m && (u = t(e, n, i, "px")),
    l = e.getCTM && Ui(e),
    !v && "%" !== c || !_i[n] && !~n.indexOf("adius") ? (h[f ? "width" : "height"] = g + (m ? c : r),
    o = ~n.indexOf("adius") || "em" === r && e.appendChild && !d ? e : e.parentNode,
    l && (o = (e.ownerSVGElement || {}).parentNode),
    o && o !== fi && o.appendChild || (o = fi.body),
    (a = o._gsap) && v && a.width && f && a.time === wn.time ? fe(u / a.width * g) : ((v || "%" === c) && (h.position = Fi(e, "position")),
    o === e && (h.position = "static"),
    o.appendChild(gi),
    s = gi[p],
    o.removeChild(gi),
    h.position = "absolute",
    f && v && ((a = ue(o)).time = wn.time,
    a.width = o[p]),
    fe(m ? s * u / g : s && u ? g / s * u : 0))) : (s = l ? e.getBBox()[f ? "width" : "height"] : e[p],
    fe(v ? u / s * g : u / 100 * s)))
}, Ji = function(t, e, n, i) {
    var r;
    return pi || ji(),
    e in Mi && "transform" !== e && ~(e = Mi[e]).indexOf(",") && (e = e.split(",")[0]),
    _i[e] && "transform" !== e ? (r = cr(t, i),
    r = "transformOrigin" !== e ? r[e] : r.svg ? r.origin : hr(Fi(t, Wi)) + " " + r.zOrigin + "px") : (!(r = t.style[e]) || "auto" === r || i || ~(r + "").indexOf("calc(")) && (r = ir[e] && ir[e](t, e, n) || Fi(t, e) || ce(t, e) || ("opacity" === e ? 1 : 0)),
    n && !~(r + "").trim().indexOf(" ") ? Zi(t, e, r, n) + n : r
}, tr = function(t, e, n, i) {
    if (!n || "none" === n) {
        var r = Vi(e, t, 1)
          , s = r && Fi(t, r, 1);
        s && s !== n ? (e = r,
        n = s) : "borderColor" === e && (n = Fi(t, "borderTopColor"))
    }
    var o, a, l, u, c, h, f, d, p, g, m, v = new oi(this._pt,t.style,e,0,1,ti), _ = 0, y = 0;
    if (v.b = n,
    v.e = i,
    n += "",
    "auto" === (i += "") && (t.style[e] = i,
    i = Fi(t, e) || i,
    t.style[e] = n),
    yn(o = [n, i]),
    i = o[1],
    l = (n = o[0]).match(Nt) || [],
    (i.match(Nt) || []).length) {
        for (; a = Nt.exec(i); )
            f = a[0],
            p = i.substring(_, a.index),
            c ? c = (c + 1) % 5 : "rgba(" !== p.substr(-5) && "hsla(" !== p.substr(-5) || (c = 1),
            f !== (h = l[y++] || "") && (u = parseFloat(h) || 0,
            m = h.substr((u + "").length),
            "=" === f.charAt(1) && (f = pe(u, f) + m),
            d = parseFloat(f),
            g = f.substr((d + "").length),
            _ = Nt.lastIndex - g.length,
            g || (g = g || xt.units[e] || m,
            _ === i.length && (i += g,
            v.e += g)),
            m !== g && (u = Zi(t, e, h, g) || 0),
            v._pt = {
                _next: v._pt,
                p: p || 1 === y ? p : ",",
                s: u,
                c: d - u,
                m: c && c < 4 || "zIndex" === e ? Math.round : 0
            });
        v.c = _ < i.length ? i.substring(_, i.length) : ""
    } else
        v.r = "display" === e && "none" === i ? Pi : Di;
    return jt.test(i) && (v.e = 0),
    this._pt = v,
    v
}, er = {
    top: "0%",
    bottom: "100%",
    left: "0%",
    right: "100%",
    center: "50%"
}, nr = function(t, e) {
    if (e.tween && e.tween._time === e.tween._dur) {
        var n, i, r, s = e.t, o = s.style, a = e.u, l = s._gsap;
        if ("all" === a || !0 === a)
            o.cssText = "",
            i = 1;
        else
            for (r = (a = a.split(",")).length; --r > -1; )
                n = a[r],
                _i[n] && (i = 1,
                n = "transformOrigin" === n ? Wi : Yi),
                Gi(s, n);
        i && (Gi(s, Yi),
        l && (l.svg && s.removeAttribute("transform"),
        cr(s, 1),
        l.uncache = 1))
    }
}, ir = {
    clearProps: function(t, e, n, i, r) {
        if ("isFromStart" !== r.data) {
            var s = t._pt = new oi(t._pt,e,n,0,0,nr);
            return s.u = i,
            s.pr = -10,
            s.tween = r,
            t._props.push(n),
            1
        }
    }
}, rr = [1, 0, 0, 1, 0, 0], sr = {}, or = function(t) {
    return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t
}, ar = function(t) {
    var e = Fi(t, Yi);
    return or(e) ? rr : e.substr(7).match(Ft).map(fe)
}, lr = function(t, e) {
    var n, i, r, s, o = t._gsap || ue(t), a = t.style, l = ar(t);
    return o.svg && t.getAttribute("transform") ? "1,0,0,1,0,0" === (l = [(r = t.transform.baseVal.consolidate().matrix).a, r.b, r.c, r.d, r.e, r.f]).join(",") ? rr : l : (l !== rr || t.offsetParent || t === di || o.svg || (r = a.display,
    a.display = "block",
    (n = t.parentNode) && t.offsetParent || (s = 1,
    i = t.nextSibling,
    di.appendChild(t)),
    l = ar(t),
    r ? a.display = r : Gi(t, "display"),
    s && (i ? n.insertBefore(t, i) : n ? n.appendChild(t) : di.removeChild(t))),
    e && l.length > 6 ? [l[0], l[1], l[4], l[5], l[12], l[13]] : l)
}, ur = function(t, e, n, i, r, s) {
    var o, a, l, u = t._gsap, c = r || lr(t, !0), h = u.xOrigin || 0, f = u.yOrigin || 0, d = u.xOffset || 0, p = u.yOffset || 0, g = c[0], m = c[1], v = c[2], _ = c[3], y = c[4], w = c[5], b = e.split(" "), x = parseFloat(b[0]) || 0, T = parseFloat(b[1]) || 0;
    n ? c !== rr && (a = g * _ - m * v) && (l = x * (-m / a) + T * (g / a) - (g * w - m * y) / a,
    x = x * (_ / a) + T * (-v / a) + (v * w - _ * y) / a,
    T = l) : (x = (o = $i(t)).x + (~b[0].indexOf("%") ? x / 100 * o.width : x),
    T = o.y + (~(b[1] || b[0]).indexOf("%") ? T / 100 * o.height : T)),
    i || !1 !== i && u.smooth ? (y = x - h,
    w = T - f,
    u.xOffset = d + (y * g + w * v) - y,
    u.yOffset = p + (y * m + w * _) - w) : u.xOffset = u.yOffset = 0,
    u.xOrigin = x,
    u.yOrigin = T,
    u.smooth = !!i,
    u.origin = e,
    u.originIsAbsolute = !!n,
    t.style[Wi] = "0px 0px",
    s && (Ki(s, u, "xOrigin", h, x),
    Ki(s, u, "yOrigin", f, T),
    Ki(s, u, "xOffset", d, u.xOffset),
    Ki(s, u, "yOffset", p, u.yOffset)),
    t.setAttribute("data-svg-origin", x + " " + T)
}, cr = function(t, e) {
    var n = t._gsap || new In(t);
    if ("x"in n && !e && !n.uncache)
        return n;
    var i, r, s, o, a, l, u, c, h, f, d, p, g, m, v, _, y, w, b, x, T, O, M, S, E, k, C, D, P, A, I, L, R = t.style, z = n.scaleX < 0, B = "px", Y = "deg", W = Fi(t, Wi) || "0";
    return i = r = s = l = u = c = h = f = d = 0,
    o = a = 1,
    n.svg = !(!t.getCTM || !Ui(t)),
    m = lr(t, n.svg),
    n.svg && (S = (!n.uncache || "0px 0px" === W) && !e && t.getAttribute("data-svg-origin"),
    ur(t, S || W, !!S || n.originIsAbsolute, !1 !== n.smooth, m)),
    p = n.xOrigin || 0,
    g = n.yOrigin || 0,
    m !== rr && (w = m[0],
    b = m[1],
    x = m[2],
    T = m[3],
    i = O = m[4],
    r = M = m[5],
    6 === m.length ? (o = Math.sqrt(w * w + b * b),
    a = Math.sqrt(T * T + x * x),
    l = w || b ? bi(b, w) * yi : 0,
    (h = x || T ? bi(x, T) * yi + l : 0) && (a *= Math.abs(Math.cos(h * wi))),
    n.svg && (i -= p - (p * w + g * x),
    r -= g - (p * b + g * T))) : (L = m[6],
    A = m[7],
    C = m[8],
    D = m[9],
    P = m[10],
    I = m[11],
    i = m[12],
    r = m[13],
    s = m[14],
    u = (v = bi(L, P)) * yi,
    v && (S = O * (_ = Math.cos(-v)) + C * (y = Math.sin(-v)),
    E = M * _ + D * y,
    k = L * _ + P * y,
    C = O * -y + C * _,
    D = M * -y + D * _,
    P = L * -y + P * _,
    I = A * -y + I * _,
    O = S,
    M = E,
    L = k),
    c = (v = bi(-x, P)) * yi,
    v && (_ = Math.cos(-v),
    I = T * (y = Math.sin(-v)) + I * _,
    w = S = w * _ - C * y,
    b = E = b * _ - D * y,
    x = k = x * _ - P * y),
    l = (v = bi(b, w)) * yi,
    v && (S = w * (_ = Math.cos(v)) + b * (y = Math.sin(v)),
    E = O * _ + M * y,
    b = b * _ - w * y,
    M = M * _ - O * y,
    w = S,
    O = E),
    u && Math.abs(u) + Math.abs(l) > 359.9 && (u = l = 0,
    c = 180 - c),
    o = fe(Math.sqrt(w * w + b * b + x * x)),
    a = fe(Math.sqrt(M * M + L * L)),
    v = bi(O, M),
    h = Math.abs(v) > 2e-4 ? v * yi : 0,
    d = I ? 1 / (I < 0 ? -I : I) : 0),
    n.svg && (S = t.getAttribute("transform"),
    n.forceCSS = t.setAttribute("transform", "") || !or(Fi(t, Yi)),
    S && t.setAttribute("transform", S))),
    Math.abs(h) > 90 && Math.abs(h) < 270 && (z ? (o *= -1,
    h += l <= 0 ? 180 : -180,
    l += l <= 0 ? 180 : -180) : (a *= -1,
    h += h <= 0 ? 180 : -180)),
    e = e || n.uncache,
    n.x = i - ((n.xPercent = i && (!e && n.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-i) ? -50 : 0))) ? t.offsetWidth * n.xPercent / 100 : 0) + B,
    n.y = r - ((n.yPercent = r && (!e && n.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-r) ? -50 : 0))) ? t.offsetHeight * n.yPercent / 100 : 0) + B,
    n.z = s + B,
    n.scaleX = fe(o),
    n.scaleY = fe(a),
    n.rotation = fe(l) + Y,
    n.rotationX = fe(u) + Y,
    n.rotationY = fe(c) + Y,
    n.skewX = h + Y,
    n.skewY = f + Y,
    n.transformPerspective = d + B,
    (n.zOrigin = parseFloat(W.split(" ")[2]) || 0) && (R[Wi] = hr(W)),
    n.xOffset = n.yOffset = 0,
    n.force3D = xt.force3D,
    n.renderTransform = n.svg ? gr : vi ? pr : dr,
    n.uncache = 0,
    n
}, hr = function(t) {
    return (t = t.split(" "))[0] + " " + t[1]
}, fr = function(t, e, n) {
    var i = Ge(e);
    return fe(parseFloat(e) + parseFloat(Zi(t, "x", n + "px", i))) + i
}, dr = function(t, e) {
    e.z = "0px",
    e.rotationY = e.rotationX = "0deg",
    e.force3D = 0,
    pr(t, e)
}, pr = function(t, e) {
    var n = e || this
      , i = n.xPercent
      , r = n.yPercent
      , s = n.x
      , o = n.y
      , a = n.z
      , l = n.rotation
      , u = n.rotationY
      , c = n.rotationX
      , h = n.skewX
      , f = n.skewY
      , d = n.scaleX
      , p = n.scaleY
      , g = n.transformPerspective
      , m = n.force3D
      , v = n.target
      , _ = n.zOrigin
      , y = ""
      , w = "auto" === m && t && 1 !== t || !0 === m;
    if (_ && ("0deg" !== c || "0deg" !== u)) {
        var b, x = parseFloat(u) * wi, T = Math.sin(x), O = Math.cos(x);
        x = parseFloat(c) * wi,
        b = Math.cos(x),
        s = fr(v, s, T * b * -_),
        o = fr(v, o, -Math.sin(x) * -_),
        a = fr(v, a, O * b * -_ + _)
    }
    "0px" !== g && (y += "perspective(" + g + ") "),
    (i || r) && (y += "translate(" + i + "%, " + r + "%) "),
    (w || "0px" !== s || "0px" !== o || "0px" !== a) && (y += "0px" !== a || w ? "translate3d(" + s + ", " + o + ", " + a + ") " : "translate(" + s + ", " + o + ") "),
    "0deg" !== l && (y += "rotate(" + l + ") "),
    "0deg" !== u && (y += "rotateY(" + u + ") "),
    "0deg" !== c && (y += "rotateX(" + c + ") "),
    "0deg" === h && "0deg" === f || (y += "skew(" + h + ", " + f + ") "),
    1 === d && 1 === p || (y += "scale(" + d + ", " + p + ") "),
    v.style[Yi] = y || "translate(0, 0)"
}, gr = function(t, e) {
    var n, i, r, s, o, a = e || this, l = a.xPercent, u = a.yPercent, c = a.x, h = a.y, f = a.rotation, d = a.skewX, p = a.skewY, g = a.scaleX, m = a.scaleY, v = a.target, _ = a.xOrigin, y = a.yOrigin, w = a.xOffset, b = a.yOffset, x = a.forceCSS, T = parseFloat(c), O = parseFloat(h);
    f = parseFloat(f),
    d = parseFloat(d),
    (p = parseFloat(p)) && (d += p = parseFloat(p),
    f += p),
    f || d ? (f *= wi,
    d *= wi,
    n = Math.cos(f) * g,
    i = Math.sin(f) * g,
    r = Math.sin(f - d) * -m,
    s = Math.cos(f - d) * m,
    d && (p *= wi,
    o = Math.tan(d - p),
    r *= o = Math.sqrt(1 + o * o),
    s *= o,
    p && (o = Math.tan(p),
    n *= o = Math.sqrt(1 + o * o),
    i *= o)),
    n = fe(n),
    i = fe(i),
    r = fe(r),
    s = fe(s)) : (n = g,
    s = m,
    i = r = 0),
    (T && !~(c + "").indexOf("px") || O && !~(h + "").indexOf("px")) && (T = Zi(v, "x", c, "px"),
    O = Zi(v, "y", h, "px")),
    (_ || y || w || b) && (T = fe(T + _ - (_ * n + y * r) + w),
    O = fe(O + y - (_ * i + y * s) + b)),
    (l || u) && (o = v.getBBox(),
    T = fe(T + l / 100 * o.width),
    O = fe(O + u / 100 * o.height)),
    o = "matrix(" + n + "," + i + "," + r + "," + s + "," + T + "," + O + ")",
    v.setAttribute("transform", o),
    x && (v.style[Yi] = o)
}, mr = function(t, e, n, i, r) {
    var s, o, a = 360, l = Dt(r), u = parseFloat(r) * (l && ~r.indexOf("rad") ? yi : 1) - i, c = i + u + "deg";
    return l && ("short" === (s = r.split("_")[1]) && (u %= a) !== u % 180 && (u += u < 0 ? a : -360),
    "cw" === s && u < 0 ? u = (u + 36e9) % a - ~~(u / a) * a : "ccw" === s && u > 0 && (u = (u - 36e9) % a - ~~(u / a) * a)),
    t._pt = o = new oi(t._pt,e,n,i,u,Ei),
    o.e = c,
    o.u = "deg",
    t._props.push(n),
    o
}, vr = function(t, e) {
    for (var n in e)
        t[n] = e[n];
    return t
}, _r = function(t, e, n) {
    var i, r, s, o, a, l, u, c = vr({}, n._gsap), h = n.style;
    for (r in c.svg ? (s = n.getAttribute("transform"),
    n.setAttribute("transform", ""),
    h[Yi] = e,
    i = cr(n, 1),
    Gi(n, Yi),
    n.setAttribute("transform", s)) : (s = getComputedStyle(n)[Yi],
    h[Yi] = e,
    i = cr(n, 1),
    h[Yi] = s),
    _i)
        (s = c[r]) !== (o = i[r]) && "perspective,force3D,transformOrigin,svgOrigin".indexOf(r) < 0 && (a = Ge(s) !== (u = Ge(o)) ? Zi(n, r, s, u) : parseFloat(s),
        l = parseFloat(o),
        t._pt = new oi(t._pt,i,r,a,l - a,Si),
        t._pt.u = u || 0,
        t._props.push(r));
    vr(i, c)
};
he("padding,margin,Width,Radius", (function(t, e) {
    var n = "Top"
      , i = "Right"
      , r = "Bottom"
      , s = "Left"
      , o = (e < 3 ? [n, i, r, s] : [n + s, n + i, r + i, r + s]).map((function(n) {
        return e < 2 ? t + n : "border" + n + t
    }
    ));
    ir[e > 1 ? "border" + t : t] = function(t, e, n, i, r) {
        var s, a;
        if (arguments.length < 4)
            return s = o.map((function(e) {
                return Ji(t, e, n)
            }
            )),
            5 === (a = s.join(" ")).split(s[0]).length ? s[0] : a;
        s = (i + "").split(" "),
        a = {},
        o.forEach((function(t, e) {
            return a[t] = s[e] = s[e] || s[(e - 1) / 2 | 0]
        }
        )),
        t.init(e, a, r)
    }
}
));
var yr, wr, br, xr = {
    name: "css",
    register: ji,
    targetTest: function(t) {
        return t.style && t.nodeType
    },
    init: function(t, e, n, i, r) {
        var s, o, a, l, u, c, h, f, d, p, g, m, v, _, y, w, b, x, T, O = this._props, M = t.style, S = n.vars.startAt;
        for (h in pi || ji(),
        e)
            if ("autoRound" !== h && (o = e[h],
            !ie[h] || !Xn(h, e, n, i, t, r)))
                if (u = typeof o,
                c = ir[h],
                "function" === u && (u = typeof (o = o.call(n, i, t, r))),
                "string" === u && ~o.indexOf("random(") && (o = on(o)),
                c)
                    c(this, t, h, o, n) && (y = 1);
                else if ("--" === h.substr(0, 2))
                    s = (getComputedStyle(t).getPropertyValue(h) + "").trim(),
                    o += "",
                    vn.lastIndex = 0,
                    vn.test(s) || (f = Ge(s),
                    d = Ge(o)),
                    d ? f !== d && (s = Zi(t, h, s, d) + d) : f && (o += f),
                    this.add(M, "setProperty", s, o, i, r, 0, 0, h),
                    O.push(h);
                else if ("undefined" !== u) {
                    if (S && h in S ? (s = "function" == typeof S[h] ? S[h].call(n, i, t, r) : S[h],
                    Dt(s) && ~s.indexOf("random(") && (s = on(s)),
                    Ge(s + "") || (s += xt.units[h] || Ge(Ji(t, h)) || ""),
                    "=" === (s + "").charAt(1) && (s = Ji(t, h))) : s = Ji(t, h),
                    l = parseFloat(s),
                    (p = "string" === u && "=" === o.charAt(1) && o.substr(0, 2)) && (o = o.substr(2)),
                    a = parseFloat(o),
                    h in Mi && ("autoAlpha" === h && (1 === l && "hidden" === Ji(t, "visibility") && a && (l = 0),
                    Ki(this, M, "visibility", l ? "inherit" : "hidden", a ? "inherit" : "hidden", !a)),
                    "scale" !== h && "transform" !== h && ~(h = Mi[h]).indexOf(",") && (h = h.split(",")[0])),
                    g = h in _i)
                        if (m || ((v = t._gsap).renderTransform && !e.parseTransform || cr(t, e.parseTransform),
                        _ = !1 !== e.smoothOrigin && v.smooth,
                        (m = this._pt = new oi(this._pt,M,Yi,0,1,v.renderTransform,v,0,-1)).dep = 1),
                        "scale" === h)
                            this._pt = new oi(this._pt,v,"scaleY",v.scaleY,(p ? pe(v.scaleY, p + a) : a) - v.scaleY || 0),
                            O.push("scaleY", h),
                            h += "X";
                        else {
                            if ("transformOrigin" === h) {
                                b = void 0,
                                x = void 0,
                                T = void 0,
                                b = (w = o).split(" "),
                                x = b[0],
                                T = b[1] || "50%",
                                "top" !== x && "bottom" !== x && "left" !== T && "right" !== T || (w = x,
                                x = T,
                                T = w),
                                b[0] = er[x] || x,
                                b[1] = er[T] || T,
                                o = b.join(" "),
                                v.svg ? ur(t, o, 0, _, 0, this) : ((d = parseFloat(o.split(" ")[2]) || 0) !== v.zOrigin && Ki(this, v, "zOrigin", v.zOrigin, d),
                                Ki(this, M, h, hr(s), hr(o)));
                                continue
                            }
                            if ("svgOrigin" === h) {
                                ur(t, o, 1, _, 0, this);
                                continue
                            }
                            if (h in sr) {
                                mr(this, v, h, l, p ? pe(l, p + o) : o);
                                continue
                            }
                            if ("smoothOrigin" === h) {
                                Ki(this, v, "smooth", v.smooth, o);
                                continue
                            }
                            if ("force3D" === h) {
                                v[h] = o;
                                continue
                            }
                            if ("transform" === h) {
                                _r(this, o, t);
                                continue
                            }
                        }
                    else
                        h in M || (h = Vi(h) || h);
                    if (g || (a || 0 === a) && (l || 0 === l) && !Oi.test(o) && h in M)
                        a || (a = 0),
                        (f = (s + "").substr((l + "").length)) !== (d = Ge(o) || (h in xt.units ? xt.units[h] : f)) && (l = Zi(t, h, s, d)),
                        this._pt = new oi(this._pt,g ? v : M,h,l,(p ? pe(l, p + a) : a) - l,g || "px" !== d && "zIndex" !== h || !1 === e.autoRound ? Si : Ci),
                        this._pt.u = d || 0,
                        f !== d && "%" !== d && (this._pt.b = s,
                        this._pt.r = ki);
                    else if (h in M)
                        tr.call(this, t, h, s, p ? p + o : o);
                    else {
                        if (!(h in t)) {
                            Kt(h, o);
                            continue
                        }
                        this.add(t, h, s || t[h], p ? p + o : o, i, r)
                    }
                    O.push(h)
                }
        y && si(this)
    },
    get: Ji,
    aliases: Mi,
    getSetter: function(t, e, n) {
        var i = Mi[e];
        return i && i.indexOf(",") < 0 && (e = i),
        e in _i && e !== Wi && (t._gsap.x || Ji(t, "x")) ? n && mi === n ? "scale" === e ? Ri : Li : (mi = n || {},
        "scale" === e ? zi : Bi) : t.style && !It(t.style[e]) ? Ai : ~e.indexOf("-") ? Ii : Qn(t, e)
    },
    core: {
        _removeProperty: Gi,
        _getMatrix: lr
    }
};
ci.utils.checkPrefix = Vi,
br = he((yr = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") + "," + (wr = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", (function(t) {
    _i[t] = 1
}
)),
he(wr, (function(t) {
    xt.units[t] = "deg",
    sr[t] = 1
}
)),
Mi[br[13]] = yr + "," + wr,
he("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", (function(t) {
    var e = t.split(":");
    Mi[e[1]] = br[e[0]]
}
)),
he("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", (function(t) {
    xt.units[t] = "px"
}
)),
ci.registerPlugin(xr);
var Tr = ci.registerPlugin(xr) || ci;
Tr.core.Tween;
class Or {
    in(t=!0) {
        return this.isVisible = !0,
        Tr.killTweensOf(this.SplitTypeInstance.lines),
        this.inTimeline = Tr.timeline({
            defaults: {
                duration: 1.5,
                ease: "power4.inOut"
            }
        }).addLabel("start", 0).set(this.SplitTypeInstance.lines, {
            yPercent: 105
        }, "start"),
        t ? this.inTimeline.to(this.SplitTypeInstance.lines, {
            yPercent: 0,
            stagger: .1
        }, "start") : this.inTimeline.set(this.SplitTypeInstance.lines, {
            yPercent: 0
        }, "start"),
        this.inTimeline
    }
    out(t=!0) {
        return this.isVisible = !1,
        Tr.killTweensOf(this.SplitTypeInstance.lines),
        this.outTimeline = Tr.timeline({
            defaults: {
                duration: 1.5,
                ease: "power4.inOut"
            }
        }).addLabel("start", 0),
        t ? this.outTimeline.to(this.SplitTypeInstance.lines, {
            yPercent: -105,
            stagger: .02
        }, "start") : this.outTimeline.set(this.SplitTypeInstance.lines, {
            yPercent: -105
        }, "start"),
        this.outTimeline
    }
    initEvents() {
        window.addEventListener("resize", (()=>{
            this.SplitTypeInstance.split(),
            o(this.SplitTypeInstance.lines, "div", "oh"),
            this.isVisible || Tr.set(this.SplitTypeInstance.lines, {
                yPercent: -105
            })
        }
        ))
    }
    constructor(t) {
        a(this, "DOM", {
            el: null
        }),
        a(this, "SplitTypeInstance", void 0),
        a(this, "isVisible", void 0),
        a(this, "inTimeline", void 0),
        a(this, "outTimeline", void 0),
        this.DOM = {
            el: t
        },
        this.SplitTypeInstance = new q(this.DOM.el,{
            types: "lines"
        }),
        o(this.SplitTypeInstance.lines, "div", "oh"),
        this.initEvents()
    }
}
class Mr {
    constructor(t) {
        a(this, "DOM", {
            el: null,
            title: null,
            titleInner: null,
            metaInner: null,
            text: null,
            thumbs: null
        }),
        this.DOM.el = t,
        this.DOM.title = this.DOM.el.querySelector(".content__title"),
        this.DOM.titleInner = [...this.DOM.title.querySelectorAll(".oh__inner")],
        this.DOM.metaInner = this.DOM.el.querySelector(".content__meta > .oh__inner"),
        this.DOM.text = this.DOM.el.querySelector(".content__text"),
        this.multiLine = new Or(this.DOM.text),
        this.DOM.thumbs = [...this.DOM.el.querySelectorAll(".content__thumbs-item")]
    }
}
class Sr {
    constructor(t, e) {
        a(this, "DOM", {
            el: null,
            imageWrap: null,
            image: null,
            imageInner: null,
            title: null,
            titleInner: null,
            description: null
        }),
        this.DOM.el = t,
        this.content = new Mr(e),
        this.DOM.imageWrap = this.DOM.el.querySelector(".preview__img-wrap"),
        this.DOM.image = this.DOM.imageWrap.querySelector(".preview__img"),
        this.DOM.imageInner = this.DOM.image.querySelector(".preview__img-inner"),
        this.DOM.title = this.DOM.el.querySelector(".preview__title"),
        this.DOM.titleInner = [...this.DOM.title.querySelectorAll(".oh__inner")],
        this.DOM.description = this.DOM.el.querySelector(".preview__desc")
    }
}
var Er = {};
function kr() {}
kr.prototype = {
    on: function(t, e, n) {
        var i = this.e || (this.e = {});
        return (i[t] || (i[t] = [])).push({
            fn: e,
            ctx: n
        }),
        this
    },
    once: function(t, e, n) {
        var i = this;
        function r() {
            i.off(t, r),
            e.apply(n, arguments)
        }
        return r._ = e,
        this.on(t, r, n)
    },
    emit: function(t) {
        for (var e = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[t] || []).slice(), i = 0, r = n.length; i < r; i++)
            n[i].fn.apply(n[i].ctx, e);
        return this
    },
    off: function(t, e) {
        var n = this.e || (this.e = {})
          , i = n[t]
          , r = [];
        if (i && e)
            for (var s = 0, o = i.length; s < o; s++)
                i[s].fn !== e && i[s].fn._ !== e && r.push(i[s]);
        return r.length ? n[t] = r : delete n[t],
        this
    }
},
(Er = kr).TinyEmitter = kr;
var Cr = {};
function Dr(t, e) {
    return (Dr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
        return t.__proto__ = e,
        t
    }
    )(t, e)
}
Cr = function() {
    var t = 0;
    function e(e) {
        return "__private_" + t++ + "_" + e
    }
    function n(t, e) {
        if (!Object.prototype.hasOwnProperty.call(t, e))
            throw new TypeError("attempted to use private field on non-instance");
        return t
    }
    function i() {}
    i.prototype = {
        on: function(t, e, n) {
            var i = this.e || (this.e = {});
            return (i[t] || (i[t] = [])).push({
                fn: e,
                ctx: n
            }),
            this
        },
        once: function(t, e, n) {
            var i = this;
            function r() {
                i.off(t, r),
                e.apply(n, arguments)
            }
            return r._ = e,
            this.on(t, r, n)
        },
        emit: function(t) {
            for (var e = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[t] || []).slice(), i = 0, r = n.length; i < r; i++)
                n[i].fn.apply(n[i].ctx, e);
            return this
        },
        off: function(t, e) {
            var n = this.e || (this.e = {})
              , i = n[t]
              , r = [];
            if (i && e)
                for (var s = 0, o = i.length; s < o; s++)
                    i[s].fn !== e && i[s].fn._ !== e && r.push(i[s]);
            return r.length ? n[t] = r : delete n[t],
            this
        }
    };
    var r = i;
    r.TinyEmitter = i;
    var s, o = "virtualscroll", a = e("options"), l = e("el"), u = e("emitter"), c = e("event"), h = e("touchStart"), f = e("bodyTouchAction");
    return function() {
        function t(t) {
            var e = this;
            Object.defineProperty(this, a, {
                writable: !0,
                value: void 0
            }),
            Object.defineProperty(this, l, {
                writable: !0,
                value: void 0
            }),
            Object.defineProperty(this, u, {
                writable: !0,
                value: void 0
            }),
            Object.defineProperty(this, c, {
                writable: !0,
                value: void 0
            }),
            Object.defineProperty(this, h, {
                writable: !0,
                value: void 0
            }),
            Object.defineProperty(this, f, {
                writable: !0,
                value: void 0
            }),
            this._onWheel = function(t) {
                var i = n(e, a)[a]
                  , r = n(e, c)[c];
                r.deltaX = t.wheelDeltaX || -1 * t.deltaX,
                r.deltaY = t.wheelDeltaY || -1 * t.deltaY,
                s.isFirefox && 1 === t.deltaMode && (r.deltaX *= i.firefoxMultiplier,
                r.deltaY *= i.firefoxMultiplier),
                r.deltaX *= i.mouseMultiplier,
                r.deltaY *= i.mouseMultiplier,
                e._notify(t)
            }
            ,
            this._onMouseWheel = function(t) {
                var i = n(e, c)[c];
                i.deltaX = t.wheelDeltaX ? t.wheelDeltaX : 0,
                i.deltaY = t.wheelDeltaY ? t.wheelDeltaY : t.wheelDelta,
                e._notify(t)
            }
            ,
            this._onTouchStart = function(t) {
                var i = t.targetTouches ? t.targetTouches[0] : t;
                n(e, h)[h].x = i.pageX,
                n(e, h)[h].y = i.pageY
            }
            ,
            this._onTouchMove = function(t) {
                var i = n(e, a)[a];
                i.preventTouch && !t.target.classList.contains(i.unpreventTouchClass) && t.preventDefault();
                var r = n(e, c)[c]
                  , s = t.targetTouches ? t.targetTouches[0] : t;
                r.deltaX = (s.pageX - n(e, h)[h].x) * i.touchMultiplier,
                r.deltaY = (s.pageY - n(e, h)[h].y) * i.touchMultiplier,
                n(e, h)[h].x = s.pageX,
                n(e, h)[h].y = s.pageY,
                e._notify(t)
            }
            ,
            this._onKeyDown = function(t) {
                var i = n(e, c)[c];
                i.deltaX = i.deltaY = 0;
                var r = window.innerHeight - 40;
                switch (t.keyCode) {
                case 37:
                case 38:
                    i.deltaY = n(e, a)[a].keyStep;
                    break;
                case 39:
                case 40:
                    i.deltaY = -n(e, a)[a].keyStep;
                    break;
                case 32:
                    i.deltaY = r * (t.shiftKey ? 1 : -1);
                    break;
                default:
                    return
                }
                e._notify(t)
            }
            ,
            n(this, l)[l] = window,
            t && t.el && (n(this, l)[l] = t.el,
            delete t.el),
            s || (s = {
                hasWheelEvent: "onwheel"in document,
                hasMouseWheelEvent: "onmousewheel"in document,
                hasTouch: "ontouchstart"in document,
                hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
                hasPointer: !!window.navigator.msPointerEnabled,
                hasKeyDown: "onkeydown"in document,
                isFirefox: navigator.userAgent.indexOf("Firefox") > -1
            }),
            n(this, a)[a] = Object.assign({
                mouseMultiplier: 1,
                touchMultiplier: 2,
                firefoxMultiplier: 15,
                keyStep: 120,
                preventTouch: !1,
                unpreventTouchClass: "vs-touchmove-allowed",
                useKeyboard: !0,
                useTouch: !0
            }, t),
            n(this, u)[u] = new r,
            n(this, c)[c] = {
                y: 0,
                x: 0,
                deltaX: 0,
                deltaY: 0
            },
            n(this, h)[h] = {
                x: null,
                y: null
            },
            n(this, f)[f] = null,
            void 0 !== n(this, a)[a].passive && (this.listenerOptions = {
                passive: n(this, a)[a].passive
            })
        }
        var e = t.prototype;
        return e._notify = function(t) {
            var e = n(this, c)[c];
            e.x += e.deltaX,
            e.y += e.deltaY,
            n(this, u)[u].emit(o, {
                x: e.x,
                y: e.y,
                deltaX: e.deltaX,
                deltaY: e.deltaY,
                originalEvent: t
            })
        }
        ,
        e._bind = function() {
            s.hasWheelEvent && n(this, l)[l].addEventListener("wheel", this._onWheel, this.listenerOptions),
            s.hasMouseWheelEvent && n(this, l)[l].addEventListener("mousewheel", this._onMouseWheel, this.listenerOptions),
            s.hasTouch && n(this, a)[a].useTouch && (n(this, l)[l].addEventListener("touchstart", this._onTouchStart, this.listenerOptions),
            n(this, l)[l].addEventListener("touchmove", this._onTouchMove, this.listenerOptions)),
            s.hasPointer && s.hasTouchWin && (n(this, f)[f] = document.body.style.msTouchAction,
            document.body.style.msTouchAction = "none",
            n(this, l)[l].addEventListener("MSPointerDown", this._onTouchStart, !0),
            n(this, l)[l].addEventListener("MSPointerMove", this._onTouchMove, !0)),
            s.hasKeyDown && n(this, a)[a].useKeyboard && document.addEventListener("keydown", this._onKeyDown)
        }
        ,
        e._unbind = function() {
            s.hasWheelEvent && n(this, l)[l].removeEventListener("wheel", this._onWheel),
            s.hasMouseWheelEvent && n(this, l)[l].removeEventListener("mousewheel", this._onMouseWheel),
            s.hasTouch && (n(this, l)[l].removeEventListener("touchstart", this._onTouchStart),
            n(this, l)[l].removeEventListener("touchmove", this._onTouchMove)),
            s.hasPointer && s.hasTouchWin && (document.body.style.msTouchAction = n(this, f)[f],
            n(this, l)[l].removeEventListener("MSPointerDown", this._onTouchStart, !0),
            n(this, l)[l].removeEventListener("MSPointerMove", this._onTouchMove, !0)),
            s.hasKeyDown && n(this, a)[a].useKeyboard && document.removeEventListener("keydown", this._onKeyDown)
        }
        ,
        e.on = function(t, e) {
            n(this, u)[u].on(o, t, e);
            var i = n(this, u)[u].e;
            i && i[o] && 1 === i[o].length && this._bind()
        }
        ,
        e.off = function(t, e) {
            n(this, u)[u].off(o, t, e);
            var i = n(this, u)[u].e;
            (!i[o] || i[o].length <= 0) && this._unbind()
        }
        ,
        e.destroy = function() {
            n(this, u)[u].off(),
            this._unbind()
        }
        ,
        t
    }()
}();
var Pr = function(e) {
    var n, i;
    function r(n) {
        var i, r, s, o, a = void 0 === n ? {} : n, l = a.lerp, u = void 0 === l ? .1 : l, c = a.smooth, h = void 0 === c || c, f = a.direction, d = void 0 === f ? "vertical" : f;
        (o = e.call(this) || this).onResize = function(t) {
            var e = t[0];
            if (e) {
                var n = e.contentRect;
                o.limit = "horizontal" === o.direction ? n.width - o.windowWidth : n.height - o.windowHeight
            }
        }
        ,
        o.onWindowResize = function() {
            o.windowHeight = window.innerHeight,
            o.windowWidth = window.innerWidth
        }
        ,
        o.onVirtualScroll = function(t) {
            var e = t.deltaY
              , n = t.originalEvent;
            o.stopped ? n.preventDefault() : (o.smooth && !n.ctrlKey && n.preventDefault(),
            o.targetScroll -= e,
            o.targetScroll = Math.max(0, Math.min(o.targetScroll, o.limit)))
        }
        ,
        o.onScroll = function(t) {
            if (!(o.stopped || o.scrolling && o.smooth)) {
                var e = o.scroll;
                o.targetScroll = o.scroll = "horizontal" === o.direction ? window.scrollX : window.scrollY,
                o.velocity = o.scroll - e,
                o.notify()
            }
        }
        ,
        o.lerp = u,
        o.smooth = h,
        o.direction = d,
        window.addEventListener("scroll", o.onScroll, !1),
        window.addEventListener("resize", o.onWindowResize, !1);
        var p = (null == (i = navigator) || null == (r = i.userAgentData) ? void 0 : r.platform) || (null == (s = navigator) ? void 0 : s.platform) || "unknown";
        return o.virtualScroll = new (t(Cr))({
            firefoxMultiplier: 50,
            mouseMultiplier: p.indexOf("Win") > -1 ? 1 : .4,
            useKeyboard: !1,
            useTouch: !1,
            passive: !1
        }),
        o.virtualScroll.on(o.onVirtualScroll),
        o.onWindowResize(),
        o.limit = "horizontal" === o.direction ? document.body.offsetWidth - o.windowWidth : document.body.offsetHeight - o.windowHeight,
        o.resizeObserver = new ResizeObserver(o.onResize),
        o.resizeObserver.observe(document.body),
        o.targetScroll = o.scroll = "horizontal" === o.direction ? window.scrollX : window.scrollY,
        o.velocity = 0,
        o
    }
    i = e,
    (n = r).prototype = Object.create(i.prototype),
    n.prototype.constructor = n,
    Dr(n, i);
    var s = r.prototype;
    return s.start = function() {
        this.stopped = !1
    }
    ,
    s.stop = function() {
        this.stopped = !0
    }
    ,
    s.destroy = function() {
        window.removeEventListener("scroll", this.onScroll, !1),
        window.removeEventListener("resize", this.onWindowResize, !1),
        this.virtualScroll.destroy(),
        this.resizeObserver.disconnect()
    }
    ,
    s.raf = function() {
        if (!this.stopped && this.smooth) {
            var t, e = this.scroll;
            this.scroll = (1 - (t = this.lerp)) * this.scroll + t * this.targetScroll,
            Math.round(this.scroll) === Math.round(this.targetScroll) && (this.scroll = e = this.targetScroll),
            this.velocity = this.scroll - e,
            this.scrolling && ("horizontal" === this.direction ? window.scrollTo(this.scroll, 0) : window.scrollTo(0, this.scroll),
            this.notify()),
            this.scrolling = this.scroll !== this.targetScroll
        }
    }
    ,
    s.notify = function() {
        this.emit("scroll", {
            scroll: this.scroll,
            limit: this.limit,
            velocity: this.velocity,
            direction: this.direction
        })
    }
    ,
    s.scrollTo = function(t, e) {
        var n, i = (void 0 === e ? {} : e).offset, r = void 0 === i ? 0 : i;
        if ("number" == typeof t)
            n = t;
        else if ("top" === t)
            n = 0;
        else if ("bottom" === t)
            n = this.limit;
        else {
            var s;
            if ("string" == typeof t)
                s = document.querySelector(t);
            else {
                if (null == t || !t.nodeType)
                    return;
                s = t
            }
            if (!t)
                return;
            var o = s.getBoundingClientRect();
            n = ("horizontal" === this.direction ? o.left : o.top) + this.scroll
        }
        this.targetScroll = n += r,
        this.scrolling = !0,
        this.smooth || (this.scroll = n,
        "horizontal" === this.direction ? window.scrollTo(this.scroll, 0) : window.scrollTo(0, this.scroll))
    }
    ,
    r
}(t(Er));
function Ar(t, e) {
    for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1,
        i.configurable = !0,
        "value"in i && (i.writable = !0),
        Object.defineProperty(t, i.key, i)
    }
}
/*!
 * Observer 3.10.4
 * https://greensock.com
 *
 * @license Copyright 2008-2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var Ir, Lr, Rr, zr, Br, Yr, Wr, Xr, Fr, Nr, Vr, jr, qr = function() {
    return Ir || "undefined" != typeof window && (Ir = window.gsap) && Ir.registerPlugin && Ir
}, Hr = 1, $r = [], Ur = [], Gr = [], Kr = Date.now, Qr = function(t, e) {
    return e
}, Zr = function(t, e) {
    return ~Gr.indexOf(t) && Gr[Gr.indexOf(t) + 1][e]
}, Jr = function(t) {
    return !!~Nr.indexOf(t)
}, ts = function(t, e, n, i, r) {
    return t.addEventListener(e, n, {
        passive: !i,
        capture: !!r
    })
}, es = function(t, e, n, i) {
    return t.removeEventListener(e, n, !!i)
}, ns = function() {
    return Vr && Vr.isPressed || Ur.cache++
}, is = function(t, e) {
    var n = function n(i) {
        if (i || 0 === i) {
            Hr && (Rr.history.scrollRestoration = "manual");
            var r = Vr && Vr.isPressed;
            i = n.v = Math.round(i) || (Vr && Vr.iOS ? 1 : 0),
            t(i),
            n.cacheID = Ur.cache,
            r && Qr("ss", i)
        } else
            (e || Ur.cache !== n.cacheID || Qr("ref")) && (n.cacheID = Ur.cache,
            n.v = t());
        return n.v + n.offset
    };
    return n.offset = 0,
    t && n
}, rs = {
    s: "scrollLeft",
    p: "left",
    p2: "Left",
    os: "right",
    os2: "Right",
    d: "width",
    d2: "Width",
    a: "x",
    sc: is((function(t) {
        return arguments.length ? Rr.scrollTo(t, ss.sc()) : Rr.pageXOffset || zr.scrollLeft || Br.scrollLeft || Yr.scrollLeft || 0
    }
    ))
}, ss = {
    s: "scrollTop",
    p: "top",
    p2: "Top",
    os: "bottom",
    os2: "Bottom",
    d: "height",
    d2: "Height",
    a: "y",
    op: rs,
    sc: is((function(t) {
        return arguments.length ? Rr.scrollTo(rs.sc(), t) : Rr.pageYOffset || zr.scrollTop || Br.scrollTop || Yr.scrollTop || 0
    }
    ))
}, os = function(t) {
    return Ir.utils.toArray(t)[0] || ("string" == typeof t && !1 !== Ir.config().nullTargetWarn ? console.warn("Element not found:", t) : null)
}, as = function(t, e) {
    var n = e.s
      , i = e.sc
      , r = Ur.indexOf(t)
      , s = i === ss.sc ? 1 : 2;
    return !~r && (r = Ur.push(t) - 1),
    Ur[r + s] || (Ur[r + s] = is(Zr(t, n), !0) || (Jr(t) ? i : is((function(e) {
        return arguments.length ? t[n] = e : t[n]
    }
    ))))
}, ls = function(t, e, n) {
    var i = t
      , r = t
      , s = Kr()
      , o = s
      , a = e || 50
      , l = Math.max(500, 3 * a)
      , u = function(t, e) {
        var l = Kr();
        e || l - s > a ? (r = i,
        i = t,
        o = s,
        s = l) : n ? i += t : i = r + (t - r) / (l - o) * (s - o)
    };
    return {
        update: u,
        reset: function() {
            r = i = n ? 0 : i,
            o = s = 0
        },
        getVelocity: function(t) {
            var e = o
              , a = r
              , c = Kr();
            return (t || 0 === t) && t !== i && u(t),
            s === o || c - o > l ? 0 : (i + (n ? a : -a)) / ((n ? c : s) - e) * 1e3
        }
    }
}, us = function(t, e) {
    return e && !t._gsapAllow && t.preventDefault(),
    t.changedTouches ? t.changedTouches[0] : t
}, cs = function(t) {
    var e = Math.max.apply(Math, t)
      , n = Math.min.apply(Math, t);
    return Math.abs(e) >= Math.abs(n) ? e : n
}, hs = function() {
    var t, e, n, i;
    (Fr = Ir.core.globals().ScrollTrigger) && Fr.core && (t = Fr.core,
    e = t.bridge || {},
    n = t._scrollers,
    i = t._proxies,
    n.push.apply(n, Ur),
    i.push.apply(i, Gr),
    Ur = n,
    Gr = i,
    Qr = function(t, n) {
        return e[t](n)
    }
    )
}, fs = function(t) {
    return (Ir = t || qr()) && "undefined" != typeof document && document.body && (Rr = window,
    zr = document,
    Br = zr.documentElement,
    Yr = zr.body,
    Nr = [Rr, zr, Br, Yr],
    Ir.utils.clamp,
    Xr = "onpointerenter"in Yr ? "pointer" : "mouse",
    Wr = ds.isTouch = Rr.matchMedia && Rr.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart"in Rr || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0,
    jr = ds.eventTypes = ("ontouchstart"in Br ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown"in Br ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","),
    setTimeout((function() {
        return Hr = 0
    }
    ), 500),
    hs(),
    Lr = 1),
    Lr
};
rs.op = ss,
Ur.cache = 0;
var ds = function() {
    function t(t) {
        this.init(t)
    }
    var e, n, i;
    return t.prototype.init = function(t) {
        Lr || fs(Ir) || console.warn("Please gsap.registerPlugin(Observer)"),
        Fr || hs();
        var e = t.tolerance
          , n = t.dragMinimum
          , i = t.type
          , r = t.target
          , s = t.lineHeight
          , o = t.debounce
          , a = t.preventDefault
          , l = t.onStop
          , u = t.onStopDelay
          , c = t.ignore
          , h = t.wheelSpeed
          , f = t.event
          , d = t.onDragStart
          , p = t.onDragEnd
          , g = t.onDrag
          , m = t.onPress
          , v = t.onRelease
          , _ = t.onRight
          , y = t.onLeft
          , w = t.onUp
          , b = t.onDown
          , x = t.onChangeX
          , T = t.onChangeY
          , O = t.onChange
          , M = t.onToggleX
          , S = t.onToggleY
          , E = t.onHover
          , k = t.onHoverEnd
          , C = t.onMove
          , D = t.ignoreCheck
          , P = t.isNormalizer
          , A = t.onGestureStart
          , I = t.onGestureEnd
          , L = t.onWheel
          , R = t.onEnable
          , z = t.onDisable
          , B = t.onClick
          , Y = t.scrollSpeed
          , W = t.capture
          , X = t.allowClicks
          , F = t.lockAxis
          , N = t.onLockAxis;
        this.target = r = os(r) || Br,
        this.vars = t,
        c && (c = Ir.utils.toArray(c)),
        e = e || 0,
        n = n || 0,
        h = h || 1,
        Y = Y || 1,
        i = i || "wheel,touch,pointer",
        o = !1 !== o,
        s || (s = parseFloat(Rr.getComputedStyle(Yr).lineHeight) || 22);
        var V, j, q, H, $, U, G, K = this, Q = 0, Z = 0, J = as(r, rs), tt = as(r, ss), et = J(), nt = tt(), it = ~i.indexOf("touch") && !~i.indexOf("pointer") && "pointerdown" === jr[0], rt = Jr(r), st = r.ownerDocument || zr, ot = [0, 0, 0], at = [0, 0, 0], lt = 0, ut = function() {
            return lt = Kr()
        }, ct = function(t, e) {
            return (K.event = t) && c && ~c.indexOf(t.target) || e && it && "touch" !== t.pointerType || D && D(t, e)
        }, ht = function() {
            var t = K.deltaX = cs(ot)
              , n = K.deltaY = cs(at)
              , i = Math.abs(t) >= e
              , r = Math.abs(n) >= e;
            O && (i || r) && O(K, t, n, ot, at),
            i && (_ && K.deltaX > 0 && _(K),
            y && K.deltaX < 0 && y(K),
            x && x(K),
            M && K.deltaX < 0 != Q < 0 && M(K),
            Q = K.deltaX,
            ot[0] = ot[1] = ot[2] = 0),
            r && (b && K.deltaY > 0 && b(K),
            w && K.deltaY < 0 && w(K),
            T && T(K),
            S && K.deltaY < 0 != Z < 0 && S(K),
            Z = K.deltaY,
            at[0] = at[1] = at[2] = 0),
            (H || q) && (C && C(K),
            N && U && N(K),
            q && (g(K),
            q = !1),
            H = U = !1),
            $ && (L(K),
            $ = !1),
            V = 0
        }, ft = function(t, e, n) {
            ot[n] += t,
            at[n] += e,
            K._vx.update(t),
            K._vy.update(e),
            o ? V || (V = requestAnimationFrame(ht)) : ht()
        }, dt = function(t, e) {
            "y" !== G && (ot[2] += t,
            K._vx.update(t, !0)),
            "x" !== G && (at[2] += e,
            K._vy.update(e, !0)),
            F && !G && (K.axis = G = Math.abs(t) > Math.abs(e) ? "x" : "y",
            U = !0),
            o ? V || (V = requestAnimationFrame(ht)) : ht()
        }, pt = function(t) {
            if (!ct(t, 1)) {
                var e = (t = us(t, a)).clientX
                  , i = t.clientY
                  , r = e - K.x
                  , s = i - K.y
                  , o = K.isDragging;
                K.x = e,
                K.y = i,
                (o || Math.abs(K.startX - e) >= n || Math.abs(K.startY - i) >= n) && (g && (q = !0),
                o || (K.isDragging = !0),
                dt(r, s),
                o || d && d(K))
            }
        }, gt = K.onPress = function(t) {
            ct(t, 1) || (K.axis = G = null,
            j.pause(),
            K.isPressed = !0,
            t = us(t),
            Q = Z = 0,
            K.startX = K.x = t.clientX,
            K.startY = K.y = t.clientY,
            K._vx.reset(),
            K._vy.reset(),
            ts(P ? r : st, jr[1], pt, a, !0),
            K.deltaX = K.deltaY = 0,
            m && m(K))
        }
        , mt = function(t) {
            if (!ct(t, 1)) {
                es(P ? r : st, jr[1], pt, !0);
                var e = K.isDragging && (Math.abs(K.x - K.startX) > 3 || Math.abs(K.y - K.startY) > 3)
                  , n = us(t);
                e || (K._vx.reset(),
                K._vy.reset(),
                a && X && Ir.delayedCall(.08, (function() {
                    if (Kr() - lt > 300 && !t.defaultPrevented)
                        if (t.target.click)
                            t.target.click();
                        else if (st.createEvent) {
                            var e = st.createEvent("MouseEvents");
                            e.initMouseEvent("click", !0, !0, Rr, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null),
                            t.target.dispatchEvent(e)
                        }
                }
                ))),
                K.isDragging = K.isGesturing = K.isPressed = !1,
                l && !P && j.restart(!0),
                p && e && p(K),
                v && v(K, e)
            }
        }, vt = function(t) {
            return t.touches && t.touches.length > 1 && (K.isGesturing = !0) && A(t, K.isDragging)
        }, _t = function() {
            return K.isGesturing = !1,
            I(K)
        }, yt = function(t) {
            if (!ct(t)) {
                var e = J()
                  , n = tt();
                ft((e - et) * Y, (n - nt) * Y, 1),
                et = e,
                nt = n,
                l && j.restart(!0)
            }
        }, wt = function(t) {
            if (!ct(t)) {
                t = us(t, a),
                L && ($ = !0);
                var e = (1 === t.deltaMode ? s : 2 === t.deltaMode ? Rr.innerHeight : 1) * h;
                ft(t.deltaX * e, t.deltaY * e, 0),
                l && !P && j.restart(!0)
            }
        }, bt = function(t) {
            if (!ct(t)) {
                var e = t.clientX
                  , n = t.clientY
                  , i = e - K.x
                  , r = n - K.y;
                K.x = e,
                K.y = n,
                H = !0,
                (i || r) && dt(i, r)
            }
        }, xt = function(t) {
            K.event = t,
            E(K)
        }, Tt = function(t) {
            K.event = t,
            k(K)
        }, Ot = function(t) {
            return ct(t) || us(t, a) && B(K)
        };
        j = K._dc = Ir.delayedCall(u || .25, (function() {
            K._vx.reset(),
            K._vy.reset(),
            j.pause(),
            l && l(K)
        }
        )).pause(),
        K.deltaX = K.deltaY = 0,
        K._vx = ls(0, 50, !0),
        K._vy = ls(0, 50, !0),
        K.scrollX = J,
        K.scrollY = tt,
        K.isDragging = K.isGesturing = K.isPressed = !1,
        K.enable = function(t) {
            return K.isEnabled || (ts(rt ? st : r, "scroll", ns),
            i.indexOf("scroll") >= 0 && ts(rt ? st : r, "scroll", yt, a, W),
            i.indexOf("wheel") >= 0 && ts(r, "wheel", wt, a, W),
            (i.indexOf("touch") >= 0 && Wr || i.indexOf("pointer") >= 0) && (ts(r, jr[0], gt, a, W),
            ts(st, jr[2], mt),
            ts(st, jr[3], mt),
            X && ts(r, "click", ut, !1, !0),
            B && ts(r, "click", Ot),
            A && ts(st, "gesturestart", vt),
            I && ts(st, "gestureend", _t),
            E && ts(r, Xr + "enter", xt),
            k && ts(r, Xr + "leave", Tt),
            C && ts(r, Xr + "move", bt)),
            K.isEnabled = !0,
            t && t.type && gt(t),
            R && R(K)),
            K
        }
        ,
        K.disable = function() {
            K.isEnabled && ($r.filter((function(t) {
                return t !== K && Jr(t.target)
            }
            )).length || es(rt ? st : r, "scroll", ns),
            K.isPressed && (K._vx.reset(),
            K._vy.reset(),
            es(P ? r : st, jr[1], pt, !0)),
            es(rt ? st : r, "scroll", yt, W),
            es(r, "wheel", wt, W),
            es(r, jr[0], gt, W),
            es(st, jr[2], mt),
            es(st, jr[3], mt),
            es(r, "click", ut, !0),
            es(r, "click", Ot),
            es(st, "gesturestart", vt),
            es(st, "gestureend", _t),
            es(r, Xr + "enter", xt),
            es(r, Xr + "leave", Tt),
            es(r, Xr + "move", bt),
            K.isEnabled = K.isPressed = K.isDragging = !1,
            z && z(K))
        }
        ,
        K.kill = function() {
            K.disable();
            var t = $r.indexOf(K);
            t >= 0 && $r.splice(t, 1),
            Vr === K && (Vr = 0)
        }
        ,
        $r.push(K),
        P && Jr(r) && (Vr = K),
        K.enable(f)
    }
    ,
    e = t,
    (n = [{
        key: "velocityX",
        get: function() {
            return this._vx.getVelocity()
        }
    }, {
        key: "velocityY",
        get: function() {
            return this._vy.getVelocity()
        }
    }]) && Ar(e.prototype, n),
    i && Ar(e, i),
    t
}();
ds.version = "3.10.4",
ds.create = function(t) {
    return new ds(t)
}
,
ds.register = fs,
ds.getAll = function() {
    return $r.slice()
}
,
ds.getById = function(t) {
    return $r.filter((function(e) {
        return e.vars.id === t
    }
    ))[0]
}
,
qr() && Ir.registerPlugin(ds);
var ps, gs, ms, vs, _s, ys, ws, bs, xs, Ts, Os, Ms, Ss, Es, ks, Cs, Ds, Ps, As, Is, Ls, Rs, zs, Bs, Ys, Ws, Xs, Fs, Ns, Vs, js, qs, Hs, $s = 1, Us = Date.now, Gs = Us(), Ks = 0, Qs = 0, Zs = function() {
    return Es = 1
}, Js = function() {
    return Es = 0
}, to = function(t) {
    return t
}, eo = function(t) {
    return Math.round(1e5 * t) / 1e5 || 0
}, no = function() {
    return "undefined" != typeof window
}, io = function() {
    return ps || no() && (ps = window.gsap) && ps.registerPlugin && ps
}, ro = function(t) {
    return !!~ws.indexOf(t)
}, so = function(t) {
    return Zr(t, "getBoundingClientRect") || (ro(t) ? function() {
        return aa.width = ms.innerWidth,
        aa.height = ms.innerHeight,
        aa
    }
    : function() {
        return wo(t)
    }
    )
}, oo = function(t, e) {
    var n = e.s
      , i = e.d2
      , r = e.d
      , s = e.a;
    return (s = Zr(t, n = "scroll" + i)) ? s() - so(t)()[r] : ro(t) ? (_s[n] || ys[n]) - (ms["inner" + i] || _s["client" + i] || ys["client" + i]) : t[n] - t["offset" + i]
}, ao = function(t, e) {
    for (var n = 0; n < As.length; n += 3)
        (!e || ~e.indexOf(As[n + 1])) && t(As[n], As[n + 1], As[n + 2])
}, lo = function(t) {
    return "string" == typeof t
}, uo = function(t) {
    return "function" == typeof t
}, co = function(t) {
    return "number" == typeof t
}, ho = function(t) {
    return "object" == typeof t
}, fo = function(t) {
    return uo(t) && t()
}, po = function(t, e) {
    return function() {
        var n = fo(t)
          , i = fo(e);
        return function() {
            fo(n),
            fo(i)
        }
    }
}, go = function(t, e, n) {
    return t && t.progress(e ? 0 : 1) && n && t.pause()
}, mo = function(t, e) {
    if (t.enabled) {
        var n = e(t);
        n && n.totalTime && (t.callbackAnimation = n)
    }
}, vo = Math.abs, _o = function(t) {
    return ms.getComputedStyle(t)
}, yo = function(t, e) {
    for (var n in e)
        n in t || (t[n] = e[n]);
    return t
}, wo = function(t, e) {
    var n = e && "matrix(1, 0, 0, 1, 0, 0)" !== _o(t)[ks] && ps.to(t, {
        x: 0,
        y: 0,
        xPercent: 0,
        yPercent: 0,
        rotation: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        skewX: 0,
        skewY: 0
    }).progress(1)
      , i = t.getBoundingClientRect();
    return n && n.progress(0).kill(),
    i
}, bo = function(t, e) {
    var n = e.d2;
    return t["offset" + n] || t["client" + n] || 0
}, xo = function(t) {
    var e, n = [], i = t.labels, r = t.duration();
    for (e in i)
        n.push(i[e] / r);
    return n
}, To = function(t) {
    var e = ps.utils.snap(t)
      , n = Array.isArray(t) && t.slice(0).sort((function(t, e) {
        return t - e
    }
    ));
    return n ? function(t, i, r) {
        var s;
        if (void 0 === r && (r = .001),
        !i)
            return e(t);
        if (i > 0) {
            for (t -= r,
            s = 0; s < n.length; s++)
                if (n[s] >= t)
                    return n[s];
            return n[s - 1]
        }
        for (s = n.length,
        t += r; s--; )
            if (n[s] <= t)
                return n[s];
        return n[0]
    }
    : function(n, i, r) {
        void 0 === r && (r = .001);
        var s = e(n);
        return !i || Math.abs(s - n) < r || s - n < 0 == i < 0 ? s : e(i < 0 ? n - t : n + t)
    }
}, Oo = function(t, e, n, i) {
    return n.split(",").forEach((function(n) {
        return t(e, n, i)
    }
    ))
}, Mo = function(t, e, n, i, r) {
    return t.addEventListener(e, n, {
        passive: !i,
        capture: !!r
    })
}, So = function(t, e, n, i) {
    return t.removeEventListener(e, n, !!i)
}, Eo = function(t, e, n) {
    return n && n.wheelHandler && t(e, "wheel", n)
}, ko = {
    startColor: "green",
    endColor: "red",
    indent: 0,
    fontSize: "16px",
    fontWeight: "normal"
}, Co = {
    toggleActions: "play",
    anticipatePin: 0
}, Do = {
    top: 0,
    left: 0,
    center: .5,
    bottom: 1,
    right: 1
}, Po = function(t, e) {
    if (lo(t)) {
        var n = t.indexOf("=")
          , i = ~n ? +(t.charAt(n - 1) + 1) * parseFloat(t.substr(n + 1)) : 0;
        ~n && (t.indexOf("%") > n && (i *= e / 100),
        t = t.substr(0, n - 1)),
        t = i + (t in Do ? Do[t] * e : ~t.indexOf("%") ? parseFloat(t) * e / 100 : parseFloat(t) || 0)
    }
    return t
}, Ao = function(t, e, n, i, r, s, o, a) {
    var l = r.startColor
      , u = r.endColor
      , c = r.fontSize
      , h = r.indent
      , f = r.fontWeight
      , d = vs.createElement("div")
      , p = ro(n) || "fixed" === Zr(n, "pinType")
      , g = -1 !== t.indexOf("scroller")
      , m = p ? ys : n
      , v = -1 !== t.indexOf("start")
      , _ = v ? l : u
      , y = "border-color:" + _ + ";font-size:" + c + ";color:" + _ + ";font-weight:" + f + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
    return y += "position:" + ((g || a) && p ? "fixed;" : "absolute;"),
    (g || a || !p) && (y += (i === ss ? "right" : "bottom") + ":" + (s + parseFloat(h)) + "px;"),
    o && (y += "box-sizing:border-box;text-align:left;width:" + o.offsetWidth + "px;"),
    d._isStart = v,
    d.setAttribute("class", "gsap-marker-" + t + (e ? " marker-" + e : "")),
    d.style.cssText = y,
    d.innerText = e || 0 === e ? t + "-" + e : t,
    m.children[0] ? m.insertBefore(d, m.children[0]) : m.appendChild(d),
    d._offset = d["offset" + i.op.d2],
    Io(d, 0, i, v),
    d
}, Io = function(t, e, n, i) {
    var r = {
        display: "block"
    }
      , s = n[i ? "os2" : "p2"]
      , o = n[i ? "p2" : "os2"];
    t._isFlipped = i,
    r[n.a + "Percent"] = i ? -100 : 0,
    r[n.a] = i ? "1px" : 0,
    r["border" + s + "Width"] = 1,
    r["border" + o + "Width"] = 0,
    r[n.p] = e + "px",
    ps.set(t, r)
}, Lo = [], Ro = {}, zo = function() {
    return Us() - Ks > 34 && ta()
}, Bo = function() {
    (!zs || !zs.isPressed || zs.startX > ys.clientWidth) && (Ur.cache++,
    Ns || (Ns = requestAnimationFrame(ta)),
    Ks || qo("scrollStart"),
    Ks = Us())
}, Yo = function() {
    Ws = ms.innerWidth,
    Ys = ms.innerHeight
}, Wo = function() {
    Ur.cache++,
    !Ss && !Rs && !vs.fullscreenElement && !vs.webkitFullscreenElement && (!Bs || Ws !== ms.innerWidth || Math.abs(ms.innerHeight - Ys) > .25 * ms.innerHeight) && bs.restart(!0)
}, Xo = {}, Fo = [], No = [], Vo = function(t) {
    var e, n = ps.ticker.frame, i = [], r = 0;
    if (js !== n || $s) {
        for (Uo(); r < No.length; r += 4)
            (e = ms.matchMedia(No[r]).matches) !== No[r + 3] && (No[r + 3] = e,
            e ? i.push(r) : Uo(1, No[r]) || uo(No[r + 2]) && No[r + 2]());
        for ($o(),
        r = 0; r < i.length; r++)
            e = i[r],
            Vs = No[e],
            No[e + 2] = No[e + 1](t);
        Vs = 0,
        gs && Qo(0, 1),
        js = n,
        qo("matchMedia")
    }
}, jo = function t() {
    return So(fa, "scrollEnd", t) || Qo(!0)
}, qo = function(t) {
    return Xo[t] && Xo[t].map((function(t) {
        return t()
    }
    )) || Fo
}, Ho = [], $o = function(t) {
    for (var e = 0; e < Ho.length; e += 5)
        t && Ho[e + 4] !== t || (Ho[e].style.cssText = Ho[e + 1],
        Ho[e].getBBox && Ho[e].setAttribute("transform", Ho[e + 2] || ""),
        Ho[e + 3].uncache = 1)
}, Uo = function(t, e) {
    var n;
    for (Cs = 0; Cs < Lo.length; Cs++)
        n = Lo[Cs],
        e && n.media !== e || (t ? n.kill(1) : n.revert());
    e && $o(e),
    e || qo("revert")
}, Go = function() {
    return Ur.cache++ && Ur.forEach((function(t) {
        return "function" == typeof t && (t.rec = 0)
    }
    ))
}, Ko = 0, Qo = function(t, e) {
    if (!Ks || t) {
        qs = !0;
        var n = qo("refreshInit");
        Is && fa.sort(),
        e || Uo(),
        Lo.slice(0).forEach((function(t) {
            return t.refresh()
        }
        )),
        Lo.forEach((function(t) {
            return "max" === t.vars.end && t.setPositions(t.start, oo(t.scroller, t._dir))
        }
        )),
        n.forEach((function(t) {
            return t && t.render && t.render(-1)
        }
        )),
        Go(),
        bs.pause(),
        Ko++,
        qs = !1,
        qo("refresh")
    } else
        Mo(fa, "scrollEnd", jo)
}, Zo = 0, Jo = 1, ta = function() {
    if (!qs) {
        fa.isUpdating = !0,
        Hs && Hs.update(0);
        var t = Lo.length
          , e = Us()
          , n = e - Gs >= 50
          , i = t && Lo[0].scroll();
        if (Jo = Zo > i ? -1 : 1,
        Zo = i,
        n && (Ks && !Es && e - Ks > 200 && (Ks = 0,
        qo("scrollEnd")),
        Os = Gs,
        Gs = e),
        Jo < 0) {
            for (Cs = t; Cs-- > 0; )
                Lo[Cs] && Lo[Cs].update(0, n);
            Jo = 1
        } else
            for (Cs = 0; Cs < t; Cs++)
                Lo[Cs] && Lo[Cs].update(0, n);
        fa.isUpdating = !1
    }
    Ns = 0
}, ea = ["left", "top", "bottom", "right", "marginBottom", "marginRight", "marginTop", "marginLeft", "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], na = ea.concat(["width", "height", "boxSizing", "maxWidth", "maxHeight", "position", "margin", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft"]), ia = function(t, e, n, i) {
    if (t.parentNode !== e) {
        for (var r, s = ea.length, o = e.style, a = t.style; s--; )
            o[r = ea[s]] = n[r];
        o.position = "absolute" === n.position ? "absolute" : "relative",
        "inline" === n.display && (o.display = "inline-block"),
        a.bottom = a.right = o.flexBasis = "auto",
        o.overflow = "visible",
        o.boxSizing = "border-box",
        o.width = bo(t, rs) + "px",
        o.height = bo(t, ss) + "px",
        o.padding = a.margin = a.top = a.left = "0",
        sa(i),
        a.width = a.maxWidth = n.width,
        a.height = a.maxHeight = n.height,
        a.padding = n.padding,
        t.parentNode.insertBefore(e, t),
        e.appendChild(t)
    }
}, ra = /([A-Z])/g, sa = function(t) {
    if (t) {
        var e, n, i = t.t.style, r = t.length, s = 0;
        for ((t.t._gsap || ps.core.getCache(t.t)).uncache = 1; s < r; s += 2)
            n = t[s + 1],
            e = t[s],
            n ? i[e] = n : i[e] && i.removeProperty(e.replace(ra, "-$1").toLowerCase())
    }
}, oa = function(t) {
    for (var e = na.length, n = t.style, i = [], r = 0; r < e; r++)
        i.push(na[r], n[na[r]]);
    return i.t = t,
    i
}, aa = {
    left: 0,
    top: 0
}, la = function(t, e, n, i, r, s, o, a, l, u, c, h, f) {
    uo(t) && (t = t(a)),
    lo(t) && "max" === t.substr(0, 3) && (t = h + ("=" === t.charAt(4) ? Po("0" + t.substr(3), n) : 0));
    var d, p, g, m = f ? f.time() : 0;
    if (f && f.seek(0),
    co(t))
        o && Io(o, n, i, !0);
    else {
        uo(e) && (e = e(a));
        var v, _, y, w, b = t.split(" ");
        g = os(e) || ys,
        (v = wo(g) || {}) && (v.left || v.top) || "none" !== _o(g).display || (w = g.style.display,
        g.style.display = "block",
        v = wo(g),
        w ? g.style.display = w : g.style.removeProperty("display")),
        _ = Po(b[0], v[i.d]),
        y = Po(b[1] || "0", n),
        t = v[i.p] - l[i.p] - u + _ + r - y,
        o && Io(o, y, i, n - y < 20 || o._isStart && y > 20),
        n -= n - y
    }
    if (s) {
        var x = t + n
          , T = s._isStart;
        d = "scroll" + i.d2,
        Io(s, x, i, T && x > 20 || !T && (c ? Math.max(ys[d], _s[d]) : s.parentNode[d]) <= x + 1),
        c && (l = wo(o),
        c && (s.style[i.op.p] = l[i.op.p] - i.op.m - s._offset + "px"))
    }
    return f && g && (d = wo(g),
    f.seek(h),
    p = wo(g),
    f._caScrollDist = d[i.p] - p[i.p],
    t = t / f._caScrollDist * h),
    f && f.seek(m),
    f ? t : Math.round(t)
}, ua = /(webkit|moz|length|cssText|inset)/i, ca = function(t, e, n, i) {
    if (t.parentNode !== e) {
        var r, s, o = t.style;
        if (e === ys) {
            for (r in t._stOrig = o.cssText,
            s = _o(t))
                +r || ua.test(r) || !s[r] || "string" != typeof o[r] || "0" === r || (o[r] = s[r]);
            o.top = n,
            o.left = i
        } else
            o.cssText = t._stOrig;
        ps.core.getCache(t).uncache = 1,
        e.appendChild(t)
    }
}, ha = function(t, e) {
    var n, i, r = as(t, e), s = "_scroll" + e.p2, o = function e(o, a, l, u, c) {
        var h = e.tween
          , f = a.onComplete
          , d = {};
        return l = l || r(),
        c = u && c || 0,
        u = u || o - l,
        h && h.kill(),
        n = Math.round(l),
        a[s] = o,
        a.modifiers = d,
        d[s] = function(t) {
            return (t = eo(r())) !== n && t !== i && Math.abs(t - n) > 2 && Math.abs(t - i) > 2 ? (h.kill(),
            e.tween = 0) : t = l + u * h.ratio + c * h.ratio * h.ratio,
            i = n,
            n = eo(t)
        }
        ,
        a.onComplete = function() {
            e.tween = 0,
            f && f.call(h)
        }
        ,
        h = e.tween = ps.to(t, a)
    };
    return t[s] = r,
    r.wheelHandler = function() {
        return o.tween && o.tween.kill() && (o.tween = 0)
    }
    ,
    Mo(t, "wheel", r.wheelHandler),
    o
}, fa = function() {
    function t(e, n) {
        gs || t.register(ps) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
        this.init(e, n)
    }
    return t.prototype.init = function(e, n) {
        if (this.progress = this.start = 0,
        this.vars && this.kill(!0, !0),
        Qs) {
            var i, r, s, o, a, l, u, c, h, f, d, p, g, m, v, _, y, w, b, x, T, O, M, S, E, k, C, D, P, A, I, L, R, z, B, Y, W, X, F, N, V, j = e = yo(lo(e) || co(e) || e.nodeType ? {
                trigger: e
            } : e, Co), q = j.onUpdate, H = j.toggleClass, $ = j.id, U = j.onToggle, G = j.onRefresh, K = j.scrub, Q = j.trigger, Z = j.pin, J = j.pinSpacing, tt = j.invalidateOnRefresh, et = j.anticipatePin, nt = j.onScrubComplete, it = j.onSnapComplete, rt = j.once, st = j.snap, ot = j.pinReparent, at = j.pinSpacer, lt = j.containerAnimation, ut = j.fastScrollEnd, ct = j.preventOverlaps, ht = e.horizontal || e.containerAnimation && !1 !== e.horizontal ? rs : ss, ft = !K && 0 !== K, dt = os(e.scroller || ms), pt = ps.core.getCache(dt), gt = ro(dt), mt = "fixed" === ("pinType"in e ? e.pinType : Zr(dt, "pinType") || gt && "fixed"), vt = [e.onEnter, e.onLeave, e.onEnterBack, e.onLeaveBack], _t = ft && e.toggleActions.split(" "), yt = "markers"in e ? e.markers : Co.markers, wt = gt ? 0 : parseFloat(_o(dt)["border" + ht.p2 + "Width"]) || 0, bt = this, xt = e.onRefreshInit && function() {
                return e.onRefreshInit(bt)
            }
            , Tt = function(t, e, n) {
                var i = n.d
                  , r = n.d2
                  , s = n.a;
                return (s = Zr(t, "getBoundingClientRect")) ? function() {
                    return s()[i]
                }
                : function() {
                    return (e ? ms["inner" + r] : t["client" + r]) || 0
                }
            }(dt, gt, ht), Ot = function(t, e) {
                return !e || ~Gr.indexOf(t) ? so(t) : function() {
                    return aa
                }
            }(dt, gt), Mt = 0, St = 0, Et = as(dt, ht);
            if (bt.media = Vs,
            bt._dir = ht,
            et *= 45,
            bt.scroller = dt,
            bt.scroll = lt ? lt.time.bind(lt) : Et,
            o = Et(),
            bt.vars = e,
            n = n || e.animation,
            "refreshPriority"in e && (Is = 1,
            -9999 === e.refreshPriority && (Hs = bt)),
            pt.tweenScroll = pt.tweenScroll || {
                top: ha(dt, ss),
                left: ha(dt, rs)
            },
            bt.tweenTo = i = pt.tweenScroll[ht.p],
            bt.scrubDuration = function(t) {
                (I = co(t) && t) ? A ? A.duration(t) : A = ps.to(n, {
                    ease: "expo",
                    totalProgress: "+=0.001",
                    duration: I,
                    paused: !0,
                    onComplete: function() {
                        return nt && nt(bt)
                    }
                }) : (A && A.progress(1).kill(),
                A = 0)
            }
            ,
            n && (n.vars.lazy = !1,
            n._initted || !1 !== n.vars.immediateRender && !1 !== e.immediateRender && n.render(0, !0, !0),
            bt.animation = n.pause(),
            n.scrollTrigger = bt,
            bt.scrubDuration(K),
            D = 0,
            $ || ($ = n.vars.id)),
            Lo.push(bt),
            st && (ho(st) && !st.push || (st = {
                snapTo: st
            }),
            "scrollBehavior"in ys.style && ps.set(gt ? [ys, _s] : dt, {
                scrollBehavior: "auto"
            }),
            s = uo(st.snapTo) ? st.snapTo : "labels" === st.snapTo ? function(t) {
                return function(e) {
                    return ps.utils.snap(xo(t), e)
                }
            }(n) : "labelsDirectional" === st.snapTo ? (F = n,
            function(t, e) {
                return To(xo(F))(t, e.direction)
            }
            ) : !1 !== st.directional ? function(t, e) {
                return To(st.snapTo)(t, Us() - St < 500 ? 0 : e.direction)
            }
            : ps.utils.snap(st.snapTo),
            L = st.duration || {
                min: .1,
                max: 2
            },
            L = ho(L) ? Ts(L.min, L.max) : Ts(L, L),
            R = ps.delayedCall(st.delay || I / 2 || .1, (function() {
                var t = Et()
                  , e = Us() - St < 500
                  , r = i.tween;
                if (!(e || Math.abs(bt.getVelocity()) < 10) || r || Es || Mt === t)
                    bt.isActive && Mt !== t && R.restart(!0);
                else {
                    var o = (t - l) / g
                      , a = n && !ft ? n.totalProgress() : o
                      , c = e ? 0 : (a - P) / (Us() - Os) * 1e3 || 0
                      , h = ps.utils.clamp(-o, 1 - o, vo(c / 2) * c / .185)
                      , f = o + (!1 === st.inertia ? 0 : h)
                      , d = Ts(0, 1, s(f, bt))
                      , p = Math.round(l + d * g)
                      , m = st
                      , v = m.onStart
                      , _ = m.onInterrupt
                      , y = m.onComplete;
                    if (t <= u && t >= l && p !== t) {
                        if (r && !r._initted && r.data <= vo(p - t))
                            return;
                        !1 === st.inertia && (h = d - o),
                        i(p, {
                            duration: L(vo(.185 * Math.max(vo(f - a), vo(d - a)) / c / .05 || 0)),
                            ease: st.ease || "power3",
                            data: vo(p - t),
                            onInterrupt: function() {
                                return R.restart(!0) && _ && _(bt)
                            },
                            onComplete: function() {
                                bt.update(),
                                Mt = Et(),
                                D = P = n && !ft ? n.totalProgress() : bt.progress,
                                it && it(bt),
                                y && y(bt)
                            }
                        }, t, h * g, p - t - h * g),
                        v && v(bt, i.tween)
                    }
                }
            }
            )).pause()),
            $ && (Ro[$] = bt),
            (X = (Q = bt.trigger = os(Q || Z)) && Q._gsap && Q._gsap.stRevert) && (X = X(bt)),
            Z = !0 === Z ? Q : os(Z),
            lo(H) && (H = {
                targets: Q,
                className: H
            }),
            Z && (!1 === J || "margin" === J || (J = !(!J && "flex" === _o(Z.parentNode).display) && "padding"),
            bt.pin = Z,
            !1 !== e.force3D && ps.set(Z, {
                force3D: !0
            }),
            (r = ps.core.getCache(Z)).spacer ? m = r.pinState : (at && ((at = os(at)) && !at.nodeType && (at = at.current || at.nativeElement),
            r.spacerIsNative = !!at,
            at && (r.spacerState = oa(at))),
            r.spacer = y = at || vs.createElement("div"),
            y.classList.add("pin-spacer"),
            $ && y.classList.add("pin-spacer-" + $),
            r.pinState = m = oa(Z)),
            bt.spacer = y = r.spacer,
            C = _o(Z),
            M = C[J + ht.os2],
            b = ps.getProperty(Z),
            x = ps.quickSetter(Z, ht.a, "px"),
            ia(Z, y, C),
            _ = oa(Z)),
            yt) {
                p = ho(yt) ? yo(yt, ko) : ko,
                f = Ao("scroller-start", $, dt, ht, p, 0),
                d = Ao("scroller-end", $, dt, ht, p, 0, f),
                w = f["offset" + ht.op.d2];
                var kt = os(Zr(dt, "content") || dt);
                c = this.markerStart = Ao("start", $, kt, ht, p, w, 0, lt),
                h = this.markerEnd = Ao("end", $, kt, ht, p, w, 0, lt),
                lt && (W = ps.quickSetter([c, h], ht.a, "px")),
                mt || Gr.length && !0 === Zr(dt, "fixedMarkers") || (V = _o(N = gt ? ys : dt).position,
                N.style.position = "absolute" === V || "fixed" === V ? V : "relative",
                ps.set([f, d], {
                    force3D: !0
                }),
                E = ps.quickSetter(f, ht.a, "px"),
                k = ps.quickSetter(d, ht.a, "px"))
            }
            if (lt) {
                var Ct = lt.vars.onUpdate
                  , Dt = lt.vars.onUpdateParams;
                lt.eventCallback("onUpdate", (function() {
                    bt.update(0, 0, 1),
                    Ct && Ct.apply(Dt || [])
                }
                ))
            }
            bt.previous = function() {
                return Lo[Lo.indexOf(bt) - 1]
            }
            ,
            bt.next = function() {
                return Lo[Lo.indexOf(bt) + 1]
            }
            ,
            bt.revert = function(t) {
                var e = !1 !== t || !bt.enabled
                  , i = Ss;
                e !== bt.isReverted && (e && (bt.scroll.rec || !Ss || !qs || (bt.scroll.rec = Et()),
                B = Math.max(Et(), bt.scroll.rec || 0),
                z = bt.progress,
                Y = n && n.progress()),
                c && [c, h, f, d].forEach((function(t) {
                    return t.style.display = e ? "none" : "block"
                }
                )),
                e && (Ss = 1),
                bt.update(e),
                Ss = i,
                Z && (e ? function(t, e, n) {
                    sa(n);
                    var i = t._gsap;
                    if (i.spacerIsNative)
                        sa(i.spacerState);
                    else if (t.parentNode === e) {
                        var r = e.parentNode;
                        r && (r.insertBefore(t, e),
                        r.removeChild(e))
                    }
                }(Z, y, m) : (!ot || !bt.isActive) && ia(Z, y, _o(Z), S)),
                bt.isReverted = e)
            }
            ,
            bt.refresh = function(r, s) {
                if (!Ss && bt.enabled || s)
                    if (Z && r && Ks)
                        Mo(t, "scrollEnd", jo);
                    else {
                        !qs && xt && xt(bt),
                        Ss = 1,
                        St = Us(),
                        i.tween && (i.tween.kill(),
                        i.tween = 0),
                        A && A.pause(),
                        tt && n && n.time(-.01, !0).invalidate(),
                        bt.isReverted || bt.revert();
                        for (var p, w, x, M, E, k, C, D, P, I, L = Tt(), W = Ot(), X = lt ? lt.duration() : oo(dt, ht), F = 0, N = 0, V = e.end, j = e.endTrigger || Q, q = e.start || (0 !== e.start && Q ? Z ? "0 0" : "0 100%" : 0), H = bt.pinnedContainer = e.pinnedContainer && os(e.pinnedContainer), $ = Q && Math.max(0, Lo.indexOf(bt)) || 0, U = $; U--; )
                            (k = Lo[U]).end || k.refresh(0, 1) || (Ss = 1),
                            !(C = k.pin) || C !== Q && C !== Z || k.isReverted || (I || (I = []),
                            I.unshift(k),
                            k.revert()),
                            k !== Lo[U] && ($--,
                            U--);
                        for (uo(q) && (q = q(bt)),
                        l = la(q, Q, L, ht, Et(), c, f, bt, W, wt, mt, X, lt) || (Z ? -.001 : 0),
                        uo(V) && (V = V(bt)),
                        lo(V) && !V.indexOf("+=") && (~V.indexOf(" ") ? V = (lo(q) ? q.split(" ")[0] : "") + V : (F = Po(V.substr(2), L),
                        V = lo(q) ? q : l + F,
                        j = Q)),
                        u = Math.max(l, la(V || (j ? "100% 0" : X), j, L, ht, Et() + F, h, d, bt, W, wt, mt, X, lt)) || -.001,
                        g = u - l || (l -= .01) && .001,
                        F = 0,
                        U = $; U--; )
                            (C = (k = Lo[U]).pin) && k.start - k._pinPush < l && !lt && k.end > 0 && (p = k.end - k.start,
                            C !== Q && C !== H || co(q) || (F += p * (1 - k.progress)),
                            C === Z && (N += p));
                        if (l += F,
                        u += F,
                        bt._pinPush = N,
                        c && F && ((p = {})[ht.a] = "+=" + F,
                        H && (p[ht.p] = "-=" + Et()),
                        ps.set([c, h], p)),
                        Z)
                            p = _o(Z),
                            M = ht === ss,
                            x = Et(),
                            T = parseFloat(b(ht.a)) + N,
                            !X && u > 1 && ((gt ? ys : dt).style["overflow-" + ht.a] = "scroll"),
                            ia(Z, y, p),
                            _ = oa(Z),
                            w = wo(Z, !0),
                            D = mt && as(dt, M ? rs : ss)(),
                            J && ((S = [J + ht.os2, g + N + "px"]).t = y,
                            (U = "padding" === J ? bo(Z, ht) + g + N : 0) && S.push(ht.d, U + "px"),
                            sa(S),
                            mt && Et(B)),
                            mt && ((E = {
                                top: w.top + (M ? x - l : D) + "px",
                                left: w.left + (M ? D : x - l) + "px",
                                boxSizing: "border-box",
                                position: "fixed"
                            }).width = E.maxWidth = Math.ceil(w.width) + "px",
                            E.height = E.maxHeight = Math.ceil(w.height) + "px",
                            E.margin = E.marginTop = E.marginRight = E.marginBottom = E.marginLeft = "0",
                            E.padding = p.padding,
                            E.paddingTop = p.paddingTop,
                            E.paddingRight = p.paddingRight,
                            E.paddingBottom = p.paddingBottom,
                            E.paddingLeft = p.paddingLeft,
                            v = function(t, e, n) {
                                for (var i, r = [], s = t.length, o = n ? 8 : 0; o < s; o += 2)
                                    i = t[o],
                                    r.push(i, i in e ? e[i] : t[o + 1]);
                                return r.t = t.t,
                                r
                            }(m, E, ot)),
                            n ? (P = n._initted,
                            Ls(1),
                            n.render(n.duration(), !0, !0),
                            O = b(ht.a) - T + g + N,
                            g !== O && mt && v.splice(v.length - 2, 2),
                            n.render(0, !0, !0),
                            P || n.invalidate(),
                            Ls(0)) : O = g;
                        else if (Q && Et() && !lt)
                            for (w = Q.parentNode; w && w !== ys; )
                                w._pinOffset && (l -= w._pinOffset,
                                u -= w._pinOffset),
                                w = w.parentNode;
                        I && I.forEach((function(t) {
                            return t.revert(!1)
                        }
                        )),
                        bt.start = l,
                        bt.end = u,
                        o = a = Et(),
                        lt || (o < B && Et(B),
                        bt.scroll.rec = 0),
                        bt.revert(!1),
                        R && (Mt = -1,
                        bt.isActive && Et(l + g * z),
                        R.restart(!0)),
                        Ss = 0,
                        n && ft && (n._initted || Y) && n.progress() !== Y && n.progress(Y, !0).render(n.time(), !0, !0),
                        (z !== bt.progress || lt) && (n && !ft && n.totalProgress(z, !0),
                        bt.progress = z,
                        bt.update(0, 0, 1)),
                        Z && J && (y._pinOffset = Math.round(bt.progress * O)),
                        G && G(bt)
                    }
            }
            ,
            bt.getVelocity = function() {
                return (Et() - a) / (Us() - Os) * 1e3 || 0
            }
            ,
            bt.endAnimation = function() {
                go(bt.callbackAnimation),
                n && (A ? A.progress(1) : n.paused() ? ft || go(n, bt.direction < 0, 1) : go(n, n.reversed()))
            }
            ,
            bt.labelToScroll = function(t) {
                return n && n.labels && (l || bt.refresh() || l) + n.labels[t] / n.duration() * g || 0
            }
            ,
            bt.getTrailing = function(t) {
                var e = Lo.indexOf(bt)
                  , n = bt.direction > 0 ? Lo.slice(0, e).reverse() : Lo.slice(e + 1);
                return (lo(t) ? n.filter((function(e) {
                    return e.vars.preventOverlaps === t
                }
                )) : n).filter((function(t) {
                    return bt.direction > 0 ? t.end <= l : t.start >= u
                }
                ))
            }
            ,
            bt.update = function(t, e, r) {
                if (!lt || r || t) {
                    var s, c, h, d, p, m, w, b = bt.scroll(), S = t ? 0 : (b - l) / g, C = S < 0 ? 0 : S > 1 ? 1 : S || 0, I = bt.progress;
                    if (e && (a = o,
                    o = lt ? Et() : b,
                    st && (P = D,
                    D = n && !ft ? n.totalProgress() : C)),
                    et && !C && Z && !Ss && !$s && Ks && l < b + (b - a) / (Us() - Os) * et && (C = 1e-4),
                    C !== I && bt.enabled) {
                        if (d = (p = (s = bt.isActive = !!C && C < 1) !== (!!I && I < 1)) || !!C != !!I,
                        bt.direction = C > I ? 1 : -1,
                        bt.progress = C,
                        d && !Ss && (c = C && !I ? 0 : 1 === C ? 1 : 1 === I ? 2 : 3,
                        ft && (h = !p && "none" !== _t[c + 1] && _t[c + 1] || _t[c],
                        w = n && ("complete" === h || "reset" === h || h in n))),
                        ct && (p || w) && (w || K || !n) && (uo(ct) ? ct(bt) : bt.getTrailing(ct).forEach((function(t) {
                            return t.endAnimation()
                        }
                        ))),
                        ft || (!A || Ss || $s ? n && n.totalProgress(C, !!Ss) : ((lt || Hs && Hs !== bt) && A.render(A._dp._time - A._start),
                        A.resetTo ? A.resetTo("totalProgress", C, n._tTime / n._tDur) : (A.vars.totalProgress = C,
                        A.invalidate().restart()))),
                        Z)
                            if (t && J && (y.style[J + ht.os2] = M),
                            mt) {
                                if (d) {
                                    if (m = !t && C > I && u + 1 > b && b + 1 >= oo(dt, ht),
                                    ot)
                                        if (t || !s && !m)
                                            ca(Z, y);
                                        else {
                                            var L = wo(Z, !0)
                                              , z = b - l;
                                            ca(Z, ys, L.top + (ht === ss ? z : 0) + "px", L.left + (ht === ss ? 0 : z) + "px")
                                        }
                                    sa(s || m ? v : _),
                                    O !== g && C < 1 && s || x(T + (1 !== C || m ? 0 : O))
                                }
                            } else
                                x(eo(T + O * C));
                        st && !i.tween && !Ss && !$s && R.restart(!0),
                        H && (p || rt && C && (C < 1 || !Fs)) && xs(H.targets).forEach((function(t) {
                            return t.classList[s || rt ? "add" : "remove"](H.className)
                        }
                        )),
                        q && !ft && !t && q(bt),
                        d && !Ss ? (ft && (w && ("complete" === h ? n.pause().totalProgress(1) : "reset" === h ? n.restart(!0).pause() : "restart" === h ? n.restart(!0) : n[h]()),
                        q && q(bt)),
                        !p && Fs || (U && p && mo(bt, U),
                        vt[c] && mo(bt, vt[c]),
                        rt && (1 === C ? bt.kill(!1, 1) : vt[c] = 0),
                        p || vt[c = 1 === C ? 1 : 3] && mo(bt, vt[c])),
                        ut && !s && Math.abs(bt.getVelocity()) > (co(ut) ? ut : 2500) && (go(bt.callbackAnimation),
                        A ? A.progress(1) : go(n, !C, 1))) : ft && q && !Ss && q(bt)
                    }
                    if (k) {
                        var B = lt ? b / lt.duration() * (lt._caScrollDist || 0) : b;
                        E(B + (f._isFlipped ? 1 : 0)),
                        k(B)
                    }
                    W && W(-b / lt.duration() * (lt._caScrollDist || 0))
                }
            }
            ,
            bt.enable = function(e, n) {
                bt.enabled || (bt.enabled = !0,
                Mo(dt, "resize", Wo),
                Mo(gt ? vs : dt, "scroll", Bo),
                xt && Mo(t, "refreshInit", xt),
                !1 !== e && (bt.progress = z = 0,
                o = a = Mt = Et()),
                !1 !== n && bt.refresh())
            }
            ,
            bt.getTween = function(t) {
                return t && i ? i.tween : A
            }
            ,
            bt.setPositions = function(t, e) {
                Z && (T += t - l,
                O += e - t - g),
                bt.start = l = t,
                bt.end = u = e,
                g = e - t,
                bt.update()
            }
            ,
            bt.disable = function(e, n) {
                if (bt.enabled && (!1 !== e && bt.revert(),
                bt.enabled = bt.isActive = !1,
                n || A && A.pause(),
                B = 0,
                r && (r.uncache = 1),
                xt && So(t, "refreshInit", xt),
                R && (R.pause(),
                i.tween && i.tween.kill() && (i.tween = 0)),
                !gt)) {
                    for (var s = Lo.length; s--; )
                        if (Lo[s].scroller === dt && Lo[s] !== bt)
                            return;
                    So(dt, "resize", Wo),
                    So(dt, "scroll", Bo)
                }
            }
            ,
            bt.kill = function(t, i) {
                bt.disable(t, i),
                A && !i && A.kill(),
                $ && delete Ro[$];
                var s = Lo.indexOf(bt);
                s >= 0 && Lo.splice(s, 1),
                s === Cs && Jo > 0 && Cs--,
                s = 0,
                Lo.forEach((function(t) {
                    return t.scroller === bt.scroller && (s = 1)
                }
                )),
                s || (bt.scroll.rec = 0),
                n && (n.scrollTrigger = null,
                t && n.render(-1),
                i || n.kill()),
                c && [c, h, f, d].forEach((function(t) {
                    return t.parentNode && t.parentNode.removeChild(t)
                }
                )),
                Hs === bt && (Hs = 0),
                Z && (r && (r.uncache = 1),
                s = 0,
                Lo.forEach((function(t) {
                    return t.pin === Z && s++
                }
                )),
                s || (r.spacer = 0)),
                e.onKill && e.onKill(bt)
            }
            ,
            bt.enable(!1, !1),
            X && X(bt),
            n && n.add && !g ? ps.delayedCall(.01, (function() {
                return l || u || bt.refresh()
            }
            )) && (g = .01) && (l = u = 0) : bt.refresh()
        } else
            this.update = this.refresh = this.kill = to
    }
    ,
    t.register = function(e) {
        return gs || (ps = e || io(),
        no() && window.document && t.enable(),
        gs = Qs),
        gs
    }
    ,
    t.defaults = function(t) {
        if (t)
            for (var e in t)
                Co[e] = t[e];
        return Co
    }
    ,
    t.disable = function(t, e) {
        Qs = 0,
        Lo.forEach((function(n) {
            return n[e ? "kill" : "disable"](t)
        }
        )),
        So(ms, "wheel", Bo),
        So(vs, "scroll", Bo),
        clearInterval(Ms),
        So(vs, "touchcancel", to),
        So(ys, "touchstart", to),
        Oo(So, vs, "pointerdown,touchstart,mousedown", Zs),
        Oo(So, vs, "pointerup,touchend,mouseup", Js),
        bs.kill(),
        ao(So);
        for (var n = 0; n < Ur.length; n += 3)
            Eo(So, Ur[n], Ur[n + 1]),
            Eo(So, Ur[n], Ur[n + 2])
    }
    ,
    t.enable = function() {
        if (ms = window,
        vs = document,
        _s = vs.documentElement,
        ys = vs.body,
        ps && (xs = ps.utils.toArray,
        Ts = ps.utils.clamp,
        Ls = ps.core.suppressOverwrites || to,
        ps.core.globals("ScrollTrigger", t),
        ys)) {
            Qs = 1,
            ds.register(ps),
            t.isTouch = ds.isTouch,
            Xs = ds.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),
            Mo(ms, "wheel", Bo),
            ws = [ms, vs, _s, ys],
            t.matchMedia({
                "(orientation: portrait)": function() {
                    return Yo(),
                    Yo
                }
            }),
            Mo(vs, "scroll", Bo);
            var e, n, i = ys.style, r = i.borderTopStyle;
            for (i.borderTopStyle = "solid",
            e = wo(ys),
            ss.m = Math.round(e.top + ss.sc()) || 0,
            rs.m = Math.round(e.left + rs.sc()) || 0,
            r ? i.borderTopStyle = r : i.removeProperty("border-top-style"),
            Ms = setInterval(zo, 250),
            ps.delayedCall(.5, (function() {
                return $s = 0
            }
            )),
            Mo(vs, "touchcancel", to),
            Mo(ys, "touchstart", to),
            Oo(Mo, vs, "pointerdown,touchstart,mousedown", Zs),
            Oo(Mo, vs, "pointerup,touchend,mouseup", Js),
            ks = ps.utils.checkPrefix("transform"),
            na.push(ks),
            gs = Us(),
            bs = ps.delayedCall(.2, Qo).pause(),
            As = [vs, "visibilitychange", function() {
                var t = ms.innerWidth
                  , e = ms.innerHeight;
                vs.hidden ? (Ds = t,
                Ps = e) : Ds === t && Ps === e || Wo()
            }
            , vs, "DOMContentLoaded", Qo, ms, "load", Qo, ms, "resize", Wo],
            ao(Mo),
            Lo.forEach((function(t) {
                return t.enable(0, 1)
            }
            )),
            n = 0; n < Ur.length; n += 3)
                Eo(So, Ur[n], Ur[n + 1]),
                Eo(So, Ur[n], Ur[n + 2])
        }
    }
    ,
    t.config = function(e) {
        "limitCallbacks"in e && (Fs = !!e.limitCallbacks);
        var n = e.syncInterval;
        n && clearInterval(Ms) || (Ms = n) && setInterval(zo, n),
        "ignoreMobileResize"in e && (Bs = 1 === t.isTouch && e.ignoreMobileResize),
        "autoRefreshEvents"in e && (ao(So) || ao(Mo, e.autoRefreshEvents || "none"),
        Rs = -1 === (e.autoRefreshEvents + "").indexOf("resize"))
    }
    ,
    t.scrollerProxy = function(t, e) {
        var n = os(t)
          , i = Ur.indexOf(n)
          , r = ro(n);
        ~i && Ur.splice(i, r ? 6 : 2),
        e && (r ? Gr.unshift(ms, e, ys, e, _s, e) : Gr.unshift(n, e))
    }
    ,
    t.matchMedia = function(t) {
        var e, n, i, r, s;
        for (n in t)
            i = No.indexOf(n),
            r = t[n],
            Vs = n,
            "all" === n ? r() : (e = ms.matchMedia(n)) && (e.matches && (s = r()),
            ~i ? (No[i + 1] = po(No[i + 1], r),
            No[i + 2] = po(No[i + 2], s)) : (i = No.length,
            No.push(n, r, s),
            e.addListener ? e.addListener(Vo) : e.addEventListener("change", Vo)),
            No[i + 3] = e.matches),
            Vs = 0;
        return No
    }
    ,
    t.clearMatchMedia = function(t) {
        t || (No.length = 0),
        (t = No.indexOf(t)) >= 0 && No.splice(t, 4)
    }
    ,
    t.isInViewport = function(t, e, n) {
        var i = (lo(t) ? os(t) : t).getBoundingClientRect()
          , r = i[n ? "width" : "height"] * e || 0;
        return n ? i.right - r > 0 && i.left + r < ms.innerWidth : i.bottom - r > 0 && i.top + r < ms.innerHeight
    }
    ,
    t.positionInViewport = function(t, e, n) {
        lo(t) && (t = os(t));
        var i = t.getBoundingClientRect()
          , r = i[n ? "width" : "height"]
          , s = null == e ? r / 2 : e in Do ? Do[e] * r : ~e.indexOf("%") ? parseFloat(e) * r / 100 : parseFloat(e) || 0;
        return n ? (i.left + s) / ms.innerWidth : (i.top + s) / ms.innerHeight
    }
    ,
    t
}();
fa.version = "3.10.4",
fa.saveStyles = function(t) {
    return t ? xs(t).forEach((function(t) {
        if (t && t.style) {
            var e = Ho.indexOf(t);
            e >= 0 && Ho.splice(e, 5),
            Ho.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), ps.core.getCache(t), Vs)
        }
    }
    )) : Ho
}
,
fa.revert = function(t, e) {
    return Uo(!t, e)
}
,
fa.create = function(t, e) {
    return new fa(t,e)
}
,
fa.refresh = function(t) {
    return t ? Wo() : (gs || fa.register()) && Qo(!0)
}
,
fa.update = ta,
fa.clearScrollMemory = Go,
fa.maxScroll = function(t, e) {
    return oo(t, e ? rs : ss)
}
,
fa.getScrollFunc = function(t, e) {
    return as(os(t), e ? rs : ss)
}
,
fa.getById = function(t) {
    return Ro[t]
}
,
fa.getAll = function() {
    return Lo.filter((function(t) {
        return "ScrollSmoother" !== t.vars.id
    }
    ))
}
,
fa.isScrolling = function() {
    return !!Ks
}
,
fa.snapDirectional = To,
fa.addEventListener = function(t, e) {
    var n = Xo[t] || (Xo[t] = []);
    ~n.indexOf(e) || n.push(e)
}
,
fa.removeEventListener = function(t, e) {
    var n = Xo[t]
      , i = n && n.indexOf(e);
    i >= 0 && n.splice(i, 1)
}
,
fa.batch = function(t, e) {
    var n, i = [], r = {}, s = e.interval || .016, o = e.batchMax || 1e9, a = function(t, e) {
        var n = []
          , i = []
          , r = ps.delayedCall(s, (function() {
            e(n, i),
            n = [],
            i = []
        }
        )).pause();
        return function(t) {
            n.length || r.restart(!0),
            n.push(t.trigger),
            i.push(t),
            o <= n.length && r.progress(1)
        }
    };
    for (n in e)
        r[n] = "on" === n.substr(0, 2) && uo(e[n]) && "onRefreshInit" !== n ? a(0, e[n]) : e[n];
    return uo(o) && (o = o(),
    Mo(fa, "refresh", (function() {
        return o = e.batchMax()
    }
    ))),
    xs(t).forEach((function(t) {
        var e = {};
        for (n in r)
            e[n] = r[n];
        e.trigger = t,
        i.push(fa.create(e))
    }
    )),
    i
}
;
var da, pa = function(t, e, n, i) {
    return e > i ? t(i) : e < 0 && t(0),
    n > i ? (i - e) / (n - e) : n < 0 ? e / (e - n) : 1
}, ga = function t(e, n) {
    !0 === n ? e.style.removeProperty("touch-action") : e.style.touchAction = !0 === n ? "auto" : n ? "pan-" + n + (ds.isTouch ? " pinch-zoom" : "") : "none",
    e === _s && t(ys, n)
}, ma = {
    auto: 1,
    scroll: 1
}, va = function(t) {
    var e, n = t.event, i = t.target, r = t.axis, s = (n.changedTouches ? n.changedTouches[0] : n).target, o = s._gsap || ps.core.getCache(s), a = Us();
    if (!o._isScrollT || a - o._isScrollT > 2e3) {
        for (; s && s.scrollHeight <= s.clientHeight; )
            s = s.parentNode;
        o._isScroll = s && !ro(s) && s !== i && (ma[(e = _o(s)).overflowY] || ma[e.overflowX]),
        o._isScrollT = a
    }
    (o._isScroll || "x" === r) && (n._gsapAllow = !0)
}, _a = function(t, e, n, i) {
    return ds.create({
        target: t,
        capture: !0,
        debounce: !1,
        lockAxis: !0,
        type: e,
        onWheel: i = i && va,
        onPress: i,
        onDrag: i,
        onScroll: i,
        onEnable: function() {
            return n && Mo(vs, ds.eventTypes[0], wa, !1, !0)
        },
        onDisable: function() {
            return So(vs, ds.eventTypes[0], wa, !0)
        }
    })
}, ya = /(input|label|select|textarea)/i, wa = function(t) {
    var e = ya.test(t.target.tagName);
    (e || da) && (t._gsapAllow = !0,
    da = e)
}, ba = function(t) {
    ho(t) || (t = {}),
    t.preventDefault = t.isNormalizer = t.allowClicks = !0,
    t.type || (t.type = "wheel,touch"),
    t.debounce = !!t.debounce,
    t.id = t.id || "normalizer";
    var e, n, i, r, s, o, a, l, u = t, c = u.normalizeScrollX, h = u.momentum, f = u.allowNestedScroll, d = os(t.target) || _s, p = ps.core.globals().ScrollSmoother, g = Xs && (t.content && os(t.content) || p && p.get() && p.get().content()), m = as(d, ss), v = as(d, rs), _ = 1, y = (ds.isTouch && ms.visualViewport ? ms.visualViewport.scale * ms.visualViewport.width : ms.outerWidth) / ms.innerWidth, w = 0, b = uo(h) ? function() {
        return h(e)
    }
    : function() {
        return h || 2.8
    }
    , x = _a(d, t.type, !0, f), T = function() {
        return i = !1
    }, O = to, M = to, S = function() {
        n = oo(d, ss),
        M = Ts(Xs ? 1 : 0, n),
        c && (O = Ts(0, oo(d, rs))),
        r = Ko
    }, E = function() {
        S(),
        s.isActive() && s.vars.scrollY > n && (m() > n ? s.progress(1) && m(n) : s.resetTo("scrollY", n))
    };
    return t.ignoreCheck = function(t) {
        return Xs && "touchmove" === t.type && function() {
            if (i) {
                requestAnimationFrame(T);
                var t = eo(e.deltaY / 2)
                  , n = M(m.v - t);
                return g && n !== m.v + m.offset && (m.offset = n - m.v,
                g.style.transform = "translateY(" + -m.offset + "px)",
                g._gsap && (g._gsap.y = -m.offset + "px"),
                m.cacheID = Ur.cache,
                ta()),
                !0
            }
            g && (g.style.transform = "translateY(0px)",
            m.offset = m.cacheID = 0,
            g._gsap && (g._gsap.y = "0px")),
            i = !0
        }() || _ > 1.05 && "touchstart" !== t.type || e.isGesturing || t.touches && t.touches.length > 1
    }
    ,
    t.onPress = function() {
        var t = _;
        _ = eo((ms.visualViewport && ms.visualViewport.scale || 1) / y),
        s.pause(),
        t !== _ && ga(d, _ > 1.01 || !c && "x"),
        i = !1,
        o = v(),
        a = m(),
        S(),
        r = Ko
    }
    ,
    t.onRelease = t.onGestureStart = function(t, e) {
        if (g && (g.style.transform = "translateY(0px)",
        m.offset = m.cacheID = 0,
        g._gsap && (g._gsap.y = "0px")),
        e) {
            Ur.cache++;
            var i, r, o = b();
            c && (r = (i = v()) + .05 * o * -t.velocityX / .227,
            o *= pa(v, i, r, oo(d, rs)),
            s.vars.scrollX = O(r)),
            r = (i = m()) + .05 * o * -t.velocityY / .227,
            o *= pa(m, i, r, oo(d, ss)),
            s.vars.scrollY = M(r),
            s.invalidate().duration(o).play(.01),
            (Xs && s.vars.scrollY >= n || i >= n - 1) && ps.to({}, {
                onUpdate: E,
                duration: o
            })
        } else
            l.restart(!0)
    }
    ,
    t.onWheel = function() {
        s._ts && s.pause(),
        Us() - w > 1e3 && (r = 0,
        w = Us())
    }
    ,
    t.onChange = function(t, e, n, i, s) {
        Ko !== r && S(),
        e && c && v(O(i[2] === e ? o + (t.startX - t.x) : v() + e - i[1])),
        n && m(M(s[2] === n ? a + (t.startY - t.y) : m() + n - s[1])),
        ta()
    }
    ,
    t.onEnable = function() {
        ga(d, !c && "x"),
        Mo(ms, "resize", E),
        x.enable()
    }
    ,
    t.onDisable = function() {
        ga(d, !0),
        So(ms, "resize", E),
        x.kill()
    }
    ,
    (e = new ds(t)).iOS = Xs,
    Xs && !m() && m(1),
    l = e._dc,
    s = ps.to(e, {
        ease: "power4",
        paused: !0,
        scrollX: c ? "+=0.1" : "+=0",
        scrollY: "+=0.1",
        onComplete: l.vars.onComplete
    }),
    e
};
fa.sort = function(t) {
    return Lo.sort(t || function(t, e) {
        return -1e6 * (t.vars.refreshPriority || 0) + t.start - (e.start + -1e6 * (e.vars.refreshPriority || 0))
    }
    )
}
,
fa.observe = function(t) {
    return new ds(t)
}
,
fa.normalizeScroll = function(t) {
    if (void 0 === t)
        return zs;
    if (!0 === t && zs)
        return zs.enable();
    if (!1 === t)
        return zs && zs.kill();
    var e = t instanceof ds ? t : ba(t);
    return zs && zs.target === e.target && zs.kill(),
    ro(e.target) && (zs = e),
    e
}
,
fa.core = {
    _getVelocityProp: ls,
    _inputObserver: _a,
    _scrollers: Ur,
    _proxies: Gr,
    bridge: {
        ss: function() {
            Ks || qo("scrollStart"),
            Ks = Us()
        },
        ref: function() {
            return Ss
        }
    }
},
io() && ps.registerPlugin(fa);
/*!
 * matrix 3.10.4
 * https://greensock.com
 *
 * Copyright 2008-2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var xa, Ta, Oa, Ma, Sa, Ea, ka, Ca, Da, Pa = "transform", Aa = Pa + "Origin", Ia = function(t) {
    var e = t.ownerDocument || t;
    !(Pa in t.style) && "msTransform"in t.style && (Aa = (Pa = "msTransform") + "Origin");
    for (; e.parentNode && (e = e.parentNode); )
        ;
    if (Ta = window,
    ka = new ja,
    e) {
        xa = e,
        Oa = e.documentElement,
        Ma = e.body,
        (Ca = xa.createElementNS("http://www.w3.org/2000/svg", "g")).style.transform = "none";
        var n = e.createElement("div")
          , i = e.createElement("div");
        Ma.appendChild(n),
        n.appendChild(i),
        n.style.position = "static",
        n.style[Pa] = "translate3d(0,0,1px)",
        Da = i.offsetParent !== n,
        Ma.removeChild(n)
    }
    return e
}, La = [], Ra = [], za = function() {
    return Ta.pageYOffset || xa.scrollTop || Oa.scrollTop || Ma.scrollTop || 0
}, Ba = function() {
    return Ta.pageXOffset || xa.scrollLeft || Oa.scrollLeft || Ma.scrollLeft || 0
}, Ya = function(t) {
    return t.ownerSVGElement || ("svg" === (t.tagName + "").toLowerCase() ? t : null)
}, Wa = function t(e) {
    return "fixed" === Ta.getComputedStyle(e).position || ((e = e.parentNode) && 1 === e.nodeType ? t(e) : void 0)
}, Xa = function t(e, n) {
    if (e.parentNode && (xa || Ia(e))) {
        var i = Ya(e)
          , r = i ? i.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml"
          , s = i ? n ? "rect" : "g" : "div"
          , o = 2 !== n ? 0 : 100
          , a = 3 === n ? 100 : 0
          , l = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;"
          , u = xa.createElementNS ? xa.createElementNS(r.replace(/^https/, "http"), s) : xa.createElement(s);
        return n && (i ? (Ea || (Ea = t(e)),
        u.setAttribute("width", .01),
        u.setAttribute("height", .01),
        u.setAttribute("transform", "translate(" + o + "," + a + ")"),
        Ea.appendChild(u)) : (Sa || ((Sa = t(e)).style.cssText = l),
        u.style.cssText = l + "width:0.1px;height:0.1px;top:" + a + "px;left:" + o + "px",
        Sa.appendChild(u))),
        u
    }
    throw "Need document and parent."
}, Fa = function(t) {
    var e, n = t.getCTM();
    return n || (e = t.style[Pa],
    t.style[Pa] = "none",
    t.appendChild(Ca),
    n = Ca.getCTM(),
    t.removeChild(Ca),
    e ? t.style[Pa] = e : t.style.removeProperty(Pa.replace(/([A-Z])/g, "-$1").toLowerCase())),
    n || ka.clone()
}, Na = function(t, e) {
    var n, i, r, s, o, a, l = Ya(t), u = t === l, c = l ? La : Ra, h = t.parentNode;
    if (t === Ta)
        return t;
    if (c.length || c.push(Xa(t, 1), Xa(t, 2), Xa(t, 3)),
    n = l ? Ea : Sa,
    l)
        u ? (s = -(r = Fa(t)).e / r.a,
        o = -r.f / r.d,
        i = ka) : t.getBBox ? (r = t.getBBox(),
        i = (i = t.transform ? t.transform.baseVal : {}).numberOfItems ? i.numberOfItems > 1 ? function(t) {
            for (var e = new ja, n = 0; n < t.numberOfItems; n++)
                e.multiply(t.getItem(n).matrix);
            return e
        }(i) : i.getItem(0).matrix : ka,
        s = i.a * r.x + i.c * r.y,
        o = i.b * r.x + i.d * r.y) : (i = new ja,
        s = o = 0),
        e && "g" === t.tagName.toLowerCase() && (s = o = 0),
        (u ? l : h).appendChild(n),
        n.setAttribute("transform", "matrix(" + i.a + "," + i.b + "," + i.c + "," + i.d + "," + (i.e + s) + "," + (i.f + o) + ")");
    else {
        if (s = o = 0,
        Da)
            for (i = t.offsetParent,
            r = t; r && (r = r.parentNode) && r !== i && r.parentNode; )
                (Ta.getComputedStyle(r)[Pa] + "").length > 4 && (s = r.offsetLeft,
                o = r.offsetTop,
                r = 0);
        if ("absolute" !== (a = Ta.getComputedStyle(t)).position && "fixed" !== a.position)
            for (i = t.offsetParent; h && h !== i; )
                s += h.scrollLeft || 0,
                o += h.scrollTop || 0,
                h = h.parentNode;
        (r = n.style).top = t.offsetTop - o + "px",
        r.left = t.offsetLeft - s + "px",
        r[Pa] = a[Pa],
        r[Aa] = a[Aa],
        r.position = "fixed" === a.position ? "fixed" : "absolute",
        t.parentNode.appendChild(n)
    }
    return n
}, Va = function(t, e, n, i, r, s, o) {
    return t.a = e,
    t.b = n,
    t.c = i,
    t.d = r,
    t.e = s,
    t.f = o,
    t
}, ja = function() {
    function t(t, e, n, i, r, s) {
        void 0 === t && (t = 1),
        void 0 === e && (e = 0),
        void 0 === n && (n = 0),
        void 0 === i && (i = 1),
        void 0 === r && (r = 0),
        void 0 === s && (s = 0),
        Va(this, t, e, n, i, r, s)
    }
    var e = t.prototype;
    return e.inverse = function() {
        var t = this.a
          , e = this.b
          , n = this.c
          , i = this.d
          , r = this.e
          , s = this.f
          , o = t * i - e * n || 1e-10;
        return Va(this, i / o, -e / o, -n / o, t / o, (n * s - i * r) / o, -(t * s - e * r) / o)
    }
    ,
    e.multiply = function(t) {
        var e = this.a
          , n = this.b
          , i = this.c
          , r = this.d
          , s = this.e
          , o = this.f
          , a = t.a
          , l = t.c
          , u = t.b
          , c = t.d
          , h = t.e
          , f = t.f;
        return Va(this, a * e + u * i, a * n + u * r, l * e + c * i, l * n + c * r, s + h * e + f * i, o + h * n + f * r)
    }
    ,
    e.clone = function() {
        return new t(this.a,this.b,this.c,this.d,this.e,this.f)
    }
    ,
    e.equals = function(t) {
        var e = this.a
          , n = this.b
          , i = this.c
          , r = this.d
          , s = this.e
          , o = this.f;
        return e === t.a && n === t.b && i === t.c && r === t.d && s === t.e && o === t.f
    }
    ,
    e.apply = function(t, e) {
        void 0 === e && (e = {});
        var n = t.x
          , i = t.y
          , r = this.a
          , s = this.b
          , o = this.c
          , a = this.d
          , l = this.e
          , u = this.f;
        return e.x = n * r + i * o + l || 0,
        e.y = n * s + i * a + u || 0,
        e
    }
    ,
    t
}();
function qa(t, e, n, i) {
    if (!t || !t.parentNode || (xa || Ia(t)).documentElement === t)
        return new ja;
    var r = function(t) {
        for (var e, n; t && t !== Ma; )
            (n = t._gsap) && n.uncache && n.get(t, "x"),
            n && !n.scaleX && !n.scaleY && n.renderTransform && (n.scaleX = n.scaleY = 1e-4,
            n.renderTransform(1, n),
            e ? e.push(n) : e = [n]),
            t = t.parentNode;
        return e
    }(t)
      , s = Ya(t) ? La : Ra
      , o = Na(t, n)
      , a = s[0].getBoundingClientRect()
      , l = s[1].getBoundingClientRect()
      , u = s[2].getBoundingClientRect()
      , c = o.parentNode
      , h = !i && Wa(t)
      , f = new ja((l.left - a.left) / 100,(l.top - a.top) / 100,(u.left - a.left) / 100,(u.top - a.top) / 100,a.left + (h ? 0 : Ba()),a.top + (h ? 0 : za()));
    if (c.removeChild(o),
    r)
        for (a = r.length; a--; )
            (l = r[a]).scaleX = l.scaleY = 0,
            l.renderTransform(1, l);
    return e ? f.inverse() : f
}
var Ha, $a, Ua, Ga, Ka, Qa, Za, Ja = 1, tl = function(t, e) {
    return t.actions.forEach((function(t) {
        return t.vars[e] && t.vars[e](t)
    }
    ))
}, el = {}, nl = 180 / Math.PI, il = Math.PI / 180, rl = {}, sl = {}, ol = {}, al = function(t) {
    return "string" == typeof t ? t.split(" ").join("").split(",") : t
}, ll = al("onStart,onUpdate,onComplete,onReverseComplete,onInterrupt"), ul = al("transform,transformOrigin,width,height,position,top,left,opacity,zIndex,maxWidth,maxHeight,minWidth,minHeight"), cl = function(t) {
    return Ha(t)[0] || console.warn("Element not found:", t)
}, hl = function(t) {
    return Math.round(1e4 * t) / 1e4 || 0
}, fl = function(t, e, n) {
    return t.forEach((function(t) {
        return t.classList[n](e)
    }
    ))
}, dl = {
    zIndex: 1,
    kill: 1,
    simple: 1,
    spin: 1,
    clearProps: 1,
    targets: 1,
    toggleClass: 1,
    onComplete: 1,
    onUpdate: 1,
    onInterrupt: 1,
    onStart: 1,
    delay: 1,
    repeat: 1,
    repeatDelay: 1,
    yoyo: 1,
    scale: 1,
    fade: 1,
    absolute: 1,
    props: 1,
    onEnter: 1,
    onLeave: 1,
    custom: 1,
    paused: 1,
    nested: 1,
    prune: 1,
    absoluteOnLeave: 1
}, pl = {
    zIndex: 1,
    simple: 1,
    clearProps: 1,
    scale: 1,
    absolute: 1,
    fitChild: 1,
    getVars: 1,
    props: 1
}, gl = function(t) {
    return t.replace(/([A-Z])/g, "-$1").toLowerCase()
}, ml = function(t, e) {
    var n, i = {};
    for (n in t)
        e[n] || (i[n] = t[n]);
    return i
}, vl = {}, _l = function(t) {
    var e = vl[t] = al(t);
    return ol[t] = e.concat(ul),
    e
}, yl = function t(e, n, i) {
    void 0 === i && (i = 0);
    for (var r = e.parentNode, s = 1e3 * Math.pow(10, i) * (n ? -1 : 1), o = n ? 900 * -s : 0; e; )
        o += s,
        e = e.previousSibling;
    return r ? o + t(r, n, i + 1) : o
}, wl = function(t, e, n) {
    return t.forEach((function(t) {
        return t.d = yl(n ? t.element : t.t, e)
    }
    )),
    t.sort((function(t, e) {
        return t.d - e.d
    }
    )),
    t
}, bl = function(t, e) {
    for (var n, i, r = t.element.style, s = t.css = t.css || [], o = e.length; o--; )
        i = r[n = e[o]] || r.getPropertyValue(n),
        s.push(i ? n : sl[n] || (sl[n] = gl(n)), i);
    return r
}, xl = function(t) {
    var e = t.css
      , n = t.element.style
      , i = 0;
    for (t.cache.uncache = 1; i < e.length; i += 2)
        e[i + 1] ? n[e[i]] = e[i + 1] : n.removeProperty(e[i])
}, Tl = function(t, e) {
    t.forEach((function(t) {
        return t.a.cache.uncache = 1
    }
    )),
    e || t.finalStates.forEach(xl)
}, Ol = "paddingTop,paddingRight,paddingBottom,paddingLeft,gridArea,transition".split(","), Ml = function(t, e, n) {
    var i, r, s, o = t.element, a = t.width, l = t.height, u = t.uncache, c = t.getProp, h = o.style, f = 4;
    if ("object" != typeof e && (e = t),
    Ua && 1 !== n)
        return Ua._abs.push({
            t: o,
            b: t,
            a: t,
            sd: 0
        }),
        Ua._final.push((function() {
            return t.cache.uncache = 1,
            xl(t)
        }
        )),
        o;
    for (r = "none" === c("display"),
    t.isVisible && !r || (r && (bl(t, ["display"]).display = e.display),
    t.matrix = e.matrix,
    t.width = a = t.width || e.width,
    t.height = l = t.height || e.height),
    bl(t, Ol),
    s = window.getComputedStyle(o); f--; )
        h[Ol[f]] = s[Ol[f]];
    if (h.gridArea = "1 / 1 / 1 / 1",
    h.transition = "none",
    h.position = "absolute",
    h.width = a + "px",
    h.height = l + "px",
    h.top || (h.top = "0px"),
    h.left || (h.left = "0px"),
    u)
        i = new Vl(o);
    else if ((i = ml(t, rl)).position = "absolute",
    t.simple) {
        var d = o.getBoundingClientRect();
        i.matrix = new ja(1,0,0,1,d.left + Ba(),d.top + za())
    } else
        i.matrix = qa(o, !1, !1, !0);
    return i = Al(i, t, !0),
    t.x = Qa(i.x, .01),
    t.y = Qa(i.y, .01),
    o
}, Sl = function(t, e) {
    return !0 !== e && (e = Ha(e),
    t = t.filter((function(t) {
        if (-1 !== e.indexOf((t.sd < 0 ? t.b : t.a).element))
            return !0;
        t.t._gsap.renderTransform(1),
        t.t.style.width = t.b.width + "px",
        t.t.style.height = t.b.height + "px"
    }
    ))),
    t
}, El = function(t) {
    return wl(t, !0).forEach((function(t) {
        return (t.a.isVisible || t.b.isVisible) && Ml(t.sd < 0 ? t.b : t.a, t.b, 1)
    }
    ))
}, kl = function(t, e, n, i) {
    return t instanceof Vl ? t : t instanceof Nl ? function(t, e) {
        return e && t.idLookup[kl(e).id] || t.elementStates[0]
    }(t, i) : new Vl("string" == typeof t ? cl(t) || console.warn(t + " not found") : t,e,n)
}, Cl = function(t, e) {
    var n, i = t.style || t;
    for (n in e)
        i[n] = e[n]
}, Dl = function(t) {
    return t.map((function(t) {
        return t.element
    }
    ))
}, Pl = function(t, e, n) {
    return t && e.length && n.add(t(Dl(e), n, new Nl(e,0,!0)), 0)
}, Al = function(t, e, n, i, r, s) {
    var o, a, l, u, c, h, f, d = t.element, p = t.cache, g = t.parent, m = t.x, v = t.y, _ = e.width, y = e.height, w = e.scaleX, b = e.scaleY, x = e.rotation, T = e.bounds, O = s && d.style.cssText, M = s && d.getBBox && d.getAttribute("transform"), S = t, E = e.matrix, k = E.e, C = E.f, D = t.bounds.width !== T.width || t.bounds.height !== T.height || t.scaleX !== w || t.scaleY !== b || t.rotation !== x, P = !D && t.simple && e.simple && !r;
    return P || !g ? (w = b = 1,
    x = o = 0) : (c = function(t) {
        var e = t._gsap || $a.core.getCache(t);
        return e.gmCache === $a.ticker.frame ? e.gMatrix : (e.gmCache = $a.ticker.frame,
        e.gMatrix = qa(t, !0, !1, !0))
    }(g),
    h = c.clone().multiply(e.ctm ? e.matrix.clone().multiply(e.ctm) : e.matrix),
    x = hl(Math.atan2(h.b, h.a) * nl),
    o = hl(Math.atan2(h.c, h.d) * nl + x) % 360,
    w = Math.sqrt(Math.pow(h.a, 2) + Math.pow(h.b, 2)),
    b = Math.sqrt(Math.pow(h.c, 2) + Math.pow(h.d, 2)) * Math.cos(o * il),
    r && (r = Ha(r)[0],
    u = $a.getProperty(r),
    f = r.getBBox && "function" == typeof r.getBBox && r.getBBox(),
    S = {
        scaleX: u("scaleX"),
        scaleY: u("scaleY"),
        width: f ? f.width : Math.ceil(parseFloat(u("width", "px"))),
        height: f ? f.height : parseFloat(u("height", "px"))
    }),
    p.rotation = x + "deg",
    p.skewX = o + "deg"),
    n ? (w *= _ !== S.width && S.width ? _ / S.width : 1,
    b *= y !== S.height && S.height ? y / S.height : 1,
    p.scaleX = w,
    p.scaleY = b) : (_ = Qa(_ * w / S.scaleX, 0),
    y = Qa(y * b / S.scaleY, 0),
    d.style.width = _ + "px",
    d.style.height = y + "px"),
    i && Cl(d, e.props),
    P || !g ? (m += k - t.matrix.e,
    v += C - t.matrix.f) : D || g !== e.parent ? (p.renderTransform(1, p),
    h = qa(r || d, !1, !1, !0),
    a = c.apply({
        x: h.e,
        y: h.f
    }),
    m += (l = c.apply({
        x: k,
        y: C
    })).x - a.x,
    v += l.y - a.y) : (c.e = c.f = 0,
    m += (l = c.apply({
        x: k - t.matrix.e,
        y: C - t.matrix.f
    })).x,
    v += l.y),
    m = Qa(m, .02),
    v = Qa(v, .02),
    !s || s instanceof Vl ? (p.x = m + "px",
    p.y = v + "px",
    p.renderTransform(1, p)) : (d.style.cssText = O,
    d.getBBox && d.setAttribute("transform", M || ""),
    p.uncache = 1),
    s && (s.x = m,
    s.y = v,
    s.rotation = x,
    s.skewX = o,
    n ? (s.scaleX = w,
    s.scaleY = b) : (s.width = _,
    s.height = y)),
    s || p
}, Il = function(t, e) {
    return t instanceof Nl ? t : new Nl(t,e)
}, Ll = function(t, e, n) {
    var i = t.idLookup[n]
      , r = t.alt[n];
    return !r.isVisible || (e.getElementState(r.element) || r).isVisible && i.isVisible ? i : r
}, Rl = [], zl = "width,height,overflowX,overflowY".split(","), Bl = function(t) {
    if (t !== Za) {
        var e = Ka.style
          , n = Ka.clientWidth === window.outerWidth
          , i = Ka.clientHeight === window.outerHeight
          , r = 4;
        if (t && (n || i)) {
            for (; r--; )
                Rl[r] = e[zl[r]];
            n && (e.width = Ka.clientWidth + "px",
            e.overflowY = "hidden"),
            i && (e.height = Ka.clientHeight + "px",
            e.overflowX = "hidden"),
            Za = t
        } else if (Za) {
            for (; r--; )
                Rl[r] ? e[zl[r]] = Rl[r] : e.removeProperty(gl(zl[r]));
            Za = t
        }
    }
}, Yl = function(t, e, n, i) {
    t instanceof Nl && e instanceof Nl || console.warn("Not a valid state object.");
    var r, s, o, a, l, u, c, h, f, d, p, g, m, v, _, y = n = n || {}, w = y.clearProps, b = y.onEnter, x = y.onLeave, T = y.absolute, O = y.absoluteOnLeave, M = y.custom, S = y.delay, E = y.paused, k = y.repeat, C = y.repeatDelay, D = y.yoyo, P = y.toggleClass, A = y.nested, I = y.zIndex, L = y.scale, R = y.fade, z = y.stagger, B = y.spin, Y = y.prune, W = ("props"in n ? n : t).props, X = ml(n, dl), F = $a.timeline({
        delay: S,
        paused: E,
        repeat: k,
        repeatDelay: C,
        yoyo: D
    }), N = X, V = [], j = [], q = [], H = [], $ = !0 === B ? 1 : B || 0, U = "function" == typeof B ? B : function() {
        return $
    }
    , G = t.interrupted || e.interrupted, K = F[1 !== i ? "to" : "from"];
    for (s in e.idLookup)
        p = e.alt[s] ? Ll(e, t, s) : e.idLookup[s],
        l = p.element,
        d = t.idLookup[s],
        t.alt[s] && l === d.element && (t.alt[s].isVisible || !p.isVisible) && (d = t.alt[s]),
        d ? (u = {
            t: l,
            b: d,
            a: p,
            sd: d.element === l ? 0 : p.isVisible ? 1 : -1
        },
        q.push(u),
        u.sd && (u.sd < 0 && (u.b = p,
        u.a = d),
        G && bl(u.b, W ? ol[W] : ul),
        R && q.push(u.swap = {
            t: d.element,
            b: u.b,
            a: u.a,
            sd: -u.sd,
            swap: u
        })),
        l._flip = d.element._flip = Ua ? Ua.timeline : F) : p.isVisible && (q.push({
            t: l,
            b: ml(p, {
                isVisible: 1
            }),
            a: p,
            sd: 0,
            entering: 1
        }),
        l._flip = Ua ? Ua.timeline : F);
    (W && (vl[W] || _l(W)).forEach((function(t) {
        return X[t] = function(e) {
            return q[e].a.props[t]
        }
    }
    )),
    q.finalStates = f = [],
    g = function() {
        for (wl(q),
        Bl(!0),
        a = 0; a < q.length; a++)
            u = q[a],
            m = u.a,
            v = u.b,
            !Y || m.isDifferent(v) || u.entering ? (l = u.t,
            A && !(u.sd < 0) && a && (m.matrix = qa(l, !1, !1, !0)),
            u.sd || v.isVisible && m.isVisible ? (u.sd < 0 ? (c = new Vl(l,W,t.simple),
            Al(c, m, L, 0, 0, c),
            c.matrix = qa(l, !1, !1, !0),
            c.css = u.b.css,
            u.a = m = c,
            R && (l.style.opacity = G ? v.opacity : m.opacity),
            z && H.push(l)) : u.sd > 0 && R && (l.style.opacity = G ? m.opacity - v.opacity : "0"),
            Al(m, v, L, W)) : v.isVisible !== m.isVisible && (v.isVisible ? m.isVisible || (v.css = m.css,
            j.push(v),
            q.splice(a--, 1),
            T && A && Al(m, v, L, W)) : (m.isVisible && V.push(m),
            q.splice(a--, 1))),
            L || (l.style.maxWidth = Math.max(m.width, v.width) + "px",
            l.style.maxHeight = Math.max(m.height, v.height) + "px",
            l.style.minWidth = Math.min(m.width, v.width) + "px",
            l.style.minHeight = Math.min(m.height, v.height) + "px"),
            A && P && l.classList.add(P)) : q.splice(a--, 1),
            f.push(m);
        var e;
        if (P && (e = f.map((function(t) {
            return t.element
        }
        )),
        A && e.forEach((function(t) {
            return t.classList.remove(P)
        }
        ))),
        Bl(!1),
        L ? (X.scaleX = function(t) {
            return q[t].a.scaleX
        }
        ,
        X.scaleY = function(t) {
            return q[t].a.scaleY
        }
        ) : (X.width = function(t) {
            return q[t].a.width + "px"
        }
        ,
        X.height = function(t) {
            return q[t].a.height + "px"
        }
        ,
        X.autoRound = n.autoRound || !1),
        X.x = function(t) {
            return q[t].a.x + "px"
        }
        ,
        X.y = function(t) {
            return q[t].a.y + "px"
        }
        ,
        X.rotation = function(t) {
            return q[t].a.rotation + (B ? 360 * U(t, h[t], h) : 0)
        }
        ,
        X.skewX = function(t) {
            return q[t].a.skewX
        }
        ,
        h = q.map((function(t) {
            return t.t
        }
        )),
        (I || 0 === I) && (X.modifiers = {
            zIndex: function() {
                return I
            }
        },
        X.zIndex = I,
        X.immediateRender = !1 !== n.immediateRender),
        R && (X.opacity = function(t) {
            return q[t].sd < 0 ? 0 : q[t].sd > 0 ? q[t].a.opacity : "+=0"
        }
        ),
        H.length) {
            z = $a.utils.distribute(z);
            var i = h.slice(H.length);
            X.stagger = function(t, e) {
                return z(~H.indexOf(e) ? h.indexOf(q[t].swap.t) : t, e, i)
            }
        }
        if (ll.forEach((function(t) {
            return n[t] && F.eventCallback(t, n[t], n[t + "Params"])
        }
        )),
        M && h.length)
            for (s in N = ml(X, dl),
            "scale"in M && (M.scaleX = M.scaleY = M.scale,
            delete M.scale),
            M)
                (r = ml(M[s], pl))[s] = X[s],
                !("duration"in r) && "duration"in X && (r.duration = X.duration),
                r.stagger = X.stagger,
                K.call(F, h, r, 0),
                delete N[s];
        (h.length || j.length || V.length) && (P && F.add((function() {
            return fl(e, P, F._zTime < 0 ? "remove" : "add")
        }
        ), 0) && !E && fl(e, P, "add"),
        h.length && K.call(F, h, N, 0)),
        Pl(b, V, F),
        Pl(x, j, F);
        var d = Ua && Ua.timeline;
        d && (d.add(F, 0),
        Ua._final.push((function() {
            return Tl(q, !w)
        }
        ))),
        o = F.duration(),
        F.call((function() {
            var t = F.time() >= o;
            t && !d && Tl(q, !w),
            P && fl(e, P, t ? "remove" : "add")
        }
        ))
    }
    ,
    O && (T = q.filter((function(t) {
        return !t.sd && !t.a.isVisible && t.b.isVisible
    }
    )).map((function(t) {
        return t.a.element
    }
    ))),
    Ua) ? (T && (_ = Ua._abs).push.apply(_, Sl(q, T)),
    Ua._run.push(g)) : (T && El(Sl(q, T)),
    g());
    return Ua ? Ua.timeline : F
}, Wl = function t(e) {
    e.vars.onInterrupt && e.vars.onInterrupt.apply(e, e.vars.onInterruptParams || []),
    e.getChildren(!0, !1, !0).forEach(t)
}, Xl = function(t, e) {
    if (t && t.progress() < 1 && !t.paused())
        return e && (Wl(t),
        e < 2 && t.progress(1),
        t.kill()),
        !0
}, Fl = function(t) {
    for (var e, n = t.idLookup = {}, i = t.alt = {}, r = t.elementStates, s = r.length; s--; )
        n[(e = r[s]).id] ? i[e.id] = e : n[e.id] = e
}, Nl = function() {
    function t(t, e, n) {
        if (this.props = e && e.props,
        this.simple = !(!e || !e.simple),
        n)
            this.targets = Dl(t),
            this.elementStates = t,
            Fl(this);
        else {
            this.targets = Ha(t);
            var i = e && (!1 === e.kill || e.batch && !e.kill);
            Ua && !i && Ua._kill.push(this),
            this.update(i || !!Ua)
        }
    }
    var e = t.prototype;
    return e.update = function(t) {
        var e = this;
        return this.elementStates = this.targets.map((function(t) {
            return new Vl(t,e.props,e.simple)
        }
        )),
        Fl(this),
        this.interrupt(t),
        this.recordInlineStyles(),
        this
    }
    ,
    e.clear = function() {
        return this.targets.length = this.elementStates.length = 0,
        Fl(this),
        this
    }
    ,
    e.fit = function(t, e, n) {
        for (var i, r, s = wl(this.elementStates.slice(0), !1, !0), o = (t || this).idLookup, a = 0; a < s.length; a++)
            i = s[a],
            n && (i.matrix = qa(i.element, !1, !1, !0)),
            (r = o[i.id]) && Al(i, r, e, !0, 0, i),
            i.matrix = qa(i.element, !1, !1, !0);
        return this
    }
    ,
    e.getProperty = function(t, e) {
        var n = this.getElementState(t) || rl;
        return (e in n ? n : n.props || rl)[e]
    }
    ,
    e.add = function(t) {
        for (var e, n, i, r = t.targets.length, s = this.idLookup, o = this.alt; r--; )
            (i = s[(n = t.elementStates[r]).id]) && (n.element === i.element || o[n.id] && o[n.id].element === n.element) ? (e = this.elementStates.indexOf(n.element === i.element ? i : o[n.id]),
            this.targets.splice(e, 1, t.targets[r]),
            this.elementStates.splice(e, 1, n)) : (this.targets.push(t.targets[r]),
            this.elementStates.push(n));
        return t.interrupted && (this.interrupted = !0),
        t.simple || (this.simple = !1),
        Fl(this),
        this
    }
    ,
    e.compare = function(t) {
        var e, n, i, r, s, o, a, l, u = t.idLookup, c = this.idLookup, h = [], f = [], d = [], p = [], g = [], m = t.alt, v = this.alt, _ = function(t, e, n) {
            return (t.isVisible !== e.isVisible ? t.isVisible ? d : p : t.isVisible ? f : h).push(n) && g.push(n)
        }, y = function(t, e, n) {
            return g.indexOf(n) < 0 && _(t, e, n)
        };
        for (i in u)
            s = m[i],
            o = v[i],
            r = (e = s ? Ll(t, this, i) : u[i]).element,
            n = c[i],
            o ? (l = n.isVisible || !o.isVisible && r === n.element ? n : o,
            (a = !s || e.isVisible || s.isVisible || l.element !== s.element ? e : s).isVisible && l.isVisible && a.element !== l.element ? ((a.isDifferent(l) ? f : h).push(a.element, l.element),
            g.push(a.element, l.element)) : _(a, l, a.element),
            s && a.element === s.element && (s = u[i]),
            y(a.element !== n.element && s ? s : a, n, n.element),
            y(s && s.element === o.element ? s : a, o, o.element),
            s && y(s, o.element === s.element ? o : n, s.element)) : (n ? n.isDifferent(e) ? _(e, n, r) : h.push(r) : d.push(r),
            s && y(s, n, s.element));
        for (i in c)
            u[i] || (p.push(c[i].element),
            v[i] && p.push(v[i].element));
        return {
            changed: f,
            unchanged: h,
            enter: d,
            leave: p
        }
    }
    ,
    e.recordInlineStyles = function() {
        for (var t = ol[this.props] || ul, e = this.elementStates.length; e--; )
            bl(this.elementStates[e], t)
    }
    ,
    e.interrupt = function(t) {
        var e = this
          , n = [];
        this.targets.forEach((function(i) {
            var r = i._flip
              , s = Xl(r, t ? 0 : 1);
            t && s && n.indexOf(r) < 0 && r.add((function() {
                return e.updateVisibility()
            }
            )),
            s && n.push(r)
        }
        )),
        !t && n.length && this.updateVisibility(),
        this.interrupted || (this.interrupted = !!n.length)
    }
    ,
    e.updateVisibility = function() {
        this.elementStates.forEach((function(t) {
            var e = t.element.getBoundingClientRect();
            t.isVisible = !!(e.width || e.height || e.top || e.left),
            t.uncache = 1
        }
        ))
    }
    ,
    e.getElementState = function(t) {
        return this.elementStates[this.targets.indexOf(cl(t))]
    }
    ,
    e.makeAbsolute = function() {
        return wl(this.elementStates.slice(0), !0, !0).map(Ml)
    }
    ,
    t
}(), Vl = function() {
    function t(t, e, n) {
        this.element = t,
        this.update(e, n)
    }
    var e = t.prototype;
    return e.isDifferent = function(t) {
        var e = this.bounds
          , n = t.bounds;
        return e.top !== n.top || e.left !== n.left || e.width !== n.width || e.height !== n.height || !this.matrix.equals(t.matrix) || this.opacity !== t.opacity || this.props && t.props && JSON.stringify(this.props) !== JSON.stringify(t.props)
    }
    ,
    e.update = function(t, e) {
        var n, i, r = this, s = r.element, o = $a.getProperty(s), a = $a.core.getCache(s), l = s.getBoundingClientRect(), u = s.getBBox && "function" == typeof s.getBBox && "svg" !== s.nodeName.toLowerCase() && s.getBBox(), c = e ? new ja(1,0,0,1,l.left + Ba(),l.top + za()) : qa(s, !1, !1, !0);
        r.getProp = o,
        r.element = s,
        r.id = ((i = (n = s).getAttribute("data-flip-id")) || n.setAttribute("data-flip-id", i = "auto-" + Ja++),
        i),
        r.matrix = c,
        r.cache = a,
        r.bounds = l,
        r.isVisible = !!(l.width || l.height || l.left || l.top),
        r.display = o("display"),
        r.position = o("position"),
        r.parent = s.parentNode,
        r.x = o("x"),
        r.y = o("y"),
        r.scaleX = a.scaleX,
        r.scaleY = a.scaleY,
        r.rotation = o("rotation"),
        r.skewX = o("skewX"),
        r.opacity = o("opacity"),
        r.width = u ? u.width : Qa(o("width", "px"), .04),
        r.height = u ? u.height : Qa(o("height", "px"), .04),
        t && function(t, e) {
            for (var n = $a.getProperty(t.element, null, "native"), i = t.props = {}, r = e.length; r--; )
                i[e[r]] = (n(e[r]) + "").trim();
            i.zIndex && (i.zIndex = parseFloat(i.zIndex) || 0)
        }(r, vl[t] || _l(t)),
        r.ctm = s.getCTM && "svg" === s.nodeName.toLowerCase() && Fa(s).inverse(),
        r.simple = e || 1 === hl(c.a) && !hl(c.b) && !hl(c.c) && 1 === hl(c.d),
        r.uncache = 0
    }
    ,
    t
}(), jl = function() {
    function t(t, e) {
        this.vars = t,
        this.batch = e,
        this.states = [],
        this.timeline = e.timeline
    }
    var e = t.prototype;
    return e.getStateById = function(t) {
        for (var e = this.states.length; e--; )
            if (this.states[e].idLookup[t])
                return this.states[e]
    }
    ,
    e.kill = function() {
        this.batch.remove(this)
    }
    ,
    t
}(), ql = function() {
    function t(t) {
        this.id = t,
        this.actions = [],
        this._kill = [],
        this._final = [],
        this._abs = [],
        this._run = [],
        this.data = {},
        this.state = new Nl,
        this.timeline = $a.timeline()
    }
    var e = t.prototype;
    return e.add = function(t) {
        var e = this.actions.filter((function(e) {
            return e.vars === t
        }
        ));
        return e.length ? e[0] : (e = new jl("function" == typeof t ? {
            animate: t
        } : t,this),
        this.actions.push(e),
        e)
    }
    ,
    e.remove = function(t) {
        var e = this.actions.indexOf(t);
        return e >= 0 && this.actions.splice(e, 1),
        this
    }
    ,
    e.getState = function(t) {
        var e = this
          , n = Ua
          , i = Ga;
        return Ua = this,
        this.state.clear(),
        this._kill.length = 0,
        this.actions.forEach((function(n) {
            n.vars.getState && (n.states.length = 0,
            Ga = n,
            n.state = n.vars.getState(n)),
            t && n.states.forEach((function(t) {
                return e.state.add(t)
            }
            ))
        }
        )),
        Ga = i,
        Ua = n,
        this.killConflicts(),
        this
    }
    ,
    e.animate = function() {
        var t, e, n = this, i = Ua, r = this.timeline, s = this.actions.length;
        for (Ua = this,
        r.clear(),
        this._abs.length = this._final.length = this._run.length = 0,
        this.actions.forEach((function(t) {
            t.vars.animate && t.vars.animate(t);
            var e, n, i = t.vars.onEnter, r = t.vars.onLeave, s = t.targets;
            s && s.length && (i || r) && (e = new Nl,
            t.states.forEach((function(t) {
                return e.add(t)
            }
            )),
            (n = e.compare(Hl.getState(s))).enter.length && i && i(n.enter),
            n.leave.length && r && r(n.leave))
        }
        )),
        El(this._abs),
        this._run.forEach((function(t) {
            return t()
        }
        )),
        e = r.duration(),
        t = this._final.slice(0),
        r.add((function() {
            e <= r.time() && (t.forEach((function(t) {
                return t()
            }
            )),
            tl(n, "onComplete"))
        }
        )),
        Ua = i; s--; )
            this.actions[s].vars.once && this.actions[s].kill();
        return tl(this, "onStart"),
        r.restart(),
        this
    }
    ,
    e.loadState = function(t) {
        t || (t = function() {
            return 0
        }
        );
        var e = [];
        return this.actions.forEach((function(n) {
            if (n.vars.loadState) {
                var i, r = function r(s) {
                    s && (n.targets = s),
                    ~(i = e.indexOf(r)) && (e.splice(i, 1),
                    e.length || t())
                };
                e.push(r),
                n.vars.loadState(r)
            }
        }
        )),
        e.length || t(),
        this
    }
    ,
    e.setState = function() {
        return this.actions.forEach((function(t) {
            return t.targets = t.vars.setState && t.vars.setState(t)
        }
        )),
        this
    }
    ,
    e.killConflicts = function(t) {
        return this.state.interrupt(t),
        this._kill.forEach((function(e) {
            return e.interrupt(t)
        }
        )),
        this
    }
    ,
    e.run = function(t, e) {
        var n = this;
        return this !== Ua && (t || this.getState(e),
        this.loadState((function() {
            n._killed || (n.setState(),
            n.animate())
        }
        ))),
        this
    }
    ,
    e.clear = function(t) {
        this.state.clear(),
        t || (this.actions.length = 0)
    }
    ,
    e.getStateById = function(t) {
        for (var e, n = this.actions.length; n--; )
            if (e = this.actions[n].getStateById(t))
                return e;
        return this.state.idLookup[t] && this.state
    }
    ,
    e.kill = function() {
        this._killed = 1,
        this.clear(),
        delete el[this.id]
    }
    ,
    t
}(), Hl = function() {
    function t() {}
    return t.getState = function(e, n) {
        var i = Il(e, n);
        return Ga && Ga.states.push(i),
        n && n.batch && t.batch(n.batch).state.add(i),
        i
    }
    ,
    t.from = function(t, e) {
        return "clearProps"in (e = e || {}) || (e.clearProps = !0),
        Yl(t, Il(e.targets || t.targets, {
            props: e.props || t.props,
            simple: e.simple,
            kill: !!e.kill
        }), e, -1)
    }
    ,
    t.to = function(t, e) {
        return Yl(t, Il(e.targets || t.targets, {
            props: e.props || t.props,
            simple: e.simple,
            kill: !!e.kill
        }), e, 1)
    }
    ,
    t.fromTo = function(t, e, n) {
        return Yl(t, e, n)
    }
    ,
    t.fit = function(t, e, n) {
        var i = n ? ml(n, pl) : {}
          , r = n || i
          , s = r.absolute
          , o = r.scale
          , a = r.getVars
          , l = r.props
          , u = r.runBackwards
          , c = r.onComplete
          , h = r.simple
          , f = n && n.fitChild && cl(n.fitChild)
          , d = kl(e, l, h, t)
          , p = kl(t, 0, h, d)
          , g = l ? ol[l] : ul;
        return l && Cl(i, d.props),
        u && (bl(p, g),
        "immediateRender"in i || (i.immediateRender = !0),
        i.onComplete = function() {
            xl(p),
            c && c.apply(this, arguments)
        }
        ),
        s && Ml(p, d),
        i = Al(p, d, o || f, l, f, i.duration || a ? i : 0),
        a ? i : i.duration ? $a.to(p.element, i) : null
    }
    ,
    t.makeAbsolute = function(t, e) {
        return (t instanceof Nl ? t : new Nl(t,e)).makeAbsolute()
    }
    ,
    t.batch = function(t) {
        return t || (t = "default"),
        el[t] || (el[t] = new ql(t))
    }
    ,
    t.killFlipsOf = function(t, e) {
        (t instanceof Nl ? t.targets : Ha(t)).forEach((function(t) {
            return t && Xl(t._flip, !1 !== e ? 1 : 2)
        }
        ))
    }
    ,
    t.isFlipping = function(e) {
        var n = t.getByTarget(e);
        return !!n && n.isActive()
    }
    ,
    t.getByTarget = function(t) {
        return (cl(t) || rl)._flip
    }
    ,
    t.getElementState = function(t, e) {
        return new Vl(cl(t),e)
    }
    ,
    t.convertCoordinates = function(t, e, n) {
        var i = qa(e, !0, !0).multiply(qa(t));
        return n ? i.apply(n) : i
    }
    ,
    t.register = function(t) {
        if (Ka = "undefined" != typeof document && document.body) {
            $a = t,
            Ia(Ka),
            Ha = $a.utils.toArray;
            var e = $a.utils.snap(.1);
            Qa = function(t, n) {
                return e(parseFloat(t) + n)
            }
        }
    }
    ,
    t
}();
Hl.version = "3.10.4",
"undefined" != typeof window && window.gsap && window.gsap.registerPlugin(Hl),
Tr.registerPlugin(fa),
Tr.registerPlugin(Hl);
const $l = {
    duration: 1.5,
    ease: "power4.inOut"
}
  , Ul = [...document.querySelectorAll(".preview")]
  , Gl = [...document.querySelectorAll(".content")]
  , Kl = [];
Ul.forEach(((t,e)=>{
    Kl.push(new Sr(t,Gl[e]))
}
));
const Ql = document.querySelector(".action--back");
let Zl, Jl = -1, tu = !1;
const eu = t=>{
    const e = Kl.indexOf(t)
      , n = (t=>{
        let e = [];
        for (const [r,s] of Kl.entries())
            t != s && (n = s.DOM.el,
            i = void 0,
            ((i = n.getBoundingClientRect()).bottom >= 0 && i.bottom <= (window.innerHeight || document.documentElement.clientHeight) || i.top >= 0 && i.top <= (window.innerHeight || document.documentElement.clientHeight)) && (i.right >= 0 && i.right <= (window.innerWidth || document.documentElement.clientWidth) || i.left >= 0 && i.left <= (window.innerWidth || document.documentElement.clientWidth))) && e.push({
                position: r,
                item: s
            });
        var n, i;
        return e
    }
    )(t);
    t.adjacentItems = n;
    const i = Tr.timeline({
        defaults: $l,
        onStart: ()=>{
            Zl.stop(),
            document.body.classList.add("content-open"),
            t.content.DOM.el.classList.add("content--current"),
            Tr.set([t.content.DOM.titleInner, t.content.DOM.metaInner], {
                yPercent: -101,
                opacity: 0
            }),
            Tr.set(t.content.DOM.thumbs, {
                transformOrigin: "0% 0%",
                scale: 0,
                yPercent: 150
            }),
            Tr.set([t.content.DOM.text, Ql], {
                opacity: 0
            });
            const e = t.DOM.imageInner.getBoundingClientRect().height / t.DOM.imageInner.offsetHeight;
            t.imageInnerScaleYCached = e
        }
        ,
        onComplete: ()=>tu = !1
    }).addLabel("start", 0);
    for (const n of t.adjacentItems)
        i.to(n.item.DOM.el, {
            y: n.position < e ? -window.innerHeight : window.innerHeight
        }, "start");
    i.add((()=>{
        const e = Hl.getState(t.DOM.image);
        t.content.DOM.el.appendChild(t.DOM.image),
        Hl.from(e, {
            duration: $l.duration,
            ease: $l.ease,
            absolute: !0
        })
    }
    ), "start").to(t.DOM.titleInner, {
        yPercent: 101,
        opacity: 0,
        stagger: -.03
    }, "start").to(t.DOM.description, {
        yPercent: 101,
        opacity: 0
    }, "start").to(t.DOM.imageInner, {
        scaleY: 1,
        scaleX: 1

    }, "start").addLabel("content", .15).to(Ql, {
        opacity: 1
    }, "content").to(t.content.DOM.titleInner, {
        yPercent: 0,
        opacity: 1,
        stagger: -.05
    }, "content").to(t.content.DOM.metaInner, {
        yPercent: 0,
        opacity: 1
    }, "content").to(t.content.DOM.thumbs, {
        scale: 1,
        yPercent: 0,
        stagger: -.05
    }, "content").add((()=>{
        t.content.multiLine.in(),
        Tr.set(t.content.DOM.text, {
            opacity: 1,
            delay: .01
        })
    }
    ), "content")
}
  , nu = ()=>{
    for (const [t,e] of Kl.entries())
        e.DOM.imageWrap.addEventListener("click", (()=>{
            tu || (tu = !0,
            Jl = t,
            eu(e))
        }
        ));
    Ql.addEventListener("click", (()=>{
        tu || (tu = !0,
        (()=>{
            const t = Kl[Jl];
            Tr.timeline({
                defaults: $l,
                onComplete: ()=>{
                    Zl.start(),
                    document.body.classList.remove("content-open"),
                    t.content.DOM.el.classList.remove("content--current"),
                    tu = !1
                }
            }).addLabel("start", 0).to(Ql, {
                opacity: 0
            }, "start").to(t.content.DOM.titleInner, {
                yPercent: -101,
                opacity: 0,
                stagger: .05
            }, "start").to(t.content.DOM.metaInner, {
                yPercent: -101,
                opacity: 0
            }, "start").to(t.content.DOM.thumbs, {
                scale: 0,
                yPercent: 150,
                stagger: -.05
            }, "start").add((()=>{
                t.content.multiLine.out()
            }
            ), "start").addLabel("preview", .15).to(t.adjacentItems.map((t=>t.item.DOM.el)), {
                y: 0
            }, "preview").add((()=>{
                const e = Hl.getState(t.DOM.image);
                t.DOM.imageWrap.appendChild(t.DOM.image),
                Hl.from(e, {
                    duration: $l.duration,
                    ease: $l.ease,
                    absolute: !0
                })
            }
            ), "preview").to(t.DOM.titleInner, {
                yPercent: 0,
                opacity: 1,
                stagger: .03
            }, "preview").to(t.DOM.description, {
                yPercent: 0,
                opacity: 1
            }, "preview").to(t.DOM.imageInner, {
                scaleY: t.imageInnerScaleYCached
            }, "preview")
        }
        )())
    }
    ))
}
;
((t="img")=>new Promise((e=>{
    s(document.querySelectorAll(t), {
        background: !0
    }, e)
}
)))(".preview__img-inner, .content__thumbs-item").then((t=>{
    document.body.classList.remove("loading"),
    (()=>{
        Zl = new Pr({
            lerp: .1,
            smooth: !0,
            direction: "vertical"
        });
        const t = ()=>{
            Zl.raf(),
            requestAnimationFrame(t)
        }
        ;
        requestAnimationFrame(t)
    }
    )(),
    (()=>{
        for (const t of Kl)
            Tr.set(t.DOM.imageInner, {
                transformOrigin: "50% 50%"
            }),
            t.scrollTimeline = Tr.timeline({
                scrollTrigger: {
                    trigger: t.DOM.el,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: !0
                }
            }).addLabel("start", 0).to(t.DOM.title, {
                ease: "none",
                yPercent: -100
            }, "start").to(t.DOM.imageInner, {
                ease: "none",
                scaleY: 1.5,
                scaleX: 1.5,
                
            }, "start")
    }
    )(),
    nu()
}
));
