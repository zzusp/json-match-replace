package com.jsonmr.controller;

import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import com.jsonmr.model.CheckJson;
import com.jsonmr.model.Field;
import com.jsonmr.model.ParseJson;
import com.jsonmr.model.ParseJsonResult;
import org.springframework.context.expression.MapAccessor;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/jsonmr")
public class JsonmrController {

    @PostMapping("/parse")
    public ParseJsonResult parseJson(@RequestBody ParseJson parseJson) {
        JSONObject jsonObject = JSONObject.parseObject(parseJson.getJson());
        List<Field> fields = new ArrayList<>();
        parseHandler(jsonObject, "", fields);

        ParseJsonResult res = new ParseJsonResult();
        res.setJson(jsonObject.toJSONString());
        res.setFields(fields);
        return res;
    }

    private void parseHandler(JSONObject jsonObject, String preKey, List<Field> fields) {
        Field f;
        for (String key : jsonObject.keySet()) {
            String fullKey = StringUtils.hasLength(preKey) ? preKey + "." + key : key;

            String value = jsonObject.getString(key);
            if (value != null && value.startsWith("{") && value.endsWith("}")) {
                JSONObject obj = JSONObject.parseObject(value);
                this.parseHandler(obj, fullKey, fields);
                jsonObject.put(key, obj);
            } else if (value != null && value.startsWith("[{") && value.endsWith("}]")) {
                List<JSONObject> array = JSONArray.parseArray(value, JSONObject.class);
                for (JSONObject item : array) {
                    this.parseHandler(item, fullKey, fields);
                }
                jsonObject.put(key, array);
            } else if (fields.stream().noneMatch(item -> item.getName().equals(fullKey))) {
                f = new Field();
                f.setName(fullKey);
                f.setLabel(fullKey);
                f.setDefaultValue(jsonObject.get(key));
                if (f.getDefaultValue() != null) {
                    f.setObjectType(jsonObject.get(key).getClass().getSimpleName());
                }
                fields.add(f);
            }
        }
    }

    @PostMapping("/check")
    public Boolean checkJson(@RequestBody CheckJson parseJson) {
        JSONObject jsonObject = JSONObject.parseObject(parseJson.getJson());
        SpelExpressionParser parser = new SpelExpressionParser();
        StandardEvaluationContext context = new StandardEvaluationContext(jsonObject);
        //这里很关键，如果没有配置MapAccessor，那么只能用['c']['a']这种解析方式
        context.addPropertyAccessor(new MapAccessor());
        return parser.parseExpression(parseJson.getSpel()).getValue(context, Boolean.class);
    }

}
