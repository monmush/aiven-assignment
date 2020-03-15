import React from 'react'
import Layout from '../Layout/Layout'
import {Row, Col} from 'antd'
import Database from "../../../../asset/img/Database.svg";

interface Cloud {
    cloud_description: string;
    cloud_name: string;
    geo_latitude: number;
    geo_longitude: number;
    geo_region: string;
  }
  
interface Props {
    regionCategories: string[], 
    cloudsByProvider: Cloud[],
    selectedRegion?: string, 
    selectedCloud?: string,
    cloudChange: (cloudName: string) => void,
    regionChange: (region:string) => void
}

const Regions:React.FC<Props>= ({regionCategories, regionChange, cloudsByProvider, selectedRegion, cloudChange,selectedCloud}) => {
    //Render the regions navigation bar
  const renderRegionsNav =
  regionCategories &&
  regionCategories.map((region, index) => {
    const customClass =
      selectedRegion === region
        ? "Section-Region-NavBar-Item active-rg"
        : "Section-Region-NavBar-Item";
    return (
      <Col
        onClick={() => regionChange(region)}
        className={customClass}
        key={index}
      >
        {region}
      </Col>
    );
  });

//Render clouds by region
const renderCloudsByRegion =
  cloudsByProvider &&
  cloudsByProvider.map(item => {
    const thisRegion = item.cloud_description.split(",")[0];
    if (thisRegion === selectedRegion) {
      const customClass =
        item.cloud_name === selectedCloud
          ? "Section-Region-Cloud active"
          : "Section-Region-Cloud";
      return (
        <Col
          lg={10}
          className={customClass}
          onClick={() => cloudChange(item.cloud_name)}
        >
          <Row justify="start" align="top">
            <Col>
              <img src={Database} alt="db-icon" />
            </Col>
            <Col>
              <p>{item.cloud_name}</p>
              <small>{item.cloud_description.split("-")[0]}</small>
            </Col>
          </Row>
        </Col>
      );
    }
  });
    return (
        <Layout
        title={"Pick a region"}
        description={"There are many variations of passages of Lorem Ipsum"}
        id={"Section-Region"}>
        <Row justify="start" className="Section-Region-NavBar">
          {renderRegionsNav}
        </Row>
        <Row justify="start" className="Section-Region-CloudsContainer">
          {renderCloudsByRegion}
        </Row>
      </Layout>
    )
}

export default Regions
