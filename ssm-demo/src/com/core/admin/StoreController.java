package com.core.admin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.core.entity.PageBean;
import com.core.entity.Store;
import com.core.service.StoreService;
import com.core.util.ResponseUtil;

@Controller
@RequestMapping("/store")
public class StoreController {
    @Resource
    private StoreService storeService;
    private static final Logger log = Logger.getLogger(StoreController.class);// 日志文件

    /**
     * 查找相应的数据集合
     *
     * @param page
     * @param rows
     * @param store
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("/list")
    public String list(
            @RequestParam(value = "page", required = false) String page,
            @RequestParam(value = "rows", required = false) String rows,
            Store store, HttpServletResponse response) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        if (page != null && rows != null) {
            PageBean pageBean = new PageBean(Integer.parseInt(page),
                    Integer.parseInt(rows));
            map.put("start", pageBean.getStart());
            map.put("size", pageBean.getPageSize());
        }
        if (store.getStatus() != 0) {
            map.put("status", store.getStatus() + "");
        }
        if (store.getNumber() != null) {
            map.put("number", store.getNumber());
        }
        List<Store> storeList = storeService.findStores(map);
        Long total = storeService.getTotalStores(map);
        JSONObject result = new JSONObject();
        JSONArray jsonArray = JSONArray.fromObject(storeList);
        result.put("rows", jsonArray);
        result.put("total", total);
        ResponseUtil.write(response, result);
        log.info("request: store/list , map: " + map.toString());
        return null;
    }

    /**
     * 保存或修改
     *
     * @param store
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("/save")
    public String save(Store store, HttpServletResponse response)
            throws Exception {
        int resultTotal = 0;
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("number", store.getNumber());
        JSONObject result = new JSONObject();
        if (storeService.findStores(map).size() > 0
                || Integer.valueOf(store.getLevel()) < 1) {
            result.put("success", false);
            ResponseUtil.write(response, result);
        } else {
            if (store.getId() == null) {
                resultTotal = storeService.insertStore(store);
            } else {
                resultTotal = storeService.updStore(store);
            }
            if (resultTotal > 0) {
                result.put("success", true);
            } else {
                result.put("success", false);
            }
            ResponseUtil.write(response, result);
        }
        log.info("request: store/save , " + store.toString());
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
            storeService.delStore(idsStr[i]);
        }
        result.put("success", true);
        ResponseUtil.write(response, result);
        log.info("request: store/delete , ids: " + ids);
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
        Store store = storeService.getStoreById(id);
        JSONObject jsonObject = JSONObject.fromObject(store);
        ResponseUtil.write(response, jsonObject);
        log.info("request: store/findById");
        return null;
    }

    /**
     * 开启书架继续放书
     *
     * @param id
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("/openStore")
    public String openStore(@RequestParam(value = "ids") String ids,
                            HttpServletResponse response) throws Exception {
        JSONObject result = new JSONObject();
        String[] idsStr = ids.split(",");
        Store temp = null;
        int resultTotal = 0;
        for (int i = 0; i < idsStr.length; i++) {
            temp = storeService.getStoreById(idsStr[i]);
            if (temp != null && temp.getStatus() != 0) {
                temp.setStatus(0);
                resultTotal += storeService.updStore(temp);
            }
        }
        if (resultTotal > 0)
            result.put("success", true);
        else
            result.put("success", false);
        ResponseUtil.write(response, result);
        log.info("request: store/openStore , ids: " + ids);
        return null;
    }

    /**
     * 关闭书架不再放书
     *
     * @param id
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("/closeStore")
    public String closeStore(@RequestParam(value = "ids") String ids,
                             HttpServletResponse response) throws Exception {
        JSONObject result = new JSONObject();
        String[] idsStr = ids.split(",");
        Store temp = null;
        int resultTotal = 0;
        for (int i = 0; i < idsStr.length; i++) {
            temp = storeService.getStoreById(idsStr[i]);
            if (temp != null && temp.getStatus() != 1) {
                temp.setStatus(1);
                resultTotal += storeService.updStore(temp);
            }
        }
        if (resultTotal > 0)
            result.put("success", true);
        else
            result.put("success", false);
        ResponseUtil.write(response, result);
        log.info("request: store/openStore , ids: " + ids);
        return null;
    }
}
