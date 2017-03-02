package com.ssm.maven.core.service;

import java.util.List;
import java.util.Map;

import com.ssm.maven.core.entity.User;

/**
 * @author 1034683568@qq.com
 * @project_name ssm-maven
 * @date 2017-3-1
 */
public interface UserService {

    /**
     * �û���¼
     *
     * @param user
     * @return
     */
    public User login(User user);

    /**
     * ��ѯ�û�
     *
     * @param map
     * @return
     */
    public List<User> findUser(Map<String, Object> map);

    /**
     * ��ȡ�û���¼��
     *
     * @param map
     * @return
     */
    public Long getTotalUser(Map<String, Object> map);

    /**
     * �����û�
     *
     * @param user
     * @return
     */
    public int updateUser(User user);

    /**
     * ����û�
     *
     * @param user
     * @return
     */
    public int addUser(User user);

    /**
     * ɾ���û�
     *
     * @param id
     * @return
     */
    public int deleteUser(Integer id);
}
