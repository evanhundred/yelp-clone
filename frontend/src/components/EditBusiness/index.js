import "./index.css";

import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBusiness,
  fetchBusiness,
  updateBusiness
} from "../../store/businesses";
import { newBusinessFull } from "../../utils/businesses";

const EditBusiness = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { businessId } = useParams();

  useEffect(() => {
    dispatch(fetchBusiness(businessId));
  }, [dispatch, businessId]);

  const business = useSelector(getBusiness(businessId));
  const currentUser = useSelector((state) => state.session.user);

  if (!currentUser) history.push("/login");
  // const newBusinessTemplate = newBusinessFull();
  const businessObject = { ...business };
  const [bizTemplate, setBizTemplate] = useState(
    business ? { ...businessObject } : null
  );

  const [initialPriceRatingClicked, setInitialPriceRatingClicked] =
    useState(false);

  const keysArray = business ? Object.keys(business) : null;
  const exclude = ["id", "imageUrls", "authorNames", "reviews", "owns", "stub"];
  const excludeObject = {};
  exclude.forEach((key) => {
    excludeObject[key] = key;
  });

  // let keysArrayCopy;
  // while (keysArrayCopy) {
  //   const key = keysArrayCopy.pop();
  //   setBizTemplate({
  //     ...bizTemplate,
  //     [[key]]: business[key]
  //   });
  // }
  // setBizTemplate(businessObject);
  // console.log(bizTemplate);
  // console.log(businessObject);

  const [componentToRender, setComponentToRender] = useState("initial");

  if (!business) return <div className="loading">Loading...</div>;

  const handleHover = (e, isHovered, num) => {};
  const handleClick = (e) => {};

  const businessInfoForm = () => {
    if (!bizTemplate) setBizTemplate({ ...businessObject });
    const handleChange = (e, key) => {
      setBizTemplate({
        ...bizTemplate,
        [key]: e.target.value
      });
    };

    const filteredKeysArray = [];
    keysArray.forEach((key) => {
      if (!excludeObject[key]) filteredKeysArray.push(key);
    });

    const keyPositions = [
      "name",
      "category",
      "price",
      "website",
      "countryCode",
      "phone",
      "address",
      "city",
      "state",
      "zipcode",
      "country",
      "neighborhood",
      "openAt",
      "closedAt",
      "about",
      "latitude",
      "longitude",
      "placeId"
    ];
    const keyPositionsObject = {};
    const fieldOrderObject = {};
    keyPositions.forEach((key, idx) => {
      keyPositionsObject[idx + 1] = { fieldName: key, component: null };
      fieldOrderObject[key] = idx + 1;
      // keyPositionsObject[key] = { position: idx, component: null };
    });

    console.log(keyPositionsObject);
    console.log(fieldOrderObject);

    const fieldsObject = {};
    const textFields = [
      "name",
      "address",
      "city",
      "state",
      "neighborhood",
      "about",
      "country"
    ];
    textFields.forEach((field) => {
      fieldsObject[field] = "text";
    });
    const timeFields = ["openAt", "closedAt"];
    timeFields.forEach((field) => {
      fieldsObject[field] = "time";
    });

    filteredKeysArray.forEach((key) => {
      if (exclude.includes(key)) return <h3 key={key}>hi</h3>;
      let proxyKey;
      if (bizTemplate) {
        if (!bizTemplate[[key]]) {
          proxyKey = "";
        } else {
          proxyKey = bizTemplate[[key]];
        }
      }

      let labelComponent;

      if (key === "price") {
        const getDollarArray = () => {
          const dollars = [];
          let count = 1;
          while (count <= 4) {
            const spanNumber = count;
            const dollarComponent = (
              <span
                className={`dollar-${spanNumber}`}
                onMouseEnter={(e) =>
                  !initialPriceRatingClicked && handleHover(e, true, spanNumber)
                }
                onMouseLeave={(e) => {
                  if (!initialPriceRatingClicked)
                    handleHover(e, false, spanNumber);
                }}
                onClick={(e) => handleClick(e)}
              >
                $
              </span>
            );
            dollars.push(dollarComponent);
            count += 1;
          }
          return dollars;
        };
        labelComponent = (
          <label>
            <h4>{key}</h4>
            <div className="price-input-container">
              <p>{getDollarArray()}</p>
            </div>
          </label>
        );
      } else {
        labelComponent = (
          <label className={`${key}`} key={key}>
            <h4>{key}</h4>
            <input
              value={proxyKey}
              type={fieldsObject[key]}
              onChange={(e) => handleChange(e, key)}
            />
          </label>
        );
      }

      keyPositionsObject[fieldOrderObject[key]] = {
        ...keyPositionsObject[fieldOrderObject[key]],
        component: labelComponent
      };
    });

    const orderedLabelComponents = () => {
      const numberOfKeys = Object.keys(keyPositionsObject).length;
      const componentsArray = [];
      let count = 1;
      while (count <= numberOfKeys) {
        componentsArray.push(keyPositionsObject[count].component);
        count++;
      }
      return componentsArray;
    };

    const handleSubmit = () => {
      const runValidations = () => {
        // "category",
        const constraints = {
          name: /^[a-zA-Z0-9\s]+/g
        };
        // validate
        let inputsValid = true;

        // const fieldsArray=
      };
      if (runValidations()) {
        dispatch(updateBusiness(bizTemplate));
        setComponentToRender("success");
      }
    };
    return (
      <div className="business-info-form-container">
        {/* <p>hi</p> */}
        <form onSubmit={handleSubmit}>
          <div className="input-fields">
            {keyPositionsObject &&
              keyPositionsObject &&
              orderedLabelComponents()}
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  };

  const successComponent = () => <div className="success">success.</div>;
  if (business.stub === "true") {
    return (
      <div id="edit-business-container">
        <h2>Edit business stub.</h2>
        {businessInfoForm()}
        {componentToRender === "success" && successComponent()}
      </div>
    );
  }
  if (business.stub === "false") {
    return <div id="edit-business-container">Edit business.</div>;
  }

  return <div className="error">error: no stub information.</div>;
};

export default EditBusiness;
