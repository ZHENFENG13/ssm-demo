package com.ssm.maven.core.service;

import com.ssm.maven.core.entity.Picture;

import java.util.List;
import java.util.Map;

public interface PictureService {
	/**
	 * 返回相应的数据集合
	 * 
	 * @param map
	 * @return
	 */
	public List<Picture> findPicture(Map<String, Object> map);

	/**
	 * 数据数目
	 * 
	 * @param map
	 * @return
	 */
	public Long getTotalPicture(Map<String, Object> map);

	/**
	 * 添加图片
	 * 
	 * @param picture
	 * @return
	 */
	public int addPicture(Picture picture);

	/**
	 * 修改图片
	 * 
	 * @param picture
	 * @return
	 */
	public int updatePicture(Picture picture);

	/**
	 * 删除
	 * 
	 * @param id
	 * @return
	 */
	public int deletePicture(String id);

	/**
	 * 根据id查找
	 * 
	 * @param id
	 * @return
	 */
	public Picture findById(String id);
}
