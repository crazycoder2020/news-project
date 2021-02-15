// 本地存储封装模块

//获取token
export const getItem = (name)=>{
    const data = window.localStorage.getItem(name)
    try{
        return JSON.parse(data)
    }catch(err){    
        return data
    }
}

//设置token
export const setItem = (name,value)=>{
    if(typeof value === "object"){
       value = JSON.stringify(value)
    }
        window.localStorage.setItem(name,value)
}

//删除token
export const removeItem = (name)=>{
    window.localStorage.removeItem(name)
}