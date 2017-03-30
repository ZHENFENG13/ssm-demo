package com.ssm.maven.core.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.ssm.maven.core.dao.BookDao;
import com.ssm.maven.core.dao.StoreBookDao;
import com.ssm.maven.core.dao.StoreDao;
import com.ssm.maven.core.entity.StoreBook;
import com.ssm.maven.core.service.StoreBookService;

/**
 * @author 1034683568@qq.com
 * @project_name ssm-maven
 * @date 2017-3-1
 */
@Service("storeBookService")
public class StoreBookServiceImpl implements StoreBookService {
    private static final long serialVersionUID = 1L;

    private static final Logger log = Logger
            .getLogger(StoreBookServiceImpl.class);// 日志文件
    @Resource
    private BookDao bookDao;
    @Resource
    private StoreDao storeDao;
    @Resource
    private StoreBookDao storeBookDao;

    @Override
    public List<StoreBook> findStoreBooks(Map<String, Object> map) {
        log.info("findStoreBooks," + map.toString());
        List<StoreBook> storeBooks = storeBookDao.findStoreBooks(map);
        for (StoreBook s : storeBooks) {
            try {
                s.setBook(bookDao.getBookById(s.getBookId()));
                s.setStore(storeDao.getStoreById(s.getStoreId()));
            } catch (Exception e) {
                log.info("书架信息错误," + s.getBookId() + "," + s.getStoreId());
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
        return storeBookDao.getStoreBookById(id);
    }

}
