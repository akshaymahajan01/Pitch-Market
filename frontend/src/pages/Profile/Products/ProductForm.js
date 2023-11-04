import { Modal, Tabs, Form, Input, Row, Col, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from "../../../redux/loaderslice";
import { AddProduct, EditProduct } from "../../../apicalls/products";
import Images from "./Images"


const additionalThings = [
  {
    label: "Bill Available",
    name: "billAvailable",
  },
  {
    label: "Warranty Available",
    name: "warrantyAvailable",
  },
  {
    label: "Accessories Available",
    name: "accessoriesAvailable",
  },
  {
    label: "Box Available",
    name: "boxAvailable",
  },
];


const ProductForm = ({ showProductForm, setShowProductForm, selectedProduct , getData}) => {

  const [selectedTab = "1", setSelectedTab] = useState("1");

  const formref = React.useRef(null);

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.users)

  const onFinish = async (values) => {
    try {

      dispatch(SetLoader(true));

      let response = null;
      if (selectedProduct) {
        response = await EditProduct(selectedProduct._id, values);
      } else {
        values.seller = user._id;
        values.status = "pending";
        response = await AddProduct(values);
      }

      dispatch(SetLoader(false));

      if (response.success) {
        message.success(response.message)
        setShowProductForm(false);
        window.location.reload();

      } else {
        message.error(response.message)
      }

    } catch (error) {

      dispatch(SetLoader(false));
      message.error(error.message)
    }
  }


  useEffect(() => {

    if (selectedProduct) {
      formref.current.setFieldsValue(selectedProduct)
    }
  }, [selectedProduct]);



  return (
    <Modal title=""
      open={showProductForm}
      onCancel={() => setShowProductForm(false)}
      centered
      width={800}
      okText="Save"
      onOk={() => {
        formref.current.submit();
      }}
      {...(selectedTab === "2" && { footer: false })}
    >
      <div>

        <h1 className="text-primary text-2xl text-center font-semibold uppercase">
          {selectedProduct ? "Edit Product" : "Add Product"}
        </h1>


        <Tabs defaultActiveKey="1" activeKey={selectedTab} onChange={(key) => setSelectedTab(key)}>
          <Tabs.TabPane tab="General" key="1">
            <Form layout='vertical' ref={formref} onFinish={onFinish}>
              <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
                <Input type="text" />
              </Form.Item>

              <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Description is required' }]}>
                <TextArea type="text" />
              </Form.Item>

              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Price is required' }]}>
                    <Input type="number" />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Category is required' }]}>
                    <select>
                      <option value="">Select</option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="home">Home</option>
                      <option value="sports">Sports</option>
                    </select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Age" name="age" rules={[{ required: true, message: 'Age is required' }]}>
                    <Input type="number" />
                  </Form.Item>
                </Col>
              </Row>


              <div className="flex gap-10">
                {additionalThings.map((item) => {
                  return (
                    <Form.Item label={item.label} name={item.name} valuePropName="checked">


                      <Input type="checkbox"

                        value={item.name}
                        onChange={(e) => {
                          formref.current.setFieldsValue({
                            [item.name]: e.target.checked,
                          });
                        }}
                        checked={formref.current?.getFieldValue(item.name)}

                      />

                    </Form.Item>
                  );
                })}
              </div>

              <Form.Item
                label="Show Bids on Product Page"
                name="showBidsOnProductPage"
                valuePropName="checked"
              >
                <Input
                  type="checkbox"
                  onChange={(e) => {
                    formref.current.setFieldsValue({
                      showBidsOnProductPage: e.target.checked,
                    });
                  }}
                  checked={formref.current?.getFieldValue(
                    "showBidsOnProductPage"
                  )}
                  style={{ width: 50  , marginLeft:20}}
                />
              </Form.Item>

            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="images" key="2" disabled={!selectedProduct}>
            < Images selectedProduct={selectedProduct} getData={getData} setShowProductForm={setShowProductForm} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  )
}

export default ProductForm