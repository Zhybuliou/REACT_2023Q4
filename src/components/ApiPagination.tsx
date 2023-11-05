import { nanoid } from 'nanoid';
import { NavLink } from 'react-router-dom';

export default function ApiPagination({
  countItems,
  perPage,
}: {
  countItems: number | undefined;
  perPage: string;
}) {
  const delPagination = perPage === '10' ? 10 : 20;
  const pages = countItems && Math.ceil(countItems / delPagination);
  const pagesArray = new Array(pages).fill(1);

  return (
    <div className="pagination-block">
      <p>Pages: </p>
      {pagesArray.map((button, i) => (
        <NavLink
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
