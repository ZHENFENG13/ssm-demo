package com.ssm.maven.core.service.impl;

import com.ssm.maven.core.dao.BookDao;
import com.ssm.maven.core.entity.Book;
import com.ssm.maven.core.service.BookService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * @author 1034683568@qq.com
 * @project_name ssm-maven
 * @date 2017-3-1
 */
@Service("bookService")
public class BookServiceImpl implements BookService {
    private static final long serialVersionUID = 1L;
    private static final Logger log = Logger
            .getLogger(BookServiceImpl.class);// 日志文件
    @Resource
    private BookDao bookDao;

    @Override
    public List<Book> findBooks(Map<String, Object> map) {
        return bookDao.findBooks(map);
    }

    @Override
    public Long getTotalBooks(Map<String, Object> map) {
        return bookDao.getTotalBooks(map);
    }

    @Override
    public int insertBook(Book book) {
        return bookDao.insertBook(book);
    }

    @Override
    public Book getBookById(String id) {
        return bookDao.getBookById(id);
    }

}
