import { Route, Switch } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Queue from './components/WarrantyClaimQueue';
//import Profile from './components/Profile';

function App() {

    return (
        <Layout>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/queue' component={Queue} />
                {/*<Route path='/profile' component={Profile} />*/}
            </Switch>
        </Layout>
    );
}

export default App;
