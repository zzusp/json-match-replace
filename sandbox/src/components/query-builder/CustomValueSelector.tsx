import * as React from 'react';
import type { FullOption, ValueSelectorProps } from 'react-querybuilder';
import { useSelectElementChangeHandler, useValueSelector } from 'react-querybuilder';
// import { toOptions } from '@react-querybuilder/antd/dist/types/utils';
import { Select } from 'antd';

/**
 * Default `<select>` component used by {@link QueryBuilder}.
 */
export const CustomValueSelector = <Opt extends FullOption = FullOption>(
  props: ValueSelectorProps<Opt>
): React.JSX.Element => {
  const {onChange, val} = useValueSelector(props);

  // const selectElementChangeHandler = useSelectElementChangeHandler({
  //   multiple: props.multiple,
  //   onChange,
  // });

  const changeHandler = (value: string | string[]) => {
    onChange(value)
  };

  const toOptions = (options: any[]) => options.map(({name, label}) => {
    return {'value': name, 'label': label};
  })

  return (
    <Select
      data-testid={props.testID}
      title={props.title}
      disabled={props.disabled}
      mode={!!props.multiple ? 'multiple' : undefined}
      style={{minWidth: '160px'}}
      showSearch
      allowClear
      value={val}
      placeholder={props.title}
      options={toOptions(props.options)}
      onChange={changeHandler}
    />
  );
};