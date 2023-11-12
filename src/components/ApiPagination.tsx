import { nanoid } from 'nanoid';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function ApiPagination() {
  const { perPage, storeApiResult } = useContext(AppContext);
  const countItems = storeApiResult?.count;
  const delPagination = perPage === '10' ? 10 : 20;
  const pages = countItems && Math.ceil(countItems / delPagination);
  const pagesArray = new Array(pages).fill(1);

  return (
    <div className="pagination-block">
      <p>Pages: </p>
      {pagesArray.map((button, i) => (
        <NavLink
          role="button"
          style={({ isActive }) =>
            isActive
              ? {
                  color: '#000',
                  background: '#ffe81f',
                  textDecoration: 'none',
                  marginLeft: '5px',
                  fontSize: '18px',
                  padding: '0px 6px 0px 6px',
                  borderRadius: '8px',
                  fontWeight: '800',
                  border: 'solid 3px #ffe81f',
                }
              : {
                  color: '#545e6f',
                  background: '#f0f0f0',
                  textDecoration: 'none',
                  marginLeft: '5px',
                  fontSize: '18px',
                  padding: '0px 6px 0px 6px',
                  borderRadius: '8px',
                  fontWeight: '800',
                  border: 'solid 3px #ffe81f',
                }
          }
          to={`/pages/${button + i}`}
          key={nanoid()}
        >
          {button + i}
        </NavLink>
      ))}
    </div>
  );
}
