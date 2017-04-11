package com.ssm.maven.core.admin;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

/**
 * Created by 13 on 2017/4/7.
 */
@Controller
@RequestMapping("/loadimg")
public class LoadImageController {

    /**
     *
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/upload")
    public String upload(HttpServletRequest request, HttpServletResponse response, @RequestParam("file") MultipartFile file) throws Exception {
        ServletContext sc = request.getSession().getServletContext();
        String dir = sc.getRealPath("/upload");
        String type = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")+1, file.getOriginalFilename().length());

        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd_HHmmss");
        Random r = new Random();
        String imgName = "";
        if (type.equals("jpg")) {
            imgName = sdf.format(new Date()) + r.nextInt(100) + ".jpg";
        } else if (type.equals("png")) {
            imgName = sdf.format(new Date()) + r.nextInt(100) + ".png";
        } else if (type.equals("jpeg")) {
            imgName = sdf.format(new Date()) + r.nextInt(100) + ".jpeg";
        } else {
            return null;
        }
        FileUtils.writeByteArrayToFile(new File(dir, imgName), file.getBytes());
        response.getWriter().print("upload/" + imgName);
        return null;
    }
}
