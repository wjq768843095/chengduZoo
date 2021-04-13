Component({
    options: {
        addGlobalClass: !0
    },
    data: {
        iconList: [ {
            icon: "/images/restaurant.png",
            color: "red",
            badge: 120,
            name: "餐饮美食"
        }, {
            icon: "/images/hotel.png",
            color: "orange",
            badge: 1,
            name: "酒店住宿"
        }, {
            icon: "/images/characteristic.png",
            color: "yellow",
            badge: 0,
            name: "特色商品"
        } ],
        gridCol: 3,
        skin: !1,
        cardCur: 0,
        swiperList: [ {
            id: 0,
            type: "image",
            url: "/images/hot1.png",
            text: "熊猫宝宝毛绒玩具"
        }, {
            id: 1,
            type: "image",
            url: "/images/hot2.png",
            text: "成都大熊猫基地民宿"
        }, {
            id: 2,
            type: "image",
            url: "/images/hot3.png",
            text: "熊猫宝宝毛绒玩偶"
        } ],
        originality: [ {
            name: "四川元素",
            url: "/images/selective1.png",
            small: [ {
                name: "新品推荐",
                url: "/images/selective2.png"
            }, {
                name: "人气单品",
                url: "/images/selective3.png"
            } ]
        } ]
    },
    attached: function() {
        this.towerSwiper("swiperList");
    },
    methods: {
        DotStyle: function(t) {
            console.log(t), this.setData({
                DotStyle: t.detail.value
            });
        },
        cardSwiper: function(t) {
            console.log(t), this.setData({
                cardCur: t.detail.current
            });
        },
        towerSwiper: function(t) {
            for (var e = this.data[t], a = 0; a < e.length; a++) e[a].zIndex = parseInt(e.length / 2) + 1 - Math.abs(a - parseInt(e.length / 2)), 
            e[a].mLeft = a - parseInt(e.length / 2);
            this.setData({
                swiperList: e
            });
        },
        towerStart: function(t) {
            this.setData({
                towerStart: t.touches[0].pageX
            });
        },
        towerMove: function(t) {
            this.setData({
                direction: t.touches[0].pageX - this.data.towerStart > 0 ? "right" : "left"
            });
        },
        towerEnd: function(t) {
            var e = this.data.direction, a = this.data.swiperList;
            if ("right" == e) {
                for (var i = a[0].mLeft, n = a[0].zIndex, s = 1; s < a.length; s++) a[s - 1].mLeft = a[s].mLeft, 
                a[s - 1].zIndex = a[s].zIndex;
                a[a.length - 1].mLeft = i, a[a.length - 1].zIndex = n, this.setData({
                    swiperList: a
                });
            } else {
                for (var r = a[a.length - 1].mLeft, o = a[a.length - 1].zIndex, g = a.length - 1; g > 0; g--) a[g].mLeft = a[g - 1].mLeft, 
                a[g].zIndex = a[g - 1].zIndex;
                a[0].mLeft = r, a[0].zIndex = o, this.setData({
                    swiperList: a
                });
            }
        }
    }
});