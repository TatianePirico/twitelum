import React from 'react';

// dumb component
// export default function NavBar() {
// export default () => () <- return
// export default const NavBar = () => () <- return

// const superAdmin = true;

export default function NavBar(props) {
  return (
    <nav>
      <ul>
        {props.links.map((link, index) => (
          <li key={index}>
            <a href="#">{link}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
