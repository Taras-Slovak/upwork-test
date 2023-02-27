(function () {
  const c = document.createElement('link').relList;
  if (c && c.supports && c.supports('modulepreload')) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) u(i);
  new MutationObserver((i) => {
    for (const e of i)
      if (e.type === 'childList')
        for (const t of e.addedNodes)
          t.tagName === 'LINK' && t.rel === 'modulepreload' && u(t);
  }).observe(document, { childList: !0, subtree: !0 });
  function d(i) {
    const e = {};
    return (
      i.integrity && (e.integrity = i.integrity),
      i.referrerPolicy && (e.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === 'use-credentials'
        ? (e.credentials = 'include')
        : i.crossOrigin === 'anonymous'
        ? (e.credentials = 'omit')
        : (e.credentials = 'same-origin'),
      e
    );
  }
  function u(i) {
    if (i.ep) return;
    i.ep = !0;
    const e = d(i);
    fetch(i.href, e);
  }
})();
var v = {},
  S = {
    get exports() {
      return v;
    },
    set exports(f) {
      v = f;
    },
  };
/* @preserve
    _____ __ _     __                _
   / ___// /(_)___/ /___  ____      (_)___
  / (_ // // // _  // -_)/ __/_    / /(_-<
  \___//_//_/ \_,_/ \__//_/  (_)__/ //___/
                              |___/

  Version: 1.7.4
  Author: Nick Piscitelli (pickykneee)
  Website: https://nickpiscitelli.com
  Documentation: http://nickpiscitelli.github.io/Glider.js
  License: MIT License
  Release Date: October 25th, 2018

*/ (function (f, c) {
  (function (d) {
    f.exports = d();
  })(function () {
    var d = typeof window < 'u' ? window : this,
      u = (d.Glider = function (e, t) {
        var o = this;
        if (e._glider) return e._glider;
        if (
          ((o.ele = e),
          o.ele.classList.add('glider'),
          (o.ele._glider = o),
          (o.opt = Object.assign(
            {},
            {
              slidesToScroll: 1,
              slidesToShow: 1,
              resizeLock: !0,
              duration: 0.5,
              easing: function (r, s, a, n, l) {
                return n * (s /= l) * s + a;
              },
            },
            t
          )),
          (o.animate_id = o.page = o.slide = 0),
          (o.arrows = {}),
          (o._opt = o.opt),
          o.opt.skipTrack)
        )
          o.track = o.ele.children[0];
        else
          for (
            o.track = document.createElement('div'), o.ele.appendChild(o.track);
            o.ele.children.length !== 1;

          )
            o.track.appendChild(o.ele.children[0]);
        o.track.classList.add('glider-track'),
          o.init(),
          (o.resize = o.init.bind(o, !0)),
          o.event(o.ele, 'add', { scroll: o.updateControls.bind(o) }),
          o.event(d, 'add', { resize: o.resize });
      }),
      i = u.prototype;
    return (
      (i.init = function (e, t) {
        var o = this,
          r = 0,
          s = 0;
        (o.slides = o.track.children),
          [].forEach.call(o.slides, function (l, p) {
            l.classList.add('glider-slide'), l.setAttribute('data-gslide', p);
          }),
          (o.containerWidth = o.ele.clientWidth);
        var a = o.settingsBreakpoint();
        if (
          (t || (t = a),
          o.opt.slidesToShow === 'auto' || typeof o.opt._autoSlide < 'u')
        ) {
          var n = o.containerWidth / o.opt.itemWidth;
          o.opt._autoSlide = o.opt.slidesToShow = o.opt.exactWidth
            ? n
            : Math.max(1, Math.floor(n));
        }
        o.opt.slidesToScroll === 'auto' &&
          (o.opt.slidesToScroll = Math.floor(o.opt.slidesToShow)),
          (o.itemWidth = o.opt.exactWidth
            ? o.opt.itemWidth
            : o.containerWidth / o.opt.slidesToShow),
          [].forEach.call(o.slides, function (l) {
            (l.style.height = 'auto'),
              (l.style.width = o.itemWidth + 'px'),
              (r += o.itemWidth),
              (s = Math.max(l.offsetHeight, s));
          }),
          (o.track.style.width = r + 'px'),
          (o.trackWidth = r),
          (o.isDrag = !1),
          (o.preventClick = !1),
          (o.move = !1),
          o.opt.resizeLock && o.scrollTo(o.slide * o.itemWidth, 0),
          (a || t) && (o.bindArrows(), o.buildDots(), o.bindDrag()),
          o.updateControls(),
          o.emit(e ? 'refresh' : 'loaded');
      }),
      (i.bindDrag = function () {
        var e = this;
        e.mouse = e.mouse || e.handleMouse.bind(e);
        var t = function () {
          (e.mouseDown = void 0),
            e.ele.classList.remove('drag'),
            e.isDrag && (e.preventClick = !0),
            (e.isDrag = !1);
        };
        const o = function () {
          e.move = !0;
        };
        var r = {
          mouseup: t,
          mouseleave: t,
          mousedown: function (s) {
            s.preventDefault(),
              s.stopPropagation(),
              (e.mouseDown = s.clientX),
              e.ele.classList.add('drag'),
              (e.move = !1),
              setTimeout(o, 300);
          },
          touchstart: function (s) {
            e.ele.classList.add('drag'), (e.move = !1), setTimeout(o, 300);
          },
          mousemove: e.mouse,
          click: function (s) {
            e.preventClick &&
              e.move &&
              (s.preventDefault(), s.stopPropagation()),
              (e.preventClick = !1),
              (e.move = !1);
          },
        };
        e.ele.classList.toggle('draggable', e.opt.draggable === !0),
          e.event(e.ele, 'remove', r),
          e.opt.draggable && e.event(e.ele, 'add', r);
      }),
      (i.buildDots = function () {
        var e = this;
        if (!e.opt.dots) {
          e.dots && (e.dots.innerHTML = '');
          return;
        }
        if (
          (typeof e.opt.dots == 'string'
            ? (e.dots = document.querySelector(e.opt.dots))
            : (e.dots = e.opt.dots),
          !!e.dots)
        ) {
          (e.dots.innerHTML = ''),
            e.dots.setAttribute('role', 'tablist'),
            e.dots.classList.add('glider-dots');
          for (
            var t = 0;
            t < Math.ceil(e.slides.length / e.opt.slidesToShow);
            ++t
          ) {
            var o = document.createElement('button');
            (o.dataset.index = t),
              o.setAttribute('aria-label', 'Page ' + (t + 1)),
              o.setAttribute('role', 'tab'),
              (o.className = 'glider-dot ' + (t ? '' : 'active')),
              e.event(o, 'add', { click: e.scrollItem.bind(e, t, !0) }),
              e.dots.appendChild(o);
          }
        }
      }),
      (i.bindArrows = function () {
        var e = this;
        if (!e.opt.arrows) {
          Object.keys(e.arrows).forEach(function (t) {
            var o = e.arrows[t];
            e.event(o, 'remove', { click: o._func });
          });
          return;
        }
        ['prev', 'next'].forEach(function (t) {
          var o = e.opt.arrows[t];
          o &&
            (typeof o == 'string' && (o = document.querySelector(o)),
            o &&
              ((o._func = o._func || e.scrollItem.bind(e, t)),
              e.event(o, 'remove', { click: o._func }),
              e.event(o, 'add', { click: o._func }),
              (e.arrows[t] = o)));
        });
      }),
      (i.updateControls = function (e) {
        var t = this;
        e && !t.opt.scrollPropagate && e.stopPropagation();
        var o = t.containerWidth >= t.trackWidth;
        t.opt.rewind ||
          (t.arrows.prev &&
            (t.arrows.prev.classList.toggle(
              'disabled',
              t.ele.scrollLeft <= 0 || o
            ),
            t.arrows.prev.setAttribute(
              'aria-disabled',
              t.arrows.prev.classList.contains('disabled')
            )),
          t.arrows.next &&
            (t.arrows.next.classList.toggle(
              'disabled',
              Math.ceil(t.ele.scrollLeft + t.containerWidth) >=
                Math.floor(t.trackWidth) || o
            ),
            t.arrows.next.setAttribute(
              'aria-disabled',
              t.arrows.next.classList.contains('disabled')
            ))),
          (t.slide = Math.round(t.ele.scrollLeft / t.itemWidth)),
          (t.page = Math.round(t.ele.scrollLeft / t.containerWidth));
        var r = t.slide + Math.floor(Math.floor(t.opt.slidesToShow) / 2),
          s = Math.floor(t.opt.slidesToShow) % 2 ? 0 : r + 1;
        Math.floor(t.opt.slidesToShow) === 1 && (s = 0),
          t.ele.scrollLeft + t.containerWidth >= Math.floor(t.trackWidth) &&
            (t.page = t.dots ? t.dots.children.length - 1 : 0),
          [].forEach.call(t.slides, function (a, n) {
            var l = a.classList,
              p = l.contains('visible'),
              L = t.ele.scrollLeft,
              k = t.ele.scrollLeft + t.containerWidth,
              m = t.itemWidth * n,
              y = m + t.itemWidth;
            [].forEach.call(l, function (g) {
              /^left|right/.test(g) && l.remove(g);
            }),
              l.toggle('active', t.slide === n),
              r === n || (s && s === n)
                ? l.add('center')
                : (l.remove('center'),
                  l.add(
                    [
                      n < r ? 'left' : 'right',
                      Math.abs(n - (n < r ? r : s || r)),
                    ].join('-')
                  ));
            var h =
              Math.ceil(m) >= Math.floor(L) && Math.floor(y) <= Math.ceil(k);
            l.toggle('visible', h),
              h !== p &&
                t.emit('slide-' + (h ? 'visible' : 'hidden'), { slide: n });
          }),
          t.dots &&
            [].forEach.call(t.dots.children, function (a, n) {
              a.classList.toggle('active', t.page === n);
            }),
          e &&
            t.opt.scrollLock &&
            (clearTimeout(t.scrollLock),
            (t.scrollLock = setTimeout(function () {
              clearTimeout(t.scrollLock),
                Math.abs(t.ele.scrollLeft / t.itemWidth - t.slide) > 0.02 &&
                  (t.mouseDown ||
                    (t.trackWidth > t.containerWidth + t.ele.scrollLeft &&
                      t.scrollItem(t.getCurrentSlide())));
            }, t.opt.scrollLockDelay || 250)));
      }),
      (i.getCurrentSlide = function () {
        var e = this;
        return e.round(e.ele.scrollLeft / e.itemWidth);
      }),
      (i.scrollItem = function (e, t, o) {
        o && o.preventDefault();
        var r = this,
          s = e;
        ++r.animate_id;
        var a = r.slide,
          n;
        if (t === !0)
          (e = Math.round((e * r.containerWidth) / r.itemWidth)),
            (n = e * r.itemWidth);
        else {
          if (typeof e == 'string') {
            var l = e === 'prev';
            if (
              (r.opt.slidesToScroll % 1 || r.opt.slidesToShow % 1
                ? (e = r.getCurrentSlide())
                : (e = r.slide),
              l ? (e -= r.opt.slidesToScroll) : (e += r.opt.slidesToScroll),
              r.opt.rewind)
            ) {
              var p = r.ele.scrollLeft;
              e =
                l && !p
                  ? r.slides.length
                  : !l && p + r.containerWidth >= Math.floor(r.trackWidth)
                  ? 0
                  : e;
            }
          }
          (e = Math.max(Math.min(e, r.slides.length), 0)),
            (r.slide = e),
            (n = r.itemWidth * e);
        }
        return (
          r.emit('scroll-item', { prevSlide: a, slide: e }),
          r.scrollTo(
            n,
            r.opt.duration * Math.abs(r.ele.scrollLeft - n),
            function () {
              r.updateControls(),
                r.emit('animated', {
                  value: s,
                  type: typeof s == 'string' ? 'arrow' : t ? 'dot' : 'slide',
                });
            }
          ),
          !1
        );
      }),
      (i.settingsBreakpoint = function () {
        var e = this,
          t = e._opt.responsive;
        if (t) {
          t.sort(function (a, n) {
            return n.breakpoint - a.breakpoint;
          });
          for (var o = 0; o < t.length; ++o) {
            var r = t[o];
            if (d.innerWidth >= r.breakpoint)
              return e.breakpoint !== r.breakpoint
                ? ((e.opt = Object.assign({}, e._opt, r.settings)),
                  (e.breakpoint = r.breakpoint),
                  !0)
                : !1;
          }
        }
        var s = e.breakpoint !== 0;
        return (e.opt = Object.assign({}, e._opt)), (e.breakpoint = 0), s;
      }),
      (i.scrollTo = function (e, t, o) {
        var r = this,
          s = new Date().getTime(),
          a = r.animate_id,
          n = function () {
            var l = new Date().getTime() - s;
            (r.ele.scrollLeft =
              r.ele.scrollLeft +
              (e - r.ele.scrollLeft) * r.opt.easing(0, l, 0, 1, t)),
              l < t && a === r.animate_id
                ? d.requestAnimationFrame(n)
                : ((r.ele.scrollLeft = e), o && o.call(r));
          };
        d.requestAnimationFrame(n);
      }),
      (i.removeItem = function (e) {
        var t = this;
        t.slides.length &&
          (t.track.removeChild(t.slides[e]), t.refresh(!0), t.emit('remove'));
      }),
      (i.addItem = function (e) {
        var t = this;
        t.track.appendChild(e), t.refresh(!0), t.emit('add');
      }),
      (i.handleMouse = function (e) {
        var t = this;
        t.mouseDown &&
          ((t.isDrag = !0),
          (t.ele.scrollLeft +=
            (t.mouseDown - e.clientX) * (t.opt.dragVelocity || 3.3)),
          (t.mouseDown = e.clientX));
      }),
      (i.round = function (e) {
        var t = this,
          o = t.opt.slidesToScroll % 1 || 1,
          r = 1 / o;
        return Math.round(e * r) / r;
      }),
      (i.refresh = function (e) {
        var t = this;
        t.init(!0, e);
      }),
      (i.setOption = function (e, t) {
        var o = this;
        o.breakpoint && !t
          ? o._opt.responsive.forEach(function (r) {
              r.breakpoint === o.breakpoint &&
                (r.settings = Object.assign({}, r.settings, e));
            })
          : (o._opt = Object.assign({}, o._opt, e)),
          (o.breakpoint = 0),
          o.settingsBreakpoint();
      }),
      (i.destroy = function () {
        var e = this,
          t = e.ele.cloneNode(!0),
          o = function (r) {
            r.removeAttribute('style'),
              [].forEach.call(r.classList, function (s) {
                /^glider/.test(s) && r.classList.remove(s);
              });
          };
        e.opt.skipTrack || (t.children[0].outerHTML = t.children[0].innerHTML),
          o(t),
          [].forEach.call(t.getElementsByTagName('*'), o),
          e.ele.parentNode.replaceChild(t, e.ele),
          e.event(d, 'remove', { resize: e.resize }),
          e.emit('destroy');
      }),
      (i.emit = function (e, t) {
        var o = this,
          r = new d.CustomEvent('glider-' + e, {
            bubbles: !o.opt.eventPropagate,
            detail: t,
          });
        o.ele.dispatchEvent(r);
      }),
      (i.event = function (e, t, o) {
        var r = e[t + 'EventListener'].bind(e);
        Object.keys(o).forEach(function (s) {
          r(s, o[s]);
        });
      }),
      u
    );
  });
})(S);
const T = v;
window.addEventListener('load', function () {
  new T(document.querySelector('.glider'), {
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: !0,
    dots: '.dots',
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          duration: 0.5,
          arrows: { prev: '.glider-prev', next: '.glider-next' },
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          duration: 0.5,
          arrows: { prev: '.glider-prev', next: '.glider-next' },
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          duration: 0.5,
          arrows: { prev: '.glider-prev', next: '.glider-next' },
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          duration: 0.5,
          arrows: { prev: '.glider-prev', next: '.glider-next' },
        },
      },
    ],
  });
});
function b() {
  const f = document.documentElement.clientWidth,
    c = document.querySelector('.mission'),
    d = document.querySelector('.mission__content'),
    u = document.querySelector('.mission__right'),
    i = document.querySelector('.story'),
    e = document.querySelector('.story__content'),
    t = document.querySelector('.story__right');
  f < 1301 ? (c.prepend(u), i.prepend(t)) : (d.append(u), e.append(t));
}
b();
function w() {
  const f = document.documentElement.clientWidth,
    c = document.querySelector('.footer');
  f < 900 &&
    ((c.innerHTML = `Please use the desktop 
  footer as inspiration for the
  mobile footer`),
    c.classList.add('adaptive-footer'));
}
w();
addEventListener('resize', () => {
  b(), w();
});
