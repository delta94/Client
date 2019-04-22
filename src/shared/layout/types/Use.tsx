import React from 'react';
import Base, { BaseTypeRow } from './Base';
import { Row } from 'antd';
import { XMLBuilderContext } from '../XMLBuilder';
import { XMLElementAttributes } from '../parser/xml-parser';

export default class TUse extends Base {
  name = 'Use';

  getEditView(
    tagName,
    attributes: XMLElementAttributes,
    elements,
    context: XMLBuilderContext
  ) {
    const { state } = context;
    const defines = state.defines;
    const { name } = attributes;

    const componentFn = defines[name];
    if (componentFn) {
      return componentFn(context);
    } else {
      return null;
    }
  }
}
