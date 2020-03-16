export const convertIdToStr = (id: number) => {
  switch (id) {
    case 0:
      return "aws";
    case 1:
      return "google";
    case 2:
      return "azure";
    case 3:
      return "do";
    case 4:
      return "upcloud";
    default:
      return "aws";
  }
};



// GeoDataSource.com (C) All Rights Reserved 2018. The sample code is licensed under LGPLv3.
// Link to the source code: https://www.geodatasource.com/developers/javascript

export const getDistance = (lat1:number, lon1:number, lat2:number, lon2:number, unit:string) => {
	if ((lat1 === lat2) && (lon1 === lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit==="K") { dist = dist * 1.609344 }
		if (unit==="N") { dist = dist * 0.8684 }
		return dist;
	}
}