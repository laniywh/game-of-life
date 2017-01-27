import React, { Component } from 'react';

export default function({generation, lives}) {
  return(
    <div>
      <h2 className="stats-title">Statistics</h2>
      <hr />
      <p>Generation: {generation}</p>
      <p># of Lives: {lives}</p>
    </div>
  );
}