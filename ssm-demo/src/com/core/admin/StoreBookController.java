package com.core.admin;

import com.core.entity.Book;
import com.core.entity.PageBean;
import com.core.entity.Store;
import com.core.entity.StoreBook;
import com.core.service.BookService;
import com.core.service.StoreBookService;
import com.core.service.StoreService;
import com.core.util.ResponseUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@Scope("prototype")
@RequestMapping("/storeBook")
public class StoreBookController {
    @Resource
    private StoreBookService storeBookService;
    @Resource
    private StoreService storeService;
    /**
     * 这两个service的注入，是因为这是最终要频繁操作的书本详情
     * bookService的注入，是因为插入storeBook时，可能出现数据库中没有此书的情况，所以要重新发一条请求去重新插入这条书本类的信息
     * bookCategoryService，待续
     */
    @Resource
    private BookService bookService;

    private static final Logger log = Logger
            .getLogger(StoreBookController.class);// 日志文件


    /**
     * 查找相应的数据集合
     *
     * @param page
     * @param rows
     * @param storeBook
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("/list")
    public String list(
            @RequestParam(value = "page", required = false) String page,
            @RequestParam(value = "rows", required = false) String rows,
            StoreBook storeBook, HttpServletResponse response) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        if (page != null && rows != null) {
            PageBean pageBean = new PageBean(Integer.parseInt(page),
                    Integer.parseInt(rows));
            map.put("start", pageBean.getStart());
            map.put("size", pageBean.getPageSize());
        }
        if (storeBook.getBookId() != null) {
            map.put("isbn", storeBook.getBookId() + "");
        }
        if (storeBook.getStoreId() != null) {
            map.put("storeId", storeBook.getStoreId() + "");
        }
        List<StoreBook> storeBookList = storeBookService.findStoreBooks(map);
        Long total = storeBookService.getTotalStoreBooks(map);
        JSONObject result = new JSONObject();
        JSONArray jsonArray = JSONArray.fromObject(storeBookList);
        result.put("rows", jsonArray);
        result.put("total", total);
        ResponseUtil.write(response, result);
        log.info("request: storeBook/list , map: " + map.toString());
        return null;
    }

    /**
     * 出库操作，根据选中的id出库其中的一条数据
     *
     * @param ids
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("/outWarehouse")
    public String outWarehouse(@RequestParam(value = "ids") String ids,
                               HttpServletResponse response) throws Exception {
        JSONObject result = new JSONObject();
        String[] idsStr = ids.split(",");
        int totalResult = 0;
        for (int i = 0; i < idsStr.length; i++) {
            StoreBook temp = storeBookService.getStoreBookById(idsStr[i]);
            Store store = null;
            if (temp != null) {
                if (temp.getNumber() > 1) {
                    temp.setNumber(temp.getNumber() - 1);
                    storeBookService.updStoreBook(temp);
                } else {
                    storeBookService.delStoreBook(idsStr[i]);
                }
                store = temp.getStore();
                int totalPages = Integer.valueOf(store.getPage());
                int pages = Integer.valueOf(temp.getBook().getPages());
                if (totalPages >= pages) {
                    store.setPage(totalPages - pages + "");
                    Book book = bookService.getBookById(temp.getBookId());
                    if (book.getSupply() > 0)
                        book.setSupply(book.getSupply() - 1);
                    if (book.getSupply() < 1)
                        book.setStatus("0");
                    // 数据更新后反序列化到数据库中
                    //bookService.updBook(book);
                    totalResult += storeService.updStore(store);
                }
            }
        }
        if (totalResult > 0)
            result.put("success", true);
        else
            result.put("success", false);
        ResponseUtil.write(response, result);
        log.info("request: storeBook/outWarehouse , ids: " + ids);
        return null;
    }

    /**
     * 出库操作，根据选中的id清空此条记录
     *
     * @param ids
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("/emptyWarehouse")
    public String emptyWarehouse(@RequestParam(value = "ids") String ids,
                                 HttpServletResponse response) throws Exception {
        JSONObject result = new JSONObject();
        String[] idsStr = ids.split(",");
        int totalResult = 0;
        for (int i = 0; i < idsStr.length; i++) {
            StoreBook temp = storeBookService.getStoreBookById(idsStr[i]);
            Store store = null;
            // 只要不是空对象就直接删除
            if (temp != null) {
                storeBookService.delStoreBook(idsStr[i]);
                store = temp.getStore();
                int totalPages = Integer.valueOf(store.getPage());
                int pages = Integer.valueOf(temp.getBook().getPages())
                        * temp.getNumber();
                if (totalPages >= pages) {
                    store.setPage(totalPages - pages + "");

                    Book book = bookService.getBookById(temp.getBookId());
                    if (book.getSupply() > 0)
                        book.setSupply(book.getSupply() - temp.getNumber());
                    if (book.getSupply() < 1)
                        book.setStatus("0");
                    // 数据更新后反序列化到数据库中
                    //bookService.updBook(book);
                    totalResult += storeService.updStore(store);
                }
            }
        }
        if (totalResult > 0)
            result.put("success", true);
        else
            result.put("success", false);
        ResponseUtil.write(response, result);
        log.info("request: storeBook/outWarehouse , ids: " + ids);
        return null;
    }


}
