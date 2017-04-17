package service.test;

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
//@TransactionConfiguration(transactionManager = "transactionManager", defaultRollback = true)
//不添加此设置,测试service层的事务管理
//service层与dao层的测试时相同的,不同之处,在于service多数都在配置文件中配置了spring的事务管理
public class StoreServiceTest {
    @Autowired
    //private StoreService storeService;

    @Test
    public void insertStoreTest() {
        //Store store = new Store();
        //store.setLevel("5");
        //store.setNumber("TEST");
        //storeService.insertStore(store);
        //int i = 10 / 0;
        //这里发生异常是不会回滚的,因为此方法并没有被纳入事务管理中
    }

}
