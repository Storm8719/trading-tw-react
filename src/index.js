import React from 'react';
import store from "./redux/store";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
// import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const root = ReactDOM.createRoot(document.getElementById('root'));

// const client = new ApolloClient({
//     uri: "http://localhost:3020/graphql/",
//     cache: new InMemoryCache()
// });

root.render(
    <BrowserRouter>
        <Provider store={store}>
            {/*<ApolloProvider client={client}>*/}
                <App/>
            {/*</ApolloProvider>*/}
        </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
