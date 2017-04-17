package dao.test;

import com.ssm.maven.core.dao.BookDao;
import com.ssm.maven.core.entity.Book;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by 13 on 2017/3/30.
 */
@RunWith(SpringJUnit4ClassRunner.class) //指定测试用例的运行器 这里是指定了Junit4
@ContextConfiguration("classpath:spring-context.xml")
public class BookDaoTest {
    @Autowired
    private BookDao bookDao;

    @Test
    public void getBookByIdTest() {
        Book book1 = bookDao.getBookById("1");
        Assert.assertEquals(book1, null);
        Book book2 = bookDao.getBookById("1002");
        Assert.assertEquals(book2.getTitle(), "材料成型概论");
        // Assert.assertEquals(book2.getTitle(), "我随便写一个");
    }

}
