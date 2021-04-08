require("../../../utils/util.js");

var t = getApp();

Component({
    options: {
        addGlobalClass: !0
    },
    data: {
        ticketType: [],
        freeRule: [],
        noticeRule: [],
        luggage: "",
        spotName: "",
        publicNotice: "",
        reminderNotice: "",
        refund_instruction: "",
        invoice_description: "",
        firstNotice: [ {
            content: "本隐私权政策部分将帮助您了解以下内容："
        }, {
            content: "一、小程序如何收集信息"
        }, {
            content: "二、小程序如何使用信息"
        }, {
            content: "三、我们如何保护您的信息"
        }, {
            content: "四、争议解决"
        }, {
            content: "五、如何联系我们"
        } ],
        secendNotice: [ {
            title: "（一）您向小程序提供的信息",
            content: "小程序收集信息是为了向您提供更好、更优、更个性化的服务，小程序收集信息的方式如下：当您在小程序上购票时填写及/或提交的信息，包括您的姓名、身份证号码、电话号码。"
        }, {
            title: "（二）在您使用服务过程中收集的信息",
            content: "为了提供并优化您需要的服务，小程序会收集您使用服务的相关信息，这类信息包括：在您使用查找周边服务时，会收集你的定位信息、偏好信息、使用习惯的信息等。"
        }, {
            title: "（三）敏感信息",
            content: "在向小程序提供任何属于敏感信息的个人信息前，请您清楚考虑该等提供是恰当的并且同意您的个人敏感信息可按本政策所述的目的和方式进行处理。我们会在得到您的同意后收集和使用您的敏感信息以实现与小程序相关的功能，并允许您对这些敏感信息的收集与使用做出不同意的选择，但是拒绝使用这些信息会影响您使用相关功能。"
        }, {
            title: "（四）征得授权同意的例外",
            content: "根据相关法律法规的规定，在以下情形中，我们可以在不征得您授权同意的情况下收集、使用一些必要的个人信息：1、与国家安全、国防安全直接相关的；2、与公共安全、公共卫生、重大公共利益直接相关的；3、与犯罪侦查、起诉、审判和判决执行等直接相关的；4、出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；5、从合法公开披露的信息中收集到您的个人信息，如从合法的新闻报道、政府信息公开等渠道；6、根据您的要求签订和履行合同所必需的；7、法律法规规定的其他情形。"
        } ],
        thirdNotice: [ {
            content: "收集您的信息是为了向您提供服务及提升服务质量的目的，为了实现这一目的，小程序会把您的信息用于下列用途："
        }, {
            content: "1、用于身份验证、客户服务、安全防范、诈骗监测、存档和备份用途，确保我们向您提供的产品和服务的安全性"
        }, {
            content: "2、景区的实名制购票政策可以实施；"
        }, {
            content: "3、经您许可的其他用途。"
        }, {
            content: "若我们将信息用于本政策未载明的其他用途，或者将基于特定目的收集而来的信息用于其他目的时，会事先征求您的同意。"
        } ],
        fourNotice: [ {
            content: "本协议政策签订地为成都市武侯区天晖路360晶科一号楼。"
        }, {
            content: "本协议政策的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律。"
        }, {
            content: "若您和我们之间因本协议政策发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交至公司所在地有管辖权的人民法院管辖"
        } ],
        fiveNotice: [ {
            content: "若您对我们的隐私政策有任何疑问，可随时联系我们。"
        }, {
            content: "联系电话：028-85170022"
        }, {
            content: "邮寄地址：成都市武侯区天晖路360晶科一号2209室"
        } ],
        languageType: ""
    },
    attached: function() {
        this.getSpotName(), this.setLanguage();
    },
    methods: {
        setLanguage: function() {
            "english" == t.globalData.language ? this.setData({
                languageType: "english",
                firstNotice: [ {
                    content: "This privacy policy section will help you understand the following,"
                }, {
                    content: "1. How Mini Apps Collect Information"
                }, {
                    content: "2.How to Use Information"
                }, {
                    content: "3. How We Protect Your Information"
                }, {
                    content: "4. Dispute Resolution"
                }, {
                    content: "5. How to Contact us"
                } ],
                secendNotice: [ {
                    title: "1.1 Information You Provide to the Mini Apps",
                    content: "The mini App collects information to provide you with better, more optimized and more personalized services. The way mini Apps collect information is as follows:The information you fill in and/or submit when you purchase tickets on the mini Apps includes your name, ID number, and phone number."
                }, {
                    title: "1.2 Information Collected during Your Use of the Service",
                    content: "In order to provide and optimize the services you need, the mini Apps will collect the information when you are using the service. This type of information including the information when you use the search for surrounding services, your positioning information, preference information, usage habits, etc. will be collected."
                }, {
                    title: "1.3 Sensitive Information",
                    content: "Before providing any sensitive personal information to the mini Apps, please clearly consider that such provision is appropriate and it means that you agree that your personal sensitive information can be processed in accordance with the purposes and methods described in this policy. We will collect and use your sensitive information after obtaining your consent to realize the functions related to the mini App, and allow you to make a disagreement choice for the collection and use of these sensitive information, but refusing to use this information will prevent you from using related functions."
                }, {
                    title: "1.4 Exception for Obtaining Authorized Consent",
                    content: "According to relevant laws and regulations, in the following situations, we can collect and use some necessary personal information without obtaining your authorization and consent. 1.4.1 Information that is directly related to national security and national defense security;1.4.2 Information that is directly related to public safety, public health, and major public interests;1.4.3 Information that is directly related to criminal investigation, prosecution, trial and judgment execution;1.4.4 Information aimed to protect your or other personal life, property and other important legal rights but difficult to be obtained your consent;1.4.5 Collecting your personal information from the legally publicly disclosed information, such as from legal news reports, government information disclosure and other channels;1.4.6 Necessary information that is used when you sign and perform the contract according to your requirements;1.4.7 Other situations stipulated by laws and regulations."
                } ],
                thirdNotice: [ {
                    content: "Your information is collected for the purpose of providing services to you and improving the quality of services. To achieve this purpose, the mini Apps will use your information for the following purposes."
                }, {
                    content: "2.1 The information is used for identity verification, customer service, security precautions, fraud monitoring, archiving and backup purposes to ensure the safety of the products and services we provide to you;"
                }, {
                    content: "2.2 The real-name ticket purchaseing policy for scenic spots can be implemented;"
                }, {
                    content: "2.3. Other uses with your permission."
                }, {
                    content: "If we use the information for other purposes which are not specified in this policy, or when the information collected for a specific purpose is used for other purposes, we will seek your consent in advance."
                } ],
                fourNotice: [ {
                    content: "This agreement is signed at No. 1 Building, 360 Jingke, Tianhui Road, Wuhou District, Chengdu."
                }, {
                    content: "The establishment, entry into force, performance, interpretation and dispute resolution of the policy of this agreement shall be governed by the laws of the People's Republic of China."
                }, {
                    content: "If there are any disputes,due to the policy of this agreement, these disputes should be firstly settled through friendly negotiation; however if the negotiation fails, you agree to submit the disputes or dissensions to the jurisdiction of the people's court where the company is located."
                } ],
                fiveNotice: [ {
                    content: "If you have any questions about our privacy policy, please feel free to contact us."
                }, {
                    content: "Telephone: 028-85170022"
                }, {
                    content: "Mailing address: Room 2209, No. 1 Jingke ,360 Tianhui Road, Wuhou District, Chengdu, 610094"
                } ]
            }) : this.setData({
                languageType: "",
                firstNotice: [ {
                    content: "本隐私权政策部分将帮助您了解以下内容："
                }, {
                    content: "一、小程序如何收集信息"
                }, {
                    content: "二、小程序如何使用信息"
                }, {
                    content: "三、我们如何保护您的信息"
                }, {
                    content: "四、争议解决"
                }, {
                    content: "五、如何联系我们"
                } ],
                secendNotice: [ {
                    title: "（一）您向小程序提供的信息",
                    content: "小程序收集信息是为了向您提供更好、更优、更个性化的服务，小程序收集信息的方式如下：当您在小程序上购票时填写及/或提交的信息，包括您的姓名、身份证号码、电话号码。"
                }, {
                    title: "（二）在您使用服务过程中收集的信息",
                    content: "为了提供并优化您需要的服务，小程序会收集您使用服务的相关信息，这类信息包括：在您使用查找周边服务时，会收集你的定位信息、偏好信息、使用习惯的信息等。"
                }, {
                    title: "（三）敏感信息",
                    content: "在向小程序提供任何属于敏感信息的个人信息前，请您清楚考虑该等提供是恰当的并且同意您的个人敏感信息可按本政策所述的目的和方式进行处理。我们会在得到您的同意后收集和使用您的敏感信息以实现与小程序相关的功能，并允许您对这些敏感信息的收集与使用做出不同意的选择，但是拒绝使用这些信息会影响您使用相关功能。"
                }, {
                    title: "（四）征得授权同意的例外",
                    content: "根据相关法律法规的规定，在以下情形中，我们可以在不征得您授权同意的情况下收集、使用一些必要的个人信息：1、与国家安全、国防安全直接相关的；2、与公共安全、公共卫生、重大公共利益直接相关的；3、与犯罪侦查、起诉、审判和判决执行等直接相关的；4、出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；5、从合法公开披露的信息中收集到您的个人信息，如从合法的新闻报道、政府信息公开等渠道；6、根据您的要求签订和履行合同所必需的；7、法律法规规定的其他情形。"
                } ],
                thirdNotice: [ {
                    content: "收集您的信息是为了向您提供服务及提升服务质量的目的，为了实现这一目的，小程序会把您的信息用于下列用途："
                }, {
                    content: "1、用于身份验证、客户服务、安全防范、诈骗监测、存档和备份用途，确保我们向您提供的产品和服务的安全性"
                }, {
                    content: "2、景区的实名制购票政策可以实施；"
                }, {
                    content: "3、经您许可的其他用途。"
                }, {
                    content: "若我们将信息用于本政策未载明的其他用途，或者将基于特定目的收集而来的信息用于其他目的时，会事先征求您的同意。"
                } ],
                fourNotice: [ {
                    content: "本协议政策签订地为成都市武侯区天晖路360晶科一号楼。"
                }, {
                    content: "本协议政策的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律。"
                }, {
                    content: "若您和我们之间因本协议政策发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交至公司所在地有管辖权的人民法院管辖"
                } ],
                fiveNotice: [ {
                    content: "若您对我们的隐私政策有任何疑问，可随时联系我们。"
                }, {
                    content: "联系电话：028-85170022"
                }, {
                    content: "邮寄地址：成都市武侯区天晖路360晶科一号2209室"
                } ]
            });
        },
        getSpotName: function() {
            var e = this, o = t.globalData.baseurl + "getSpot" + ("?applicationNo=" + t.globalData.applicationNo);
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), wx.request({
                url: o,
                data: {
                    spotNo: "13056873"
                },
                method: "POST",
                header: {
                    "content-type": "application/json;charset=utf-8"
                },
                success: function(t) {
                    wx.hideLoading(), "success" == t.data.status ? e.setData({
                        spotName: t.data.data.spotName
                    }) : wx.showModal({
                        title: "通知",
                        showCancel: !1,
                        content: "查询数据失败，请稍后重试...",
                        confirmText: "确认"
                    });
                },
                fail: function(t) {
                    wx.hideLoading(), wx.showModal({
                        title: "通知",
                        showCancel: !1,
                        content: "网络异常，请检查网络...",
                        confirmText: "确认"
                    });
                }
            });
        }
    }
});