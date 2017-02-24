package com.core.dao;

import java.util.List;
import java.util.Map;

import com.core.entity.User;

/**
 * @author 1034683568@qq.com
 * @project_name ssm-login
 * @date 2015-7-28
 * @time 下午1:49:58
 */
public interface UserDao {

    /**
     * 登录
     *
     * @param user
     * @return
     */
    public User login(User user);
}
