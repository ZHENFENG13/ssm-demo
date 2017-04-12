package com.ssm.maven.core.entity;

import java.io.Serializable;

public class Article implements Serializable {
    private String id;//主键
    private String articleTitle;//文章标题
    private String articleCreateDate;//创建日期
    private String articleContent;//文章内容
    private int articleClassID;//文章类别id
    private int isTop;//置顶字段
    private String addName;//添加者

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public int getArticleClassID() {
        return articleClassID;
    }

    public void setArticleClassID(int articleClassID) {
        this.articleClassID = articleClassID;
    }

    public int getIsTop() {
        return isTop;
    }

    public void setIsTop(int isTop) {
        this.isTop = isTop;
    }

    public String getAddName() {
        return addName;
    }

    public void setAddName(String addName) {
        this.addName = addName;
    }

    @Override
    public String toString() {
        return "Article{" +
                "id='" + id + '\'' +
                ", articleTitle='" + articleTitle + '\'' +
                ", articleCreateDate='" + articleCreateDate + '\'' +
                ", articleContent='" + articleContent + '\'' +
                ", articleClassID=" + articleClassID +
                ", isTop=" + isTop +
                ", addName='" + addName + '\'' +
                '}';
    }
}
