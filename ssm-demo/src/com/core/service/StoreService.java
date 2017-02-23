package com.core.service;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.core.entity.Store;

public interface StoreService extends Serializable {
    /**
     * 返回相应的数据集合
     *
     * @param map
     * @return
     */
    public List<Store> findStores(Map<String, Object> map);

    /**
     * 数据数目
     *
     * @param map
     * @return
     */
    public Long getTotalStores(Map<String, Object> map);

    /**
     * 添加书架
     *
     * @param customer
     * @return
     */
    public int insertStore(Store store);

    /**
     * 修改书架信息
     *
     * @param customer
     * @return
     */
    public int updStore(Store store);

    /**
     * 删除
     *
     * @param id
     * @return
     */
    public int delStore(String id);

    /**
     * 根据id查找
     *
     * @param id
     * @return
     */
    public Store getStoreById(String id);

    public Store getOptimalStore();

}
