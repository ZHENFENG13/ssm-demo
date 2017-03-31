package com.ssm.maven.core.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ssm.maven.core.dao.StoreDao;
import com.ssm.maven.core.entity.Store;
import com.ssm.maven.core.service.StoreService;

/**
 * @author 1034683568@qq.com
 * @project_name ssm-maven
 * @date 2017-3-1
 */
@Service("storeService")
public class StoreServiceImpl implements StoreService {
    private static final long serialVersionUID = 1L;
    @Resource
    private StoreDao storeDao;

    @Override
    public List<Store> findStores(Map<String, Object> map) {
        return storeDao.findStores(map);
    }

    @Override
    public Long getTotalStores(Map<String, Object> map) {
        return storeDao.getTotalStores(map);
    }

    @Override
    public int insertStore(Store store) {
        //客户端传来一个参数level，根据多少层来添加多少个对象
        int level = Integer.valueOf(store.getLevel());
        for (int i = 1; i < level; i++) {
            store.setLevel(i + "");
            storeDao.insertStore(store);
        }
        store.setLevel(level + "");
        int result = storeDao.insertStore(store);
        //int i = 10 / 0;
        //发生异常,操作回滚.
        return result;
    }

    @Override
    public int updStore(Store store) {
        return storeDao.updStore(store);
    }

    @Override
    public int delStore(String id) {
        return storeDao.delStore(id);
    }

    @Override
    public Store getStoreById(String id) {
        return storeDao.getStoreById(id);
    }

}
