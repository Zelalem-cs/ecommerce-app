import { useLocation, useParams } from "react-router-dom";
export function withRouter(Child) {
  return (props) => {
    const params = useParams();
    const location = useLocation();
    return <Child {...props} params={params} location={location} />;
  };
}
