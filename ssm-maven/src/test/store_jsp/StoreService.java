package com.ssm.maven.core.service;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.ssm.maven.core.entity.Store;
/**
 * @author 1034683568@qq.com
 * @project_name ssm-maven
 * @date 2017-3-1
 */
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
     * @param
     * @return
     */
    public int insertStore(Store store);

    /**
     * 修改书架信息
     *
     * @param
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


}
