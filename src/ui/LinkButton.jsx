import { Link, useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function LinkButton({ children, to, ...otherProps }) {
  const navigate = useNavigate();
  const className = `text-sm text-blue-500 hover:text-blue-700 hover:underline ${otherProps.className}`;

  if (to === '-1')
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={className} {...otherProps}>
      {children}
    </Link>
  );
}

export default LinkButton;
