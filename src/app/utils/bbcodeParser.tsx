import React, { ReactElement } from 'react';
import { Text } from 'react-native';
import { parse } from '@bbob/parser';
import ImageTag from './bbcode/ImageTag';
import { AstNode } from './bbcode/types';

const tagMap = {
  img: ImageTag,
};

/**
 * BBCode 解析器
 */
class BBCodeParser {
  options = {
    onlyAllowTags: ['img'],
    onError: (err) => {
      console.warn(err.message, err.lineNumber, err.columnNumber);
    },
  };

  parse(input: string): ReactElement[] {
    const ast = parse(input, this.options) as AstNode[];

    return ast.map<ReactElement>((node, index) => {
      if (typeof node === 'string') {
        return <Text key={index}>{node}</Text>;
      }

      if (typeof node === 'object' && node.tag && tagMap[node.tag]) {
        const Component = tagMap[node.tag];
        return <Component key={index} node={node} />;
      }

      return null;
    });
  }
}

export default new BBCodeParser();
