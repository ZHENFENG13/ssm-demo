package com.ssm.maven.core.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.ssm.maven.core.dao.ArticleDao;
import com.ssm.maven.core.entity.Article;
import com.ssm.maven.core.service.ArticleService;
import org.springframework.stereotype.Service;


@Service("articleService")
public class ArticleServiceImpl implements ArticleService {

	@Resource
	private ArticleDao articleDao;

	@Override
	public List<Article> findArticle(Map<String, Object> map) {
		return articleDao.findArticles(map);
	}

	@Override
	public Long getTotalArticle(Map<String, Object> map) {
		return articleDao.getTotalArticles(map);
	}

	@Override
	public int addArticle(Article article) {
		return articleDao.insertArticle(article);
	}

	@Override
	public int updateArticle(Article article) {
		return articleDao.updArticle(article);
	}

	@Override
	public int deleteArticle(String id) {
		return articleDao.delArticle(id);
	}

	@Override
	public Article findById(String id) {
		return articleDao.getArticleById(id);
	}

}
