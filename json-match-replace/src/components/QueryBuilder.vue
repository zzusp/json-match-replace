<script setup>
import { ref, onMounted } from 'vue'
import $ from 'jquery';
import bootstrap from 'bootstrap';
window.$ = $;  // 挂载到全局 window 对象
window.bootstrap = bootstrap;  // 挂载到全局 window 对象
import 'jQuery-QueryBuilder/dist/js/query-builder.js';


const rules_basic = {
  condition: 'AND',
  rules: [{
    id: 'price',
    operator: 'less',
    value: 10.25
  }, {
    condition: 'OR',
    rules: [{
      id: 'category',
      operator: 'equal',
      value: 2
    }, {
      id: 'category',
      operator: 'equal',
      value: 1
    }]
  }]
};

const builderRef = ref();

onMounted(() => {
  $('#builder-basic').queryBuilder({
    plugins: ['bt-tooltip-errors'],

    filters: [{
      id: 'name',
      label: 'Name',
      type: 'string'
    }, {
      id: 'category',
      label: 'Category',
      type: 'integer',
      input: function(rule, input_name) {
        if (rule.operator.type === 'in') {
          return '<el-button>Test</el-button>'
        } else {
          return 'select';
        }
      },
      values: {
        1: 'Books',
        2: 'Movies',
        3: 'Music',
        4: 'Tools',
        5: 'Goodies',
        6: 'Clothes'
      },
      operators: ['equal', 'not_equal', 'in', 'not_in', 'is_null', 'is_not_null']
    }, {
      id: 'in_stock',
      label: 'In stock',
      type: 'integer',
      input: 'radio',
      values: {
        1: 'Yes',
        0: 'No'
      },
      operators: ['equal']
    }, {
      id: 'price',
      label: 'Price',
      type: 'double',
      validation: {
        min: 0,
        step: 0.01
      }
    }, {
      id: 'id',
      label: 'Identifier',
      type: 'string',
      placeholder: '____-____-____',
      operators: ['equal', 'not_equal'],
      validation: {
        format: /^.{4}-.{4}-.{4}$/
      }
    }],

    rules: rules_basic
  });

  // $('#builder-basic').on('afterUpdateRuleOperator.queryBuilder', function(e, rule, previousOperator) {
  //   // never display error for my custom filter
  //   console.log(rule, previousOperator);
  //   console.log(rule.operator.type, previousOperator);
  //   if (rule.operator.type === 'in') {
  //     rule.filter.multiple = true;
  //     rule.operator.multiple = true;
  //   } else {
  //     rule.filter.multiple = false;
  //     rule.operator.multiple = false;
  //   }
  // });

  // $('#btn-reset').on('click', function () {
  //   $('#builder-basic').queryBuilder('reset');
  // });
  //
  // $('#btn-set').on('click', function () {
  //   $('#builder-basic').queryBuilder('setRules', rules_basic);
  // });
  //
  // $('#btn-get').on('click', function () {
  //   var result = $('#builder-basic').queryBuilder('getRules');
  //
  //   if (!$.isEmptyObject(result)) {
  //     alert(JSON.stringify(result, null, 2));
  //   }
  // });
})

</script>

<template>
  <div id="builder-basic" ref="builderRef" style="width: 800px"></div>
</template>

<style scoped>

</style>
