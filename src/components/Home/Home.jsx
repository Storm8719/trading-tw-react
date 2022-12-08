import React, {useEffect} from "react";
import {connect} from "react-redux";
import {createSandboxAccount, initializeAccounts, setCurrentAccount} from "../../redux/accounts-reducer";

const Home = (props) => {
    const {accountsList, currentAccountId, createSandboxAccount, setCurrentAccount} = props;

    useEffect(() => {
        if(!accountsList) props.initializeAccounts();
    }, []);

    if (!accountsList) return "Loading Accounts...";

    const renderAccountsList = (accountsList) => {
        if(accountsList.length === 0) return <div>No accounts</div>;

        return accountsList.map(el => <div key={el.brokerAccountId} onClick={() => {setCurrentAccount(el.brokerAccountId)}}>
            Account : {el.brokerAccountId}
        </div>)
    }

    return <div>
        {renderAccountsList(accountsList)}
        <button onClick={createSandboxAccount}>Create Sandbox Account</button>
    </div>
}



const mapStateToProps = (state) => ({
    currentAccountId: state.accounts.currentAccountId,
    accountsList: state.accounts.accountsList
});

export default connect(mapStateToProps, {initializeAccounts, createSandboxAccount, setCurrentAccount})(Home)