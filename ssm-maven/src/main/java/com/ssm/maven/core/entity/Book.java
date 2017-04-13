package com.ssm.maven.core.entity;

import java.io.Serializable;
import java.util.List;
/**
 * @author 1034683568@qq.com
 * @project_name ssm-maven
 * @date 2017-3-1
 */
public class Book implements Serializable {
    private String id;// 主键id
    private String isbn;// ISBN码
    private String path;// 图片
    private String title;// 标题
    private String subtitle;// 副标题
    private String originalTitle;
    private String marketPrice;// 市场价
    private String intro;// 简介
    private String binding;// 装订方式
    private String pages;// 页数
    private String author;// 作者
    private String publisher;// 出版社
    private String catalog;// 目录
    private int supply;// 库存
    private String status;// 状态
    private int hot;// 热度值

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public String getOriginalTitle() {
        return originalTitle;
    }

    public void setOriginalTitle(String originalTitle) {
        this.originalTitle = originalTitle;
    }

    public String getMarketPrice() {
        return marketPrice;
    }

    public void setMarketPrice(String marketPrice) {
        this.marketPrice = marketPrice;
    }

    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }

    public String getBinding() {
        return binding;
    }

    public void setBinding(String binding) {
        this.binding = binding;
    }

    public String getPages() {
        return pages;
    }

    public void setPages(String page) {
        this.pages = page;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getCatalog() {
        return catalog;
    }

    public void setCatalog(String catalog) {
        this.catalog = catalog;
    }

    public int getSupply() {
        return supply;
    }

    public void setSupply(int supply) {
        this.supply = supply;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getHot() {
        return hot;
    }

    public void setHot(int hot) {
        this.hot = hot;
    }

    @Override
    public String toString() {
        return "Book{" +
                "id='" + id + '\'' +
                ", isbn='" + isbn + '\'' +
                ", path='" + path + '\'' +
                ", title='" + title + '\'' +
                ", subtitle='" + subtitle + '\'' +
                ", originalTitle='" + originalTitle + '\'' +
                ", marketPrice='" + marketPrice + '\'' +
                ", intro='" + intro + '\'' +
                ", binding='" + binding + '\'' +
                ", pages='" + pages + '\'' +
                ", author='" + author + '\'' +
                ", publisher='" + publisher + '\'' +
                ", catalog='" + catalog + '\'' +
                ", supply=" + supply +
                ", status='" + status + '\'' +
                ", hot=" + hot +
                '}';
    }
}
