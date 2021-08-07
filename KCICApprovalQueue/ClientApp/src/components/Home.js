import React from 'react';
import { connect } from 'react-redux';

const Home = props => (
  <div>
    <section>
      <h1>KCIC Recruiting Challenge</h1>
      <br />

      <h2>Tasks</h2>
      <p>See README.md in the root of the repository for instructions.</p>
    </section>
    
  </div>
);

export default connect()(Home);
