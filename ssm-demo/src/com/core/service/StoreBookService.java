package com.core.service;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.core.entity.StoreBook;

public interface StoreBookService extends Serializable {
    /**
     * 返回相应的数据集合
     *
     * @param map
     * @return
     */
    public List<StoreBook> findStoreBooks(Map<String, Object> map);

    /**
     * 数据数目
     *
     * @param map
     * @return
     */
    public Long getTotalStoreBooks(Map<String, Object> map);


    /**
     * 修改书架_书籍桥表信息, 这个功能暂时可能不会用到
     *
     * @param customer
     * @return
     */
    public int updStoreBook(StoreBook storebook);

    /**
     * 删除
     *
     * @param id
     * @return
     */
    public int delStoreBook(String id);

    /**
     * 根据id查找
     *
     * @param id
     * @return
     */
    public StoreBook getStoreBookById(String id);

}
