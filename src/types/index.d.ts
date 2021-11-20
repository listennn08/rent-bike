import { LatLngTuple } from 'leaflet'

declare global {
  type City = {
    CityID: string
    CityName: string
    CityCode: string
    City: string
    CountyID: string
    Version?: string
  }

  interface IBikeStation extends IBikeAvailability {
    //  (String, optional): 站點唯一識別代碼，規則為 {業管機關代碼} + {StationID}，其中 {業管機關代碼} 可於Authority API中的AuthorityCode欄位查詢 ,
    StationUID?: string
    //  (String, optional): 站點代碼 ,
    StationID?: string
    //  (String, optional): 業管單位代碼 ,
    AuthorityID?: string
    //  (NameType, optional): 站點名稱 ,
    StationName?: TName
    //  (PointType, optional): 站點位置 ,
    StationPosition?: TPoint
    //  (NameType, optional): 站點地址 ,
    StationAddress?: TName
    //  (String, optional): 站點描述 ,
    StopDescription?: string
    //  (Int32, optional): 可容納之自行車總數 ,
    BikesCapacity?: number
    //  (Int32, optional): 服務類型 : [1:'YouBike1.0',2:'YouBike2.0'] ,
    ServiceType?: number
    //  (string, optional): 來源端平台資料更新時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz) ,
    SrcUpdateTime?: string
    //  (DateTime): 資料更新日期時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
    UpdateTime?: string
  }

  interface IBikeAvailability {
    //  (String, optional): 站點唯一識別代碼，規則為 {業管機關代碼} + {StationID}，其中 {業管機關代碼} 可於Authority API中的AuthorityCode欄位查詢 ,
    StationUID?: string
    //  (String, optional): 站點代碼 ,
    StationID?: string
    //  (Int32, optional): 服務狀態 : [0:'停止營運',1:'正常營運',2:'暫停營運'] ,
    ServiceStatus?: number
    //  (Int32, optional): 服務類型 : [1:'YouBike1.0',2:'YouBike2.0'] ,
    ServiceType?: number
    //  (Int32, optional): 可租借車數 ,
    AvailableRentBikes?: number
    //  (Int32, optional): 可歸還車數 ,
    AvailableReturnBikes?: number
    //  (string, optional): 來源端平台資料更新時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz) ,
    SrcUpdateTime?: string
    //  (DateTime): 資料更新日期時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
    UpdateTime?: string
  }

  type TName = {
    //  (String, optional): 中文繁體名稱 ,
    Zh_tw?: string
    //  (String, optional): 英文名稱
    En?: string
  }

  type TPoint = {
    // (number, optional): 位置經度(WGS84)
    PositionLon?: number
    // (number, optional): 位置緯度(WGS84)
    PositionLat?: number
  }

  interface CustomBikeShape extends BikeShape {
    geo?: LatLngTuple[]
  }

  interface BikeShape {
    //  (String): 路線名稱 ,
    RouteName: string
    //  (String, optional): 業管機關名稱（可能包含多個業管機關
    AuthorityName?: string
    //  (String): 路線所在縣市代碼
    CityCode: string
    //  (String): 路線所在縣市名稱
    City: string
    //  (String, optional): 路線所在鄉鎮名稱（可能包含多個鄉鎮）
    Town?: string
    //  (String, optional): 路線起點描述
    RoadSectionStart?: string
    //  (String, optional): 路線迄點描述
    RoadSectionEnd?: string
    //  (String, optional): 自行車道車行方向
    Direction?: string
    //  (String, optional): 自行車道類型
    CyclingType?: string
    //  (number, optional): 自行車道長度
    CyclingLength?: string
    //  (String, optional): 自行車道完工日期時間
    FinishedTime?: string
    //  (DateTime): 資料更新日期時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
    UpdateTime: string
    //  (String): well-known text，為路線軌跡資料
    Geometry: string
    //  (String): 路線軌跡編碼(encoded polyline)
    EncodedPolyline: string
  }

  interface TourismInfo {
    //  (String): 景點代碼 ,
    ID: string
    //  (String, optional): 景點名稱 ,
    Name?: string
    //  (String, optional): 景點特色精簡說明 ,
    Description?: string
    //  (String, optional): 景點服務電話 ,
    Phone?: string
    //  (String, optional): 景點地址 ,
    Address?: string
    //  (String, optional): 開放時間 ,
    OpenTime?: string
    //  (TourismPicture, optional): 景點照片 ,
    Picture?: TourismPicture
    //  (String, optional): 景點地圖/簡圖介紹網址 ,
    MapUrl?: string
    //  (PointType, optional): 景點位置 ,
    Position?: Point
  }

  type TourismPicture = {
    [key: string]: string | undefined
    // 照片連結網址1
    PictureUrl1?: string
    // 照片說明1
    PictureDescription1?: string
    // 照片連結網址2
    PictureUrl2?: string
    // 照片說明2
    PictureDescription2?: string
    // 照片連結網址3
    PictureUrl3?: string
    // 照片說明3
    PictureDescription3?: string
  }
  
  type Point = {
    // (number, optional): 位置經度(WGS84)
    PositionLon?: number
    // (number, optional): 位置緯度(WGS84)
    PositionLat?: number
    // (String, optional): 地理空間編碼
    GeoHash?: string
  }

  type TDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    unit?: string
  ) => number
}