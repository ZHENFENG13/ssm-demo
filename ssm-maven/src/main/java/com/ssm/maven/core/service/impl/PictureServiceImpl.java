package com.ssm.maven.core.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.ssm.maven.core.dao.PictureDao;
import com.ssm.maven.core.entity.Picture;
import com.ssm.maven.core.service.PictureService;
import org.springframework.stereotype.Service;


@Service("pictureService")
public class PictureServiceImpl implements PictureService {
    @Resource
    private PictureDao pd;

    @Override
    public List<Picture> findPicture(Map<String, Object> map) {
        return pd.findPictures(map);
    }

    @Override
    public Long getTotalPicture(Map<String, Object> map) {
        return pd.getTotalPictures(map);
    }

    @Override
    public int addPicture(Picture picture) {
        if (picture.getPath() == null || getTotalPicture(null) > 90 || picture.getPath().length() > 100 || picture.getUrl().length() > 100) {
            return 0;
        }
        return pd.insertPicture(picture);
    }

    @Override
    public int updatePicture(Picture picture) {
        if (picture.getPath() == null || getTotalPicture(null) > 90 || picture.getPath().length() > 100 || picture.getUrl().length() > 100) {
            return 0;
        }
        return pd.updPicture(picture);
    }

    @Override
    public int deletePicture(String id) {
        return pd.delPicture(id);
    }

    @Override
    public Picture findById(String id) {
        return pd.findPictureById(id);
    }

}
