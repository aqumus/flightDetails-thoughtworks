import { Form, Icon, Col } from 'antd';
import styled from '@emotion/styled';

export const StyledInfoIcon = styled(Icon)`
  margin-left: 10px;
`;

export const SliderMarkLabel = styled.span`
  font-size: 12px;
`;

export const StyledSection = styled.section`
  border: 1px solid #b5b2b2;
  padding: 15px;
  border-radius: 0 4px 4px 4px;
  .ant-form-explain {
    font-size: 12px;
  }
`;

export const StyledDirectionFormItem = styled(Form.Item)`
  margin: 0;
  height: 35px;
  .ant-radio-button-wrapper:first-of-type {
    border-radius: 4px 0 0 0;
  }
  .ant-radio-button-wrapper:last-child {
    border-radius: 0 4px 0 0;
  }
  .ant-radio-button-wrapper-checked {
    color: white;
    background: #1890ff;
    &:hover {
      color: white;
      background: #40a9ff;
    }
  }
`;

export const FormContainer = styled(Col)`
  padding: 0.5vw;
`;
