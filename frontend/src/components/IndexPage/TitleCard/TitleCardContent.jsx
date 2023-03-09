import SearchIcon from "../../../assets/images/search.png";
import { Link } from "react-router-dom";

const TitleCardContent = ({ business }) => {
  const FirstLine = () => {
    return (
      <>
        <h1>Mind-blowing coffee</h1>
      </>
    );
  };
  // SecondLine: I have copied the variable name used by yelp.
  // is this plagiarism? is it acceptable ettiquete?

  // https://www.yelp.com/search?find_desc=coffee&find_loc=New+York%2C+NY+11226

  const SecondLine = () => {
    return (
      <Link to="/search?category=coffee&find_loc=new-york%2C+ny">
        <div className="second-line">
          <img src={SearchIcon} alt="" />
          <h3>Coffee</h3>
        </div>
      </Link>
    );
  };
  const TitleCardFooter = () => {
    return (
      <div className="title-card-footer">
        <h2>Devoción</h2>
      </div>
    );
  };

  return (
    <>
      <div className="business-title-card">
        <FirstLine />
        <SecondLine />
        <TitleCardFooter />
      </div>
    </>
  );
};
export default TitleCardContent;