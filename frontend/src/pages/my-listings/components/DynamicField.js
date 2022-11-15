import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Button, DatePicker } from 'antd';
import styles from './DynamicField.module.css';

const DynamicField = (props) => {
  const { RangePicker } = DatePicker;
  return (
    <Form.List name="fields">
      {(fields, { add, remove }) => {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {fields.map((field, index) => (
              <div key={field.key} className={styles.container}>
                <Form.Item
                  name={[index, 'range']}
                  rules={[
                    { required: true, message: 'Please enter a date range' },
                  ]}
                >
                  <RangePicker />
                </Form.Item>
                {fields.length >= 1
                  ? (
                  <Button
                    block={false}
                    size="small"
                    type="danger"
                    onClick={() => remove(field.name)}
                    icon={<MinusCircleOutlined />}
                  >
                    Remove Above Field
                  </Button>)
                  : null}
              </div>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()}>
                <PlusOutlined /> Add field
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
};

export default DynamicField;
