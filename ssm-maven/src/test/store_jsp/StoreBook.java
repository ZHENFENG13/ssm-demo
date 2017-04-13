package com.ssm.maven.core.entity;

import java.io.Serializable;

/**
 * @author 1034683568@qq.com
 * @project_name ssm-maven
 * @date 2017-3-1
 */
public class StoreBook implements Serializable {
    private static final long serialVersionUID = 1L;
    private String id;// 主键id
    private String bookId;
    private String storeId;// 书架信息外键
    private int number;// 书本数量
    private String inDate;//放入时间

    public String getInDate() {
        return inDate;
    }

    public void setInDate(String inDate) {
        this.inDate = inDate;
    }

    private Book book;
    private Store store;

    @Override
    public String toString() {
        return "StoreBook [id=" + id + ", bookId=" + bookId + ", storeId="
                + storeId + ", book=" + book + ", store=" + store + "]";
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    public String getStoreId() {
        return storeId;
    }

    public void setStoreId(String storeId) {
        this.storeId = storeId;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
    }
}
