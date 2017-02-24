package com.core.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.core.dao.UserDao;
import com.core.entity.User;
import com.core.service.UserService;

/**
 * @author 1034683568@qq.com
 *         project_name ssm-login
 * @date 2015-7-28
 * @time 下午1:52:50
 */
@Service("userService")
public class UserServiceImpl implements UserService {

    @Resource
    private UserDao userDao;

    @Override
    public User login(User user) {
        return userDao.login(user);
    }

}
