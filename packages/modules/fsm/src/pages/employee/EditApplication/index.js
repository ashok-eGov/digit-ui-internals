import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CardSubHeader, Dropdown, Row, StatusTable, FormComposer } from "@egovernments/digit-ui-react-components";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

// TODO: fetch data instead of hard coded
import data from "../../../propertyType.json";
const propertyTypeRes = data.PropertyType.map((item) => item.propertyType);
const propertySubTypeRes = data.PropertyType.map((item) => ({ key: item.propertyType, name: item.code }));

const ModifyApplication = ({ parentUrl, heading = "Modify Application" }) => {
  const __initPropertyType__ = window.Digit.SessionStorage.get("propertyType");
  const __initSubType__ = window.Digit.SessionStorage.get("subType");

  const [menu, setMenu] = useState([]);
  const [subTypeMenu, setSubTypeMenu] = useState(__initSubType__ ? __initSubType__ : []);
  const [propertyType, setPropertyType] = useState(__initPropertyType__ ? __initPropertyType__ : {});
  const [subType, setSubType] = useState({});
  const [vehicleMenu, setVehicleMenu] = useState([
    { key: "Tracker (500 ltrs)", name: "Tracker (500 ltrs)" },
    { key: "Tracker (1000 ltrs)", name: "Tracker (1000 ltrs)" },
  ]);
  const [channel, setChannel] = useState("Counter");
  const [channelMenu, setChannelMenu] = useState([{ key: "Counter", name: "Counter" }]);
  const [vehicle, setVehicle] = useState("Tracker (500 ltrs)");
  const [slumMenu, setSlumMenu] = useState([{ key: "NJagbandhu", name: "NJagbandhu" }]);
  const [slum, setSlum] = useState("NJagbandhu");

  const cityProperty = Digit.SessionStorage.get("city_property");
  const selectedLocalities = Digit.SessionStorage.get("selected_localities");
  const localityProperty = Digit.SessionStorage.get("locality_property");

  const [selectedCity, setSelectedCity] = useState(cityProperty ? cityProperty : null);
  const [localities, setLocalities] = useState(selectedLocalities ? selectedLocalities : null);
  const [selectedLocality, setSelectedLocality] = useState(localityProperty ? localityProperty : null);

  const { t } = useTranslation();
  const cities = Digit.Hooks.fsm.useTenants();
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    setMenu(() => {
      const uniqMenu = [...new Set(data.PropertyType.filter((o) => o.propertyType !== undefined).map((item) => item.propertyType))];
      return uniqMenu.map((type) => ({ i18nKey: `ES_MODIFY_APPLICATION_PROPERTY_TYPE_${type}` }));
    });
    // setSubTypeMenu(propertySubTypeRes.filter((item) => item.key === propertyType));
  }, []);

  function selectedType(value) {
    setPropertyType(value);
    // TODO: bottom two lines are hard coded data, whenever we get propertyType apis, it should be update
    const uniqMenu = [...new Set(data.PropertyType.filter((o) => o.propertyType !== undefined).map((item) => item.propertyType))];
    setSubTypeMenu(uniqMenu.map((type) => ({ i18nKey: `ES_MODIFY_APPLICATION_PROPERTY_SUB_TYPE_${type}` })));
    // setSubTypeMenu(propertySubTypeRes.filter((item) => item.key === value.key));
    // window.Digit.SessionStorage.set("propertyType", value);
    // (async () => {
    //   await Digit.FileDesludging.create("pb.amritsar");
    // })();
  }

  function selectSlum(value) {
    setSlum(value);
  }

  function selectChannel(value) {
    setChannel(value);
  }

  function selectVehicle(value) {
    setVehicle(value);
  }

  function selectedSubType(value) {
    setSubType(value);
    window.Digit.SessionStorage.set("subType", [value]);
  }

  // city locality logic
  const selectCity = async (city) => {
    setSelectedCity(city);
    Digit.SessionStorage.set("city_property", city);
    let response = await Digit.LocationService.getLocalities({ tenantId: city.code });
    let __localityList = Digit.LocalityService.get(response.TenantBoundary[0]);
    setLocalities(__localityList);
    Digit.SessionStorage.set("selected_localities", __localityList);
  };

  function selectLocality(locality) {
    setSelectedLocality(locality);
    Digit.SessionStorage.set("localityProperty", locality);
  }

  const onSubmit = (data) => {
    const applicationChannel = data.applicationChannel;
    const applicantName = data.applicantName;
    const mobileNumber = data.mobileNumber;
    const pincode = data.pincode;
    const landmark = data.landmark;
    const noOfTrips = data.noOfTrips;
    const amount = data.amount;
    const cityCode = selectedCity.code;
    const city = selectedCity.city.name;
    const district = selectedCity.city.name;
    const region = selectedCity.city.name;
    const state = "Punjab";
    const localityCode = selectedLocality.code;
    const localityName = selectedLocality.name;
    const { key } = subType;
    const propertyType = key;
    const formData = {
      applicationChannel,
      applicantName,
      mobileNumber,
      pincode,
      landmark,
      noOfTrips,
      amount,
      cityCode,
      city,
      district,
      region,
      localityCode,
      localityName,
      state,
      propertyType,
      subType,
      vehicle,
    };

    const requestData = {
      tenantId: null,
      description: null,
      accountId: null,
      additionalDetail: {},
      source: null,
      sanitationtype: null,
      propertyUsage: null,
      noOfTrips,
      status: null,
      vehicleId: vehicle,
      pitDetail: {
        hight: 0,
        length: 0,
        width: 0,
        distanceFromRoad: 0,
      },
      address: {
        tenantId: null,
        doorNo: null,
        plotNo: null,
        landmark,
        city,
        district,
        region,
        state,
        country: null,
        pincode,
        additionDetails: null,
        buildingName: null,
        street: null,
        locality: {
          code: null,
          name: null,
          label: null,
          latitude: null,
          longitude: null,
          children: [null],
        },
        geoLocation: {
          latitude: 0,
          longitude: 0,
          additionalDetails: {},
        },
      },
    };
    console.log("%c 🇸🇦: onSubmit -> formData ", "font-size:16px;background-color:#3dd445;color:white;", formData);
    console.log("%c 🍦: onSubmit -> requestData ", "font-size:16px;background-color:#50ab67;color:white;", requestData);

    // await dispatch(createApplication(formData));
    // history.push(parentUrl + "/response");

    window.Digit.SessionStorage.set("propertyType", null);
    window.Digit.SessionStorage.set("subType", null);
    Digit.SessionStorage.set("city_property", null);
    Digit.SessionStorage.set("selected_localities", null);
    Digit.SessionStorage.set("locality_property", null);

    history.push("digit-ui/employee/fsm/response");
  };

  const config = [
    {
      head: t("ES_TITLE_APPLICATION_DETAILS"),
      body: [
        {
          label: t("ES_MODIFY_APPLICATION_APPLICANT_NAME"),
          type: "text",
          isMandatory: true,
          populators: {
            name: "applicantName",
            validation: {
              required: true,
              pattern: /[A-Za-z]/,
            },
          },
        },
        {
          label: t("ES_MODIFY_APPLICATION_APPLICANT_MOBILE_NO"),
          type: "text",
          isMandatory: true,
          populators: {
            name: "mobileNumber",
            validation: {
              required: true,
              pattern: /^[6-9]\d{9}$/,
            },
          },
        },
        {
          label: t("ES_MODIFY_APPLICATION_SLUM_NAME"),
          type: "radio",
          isMandatory: true,
          populators: <Dropdown option={slumMenu} optionKey="name" id="slum" selected={slum} select={selectSlum} />,
        },
      ],
    },
    {
      head: t("ES_MODIFY_APPLICATION_PROPERTY_DETAILS"),
      body: [
        {
          label: t("ES_MODIFY_APPLICATION_PROPERTY_TYPE"),
          isMandatory: true,
          type: "dropdown",
          populators: <Dropdown option={menu} optionKey="i18nKey" id="propertyType" selected={propertyType} select={selectedType} />,
        },
        {
          label: t("ES_MODIFY_APPLICATION_PROPERTY_SUB-TYPE"),
          isMandatory: true,
          type: "dropdown",
          menu: { ...subTypeMenu },
          populators: <Dropdown option={subTypeMenu} optionKey="i18nKey" id="propertySubType" selected={subType} select={selectedSubType} />,
        },
      ],
    },
    {
      head: t("ES_MODIFY_APPLICATION_LOCATION_DETAILS"),
      body: [
        {
          label: t("ES_MODIFY_APPLICATION_LOCATION_PINCODE"),
          type: "text",
          populators: {
            name: "pincode",
            validation: { pattern: /^[1-9][0-9]{5}$/ },
          },
        },
        {
          label: t("ES_MODIFY_APPLICATION_LOCATION_CITY"),
          isMandatory: true,
          type: "dropdown",
          populators: <Dropdown isMandatory selected={selectedCity} option={cities} id="city" select={selectCity} optionKey="name" />,
        },
        {
          label: t("ES_MODIFY_APPLICATION_LOCATION_MOHALLA"),
          isMandatory: true,
          type: "dropdown",
          populators: (
            <Dropdown isMandatory selected={selectedLocality} optionKey="code" id="locality" option={localities} select={selectLocality} t={t} />
          ),
        },
        {
          label: t("ES_MODIFY_APPLICATION_LOCATION_LANDMARK"),
          type: "textarea",
          populators: {
            name: "landmark",
          },
        },
        {
          label: t("ES_MODIFY_APPLICATION_LOCATION_VEHICLE_REQUESTED"),
          isMandatory: true,
          type: "dropdown",
          populators: <Dropdown option={vehicleMenu} optionKey="name" id="vehicle" selected={vehicle} select={selectVehicle} />,
        },
      ],
    },
    {
      head: t("ES_MODIFY_APPLICATION_PAYMENT_DETAILS"),
      body: [
        {
          label: t("ES_MODIFY_APPLICATION_PAYMENT_NO_OF_TRIPS"),
          type: "text",
          populators: {
            name: "noOfTrips",
            validation: { pattern: /[0-9]+/ },
          },
        },
        {
          label: t("ES_MODIFY_APPLICATION_PAYMENT_AMOUNT"),
          isMandatory: true,
          type: "text",
          populators: {
            name: "amount",
            validation: { pattern: /[0-9]+/ },
            componentInFront: (
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                ₹
              </span>
            ),
          },
        },
      ],
    },
  ];
  searchnDetail = {
    title: t("ES_APPLICATION_DETAILS_APPLICATION_NO"),
    value: "FSM-277373",
  };

  return (
    <React.Fragment>
      <FormComposer label={t("ES_COMMON_UPDATE")} config={config} onSubmit={onSubmit} beforeSubHeader>
        <CardSubHeader style={{ marginBottom: "16px" }}>Modify Application</CardSubHeader>
        <StatusTable>
          <Row key={applicationDetail.title} label={applicationDetail.title} text={applicationDetail.value} />
        </StatusTable>
      </FormComposer>
    </React.Fragment>
  );
};

export default ModifyApplication;
