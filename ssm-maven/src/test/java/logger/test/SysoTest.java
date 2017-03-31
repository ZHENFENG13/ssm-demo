package logger.test;

/**
 * Created by 13 on 2017/3/27.
 */
public class SysoTest {
    public static void main(String[] args) {
        long start = System.currentTimeMillis();

        for (int i = 0; i < 1000000; i++) {
            System.out.println("syso打印1" + i);
            System.out.println("syso打印2" + i);
            System.out.println("syso打印3" + i);
        }

        long time = System.currentTimeMillis() - start;
        System.out.println(time);
    }
}
