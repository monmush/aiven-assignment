import React, { useState, useEffect } from "react";
import { Row, Col, message } from "antd";
import axios from "axios";
import { convertIdToStr, getDistance } from "../../../shared/Methods";

import CloudProviders from "./CloudProviders/CloudProviders";
import Regions from "./Regions/Regions";
import Spinner from "../../../components/Spinner/Spinner";

interface Props {}

interface Cloud {
  cloud_description: string;
  cloud_name: string;
  geo_latitude: number;
  geo_longitude: number;
  geo_region: string;
  distance?: number;
}

const Sections = (props: Props) => {
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const [cloudProviderId, setCloudProviderId] = useState(0);
  const [regionCategories, setRegionCategories] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("Europe");
  const [cloudsByProvider, setCloudsByProvider] = useState<Cloud[]>([]);
  const [selectedCloud, setSelectedCloud] = useState<string>();
  const [myLocation, setMyLocation] = useState();
  const [nearestCloud, setNearestCloud] = useState();

  const providerIdChange = (id: number) => {
    setCloudProviderId(id);
  };

  const regionChange = (region: string) => {
    setSelectedRegion(region);
  };

  const cloudChange = (cloudName: string) => {
    setSelectedCloud(cloudName);
  };

  console.log('render');

  // Get geolocation
  useEffect(()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        location => setMyLocation(location.coords),
        err => console.log(err)
      );
    }
  },[])

  // API call - Fetch all the available cloud platforms
  useEffect(() => {
    axios
      .get("https://api.aiven.io/v1/clouds")
      .then(({ data }) => {
        setClouds(data.clouds);
      })
      .catch(err => console.log(err));
  }, []);

  // Get all clouds on selected Cloud Provider and sort it
  // in the distance ascending order
  useEffect(() => {
    let result: Cloud[] = [];
    if (clouds.length > 1 && myLocation !== undefined) {
      clouds.map(item => {
        if (item.cloud_name.indexOf(convertIdToStr(cloudProviderId)) > -1) {
          const distance = getDistance(
            myLocation.latitude,
            myLocation.longitude,
            item.geo_latitude,
            item.geo_longitude,
            "K"
          );
          result = [...result, { ...item, distance: distance }];
        }
      });
      setCloudsByProvider(result.sort((a, b) => a.distance! - b.distance!));
      setSelectedRegion(result[0].cloud_description.split(",")[0]);
      setSelectedCloud(result[0].cloud_name);
      setNearestCloud(result[0].cloud_name);
    }
  }, [clouds, cloudProviderId, myLocation]);

  // Get all the available regions
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

  //Submit handler
  const submitHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    message.success("Successfully created " + selectedCloud);
  };

  // Render sections component
  const renderSections = () => {
    if (myLocation) {
      return (
        <Row className="Sections">
          {/* Picking cloud provider section */}
          <CloudProviders
            providerIdChange={providerIdChange}
            cloudProviderId={cloudProviderId}
          />

          {/* Picking region section */}
          <Regions
            regionCategories={regionCategories}
            regionChange={regionChange}
            cloudsByProvider={cloudsByProvider}
            selectedRegion={selectedRegion}
            cloudChange={cloudChange}
            selectedCloud={selectedCloud}
            nearestCloud={nearestCloud}
          />

          {/* Submit button */}
          <Col offset={18} lg={6}>
            <button className="Button__Primary" onClick={submitHandler}>
              Create your cluster
            </button>
          </Col>
        </Row>
      );
    } else {
      return <Spinner />;
    }
  };

  return <React.Fragment>{renderSections()}</React.Fragment>;
};

export default Sections;
