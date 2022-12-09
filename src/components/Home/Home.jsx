import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
    createSandboxAccount,
    deleteSandboxAccount,
    initializeAccounts,
    setCurrentAccount
} from "../../redux/accounts-reducer";

const Home = (props) => {
    const {accountsList, currentAccountId, createSandboxAccount, setCurrentAccount, deleteSandboxAccount} = props;

    useEffect(() => {
        if(!accountsList) props.initializeAccounts();
    }, []);

    if (!accountsList) return "Loading Accounts...";

    const renderAccountsList = (accountsList) => {
        if(accountsList.length === 0) return <div>No accounts</div>;

        return accountsList.map(el => <div key={el.brokerAccountId} >
            <div>Account : {el.brokerAccountId} </div>
            <button onClick={() => {setCurrentAccount(el.brokerAccountId)}}>Use this account</button>
            <button onClick={() => {deleteSandboxAccount(el.brokerAccountId)}}>Delete</button>
        </div>)
    }

    return <div>
        { currentAccountId ? <div>Current account id : {currentAccountId}</div> : null }
        {renderAccountsList(accountsList)}
        <button onClick={createSandboxAccount}>Create Sandbox Account</button>
    </div>
}



const mapStateToProps = (state) => ({
    currentAccountId: state.accounts.currentAccountId,
    accountsList: state.accounts.accountsList
});

export default connect(mapStateToProps, {initializeAccounts, createSandboxAccount, setCurrentAccount, deleteSandboxAccount})(Home)