Component({
    options: {
        addGlobalClass: !0
    },
    data: {
        elements: [ {
            title: "布局",
            name: "layout",
            color: "cyan",
            icon: "newsfill"
        }, {
            title: "背景",
            name: "background",
            color: "blue",
            icon: "colorlens"
        }, {
            title: "文本",
            name: "text",
            color: "purple",
            icon: "font"
        }, {
            title: "图标 ",
            name: "icon",
            color: "mauve",
            icon: "icon"
        }, {
            title: "按钮",
            name: "button",
            color: "pink",
            icon: "btn"
        }, {
            title: "标签",
            name: "tag",
            color: "brown",
            icon: "tagfill"
        }, {
            title: "头像",
            name: "avatar",
            color: "red",
            icon: "myfill"
        }, {
            title: "进度条",
            name: "progress",
            color: "orange",
            icon: "icloading"
        }, {
            title: "边框阴影",
            name: "shadow",
            color: "olive",
            icon: "copy"
        }, {
            title: "加载",
            name: "loading",
            color: "green",
            icon: "loading2"
        } ]
    },
    methods: {
        onLoad: function() {
            wx.getSetting({
                success: function(o) {
                    o.authSetting["scope.userInfo"] || wx.redirectTo({
                        url: "/pages/auth/auth"
                    });
                }
            });
        },
        showModal: function(o) {
            this.setData({
                modalName: o.currentTarget.dataset.target
            });
        },
        hideModal: function(o) {
            this.setData({
                modalName: null
            });
        },
        onShareAppMessage: function() {
            return {
                title: "ColorUI-高颜值的小程序UI组件库",
                imageUrl: "https://image.weilanwl.com/color2.0/share2215.jpg",
                path: "/pages/basics/home/home"
            };
        }
    }
});