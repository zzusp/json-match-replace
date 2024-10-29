import { useState } from 'react';
import './styles.scss';
import { Button, Col, Row } from "antd";
import ReactJson from 'react-json-view'
import { jsonCheck, jsonParse } from "../../apis/json-api";
import { JsonQueryBuilder } from "../query-builder/JsonQueryBuilder";
import FiledTable from "../field-table/FiledTable";
import { formatQuery } from "react-querybuilder";

export const JsonParse = () => {
  const [data, setData] = useState([]);

  const [json, setJson] = useState({"editor": "941", "fullName": "粤港澳-混合电力-供应-吉林AC/to cunsumer/220V\t", "isRawData": 1, "processId": 1805861566055317504, "boundaryId": 1637639320326242307, "categoryId": "1680824861183836160", "isReleased": 0, "isValidity": true, "macroValue": 1637716780858343424, "nameExtend": "{\"name\":\"粤港澳-混合电力-供应-吉林AC/to cunsumer/220V\\t\",\"technologyroadProcessroute\":\"\",\"materialComponent\":\"\",\"shapeState\":\"\",\"modelSpecification\":\"\",\"useFor\":\"\",\"fuelType\":\"\",\"productQuality\":\"\",\"standard\":\"\",\"resource\":\"\",\"extendDes\":\"\"}", "isPublished": 0, "lcaMethodId": 1699601420497584128, "isCalculated": 1, "datasetTypeId": 1680825283684466688, "processStatus": 1638113709337477120, "productTypeId": "15995714412544860", "propertyTypeId": 1637639320326242305, "technicalLevel": 1637719157472624640, "dataAttribution": "97818dd6-cb48-4d76-8766-30f8056b89a9"});

  const parse = () => {
    jsonParse({"json": JSON.stringify(json)}).then((res: any) => {
      console.log(res);
      setData(res.fields);
      let obj = JSON.parse(res.json);
      setJson(obj);
    })
  }

  const check = (query: any) => {
    jsonCheck({"json": JSON.stringify(json), "spel": formatQuery(query, 'spel')}).then((res: any) => {
      console.log(res);
    })
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Button onClick={parse}>解析</Button>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={4}>
          <ReactJson src={json} displayDataTypes={false} />
        </Col>
        <Col span={12}>
          <FiledTable fields={data} />
        </Col>
        <Col span={8}>
          <JsonQueryBuilder fields={data} onQueryChange={check} />
        </Col>
      </Row>
    </div>
  );
};