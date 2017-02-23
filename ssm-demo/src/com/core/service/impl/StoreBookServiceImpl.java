package com.core.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.core.dao.BookDao;
import com.core.dao.StoreBookDao;
import com.core.dao.StoreDao;
import com.core.entity.StoreBook;
import com.core.service.StoreBookService;

@Service("storeBookService")
public class StoreBookServiceImpl implements StoreBookService {
    private static final long serialVersionUID = 1L;
    @Resource
    private BookDao bookDao;
    @Resource
    private StoreDao storeDao;
    @Resource
    private StoreBookDao storeBookDao;

    @Override
    public List<StoreBook> findStoreBooks(Map<String, Object> map) {
        List<StoreBook> storeBooks = storeBookDao.findStoreBooks(map);
        for (StoreBook s : storeBooks) {
            try {
                s.setBook(bookDao.getBookById(s.getBookId()));
                s.setStore(storeDao.getStoreById(s.getStoreId()));
            } catch (Exception e) {
                e.printStackTrace();
                System.out.println("书架信息错误," + s.getBookId() + "," + s.getStoreId());
            }
        }
        return storeBooks;
    }

    @Override
    public Long getTotalStoreBooks(Map<String, Object> map) {
        return storeBookDao.getTotalStoreBooks(map);
    }

    @Override
    public int updStoreBook(StoreBook storebook) {
        return storeBookDao.updStoreBook(storebook);
    }

    @Override
    public int delStoreBook(String id) {
        return storeBookDao.delStoreBook(id);
    }

    @Override
    public StoreBook getStoreBookById(String id) {
        StoreBook s = storeBookDao.getStoreBookById(id);
        s.setBook(bookDao.getBookById(s.getBookId()));
        s.setStore(storeDao.getStoreById(s.getStoreId()));
        return s;
    }

}
