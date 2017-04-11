package com.ssm.maven.core.admin;

import com.ssm.maven.core.entity.PageBean;
import com.ssm.maven.core.entity.Picture;
import com.ssm.maven.core.service.PictureService;
import com.ssm.maven.core.util.DateUtil;
import com.ssm.maven.core.util.ResponseUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/picture")
public class PictureController {
	@Resource
	private PictureService pictureService;
	private static final long serialVersionUID = 1L;
	private static final Logger log = Logger.getLogger(PictureController.class);// 日志文件
	/**
	 * 查找相应的数据集合
	 * 
	 * @param page
	 * @param rows
	 * @param picture
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/list")
	public String list(
			@RequestParam(value = "page", required = false) String page,
			@RequestParam(value = "rows", required = false) String rows,
			Picture picture, HttpServletResponse response) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		if (page != null && rows != null) {
			PageBean pageBean = new PageBean(Integer.parseInt(page),
					Integer.parseInt(rows));
			map.put("start", pageBean.getStart());
			map.put("size", pageBean.getPageSize());
		}
		if (picture != null) {
			map.put("id", picture.getId() + "");
			map.put("type", picture.getType() + "");
			map.put("grade", picture.getGrade() + "");
		}
		List<Picture> pictureList = pictureService.findPicture(map);
		Long total = pictureService.getTotalPicture(map);
		JSONObject result = new JSONObject();
		JSONArray jsonArray = JSONArray.fromObject(pictureList);
		result.put("rows", jsonArray);
		result.put("total", total);
		log.info("request: picture/list , map: " + map.toString());
		ResponseUtil.write(response, result);
		return null;
	}

	/**
	 * 保存或修改
	 * 
	 * @param picture
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/save")
	public String save(Picture picture, HttpServletResponse response)
			throws Exception {
		int resultTotal = 0; 
		if (picture.getId() == null) {
			picture.setTime(DateUtil.getCurrentDateStr());
			resultTotal = pictureService.addPicture(picture);
		} else {
			System.out.println(picture.getPath());
			resultTotal = pictureService.updatePicture(picture);
		}
		JSONObject result = new JSONObject();
		if (resultTotal > 0) { 
			result.put("success", true);
		} else {
			result.put("success", false);
		}
		log.info("request: picture/save ,  " + picture.toString());
		ResponseUtil.write(response, result);
		return null;
	}

	/**
	 * 删除
	 * 
	 * @param ids
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/delete")
	public String delete(@RequestParam(value = "ids") String ids,
			HttpServletResponse response) throws Exception {
		JSONObject result = new JSONObject();
		String[] idsStr = ids.split(",");
		for (int i = 0; i < idsStr.length; i++) {
			pictureService.deletePicture(idsStr[i]);
		}
		result.put("success", true);
		log.info("request: picture/delete , ids: " + ids);
		ResponseUtil.write(response, result);
		return null;
	}

	/**
	 * 根据id查找
	 * 
	 * @param id
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/findById")
	public String findById(@RequestParam(value = "id") String id,
			HttpServletResponse response) throws Exception {
		Picture picture = pictureService.findById(id);
		JSONObject jsonObject = JSONObject.fromObject(picture);
		log.info("request: picture/findById");
		ResponseUtil.write(response, jsonObject);
		return null;
	}
}