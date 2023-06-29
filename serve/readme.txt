路由接口

注册用户 /api/reguser
{
    status:200 //成功 1失败
}
登录用户 /api/login
管理员登录 /api/loginmanager

获取轮播图 /api/banner
小轮播图 /api/smallbanner
添加轮播图 /high/addBanner
获取文章信息 /api/getMessage
获取全部的文章信息 /api/getfullmessage
更改点赞数 /high/changelike
点赞取消赞 /high/changeislike
发表文章 /high/publisharticle
获取热门城市详情 /high/gethotcity
根据文章id获取文章数据 /high/getarticlebyid

//编写该文章的可以修改
根据文章id修改文章 /high/editArticleById 

获取用户信息 /high/getuserinfo
更改用户信息 /high/updateUserinfo
上传用户头像 /high/adduserpic
根据城市id获取城市风景top3 /high/getcityviews
获取游记信息 /high/getyouji
根据id获取游记内容 /high/getYoujiById
获取留言 /high/getsaying
发布留言 /high/submitsaying
获取点赞的文章 /high/getlikeArticle
获取自己发布的游记 /high/getPublishArticle
根据城市获取酒店信息 /high/gethotelbyname
根据酒店名获取酒店信息 /high/gethotelM
获取酒店评论 /high/getHotelassess
发布酒店评论 /high/addAssess
获取足迹 /high/getgocity

api 可以在登录之前干的事

审核是否通过文章 0未审核 1通过 2 违规 /high/updateIsExamine
获取所有的用户信息 /high/getfullusers
添加管理 /high/addmanager [req.body.managernum, username]
预定酒店 /high/bookhotel 
获取酒店订单 /high/getbook
支付订单 /high/buyroom
收件箱 /high/updateIsbadge
添加酒店pic /high/addhotelpic
添加酒店 /high/addhotel
修改酒店信息 /high/updatehotel