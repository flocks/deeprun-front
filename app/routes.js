import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './containers/Home';
import About from './components/About';
import Misc from './components/Misc';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="/about" component={About} />
		<Route path="/misc" component={Misc} />
	</Route>
);
