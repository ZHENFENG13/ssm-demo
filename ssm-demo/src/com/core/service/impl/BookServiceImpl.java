package com.core.service.impl;

import com.core.dao.BookDao;
import com.core.entity.Book;
import com.core.service.BookService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("bookService")
public class BookServiceImpl implements BookService {
    private static final long serialVersionUID = 1L;
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

    @Override
    public Book getBookByISBN(String isbn) {
        try {
            return bookDao.getBookByISBN(isbn);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Book> searchBooks(Map<String, Object> map) {
        try {
            return bookDao.searchBooks(map);
        } catch (Exception e) {
            System.out.println("书籍搜索失败," + map.toString());
        }
        return null;
    }

    @Override
    public Long getSearchBooks(Map<String, Object> map) {
        return bookDao.getSearchBooks(map);
    }

    @Override
    public List<Book> getCategoryBooks(Map<String, Object> map) {
        return bookDao.getCategoryBooks(map);
    }

    @Override
    public Long getTotalCategoryBooks(Map<String, Object> map) {
        return bookDao.getTotalCategoryBooks(map);
    }

}
