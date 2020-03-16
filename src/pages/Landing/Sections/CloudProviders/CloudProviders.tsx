import React from "react";
import AWS from "../../../../asset/img/AWS.svg";
import Google from "../../../../asset/img/Google.svg";
import Azure from "../../../../asset/img/Azure.svg";
import DigitalOcean from "../../../../asset/img/DigitalOcean.svg";
import Upcloud from "../../../../asset/img/Upcloud.svg";
import { Col } from "antd";
import Layout from "../Layout/Layout";

interface Props {
  providerIdChange: (index: number) => void;
  cloudProviderId: number;
}

const CloudProviders: React.FC<Props> = ({
  cloudProviderId,
  providerIdChange
}) => {
  const cloudProviderLogos = [AWS, Google, Azure, DigitalOcean, Upcloud];

  //Render all the available cloud providers
  const renderCloudProviders = cloudProviderLogos.map((cp, index) => {
    const customClass =
      cloudProviderId === index
        ? "Sections-CloudSelect active"
        : "Sections-CloudSelect";
    return (
      <Col
        span={4}
        className={customClass}
        key={index}
        onClick={() => providerIdChange(index)}
      >
        <img src={cp} alt={cp + "logo"} />
      </Col>
    );
  });

  return (
    <Layout title={"Pick a cloud provider"} description={"Contrary to popular"}>
      {renderCloudProviders}
    </Layout>
  );
};

export default CloudProviders;
