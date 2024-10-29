import { useEffect, useState } from 'react';
import { QueryBuilderDnD } from '@react-querybuilder/dnd';
import * as ReactDnD from 'react-dnd';
import * as ReactDndHtml5Backend from 'react-dnd-html5-backend';
import { formatQuery, QueryBuilder, RuleGroupType } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.scss';
import './styles.scss';
import { QueryBuilderAntD } from '@react-querybuilder/antd';
import { CustomValueSelector } from "./CustomValueSelector";

const initialQuery: RuleGroupType = {combinator: 'and', rules: []};

export const JsonQueryBuilder = (props: any) => {
  const { fields, onQueryChange } = props;

  useEffect(() => {
    console.log("fields changed.")
  }, [fields]);

  const [query, setQuery] = useState(initialQuery);

  const queryChangeHandler = (e: RuleGroupType) => {
    setQuery(e);
    onQueryChange(e);
  }

  return (
    <QueryBuilderDnD dnd={{...ReactDnD, ...ReactDndHtml5Backend}}>
      <QueryBuilderAntD>
        <QueryBuilder
          fields={fields}
          query={query}
          onQueryChange={queryChangeHandler}
          showCloneButtons
          controlClassnames={{queryBuilder: 'queryBuilder-branches'}}
          controlElements={{fieldSelector: CustomValueSelector}}
        />
      </QueryBuilderAntD>
    </QueryBuilderDnD>
  );
};