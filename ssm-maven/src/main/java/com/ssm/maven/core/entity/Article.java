package com.ssm.maven.core.entity;

import java.io.Serializable;

public class Article implements Serializable {
    @Override
    public String toString() {
        return "Article [articleID=" + articleID + ", articleTitle="
                + articleTitle + ", articleCreateDate=" + articleCreateDate
                + ", articleContent=" + articleContent + ", articleclassID="
                + articleclassID + ", istop=" + istop + ", addname=" + addname
                + "]";
    }

    private String articleID;//主键
    private String articleTitle;//文章标题
    private String articleCreateDate;//创建日期
    private String articleContent;//文章内容
    private int articleclassID;//文章类别id
    private int istop;//置顶字段
    private String addname;//添加者

    public String getArticleID() {
        return articleID;
    }

    public void setArticleID(String articleID) {
        this.articleID = articleID;
    }

    public String getArticleTitle() {
        return articleTitle;
    }

    public void setArticleTitle(String articleTitle) {
        this.articleTitle = articleTitle;
    }

    public String getArticleCreateDate() {
        return articleCreateDate;
    }

    public void setArticleCreateDate(String articleCreateDate) {
        this.articleCreateDate = articleCreateDate;
    }

    public String getArticleContent() {
        return articleContent;
    }

    public void setArticleContent(String articleContent) {
        this.articleContent = articleContent;
    }

    public int getArticleclassID() {
        return articleclassID;
    }

    public void setArticleclassID(int articleclassID) {
        this.articleclassID = articleclassID;
    }

    public int getIstop() {
        return istop;
    }

    public void setIstop(int istop) {
        this.istop = istop;
    }

    public String getAddname() {
        return addname;
    }

    public void setAddname(String addname) {
        this.addname = addname;
    }
}
