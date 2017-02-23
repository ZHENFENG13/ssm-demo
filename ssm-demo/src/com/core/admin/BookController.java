package com.core.admin;

import com.core.entity.Book;
import com.core.entity.PageBean;
import com.core.service.BookService;
import com.core.util.ResponseUtil;
import com.core.util.StringUtil;
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
@RequestMapping("/book")
public class BookController {
    @Resource
    private BookService bookService;
    private static final long serialVersionUID = 1L;
    private static final Logger log = Logger.getLogger(BookController.class);// 日志文件

    @RequestMapping("/listAll")
    public String listAll(
            @RequestParam(value = "page", required = false) String page,
            @RequestParam(value = "rows", required = false) String rows,
            @RequestParam(value = "success", required = false) String success,
            Book book, HttpServletResponse response) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        if (page != null && rows != null) {
            PageBean pageBean = new PageBean(Integer.parseInt(page),
                    Integer.parseInt(rows));
            map.put("start", pageBean.getStart());
            map.put("size", pageBean.getPageSize());
        }
        List<Book> bookList = null;
        Long total = 0L;
        if (book.getAuthor() != null &&
                !"".equals(book.getAuthor())) {
            map.put("author", StringUtil.formatLike(book.getAuthor()));
        }
        if (book.getTitle() != null &&
                !"".equals(book.getTitle())) {
            map.put("title", StringUtil.formatLike(book.getTitle()));
        }
        if (book.getIsbn() != null &&
                !"".equals(book.getIsbn())) {
            map.put("isbn", book.getIsbn() + "");
        }
        map.put("sort", "indate desc");
        bookList = bookService.findBooks(map);
        total = bookService.getTotalBooks(map);
        JSONObject result = new JSONObject();
        JSONArray jsonArray = JSONArray.fromObject(bookList);
        result.put("rows", jsonArray);
        result.put("total", total);
        ResponseUtil.write(response, result);
        log.info("request: book/listAll , map: " + map.toString());
        return null;
    }

}
