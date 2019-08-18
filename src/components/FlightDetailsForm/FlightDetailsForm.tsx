import React, { useCallback } from 'react';
import {
  Form,
  Button,
  AutoComplete,
  Radio,
  DatePicker,
  InputNumber,
  Tooltip,
  Slider
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import {
  StyledInfoIcon,
  SliderMarkLabel,
  StyledSection,
  StyledDirectionFormItem,
  FormContainer
} from './FlightDetailsForm.styles';
import { JourneyType, CITIES, FlightDetailsFormValues } from '../../model';

export type FlightDetailsFormOwnProps = {
  readonly onSubmit: (formValues: FlightDetailsFormValues) => void;
};

type FlightDetailsFormProps = FormComponentProps & FlightDetailsFormOwnProps;

const hasFormErrors = (errors: object) =>
  Object.values(errors).some(error => error);

const _FlightDetailsForm: React.FC<FlightDetailsFormProps> = ({
  form,
  onSubmit
}) => {
  const {
    getFieldDecorator,
    getFieldValue,
    getFieldsError,
    validateFieldsAndScroll
  } = form;

  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          onSubmit(values);
        }
      });
    },
    [validateFieldsAndScroll, onSubmit]
  );

  return (
    <FormContainer xs={24} sm={24} md={6} lg={6} xl={4}>
      <Form onSubmit={handleSubmit}>
        <StyledDirectionFormItem>
          {getFieldDecorator('journeyType', {
            initialValue: JourneyType.SINGLE
          })(
            <Radio.Group>
              <Radio.Button value={JourneyType.SINGLE}>One Way</Radio.Button>
              <Radio.Button value={JourneyType.RETURN}>Return</Radio.Button>
            </Radio.Group>
          )}
        </StyledDirectionFormItem>
        <StyledSection>
          <Form.Item>
            {getFieldDecorator('origin', {
              rules: [
                {
                  required: true,
                  message: 'Please input your Origin City !'
                }
              ]
            })(
              <AutoComplete
                placeholder="Origin City"
                dataSource={CITIES}
                filterOption
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('destination', {
              rules: [
                {
                  required: true,
                  message: 'Please input your Destination City !'
                }
              ]
            })(
              <AutoComplete
                placeholder="Destination City"
                dataSource={CITIES}
                filterOption
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('departureDate', {
              rules: [{ required: true, message: 'Please select date' }]
            })(<DatePicker placeholder="Departure Date" />)}
          </Form.Item>
          {getFieldValue('journeyType') === JourneyType.RETURN && (
            <Form.Item>
              {getFieldDecorator('returnDate', {
                rules: [{ required: true, message: 'Please select date' }]
              })(<DatePicker placeholder="Return Date" />)}
            </Form.Item>
          )}
          <Form.Item>
            {getFieldDecorator('passengers', {
              initialValue: 1,
              rules: [
                {
                  required: true,
                  message: 'Please enter Number of passengers'
                }
              ]
            })(<InputNumber min={1} max={20} required type="number" />)}
            <Tooltip title="Enter Total No. of passengers">
              <StyledInfoIcon type="info-circle" />
            </Tooltip>
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('maxPrice')(
              <Slider
                marks={{
                  0: {
                    label: <SliderMarkLabel>Rs. 0</SliderMarkLabel>
                  },
                  100000: {
                    label: <SliderMarkLabel>Rs. 100k</SliderMarkLabel>
                  }
                }}
                step={2500}
                min={0}
                max={100000}
                tipFormatter={value => `Rs. ${value}`}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasFormErrors(getFieldsError())}
            >
              Search
            </Button>
          </Form.Item>
        </StyledSection>
      </Form>
    </FormContainer>
  );
};

export const FlightDetailsForm = Form.create<FlightDetailsFormProps>({
  name: 'flightDetailsForm'
})(_FlightDetailsForm);
