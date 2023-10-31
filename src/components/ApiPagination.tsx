import { nanoid } from 'nanoid';
import { NavLink } from 'react-router-dom';

export default function ApiPagination({
  countItems,
}: {
  countItems: number | undefined;
}) {
  const pages = countItems && Math.ceil(countItems / 10);
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
                  fontSize: '20px',
                  padding: '0px 6px 0px 6px',
                  borderRadius: '50%',
                  fontWeight: '800',
                }
              : {
                  color: '#545e6f',
                  background: '#f0f0f0',
                  textDecoration: 'none',
                  marginLeft: '5px',
                  fontSize: '20px',
                  padding: '0px 6px 0px 6px',
                  borderRadius: '50%',
                  fontWeight: '800',
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
