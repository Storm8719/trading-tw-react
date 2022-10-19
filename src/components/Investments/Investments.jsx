import React from "react";
import {connect} from "react-redux";
import {getAccountsList} from "../../redux/investments-reducer";
import { useQuery, gql } from "@apollo/client";

const SHARES = gql`
  query{
  getShares{
    figi,
    name,
    ticker,
    sector
  }
}
`;

const Investments = (props) =>{

    const { data, loading, error } = useQuery(SHARES);

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    console.log(data);
    return <>
        <div>Investments</div>
        {data.getShares.map((share) => (
            <div key={share.figi}>
                <div>{share.name} ({share.ticker})</div>
                <div>{share.sector}</div>
                <br/>
            </div>
        ))}
        <button onClick={props.getAccountsList}>Test</button>
    </>

}
const mapStateToProps = (state) => ({
    content: state.investments.content
})

export default connect(mapStateToProps, {getAccountsList})(Investments);

// export default Investments;