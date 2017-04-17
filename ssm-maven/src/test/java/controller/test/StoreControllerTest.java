package controller.test;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;


/**
 * Springmvc 单元测试类
 *
 * @author 13 2015-8-17
 */
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration({"classpath*:/spring-context.xml", "classpath*:/spring-context-mvc.xml", "classpath*:/mybatis-config.xml"})
@TransactionConfiguration(defaultRollback = false)
@Transactional
public class StoreControllerTest {
    @Autowired
    private WebApplicationContext wac;

    private MockMvc mockMvc;
    @Before
    public void setup() {
        this.mockMvc = webAppContextSetup(this.wac).build();
    }

    @Test
    public void testSave() throws Exception {
        //创建书架创建的请求
        //请求方式为post
        MockHttpServletRequestBuilder mockHttpServletRequestBuilder = MockMvcRequestBuilders.post("/store/save.do");
        //添加编号为MockMvc的书架
        mockHttpServletRequestBuilder.param("number", "MockMvc");
        //书架为两层
        mockHttpServletRequestBuilder.param("level", "2");
        mockMvc.perform(mockHttpServletRequestBuilder).andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    public void testList() throws Exception {
        //创建书架创建的请求
        //请求方式为post
        MockHttpServletRequestBuilder mockHttpServletRequestBuilder = MockMvcRequestBuilders.post("/store/list.do");
        //有些参数我注释掉了，你可以自行添加相关参数，得到不同的测试结果
        //status为0的记录
        //mockHttpServletRequestBuilder.param("status", "0");
        //书架编号为dd的记录
        //mockHttpServletRequestBuilder.param("number", "dd");
        //第一页
        mockHttpServletRequestBuilder.param("page", "1");
        //每页10条记录
        mockHttpServletRequestBuilder.param("rows", "10");
        mockMvc.perform(mockHttpServletRequestBuilder).andExpect(status().isOk())
                .andDo(print());

        //控制台会打印如下结果：
        //MockHttpServletResponse:
        //Status = 200 即为后端成功相应
        //返回数据
    }
}  