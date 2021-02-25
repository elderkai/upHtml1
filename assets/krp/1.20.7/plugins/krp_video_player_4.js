var krpanoplugin = function() {
    function e(e) {
        return 'boolean' == typeof e ? e : 0 <= 'yesontrue1'.indexOf(String(e).toLowerCase());
    }

    function t(e, t, o, a, n) {
        3 == e || 4 == e || 5 == e ? (q[t] = o) : q.registerattribute(t, o, a, n), st.push(t);
    }

    function o(e, t, o, a) {
        e.addEventListener(t, o, a), dt.push({ obj: e, eventname: t, callback: o, capture: a });
    }

    function n(e) {
        var t,
            o,
            a = dt.length;
        for (t = 0; a > t; t++)
            (o = dt[t]),
            (null == e || o.obj === e) &&
            (o.obj.removeEventListener(o.eventname, o.callback, o.capture),
                dt.splice(t, 1),
                t--,
                a--);
    }

    function i() {
        function e() {
            (m = !0), v > 0 && (l.seek(v), (v = -1));
        }

        function t() {
            $ && d && (r(d.src + ' - loading failed'), (d = null));
        }

        function a() {
            0 == at &&
                (B(),
                    (l.paused = u = !0),
                    k(null),
                    0 == q.iscomplete && ((q.iscomplete = !0), R.call(q.onvideocomplete, q)));
        }

        function i() {
            if ($ && G && !(2 > G.readyState)) {
                var e = R.timertick,
                    t = 0,
                    o = Number(G.duration);
                isNaN(o) ||
                    0 >= o ||
                    (d ?
                        (u && !d.paused ? d.pause() : !u && d.paused && d.play(), (t = d.currentTime)) :
                        u ?
                        (t = f) :
                        (0 == y && (y = e), (t = f + rt * Math.max(0, (e - y) / 1e3))),
                        t >= o - 0.02 ?
                        ((t = o),
                            at ?
                            ((f = 0), (y = e + 0.1), d && (d.currentTime = 0)) :
                            (B(),
                                (l.paused = u = !0),
                                k(null),
                                0 == q.iscomplete && ((q.iscomplete = !0), R.call(q.onvideocomplete, q)))) :
                        (q.iscomplete = !1),
                        (ut = t),
                        0.01 < Math.abs(G.currentTime - ut) && (G.currentTime = Number(ut.toFixed(2))),
                        (G.autoplay = !0));
            }
        }
        var l = this,
            u = (l.paused = !0),
            s = null,
            d = null,
            c = null,
            m = !1,
            v = -1,
            y = 0,
            f = 0;
        !(function() {
            if (!0 !== window.krpanoHideiPhoneMediaControlsStyle) {
                window.krpanoHideiPhoneMediaControlsStyle = !0;
                var e = document.createElement('style');
                (e.type = 'text/css'),
                (e.innerHTML =
                    '*::-webkit-media-controls-panel{display: none!important;-webkit-appearance:none;} *::--webkit-media-controls-play-button{display: none!important;-webkit-appearance:none;} *::-webkit-media-controls-start-playback-button{display: none!important;-webkit-appearance:none;}'),
                document.getElementsByTagName('head')[0].appendChild(e);
            }
        })(),
        (l.start = function() {
            (q.iPhoneMode = !0), (G.autoplay = !0), G.pause(), (G.style.webkitMediaControls = !1);
            var r = p(q.videourl, ['m4a', 'mp3']),
                r = R.parsePath(r);
            (v = -1),
            r
                ?
                (null == d && (c ? ((d = c), (c = null)) : (d = document.createElement('audio'))),
                    n(d),
                    o(d, 'canplay', e, !0),
                    o(d, 'error', t, !0),
                    o(d, 'ended', a, !0),
                    (d.loop = at),
                    (m = d.autoplay = !1),
                    (d.src = r),
                    d.load(),
                    d.pause()) :
                d && (d.src && (d.pause(), (c = d)), (d = null)),
                (y = f = 0),
                (u = q.pausedonstart),
                (l.paused = u),
                (s = setInterval(i, 1e3 / 60)),
                (G.currentTime = 0);
        }),
        (l.play_audio = function() {
            d && d.play();
        }),
        (l.play = function() {
            1 == u &&
                ((u = l.paused = !1),
                    q.iscomplete ?
                    ((q.iscomplete = !1), (f = 0), d && (d.currentTime = 0)) :
                    (f = G.currentTime),
                    (y = R.timertick + 0.1),
                    d && d.play(),
                    k(null));
        }),
        (l.pause = function() {
            0 == u && (d && d.pause(), (f = G.currentTime), (u = l.paused = !0), k(null));
        }),
        (l.seek = function(e) {
            d ? (m ? ((d.currentTime = e), (v = -1)) : (v = e)) : ((v = -1), (y = 0), (f = e));
        }),
        (l.remove = function() {
            s && (clearInterval(s), (s = null)), d && (d.src && (d.pause(), (c = d)), (d = null));
        }),
        (l.setplaybackrate = function(e) {
            if (d)
                try {
                    d.playbackRate = e;
                } catch (t) {}
        }),
        (l.setloop = function(e) {
            d && (d.loop = e);
        }),
        (l.need_touchstart_play = function() {
            return null != d && d.paused;
        }),
        (l.try_touchstart_play = function() {
            return d ? (d.play(), 0 == d.paused) : !0;
        });
    }

    function r(e) {
        var t = q ? q.onerror : null;
        null != t && '' != t && 'null' != ('' + t).toLowerCase() ?
            ((q.videoerror = e), R.call(t, q)) :
            R.trace(3, e + '!');
    }

    function l(e) {
        (e = e.style),
        (e.pointerEvents = 'none'),
        (e.position = 'absolute'),
        (e.width = '100%'),
        (e.height = '100%'),
        (e.left = 0),
        (e.top = 0),
        (e.opacity = 1),
        (e.backgroundColor = 'transparent'),
        (e[Y] = 'translateZ(0)'),
        (e[Y + 'Origin'] = '0 0');
    }

    function u() {
        var e = null,
            e = document.createElement('video');
        return e && e.play ? (l(e), e) : null;
    }

    function s(e) {
        q &&
            ((e = document.visibilityState), !0 === document.hidden || 'hidden' == e || 'prerender' == e || 'unloaded' == e ?
                0 == q.ispaused && q.autopause && 0 == q.isautopaused && ((q.isautopaused = !0), B()) :
                q.autoresume && q.isautopaused && ((q.isautopaused = !1), A()));
    }

    function d(e, t) {
        q.registercontentsize(e, t),
            (q.forceresize = !0),
            (q.videowidth = e),
            (q.videoheight = t),
            (q.havevideosize = !0),
            (q.isvideoready = !0),
            q.onvideoreadyCB && q.onvideoreadyCB(),
            R.call(q.onvideoready, q);
    }

    function p(e, t) {
        U = null;
        var o = ('' + e).split('|');
        if (1 < o.length || t) {
            var a = X;
            t && (a = t);
            var n,
                i,
                r = a.length,
                l = o.length,
                u = [];
            for (n = 0; l > n; n++)
                if ((i = o[n])) {
                    var s = i;
                    if (0 != i.indexOf('rtmp:')) {
                        var d = i.indexOf('?');
                        if (
                            (d > 0 && (i = i.slice(0, d)),
                                (d = i.indexOf('#')),
                                d > 0 && (i = i.slice(0, d)),
                                (d = i.lastIndexOf('.')),
                                d > 1)
                        )
                            for (d = ('' + i.slice(d + 1)).toLowerCase(), i = 0; r > i; i++)
                                if (d == a[i]) {
                                    if (t) return s;
                                    u.push({ type: d, inorder: n, url: s, used: !1 });
                                    break;
                                }
                    }
                }
            if (t) return null;
            if (0 < u.length)
                return (
                    '' != q.preferredformat &&
                    u.sort(function(e, t) {
                        var o = e.type,
                            a = t.type,
                            n =
                            'm3u' == o || 'm3u8' == o ?
                            0 :
                            'mp4' == o || 'm4v' == o ?
                            1 :
                            'webm' == o ?
                            2 :
                            3,
                            i =
                            'm3u' == a || 'm3u8' == a ?
                            0 :
                            'mp4' == a || 'm4v' == a ?
                            1 :
                            'webm' == a ?
                            2 :
                            3,
                            r = ('' + q.preferredformat).toLowerCase();
                        return (
                            '' != r && (o == r && (n = -1), a == r && (i = -1)),
                            n > i ? 1 : i > n ? -1 : e.inorder > t.inorder ? 1 : e.inorder < t.inorder ? -1 : 0
                        );
                    }),
                    (U = u),
                    c()
                );
        }
        return e;
    }

    function c() {
        if (U) {
            var e, t;
            for (t = U.length, e = 0; t > e; e++)
                if (0 == U[e].used) return (U[e].used = !0), U[e].url;
        }
        return null;
    }

    function m(e, t) {
        var o = !0;
        if (!Z.android || !Z.chrome) {
            var a = t.indexOf('://');
            if (a > 0) {
                var n = document.domain,
                    a = t.slice(a + 3, t.indexOf('/', a + 3));
                n == a && (o = !1);
            }
        }
        o && (((o = R.security.cors) && '' != o) || (o = 'anonymous'), (e.crossOrigin = o));
    }

    function v(t, a, n, i) {
        (q.videourl =
            void 0 === t || null == t || '' == t || 'null' == ('' + t).toLowerCase() ? null : t),
        (q.posterurl =
            void 0 === a || null == a || '' == a || 'null' == ('' + a).toLowerCase() ? null : a),
        (q.pausedonstart = e(n)),
        (i = Number(i)),
        (isNaN(i) || 0 > i) && (i = 0),
        (ut = i),
        (et = i > 0 ? i : -1),
        (t = p(q.videourl)),
        (Q = t = R.parsePath(t)),
        (q.isvideoready = !1),
        (q.havevideosize = !1),
        (q.isautopaused = !1),
        (q.isseeking = et > 0 && null == $),
        (q.iscomplete = !1),
        (q.ispaused = !0),
        (q.loadedbytes = 0),
        (q.totalbytes = 0),
        (q.totaltime = 0),
        (q.videoerror = ''),
        null != t &&
            (G && G.src ? ($ ? $.pause() : G.pause()) : null == G && ((G = u()), (q.videoDOM = G)),
                q.posterurl && (q.pausedonstart || Z.mobile || Z.tablet) ?
                (null == J &&
                    ((J = document.createElement('img')), o(J, 'error', y, !1), o(J, 'load', f, !1)),
                    (t = q.posterurl),
                    (K = t = R.parsePath(t)),
                    m(J, t),
                    (J.src = t)) :
                h());
    }

    function y() {
        G && r(K + ' - loading failed');
    }

    function f(e) {
        if (G) {
            e = J.naturalWidth;
            var t = J.naturalHeight;
            l(J),
                q.sprite &&
                (q.sprite.appendChild(J), Array.prototype.indexOf.call(J.parentNode.children, J)),
                (q.posterDOM = J),
                d(e, t),
                h();
        }
    }

    function h() {
        n(G),
            ot && (clearInterval(ot), (ot = null)),
            $ && $.remove(),
            o(G, 'loadedmetadata', w, !1),
            o(G, 'loadeddata', w, !1),
            o(G, 'canplay', w, !1),
            o(G, 'canplaythrough', w, !1),
            o(G, 'play', w, !1),
            o(G, 'pause', w, !1),
            o(G, 'playing', w, !1),
            o(G, 'seeking', w, !1),
            o(G, 'waiting', w, !1),
            o(G, 'seeked', w, !1),
            o(G, 'stalled', w, !1),
            o(G, 'suspend', w, !1),
            o(G, 'ended', w, !1),
            o(G, 'timeupdate', w, !1),
            o(G, 'progress', g, !1),
            Z.ios && (ot = setInterval(g, 500)),
            o(G, 'error', b, !1),
            (G.loop = q.loop);
        var isMobile = document.body.clientWidth <= 768;
        if (!isMobile) {
            G.autoplay = q.pausedonstart ? !1 : !0;
        } else {
            G.autoplay = false
        }
        (G.preload = q.html5preload),
        (G.controls = q.html5controls),
        G.setAttribute('playsinline', ''),
            G.setAttribute('webkit-playsinline', ''),
            G.setAttribute('x5-video-player-type', 'h5'),
            P(nt),
            z(it),
            D(rt),
            I(lt),
            m(G, Q),
            (G.src = Q);
        if (!isMobile) {
            G.load();
        }
        $ ? $.start() : q.pausedonstart ? G.pause() : G.play();
    }

    function b(e) {
        if (G) {
            if (((e = null), (e = G.error ? G.error.code : 0), e >= 3)) {
                var t = c();
                if (t) return (Q = e = R.parsePath(t)), m(G, Q), (G.src = Q), void G.load();
            }
            switch (e) {
                case 1:
                    e = 'video loading aborted';
                    break;
                case 2:
                    e = 'network loading error';
                    break;
                case 3:
                    e = 'video decoding failed (corrupted data or unsupported codec)';
                    break;
                case 4:
                    e = 'loading video failed';
                    break;
                default:
                    e = 'unknown error';
            }
            e && r(Q + ' - ' + e);
        }
    }

    function g(e) {
        if (
            (null != ot && e && 'progress' == e.type && (clearInterval(ot), (ot = null)), G && G.buffered)
        ) {
            var t, o;
            if (((t = G.buffered.length), (o = G.duration), o > 0 && ((q.totaltime = o), t > 0))) {
                var a = 0;
                for (e = 0; t > e; e++) {
                    var n = G.buffered.end(e);
                    n > a && (a = n);
                }
                (q.loadedbytes = (1048576 * a) | 0), (q.totalbytes = (1048576 * o) | 0);
            }
        }
    }

    function w(e) {
        if (G)
            switch (e.type) {
                case 'loadedmetadata':
                case 'loadeddata':
                    et > 0 && (V(et), (et = -1)), g(), (e = G.videoWidth);
                    var t = G.videoHeight;
                    0 == q.havevideosize && e > 0 && t > 0 && d(e, t),
                        e > 0 ||
                        setTimeout(function() {
                            w({ type: 'loadedmetadata' });
                        }, 100);
                    break;
                case 'canplay':
                case 'canplaythrough':
                    g(),
                        null == $ ?
                        0 == q.pausedonstart && G.paused && (G.play(), N()) :
                        0 == q.pausedonstart && $.need_touchstart_play() && ($.play_audio(), N());
                    break;
                case 'seeking':
                case 'seeked':
                    q.isseeking = $ ? !1 : 'seeking' == e.type;
                case 'play':
                case 'pause':
                case 'playing':
                case 'waiting':
                case 'stalled':
                case 'suspend':
                case 'ended':
                case 'timeupdate':
                    k(e);
            }
    }

    function k(e) {
        (e = !1),
        J &&
            2 <= G.readyState &&
            (0 == G.paused || ($ && 0 == $.paused)) &&
            ((e = !0), Z.chromemobile && 0 == G.currentTime && (e = !1)),
            e && (n(J), J.parentNode && J.parentNode.removeChild(J), (J = K = q.posterDOM = null)),
            q.isvideoready &&
            ((e = $ ? $ : G),
                q.ispaused != e.paused &&
                (0 == e.paused ?
                    ((q.ispaused = !1), R.call(q.onvideoplay, q)) :
                    ((q.ispaused = !0), R.call(q.onvideopaused, q))),
                null == $ &&
                q.iscomplete != G.ended &&
                (1 == G.ended ?
                    (B(), 0 == q.iscomplete && ((q.iscomplete = !0), R.call(q.onvideocomplete, q))) :
                    (q.iscomplete = !1)));
    }

    function N() {
        Z.touch &&
            ((G.paused && !$) || ($ && $.need_touchstart_play())) &&
            0 == tt &&
            ((tt = !0),
                q.touchworkarounds &&
                (o(document.body, 'touchstart', O, !0), o(document.body, 'touchend', O, !0)),
                (q.needtouch = !0),
                R.call(q.onneedtouch, q));
    }

    function T() {
        tt && ((tt = !1), n(document.body), (q.needtouch = !1), R.call(q.ongottouch, q));
    }

    function O(e) {
        G && ((e = !1), $ ? (e = $.try_touchstart_play()) : (G.play(), (e = 0 == G.paused)), e && T());
    }

    function C(t) {
        (at = e(t)), G && (G.loop = at), $ && $.setloop(t);
    }

    function x() {
        return at;
    }

    function M(e) {
        V(e);
    }

    function _() {
        if (G) {
            var e = Number(G.currentTime);
            if (!isNaN(e)) return e;
        }
        return ut;
    }

    function P(e) {
        (e = Number(e)),
        isNaN(e) ? (e = 1) : 0 > e ? (e = 0) : e > 1 && (e = 1),
            (nt = e),
            G && (G.volume = e);
    }

    function L() {
        return nt;
    }

    function z(e) {
        (it = e), G && (G.muted = e);
    }

    function E() {
        return it;
    }

    function D(e) {
        if (((e = Number(e)), (isNaN(e) || 0 == e) && (e = 1), (rt = e), G))
            try {
                G.playbackRate = e;
            } catch (t) {}
        $ && $.setplaybackrate(e);
    }

    function H() {
        return rt;
    }

    function I(t) {
        (lt = t = e(t)),
        G && Z.safari && (G.airplay = G['x-webkit-airplay'] = t ? 'allow' : 'disallow');
    }

    function S() {
        return lt;
    }

    function A() {
        $ ? $.play() : G && G.play(), (q.pausedonstart = !1), N();
    }

    function B() {
        $ ? $.pause() : G && G.pause(), (q.pausedonstart = !0), T();
    }

    function j() {
        G && (0 == G.paused || ($ && 0 == $.paused) ? B() : A());
    }

    function V(e) {
        if (G && G.src) {
            var t = 0,
                t =
                0 < ('' + e).indexOf('%') && 0 < G.duration ?
                (parseFloat(e) / 100) * G.duration :
                Number(e);
            isNaN(t) || ($ ? $.seek(t) : (G.currentTime = t));
        }
    }

    function W() {
        V(0), B();
    }

    function F() {
        G &&
            (G.pause(),
                $ && $.remove(),
                n(G),
                J && J.parentNode && J.parentNode.removeChild(J),
                G && G.parentNode && G.parentNode.removeChild(G),
                (q.videoDOM = null),
                (q.posterDOM = null),
                (q.iPhoneMode = !1),
                (G = J = null),
                (q.videourl = null),
                (q.isvideoready = !1),
                (q.ispaused = !0),
                (q.iscomplete = !1),
                (q.isseeking = !1),
                (q.isautopaused = !1),
                (q.havevideosize = !1),
                (q.videowidth = 0),
                (q.videoheight = 0),
                (q.loadedbytes = 0),
                (q.totalbytes = 0),
                (q.totaltime = 0),
                (q.videoerror = ''),
                (ut = 0));
    }
    (this.name = 'Videoplayer'), (this.version = '1.19-pr7'), (this.build = '2016-09-09');
    var R = null,
        Z = null,
        q = null,
        G = null,
        J = null,
        K = null,
        Q = null,
        U = null,
        X = [],
        Y = 'transform',
        $ = null,
        et = -1,
        tt = !1,
        ot = null,
        at = !1,
        nt = 1,
        it = !1,
        rt = 1,
        lt = !1,
        ut = 0,
        st = [],
        dt = [];
    (this.registerplugin = function(e, n, r) {
        (R = e),
        (Z = R.device),
        (q = r),
        '1.19' > R.version || '2015-03-01' > R.build ?
            R.trace(3, 'Videoplayer plugin - too old krpano version (min. 1.19)') :
            ((Y = R.browser.css.transform),
                (G = u()) ?
                (void 0 !== G.canPlayType ?
                    (G.canPlayType('video/mp4').match(/maybe|probably/i) &&
                        (X.push('mp4'), X.push('m4v'), X.push('mov'), X.push('3gp')),
                        G.canPlayType('video/webm').match(/maybe|probably/i) && X.push('webm'),
                        G.canPlayType('video/ogg').match(/maybe|probably/i) &&
                        (X.push('ogg'), X.push('ogv')),
                        G.canPlayType('video/hls').match(/maybe|probably/i) &&
                        (X.push('m3u'), X.push('m3u8'))) :
                    (X.push('mp4'), X.push('mov')),
                    t(0, 'videourl', null),
                    t(0, 'altvideourl', null),
                    t(0, 'posterurl', null),
                    t(0, 'panovideo', !1),
                    t(0, 'use_as_videopano', !1),
                    t(0, 'pausedonstart', !1),
                    t(0, 'autopause', !0),
                    t(0, 'autoresume', !1),
                    t(0, 'preferredformat', ''),
                    t(0, 'iphoneworkarounds', !0),
                    t(0, 'touchworkarounds', !0),
                    t(0, 'html5controls', !1),
                    t(0, 'html5preload', 'auto'),
                    t(1, 'loop', at, C, x),
                    t(1, 'time', ut, M, _),
                    t(1, 'volume', nt, P, L),
                    t(1, 'muted', it, z, E),
                    t(1, 'playbackrate', rt, D, H),
                    t(1, 'airplay', lt, I, S),
                    t(2, 'onvideoready', null),
                    t(2, 'onvideoplay', null),
                    t(2, 'onvideopaused', null),
                    t(2, 'onvideocomplete', null),
                    t(2, 'onerror', null),
                    t(2, 'onneedtouch', null),
                    t(2, 'ongottouch', null),
                    t(3, 'playvideo', v),
                    t(3, 'play', A),
                    t(3, 'resume', A),
                    t(3, 'pause', B),
                    t(3, 'togglepause', j),
                    t(3, 'seek', V),
                    t(3, 'stop', W),
                    t(3, 'closevideo', F),
                    t(4, 'isvideoready', !1),
                    t(4, 'iswaiting', !1),
                    t(4, 'ispaused', !0),
                    t(4, 'iscomplete', !1),
                    t(4, 'isseeking', !1),
                    t(4, 'isautopaused', !1),
                    t(4, 'havevideosize', !1),
                    t(4, 'needtouch', !1),
                    t(4, 'videowidth', 0),
                    t(4, 'videoheight', 0),
                    t(4, 'loadedbytes', 0),
                    t(4, 'totalbytes', 0),
                    t(4, 'totaltime', 0),
                    t(4, 'videoerror', ''),
                    t(5, 'videoDOM', G),
                    t(5, 'posterDOM', J),
                    t(5, 'iPhoneMode', !1),
                    o(window, 'pagehide', s, !1),
                    o(window, 'pageshow', s, !1),
                    o(document, 'visibilitychange', s, !1),
                    (a = Z.ios && 10 <= Z.iosversion),
                    Z.iphone && 1 == q.iphoneworkarounds && 0 == a && ($ = new i()),
                    q.sprite &&
                    ((0 == q.use_as_videopano && 0 == q.panovideo) || !Z.panovideosupport) &&
                    !0 !== q.renderToBitmap &&
                    (q.sprite.appendChild(G), Array.prototype.indexOf.call(G.parentNode.children, G)),
                    v(q.altvideourl ? q.altvideourl : q.videourl, q.posterurl, q.pausedonstart, q.time)) :
                R.trace(2, 'Videoplayer plugin - HTML5 video is not supported by this browser!'));
    }),
    (this.unloadplugin = function() {
        F();
        var e,
            t = st.length;
        for (e = 0; t > e; e++) delete q[st[e]];
        (st = null), n(null), ot && (clearInterval(ot), (ot = null)), (R = Z = q = null);
    }),
    (this.onresize = function(e, t) {
        if (G && q && !0 !== q.renderToBitmap) {
            var o = G.videoWidth,
                a = G.videoHeight;
            if (o > 0 && a > 0) {
                var n = o + 'px',
                    i = a + 'px',
                    r = 'hotspot' == q._type && q.distorted ? 1 : R.stagescale,
                    o = 'translateZ(0) scale(' + (e * r) / o + ',' + (t * r) / a + ')';
                J &&
                    (n != J.style.width && (J.style.width = n),
                        i != J.style.width && (J.style.height = i),
                        (J.style[Y] = o)),
                    n != G.style.width && (G.style.width = n),
                    i != G.style.height && (G.style.height = i),
                    (G.style[Y] = o);
            }
        }
        return !1;
    });
};