package logger.test;

import org.apache.log4j.Logger;

/**
 * Created by 13 on 2017/3/27.
 */
public class LogTest {
    static Logger log = Logger.getLogger(LogTest.class);

    public static void main(String... arg0) {
        long start = System.currentTimeMillis();
        for (int i = 0; i < 10; i++) {
            log.info("log输出info:" + i);
            log.debug("log输出debug:" + i);
        }
        long time = System.currentTimeMillis() - start;
        log.info("所用时间" + time);
    }
}
