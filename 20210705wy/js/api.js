
const api = {
    //  获取用户信息 
    getUser: {
        url: '/home2021/YiLi0428_GetUserInfo',
        type: 'GET'
    },
     //  获取用户信息 
     GetUserInfoByMobile: {
        url: '/home2021/yili0706_GetUserInfoByMobile',
        type: 'GET'
    },
    // /home2021/YiLi0428_SetUserInfo   username  mobile  gender idcode usertype 设置用户基础信息
    setUserInfo: {
        url: '/home2021/yili0706_AddUser',
        type: 'POST'
    },
    // /home2021/YiLi0428_SetUserCFInfo  cf_city cf_travelmode cf_travelinfo cf_arrivaltime 来程信息
    setUserCFInfo: {
        url: '/home2021/YiLi0428_SetUserCFInfo',
        type: 'POST'
    },
    // /home2021/YiLi0428_SetUserHCInfo hc_city hc_travelmode hc_travelinfo hc_arrivaltime  回城信息
    setUserHCInfo: {
        url: '/home2021/YiLi0428_SetUserHCInfo',
        type: 'POST'
    },
    // /home2021/YiLi0428_SetUserCode healthcodeurl  tripcodeurl  健康码 形成码上传
    setUserCode: {
        url: '/home2021/YiLi0428_SetUserCode',
        type: 'POST'
    },


    //上传截图
    AddSignPosterUrl:{
        url: '/home2021/yili0706_AddSignPosterUrl',
        type: 'POST'
    } 
}


// 获取用户信息
const getUserInfo = async () => {
    const res = await http({
        ...api.getUser
    });
    console.log(res);
    return res;
}

// 根据手机号获取用户信息
const getUserInfoByMobile = async (data) => {
    const res = await http({
        ...api.GetUserInfoByMobile,
        data
    });
    return res;
}

// 设置setUserInfo
const setUserInfo = async (data) => {
    const res = await http({
        ...api.setUserInfo,
        data
    });
    console.log(res);
    return res;
}

// 设置行程信息
const setUserCFInfo = async (data) => {
    const res = await http({
        ...api.setUserCFInfo,
        data
    });
    console.log(res);
    return res;
}

// 设置返程信息
const setUserHCInfo = async (data) => {
    const res = await http({
        ...api.setUserHCInfo,
        data
    });
    console.log(res);
    return res;
}

// 二维码上传
const setUserCode = async (data) => {
    const res = await http({
        ...api.setUserCode,
        data
    });
    console.log(res);
    return res;
}

//
// 上传截图
const AddSignPosterUrl = async (data) => {
    const res = await http({
        ...api.AddSignPosterUrl,
        data
    });
    console.log(res);
    return res;
}

const apiHttp = {
    getUserInfo,getUserInfoByMobile,setUserInfo, setUserCFInfo, setUserHCInfo, setUserCode,AddSignPosterUrl
}