package test;

import com.ssm.maven.core.util.MD5Util;
import org.junit.Test;

/**
 * Created by 13 on 2017/3/30.
 */
public class simpleTest {

    /**
     * 得到MD5加密的内容
     */
    @Test
    public void md5Test() {
        System.out.println(MD5Util.MD5Encode("ssm-maven-secret", "UTF-8"));
        //83d8d99f45f62461cc7b7ee76b448cb0
    }

    /**
     * 通过substring()获取文件名
     */
    @Test
    public void subStringTest() {
        //通过substring()获取文件名
        String url = "https://s.doubanio.com/f/shire/5522dd1f5b742d1e1394a17f44d590646b63871d/pics/book-default-medium.gif";
        url = url.substring(url.lastIndexOf("/") + 1);
        System.out.println(url);
        String ss = "qrscene_123erqwerqwe";
        System.out.println(ss.substring(0, 8));
    }

    @Test
    public void arrayTest() {
        String ids = "12,";
        String idss = "12,22,32,";
        String[] idsStr = ids.split(",");
        String[] idsStrs = idss.split(",");
        System.out.println(idsStr.length);
        System.out.println(idsStrs.length);
    }

    @Test
    public void dateTest() {
        String s = "2015-09-15 12:59:28";
        String ss = s.replace("09-15", "09-31");
        System.out.println(ss);
    }


}
