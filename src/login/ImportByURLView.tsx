import { request } from "@request";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOpenapiWithServiceInfoStore } from "../core/store";
import { mainLayoutPath } from "../main/routes";
import { flattenOperations } from "../openapi/useOpenapiInfo";
import { ImportModeType, requiredFieldPlaceholder, serviceURLLabel, serviceURLPlaceholder } from "./config";
import { IURLImport } from "./type";
import { parseOpenapi } from "./util";

const FormItem = Form.Item<IURLImport>;

export function URLImportView() {
  const { updateOpenapiWithServiceInfo } = useOpenapiWithServiceInfoStore();
  const [form] = Form.useForm<IURLImport>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function onFinish(values: IURLImport) {
    setLoading(true);
    let serviceURL = values.serviceURL;
    let url = serviceURL;

    if (!url) {
      return message.warning(requiredFieldPlaceholder);
    }

    if (serviceURL.endsWith("/")) {
      serviceURL = serviceURL.slice(0, url.length - 1);
      url = serviceURL;
    }

    if (values.servicePath) {
      if (values.servicePath.startsWith("/")) {
        url = `${url}${values.servicePath}`;
      } else {
        url = `${url}/${values.servicePath}`;
      }
    }

    const res = await request({ url: url });
    setLoading(false);

    if (res.status >= 200 && res.status < 300) {
      const openapi = parseOpenapi(res.data);
      const openapiInfo = {
        serviceURL: serviceURL,
        servicePath: values.servicePath,
        openapi: openapi,
        operations: flattenOperations(res.data.paths),
        importModeType: ImportModeType.url,
      };

      updateOpenapiWithServiceInfo(openapiInfo);
      navigate(`/${mainLayoutPath}?logon=yes`);
    }
  }

  return (
    <Form
      name="urlImportForm"
      form={form}
      layout="vertical"
      initialValues={{ serviceURL: "", servicePath: "" }}
      onFinish={onFinish}
    >
      <FormItem name="serviceURL" label={serviceURLLabel} rules={[{ required: true, message: serviceURLPlaceholder }]}>
        <Input placeholder={serviceURLPlaceholder} />
      </FormItem>
      <FormItem name="servicePath" label="dosc service path, for example: /openapi or openapi">
        <Input placeholder="please enter your service path" />
      </FormItem>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }} loading={loading}>
          import
        </Button>
      </Form.Item>
    </Form>
  );
}