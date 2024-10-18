import { useState } from 'react';
import { QueryBuilderDnD } from '@react-querybuilder/dnd';
import * as ReactDnD from 'react-dnd';
import * as ReactDndHtml5Backend from 'react-dnd-html5-backend';
import type { RuleGroupType } from 'react-querybuilder';
import { QueryBuilder } from 'react-querybuilder';
import { fields } from '../datas/fields';
import 'react-querybuilder/dist/query-builder.scss';
import './styles.scss';
import { QueryBuilderAntD } from '@react-querybuilder/antd';

const initialQuery: RuleGroupType = { combinator: 'and', rules: [] };

export const JsonQueryBuilder = () => {
  const [query, setQuery] = useState(initialQuery);

  return (
    <QueryBuilderDnD dnd={{ ...ReactDnD, ...ReactDndHtml5Backend }}>
      <QueryBuilderAntD>
        <QueryBuilder
          fields={fields}
          query={query}
          onQueryChange={setQuery}
          showCloneButtons
          controlClassnames={{ queryBuilder: 'queryBuilder-branches' }}
        />
      </QueryBuilderAntD>
    </QueryBuilderDnD>
  );
};