import { regions } from "@/data";

export const getTitleFromSlug = (string) => {
    const arr = string.split('-')
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(' ')
  }

  export const useSearchPayload = (page, region, zones) => {
    return {
      page: page,
      mlsId:"mlsvallarta",
      search: {
          featureValues:[],
          daysOnMarket:true,
          pageSize: 12,
          propertyTypes:[{id: 2}, {id: 3}],
          regions: region ? [{id: region}] : [],
          zones: zones ? zones.map(zone => { return { id: zone } }) : [],
          status:["CURRENT"],
          fromStorage:true
      }
    }
  }

  export const useRegionData = (region) => {
    return regions.filter(e => e.title.toLowerCase() === region.toLowerCase())[0]
  }

  export const useRegionParams = (region) => {
    return {
      regionId: region.id,
      zoneIds: region.zones.map(zone => { return zone.id })
    }
  }

  export const useZoneData = (region, zone) => {
    const data = useRegionData(region)
    return {regionId: data.id, zone: data.zones.filter(e => e.title.toLowerCase() === zone.toLowerCase())[0]}
  }