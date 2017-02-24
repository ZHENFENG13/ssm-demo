package com.core.admin;

import com.core.entity.User;
import com.core.service.UserService;
import com.core.util.MD5Util;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * @author 1034683568@qq.com
 * @project_name ssm-login
 * @date 2015-7-28
 * @time 下午1:49:21
 */
@Controller
@RequestMapping("/user")
public class UserController {

    @Resource
    private UserService userService;
    /**
     * 登录
     *
     * @param user
     * @param request
     * @return
     */
    @RequestMapping("/login")
    public String login(User user, HttpServletRequest request) {
        try {
            String MD5pwd = MD5Util.MD5Encode(user.getPassword(), "UTF-8");
            user.setPassword(MD5pwd);
        } catch (Exception e) {
            user.setPassword("");
        }
        User resultUser = userService.login(user);
        if (resultUser == null) {
            request.setAttribute("user", user);
            request.setAttribute("errorMsg", "请认真核对账号、密码！");
            return "login";
        } else {
            HttpSession session = request.getSession();
            session.setAttribute("currentUser", resultUser);
            return "redirect:/main.jsp";
        }
    }

}
