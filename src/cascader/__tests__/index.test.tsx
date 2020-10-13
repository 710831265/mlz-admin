import React, { Component } from 'react';
import testMount from '../../../tests/testMount';
import testSnapshot from '../../../tests/testSnapshot';
import Cascader from '..';

describe('🧪 Cascader', () => {
  testMount(Cascader);
  testSnapshot(Cascader);
});
