package com.ssm.maven.core.dao;

import com.ssm.maven.core.entity.Article;

import java.util.List;
import java.util.Map;

public interface ArticleDao {
	/**
	 * 返回相应的数据集合
	 * 
	 * @param map
	 * @return
	 */
	public List<Article> findArticles(Map<String, Object> map);

	/**
	 * 数据数目
	 * 
	 * @param map
	 * @return
	 */
	public Long getTotalArticles(Map<String, Object> map);

	/**
	 * 添加文章
	 * 
	 * @return
	 */
	public int insertArticle(Article article);

	/**
	 * 修改文章
	 * 
	 * @return
	 */
	public int updArticle(Article article);

	/**
	 * 删除
	 * 
	 * @param id
	 * @return
	 */
	public int delArticle(String id);

	/**
	 * 根据id查找
	 * 
	 * @param id
	 * @return
	 */
	public Article getArticleById(String id);

}
