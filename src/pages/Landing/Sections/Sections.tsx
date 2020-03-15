import React, { useState, useEffect } from "react";
import { Row } from "antd";
import axios from "axios";
import { convertIdToStr } from "../../../shared/Methods";

import CloudProviders from './CloudProviders/CloudProviders'
import Regions from "./Regions/Regions";
import Spinner from '../../../components/Spinner/Spinner'

interface Props {}

interface Cloud {
  cloud_description: string;
  cloud_name: string;
  geo_latitude: number;
  geo_longitude: number;
  geo_region: string;
}

const Sections = (props: Props) => {
  const [clouds, setClouds] = useState<Cloud[]>();
  const [cloudProviderId, setCloudProviderId] = useState(0);
  const [regionCategories, setRegionCategories] = useState<string[]>();
  const [selectedRegion, setSelectedRegion] = useState<string>("Europe");
  const [cloudsByProvider, setCloudsByProvider] = useState<Cloud[]>();
  const [selectedCloud, setSelectedCloud] = useState<string>();

  const providerIdChange = (id:number) => {
    setCloudProviderId(id)
  }

  const regionChange = (region:string) => {
    setSelectedRegion(region)
  }

  const cloudChange = (cloudName:string) => {
    setSelectedCloud(cloudName)
  }

  // API call - Fetch all the available cloud platforms
  useEffect(() => {
    axios
      .get("https://api.aiven.io/v1/clouds")
      .then(({ data }) => {
        setClouds(data.clouds);
      })
      .catch(err => console.log(err));
  }, []);

  // Get all clouds on selected Cloud Provider
  useEffect(() => {
    const result: Cloud[] = [];
    if (clouds) {
      clouds.map(item => {
        if (item.cloud_name.indexOf(convertIdToStr(cloudProviderId)) > -1) {
          result.push(item);
        }
      });
    }
    setCloudsByProvider(result);
  }, [clouds, cloudProviderId]);

  //Get all the available regions
  useEffect(() => {
    let regionCate: string[] = [];
    if (cloudsByProvider) {
      cloudsByProvider.forEach(item => {
        const thisRegion = item.cloud_description.split(",")[0];
        if (!regionCate.includes(thisRegion)) {
          regionCate.push(thisRegion);
        }
      });
      setRegionCategories(regionCate);
    }
  }, [cloudsByProvider]);

  const renderSections = () => {
    if(regionCategories && cloudsByProvider){
        return(
            <Row className="Sections">
                {/* Picking cloud provider section */}
                <CloudProviders providerIdChange={providerIdChange} cloudProviderId={cloudProviderId}/>
            
                {/* Picking region section */}
                <Regions regionCategories={regionCategories} regionChange={regionChange} cloudsByProvider={cloudsByProvider} selectedRegion={selectedRegion} cloudChange={cloudChange} selectedCloud={selectedCloud}/>
            </Row>
        )
    }else{
        return <Spinner/>
    }
  }
  

  return (
      <React.Fragment>
          {renderSections()}
      </React.Fragment>
  );
};

export default Sections;
