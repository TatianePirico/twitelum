import React from 'react';

export default function NavBar(props) {

  return (
    <nav>
      <ul>

        {props.links.map(link =>
          <li>
            <a href="#">{link}</a>
          </li>
        )}

      </ul>
    </nav>

  );
}