const __DEV__ = true;

// 🔧 判断对象非原型链上是否存在某一指定属性
export const ifPropertyExited = ($key: PropertyKey, $targetObj: Record<string, any>): boolean => Object.prototype.hasOwnProperty.call($targetObj, $key);

// 🔧 清洗属性
export const omitObject = <T extends Record<string, any>, U extends string>($targetObj: T, $key: U | U[], $prototypable?: boolean): Omit<T, U> => {
  const keies: string[] = typeof $key === 'string' ? [$key] : $key;
  const result = JSON.parse(JSON.stringify($targetObj));
  if ($prototypable === true) {
    __DEV__ && console.warn(`[${omitObject.name}]开启prototypable后将影响到原型链上的属性，请确保你能hold住`);
    for (const key in result) {
      if (keies.includes(key)) {
        delete result[key];
      }
    }
    return result;
  }
  keies.forEach((oneKey) => {
    if (ifPropertyExited(oneKey, result)) {
      delete result[oneKey];
    }
  });
  return result;
};

// 🔧 预测columns可能的primary key
export const guessPrimaryKey = ($columns: any[]): string | undefined => {
  if (!$columns) {
    return undefined;
  }
  const probables = $columns.filter((column) => column.primary === true);
  if (probables.length > 0) {
    // 如果columns有指定了primary:boolean则使用它
    if (__DEV__ && probables.length > 1) {
      console.warn(`[${guessPrimaryKey.name}]Table.columns[]只允许指定${1}列为primary，现在${probables.reduce((prev, curr) => prev.concat([curr.dataIndex]), []).join(',')}都是`);
    }
    return probables[0].dataIndex;
  } else {
    // 否则通过一系列逻辑猜测
    const checkerEnds = ['id', 'Id', 'key', 'Key', '_id', '_key'];
    let indexa = 0;
    $columns.forEach((column, index) => {
      checkerEnds.some((checkerEnd, i) => {
        const matched = new RegExp(`${checkerEnd}$`, 'g').test(column?.dataIndex);
        if (matched) indexa = index;
        return matched;
      });
    });
    if (__DEV__ && !$columns[indexa].dataIndex) {
      __DEV__ && console.warn(`[${guessPrimaryKey.name}]没有推测出primary key，请在Table.rowkey属性上自行指定`);
      return '';
    }
    return $columns[indexa].dataIndex;
  }
};
