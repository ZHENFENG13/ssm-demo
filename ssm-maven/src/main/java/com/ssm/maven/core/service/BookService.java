package com.ssm.maven.core.service;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.ssm.maven.core.entity.Book;

/**
 * @author 1034683568@qq.com
 * @project_name ssm-maven
 * @date 2017-3-1
 */
public interface BookService extends Serializable {
    /**
     * 返回相应的数据集合
     *
     * @param map
     * @return
     */
    public List<Book> findBooks(Map<String, Object> map);

    /**
     * 数据数目
     *
     * @param map
     * @return
     */
    public Long getTotalBooks(Map<String, Object> map);

    /**
     * 添加书籍
     *
     * @return
     */
    public int insertBook(Book book);


    /**
     * 根据id查找
     *
     * @param id
     * @return
     */
    public Book getBookById(String id);
}
